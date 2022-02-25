///////////////////////////////////////////////////////////////////////////////
// Advanced batch
// jazz-y@ya.ru
///////////////////////////////////////////////////////////////////////////////

#target photoshop

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>Advanced batch</name>
<category>jazzy</category>
<eventid>f016f8c5-4f04-4740-a463-9f519f2483e0</eventid>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

var useProgressBar = 1 // 0 - do not show progress bar, 1 - show progress bar
var localization = "ru" // "auto" - use automatic localization, "ru" - russian interface, "en" - english interface

// bin here
var rev = "0.55",
strAcr={ru: "открывать RAW в ACR", en: "open RAW in ACR"},
strActivate={ru: "включить", en: "active"},
strActiveDocFldr={ru: "папка активного документа", en: "folder of active document"},
strAllFiles={ru: "все файлы", en: "all files"},
strAtn={ru: "Операции:", en: "Actions:"},
strAuto = {ru: "автоматически запускать первую операцию при открытии документа", en: "automatically start first action when opening a document"},
strBridgeList = {ru: "список файлов из Bridge", en: "Bridge file list"},
strBrowse={ru: "Обзор...", en: "Browse..."},
strCancel={ru: "Отмена", en: "Cancel"},
strContinue ={ru: "продолжить с команды \"стоп\", если остановка была внутри операции", en: "continue from the \"stop\" command, if the stop was inside the action"},
strContinueBatch = {ru: "Продолжение обработки", en: "Continue processing"},
strContinueBatchMsg = {ru: "Прошлое задание не было завершено!\nПродолжить обработку с места остановки?\n", en: "The previous job was not completed!\nDo you want to continue processing from the last saved file?\n"},
strContinueBatchNext= {ru: "следующий файл: ", en: "next file: "},
strCopy = {ru: " копия", en: " copy"},
strCounter={ru: "количество файлов: ", en: "number of files: "},
strDefailt={ru: "по-умолчанию", en: "default"},
strDelete={ru: "Удалить", en: "Delete"},
strErrAction={ru: "Обработка остановлена!\nОперация \"%1\" > \"%2\" не найдена!", en: "Processing stopped!\Action \"%1\" > \"%2\" not found!"},
strErrActionTip={ru: "Операция не найдена\nУдалите её из списка, чтобы продолжить", en: "Action not found\nRemove it from the list to continue"},
strErrActive={ru: "Не найдена папка активного документа!", en: "Folder of active document not found!"},
strErrAtnHeader={ru: "Операции", en: "Actions"},
strErrBatchMode = {ru: "Обработка остановлена!\nОпция \"%1\" активна, но при этом операция \"%2\" > \"%3\" выключена!", en: "Processing stopped!\nOption \"%1\" is active, but the action \"%2\" > \"%3\" is not active!"},
strErrBridge={ru: "Невозможно установить соединение с Bridge!", en: "Unable connect to Bridge!"},
strErrDoc = {ru: "Обработка остановлена!\nДокумент закрыт до начала операции сохранения!", en: "Processing stopped!\nThe document is closed before the save action!"},
strErrFolder={ru: "Обработка остановлена!\nПапка %1 недоступна для сохранения файлов!", en: "Processing stopped!\nThe folder %1 is not available for saving files!"},
strErrSaveFolder = {ru: "Указанная папка недоступна для сохранения файлов!", en: "The specified folder is not available for saving files!"},
strErrLastActionTip={ru: "Операция выключена\nПереопределение команды \"сохранить как\" возможно только для последней операции в списке\nВыключите опцию \"%1\" или включите операцию", en: "Action is turned off\nOverriding the \"save As\" command possible only for the last action in the list\nTurn off the option \"%1\" or enable the action"},
strErrNewFile = {ru: "Обработка остановлена!\nОпция \"сохранить и закрыть\" не работает для новых, ранее не сохраненных документов!", en: "Processing stopped!\nOption \"save and close\" does not work for new documents without saved path!"},
strErrNoDocs = {ru: "Не найдены открытые документы!", en: "Opened documents not found!"},
strErrNoPathTip={ru: "Папка не найдена!\nОна будет автоматически создана при сохранении файла", en: "Folder not found\nBut it will be automatically created when saving the file"},
strErrOverride ={ru: "Обработка остановлена!\nОпция \"%1\" не работает для новых, ранее не сохраненных документов!", en: "Processing stopped!\nOption \"%1\" does not work for new documents without saved path!"},
strErrOverrideTip={ru: "Не найдена команда \"сохранить как\"\nВозможна некорректная работа при включенной опции \"%1\"\nИзмените настройки или убедитесь, что операция содержит команду \"сохранить как\"", en: "Command \"save as\" not found\nSaving may work incorrectly when the option \"%1\"is enabled\nChange the settings or make sure that the action contains \"save as\" command"},
strErrPreset={ru: "Набор с именем \"%1\" уже существует. Перезаписать?", en: "A set with the name \"%1\" already exists. Overwrite?"},
strErrSave={ru: "Обработка остановлена!\nОшибка при сохранении файла!", en: "Processing stopped!\nError saving file!"},
strExt={ru: "открывать следующие типы файлов: ", en: "open following file types: "},
strFlatten={ru: "объединить слои", en: "flatten layers"},
strFormat={ru: "тип файла", en: "file type"},
strFromBridge={ru: "получить файлы из Bridge", en: "get files form Bridge"},
strKeepStructure = {ru: "сохранять структуру подпапок", en: "keep structure of subfolders"},
strMessage = "Advanced batch",
strNext = {ru: "Следующий файл", en: "Next file"},
strNone={ru: "ничего", en: "none"},
strOpen={ru: "Начать обработку", en: "Start processing"},
strOpenAll={ru: "открыть сразу все", en: "open all at once"},
strOpenBySubfolder={ru: "группировать по подпапкам", en: "group by subfolder"},
strOpenedFiles = {ru: "открытые документы", en: "opened documents"},
strOpenedList = {ru: "список открытых файлов", en: "opened files list"},
strOpenFldr={ru: "открыть папку...", en: "open folder..."},
strOverride={ru: "переопределить команды \"сохранить как\" в последней операции", en: "override \"save as\" commands in last action"},
strPostProcess={ru: "После выполнения всех операций:", en: "After completing all actions:"},
strPreset = {ru: "Сохранение пресета", en: "Saving a preset"},
strPresetPromt = {ru: "Укажите имя пресета\nБудут сохранены настройки операций и параметры сохранения файлов", en: "Specify the name of the preset\nThe operation settings and file saving settings will be saved"},
strReplace={ru: "заменять файлы при сохранении", en: "replace files when saving"},
strSAC={ru: "сохранить как… и закрыть", en: "save as… and close"},
strSave={ru: "Сохранить", en: "Save"},
strSaveAs={ru: "Добавить", en: "Add new"},
strSC={ru: "сохранить и закрыть", en: "save and close"},
strSet={ru: "Пресет:", en: "Preset:"},
strSource={ru: "Источник:", en: "Source:"},
strSTF={ru: "сохранить как… в папку", en: "save as… to folder"},
strStop={ru: "Превать обработку", en: "Stop processing"},
strStop={ru: "стоп", en: "stop"},
strSubfolders={ru: "обрабатывать подкаталоги", en: "include all subfolders"},

gApplication = s2t("application"),
gAction = s2t("action"),
gActionSet = s2t( "actionSet" ),
gClose = s2t ("close"),
gCommand = s2t ("command"),
gContinue = s2t("continue"),
gDocument = s2t("document"),
gDocumentID= s2t("documentID"),
gFileReference = s2t("fileReference"),
gItemIndex = s2t("itemIndex"),
gNumberOfChildren = s2t("numberOfChildren"),
gMessage = s2t("message"),
gName = s2t("name"),
gNo = s2t ("no"),
gNotify = s2t("notify"),
gNull= s2t("null"),
gNumberOfDocuments = s2t("numberOfDocuments"),
gOpen = s2t("open"),
gOrdinal = s2t("ordinal"),
gOverrideOpen = s2t("overrideOpen"),
gParent = s2t("parentName"),
gPlay = s2t("play"),
gProperty = s2t("property"),
gSave = s2t ("saving"),
gSelect = s2t ("select"),
gTarget = s2t("target"),
gTargetEnum = s2t("targetEnum"),
gTitle = s2t ("title"),
gYesNo = s2t ("yesNo"),
gYes = s2t ("yes"),
mStop = localize ("$$$/Actions/Event/Stop"),
mSave = localize ("$$$/Actions/Event/Save"),

GUID="e939c6c3-429d-4ca3-ae24-2d82dcf5de2e",

arrayOfFileExtensions = ["PSD","PDD","PSDT","PSB","BMP","RLE","DIB","GIF","EPS","IFF","TDI","JPG","JPEG","JPE","JPF","JPX","JP2","J2C",
"J2K","JPC","JPS","MPO","PCX","PDF","PDP","RAW","PXR","PNG","SCT","TGA","VDA","ICB","VST","TIF","TIFF","PBM","PGM","PPM","PNM","PFM","PAM",
"DCM","DC3","DIC","TIF","CRW","NEF","RAF","ORF","MRW","DCR","MOS","SRF","PEF","DCR","CR2","DNG","ERF","X3F","RAW"],
arrayOfRawExtensions = ["TIF", "CRW", "NEF", "RAF", "ORF", "MRW", "DCR", "MOS", "SRF", "PEF", "DCR", "CR2", "DNG", "ERF", "X3F", "RAW"],

event, // режим запуска из ивента или нет
fromBridge = false, // запуск из бриджа
allDone = false; // отметка что все задания выполнены

useProgressBar = Number (useProgressBar) == 0 || Number(app.version.split('.')[0])<16 ? false : true
if (localization.toUpperCase() != "AUTO") {$.locale = localization.toUpperCase() == "RU" ? "ru" : "en"}
$.localize = true 

var cfg = new Object
initExportInfo (cfg)

