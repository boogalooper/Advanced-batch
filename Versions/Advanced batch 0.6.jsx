﻿///////////////////////////////////////////////////////////////////////////////
// Advanced batch
// jazz-y@ya.ru
///////////////////////////////////////////////////////////////////////////////

#target photoshop

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>Advanced batch</name>
<category>jazzy</category>
<eventid>3338481a-9241-4c33-956e-4088f660e936</eventid>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

var localization = "ru", // "auto" - use automatic localization, "ru" - russian interface, "en" - english interface
  arrayOfFileExtensions = ["PSD", "PDD", "PSDT", "PSB", "BMP", "RLE", "DIB", "GIF", "EPS", "IFF", "TDI", "JPG", "JPEG", "JPE", "JPF", "JPX", "JP2", "J2C",
    "J2K", "JPC", "JPS", "MPO", "PCX", "PDF", "PDP", "PXR", "PNG", "SCT", "TGA", "VDA", "ICB", "VST", "TIFF", "PBM", "PGM", "PPM", "PNM", "PFM", "PAM",
    "DCM", "DC3", "DIC"],
  arrayOfRawExtensions = ["TIF", "CRW", "NEF", "RAF", "ORF", "MRW", "MOS", "SRF", "PEF", "DCR", "CR2", "DNG", "ERF", "X3F", "RAW", "ARW", "CR3", "KDC", "3FR",
    "MEF", "MFW", "NRW", "RWL", "RW2", "SRW", "GPR", "IIQ"];

// bin here
if (localization.toUpperCase() != "AUTO") { $.locale = localization.toUpperCase() == "RU" ? "ru" : "en" }
$.localize = true

var rev = "0.6 test build",
  s2t = stringIDToTypeID,
  t2s = typeIDToStringID,
  AM = new ActionManager,
  STR = new Locale,
  CFG = new Config,
  FS = new FileSystem,
  EVT = new Notifiers,
  PS = new Preset,
  GUID = "3338481a-9241-4c33-956e-4088f660e936",
  objOfFileExtensions = {},
  event,
  fromBridge = false,
  allDone = true,
  actionsList = AM.getActionsList();

try {
  var d = app.playbackParameters
  fromBridge = d.getBoolean(d.getKey(0))
} catch (e) { }

try { event = arguments[1] } catch (e) { }

main()

function main() {
  AM.getScriptSettings(CFG)

  if (!event) {
    if (!EVT.chkEvt() && !CFG.globalErr || fromBridge) {
      var result = 0, w;
      if (CFG.batch != '' && CFG.batch >= 0 && !fromBridge) {
        if (confirmBatch()) { 
          CFG.fileCounter = CFG.batch
          result = 1 
        }
      }

      if (result != 1) {
        resetBatch(true)
        w = buildWindow(false); result = w.show()
      }

      if (result != 2) {
        EVT.addEvt()
        CFG.total = CFG.fileList.count + CFG.docList.count
        doBatch(true)
      }
    } else {
      if (!AM.isAnyDocument() || CFG.globalErr) {
        if (CFG.globalErr) {
          if (CFG.fileCounter < CFG.fileList.count || CFG.docList.count) {
            errWindow(true)
          } else {
            resetBatch(true)
            main()
          }
        } else {
          if (CFG.fileCounter < CFG.fileList.count || CFG.docList.count) {
            doBatch()
          } else {
            resetBatch(true)
            main()
          }
        }
      } else {
        doBatch()
      }
    }
  } else {
    if (event == gNotify) {
      resetBatch(false)
    } else {
      if (!AM.isAnyDocument()) {
        if (CFG.fileCounter >= CFG.fileList.count && !CFG.docList.count) {
          resetBatch(true)
          return
        }
        if (CFG.globalErr == false) {
          doBatch()
        }
        else {
          errWindow(true)
        }
      }
    }
  }


  //==========================================
  // вспомогаетельные функции
  //==========================================
  function errWindow(resetErr) {
    if (resetErr) CFG.globalErr = false
    var w = buildWindow(true)
    var result = w.show()

    if (result == 2) {
      CFG.fileCounter = 0
      CFG.fileList = new ActionList()
      CFG.doneCounter = -1
      CFG.continue = 0
      CFG.docList = new ActionDescriptor()
      EVT.delEvt()
      AM.putScriptSettings(CFG)
    } else {
      CFG.doneCounter = -1
      CFG.continue = 0
      doBatch()
    }
  }

  function resetBatch(eraseFileList) {
    CFG.globalErr = false
 //   CFG.fileCounter = 0
 //   CFG.fileList = new ActionList()
    CFG.doneCounter = -1
    CFG.continue = 0
    CFG.docList = new ActionDescriptor()
    

    if (eraseFileList) {
      CFG.fileCounter = 0
      CFG.total = 0
      CFG.fileList = new ActionList()
      CFG.batch = -1
    }

    EVT.delEvt()
    AM.putScriptSettings(CFG)
  }

  function confirmBatch() {
    return (confirm(strMsg(), false, STR.ContinueBatch))

    function strMsg() {
      output = []
      output.push(STR.ContinueBatchMsg)
      output.push(STR.Source + " " + CFG.lastPath)
      output.push(STR.Counter + (CFG.fileList.count - CFG.batch))
      output.push(STR.ContinueBatchNext + decodeURI(CFG.fileList.getPath(CFG.batch).name))

      return output.join('\n')
    }
  }
}