var actionsList = getActionsList ()

try{var d = app.playbackParameters
fromBridge = d.getBoolean(d.getKey(0))} catch (e) {}

try {event = arguments[1]} catch (e) {}

main()

function main ()
{   
    getScriptSettings (cfg)

    if (!event)
    {
      // нормальный запуск экранной формы
       if (!chkEvt() && !cfg.globalErr || fromBridge)
       {
         var result, w;
         if (cfg.batch != "" && !fromBridge) 
         {
           if (confirmBatch ())
           {
            cfg.fileList = cfg.batch
            result = 1
           } 
           else
           {
            resetBatch(true) 
            w = buildWindow (false); result = w.show ()
           }
         } else 
         {
           resetBatch(true)
           w = buildWindow (false); result = w.show ()
         }
            if (result!=2)
            {
              addEvt ()
              cfg.total = cfg.fileList == "" ? 0 : cfg.fileList.split('\n').length
              cfg.total += cfg.docList == "" ? 0 : cfg.docList.split('\n').length
              cfg.doneCounter = -1
              cfg.continue = 0
              doBatch(true)
            } 
        } 
        else
        {
            // ручной запуск, в случае если есть связанные со скриптом слушатели событий
            if (!isAnyDocument () || cfg.globalErr)
            {
              if (cfg.globalErr)
              {
                if (cfg.fileList !="" || cfg.docList !="")
                {
                  errWindow (true) 
                } else
                {
                  resetBatch (true)
                  main()
                } 
              } 
              else
              {
                if (cfg.fileList !="" || cfg.docList !="")
                {
                  doBatch ()
                }
                else
                {
                  resetBatch (true)
                  main()
                }
              }
            } 
            else
            {
              doBatch ()
            }
        }
    } 
    else
    {
     // автоматический запуск по событию
        if (event == gNotify)
        {
          resetBatch (false)
        } 
        else
        {
          doBatchFromEvent (cfg.saveMode)
        }
    }


//==========================================
// вспомогаетельные функции
//==========================================
  function errWindow (resetErr)
  {
    if (resetErr) cfg.globalErr = false
    var w = buildWindow (true)
    var result = w.show ()
    
    if (result==2)
    {
      cfg.fileCounter = 0
      cfg.fileList = ""
      cfg.doneCounter = -1
      cfg.continue = 0
      cfg.docList = ""
      delEvt()
      putScriptSettings(cfg)
    } else 
    {
      cfg.doneCounter = -1
      cfg.continue = 0
      doBatch ()
    }
  }

  function resetBatch (eraseFileList)
  {
    cfg.globalErr = false
    cfg.fileCounter = 0
    cfg.fileList = ""
    cfg.doneCounter = -1
    cfg.continue = 0
    cfg.docList = ""
    cfg.total = 0
    
    if (eraseFileList) cfg.batch = ""
    
    delEvt()
    putScriptSettings(cfg)
  }

  function confirmBatch ()
  {
    return (confirm (strMsg (), false, strContinueBatch))

    function strMsg ()
    {
      var tmp = cfg.batch.split('\n')
      output = []
      output.push (strContinueBatchMsg)
      output.push (strSource + " " + cfg.lastPath)
      output.push (strCounter + tmp.length)
      output.push (strContinueBatchNext + getFileName(tmp[0]))

      return output.join ('\n')
    }
  }

  function doBatchFromEvent (saveMode)
  {
    if (!isAnyDocument()) 
    {
      if (cfg.fileList == "" && cfg.docList == "") 
      {
        resetBatch(true)
        return
      }

      if (cfg.globalErr == false) 
      {
        doBatch()
      }
      else 
      {
        errWindow(true)
      }
    }
  }
}

function buildWindow (fromEvent)
{
// =========================================
// open files module
// =========================================  
  var doNotUpdate = false, // режим обновления путей
  allFiles = [], // временный массив с файлами из папки
  renew = true, // необходимость чтения из панели экшенов
  noAction = false; // блокировка кнопок при отсуствии экшенов

  var w = new Window("dialog");
  w.text = strMessage + " " + rev;
  w.orientation = "column";
  w.alignChildren = ["fill", "top"];
  w.spacing = 10;
  w.margins = 16;

  // PN
  // ==
  var pn = w.add("panel");
  pn.text = strSource;
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

  var dlSource_array = [strOpenFldr, strActiveDocFldr, strOpenedFiles, strFromBridge];
  var dlSource = grFld.add("dropdownlist", undefined, undefined, { items: dlSource_array });
  dlSource.preferredSize.width = 200;

  var bnSourceFolder = grFld.add("button");
  bnSourceFolder.text = strBrowse;

  var stPath = grFld.add("statictext");
  stPath.preferredSize.width = 220
  // PN
  // ==

  var grOpenOptions = pn.add("group")
  grOpenOptions.orientation = "column";
  grOpenOptions.alignChildren = ["left", "fill"];

  var chSubfld = grOpenOptions.add("checkbox");
  chSubfld.text = strSubfolders;

  // GR
  // ==
  var gr = grOpenOptions.add("group");
  gr.orientation = "row";
  gr.alignChildren = ["left", "fill"];
  gr.spacing = 10;
  gr.margins = 0;

  var stFilter = gr.add("statictext");
  stFilter.text = strExt;

  var dlFilter_array = [strAllFiles];
  var dlFilter = gr.add("dropdownlist", undefined, undefined, { items: dlFilter_array });
  dlFilter.selection = 0

  var chAcr = grOpenOptions.add("checkbox");
  chAcr.text = strAcr;

  // GROPENALL
  // =========
  var grOpenAll = grOpenOptions.add("group");
  grOpenAll.orientation = "row";
  grOpenAll.alignChildren = ["left", "center"];
  grOpenAll.spacing = 10;
  grOpenAll.margins = 0;

  var chOpenAtOnce = grOpenAll.add("checkbox");
  chOpenAtOnce.text = strOpenAll

  var chGroupBySubfolder = grOpenAll.add("checkbox");
  chGroupBySubfolder.text = strOpenBySubfolder

  var stCounter = pn.add("statictext", undefined, undefined, { name: "st" });
  stCounter.characters = 50

  // =========================================
  // preset module
  // =========================================    
  var grPreset = w.add("group");
  grPreset.orientation = "row";
  grPreset.alignChildren = ["left", "center"];
  grPreset.spacing = 10;

  var dlPreset_array = [strDefailt];
  var dlPreset = grPreset.add("dropdownlist", undefined, undefined, { items: dlPreset_array });
  dlPreset.text = strSet
  dlPreset.preferredSize.width = 250

  var bnRefresh = grPreset.add("button");
  bnRefresh.text = "↺";
  bnRefresh.preferredSize.width = 40;

  var bnSave = grPreset.add("button");
  bnSave.text = strSave

  var bnSaveAs = grPreset.add("button");
  bnSaveAs.text = strSaveAs

  var bnDel = grPreset.add("button");
  bnDel.text = strDelete

  // =========================================
  // action module
  // =========================================    

  // PNATN
  // =====
  var pnAtn = w.add("panel");
  pnAtn.text = strAtn
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
  chOnOpen.text = strAuto

  var chContinue = grCheck.add("checkbox");
  chContinue.text = strContinue

// =========================================
// save module
// =========================================    
  var pnSave = w.add("panel");
  pnSave.text = strPostProcess
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

  var dlSave_array = [strNone, strSC, strSAC, strSTF];
  var dlSave = grFolder.add("dropdownlist", undefined, undefined, { items: dlSave_array });
  dlSave.preferredSize.width = 200;

  var chReplace = pnSave.add("checkbox");
  chReplace.text = strReplace

  var bnSaveFolder = grFolder.add("button");
  bnSaveFolder.text = strBrowse
  bnSaveFolder.enabled = false

  var stSavePath = grFolder.add("statictext");
  stSavePath.preferredSize.width = 220;
  stSavePath.visible = false

  var stNoPath = grFolder.add("statictext")
  stNoPath.text = "!"
  stNoPath.graphics.font = "dialog-Bold:12"
  stNoPath.preferredSize.width = 12
  stNoPath.graphics.foregroundColor = w.graphics.newPen(w.graphics.PenType.SOLID_COLOR, [1, 0.8, 0, 1], 1);
  stNoPath.helpTip = strErrNoPathTip

// GRSAVEOPTIONS
  // =============
  var grSaveOptions = pnSave.add("group");
  grSaveOptions.orientation = "row";
  grSaveOptions.alignChildren = ["left", "center"];
  grSaveOptions.spacing = 10;
  grSaveOptions.margins = 0;

  var stFormat = grSaveOptions.add("statictext");
  stFormat.text = strFormat

  var dlFormat_array = ["jpg", "tif", "psd"];
  var dlFormat = grSaveOptions.add("dropdownlist", undefined, undefined, { items: dlFormat_array });

  var chFlatten = grSaveOptions.add("checkbox");
  chFlatten.text = strFlatten

  var slJpg = grSaveOptions.add("slider");
  slJpg.minvalue = 1;
  slJpg.maxvalue = 12;
  slJpg.preferredSize.width = 120

  var stJpg = grSaveOptions.add("statictext");
  stJpg.preferredSize.width = 20;

  // PNSAVE
  // ======
  var chBatchMode = pnSave.add("checkbox");
  chBatchMode.text = strOverride

  var chKeepStructure = pnSave.add("checkbox");
  chKeepStructure.text = strKeepStructure

  var bar = w.add('progressbar', undefined, 0, cfg.total);
  bar.preferredSize = [undefined, 20]
  bar.value = cfg.fileCounter
  bar.helpTip = strCounter + cfg.fileCounter + "\\" + cfg.total

// =========================================
// button module
// =========================================    
  var grBn = w.add("group");
  grBn.orientation = "row";
  grBn.alignChildren = ["center", "center"];
  grBn.spacing = 10;
  grBn.margins = 0;

  var ok = grBn.add("button", undefined, undefined, { name: "ok" });
  ok.text = strOpen;

  var cancel = grBn.add("button", undefined, undefined, { name: "cancel" });
  cancel.text = strCancel; 

// =========================================
// open files functions
// =========================================      

bnSourceFolder.onClick = function ()
{
    getSourceFolder ()
    ok.enabled = bnOkStatus ()
}

dlSource.onChange = function ()
{
  bnSourceFolder.enabled = this.selection.index == 0 ? true : false
  grOpenOptions.enabled = this.selection.index == 2 ? false : true
  chGroupBySubfolder.enabled = cfg.openAll // нужно при переключении режимов, если панель была неактивна

  var tmp = cfg.sourceMode
  cfg.sourceMode = this.selection.index
  
  if (getSourceFolder () == false)
  {
    tmp = tmp == cfg.sourceMode ? 0 : tmp
    
    doNotUpdate = true
    this.selection = tmp
    cfg.sourceMode = tmp
    doNotUpdate = false 
  }

  ok.enabled = bnOkStatus ()
}

dlFilter.onChange = function ()
{
  if (!w.visible) return

  cfg.lastFileType = this.selection.text

  if (cfg.lastPath!="") enumFiles (Folder(cfg.lastPath), false)
  ok.enabled = bnOkStatus ()
}

chSubfld.onClick = function () 
{
  cfg.doSubfolders = this.value; 

  doNotUpdate = true; 
  getSourceFolder();
  doNotUpdate = false; 

  ok.enabled = bnOkStatus ()
}

chOpenAtOnce.onClick = function (){cfg.openAll = this.value; chGroupBySubfolder.enabled = this.value}
chGroupBySubfolder.onClick = function () {cfg.groupBySubfolder = this.value}
chAcr.onClick = function () {cfg.doACR = this.value}

// ======================================================
// preset functions
// ======================================================

dlPreset.onChange = function ()
{
  if (this.selection.index == 0)
  {
    bnDel.enabled = false
    
    if (!doNotUpdate)
    {
      var def = new Object
      initExportInfo (def)

      var a = putSettingsToArray (def)
      putArrayToSettings (cfg, a)

      var len = pnAtn.children.length
      for (var i=0;i<len; i++) {pnAtn.remove(pnAtn.children[0])}

      w.onShow(true)
    }
  } else 
  {  
    bnDel.enabled = true

    if (!doNotUpdate)
    {
      var a = getPreset (this.selection.text)
      putArrayToSettings (cfg, a)

      var len = pnAtn.children.length
      for (var i=0;i<len; i++) {pnAtn.remove(pnAtn.children[0])}

      w.onShow(true)
    }
  }
    cfg.preset = this.selection.index
    if (w.visible) putScriptSettings (cfg)
    checkPresetIntegrity()
}

bnSave.onClick = function ()
{
  var a = putSettingsToArray (cfg)
  var nm = dlPreset.selection.text
  putPreset (nm, a, "save")

  putScriptSettings (cfg)
  checkPresetIntegrity()
}

bnSaveAs.onClick = function ()
{
  var a = putSettingsToArray (cfg),
  nm = prompt(strPresetPromt, dlPreset.selection.text + strCopy, strPreset);
  
  if (nm!=null && nm!="")
  {
    if (getPreset (nm) =="" && nm != strDefailt) 
    {
      putPreset (nm, a, "add")
      loadPresets ()

      doNotUpdate = true;
      dlPreset.selection = dlPreset.find (nm)
      doNotUpdate = false;
    } else 
    {
      if (nm != strDefailt) 
      {
        if (confirm (localize(strErrPreset,nm), false,strPreset))
        {
          putPreset (nm, a, "save")

          doNotUpdate = true;
          dlPreset.selection = dlPreset.find (nm)
          doNotUpdate = false;
        } 
      }
    }
  }

  putScriptSettings (cfg)
  checkPresetIntegrity()
}

bnDel.onClick = function ()
{
  var a = putSettingsToArray (cfg)
  var nm = dlPreset.selection.text
  var num = dlPreset.selection.index

  putPreset (nm, a, "delete")
  loadPresets ()

  num = num > dlPreset.items.length-1 ? dlPreset.items.length-1 : num
  dlPreset.selection = num

  putScriptSettings (cfg)
  checkPresetIntegrity()
}

bnRefresh.onClick = function () {dlPreset.onChange()}

// ======================================================
// save files functions
// ======================================================

dlSave.onChange = function ()
{
  cfg.saveMode = this.selection.index

  stNoPath.visible = false

  switch (this.selection.index)
  {
    case 0:
    case 1:  
      stSavePath.visible = bnSaveFolder.enabled = chReplace.enabled = false
      grSaveOptions.enabled = chBatchMode.enabled = chKeepStructure.enabled = false
    break;
    case 2:
      stSavePath.visible = bnSaveFolder.enabled = chKeepStructure.enabled = false
      chBatchMode.enabled = chReplace.enabled = true
      if (!cfg.override) {grSaveOptions.enabled = true} else {grSaveOptions.enabled = false}
    break;
    case 3:
      stSavePath.visible = bnSaveFolder.enabled = true
      chBatchMode.enabled = chKeepStructure.enabled = chReplace.enabled = true
      if (!cfg.override) {grSaveOptions.enabled = true} else {grSaveOptions.enabled = false}
      
      stSavePath.text=stSavePath.helpTip = ""

      if (cfg.lastSavePath != "")
      {
        var fol = new Folder (cfg.lastSavePath)

        if (fol.exists && isFolderWritable(fol)) 
        {
          stSavePath.text = shortenPath (fol.fsName)
          stSavePath.helpTip = fol.fsName
        } 
        else 
        {
          if (getParentPath(fol))
          {
            stNoPath.visible = true
            stSavePath.text = shortenPath (fol.fsName)
            stSavePath.helpTip = fol.fsName
          }
          else {cfg.lastSavePath=""; bnSaveFolder.onClick()}
        }
      } else {bnSaveFolder.onClick()}
    break;
  }

  checkOptionsList (pnAtn)
  ok.enabled = bnOkStatus ()
  checkPresetIntegrity()
}

dlFormat.onChange = function ()
{
  cfg.fileFormat = this.selection.index
  slJpg.visible = stJpg.visible = this.selection.index == 0 ? true: false

  checkPresetIntegrity()
}

chBatchMode.onClick = function () 
{
  cfg.override = this.value
  grSaveOptions.enabled = chReplace.enabled = !this.value

  checkOptionsList (pnAtn)
  ok.enabled = bnOkStatus ()
  checkPresetIntegrity()
}

chOnOpen.onClick = function () {cfg.autoStart = this.value; checkPresetIntegrity()}
chContinue.onClick = function () {cfg.allowContinue = this.value; checkPresetIntegrity()}
chFlatten.onClick = function () {cfg.flatten = this.value; checkPresetIntegrity()}
chKeepStructure.onClick = function () {cfg.keepStruct = this.value; checkPresetIntegrity()}
chReplace.onClick = function () {cfg.replaceFile = this.value; checkPresetIntegrity()}

slJpg.onChanging = function () {cfg.jpgQuality = stJpg.text = Math.round (this.value); checkPresetIntegrity()}
slJpg.addEventListener ('keyup', commonHandler)
slJpg.addEventListener ('mouseup', commonHandler)
slJpg.addEventListener ('mouseout', commonHandler)
function commonHandler(evt) {cfg.jpgQuality = slJpg.value = stJpg.text = Math.round (slJpg.value); checkPresetIntegrity()}

bnSaveFolder.onClick = function ()
{
  if (!w.visible) return

  var fol = new Folder(cfg.lastSavePath)
  var userSelectedFolder = fol.selectDlg()

  if (userSelectedFolder) 
  {
    if (isFolderWritable(userSelectedFolder)) 
    {
      cfg.lastSavePath = stSavePath.helpTip = userSelectedFolder.fsName; stSavePath.text = shortenPath (cfg.lastSavePath)
      stNoPath.visible = false
    } else {alert (strErrSaveFolder)}
  }
  ok.enabled = bnOkStatus ()
  checkPresetIntegrity()
}

// ======================================================
// button functions
// ======================================================

ok.onClick = function ()
{
  collectSettings (pnAtn)
  putScriptSettings (cfg)
  w.close (1)
}

// ======================================================
// main window function
// ======================================================
w.onShow = function (fromPreset)
{
  //cfg.sourceMode = 3
  //cfg.useSubfolders = false
 
  //cfg.openAll = true
  /*
  cfg.lastFileType = "JPG"
fromEvent= true
  cfg.sourceMode = 0
  cfg.total = 999
 */
  if (!fromPreset)
  {
    doNotUpdate = true

    if (!fromEvent)
    {
      if (!fromBridge)
      {
        cfg.sourceMode = cfg.sourceMode == 1 && getActiveDocPath()==null ? 0 : cfg.sourceMode 
        cfg.sourceMode = cfg.sourceMode == 2 && isAnyDocument()==false ? 0 : cfg.sourceMode
        cfg.sourceMode = !BridgeTalk.isRunning('bridge') && cfg.sourceMode == 3 ? 0 : cfg.sourceMode
        dlSource.selection = cfg.sourceMode
      } else {dlSource.selection = 3}

      w.remove(bar)
    }
    else
    {
      // окно при возникновении ошибки
      putScriptSettings(cfg) // сохраняем текущие настройки, так как после загрузки переключателей они изменятся
      dlSource.selection = cfg.sourceMode
      stCounter.text = strCounter + cfg.total
      ok.text = strNext
      cancel.text = strStop
      dlSource.enabled = bnSourceFolder.enabled = chSubfld.enabled = dlFilter.enabled = stFilter.enabled= false
      getScriptSettings(cfg) // получаем текущие настройки
    }

    chSubfld.value = cfg.doSubfolders
    chAcr.value = cfg.doACR
    chOpenAtOnce.value = chGroupBySubfolder.enabled = cfg.openAll
    chGroupBySubfolder.value = cfg.groupBySubfolder

    loadPresets();
    doNotUpdate = true
    dlPreset.selection = cfg.preset > dlPreset.items.length - 1 ? 0 : cfg.preset
    doNotUpdate = false

    checkPresetIntegrity()
  }

  chOnOpen.value = cfg.autoStart
  chContinue.value = cfg.allowContinue
  dlFormat.selection = cfg.fileFormat
  chFlatten.value = cfg.flatten
  slJpg.value = cfg.jpgQuality; slJpg.onChanging()
  chBatchMode.value = cfg.override
  chKeepStructure.value = cfg.keepStruct
  chReplace.value = cfg.replaceFile
  dlSave.selection = cfg.saveMode 

  renew = false
  var tmp = cfg.options.split('\n'), len = tmp.length;
  for (var i = 0; i < len; i++) { addAction(pnAtn, tmp[i]) }
  checkOptionsList (pnAtn)
  renew = true
 
  ok.enabled = bnOkStatus()
  w.layout.layout(true) 
}

// ======================================================
// вспомогательные функции главного окна
// ======================================================

function bnOkStatus ()
{
  var noFiles = cfg.fileList == "" && cfg.docList == ""
  var noSavePath = cfg.saveMode == 3 && cfg.lastSavePath == "" ? true : false
  var result = noFiles || noAction || noSavePath 

  return !result
}

function checkPresetIntegrity()
{
  if (dlPreset.selection.index>0)
  {
    var cur = putSettingsToArray (cfg)
    var old = getPreset(dlPreset.selection.text)

    bnRefresh.enabled = bnSave.enabled = cur == old ? false : true
  } else {bnSave.enabled = false; bnRefresh.enabled = true}

  if (actionsList.length == 0) {bnRefresh.enabled = bnSave.enabled = bnDel.enabled = bnSaveAs.enabled = false}
}    

function loadPresets ()
{
  var len = dlPreset.items.length

  if(len>1)
  {
    for (var i=1; i<len; i++)
    {dlPreset.remove(dlPreset.items[1])}
  }

  var items = getPresetList ()

  for (var i=0; i<items.length; i++)
  {dlPreset.add('item',items[i].key)}
}

function getSourceFolder()
{
    switch (cfg.sourceMode)
      {
        case 0:
            if (!doNotUpdate)
            {
              var fol = new Folder(cfg.lastPath)
              var userSelectedFolder = fol.selectDlg()
              if (!userSelectedFolder) return false 
            }
        break;

        case 1:
              var userSelectedFolder = getActiveDocPath()
              if (userSelectedFolder == null && !doNotUpdate) 
              {
                alert(strErrActive)
                return false
              }
              else {if (userSelectedFolder!=null) userSelectedFolder = Folder(userSelectedFolder.path)}
        break;
        
        case 2:
            var userSelectedFolder = []
            findAllDocs (userSelectedFolder)
            if (!doNotUpdate) {if (userSelectedFolder.length == 0) {alert (strErrNoDocs); return false}}
        break;

        case 3: 
          var userSelectedFolder = []
         
            if (BridgeTalk.isRunning('bridge')) 
            {
                var bt = new BridgeTalk();
                bt.target = "bridge";
                bt.body = "" + "function getFilesFromBridge(){var files=[app.document.presentationPath];var len=app.document.selections.length;if(len==0){files.push(app.document.presentationPath)}{for (var i=0; i<len; i++){files.push(app.document.selections[i].path)}}return files.toSource()}"+ "; getFilesFromBridge();";
                bt.onResult = function(response) 
                    {
                    userSelectedFolder = eval(response.body)
                    }
                bt.onError = function(err) {
                alert("Error!\n" + err.body)}

                bt.send(3000); 
            } else
            { 
                alert (strErrBridge)
                return false
            }
          break;
      }
                  
        if (cfg.lastFileType!="" && cfg.lastFileType!=strAllFiles.en && cfg.lastFileType!=strAllFiles.ru && dlFilter.find(cfg.lastFileType) == null) 
        {
          //alert ("add ext to filter!")
          dlFilter.add ("item",cfg.lastFileType)
          dlFilter.selection = dlFilter.find(cfg.lastFileType).index
        } 
     
        if (userSelectedFolder) 
        {
            var result = enumFiles (userSelectedFolder)
        } else 
        {
            var fol = new Folder(cfg.lastPath)
            if (fol.exists)
            {
                var result = enumFiles (fol)
            } else {
                stPath.text = stPath.helpTip = cfg.lastPath = ""
                stCounter.text = ""
            }
        }   

        if (result == false) {stPath.text =  stPath.helpTip = cfg.lastPath = stCounter.text = ""; return false} else {return true}
}

function enumFiles (userSelectedFolder, readFromFS)
{
  readFromFS = readFromFS == false ? false : true
  var filter = cfg.lastFileType == "" || cfg.lastFileType == strAllFiles.ru || cfg.lastFileType == strAllFiles.en ? arrayOfFileExtensions : [cfg.lastFileType]

  // заполняем список файлов
  if (readFromFS) 
  {
    switch (cfg.sourceMode) 
    {
      case 0:
      case 1:
        allFiles = []
        var err = findAllFiles(userSelectedFolder, allFiles, cfg.doSubfolders)
        if (err) {allFiles = []; return false }
      break;       
      case 3:
        allFiles = []

        for (var i = 1; i < userSelectedFolder.length; i++) //перебор файлов всех каталогов, кроме первого
        {
          var tmp = File(userSelectedFolder[i])
          if (tmp.exists) 
          {
            if (!isFolder(tmp)) 
            {
              allFiles.push(tmp)
            }
            else 
            {
              var err = findAllFiles(tmp, allFiles, cfg.doSubfolders)
              if (err) { allFiles = []; return false }
            }
          }
        }
        break;
    }
  }

  // фильтруем список
  switch (cfg.sourceMode)
  {
    case 0:
    case 1:
    case 3:
      var files = allFiles.slice(0)
      var filesToDo = []

      var shortList = buildShortcutList (files)

      for (var i = 0; i < files.length; i++) 
      {
        if (files[i] instanceof File) { } else { files[i] = File(files[i]) }
        if (isFileOneOfThese(files[i], filter)) filesToDo.push(files[i].toString())
      }

      if (userSelectedFolder instanceof Array) 
      {
        var fol = Folder(userSelectedFolder[0])
        if (fol.exists) 
        {
          if (userSelectedFolder.length > 2) 
          {
            cfg.lastPath = fol.fsName
          }
          else {
            var fle = File(userSelectedFolder[1])
            if (isFolder(fle)) 
            {
              cfg.lastPath = fle.fsName
            }
            else 
            {
              cfg.lastPath = fol.fsName
            }
          }
        } else 
        {
          for (var i = 1; i < userSelectedFolder.length; i++) 
          {
            var fle = File(userSelectedFolder[i])
            if (isFolder(fle) && fle.exists) 
            {
              cfg.lastPath = fle.fsName; break;
            }
            else {
              cfg.lastPath = fle.parent.fsName; break;
            }
          }
        }
      } else {cfg.lastPath = userSelectedFolder.fsName} 
      
      cfg.fileList = filesToDo.join ('\n')
      cfg.docList = ""

      if (cfg.sourceMode == 3) 
      {
        stPath.text = strBridgeList; stPath.helpTip = strBridgeList
      }
      else 
      {
        stPath.text = shortenPath(cfg.lastPath); stPath.helpTip = cfg.lastPath
      }    

      if (readFromFS) 
      {
        dlFilter.removeAll()
        for (var i = 0; i < shortList.length; i++) 
        {
          dlFilter.add("item", shortList[i])
        }
    
        if (dlFilter.find(cfg.lastFileType)) {dlFilter.selection = dlFilter.find(cfg.lastFileType).index } else {dlFilter.selection = 0 }
      }       
    break;

    case 2:       
        var filesToDo = userSelectedFolder.length == 0 ? [] : userSelectedFolder 
        cfg.docList = filesToDo.join ('\n')

        cfg.fileList = ""
        stPath.text = strOpenedList; stPath.helpTip = strOpenedList
    break;
    }

    stCounter.text = strCounter + filesToDo.length
    
    return true

    function isFolder (s)
    {
       if (s.fsName.lastIndexOf(".") != -1 && s.fsName.length - s.fsName.lastIndexOf(".") <=5) {return false}
       return true
    }
}
   
function addAction (parent, s)
{
    // GRLINE
    // ======
    var grLine = parent.add("group"); 
    grLine.orientation = "row"; 
    grLine.alignChildren = ["left","center"]; 
    grLine.spacing = 10; 
    grLine.margins = 0; 

    // GRBN
    // ====
    var grBn = grLine.add("group"); 
    grBn.orientation = "row"; 
    grBn.alignChildren = ["left","center"]; 
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
    grOpt.alignChildren = ["left","center"]; 
    grOpt.spacing = 5; 
    grOpt.margins = [5,0,0,0]; 

    var chActive = grOpt.add("checkbox"); 
    chActive.text = strActivate 
    
    var dlSet = grOpt.add("dropdownlist"); 
    dlSet.preferredSize.width = 170; 

    var dlAtn = grOpt.add("dropdownlist"); 
    dlAtn.preferredSize.width = 170; 

    var chStop = grOpt.add("checkbox"); 
    chStop.text = strStop

    var stErr = grOpt.add("statictext")
    //alert ($.os.version)
    stErr.text = "!"
    stErr.graphics.font = "dialog-Bold:12"
    stErr.preferredSize.width = 12

    bnAdd.onClick = function ()
    {
      renew = false 
      var options = cfg.options.split ('\n')

      var len = parent.children.length
      for (var i=0; i<len; i++) {if (grLine==parent.children[i]) break;}
      for (var n=i+1; n<len; n++) {parent.remove(parent.children[i+1])}

      var tmp = options.slice(0,i+1)
      tmp.push ("")
      tmp = tmp.concat (options.slice(i+1,len))
      options = options.slice(i+1,len)
      cfg.options = tmp.join ('\n')

      addAction (parent, "")

      for (var i=0; i<options.length; i++) {addAction (parent, options[i])}

      renew = true

      checkOptionsList (parent)
      collectSettings (parent)
      w.layout.layout (true) 
    }

    bnDel.onClick = function ()
    {
      renew = false
      var options = cfg.options.split ('\n')

      var len = parent.children.length
      for (var i=0; i<len; i++) {if (grLine==parent.children[i]) break;}
      for (var n=i; n<len; n++) {parent.remove(parent.children[i])}

      var tmp = options.slice(0,i)
      tmp = tmp.concat (options.slice(i+1,len))
      options = options.slice(i+1,len)
      cfg.options = tmp.join ('\n')

      for (var i=0; i<options.length; i++) {addAction (parent, options[i])}

      if (len - 1 == 0) {addAction (parent, "")}

      renew = true

      checkOptionsList (parent)
      parent.parent.children[!fromEvent ? 5 : 6].children[0].enabled = bnOkStatus ()

      collectSettings (parent)
      w.layout.layout (true) 
    }

    dlSet.onChange = function ()
    {
      if (this.enabled)
      {
        dlAtn.removeAll ()
        var idx = this.selection.index
        if (actionsList.length>0) for (var i=0; i<actionsList[idx][1].length; i++){dlAtn.add ('item',actionsList[idx][1][i])}
        dlAtn.selection = 0
      }

      if (renew) collectSettings (parent)
    }

    dlAtn.onChange = function ()
    {
     var len = parent.children.length
     if (cfg.options.split('\n').length == len && cfg.override && parent.children[len-1] == grLine && renew) checkOptionsList (parent, true)

     if (renew) collectSettings (parent)
    }

    chStop.onClick = function () {if (renew) collectSettings (parent)}

    chActive.onClick = function ()
    {
      var len = parent.children.length
      if (cfg.options.split('\n').length == len && cfg.override && parent.children[len-1] == grLine && renew) 
      {checkOptionsList(parent); parent.parent.children[!fromEvent ? 5 : 6].children[0].enabled = bnOkStatus()}

      dlSet.enabled = dlAtn.enabled = chStop.enabled = this.value
      if (renew) collectSettings (parent)
    }
    
    // выполняется один раз при загрузке строки
    addLine (s.split('\t'))
    checkLine ()

    parent.parent.children[!fromEvent ? 5 : 6].children[0].enabled = bnOkStatus ()
    
    collectSettings (parent)

  function addLine(s) 
  {
    var cur = 0,
    len = grOpt.children.length;

    for (var i = 0; i < len; i++) 
    {
      var current = grOpt.children[i]
      switch (current.type) {
        case "dropdownlist":
          s[cur] = s[cur] == undefined ? "" : s[cur]
          current.add('item', s[cur])
          cur++
          break;
        case "checkbox":
          if (cur == 0) 
          {
            s[cur] = s[cur] == "" ? 1 : Number(s[cur])
          }
          else 
          {
            s[cur] = s[cur] == undefined ? 0 : Number(s[cur])
          }
          current.value = s[cur]
          cur++
          break;
      }
    }
  }  

  function checkLine ()
  {
    var set = dlSet.items[0].text
    var atn = dlAtn.items[0].text

    dlSet.removeAll ()
    dlAtn.removeAll ()

    for (var i=0; i<actionsList.length-1;i++){dlSet.add ('item',actionsList[i][0])}
    if (set == "" && actionsList.length>1) {dlSet.selection = actionsList[actionsList.length-1][0]}
    else 
    {
      if (dlSet.find(set)) 
      {
        dlSet.selection=dlSet.find(set).index
      } 
      else
      {
        dlSet.add ('item',set)
        chActive.label = Number(chActive.value)
        chActive.enabled = false
        dlSet.selection = dlSet.items.length-1
      }
    }

    if (atn == "" && actionsList.length>1) {dlAtn.selection = actionsList[actionsList.length-1][1]}
    else 
    {
      if (dlAtn.find(atn) && dlSet.enabled ) 
      {
        dlAtn.selection=dlAtn.find(atn).index
      } else
      {
        if (chActive.label == undefined) chActive.label = Number(chActive.value)
        chActive.enabled = false
        dlAtn.add ('item',atn); dlAtn.selection = dlAtn.items.length-1}
      }

      dlSet.enabled=dlAtn.enabled=chStop.enabled=chActive.value
      if (!chActive.enabled) dlSet.enabled=dlAtn.enabled=chStop.enabled=false
  }  
}

function collectSettings(parent)
{
  var output = []
  var len = parent.children.length

  for (var i=0; i<len; i++) {output.push(readLine(parent.children[i].children[1]))}

  cfg.options = output.join ('\n')
  checkPresetIntegrity()

  function readLine (parent)
  {
    var line = []
    var len = parent.children.length
    for (var i=0; i<len;i++)
        {
            switch (parent.children[i].type)
            {
                case "dropdownlist":
                    line.push (parent.children[i].selection)
                    break;
                case "checkbox":
                    if (parent.children[i].label==undefined) 
                    {
                      line.push (Number(parent.children[i].value))
                    }
                    else
                    {
                      line.push (parent.children[i].label)
                    }
                    break;       
            }
        } 
    return line.join('\t')    
    }
}

function checkOptionsList(parent)
{
  if (parent.children.length == 0) return
  
  var result = false
  var len = parent.children.length
 
  // убираем видимые индикаторы, делаем видимыми все "стопы"
  for (var i=0; i<len; i++) 
  {
    var line = parent.children[i].children[1]
    if (line.children[4].visible) line.children[4].visible = false
    if (!line.children[3].visible) line.children[3].visible = true
  }

  // если включен батч-совместимый режим, проверяем последнюю команду
  if (cfg.saveMode > 1) 
  {
    var line = parent.children[len-1]
    if (cfg.override == true) 
    {
      if (!findSaveCommand (line)) {showErr (1, line.children[1].children[4])}
      if (!line.children[1].children[0].value) {showErr (2, line.children[1].children[4]); result = true}
    } 
      if (cfg.override) line.children[1].children[3].visible = false
  }

  //if (overrideMode) {noAction = result; return !result}
  
  // проверяем доступность каждой команды
  for (var i=0; i<len; i++) 
  {
    var line = parent.children[i].children[1]
    var bn = line.parent.children[0]

    if (line.children[0].label != undefined) 
    {
       result = true
       showErr (0, line.children[4])
    }

    // доступность кнопок добавить/удалить
    bn.children[0].enabled = len >= 5 || actionsList.length==0 ? false : true
    bn.children[1].enabled = actionsList.length==0 ? false : true
  }

  // доступность первой кнопки "удалить"
  if (actionsList.length != 0 && len == 1) {parent.children[0].children[0].children[1].enabled = parent.children[0].children[1].children[0].label != undefined ? true : false}

  noAction = result
  return !result

  function showErr (mode, labelObj)
  {       
    // 0 - экшен не найден
    // 1 - нет команды сохранить как в последнем действии
    // 2 - последнее действие неактивно

      var gfx = w.graphics
      var stGfx = labelObj.graphics;
      stGfx.font = "dialog-Bold:12"
      labelObj.visible = true
      switch (mode)
      {
        case 0:
          stGfx.foregroundColor = gfx.newPen(gfx.PenType.SOLID_COLOR, [1, 0, 0, 1], 1);
          labelObj.helpTip = strErrActionTip
        break;
        case 1:
          stGfx.foregroundColor = gfx.newPen(gfx.PenType.SOLID_COLOR, [1, 0.8, 0, 1], 1);
          labelObj.helpTip = localize(strErrOverrideTip,strOverride)
        break;
        case 2:
          stGfx.foregroundColor = gfx.newPen(gfx.PenType.SOLID_COLOR, [1, 0, 0, 1], 1);
          labelObj.helpTip = localize(strErrLastActionTip,strOverride)
        break;
      }
  }  
}
    return w
}