function buildWindow(fromEvent) {
  // =========================================
  // open files module
  // =========================================  
  var doNotUpdate = false, // режим обновления путей
    allFiles = {}, // временный массив со всеми файлами из папки
    renew = true, // необходимость чтения из панели экшенов
    noAction = false; // блокировка кнопок при отсуствии экшенов

  convertArrayToObject(arrayOfFileExtensions, objOfFileExtensions)
  convertArrayToObject(arrayOfRawExtensions, objOfFileExtensions)

  {
    var w = new Window("dialog");
    w.text = STR.Message + " " + rev;
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];
    w.spacing = 10;
    w.margins = 16;

    // PN
    // ==
    var pn = w.add("panel");
    pn.text = STR.Source;
    pn.orientation = "column";
    pn.alignChildren = ["fill", "top"];
    pn.spacing = 10;
    pn.margins = 10;

    // GRFLD
    // =====
    var grFld = pn.add("group");
    grFld.orientation = "row";
    grFld.alignChildren = ["left", "center"];
    grFld.spacing = 10;
    grFld.margins = 0;

    var dlSource_array = [STR.OpenFldr, STR.OpenedFiles, STR.FromBridge];
    var dlSource = grFld.add("dropdownlist", undefined, undefined, { items: dlSource_array });
    dlSource.preferredSize.width = 200;

    var bnSourceFolder = grFld.add("button");
    bnSourceFolder.text = STR.Browse;

    var stPath = grFld.add("statictext");
    stPath.preferredSize.width = 220
    // PN
    // ==

    var grOpenOptions = pn.add("group")
    grOpenOptions.orientation = "column";
    grOpenOptions.alignChildren = ["left", "fill"];

    var chSubfld = grOpenOptions.add("checkbox");
    chSubfld.text = STR.Subfolders;

    // GR
    // ==
    var gr = grOpenOptions.add("group");
    gr.orientation = "row";
    gr.alignChildren = ["left", "fill"];
    gr.spacing = 10;
    gr.margins = 0;

    var stFilter = gr.add("statictext");
    stFilter.text = STR.Ext;

    var dlFilter_array = [STR.AllFiles];
    var dlFilter = gr.add("dropdownlist", undefined, undefined, { items: dlFilter_array });
    dlFilter.selection = 0

    var chAcr = grOpenOptions.add("checkbox");
    chAcr.text = STR.Acr;

    // GROPENALL
    // =========
    var grOpenAll = grOpenOptions.add("group");
    grOpenAll.orientation = "row";
    grOpenAll.alignChildren = ["left", "center"];
    grOpenAll.spacing = 10;
    grOpenAll.margins = 0;

    var chOpenAtOnce = grOpenAll.add("checkbox");
    chOpenAtOnce.text = STR.OpenAll

    var chGroupBySubfolder = grOpenAll.add("checkbox");
    chGroupBySubfolder.text = STR.OpenBySubfolder

    var stCounter = pn.add("statictext", undefined, undefined, { name: "st" });
    stCounter.characters = 50

    // =========================================
    // preset module
    // =========================================    
    var grPreset = w.add("group");
    grPreset.orientation = "row";
    grPreset.alignChildren = ["left", "center"];
    grPreset.spacing = 10;

    var dlPreset_array = [STR.Defailt];
    var dlPreset = grPreset.add("dropdownlist", undefined, undefined, { items: dlPreset_array });
    dlPreset.text = STR.Set
    dlPreset.preferredSize.width = 250

    var bnRefresh = grPreset.add("button");
    bnRefresh.text = "↺";
    bnRefresh.preferredSize.width = 40;

    var bnSave = grPreset.add("button");
    bnSave.text = STR.Save

    var bnSaveAs = grPreset.add("button");
    bnSaveAs.text = STR.SaveAs

    var bnDel = grPreset.add("button");
    bnDel.text = STR.Delete

    // =========================================
    // action module
    // =========================================    

    // PNATN
    // =====
    var pnAtn = w.add("panel");
    pnAtn.text = STR.Atn
    pnAtn.preferredSize.height = 220;
    pnAtn.orientation = "column";
    pnAtn.alignChildren = ["left", "top"];
    pnAtn.spacing = 5;
    pnAtn.margins = [10, 20, 10, 10];


    var grCheck = w.add("group");
    grCheck.orientation = "column";
    grCheck.alignChildren = ["left", "center"];
    grCheck.spacing = 10;
    grCheck.margins = [0, 0, 0, 0];

    var chOnOpen = grCheck.add("checkbox");
    chOnOpen.text = STR.Auto

    var chContinue = grCheck.add("checkbox");
    chContinue.text = STR.Continue

    // =========================================
    // save module
    // =========================================    
    var pnSave = w.add("panel");
    pnSave.text = STR.PostProcess
    pnSave.orientation = "column";
    pnSave.alignChildren = ["left", "top"];
    pnSave.spacing = 10;
    pnSave.margins = [10, 20, 10, 10];

    // GRFOLDER
    // ========
    var grFolder = pnSave.add("group");
    grFolder.orientation = "row";
    grFolder.alignChildren = ["left", "center"];
    grFolder.spacing = 10;
    grFolder.margins = [0, 0, 0, 0];

    var dlSave_array = [STR.None, STR.SC, STR.SAC];
    var dlSave = grFolder.add("dropdownlist", undefined, undefined, { items: dlSave_array });
    dlSave.preferredSize.width = 200;

    var bnSaveFolder = grFolder.add("button");
    bnSaveFolder.text = STR.Browse
    bnSaveFolder.enabled = false

    var stSavePath = grFolder.add("statictext");
    stSavePath.preferredSize.width = 220;
    stSavePath.visible = false

    var stNoPath = grFolder.add("statictext")
    stNoPath.text = "!"
    stNoPath.graphics.font = "dialog-Bold:12"
    stNoPath.preferredSize.width = 12
    stNoPath.graphics.foregroundColor = w.graphics.newPen(w.graphics.PenType.SOLID_COLOR, [1, 0.8, 0, 1], 1);
    stNoPath.helpTip = STR.ErrNoPathTip

    var chFolder = pnSave.add("checkbox");
    chFolder.text = STR.SaveToFolder

    var chKeepStructure = pnSave.add("checkbox");
    chKeepStructure.text = STR.KeepStructure
    {
      // GRSAVEOPTIONS
      // =============
      var grSaveOptions = pnSave.add("group");
      grSaveOptions.orientation = "row";
      grSaveOptions.alignChildren = ["left", "center"];
      grSaveOptions.spacing = 10;
      grSaveOptions.margins = 0;

      var stFormat = grSaveOptions.add("statictext");
      stFormat.text = STR.Format

      var dlFormat_array = ["jpg", "tif", "psd"];
      var dlFormat = grSaveOptions.add("dropdownlist", undefined, undefined, { items: dlFormat_array });

      var chFlatten = grSaveOptions.add("checkbox");
      chFlatten.text = STR.Flatten

      var slJpg = grSaveOptions.add("slider");
      slJpg.minvalue = 1;
      slJpg.maxvalue = 12;
      slJpg.preferredSize.width = 120

      var stJpg = grSaveOptions.add("statictext");
      stJpg.preferredSize.width = 20;
    }
    var chBatchMode = pnSave.add("checkbox");
    chBatchMode.text = STR.Override

    var chReplace = pnSave.add("checkbox");
    chReplace.text = STR.Replace
    // PNSAVE
    // ======


    var bar = w.add('progressbar', undefined, 0, CFG.total);
    bar.preferredSize = [undefined, 20]
    bar.value = CFG.fileCounter + CFG.docList.count
    bar.helpTip = STR.Counter + (CFG.fileCounter + CFG.docList.count) + "\\" + CFG.total

    // =========================================
    // button module
    // =========================================    
    var grBn = w.add("group");
    grBn.orientation = "row";
    grBn.alignChildren = ["center", "center"];
    grBn.spacing = 10;
    grBn.margins = 0;

    var ok = grBn.add("button", undefined, undefined, { name: "ok" });
    ok.text = STR.Open;

    var cancel = grBn.add("button", undefined, undefined, { name: "cancel" });
    cancel.text = STR.Cancel;
  }
  // =========================================
  // open files functions
  // =========================================      

  bnSourceFolder.onClick = function () {
    getSourceFolder()
    ok.enabled = bnOkStatus()
  }

  dlSource.onChange = function () {
    bnSourceFolder.enabled = this.selection.index == 0 ? true : false
    grOpenOptions.enabled = this.selection.index == 1 ? false : true
    chGroupBySubfolder.enabled = CFG.openAll // нужно при переключении режимов, если панель была неактивна

    var tmp = CFG.sourceMode
    CFG.sourceMode = this.selection.index

    if (getSourceFolder() == false) {
      tmp = tmp == CFG.sourceMode ? 0 : tmp
      doNotUpdate = true
      this.selection = tmp
      CFG.sourceMode = tmp
      doNotUpdate = false
    }

    ok.enabled = bnOkStatus()
  }

  dlFilter.onChange = function () {
    if (!w.visible) return

    CFG.lastFileType = this.selection.text
    if (CFG.lastPath != "") enumFiles(Folder(CFG.lastPath), false)
    ok.enabled = bnOkStatus()
  }

  chSubfld.onClick = function () {
    CFG.doSubfolders = this.value;

    doNotUpdate = true;
    getSourceFolder();
    doNotUpdate = false;

    ok.enabled = bnOkStatus()
  }

  chOpenAtOnce.onClick = function () {
    CFG.openAll = chGroupBySubfolder.enabled = this.value;
    checkPresetIntegrity()
  }

  chGroupBySubfolder.onClick = function () {
    CFG.groupBySubfolder = this.value
    checkPresetIntegrity()
  }

  chAcr.onClick = function () {
    CFG.doACR = this.value
    checkPresetIntegrity()
  }

  // ======================================================
  // preset functions
  // ======================================================
  {
    dlPreset.onChange = function () {
      if (this.selection.index == 0) {
        bnDel.enabled = false

        if (!doNotUpdate) {
          var def = new Config,
            a = PS.settingsToPreset(def);
          PS.presetToSettings(a)

          var len = pnAtn.children.length
          for (var i = 0; i < len; i++) { pnAtn.remove(pnAtn.children[0]) }

          w.onShow(true)
        }
      } else {
        bnDel.enabled = true

        if (!doNotUpdate) {
          var a = PS.items.getByName(this.selection.text)
          PS.presetToSettings(a)

          var len = pnAtn.children.length
          for (var i = 0; i < len; i++) { pnAtn.remove(pnAtn.children[0]) }

          w.onShow(true)
        }
      }
      CFG.preset = this.selection.index
      if (w.visible) AM.putScriptSettings(CFG)
      checkPresetIntegrity()
    }

    bnSave.onClick = function () {
      var a = PS.settingsToPreset(CFG)
      PS.items.add(dlPreset.selection.text, a)

      AM.putScriptSettings(CFG)
      checkPresetIntegrity()
    }

    bnSaveAs.onClick = function () {
      var a = PS.settingsToPreset(CFG),
        nm = prompt(STR.PresetPromt, dlPreset.selection.text + STR.Copy, STR.Preset);

      if (nm != null && nm != "") {
        if (PS.items.getByName(nm) == null && nm != STR.Defailt) {
          PS.items.add(nm, a)

          loadPresets()

          doNotUpdate = true;
          dlPreset.selection = dlPreset.find(nm)
          doNotUpdate = false;
        } else {
          if (nm != STR.Defailt) {
            if (confirm(localize(STR.ErrPreset, nm), false, STR.Preset)) {
              PS.items.add(nm, a)

              doNotUpdate = true;
              dlPreset.selection = dlPreset.find(nm)
              doNotUpdate = false;
            }
          }
        }
      }

      AM.putScriptSettings(CFG)
      checkPresetIntegrity()
    }

    bnDel.onClick = function () {
      var nm = dlPreset.selection.text
      var num = dlPreset.selection.index

      PS.items.delete(nm)
      loadPresets()

      num = num > dlPreset.items.length - 1 ? dlPreset.items.length - 1 : num
      dlPreset.selection = num
    }

    bnRefresh.onClick = function () { dlPreset.onChange() }
  }
  // ======================================================
  // save files functions
  // ======================================================

  dlSave.onChange = function () {
    CFG.saveMode = this.selection.index

    stNoPath.visible = false

    switch (this.selection.index) {
      case 0:
      case 1:
        stSavePath.visible = bnSaveFolder.enabled = chReplace.enabled = chFolder.enabled = false
        grSaveOptions.enabled = chBatchMode.enabled = chKeepStructure.enabled = false
        break;
      case 2:
        chFolder.enabled = chBatchMode.enabled = chReplace.enabled = true
        chKeepStructure.enabled = stSavePath.visible = bnSaveFolder.enabled = chFolder.value
        if (!CFG.override) { grSaveOptions.enabled = true } else { grSaveOptions.enabled = false }

        stSavePath.text = stSavePath.helpTip = ""

        if (CFG.lastSavePath != "" && CFG.saveToFolder) {
          var fol = new Folder(CFG.lastSavePath)

          if (fol.exists && FS.isFolderWritable(fol)) {
            stSavePath.text = FS.shortenPath(fol.fsName)
            stSavePath.helpTip = fol.fsName
          }
          else {
            if (FS.getParentPath(fol)) {
              stNoPath.visible = true
              // stSavePath.visible = true
              stSavePath.text = FS.shortenPath(fol.fsName)
              stSavePath.helpTip = fol.fsName
            }
            else { CFG.lastSavePath = "" }
          }
        }
        break;
    }
    checkOptionsList(pnAtn)
    ok.enabled = bnOkStatus()
    checkPresetIntegrity()
  }

  dlFormat.onChange = function () {
    CFG.fileFormat = this.selection.index
    slJpg.visible = stJpg.visible = this.selection.index == 0 ? true : false

    checkPresetIntegrity()
  }

  chBatchMode.onClick = function () {
    CFG.override = this.value
    grSaveOptions.enabled = chReplace.enabled = !this.value

    checkOptionsList(pnAtn)
    ok.enabled = bnOkStatus()
    checkPresetIntegrity()
  }

  chFolder.onClick = function () {
    CFG.saveToFolder = this.value;
    dlSave.onChange()
  }

  chOnOpen.onClick = function () {
    CFG.autoStart = this.value; checkPresetIntegrity()
  }

  chContinue.onClick = function () {
    CFG.allowContinue = this.value; checkPresetIntegrity()
  }

  chFlatten.onClick = function () {
    CFG.flatten = this.value; checkPresetIntegrity()
  }

  chKeepStructure.onClick = function () {
    CFG.keepStruct = this.value; checkPresetIntegrity()
  }

  chReplace.onClick = function () {
    CFG.replaceFile = this.value; checkPresetIntegrity()
  }

  slJpg.onChanging = function () { CFG.jpgQuality = stJpg.text = Math.round(this.value); checkPresetIntegrity() }
  slJpg.addEventListener('keyup', commonHandler)
  slJpg.addEventListener('mouseup', commonHandler)
  slJpg.addEventListener('mouseout', commonHandler)
  function commonHandler(evt) { CFG.jpgQuality = slJpg.value = stJpg.text = Math.round(slJpg.value); checkPresetIntegrity() }

  bnSaveFolder.onClick = function () {
    if (!w.visible) return

    var fol = new Folder(CFG.lastSavePath)
    var userSelectedFolder = fol.selectDlg()

    if (userSelectedFolder) {
      if (FS.isFolderWritable(userSelectedFolder)) {
        CFG.lastSavePath = stSavePath.helpTip = userSelectedFolder.fsName; stSavePath.text = FS.shortenPath(CFG.lastSavePath)
        stNoPath.visible = false
      } else { alert(STR.ErrSaveFolder) }
    }
    ok.enabled = bnOkStatus()
    checkPresetIntegrity()
  }

  // ======================================================
  // button functions
  // ======================================================

  ok.onClick = function () {
    collectSettings(pnAtn)
    AM.putScriptSettings(CFG)
    w.close(1)
  }

  // ======================================================
  // main window function
  // ======================================================
  w.onShow = function (fromPreset) {
    if (!fromPreset) {
      doNotUpdate = true

      if (!fromEvent) {
        if (!AM.isAnyDocument()) dlSource.items[1].enabled = false
        if (!BridgeTalk.isRunning('bridge')) dlSource.items[2].enabled = false
        if (!fromBridge) {
          CFG.sourceMode = CFG.sourceMode > 2 ? 0 : CFG.sourceMode
          CFG.sourceMode = CFG.sourceMode == 1 && !dlSource.items[1].enabled ? 0 : CFG.sourceMode
          CFG.sourceMode = CFG.sourceMode == 2 && !dlSource.items[2].enabled ? 0 : CFG.sourceMode
          dlSource.selection = CFG.sourceMode
        } else { dlSource.selection = 2 }

        w.remove(bar)
      }
      else {
        // окно при возникновении ошибки
        AM.putScriptSettings(CFG) // сохраняем текущие настройки, так как после загрузки переключателей они изменятся
        dlSource.selection = CFG.sourceMode
        stCounter.text = STR.Counter + CFG.total
        ok.text = STR.Next
        cancel.text = STR.Stop
        dlSource.enabled = bnSourceFolder.enabled = chSubfld.enabled = dlFilter.enabled = stFilter.enabled = false
        AM.getScriptSettings(CFG) // получаем текущие настройки
      }

      chSubfld.value = CFG.doSubfolders

      loadPresets();
      doNotUpdate = true
      dlPreset.selection = CFG.preset > dlPreset.items.length - 1 ? 0 : CFG.preset
      doNotUpdate = false

      checkPresetIntegrity()
    }

    chAcr.value = CFG.doACR
    chOpenAtOnce.value = chGroupBySubfolder.enabled = CFG.openAll
    chGroupBySubfolder.value = CFG.groupBySubfolder

    chOnOpen.value = CFG.autoStart
    chContinue.value = CFG.allowContinue
    dlFormat.selection = CFG.fileFormat
    chFlatten.value = CFG.flatten
    slJpg.value = CFG.jpgQuality; slJpg.onChanging()
    chBatchMode.value = CFG.override
    chKeepStructure.value = CFG.keepStruct
    chReplace.value = CFG.replaceFile
    chFolder.value = CFG.saveToFolder
    if (dlSave.selection == CFG.saveMode) { dlSave.onChange() } else { dlSave.selection = CFG.saveMode == 3 ? 2 : CFG.saveMode }


    renew = false
    var tmp = CFG.options.split('\n'), len = tmp.length;
    for (var i = 0; i < len; i++) { addAction(pnAtn, tmp[i]) }
    checkOptionsList(pnAtn)
    renew = true

    ok.enabled = bnOkStatus()
    w.layout.layout(true)
  }

  // ======================================================
  // вспомогательные функции главного окна
  // ======================================================

  function bnOkStatus() {
    var noFiles = !CFG.fileList.count && !CFG.docList.count
    var noSavePath = CFG.saveToFolder && CFG.lastSavePath == "" ? true : false
    var result = noFiles || noAction || noSavePath

    return !result
  }

  function checkPresetIntegrity() {
    if (dlPreset.selection.index > 0) {
      var cur = PS.settingsToPreset(CFG),
        old = PS.items.getByName(dlPreset.selection.text);
      bnRefresh.enabled = bnSave.enabled = cur.isEqual(old) ? false : true
    } else { bnSave.enabled = false; bnRefresh.enabled = true }

    if (actionsList.length == 0) { bnRefresh.enabled = bnSave.enabled = bnDel.enabled = bnSaveAs.enabled = false }
  }

  function loadPresets() {
    var len = dlPreset.items.length
    if (len > 1) {
      for (var i = 1; i < len; i++) { dlPreset.remove(dlPreset.items[1]) }
    }

    var items = PS.items
    for (var i = 0; i < items.count; i++) { dlPreset.add('item', t2s(items.getKey(i))) }
  }

  function getSourceFolder() {
    switch (CFG.sourceMode) {
      case 0:
        if (!doNotUpdate) {
          var fol = new Folder(CFG.lastPath),
            userSelectedFolder = fol.selectDlg();
          if (!userSelectedFolder) return false
        }
        break;

      case 1:
        var userSelectedFolder = AM.findAllDocs()
        break;

      case 2:
        var userSelectedFolder = []

        if (BridgeTalk.isRunning('bridge')) {
          var bt = new BridgeTalk();
          bt.target = "bridge";
          bt.body = "" + "function getFilesFromBridge(){var files=[app.document.presentationPath];var len=app.document.selections.length;if(len==0){files.push(app.document.presentationPath)}{for (var i=0; i<len; i++){files.push(app.document.selections[i].path)}}return files.toSource()}" + "; getFilesFromBridge();";
          bt.onResult = function (response) {
            userSelectedFolder = eval(response.body)
          }
          bt.onError = function (err) {
            alert("Error!\n" + err.body)
          }

          bt.send(3000);
        } else {
          alert(STR.ErrBridge)
          return false
        }
        break;
    }

    if (userSelectedFolder) {
      var result = enumFiles(userSelectedFolder)
    } else {
      var fol = new Folder(CFG.lastPath)
      if (fol.exists) {
        var result = enumFiles(fol)
      } else {
        stPath.text = stPath.helpTip = CFG.lastPath = ""
        stCounter.text = ""
      }
    }

    if (result == false) { stPath.text = stPath.helpTip = CFG.lastPath = stCounter.text = ""; return false } else { return true }
  }

  function enumFiles(userSelectedFolder, readFromFS) {
    readFromFS = readFromFS == false ? false : true
    var filter = CFG.lastFileType == "" || CFG.lastFileType == STR.AllFiles.ru || CFG.lastFileType == STR.AllFiles.en ? STR.AllFiles.en : CFG.lastFileType

    // заполняем список файлов
    if (readFromFS) {
      switch (CFG.sourceMode) {
        case 0:
          FS.findAllFiles(userSelectedFolder, allFiles = {}, CFG.doSubfolders)
          break;
        case 2:
          allFiles = {}
          for (var i = 1; i < userSelectedFolder.length; i++) //перебор файлов всех каталогов, кроме первого
          {
            var tmp = File(userSelectedFolder[i])
            if (tmp.exists) {
              if (FS.isFolder(tmp)) {
                FS.findAllFiles(tmp, allFiles, CFG.doSubfolders)
              }
              else {
                var ext = FS.getExtension(tmp)
                if (ext) {
                  allFiles[STR.AllFiles.en] ? allFiles[STR.AllFiles.en].putPath(tmp) : (allFiles[STR.AllFiles.en] = new ActionList()).putPath(tmp);
                  allFiles[ext] ? allFiles[ext].putPath(tmp) : (allFiles[ext] = new ActionList()).putPath(tmp);
                }
              }
            }
          }
          break;
      }
    }

    // фильтруем список
    if (CFG.sourceMode != 1) {

      if (userSelectedFolder instanceof Array) {
        var fol = Folder(userSelectedFolder[0])
        if (fol.exists) {
          if (userSelectedFolder.length > 2) {
            CFG.lastPath = fol.fsName
          }
          else {
            var fle = File(userSelectedFolder[1])
            if (FS.isFolder(fle)) {
              CFG.lastPath = fle.fsName
            }
            else {
              CFG.lastPath = fol.fsName
            }
          }
        } else {
          for (var i = 1; i < userSelectedFolder.length; i++) {
            var fle = File(userSelectedFolder[i])
            if (FS.isFolder(fle) && fle.exists) {
              CFG.lastPath = fle.fsName; break;
            }
            else {
              CFG.lastPath = fle.parent.fsName; break;
            }
          }
        }
      } else { CFG.lastPath = userSelectedFolder.fsName }

      CFG.fileList = allFiles[filter] ? allFiles[filter] : new ActionList()
      CFG.docList = new ActionDescriptor()

      if (CFG.sourceMode == 2) {
        stPath.text = STR.BridgeList; stPath.helpTip = STR.BridgeList
      }
      else {
        stPath.text = FS.shortenPath(CFG.lastPath); stPath.helpTip = CFG.lastPath
      }

      if (readFromFS) {
        var shortList = []

        for (var a in allFiles) {
          if (a != STR.AllFiles) shortList.push(a)
        }
        shortList.sort(sortShortcuts)

        dlFilter.removeAll()
        dlFilter.add("item", STR.AllFiles)
        for (var i = 0; i < shortList.length; i++) {
          dlFilter.add("item", shortList[i])
        }

        if (dlFilter.find(CFG.lastFileType)) { dlFilter.selection = dlFilter.find(CFG.lastFileType).index } else { dlFilter.selection = 0 }
      }
    } else {
      CFG.fileList = new ActionList()
      CFG.docList = userSelectedFolder

      stPath.text = STR.OpenedList; stPath.helpTip = STR.OpenedList
    }

    stCounter.text = STR.Counter + (CFG.fileList.count + CFG.docList.count)

    return true

    function sortShortcuts(a, b) {
      if (a > b) { return 1 } else { return -1 }
    }
  }

  function addAction(parent, s) {
    // GRLINE
    // ======
    var grLine = parent.add("group");
    grLine.orientation = "row";
    grLine.alignChildren = ["left", "center"];
    grLine.spacing = 10;
    grLine.margins = 0;

    // GRBN
    // ====
    var grBn = grLine.add("group");
    grBn.orientation = "row";
    grBn.alignChildren = ["left", "center"];
    grBn.spacing = 0;
    grBn.margins = 0;

    var bnAdd = grBn.add("button");
    bnAdd.text = "+";
    bnAdd.preferredSize.width = 30;

    var bnDel = grBn.add("button");
    bnDel.text = "-";
    bnDel.preferredSize.width = 30;

    // GROPT
    // =====
    var grOpt = grLine.add("group");
    grOpt.orientation = "row";
    grOpt.alignChildren = ["left", "center"];
    grOpt.spacing = 5;
    grOpt.margins = [5, 0, 0, 0];

    var chActive = grOpt.add("checkbox");
    chActive.text = STR.Activate

    var dlSet = grOpt.add("dropdownlist");
    dlSet.preferredSize.width = 170;

    var dlAtn = grOpt.add("dropdownlist");
    dlAtn.preferredSize.width = 170;

    var chStop = grOpt.add("checkbox");
    chStop.text = STR.Stop

    var stErr = grOpt.add("statictext")
    //alert ($.os.version)
    stErr.text = "!"
    stErr.graphics.font = "dialog-Bold:12"
    stErr.preferredSize.width = 12

    bnAdd.onClick = function () {
      renew = false
      var options = CFG.options.split('\n')

      var len = parent.children.length
      for (var i = 0; i < len; i++) { if (grLine == parent.children[i]) break; }
      for (var n = i + 1; n < len; n++) { parent.remove(parent.children[i + 1]) }

      var tmp = options.slice(0, i + 1)
      tmp.push("")
      tmp = tmp.concat(options.slice(i + 1, len))
      options = options.slice(i + 1, len)
      CFG.options = tmp.join('\n')

      addAction(parent, "")

      for (var i = 0; i < options.length; i++) { addAction(parent, options[i]) }

      renew = true

      checkOptionsList(parent)
      collectSettings(parent)
      w.layout.layout(true)
    }

    bnDel.onClick = function () {
      renew = false
      var options = CFG.options.split('\n')

      var len = parent.children.length
      for (var i = 0; i < len; i++) { if (grLine == parent.children[i]) break; }
      for (var n = i; n < len; n++) { parent.remove(parent.children[i]) }

      var tmp = options.slice(0, i)
      tmp = tmp.concat(options.slice(i + 1, len))
      options = options.slice(i + 1, len)
      CFG.options = tmp.join('\n')

      for (var i = 0; i < options.length; i++) { addAction(parent, options[i]) }

      if (len - 1 == 0) { addAction(parent, "") }

      renew = true

      checkOptionsList(parent)
      parent.parent.children[!fromEvent ? 5 : 6].children[0].enabled = bnOkStatus()

      collectSettings(parent)
      w.layout.layout(true)
    }

    dlSet.onChange = function () {
      if (this.enabled) {
        dlAtn.removeAll()
        var idx = this.selection.index
        if (actionsList.length > 0) for (var i = 0; i < actionsList[idx][1].length; i++) { dlAtn.add('item', actionsList[idx][1][i]) }
        dlAtn.selection = 0
      }

      if (renew) collectSettings(parent)
    }

    dlAtn.onChange = function () {
      var len = parent.children.length
      if (CFG.options.split('\n').length == len && CFG.override && parent.children[len - 1] == grLine && renew) checkOptionsList(parent, true)

      if (renew) collectSettings(parent)
    }

    chStop.onClick = function () { if (renew) collectSettings(parent) }

    chActive.onClick = function () {
      var len = parent.children.length
      if (CFG.options.split('\n').length == len && CFG.override && parent.children[len - 1] == grLine && renew) { checkOptionsList(parent); parent.parent.children[!fromEvent ? 5 : 6].children[0].enabled = bnOkStatus() }

      dlSet.enabled = dlAtn.enabled = chStop.enabled = this.value
      if (renew) collectSettings(parent)
    }

    // выполняется один раз при загрузке строки
    addLine(s.split('\t'))
    checkLine()

    parent.parent.children[!fromEvent ? 5 : 6].children[0].enabled = bnOkStatus()

    collectSettings(parent)

    function addLine(s) {
      var cur = 0,
        len = grOpt.children.length;

      for (var i = 0; i < len; i++) {
        var current = grOpt.children[i]
        switch (current.type) {
          case "dropdownlist":
            s[cur] = s[cur] == undefined ? "" : s[cur]
            current.add('item', s[cur])
            cur++
            break;
          case "checkbox":
            if (cur == 0) {
              s[cur] = s[cur] == "" ? 1 : Number(s[cur])
            }
            else {
              s[cur] = s[cur] == undefined ? 0 : Number(s[cur])
            }
            current.value = s[cur]
            cur++
            break;
        }
      }
    }

    function checkLine() {
      var set = dlSet.items[0].text
      var atn = dlAtn.items[0].text

      dlSet.removeAll()
      dlAtn.removeAll()

      for (var i = 0; i < actionsList.length - 1; i++) { dlSet.add('item', actionsList[i][0]) }
      if (set == "" && actionsList.length > 1) { dlSet.selection = actionsList[actionsList.length - 1][0] }
      else {
        if (dlSet.find(set)) {
          dlSet.selection = dlSet.find(set).index
        }
        else {
          dlSet.add('item', set)
          chActive.label = Number(chActive.value)
          chActive.enabled = false
          dlSet.selection = dlSet.items.length - 1
        }
      }

      if (atn == "" && actionsList.length > 1) { dlAtn.selection = actionsList[actionsList.length - 1][1] }
      else {
        if (dlAtn.find(atn) && dlSet.enabled) {
          dlAtn.selection = dlAtn.find(atn).index
        } else {
          if (chActive.label == undefined) chActive.label = Number(chActive.value)
          chActive.enabled = false
          dlAtn.add('item', atn); dlAtn.selection = dlAtn.items.length - 1
        }
      }

      dlSet.enabled = dlAtn.enabled = chStop.enabled = chActive.value
      if (!chActive.enabled) dlSet.enabled = dlAtn.enabled = chStop.enabled = false
    }
  }

  function collectSettings(parent) {
    var output = []
    var len = parent.children.length

    for (var i = 0; i < len; i++) { output.push(readLine(parent.children[i].children[1])) }

    CFG.options = output.join('\n')
    checkPresetIntegrity()

    function readLine(parent) {
      var line = []
      var len = parent.children.length
      for (var i = 0; i < len; i++) {
        switch (parent.children[i].type) {
          case "dropdownlist":
            line.push(parent.children[i].selection)
            break;
          case "checkbox":
            if (parent.children[i].label == undefined) {
              line.push(Number(parent.children[i].value))
            }
            else {
              line.push(parent.children[i].label)
            }
            break;
        }
      }
      return line.join('\t')
    }
  }

  function checkOptionsList(parent) {
    if (parent.children.length == 0) return

    var result = false
    var len = parent.children.length

    // убираем видимые индикаторы, делаем видимыми все "стопы"
    for (var i = 0; i < len; i++) {
      var line = parent.children[i].children[1]
      if (line.children[4].visible) line.children[4].visible = false
      if (!line.children[3].visible) line.children[3].visible = true
    }

    // если включен батч-совместимый режим, проверяем последнюю команду
    if (CFG.saveMode > 1) {
      var line = parent.children[len - 1]
      if (CFG.override == true) {
        if (!AM.findSaveCommand(line)) { showErr(1, line.children[1].children[4]) }
        if (!line.children[1].children[0].value) { showErr(2, line.children[1].children[4]); result = true }
      }
      if (CFG.override) line.children[1].children[3].visible = false
    }

    //if (overrideMode) {noAction = result; return !result}

    // проверяем доступность каждой команды
    for (var i = 0; i < len; i++) {
      var line = parent.children[i].children[1]
      var bn = line.parent.children[0]

      if (line.children[0].label != undefined) {
        result = true
        showErr(0, line.children[4])
      }

      // доступность кнопок добавить/удалить
      bn.children[0].enabled = len >= 5 || actionsList.length == 0 ? false : true
      bn.children[1].enabled = actionsList.length == 0 ? false : true
    }

    // доступность первой кнопки "удалить"
    if (actionsList.length != 0 && len == 1) { parent.children[0].children[0].children[1].enabled = parent.children[0].children[1].children[0].label != undefined ? true : false }

    noAction = result
    return !result

    function showErr(mode, labelObj) {
      // 0 - экшен не найден
      // 1 - нет команды сохранить как в последнем действии
      // 2 - последнее действие неактивно

      var gfx = w.graphics
      var stGfx = labelObj.graphics;
      stGfx.font = "dialog-Bold:12"
      labelObj.visible = true
      switch (mode) {
        case 0:
          stGfx.foregroundColor = gfx.newPen(gfx.PenType.SOLID_COLOR, [1, 0, 0, 1], 1);
          labelObj.helpTip = STR.ErrActionTip
          break;
        case 1:
          stGfx.foregroundColor = gfx.newPen(gfx.PenType.SOLID_COLOR, [1, 0.8, 0, 1], 1);
          labelObj.helpTip = localize(STR.ErrOverrideTip, STR.Override)
          break;
        case 2:
          stGfx.foregroundColor = gfx.newPen(gfx.PenType.SOLID_COLOR, [1, 0, 0, 1], 1);
          labelObj.helpTip = localize(STR.ErrLastActionTip, STR.Override)
          break;
      }
    }
  }
  return w
}