// =========================================
// основные функции
// =========================================    

function doBatch (init)
{
  // если выполнены все экшены и нужно открыть следующий файл
  if (cfg.doneCounter == -1)
  {
    if (init) preprocessFiles () // запускается только 1 раз при "сыром запуске"
    var result = false
    if (cfg.fileList != "" || cfg.docList != "") {result = openFiles()}
  } else {var result = true}
 
  // пропускаем первую операцию
  if (cfg.doneCounter == 0 && Boolean(cfg.autoStart) == false) cfg.doneCounter = -2 

  if (cfg.doneCounter != -1) 
  {
    if (result)
    {  
      var todo = cfg.options.split ('\n')
      if (cfg.doneCounter <= todo.length && cfg.doneCounter != -2) 
      {
        cfg.doneCounter = cfg.doneCounter < 0 ? 0 : cfg.doneCounter
        do
        {
          allDone = false // глобальная переменная, отмечаем что результат выполнения цикла нужно записать в настройки

          if (cfg.doneCounter<todo.length)
          {
            var tmp = todo[cfg.doneCounter].split ('\t')
            if (Boolean(Number(tmp[0])) == true) 
            {
                if (isActionAvailable (tmp[1],tmp[2]) == 0) {alert (localize(strErrAction, tmp[1], tmp[2])); cfg.globalErr = true; break;}

                if (cfg.doneCounter<todo.length-1 || Boolean(cfg.override) == false || cfg.saveMode == 0 || cfg.saveMode == 1)
                {
                  var cur = tmp.toString () + "\n" + cfg.continue
                  var isDone = runAction (tmp[1],tmp[2], cfg.continue) 

                  if (isDone == true)
                  {
                    cfg.doneCounter++
                    if (Boolean(Number(tmp[3]))) break;
                  } 
                  else 
                  {
                      if (cur == tmp.toString () + "\n" + cfg.continue && cfg.continue!=0) cfg.continue = -1 // если операция встала на том же месте, где и при прошлом запуске

                      if (cfg.allowContinue)
                      {
                        switch (cfg.continue)
                        {
                          case -1:
                            cfg.globalErr = true
                            break;
                          case 0:
                            cfg.doneCounter++ // если действие последнее???? то куда прибавлять!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            break;
                        }
                      }
                      else
                      {
                        switch (cfg.continue)
                        {
                          case -1:
                            cfg.globalErr = true
                            break;
                          default:
                            cfg.continue = 0
                            cfg.doneCounter++
                        }
                      }
                      break; // останавливаем цикл
                  }
                } 
                else
                {
                  if (!isAnyDocument()) {alert (strErrDoc); cfg.globalErr = true; break;} // если документ закрыт на момент сохранения
                  var pref = new BatchOptions
                  pref.overrideSave = true
                  pref.fileNaming = [FileNamingType.DOCUMENTNAMEMIXED,FileNamingType.EXTENSIONLOWER]
                  pref.unixCompatible = false
                  var pth = getActiveDocPath ()
                      
                  switch (cfg.saveMode)
                    {
                    case 0:
                    case 1:
                      break;
                    case 2:
                      if (pth == null) { alert(localize(strErrOverride,strOverride)); cfg.globalErr = true; break; }
                      pref.destination = BatchDestinationType.SAVEANDCLOSE
                      try { app.batch([pth], tmp[2], tmp[1], pref) } catch (e) { alert(strErrSave); cfg.globalErr = true; break; }
                      break;
                    case 3:
                      if (pth == null) { alert(localize(strErrOverride,strOverride)); cfg.globalErr = true; break; }
                      var fol = Boolean(cfg.keepStruct) ? rebuildPath(pth.path, cfg.lastSavePath) : Folder(cfg.lastSavePath)
                      if (!fol.exists) {try {fol.create()} catch (e) {alert(localize(strErrFolder, fol.fsName )); cfg.globalErr = true; break; }}
                      pref.destinationFolder = fol
                      pref.destination = BatchDestinationType.FOLDER
                      try { app.batch([pth], tmp[2], tmp[1], pref) } catch (e) { alert(strErrSave); cfg.globalErr = true; break; }
                      break;
                  }

                    if (cfg.globalErr) {break;}
                    cfg.doneCounter = -1

                    cfg.batch = cfg.fileList // сохраняем список готовых файлов
                    doBatch ()
                    break;
                }
            } else {cfg.doneCounter++} // если строка неактивна, пропустить
          } 
          else 
          {
            if (!isAnyDocument() && cfg.saveMode !=0) {alert (strErrDoc); cfg.globalErr = true; break;} 
            if (!cfg.override || cfg.saveMode == 0 || cfg.saveMode == 1)
            {
              if (cfg.saveMode == 2 || cfg.saveMode == 3)
              {
                var fileName = getActiveDocPath()
                fileName = fileName == null ? File(getDocTitle()).name : fileName.name
                fileName = removeExtension(fileName)
                var pth = getActiveDocPath()
                if (pth != null) { pth = pth.path }
              }

                switch (cfg.saveMode) 
                {
                  case 0:
                    break;
                  case 1:
                    var fol = getActiveDocPath()
                    if (fol == null) { alert(strErrNewFile); cfg.globalErr = true; break; }
                    try { closeDocument(true) } catch (e) { alert(strErrSave); cfg.globalErr = true; break }
                    break;
                  case 2:
                    if (pth == null) { alert(strErrNewFile); cfg.globalErr = true; break; }
                    try { saveAs(fileName, pth) } catch (e) { alert(strErrSave); cfg.globalErr = true; break }
                    closeDocument()
                    break;
                  case 3:
                    fol = Boolean(cfg.keepStruct) ? rebuildPath(pth, cfg.lastSavePath) : Folder(cfg.lastSavePath)
                    if (!fol.exists) {try {fol.create ()} catch (e) {alert(localize(strErrFolder,fol.fsName)); cfg.globalErr = true; break }}
                    try { saveAs(fileName, fol) } catch (e) { alert(strErrSave); cfg.globalErr = true; break }
                    closeDocument()
                    break;
                }
                
              } else {alert(localize(strErrBatchMode, strOverride, tmp[1], tmp[2]));cfg.globalErr = true; break} // если последнее действие деактивировано и мы попали сюда вместо override
              
              if (cfg.globalErr) {break;}
              cfg.doneCounter = -1

              cfg.batch = cfg.fileList // обновляем список файлов в очереди на обработку
              doBatch ()
              break;
            }
      } while (true)
  if (cfg.globalErr) {putScriptSettings(cfg); main ()}

    } else {cfg.doneCounter = -3} // ручной запуск
  }
  // записать в настройки результат выполнения экшенов
  if (cfg.fileList == "" && cfg.docList == "" && cfg.doneCounter == -1 && chkEvt()) {cfg.batch = ""; delEvt()}

  if (!allDone) {putScriptSettings (cfg); allDone = true}
  }
}

function preprocessFiles ()
{
  if (cfg.sourceMode != 2)
  {   
    if (cfg.sourceMode == 1 && getActiveDocID() != 0) 
    {
      cfg.docList = ""
      var tmp = cfg.fileList.split('\n')
      var cur = getActiveDocPath().toString()

      for (var i = 0; i < tmp.length; i++) 
      {
        if (tmp[i] == cur) 
        {
          tmp.splice(i, 1)
          break;
        }
      }
      cfg.docList = String(getActiveDocID())
      cfg.fileList = tmp.join ('\n')
    }  
    
    if (cfg.openAll) 
    {
      var skipOpened = cfg.sourceMode == 1
      openFiles(skipOpened)
    }
  }
}

function openFiles (skipOpened)
{
  var success = false // было ли в итоге открытие файла удачным
  do
  {
    if (cfg.fileList == "" && cfg.docList == "") break;

    if (useProgressBar) 
    {
        if (cfg.docList == "" || skipOpened)
        {
        app.doForcedProgress ("","openFile (skipOpened)")
        } else {openFile (skipOpened)}
    } else 
    {
        openFile (skipOpened)
    }
  } while (success == false)

  return success

  function openFile (skipOpened)
  {
    var files = cfg.fileList != "" ? cfg.fileList.split ('\n') : []
    var docs = cfg.docList != "" ? cfg.docList.split ('\n') : []

    cfg.batch = cfg.fileList // сохраняем очередь

    var errCounter = 0
    var filesLen = files.length
    var docsLen = docs.length

     if (docsLen == 0 || skipOpened)
    {
      for (var i=0; i<filesLen; i++) 
      {
          try 
          {
            var cur = File(files.shift())

            if (!skipOpened)
            {             
              if (useProgressBar) 
              {
                var s = getFileName(cur)
                var total = cfg.total
                var current = total - (files.length+1) +1
                app.updateProgress(current, total)
                app.changeProgressText(current + '\\' + total + ": " + s) 
              }  

              if (cfg.doACR && isFileOneOfThese(cur,arrayOfRawExtensions)) 
              {
                openCameraRaw (cur, cfg.doACR)
              } else 
              {
                app.open (cur)
              }
            }
              // документ открыт, готов к выполнению операций
              success = true
              cfg.doneCounter = 0
              cfg.continue = 0
            
            if (cfg.openAll) 
            {
              if (!skipOpened) docs.unshift (getActiveDocID())
              cfg.batch = files.length == 0 ? "" : files.join('\n') // удаляем из очереди уже открытые файлы

              if (cfg.groupBySubfolder)
              { 
                if (files.length != 0) 
                {
                  if (cur.path != File (files[0]).path) {break;}
                }
              }
            } else
            {
              break;
            }

           skipOpened = false

          } catch (e) 
          {
            errCounter ++
          }

          if (errCounter>=2) // обработка ошибки в процессе открытия. лучше переписать
          {           
              var len = files.length
              for (var i=0; i<len; i++) {var tmp = files.shift()}
              cfg.total = 0
              cfg.fileCounter = 0
              cfg.fileList = ""
              cfg.docList = ""
              cfg.batch =""
              break;
          }
        }
    } else
    {
      for (var i=0; i<docsLen; i++)
      {
        try {
          var cur = Number(docs.shift())
          selectDocumentByID(cur)
          
          // документ открыт, готов к выполнению операций
          success = true
          cfg.doneCounter = 0
          cfg.continue = 0
          break;
        } catch (e) {}
      }
    }

    cfg.fileCounter = cfg.total - files.length - docs.length
    cfg.fileList = files.length == 0 ? "" : files.join('\n')
    cfg.docList = docs.length == 0 ? "" : docs.join('\n')
    putScriptSettings(cfg)
  }
}