// =========================================
// основные функции
// =========================================    
function doBatch() {

  while (doLoop()) { }

  if (CFG.globalErr) main()
}

function doLoop() {
  var result = false   // маркер результата открытия файла
  if (CFG.doneCounter == -1) { // если обработка прошлого документа окончена
    if (CFG.docList.count == 0) { openFiles() } // если нет документов в очереди, попытаться открыть файл, сформировать очередь документов
    if (selectDocument()) { // попытаться активировать открытый файл из очереди документов
      result = true
      CFG.doneCounter = 0
      CFG.continue = 0
    }
  } else { result = true } // процесс обработки не завершен

  if (CFG.doneCounter == 0 && Boolean(CFG.autoStart) == false) CFG.doneCounter = -2 // если выключен авто запуск пропускаем первую операцию

  if (CFG.doneCounter != -1) { // если операция не окончена
    allDone = false // глобальная переменная, отмечаем что результат выполнения цикла нужно записать в настройки
    if (result) { // если открытие документа было успшеным
      var todo = CFG.options.split('\n') // получаем список экшенов
      if (CFG.doneCounter <= todo.length && CFG.doneCounter != -2) { // если текущий номер команды меньше общего количества операций и не установлен ручной запуск
        CFG.doneCounter = CFG.doneCounter < 0 ? 0 : CFG.doneCounter // если установлен ручной запуск -3
        do {
          if (CFG.doneCounter < todo.length) { // если текущий номер команды меньше количества команд в списке
            var tmp = todo[CFG.doneCounter].split('\t') //получаем из настроек строку с операцией
            if (Boolean(Number(tmp[0])) == true) { // если команда активна
              if (AM.isActionAvailable(tmp[1], tmp[2]) == 0) { alert(localize(STR.ErrAction, tmp[1], tmp[2])); CFG.globalErr = true; break; } // если этот экшен есть на панели

              if (CFG.doneCounter < todo.length - 1 || Boolean(CFG.override) == false || CFG.saveMode == 0 || CFG.saveMode == 1) { //есди сейчас последняя команда из списка или выключен режим batch или не нужно сохранять файл
                var cur = tmp.toString() + "\n" + CFG.continue // текущая операция + номер команды в виде текста
                var isDone = AM.runAction(tmp[1], tmp[2], CFG.continue) // выполняем экшен

                if (isDone == true) { // если выполнение экшена успешно
                  CFG.doneCounter++ // следующая операция в списке
                  if (Boolean(Number(tmp[3]))) break; // если установлен стоп после команды, то выходим не завершая цикл
                }
                else {
                  if (cur == tmp.toString() + "\n" + CFG.continue && CFG.continue != 0) CFG.continue = -1 // если операция встала на том же месте, где и при прошлом запуске, считаем что она выполнена

                  if (CFG.allowContinue) { // если было прерывание внутри команды
                    switch (CFG.continue) {
                      case -1:
                        CFG.globalErr = true
                        break;
                      case 0:
                        CFG.doneCounter++ // если действие последнее???? то куда прибавлять!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        break;
                    }
                  }
                  else {
                    switch (CFG.continue) {
                      case -1:
                        CFG.globalErr = true
                        break;
                      default: // переходим к след. команде если был стоп внутри прошлой
                        CFG.continue = 0
                        CFG.doneCounter++
                    }
                  }
                  break; // выходим из цикла
                }
              }
              else { // сохранение в батч режиме
                if (!AM.isAnyDocument()) { alert(STR.ErrDoc); CFG.globalErr = true; break; } // если документ закрыт на момент сохранения
                var pref = new BatchOptions
                pref.overrideSave = true
                pref.fileNaming = [FileNamingType.DOCUMENTNAMEMIXED, FileNamingType.EXTENSIONLOWER]
                pref.unixCompatible = false
                var pth = AM.getActiveDocPath()

                switch (CFG.saveMode) {
                  case 0:
                  case 1:
                    break;
                  case 2:
                    if (!CFG.saveToFolder) {
                      if (pth == null) { alert(localize(STR.ErrOverride, STR.Override)); CFG.globalErr = true; break; }
                      pref.destination = BatchDestinationType.SAVEANDCLOSE
                      try { app.batch([pth], tmp[2], tmp[1], pref) } catch (e) { alert(STR.ErrSave); CFG.globalErr = true; break; }
                    } else {
                      if (pth == null) { alert(localize(STR.ErrOverride, STR.Override)); CFG.globalErr = true; break; }
                      var fol = Boolean(CFG.keepStruct) ? FS.rebuildPath(pth.path, CFG.lastSavePath) : Folder(CFG.lastSavePath)
                      if (!fol.exists) { try { fol.create() } catch (e) { alert(localize(STR.ErrFolder, fol.fsName)); CFG.globalErr = true; break; } }
                      pref.destinationFolder = fol
                      pref.destination = BatchDestinationType.FOLDER
                      try { app.batch([pth], tmp[2], tmp[1], pref) } catch (e) { alert(STR.ErrSave); CFG.globalErr = true; break; }
                    }
                    break;
                }

                if (CFG.globalErr) { break; }
                CFG.doneCounter = -1
                CFG.activeDocument = new ActionDescriptor()

                CFG.batch = CFG.fileCounter // сохраняем список готовых файлов
                return true;
              }
            } else { CFG.doneCounter++ } // если строка неактивна, пропустить
          }
          else { // сохранение в обычном режиме
            if (!AM.isAnyDocument() && CFG.saveMode != 0) { alert(STR.ErrDoc); CFG.globalErr = true; break; }
            if (!CFG.override || CFG.saveMode == 0 || CFG.saveMode == 1) {
              if (CFG.saveMode == 2 || CFG.saveMode == 3) {
                var fileName = AM.getActiveDocPath()
                fileName = fileName == null ? File(AM.getDocTitle()).name : fileName.name
                fileName = FS.removeExtension(fileName)
                var pth = AM.getActiveDocPath()
                if (pth != null) { pth = pth.path }
              }

              switch (CFG.saveMode) {
                case 0:
                  break;
                case 1:
                  var fol = AM.getActiveDocPath()
                  if (fol == null) { alert(STR.ErrNewFile); CFG.globalErr = true; break; }
                  try { AM.closeDocument(true) } catch (e) { alert(STR.ErrSave); CFG.globalErr = true; break }
                  break;
                case 2:
                  if (!CFG.saveToFolder) {
                    if (pth == null) { alert(STR.ErrNewFile); CFG.globalErr = true; break; }
                    try { FS.saveAs(fileName, pth) } catch (e) { alert(STR.ErrSave); CFG.globalErr = true; break }
                  } else {
                    fol = Boolean(CFG.keepStruct) ? FS.rebuildPath(pth, CFG.lastSavePath) : Folder(CFG.lastSavePath)
                    if (!fol.exists) { try { fol.create() } catch (e) { alert(localize(STR.ErrFolder, fol.fsName)); CFG.globalErr = true; break } }
                    try { FS.saveAs(fileName, fol) } catch (e) { alert(STR.ErrSave); CFG.globalErr = true; break }
                  }
                  AM.closeDocument()
                  break;
              }

            } else { alert(localize(STR.ErrBatchMode, STR.Override, tmp[1], tmp[2])); CFG.globalErr = true; break } // если последнее действие деактивировано и мы попали сюда вместо override

            if (CFG.globalErr) { break; }
            CFG.doneCounter = -1
            CFG.activeDocument = new ActionDescriptor()

            CFG.batch = CFG.fileCounter // обновляем позицию в списке файлов в очереди на обработку
            return true;
          }
        } while (true)
        if (CFG.globalErr) { AM.putScriptSettings(CFG); return false; }

      } else { CFG.doneCounter = -3 } // ручной запуск
    }
  }
  // записать в настройки результат выполнения экшенов
  if (CFG.fileCounter >= CFG.fileList.count && !CFG.docList.count && CFG.doneCounter == -1 && EVT.chkEvt()) { CFG.batch = -1; EVT.delEvt() }
  if (!allDone) { AM.putScriptSettings(CFG); allDone = true }

  return false;
}

function openFiles() {
  var success = false // было ли в итоге открытие файла удачным
  do {
    if (CFG.fileCounter >= CFG.fileList.count && CFG.docList.count == 0) break;
    app.doForcedProgress("", "openFile ()")
  } while (success == false)

  return success

  function openFile() {
    CFG.batch = CFG.fileCounter // сохраняем начальную позицию в очереди

    var errCounter = 0
    if (!CFG.docList.count) {
      while (CFG.fileCounter < CFG.fileList.count) {
        var fileList = new ActionList()
        fileList.putPath(CFG.fileList.getPath(CFG.fileCounter))

        if (!CFG.openAll) {
          var s = decodeURI(fileList.getPath(0).name),
            total = CFG.total,
            current = CFG.fileCounter + 1,
            text = current + '\\' + total + ": " + s;
        } else {
          CFG.fileCounter++
          while (CFG.fileCounter < CFG.fileList.count) {
            var cur = CFG.fileList.getPath(CFG.fileCounter)
            if (CFG.groupBySubfolder && cur.path != fileList.getPath(0).path) break;
            fileList.putPath(cur)
            CFG.fileCounter++
          }
          CFG.fileCounter--
          var s = FS.shortenPath(Folder(fileList.getPath(0).path).fsName),
            total = CFG.total,
            current = CFG.fileCounter + 1,
            text = '(' + (CFG.batch + 1) + '-' + current + ')' + '\\' + total + ": " + s;
        }

        app.changeProgressText(text)
        app.updateProgress(current, total)

        try {
          if (CFG.doACR) {
            AM.openCameraRaw(fileList)
          } else {
            AM.openFile(fileList)
          }

          // если файлы были открыты пачкой, то перекинуть открытые файлы в документы (от CFG.batch  до CFG.fileCounter )
          var d = new ActionDescriptor(),
            docs = AM.findAllDocs(true);

          for (var i = CFG.batch; i <= CFG.fileCounter; i++) {
            var f = s2t(CFG.fileList.getPath(i).fsName)
            if (docs.hasKey(f)) {
              d.putString(s2t(docs.getInteger(f)), t2s(f))
            }
          }

          // документы открыты, скрипт готов к дальнейшему выполнению операций
          success = true
          CFG.docList = d
          CFG.fileCounter++
          break;
        } catch (e) {
          errCounter++
        }

        if (errCounter >= 2) // если были подряд идущие ошибки, то прекратить открытие и сбросить
        {
          CFG.total = 0
          CFG.fileCounter = 0
          CFG.fileList = new ActionList()
          CFG.docList = new ActionDescriptor()
          CFG.batch = -1
          break;
        }
        CFG.fileCounter++ // если была ошибка при открытии, перейти к следующему файлу
      }
    }

    AM.putScriptSettings(CFG)
  }
}