function getActiveDocPath ()
{
    try 
    {
      var ref = new ActionReference()
      ref.putProperty(gProperty, gFileReference)
      ref.putEnumerated(gDocument, gOrdinal, gTargetEnum)
      return executeActionGet(ref).getPath(gFileReference)
    } catch (e) {return null}
}

function getActiveDocID ()
{
  var ref = new ActionReference()
  ref.putProperty(gProperty, gDocumentID)
  ref.putEnumerated(gDocument, gOrdinal, gTargetEnum)
  try { return executeActionGet(ref).getInteger(gDocumentID) } catch (e) { return 0 }
}

function selectDocumentByID(id) {
	var desc = new ActionDescriptor()
  var ref = new ActionReference()
  
  ref.putIdentifier(gDocument, id )
  desc.putReference(gNull, ref)
	
	executeAction(gSelect, desc, DialogModes.NO );
}

function isAnyDocument ()
{
    var ref = new ActionReference()
    ref.putProperty(gProperty, gNumberOfDocuments)
    ref.putEnumerated(gApplication, gOrdinal, gTargetEnum)
    var output = executeActionGet(ref).getInteger(gNumberOfDocuments) > 0 ? true : false

    return output
}

function findAllFiles(srcFolderStr, destArray, useSubfolders) 
{    
  var doItAll = false
  var answer = false

  getFilesFromFolder (srcFolderStr) 
  return answer && !doItAll

  function getFilesFromFolder (srcFolder)
  {
    var fileFolderArray = Folder(srcFolder).getFiles();
    var subfolderArray = []

    for ( var i = 0; i < fileFolderArray.length; i++ ) 
      {      
        if (answer && !doItAll) break;

        if (destArray.length >= 2000 && !answer) 
        {   
            answer = true;
            doItAll = confirm ("Папка " + srcFolderStr.fsName + " содержит более 2000 файлов. Вы хотите продолжить?", false)
            if (!doItAll) break;
        }

        var fileFoldObj = fileFolderArray[i];

      if ( fileFoldObj instanceof File ) 
      {
        if (!fileFoldObj.hidden) destArray.push(fileFoldObj);
      } else 
      { // folder
        if (useSubfolders) subfolderArray.push(fileFoldObj);
      }
    }
    
    if (useSubfolders)
    {
      for ( var i = 0; i < subfolderArray.length; i++ ) getFilesFromFolder (subfolderArray[i])
    }
  }

}