function selectDocument() {
  // проверяем активный документ, есть ли он в списке
  var cur = s2t(AM.getActiveDocID());
  if (CFG.docList.hasKey(cur)) {
    (CFG.activeDocument = new ActionDescriptor()).putString(cur, CFG.docList.getString(cur));
    CFG.docList.erase(cur);
    return true
  } else {
    while (CFG.docList.count) {
      var cur = CFG.docList.getKey(0),
        f = CFG.docList.getString(cur);
      CFG.docList.erase(cur)
      if (AM.selectDocumentByID(t2s(cur + 100))) {
        (CFG.activeDocument = new ActionDescriptor()).putString(cur, f)
        return true
      }
    }
  }
  return false
}

function convertArrayToObject(s, t) {
  for (var i = 0; i < s.length; i++) t[s[i]] = true;
}

function ActionManager() {
  gApplication = s2t("application"),
    gAction = s2t("action"),
    gActionSet = s2t("actionSet"),
    gClose = s2t("close"),
    gCommand = s2t("command"),
    gContinue = s2t("continue"),
    gDocument = s2t("document"),
    gDocumentID = s2t("documentID"),
    gFileReference = s2t("fileReference"),
    gItemIndex = s2t("itemIndex"),
    gNumberOfChildren = s2t("numberOfChildren"),
    gMessage = s2t("message"),
    gName = s2t("name"),
    gNo = s2t("no"),
    gNotify = s2t("notify"),
    gNull = s2t("null"),
    gNumberOfDocuments = s2t("numberOfDocuments"),
    gOpen = s2t("open"),
    gOrdinal = s2t("ordinal"),
    gOverrideOpen = s2t("overrideOpen"),
    gParent = s2t("parentName"),
    gPlay = s2t("play"),
    gProperty = s2t("property"),
    gSave = s2t("saving"),
    gSelect = s2t("select"),
    gTarget = s2t("target"),
    gTargetEnum = s2t("targetEnum"),
    gTitle = s2t("title"),
    gYesNo = s2t("yesNo"),
    gYes = s2t("yes"),
    mStop = localize("$$$/Actions/Event/Stop"),
    mSave = localize("$$$/Actions/Event/Save");

  this.getActionsList = function () {
    var output = [],
      setCounter = 1

    while (true) {
      (r = new ActionReference()).putIndex(gActionSet, setCounter);
      try { desc = executeActionGet(r) } catch (e) { break; }
      output.push([desc.getString(gName), []])
      var numberChildren = desc.hasKey(gNumberOfChildren) ? desc.getInteger(gNumberOfChildren) : 0
      if (numberChildren > 0) output[setCounter - 1][1] = getActionList(setCounter, numberChildren)
      setCounter++
    }

    if (output.length > 0) output.push(getActiveSetName())

    function getActionList(setIndex, numChildren) {
      var current = []
      for (var i = 1; i <= numChildren; i++) {
        (r = new ActionReference()).putIndex(gAction, i);
        r.putIndex(gActionSet, setIndex)
        current.push(executeActionGet(r).getString(gName))
      }
      return current
    }

    function getActiveSetName() {
      var atn, set;
      try {
        (r = new ActionReference()).putEnumerated(gAction, gOrdinal, gTargetEnum);
        atn = executeActionGet(r).getString(gParent);

        try {
          (r = new ActionReference()).putName(gActionSet, atn);
          set = executeActionGet(r).getString(gName);

          (r = new ActionReference()).putEnumerated(gAction, gOrdinal, gTargetEnum);
          atn = executeActionGet(r).getString(gName);
        } catch (e) {
          (r = new ActionReference()).putName(gAction, atn);
          set = executeActionGet(r).getString(gParent);
        }
      }
      catch (e) { return [0, 0] }

      try {
        (r = new ActionReference()).putName(gActionSet, set);
        set = executeActionGet(r).getInteger(gItemIndex);
      } catch (e) { set = 1 }

      try {
        (r = new ActionReference()).putName(gAction, atn);
        atn = executeActionGet(r).getInteger(gItemIndex)
      } catch (e) { atn = 1 }

      return [set - 1, atn - 1]
    }

    return output
  }

  this.getActiveDocPath = function () {
    try {
      (r = new ActionReference()).putProperty(gProperty, p = gFileReference);
      r.putEnumerated(gDocument, gOrdinal, gTargetEnum)
      return executeActionGet(r).getPath(p)
    } catch (e) {
      cur = s2t(this.getActiveDocID())

      if (CFG.activeDocument.hasKey(cur)) {
        f = CFG.activeDocument.getString(cur);
        if (f != '') return File(f)
      } else if (CFG.docList.hasKey(cur)) {
        f = CFG.docList.getString(cur);
        if (f != '') return File(f)
      }
      return null
    }
  }

  this.getActiveDocID = function () {
    (r = new ActionReference()).putProperty(gProperty, gDocumentID);
    r.putEnumerated(gDocument, gOrdinal, gTargetEnum);
    try { return executeActionGet(r).getInteger(gDocumentID) } catch (e) { return 0 }
  }

  this.selectDocumentByID = function (id) {
    (r = new ActionReference()).putIdentifier(gDocument, id);
    (d = new ActionDescriptor()).putReference(gNull, r);
    try { executeAction(gSelect, d, DialogModes.NO); return true } catch (e) { return false }
  }

  this.isAnyDocument = function () {
    (r = new ActionReference()).putProperty(gProperty, p = gNumberOfDocuments);
    r.putEnumerated(gApplication, gOrdinal, gTargetEnum)
    return executeActionGet(r).getInteger(p) > 0 ? true : false
  }

  this.findAllDocs = function (reverse) {
    var d = new ActionDescriptor();

    (r = new ActionReference()).putProperty(gProperty, p = gNumberOfDocuments);
    r.putEnumerated(gApplication, gOrdinal, gTargetEnum)
    var len = executeActionGet(r).getInteger(p);

    if (len > 0) {
      (r = new ActionReference()).putProperty(gProperty, p = gDocumentID);
      r.putEnumerated(gDocument, gOrdinal, gTargetEnum)
      var ordinalId = executeActionGet(r).getInteger(p);

      (r = new ActionReference()).putProperty(gProperty, p = gFileReference);
      r.putEnumerated(gDocument, gOrdinal, gTargetEnum)
      var f = executeActionGet(r).hasKey(p) ? executeActionGet(r).getPath(p).fsName : (reverse ? 0 : '')

      if (!reverse) { d.putString(s2t(ordinalId), f) } else { d.putInteger(s2t(f), ordinalId) }

      for (var i = len; i >= 1; i--) {
        (r = new ActionReference()).putProperty(gProperty, p = gDocumentID);
        r.putIndex(gDocument, i)
        var id = executeActionGet(r).getInteger(p);

        if (id == ordinalId) continue;

        (r = new ActionReference()).putProperty(gProperty, p = gFileReference);
        r.putIndex(gDocument, i)
        var f = executeActionGet(r).hasKey(p) ? executeActionGet(r).getPath(p).fsName : (reverse ? 0 : '');
        if (!reverse) { d.putString(s2t(id), f) } else { d.putInteger(s2t(f), id) }
      }
    }
    return d
  }

  this.runAction = function (setName, atnName, idx) {
    r = new ActionReference()
    idx = idx == undefined ? 0 : idx
    if (idx != 0) r.putIndex(gCommand, idx)

    r.putName(gAction, atnName);
    r.putName(gActionSet, setName);
    (d = new ActionDescriptor()).putReference(gTarget, r);

    if (idx != 0) d.putBoolean(gContinue, true)

    try {
      executeAction(gPlay, d)
      CFG.continue = 0
      return true
    }
    catch (e) {
      CFG.continue = this.getCurrentCommand(setName, atnName)
      return false
    }
  }

  this.getCurrentCommand = function (setName, atnName) {
    var idx,
      command

    try {
      (r = new ActionReference()).putEnumerated(gAction, gOrdinal, gTargetEnum);
      idx = executeActionGet(r).getInteger(gItemIndex)
      command = executeActionGet(r).getString(gName)
    } catch (e) { idx = 0 }

    if (this.isActionAvailable(setName, atnName) == idx && command == atnName) {
      if (idx == 0) return -1;
      (r = new ActionReference()).putName(gAction, atnName);
      r.putName(gActionSet, setName)
      var numberOfChildren = executeActionGet(r).getInteger(gNumberOfChildren);

      (r = new ActionReference()).putIndex(gCommand, numberOfChildren);
      r.putName(gAction, atnName)
      r.putName(gActionSet, setName)
      if (executeActionGet(r).getString(gName) == mStop) { return 0 } else { return -1 }
    }
    else {
      if (idx < 2) return -1;
      (r = new ActionReference()).putIndex(gCommand, idx - 1);
      r.putName(gAction, atnName)
      r.putName(gActionSet, setName)
      if (executeActionGet(r).getString(gName) == mStop) { return idx } else { return -1 }
    }
  }

  this.findSaveCommand = function (optionLine) {
    try {
      var atnName = optionLine.children[1].children[2].selection.text,
        setName = optionLine.children[1].children[1].selection.text;

      (r = new ActionReference()).putProperty(gProperty, gNumberOfChildren);
      r.putName(gAction, atnName)
      r.putName(gActionSet, setName)
      var len = executeActionGet(r).getInteger(gNumberOfChildren)

      for (var i = 1; i <= len; i++) {
        (r = new ActionReference()).putIndex(gCommand, i);
        r.putName(gAction, atnName)
        r.putName(gActionSet, setName)

        if (executeActionGet(r).getString(gName) == mSave && executeActionGet(r).getInteger(gNumberOfChildren) > 0) { return true }
      }
    } catch (e) { }

    return false
  }

  this.getDocTitle = function () {
    (r = new ActionReference()).putProperty(gProperty, p = gTitle);
    r.putEnumerated(gDocument, gOrdinal, gTargetEnum)
    return executeActionGet(r).getString(p)
  }

  this.isActionAvailable = function (set, action) {
    try {
      (r = new ActionReference()).putName(gAction, action);
      r.putName(gActionSet, set)
      return executeActionGet(r).getInteger(gItemIndex)
    } catch (e) { return 0 }
  }

  this.openCameraRaw = function (fileList) {
    (d = new ActionDescriptor()).putList(gNull, fileList);
    d.putBoolean(gOverrideOpen, true);
    executeAction(gOpen, d, DialogModes.ALL);
  }

  this.openFile = function (fileList) {
    (d = new ActionDescriptor()).putList(gNull, fileList);
    executeAction(gOpen, d, DialogModes.NO);
  }

  this.closeDocument = function (save) {
    save = save != true ? gNo : gYes;
    (d = new ActionDescriptor()).putEnumerated(gSave, gYesNo, save);
    executeAction(gClose, d, DialogModes.NO)
  }

  this.getScriptSettings = function (settingsObj) {
    try {
      var d = app.getCustomOptions(GUID)
      if (d != undefined) this.descriptorToObject(settingsObj, d, STR.Message)
    } catch (e) { }
  }

  this.putScriptSettings = function (settingsObj) {
    var d = this.objectToDescriptor(settingsObj)
    app.putCustomOptions(GUID, d)
  }

  this.descriptorToObject = function (o, d) {
    var l = d.count;
    for (var i = 0; i < l; i++) {
      var k = d.getKey(i),
        t = d.getType(k);
      strk = t2s(k);
      switch (t) {
        case DescValueType.BOOLEANTYPE: o[strk] = d.getBoolean(k); break;
        case DescValueType.STRINGTYPE: o[strk] = d.getString(k); break;
        case DescValueType.INTEGERTYPE: o[strk] = d.getDouble(k); break;
        case DescValueType.LISTTYPE: o[strk] = d.getList(k); break;
        case DescValueType.OBJECTTYPE: o[strk] = d.getObjectValue(k); break;
      }
    }
  }

  this.objectToDescriptor = function (o) {
    var d = new ActionDescriptor(),
      l = o.reflect.properties.length;
    for (var i = 0; i < l; i++) {
      var k = o.reflect.properties[i].toString();
      if (k == "__proto__" || k == "__count__" || k == "__class__" || k == "reflect") continue;
      var v = o[k];
      k = s2t(k);

      switch (typeof (v)) {
        case "boolean": d.putBoolean(k, v); break;
        case "string": d.putString(k, v); break;
        case "number": d.putInteger(k, v); break;
        case "object":
          if (v.typename == 'ActionDescriptor') {
            d.putObject(k, s2t('object'), v)
          } else if (v.typename == 'ActionList') {
            d.putList(k, v)
          }
          break;
      }
    }
    return d;
  }
}

function Locale() {
  this.Acr = { ru: "использовать ACR для поддерживаемых типов файлов", en: "use ACR for supported file types" },
    this.Activate = { ru: "включить", en: "active" },
    this.AllFiles = { ru: "все файлы", en: "all files" },
    this.Atn = { ru: "Операции:", en: "Actions:" },
    this.Auto = { ru: "автоматически запускать первую операцию при открытии документа", en: "automatically start first action when opening a document" },
    this.BridgeList = { ru: "список файлов из Bridge", en: "Bridge file list" },
    this.Browse = { ru: "Обзор...", en: "Browse..." },
    this.Cancel = { ru: "Отмена", en: "Cancel" },
    this.Continue = { ru: "продолжить с команды \"стоп\", если остановка была внутри операции", en: "continue from the \"stop\" command, if the stop was inside the action" },
    this.ContinueBatch = { ru: "Продолжение обработки", en: "Continue processing" },
    this.ContinueBatchMsg = { ru: "Прошлое задание не было завершено!\nПродолжить обработку с места остановки?\n", en: "The previous job was not completed!\nDo you want to continue processing from the last saved file?\n" },
    this.ContinueBatchNext = { ru: "следующий файл: ", en: "next file: " },
    this.Copy = { ru: " копия", en: " copy" },
    this.Counter = { ru: "количество файлов: ", en: "number of files: " },
    this.Defailt = { ru: "по-умолчанию", en: "default" },
    this.Delete = { ru: "Удалить", en: "Delete" },
    this.ErrAction = { ru: "Обработка остановлена!\nОперация \"%1\" > \"%2\" не найдена!", en: "Processing stopped!\Action \"%1\" > \"%2\" not found!" },
    this.ErrActionTip = { ru: "Операция не найдена\nУдалите её из списка, чтобы продолжить", en: "Action not found\nRemove it from the list to continue" },
    this.ErrAtnHeader = { ru: "Операции", en: "Actions" },
    this.ErrBatchMode = { ru: "Обработка остановлена!\nОпция \"%1\" активна, но при этом операция \"%2\" > \"%3\" выключена!", en: "Processing stopped!\nOption \"%1\" is active, but the action \"%2\" > \"%3\" is not active!" },
    this.ErrBridge = { ru: "Невозможно установить соединение с Bridge!", en: "Unable connect to Bridge!" },
    this.ErrDoc = { ru: "Обработка остановлена!\nДокумент закрыт до начала операции сохранения!", en: "Processing stopped!\nThe document is closed before the save action!" },
    this.ErrFolder = { ru: "Обработка остановлена!\nПапка %1 недоступна для сохранения файлов!", en: "Processing stopped!\nThe folder %1 is not available for saving files!" },
    this.ErrSaveFolder = { ru: "Указанная папка недоступна для сохранения файлов!", en: "The specified folder is not available for saving files!" },
    this.ErrLastActionTip = { ru: "Операция выключена\nПереопределение команды \"сохранить как\" возможно только для последней операции в списке\nВыключите опцию \"%1\" или включите операцию", en: "Action is turned off\nOverriding the \"save As\" command possible only for the last action in the list\nTurn off the option \"%1\" or enable the action" },
    this.ErrNewFile = { ru: "Обработка остановлена!\nОпция \"сохранить и закрыть\" не работает для новых, ранее не сохраненных документов!", en: "Processing stopped!\nOption \"save and close\" does not work for new documents without saved path!" },
    this.ErrNoPathTip = { ru: "Папка не найдена!\nОна будет автоматически создана при сохранении файла", en: "Folder not found\nBut it will be automatically created when saving the file" },
    this.ErrOverride = { ru: "Обработка остановлена!\nОпция \"%1\" не работает для новых, ранее не сохраненных документов!", en: "Processing stopped!\nOption \"%1\" does not work for new documents without saved path!" },
    this.ErrOverrideTip = { ru: "Не найдена команда \"сохранить как\"\nВозможна некорректная работа при включенной опции \"%1\"\nИзмените настройки или убедитесь, что операция содержит команду \"сохранить как\"", en: "Command \"save as\" not found\nSaving may work incorrectly when the option \"%1\"is enabled\nChange the settings or make sure that the action contains \"save as\" command" },
    this.ErrPreset = { ru: "Набор с именем \"%1\" уже существует. Перезаписать?", en: "A set with the name \"%1\" already exists. Overwrite?" },
    this.ErrNoPreset = { ru: "Ошибка при загрузке файла пресетов!", en: "Error loading preset file!" },
    this.ErrSave = { ru: "Обработка остановлена!\nОшибка при сохранении файла!", en: "Processing stopped!\nError saving file!" },
    this.Ext = { ru: "открывать следующие типы файлов: ", en: "open following file types: " },
    this.Flatten = { ru: "объединить слои", en: "flatten layers" },
    this.Format = { ru: "тип файла:", en: "file type:" },
    this.FromBridge = { ru: "получить файлы из Bridge", en: "get files form Bridge" },
    this.KeepStructure = { ru: "сохранять структуру подпапок", en: "keep this.ucture of subfolders" },
    this.Message = "Advanced batch",
    this.Next = { ru: "Следующий файл", en: "Next file" },
    this.None = { ru: "ничего", en: "none" },
    this.Open = { ru: "Начать обработку", en: "Start processing" },
    this.OpenAll = { ru: "открыть сразу все", en: "open all at once" },
    this.OpenBySubfolder = { ru: "группировать по подпапкам", en: "group by subfolder" },
    this.OpenedFiles = { ru: "открытые документы", en: "opened documents" },
    this.OpenedList = { ru: "список открытых файлов", en: "opened files list" },
    this.OpenFldr = { ru: "открыть папку...", en: "open folder..." },
    this.Override = { ru: "переопределить команды \"сохранить как\" в последней операции", en: "override \"save as\" commands in last action" },
    this.PostProcess = { ru: "После выполнения всех операций:", en: "After completing all actions:" },
    this.Preset = { ru: "Сохранение пресета", en: "Saving a preset" },
    this.PresetPromt = { ru: "Укажите имя пресета\nБудут сохранены настройки операций и параметры сохранения файлов", en: "Specify the name of the preset\nThe operation settings and file saving settings will be saved" },
    this.Replace = { ru: "заменять файлы при сохранении", en: "replace files when saving" },
    this.SAC = { ru: "сохранить как… и закрыть", en: "save as… and close" },
    this.Save = { ru: "Сохранить", en: "Save" },
    this.SaveAs = { ru: "Добавить", en: "Add new" },
    this.SC = { ru: "сохранить и закрыть", en: "save and close" },
    this.Set = { ru: "Пресет:", en: "Preset:" },
    this.Source = { ru: "Источник:", en: "Source:" },
    this.SaveToFolder = { ru: "сохранить в другую папку", en: "save to another folder" },
    this.Stop = { ru: "Превать обработку", en: "Stop processing" },
    this.Stop = { ru: "стоп", en: "stop" },
    this.Subfolders = { ru: "обрабатывать подкаталоги", en: "include all subfolders" }
}