function findAllDocs(destArray) 
{    
  var noPath = false

  var ref = new ActionReference()
  ref.putProperty(gProperty, gNumberOfDocuments)
  ref.putEnumerated(gApplication, gOrdinal, gTargetEnum)
  var len = executeActionGet(ref).getInteger(gNumberOfDocuments)
  
  if (len > 0)
  {
    var ref = new ActionReference()
    ref.putProperty(gProperty, gDocumentID)
    ref.putEnumerated(gDocument, gOrdinal, gTargetEnum)
    destArray.push (executeActionGet(ref).getInteger(gDocumentID))
    
    for (var i = len; i >= 1; i--) {
      var ref = new ActionReference()
      ref.putProperty(gProperty, gDocumentID)
      ref.putIndex(gDocument, i)
      var cur = executeActionGet(ref).getInteger(gDocumentID)
      if (cur!=destArray[0]) destArray.push (cur)

      var ref = new ActionReference()
      ref.putProperty(gProperty, gFileReference)
      ref.putIndex(gDocument, i)
      try {
        executeActionGet(ref).getPath(gFileReference)
        noPath = noPath ? true : false
      } catch (e) {noPath = true}
    }
  }

return noPath
}

function buildShortcutList (srcArray)
{
  var typeObject = {}, len = arrayOfFileExtensions.length
  for (var i=0; i<len; i++) {typeObject[arrayOfFileExtensions[i]]=false}

  len = srcArray.length
  for (var i = 0; i<len; i++)
  {
    var fle = srcArray[i].fsName.toString().toUpperCase()
    var lastDot = fle.lastIndexOf(".")
    if (lastDot == -1) continue;
    var extension = fle.substr(lastDot + 1, fle.length-lastDot)
    if (extension in typeObject) typeObject[extension] = true
  }

  if (cfg.lastFileType in typeObject) typeObject[cfg.lastFileType] = true
  
  var reflect = typeObject.reflect.properties
  var output = [strAllFiles.toString()]

  len = reflect.length
  for (var i = 0; i<len; i++)
  {
    if (typeObject[reflect[i].name] == true) output.push (reflect[i].name)
  }
  return output
}

function isFileOneOfThese (fileName, arrayOfExtensions)
{
    var fle = fileName.fsName.toString().toUpperCase ()
    var lastDot = fle.lastIndexOf( "." )
    if (lastDot == -1) return false
    var extension = fle.substr(lastDot + 1, fle.length - lastDot);

    for (var i=0; i<arrayOfExtensions.length; i++)
    {
        if (extension == arrayOfExtensions[i])
        {
            return true
        }
    }
    return false;
}

function getScriptSettings (settingsObj)
{
    try {var d = app.getCustomOptions(GUID);
    if (d!=undefined) descriptorToObject(settingsObj, d, strMessage)} catch (e) {}

    function descriptorToObject (o, d, s) 
    {
        var l = d.count;
        if (l) {
            if ( d.hasKey(gMessage) && ( s != d.getString(gMessage) )) return;
        }
        for (var i = 0; i < l; i++ ) {
            var k = d.getKey(i); 
            var t = d.getType(k);
            strk = app.typeIDToStringID(k);
            switch (t) {
                case DescValueType.BOOLEANTYPE:
                    o[strk] = d.getBoolean(k);
                    break;
                case DescValueType.STRINGTYPE:
                    o[strk] = d.getString(k);
                    break;
                case DescValueType.INTEGERTYPE:
                    o[strk] = d.getDouble(k);
                    break;
            }
        }
    }

}

function putScriptSettings (settingsObj)
{
    var d = objectToDescriptor(settingsObj, strMessage)
            app.putCustomOptions(GUID, d)

    function objectToDescriptor (o, s) 
    {
        var d = new ActionDescriptor;
        var l = o.reflect.properties.length;
        d.putString(gMessage, s);
        for (var i = 0; i < l; i++ ) {
            var k = o.reflect.properties[i].toString();
            if (k == "__proto__" || k == "__count__" || k == "__class__" || k == "reflect") continue;
            var v = o[ k ];
            k = app.stringIDToTypeID(k);
            switch ( typeof(v) ) {
                case "boolean": d.putBoolean(k, v); break;
                case "string": d.putString(k, v); break;
                case "number": d.putInteger(k, v); break;
            }
        }
        return d;
    }    
}

function initExportInfo (s) 
{
  s.sourceMode = 0
  s.lastPath = ""
  s.doSubfolders = true
  s.doACR = false
  s.fileList = ""
  s.docList = ""
  s.fileCounter = 0
  s.total = 0
  s.lastFileType = ""
  s.openAll = false
  s.groupBySubfolder = false

  s.globalErr = false
  s.autoStart = true
  s.allowContinue = true
  s.saveMode = 0
  s.lastSavePath = ""
  s.fileFormat = 0
  s.flatten = false
  s.jpgQuality = 12
  s.override = false
  s.options = ""
  s.batch = ""
  s.doneCounter = 0
  s.continue = 0
  s.keepStruct = true
  s.replaceFile = true
  s.preset = 0
}

function removeExtension (s) {return s.length - s.lastIndexOf(".") <= 5 && s.lastIndexOf(".") >= 0 ? s.slice(0, s.lastIndexOf(".")) : s}

function saveAs (file, pth)
{
  var fle = File(pth + '/' + file)

  if (cfg.flatten) app.activeDocument.flatten ()

  switch (cfg.fileFormat)
  {
    case 0:
      saveAsJPEG (fle, cfg.jpgQuality)
      break;
    case 1:
      saveAsTIFF (fle)
      break;
    case 2:
      saveAsPSD (fle)
      break;
  } 

function saveAsJPEG( inFileName, inQuality) {
	var jpegOptions = new JPEGSaveOptions();
  jpegOptions.quality = inQuality;
  var fle = Boolean (cfg.replaceFile) ? File( inFileName + ".jpg" ) : CreateUniqueFileName (inFileName, ".jpg")
	app.activeDocument.saveAs (fle, jpegOptions, true );
}

function saveAsPSD( inFileName) {
  var psdSaveOptions = new PhotoshopSaveOptions();
  var fle = Boolean (cfg.replaceFile) ? File( inFileName + ".psd" ) : CreateUniqueFileName (inFileName, ".psd")
	app.activeDocument.saveAs(fle, psdSaveOptions, true);
}

function saveAsTIFF( inFileName) {
	var tiffSaveOptions = new TiffSaveOptions();
  tiffSaveOptions.imageCompression = TIFFEncoding.NONE;
  var fle = Boolean (cfg.replaceFile) ? File( inFileName + ".tif" ) : CreateUniqueFileName (inFileName, ".tif")
	app.activeDocument.saveAs(fle, tiffSaveOptions,true);
}
}

function runAction (setName, atnName, idx)
{
  idx = idx == undefined ? 0 : idx
  
  var desc = new ActionDescriptor();
  var ref = new ActionReference();

  if (idx!=0) ref.putIndex (gCommand, idx)

  ref.putName(gAction, atnName );
  ref.putName(gActionSet, setName );
  desc.putReference(gTarget, ref );

  if (idx!=0) desc.putBoolean (gContinue, true)

  try {
    executeAction(gPlay, desc)
    cfg.continue = 0
    return true} 
    catch (e) 
    {
      cfg.continue = getCurrentCommand (setName, atnName)
      return false
    } 
}

function getCurrentCommand (setName, atnName)
{
 var idx  
 var command

    try
    {
      var ref = new ActionReference()
      ref.putEnumerated(gAction, gOrdinal, gTargetEnum)
      idx = executeActionGet(ref).getInteger(gItemIndex)
      command = executeActionGet(ref).getString(gName)
    } catch (e) {idx = 0}
    
    if (isActionAvailable(setName,atnName) == idx && command == atnName) 
    {
      if (idx == 0) return -1

      var ref = new ActionReference()
      ref.putName(gAction, atnName)
      ref.putName(gActionSet, setName)
      var numberOfChildren = executeActionGet(ref).getInteger(gNumberOfChildren)

      var ref = new ActionReference()
      ref.putIndex(gCommand, numberOfChildren)
      ref.putName(gAction, atnName)
      ref.putName(gActionSet, setName)
      if (executeActionGet(ref).getString(gName) == mStop) {return 0} else {return -1}
    }
    else
    {
      if (idx < 2) return -1

      var ref = new ActionReference()
      ref.putIndex(gCommand, idx-1)
      ref.putName(gAction, atnName)
      ref.putName(gActionSet, setName)
      if (executeActionGet(ref).getString(gName) == mStop) {return idx} else {return -1}
    }
}