function Config() {
  this.sourceMode = 0
  this.lastPath = ''
  this.doSubfolders = true
  this.doACR = false
  this.fileList = new ActionList()
  this.docList = new ActionDescriptor()
  this.fileCounter = 0
  this.total = 0
  this.lastFileType = ''
  this.openAll = false
  this.groupBySubfolder = false
  this.activeDocument = new ActionDescriptor()
  this.saveToFolder = false
  this.globalErr = false
  this.autoStart = true
  this.allowContinue = true
  this.saveMode = 0
  this.lastSavePath = ''
  this.fileFormat = 0
  this.flatten = false
  this.jpgQuality = 12
  this.override = false
  this.options = ''
  this.batch = -1
  this.doneCounter = -1
  this.continue = 0
  this.keepStruct = true
  this.replaceFile = true
  this.preset = 0
}

function FileSystem() {

  this.findAllFiles = function (srcFolderStr, destObj, useSubfolders, skipOpened) {
    var fileFolderArray = Folder(srcFolderStr).getFiles(),
      subfolderArray = [],
      len = fileFolderArray.length;

    for (var i = 0; i < len; i++) {
      var fileFoldObj = fileFolderArray[i];

      if (fileFoldObj instanceof File) {
        if (!fileFoldObj.hidden) {
          var ext = FS.getExtension(fileFoldObj)
          if (ext) {
            destObj[STR.AllFiles.en] ? destObj[STR.AllFiles.en].putPath(fileFoldObj) : (destObj[STR.AllFiles.en] = new ActionList()).putPath(fileFoldObj);
            destObj[ext] ? destObj[ext].putPath(fileFoldObj) : (destObj[ext] = new ActionList()).putPath(fileFoldObj);
          }
        }
      } else { // folder
        if (useSubfolders) subfolderArray.push(fileFoldObj);
      }
    }

    if (useSubfolders) {
      for (var i = 0; i < subfolderArray.length; i++) this.findAllFiles(subfolderArray[i], destObj, useSubfolders)
    }

  }

  this.isFolder = function (s) {
    if (s.fsName.lastIndexOf(".") != -1 && s.fsName.length - s.fsName.lastIndexOf(".") <= 5) { return false }
    return true
  }

  this.shortenPath = function (s) {
    var win;
    if (s.indexOf('\\') != -1) { s = s.split('\\'); win = true } else { s = s.split('/'); win = false }

    if (s.length > 1) {
      var len = s[s.length - 1].length
      var output = []
      var curLen = 0

      output.push(s[0])
      curLen = s[0].length

      for (var i = 1; i < s.length - 1; i++) {
        if (curLen + s[i].length + len < 34) {
          output.push(s[i]); curLen += s[i].length
        } else {
          output.push("...")
          break;
        }
      }
      output.push(s[s.length - 1])

      if (win) { s = output.join('\\') } else s = output.join('/')
    }

    return s
  }

  this.removeExtension = function (s) {
    return s.length - s.lastIndexOf(".") <= 5 && s.lastIndexOf(".") >= 0 ? s.slice(0, s.lastIndexOf(".")) : s
  }

  this.getExtension = function (f) {
    var s = decodeURI(f).toUpperCase()
    s = s.slice(s.lastIndexOf(".") + 1, s.length)
    return objOfFileExtensions[s] ? s : null
  }

  this.saveAs = function (file, pth) {
    var fle = File(pth + '/' + file)

    if (CFG.flatten) app.activeDocument.flatten()

    switch (CFG.fileFormat) {
      case 0:
        saveAsJPEG(fle, CFG.jpgQuality)
        break;
      case 1:
        saveAsTIFF(fle)
        break;
      case 2:
        saveAsPSD(fle)
        break;
    }

    function saveAsJPEG(inFileName, inQuality) {
      var jpegOptions = new JPEGSaveOptions();
      jpegOptions.quality = inQuality;
      var fle = Boolean(CFG.replaceFile) ? File(inFileName + ".jpg") : createUniqueFileName(inFileName, ".jpg")
      app.activeDocument.saveAs(fle, jpegOptions, true);
    }

    function saveAsPSD(inFileName) {
      var psdSaveOptions = new PhotoshopSaveOptions();
      var fle = Boolean(CFG.replaceFile) ? File(inFileName + ".psd") : createUniqueFileName(inFileName, ".psd")
      app.activeDocument.saveAs(fle, psdSaveOptions, true);
    }

    function saveAsTIFF(inFileName) {
      var tiffSaveOptions = new TiffSaveOptions();
      tiffSaveOptions.imageCompression = TIFFEncoding.NONE;
      var fle = Boolean(CFG.replaceFile) ? File(inFileName + ".tif") : createUniqueFileName(inFileName, ".tif")
      app.activeDocument.saveAs(fle, tiffSaveOptions, true);
    }

    function createUniqueFileName(inFileName, inExtension) {
      var uniqueFileName = inFileName + inExtension;
      var fileNumber = 1;
      while (File(uniqueFileName).exists) {
        uniqueFileName = inFileName + "_" + fileNumber + inExtension;
        fileNumber++;
      }
      return File(uniqueFileName);
    }
  }

  this.isFolderWritable = function (inFolder) //
  {
    var isWritable = false;
    var f = File(inFolder + '/' + "deleteme.txt");
    if (f.open("w", "TEXT", "????")) {
      if (f.write("delete me")) {
        if (f.close()) {
          if (f.remove()) {
            isWritable = true;
          }
        }
      }
    }
    return isWritable;
  }

  this.getParentPath = function (s, mode) {
    if (s == "") return false

    s = Folder(s).toString()
    s = s.split('/')
    var len = s.length

    for (var i = 0; i < len - 1; i++) {
      if (mode) s.pop()
      var tmp = s.join('/')
      if (tmp != "") { tmp = new Folder(tmp) } else { break }
      if (tmp.exists) return mode ? s.join('/') : this.isFolderWritable(Folder(s.join('/')))
      s.pop()
    }

    return mode ? "" : false
  }

  this.rebuildPath = function (from, to) {
    var diff = CFG.sourceMode != 2 ? CFG.lastPath : this.getParentPath(from, true)
    diff = diff != "" ? Folder(diff).toString() : ""
    to = Folder(to)

    if (Boolean(CFG.keepStruct) && from != null && diff != "") {
      if (from.toString().indexOf(diff) != 1) {
        to = new Folder(to + from.toString().replace(diff, ""))
        if (!to.exists) { try { to.create() } catch (e) { } }
      }
    }
    return to
  }

}

function Notifiers() {
  this.addEvt = function () {
    this.delEvt()

    app.notifiersEnabled = true
    var handlerFile = File($.fileName)
    app.notifiers.add('Ntfy', handlerFile)
    app.notifiers.add('Cls ', handlerFile)
    app.notifiers.add('Ply ', handlerFile)
  }

  this.delEvt = function () {
    for (var i = 0; i < app.notifiers.length; i++) {
      var ntf = app.notifiers[i]
      if (ntf.eventFile.name == File($.fileName).name) { ntf.remove(); i-- }
    }
  }

  this.chkEvt = function () {
    for (var i = 0; i < app.notifiers.length; i++) {
      var ntf = app.notifiers[i]
      if (ntf.eventFile.name == File($.fileName).name) { return true }
    }

    return false
  }
}

function Preset() {

  function stringToObject (arr) {
    var a = arr.split('\v'),
      s = {};

    s.globalErr = a[0] == "true" ? true : false
    s.autoStart = a[1] == "true" ? true : false
    s.allowContinue = a[2] == "true" ? true : false
    s.saveMode = Number(a[3])
    s.lastSavePath = String(a[4])
    s.fileFormat = Number(a[5])
    s.flatten = a[6] == "true" ? true : false
    s.jpgQuality = Number(a[7])
    s.override = a[8] == "true" ? true : false
    s.options = String(a[9])
    s.doneCounter = Number(a[10])
    s.continue = Number(a[11])
    s.keepStruct = a[12] == "true" ? true : false
    s.replaceFile = a[13] == "true" ? true : false

    return s
  }

  this.settingsToPreset = function (s) {
    var p = new PresetObject(),
      d = new ActionDescriptor();
    for (var a in p) { p[a] = s[a] }
    d.putObject(s2t('settings'), s2t('object'), AM.objectToDescriptor(p))
    return d.getObjectValue(s2t('settings'))
  }

  this.presetToSettings = function (p) {
    var o = {}
    AM.descriptorToObject(o, p)
    for (var a in o) { CFG[a] = o[a] }

    CFG.globalErr = false
    CFG.doneCounter = -1
    CFG.continue = 0
  }

  this.items = getPresetList()

  this.items.getByName = function (s) {
    var key = s2t(s)
    return this.hasKey(key) ? this.getObjectValue(key) : null
  }

  this.items.add = function (n, p) {
    this.putObject(s2t(n), s2t('object'), p)
    saveToFile(this)
  }

  this.items.delete = function (s) {
    this.erase(s2t(s))
    saveToFile(this)
  }

  function getPresetList() {
    try {
      // конвертация старого формата в новый
      var d = app.getCustomOptions('advancedBatch'),
        p = new ActionDescriptor();
      for (var i = 0; i < d.count; i++) { p.putObject(d.getKey(i), s2t('object'), AM.objectToDescriptor(new stringToObject(d.getString(d.getKey(i))))) }
      if (saveToFile(p)) app.eraseCustomOptions('advancedBatch')
    } catch (e) { }

    return getFromFile()
  }

  function getFromFile() {
    var d = new ActionDescriptor(),
      fle = new File(app.preferencesFolder + "/" + STR.Message + ".desc");
    try {
      if (fle.exists) {
        fle.open('r')
        fle.encoding = 'BINARY'
        var s = fle.read()
        fle.close;
        d.fromStream(s);
      }


      var a = [];
      for (var i = 0; i < d.count; i++) {
        a.push(t2s(d.getKey(i)))
      }

      a.sort(sortPresets)

      var p = new ActionDescriptor();
      for (var i = 0; i < d.count; i++) {
        var cur = s2t(a[i])
        p.putObject(cur, s2t('object'), d.getObjectValue(cur))
      }
    } catch (e) { alert(STR.ErrNoPreset, '', 1) }

    return p

    function sortPresets(a, b) {
      if (a > b) { return 1 } else { return -1 }
    }
  }

  function saveToFile(d) {
    var fle = new File(app.preferencesFolder + "/" + STR.Message + ".desc");
    try {
      fle.open('w')
      fle.encoding = 'BINARY'
      fle.write(d.toStream())
      fle.close
      return true
    } catch (e) { alert(e, '', 1) }
    return false
  }

  PresetObject = function () {
    this.doACR = false
    this.openAll = false
    this.groupBySubfolder = false
    this.autoStart = true
    this.allowContinue = true
    this.saveMode = 0
    this.lastSavePath = ''
    this.fileFormat = 0
    this.flatten = false
    this.jpgQuality = 12
    this.override = false
    this.options = ''
    this.keepStruct = true
    this.replaceFile = true
    this.saveToFolder = false
  }
}

function checkDesc(desc) {
  var c = desc.count,
    str = '';
  for (var i = 0; i < c; i++) {
    str += t2s(desc.getKey(i)) +
      ': ' + desc.getType(desc.getKey(i)) +
      ' = ' + getValues(desc, i) + '\n';
  };
  $.writeln(str);
};


function getValues(desc, keyNum) {
  var kTypeID = desc.getKey(keyNum);
  switch (desc.getType(kTypeID)) {
    case DescValueType.OBJECTTYPE:
      return (desc.getObjectValue(kTypeID) +
        "_" + t2s(desc.getObjectType(kTypeID)));
      break;
    case DescValueType.LISTTYPE:
      return desc.getList(kTypeID);
      break;
    case DescValueType.REFERENCETYPE:
      return desc.getReference(kTypeID);
      break;
    case DescValueType.BOOLEANTYPE:
      return desc.getBoolean(kTypeID);
      break;
    case DescValueType.STRINGTYPE:
      return desc.getString(kTypeID);
      break;
    case DescValueType.INTEGERTYPE:
      return desc.getInteger(kTypeID);
      break;
    case DescValueType.LARGEINTEGERTYPE:
      return desc.getLargeInteger(kTypeID);
      break;
    case DescValueType.DOUBLETYPE:
      return desc.getDouble(kTypeID);
      break;
    case DescValueType.ALIASTYPE:
      return desc.getPath(kTypeID);
      break;
    case DescValueType.CLASSTYPE:
      return desc.getClass(kTypeID);
      break;
    case DescValueType.UNITDOUBLE:
      return (desc.getUnitDoubleValue(kTypeID) +
        "_" + t2s(desc.getUnitDoubleType(kTypeID)));
      break;
    case DescValueType.ENUMERATEDTYPE:
      return (t2s(desc.getEnumerationValue(kTypeID)) +
        "_" + t2s(desc.getEnumerationType(kTypeID)));
      break;
    case DescValueType.RAWTYPE:
      var tempStr = desc.getData(kTypeID);
      var rawData = new Array();
      for (var tempi = 0; tempi < tempStr.length; tempi++) {
        rawData[tempi] = tempStr.charCodeAt(tempi);
      }
      return rawData;
      break;
    default:
      break;
  };
};