function findSaveCommand (optionLine)
{
  try
  {
    var atnName = optionLine.children[1].children[2].selection.text
    var setName = optionLine.children[1].children[1].selection.text
    var ref = new ActionReference()
    ref.putProperty(gProperty, gNumberOfChildren)
    ref.putName(gAction, atnName)
    ref.putName(gActionSet, setName)
    var len = executeActionGet(ref).getInteger(gNumberOfChildren)

    for (var i = 1; i <= len; i++)
    {
      var ref = new ActionReference()
      ref.putIndex (gCommand, i)
      ref.putName(gAction, atnName)
      ref.putName(gActionSet, setName)

      if (executeActionGet(ref).getString(gName) == mSave && executeActionGet(ref).getInteger(gNumberOfChildren)>0) {return true}
    }
  } catch (e) {}
  
  return false
}

function getDocTitle ()
{
  var ref = new ActionReference()
  ref.putProperty(gProperty, gTitle)
  ref.putEnumerated(gDocument, gOrdinal, gTargetEnum)
  try {var nm = executeActionGet(ref).getString(gTitle)} catch (e) {var nm = ""}

  return nm
}

function isFolderWritable(inFolder) //
{
  var isWritable = false;
  var f = File(inFolder + '/' + "deleteme.txt");
  if (f.open("w", "TEXT", "????")) 
  {
    if (f.write("delete me")) 
    {
      if (f.close()) 
      {
        if (f.remove()) 
        {
          isWritable = true;
        }
      }
    }
  }
  return isWritable;
}

function getActionsList() //
{
  var output = []
  var setCounter = 1

  while (true) 
  {
    var ref = new ActionReference()
    ref.putIndex(gActionSet, setCounter)

    var desc = undefined
    try { desc = executeActionGet(ref) } catch (e) { break; }

    output.push([desc.getString(gName), []])

    var numberChildren = desc.hasKey(gNumberOfChildren) ? desc.getInteger(gNumberOfChildren) : 0
    var idx = setCounter - 1
    if (numberChildren > 0) output[idx][1] = getActionList(setCounter, numberChildren)
    setCounter++
  }

if (output.length>0) output.push (getActiveSetName ())

function getActionList(setIndex, numChildren) 
{
	var current = []
  for (var i = 1; i <= numChildren; i++ ) 
  {
    var ref = new ActionReference()
    ref.putIndex(gAction, i)
    ref.putIndex(gActionSet, setIndex)
    var tmp = executeActionGet(ref)
    current.push(executeActionGet(ref).getString(gName))
  }
	return current
}

function getActiveSetName () //
{
  var atn, set;

 try {
    var ref = new ActionReference()
    ref.putEnumerated(gAction, gOrdinal, gTargetEnum)
    atn = executeActionGet(ref).getString(gParent)

    try {
      var ref = new ActionReference()
      ref.putName(gActionSet, atn)
      set = executeActionGet(ref).getString(gName)

      var ref = new ActionReference()
      ref.putEnumerated(gAction, gOrdinal, gTargetEnum)
      atn = executeActionGet(ref).getString(gName)
    } catch (e) {
      var ref = new ActionReference()
      ref.putName(gAction, atn)
      set = executeActionGet(ref).getString(gParent)
    }
  }
 catch (e) {return [0,0]}  
   
 try 
 {
  var ref = new ActionReference()  
  ref.putName (gActionSet, set)   
  set = executeActionGet(ref).getInteger(gItemIndex)
 } catch (e) {set = 1}

 try
 {
  var ref = new ActionReference()  
  ref.putName (gAction, atn)   
  atn = executeActionGet(ref).getInteger(gItemIndex)
 } catch (e) {atn = 1}

	return [set-1, atn-1]
}

return output
}

function isActionAvailable(set, action)
{
  try {
    var ref = new ActionReference()
    ref.putName(gAction, action)
    ref.putName(gActionSet, set)
    var idx = executeActionGet(ref).getInteger(gItemIndex)
    return idx
  } catch (e) { return 0 }
}

function shortenPath (s)
{
    var win;
    if (s.indexOf('\\')!=-1) {s=s.split('\\'); win = true} else {s=s.split('/'); win = false}

    if (s.length>1)
    {
         var len = s[s.length-1].length
         var output = []
         var curLen = 0

         output.push(s[0])
         curLen = s[0].length

         for(var i=1; i<s.length-1; i++)
         {
            if (curLen + s[i].length + len < 34) 
            {
                output.push(s[i]); curLen += s[i].length
            } else
            {
                output.push("...")
                break;
            }
         }
         output.push (s[s.length-1])

         if (win) {s = output.join ('\\')} else s = output.join ('/')
    }

    return s
}

function getFileName (s)
{
    s = File(s).fsName
    if (s.indexOf('\\')!=-1) {s=s.split('\\')} else {s=s.split('/');}

    return s[s.length-1]
}

function openCameraRaw (fileName, inDialogMode ) 
{
    inDialogMode = inDialogMode == undefined || inDialogMode == false ? DialogModes.NO : DialogModes.ALL
    var desc = new ActionDescriptor()
    desc.putPath( gNull, File(fileName))
    desc.putBoolean( gOverrideOpen, true )
    executeAction(gOpen, desc, inDialogMode )
}

function addEvt ()
{
    delEvt()

    app.notifiersEnabled = true
    var handlerFile = File($.fileName)
    app.notifiers.add('Ntfy', handlerFile)
    app.notifiers.add('Cls ', handlerFile)
    app.notifiers.add('Ply ', handlerFile)
}

function delEvt()
{
    for (var i=0; i<app.notifiers.length; i++)
    {
       var ntf = app.notifiers[i]
       if (ntf.eventFile.name == File($.fileName).name) {ntf.remove(); i--}
    }
}

function chkEvt()
{
    for (var i=0; i<app.notifiers.length; i++)
    {
       var ntf = app.notifiers[i]
       if (ntf.eventFile.name == File($.fileName).name) {return true}
    }

    return false
}

function s2t(s) {return stringIDToTypeID(s)}
function t2s(s) {return typeIDToStringID(s)}

function closeDocument (save)
{
    save = save != true ? gNo : gYes
    var desc = new ActionDescriptor();
    desc.putEnumerated( gSave, gYesNo, save)
    executeAction( gClose, desc, DialogModes.NO)
}

function getParentPath (s, mode)
{
  if (s=="") return false

  s = Folder (s).toString()
  s = s.split ('/')
  var len = s.length

  for (var i=0;i<len-1;i++)
  { 
    if (mode) s.pop()
    var tmp = s.join('/')
    if (tmp != "") {tmp = new Folder(tmp)} else {break}
    if (tmp.exists) return mode ? s.join('/') : isFolderWritable(Folder(s.join('/')))
    s.pop()
  }

  return mode ? "" : false
}

function rebuildPath (from, to)
{
  var diff = cfg.sourceMode != 2 ? cfg.lastPath : getParentPath(from, true)
  diff = diff != "" ? Folder(diff).toString() : ""
  to = Folder (to)

  if (Boolean(cfg.keepStruct) && from != null && diff !="") 
  {
    if (from.toString().indexOf(diff)!=1)
    {
       to = new Folder(to + from.toString().replace(diff,""))
       if (!to.exists) {try{to.create ()} catch (e) {}}
    }
  }
  return to
}

function CreateUniqueFileName( inFileName, inExtension ) 
{
	var uniqueFileName = inFileName + inExtension;
	var fileNumber = 1;
	while (File(uniqueFileName).exists) {
		uniqueFileName = inFileName + "_" + fileNumber + inExtension;
		fileNumber++;
	}
	return File(uniqueFileName);
}

function putPreset (key, val, mode)
{
    var output = getPresetList ()

    switch (mode)
    {
      case "add":
        output.push ({key : key, val : val})
      break;
      case "save":
        for (var i=0; i<output.length; i++)
        {
          if (output[i].key == key) {output[i].val = val; break;}
        }
      break;
      case "delete":
        for (var i=0; i<output.length; i++)
        {
          if (output[i].key == key) {output.splice (i,1); break;}
        }
        break;
    }
    
    app.eraseCustomOptions('advancedBatch')

    var d = new ActionDescriptor();
    for (var i=0; i<output.length; i++){d.putString(s2t(output[i].key), output[i].val)}

    app.putCustomOptions('advancedBatch', d);
}

function getPreset (key)
{
    try {var d = app.getCustomOptions('advancedBatch');
    return d.getString(s2t(key))} catch (e) {return ""}
}

function getPresetList ()
{
    var output = []
    try {var d = app.getCustomOptions('advancedBatch');
   
    for (var i=0; i<d.count; i++) {output.push ({key: t2s(d.getKey(i)), val: d.getString(d.getKey(i))})}} catch (e) {}
    
    return output.sort(sortPresets)
}

function sortPresets (a,b){
  if (a.key >= b.key) {return 1} else {return -1}
}

function putSettingsToArray (s)
{
  var arr = [false,s.autoStart,s.allowContinue,s.saveMode,s.lastSavePath,s.fileFormat,s.flatten,s.jpgQuality,s.override,s.options,0,0,s.keepStruct,s.replaceFile]

  return arr.join ('\v')
}

function putArrayToSettings (s, arr)
{
  var a = arr.split ('\v')

  s.globalErr = a[0] == "true" ? true : false
  s.autoStart = a[1] == "true" ? true : false
  s.allowContinue = a[2] == "true" ? true : false
  s.saveMode = Number (a[3])
  s.lastSavePath = String (a[4])
  s.fileFormat = Number (a[5])
  s.flatten = a[6] == "true" ? true : false
  s.jpgQuality = Number (a[7])
  s.override = a[8] == "true" ? true : false
  s.options = String (a[9])
  s.doneCounter = Number (a[10])
  s.continue = Number(a[11])
  s.keepStruct = a[12] == "true" ? true : false
  s.replaceFile = a[13] == "true" ? true : false
}

/*
function getFilesFromBridge(){var files=[app.document.presentationPath];var len=app.document.selections.length;
  if(len==0){files.push(app.document.presentationPath)}{for (var i=0; i<len; i++){files.push(app.document.selections[i].path)}}return files.toSource()}*/