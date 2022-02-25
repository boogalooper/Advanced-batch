///////////////////////////////////////////////////////////////////////////////
// Simple batch: play actions - revision 0.1
// jazz-y@ya.ru
///////////////////////////////////////////////////////////////////////////////

#target photoshop

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>Simple batch: open files</name>
<category>jazzy</category>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

strMessage = "Simple batch: play actions"
strOpenFldr={ru: "открыть папку...", en: "open folder..."}
strBrowse={ru: "Обзор...", en: "Browse..."}
strOpen={ru: "Начать обработку", en: "Start processing"}
strCancel={ru: "Отмена", en: "Cancel"}
strBridgeList = {ru: "список файлов из Bridge", en: "Bridge file list"}

$.localize = true 
//$.locale = "ru"

gClassAction = s2t("action")
gClassActionSet = s2t( "actionSet" )
gCommand = s2t ("command")
gContinue = s2t("continue")
gDocument = s2t("document")
gDocumentID= s2t("documentID")
gFileReference = s2t("fileReference")
gItemIndex = s2t("itemIndex")
gKeyNumberOfChildren = s2t("numberOfChildren")
gMessage = s2t("message")
gName = s2t("name")
gOrdinal = s2t("ordinal")
gParent = s2t("parentName")
gPlay = s2t("play")
gProperty = s2t("property")
gTarget = s2t("target")
gTargetEnum = s2t("targetEnum")
gTitle = s2t ("title")
/*



gNumberOfDocuments = s2t("numberOfDocuments")
gApplication = s2t("application")
gNotify = s2t("notify")

gNull= s2t("null")
gOverrideOpen = s2t("overrideOpen")
gOpen = s2t("open")*/

GUID="718959f0-c9fc-4ffe-94c3-8282f031286a"
var isCancelled = false
var actionsList = getActionsList ()

// заполняем настройки данными по-умолчанию
var settings = new Object
initExportInfo (settings)

main ()

function main ()
{
    getScriptSettings (settings)

    var w = new buildWindow (); var result = w.show ()

    if (result==1) putScriptSettings (settings)
}

function buildWindow ()
{
  // W
  // =
  var w = new Window("dialog"); 
  w.text = strMessage; 
  w.orientation = "column"; 
  w.alignChildren = ["fill","top"]; 
  w.spacing = 10; 
  w.margins = 16; 

// PNATN
// =====
var pnAtn = w.add("panel", undefined, undefined, {name: "pnAtn"}); 
  pnAtn.text = "Операции:"; 
  pnAtn.preferredSize.height = 220; 
  pnAtn.orientation = "column"; 
  pnAtn.alignChildren = ["left","top"]; 
  pnAtn.spacing = 5; 
  pnAtn.margins = [10,20,10,10]; 

// W
// =

var grCheck = w.add("group", undefined); 
  grCheck.orientation = "column"; 
  grCheck.alignChildren = ["left","center"]; 
  grCheck.spacing = 10; 
  grCheck.margins = [0,0,0,0]; 

  
var chOnOpen = grCheck.add("checkbox", undefined, undefined, {name: "chOnOpen"}); 
  chOnOpen.text = "автоматически запускать первую операцию при открытии документа"; 

var chContinue = grCheck.add("checkbox", undefined, undefined, {name: "chContinue"}); 
  chContinue.text = "продолжать с места остановки внутри операции"; 

// PNSAVE
// ======
var pnSave = w.add("panel", undefined, undefined, {name: "pnSave"}); 
  pnSave.text = "После выполнения всех операций:"; 
  pnSave.orientation = "column"; 
  pnSave.alignChildren = ["left","top"]; 
  pnSave.spacing = 10; 
  pnSave.margins = [10,20,10,10]; 

// GRFOLDER
// ========
var grFolder = pnSave.add("group", undefined, {name: "grFolder"}); 
  grFolder.orientation = "row"; 
  grFolder.alignChildren = ["left","center"]; 
  grFolder.spacing = 10; 
  grFolder.margins = [0,0,0,0]; 

var dlSave_array = ["не сохранять","сохранить и закрыть","сохранить в папку"]; 
var dlSave = grFolder.add("dropdownlist", undefined, undefined, {name: "dlSave", items: dlSave_array}); 
  dlSave.preferredSize.width = 165; 

var bnFolder = grFolder.add("button", undefined, undefined, {name: "bnFolder"}); 
  bnFolder.text = "Обзор..."; 
  bnFolder.enabled = false
  
var stSavePath = grFolder.add("statictext", undefined, undefined, {name: "stSavePath"}); 
  stSavePath.preferredSize.width = 250; 
  stSavePath.visible = false

// GRSAVEOPTIONS
// =============
var grSaveOptions = pnSave.add("group", undefined, {name: "grSaveOptions"}); 
  grSaveOptions.orientation = "row"; 
  grSaveOptions.alignChildren = ["left","center"]; 
  grSaveOptions.spacing = 10; 
  grSaveOptions.margins = 0; 

var stFormat = grSaveOptions.add("statictext", undefined, undefined, {name: "stFormat"}); 
  stFormat.text = "формат файла"; 

var dlFormat_array = ["jpg","tif","psd"]; 
var dlFormat = grSaveOptions.add("dropdownlist", undefined, undefined, {name: "dlFormat", items: dlFormat_array}); 

var chFlatten = grSaveOptions.add("checkbox", undefined, undefined, {name: "chFlatten"}); 
  chFlatten.text = "объединять слои"; 

var slJpg = grSaveOptions.add("slider", undefined, undefined, undefined, undefined, {name: "slJpg"}); 
  slJpg.minvalue = 1; 
  slJpg.maxvalue = 12; 
  slJpg.preferredSize.width = 120

var stJpg = grSaveOptions.add("statictext", undefined, undefined, {name: "stJpg"}); 
stJpg.preferredSize.width = 20;

// PNSAVE
// ======
var chBatchMode = pnSave.add("checkbox", undefined, undefined, {name: "chBatchMode"}); 
  chBatchMode.text = "переопределить команды \"сохранить как\" для  последней операции"; 
  chBatchMode.value = true; 

// GRBN
// =====
var grBn = w.add("group", undefined, {name: "grBn1"}); 
  grBn.orientation = "row"; 
  grBn.alignChildren = ["center","center"]; 
  grBn.spacing = 10; 
  grBn.margins = 0; 

var ok = grBn.add("button", undefined, undefined, {name: "ok"}); 
  ok.text = "Начать обработку"; 

var cancel = grBn.add("button", undefined, undefined, {name: "cancel"}); 
  cancel.text = "Отмена"; 

var test = grBn.add("button", undefined, undefined); 
test.text = "Test"; 

chOnOpen.onClick = function () {settings.autoStart = this.value}
chContinue.onClick = function () {settings.allowContinue = this.value}
chFlatten.onClick = function () {settings.flatten = this.value}

dlSave.onChange = function ()
{
  settings.saveMode = this.selection.index
  switch (this.selection.index)
  {
    case 0:
      stSavePath.visible = bnFolder.enabled = false
      grSaveOptions.enabled = chBatchMode.enabled = false
    break;
    case 1:
      stSavePath.visible = bnFolder.enabled = false
      chBatchMode.enabled = true
      if (!settings.override) {grSaveOptions.enabled = true} else {grSaveOptions.enabled = false}
    break;
    case 2:
      stSavePath.visible = bnFolder.enabled = true
      chBatchMode.enabled = true
      if (!settings.override) {grSaveOptions.enabled = true} else {grSaveOptions.enabled = false}
      var fol = new Folder (settings.lastSavePath)
      if (fol.exists && isFolderWritable(fol)) {stSavePath.text = shortenPath (fol.fsName); stSavePath.helpTip = fol.fsName} else {settings.lastSavePath=stSavePath.text=stSavePath.helpTip = ""}
    break;
  }
}

dlFormat.onChange = function ()
{
  settings.fileFormat = this.selection.index

  switch (this.selection.index)
  {
    case 0:
      slJpg.visible = stJpg.visible = true
    break;
    default:
      slJpg.visible = stJpg.visible = false
  }
}

chBatchMode.onClick = function () 
{
  settings.override = this.value
  grSaveOptions.enabled = !this.value

  pnAtn.children[pnAtn.children.length-1].children[1].children[3].visible = !settings.override
}

test.onClick = function ()
{
  getScriptSettings (settings)
  var todo = settings.options.split ('\n')

  if (settings.doneCounter <= todo.length)
  {
      for (var i = settings.doneCounter; i<=todo.length; i++)
      {
        if (i<todo.length)
        {
          var tmp = todo[i].split ('\t')
          if (isActionAvailable (tmp[1],tmp[2]) && Boolean(Number(tmp[0])) == true) 
          {
            if (settings.doneCounter<todo.length-1 || Boolean(settings.override) == false)
              {
                var isDone = runAction (tmp[1],tmp[2], settings.continue)
                if (isDone == true)
                {
                  settings.doneCounter++
                  if (Boolean(Number(tmp[3]))) break;
                } else {break;}
              } else
              {
                alert ("batchsave")
                               
                var pref = new BatchOptions
                pref.overrideSave = true
                pref.fileNaming = [FileNamingType.DOCUMENTNAMEMIXED,FileNamingType.EXTENSIONLOWER]
                pref.unixCompatible = false
                var path = getActiveDocPath ()
                
                  switch (settings.saveMode)
                  {
                    case 0:
                      break;
                    case 1:
                      if (path==null) {alert ("Обработка остановлена!\nОпция \"переопределить команды сохранения\" не работает для новых документов созданных в процессе работы скрипта!"); settings.doneCounter = 0; break;}
                      pref.destination = BatchDestinationType.SAVEANDCLOSE
                      app.batch ([path],tmp[2],tmp[1], pref)
                      break;
                    case 2:
                      if (path==null) {alert ("Обработка остановлена!\nОпция \"переопределить команды сохранения\" не работает для новых документов созданных в процессе работы скрипта!"); settings.doneCounter = 0; break;}
                      var fol = Folder (settings.lastSavePath)
                      if (!fol.exists || !isFolderWritable(fol)) {alert ("Обработка остановлена! Указанная папка недоступна для сохранения файлов!"); settings.doneCounter = 0; break}

                      pref.destinationFolder = fol
                      pref.destination = BatchDestinationType.FOLDER
                      app.batch ([path], tmp[2],tmp[1], pref)
                      break;
                  }
              break;
            }
          }
        } else 
        {
          alert ("save")
          
          var fileName = getActiveDocPath ()
          fileName = fileName == null ? File (getDocTitle()).name : fileName.name
          fileName = removeExtension (fileName)

          var path = getActiveDocPath ()

          switch (settings.saveMode)
          {
            case 0:
              break;
            case 1:
              if (path==null) {alert ("Обработка остановлена!\nОпция \"сохранить и закрыть\" не работает для новых документов созданных в процессе работы скрипта!"); settings.doneCounter = 0; break;}
              saveAs (fileName, path.path)
              break;
            case 2:
              var fol = Folder (settings.lastSavePath)
              if (!fol.exists || !isFolderWritable(fol)) {alert ("Обработка остановлена! Указанная папка недоступна для сохранения файлов!"); settings.doneCounter = 0; break}
              saveAs (fileName, fol)
              break;
          }
          
          app.activeDocument.close ()
          settings.doneCounter = 0
          break;

          
        }
      
    }
  } 
  putScriptSettings (settings)
  
}

ok.onClick = function ()
{
  if (settings.saveMode == 2 && settings.lastSavePath == "") {alert ("Не указан каталог для сохранения файлов!"); return}
  collectSettings (pnAtn)
  settings.doneCounter = 0
  settings.continue = 0
  w.close(1)
}
slJpg.onChanging = function () {settings.jpgQuality = stJpg.text = Math.round (this.value)}

slJpg.addEventListener ('keyup', commonHandler)
slJpg.addEventListener ('mouseup', commonHandler)
slJpg.addEventListener ('mouseout', commonHandler)

function commonHandler(evt) {settings.jpgQuality = slJpg.value = stJpg.text = Math.round (slJpg.value)}

bnFolder.onClick = function ()
{
  var fol = new Folder(settings.lastSavePath)
  var userSelectedFolder = fol.selectDlg()
  if (userSelectedFolder) 
  {
    if (isFolderWritable(userSelectedFolder)) 
    {
      settings.lastSavePath = stSavePath.helpTip = userSelectedFolder.fsName; stSavePath.text = shortenPath (settings.lastSavePath)
    }
  }
}

w.onShow = function ()
{
    chOnOpen.value = settings.autoStart
    chContinue.value = settings.allowContinue
    dlSave.selection = settings.saveMode
    dlFormat.selection = settings.fileFormat
    chFlatten.value = settings.flatten
    slJpg.value = settings.jpgQuality; slJpg.onChanging ()
    chBatchMode.value = settings.override
  
    var tmp = settings.options.split ('\n'), len = tmp.length;
    for (var i=0; i<len; i++) {addAction (pnAtn,tmp[i])} 
    pnAtn.children[pnAtn.children.length-1].children[1].children[3].visible = !settings.override
    
    w.layout.layout (true) 
}

function addAction (parent, s)
{
    // GRLINE
    // ======
    var grLine = parent.add("group", undefined, {name: "grLine"}); 
    grLine.orientation = "row"; 
    grLine.alignChildren = ["left","center"]; 
    grLine.spacing = 10; 
    grLine.margins = 0; 

    // GRBN
    // ====
    var grBn = grLine.add("group", undefined, {name: "grBn"}); 
    grBn.orientation = "row"; 
    grBn.alignChildren = ["left","center"]; 
    grBn.spacing = 0; 
    grBn.margins = 0; 

    var bnAdd = grBn.add("button", undefined, undefined, {name: "bnAdd"}); 
    bnAdd.text = "+"; 
    bnAdd.preferredSize.width = 30; 
    if (actionsList.length == 0) bnAdd.enabled = false

    var bnDel = grBn.add("button", undefined, undefined, {name: "dnDel"}); 
    bnDel.text = "-"; 
    bnDel.preferredSize.width = 30; 
    parent.children[0].children[0].children[1].enabled = parent.children.length>1 ? true : false

    // GROPT
    // =====
    var grOpt = grLine.add("group", undefined, {name: "grOpt"}); 
    grOpt.orientation = "row"; 
    grOpt.alignChildren = ["left","center"]; 
    grOpt.spacing = 10; 
    grOpt.margins = [5,0,0,0]; 

    var chActive = grOpt.add("checkbox", undefined, undefined, {name: "chActive"}); 
    chActive.text = "включить"; 
    chActive.label = true
    
    var dlSet = grOpt.add("dropdownlist", undefined, undefined, {name: "dlSet"}); 
    dlSet.selection = 0; 
    dlSet.preferredSize.width = 150; 

    var dlAtn = grOpt.add("dropdownlist", undefined, undefined, {name: "dlAtn"}); 
    dlAtn.selection = 0; 
    dlAtn.preferredSize.width = 150; 

    var chStop = grOpt.add("checkbox", undefined, undefined, {name: "chStop"}); 
    chStop.text = "стоп"; 

    bnAdd.onClick = function ()
    {
      collectSettings (parent)
      var options = settings.options.split ('\n')

      var len = parent.children.length
      for (var i=0; i<len; i++) {if (grLine==parent.children[i]) break;}
      for (var n=i+1; n<len; n++) {parent.remove(parent.children[i+1])}

      var tmp = options.slice(0,i+1)
      tmp.push ("")
      tmp = tmp.concat (options.slice(i+1,len))
      options = options.slice(i+1,len)
      settings.options = tmp.join ('\n')

      addAction (parent, "")

      for (var i=0; i<options.length; i++) {addAction (parent, options[i])}

      if (len + 1 == 5) {for (var i=0; i<len+1; i++) {parent.children[i].children[0].children[0].enabled = false}}
      if (len + 1 == 2) {parent.children[0].children[0].children[1].enabled = true}
      
      for (var i=0; i<len; i++) {parent.children[i].children[1].children[3].visible = true}
      parent.children[i].children[1].children[3].visible = !settings.override

      w.layout.layout (true) 
    }

    bnDel.onClick = function ()
    {
      collectSettings (parent)
      var options = settings.options.split ('\n')

      var len = parent.children.length
      for (var i=0; i<len; i++) {if (grLine==parent.children[i]) break;}
      for (var n=i; n<len; n++) {parent.remove(parent.children[i])}

      var tmp = options.slice(0,i)
      tmp = tmp.concat (options.slice(i+1,len))
      options = options.slice(i+1,len)
      settings.options = tmp.join ('\n')

      for (var i=0; i<options.length; i++) {addAction (parent, options[i])}

      if (len - 1 == 4) {for (var i=0; i<len-1; i++) {parent.children[i].children[0].children[0].enabled = true}}
      if (len - 1 == 1) {parent.children[0].children[0].children[1].enabled = false} else {parent.children[0].children[0].children[1].enabled = true}

      for (var i=0; i<len-2; i++) {parent.children[i].children[1].children[3].visible = true}
      parent.children[i].children[1].children[3].visible = !settings.override

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
    }

    chActive.onClick = function ()
    {
      if (this.label)
      {
        dlSet.enabled=dlAtn.enabled=chStop.enabled=this.value

      } else {this.value = false; alert ("Невозможно активировать строку - операция не найдена!")}
    }
    
    // выполняется один раз при загрузке строки
    addLine (s.split('\t'))
    checkLine ()
    dlSet.enabled=dlAtn.enabled=chStop.enabled=chActive.value

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
        chActive.label = chActive.value = false
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
        chActive.label = chActive.value = false
        dlAtn.add ('item',atn); dlAtn.selection = dlAtn.items.length-1}
      }
  }

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
          if (cur == 0) 
          {
            s[cur] = s[cur] == "" ? true : Number(s[cur])
          }
          else 
          {
            s[cur] = s[cur] == undefined ? false : Number(s[cur])
          }
          current.value = s[cur]
          cur++
          break;
        default:
          $.writeln(parent.children[i].type)
          break;
      }
    }
  }
}

function collectSettings(parent)
{
  var output = []
  var len = parent.children.length

  for (var i=0; i<len; i++) {output.push(readLine(parent.children[i].children[1]))}

  settings.options = output.join ('\n')

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
                    line.push (Number(parent.children[i].value))
                    break;       
                default: $.writeln (parent.children[i].type)
                break;
            }
        } 
    return line.join('\t')    
    }
}

return w;
}

function removeExtension (s) {return s.length - s.lastIndexOf(".") <= 5 && s.lastIndexOf(".") >= 0 ? s.slice(0, s.lastIndexOf(".")) : s}

function saveAs (file, path)
{
  var fle = File( path + '/' + file)

  if (settings.flatten) app.activeDocument.flatten ()

  switch (settings.fileFormat)
  {
    case 0:
      saveAsJPEG (fle, settings.jpgQuality)
      break;
    case 1:
      saveAsTIFF (fle)
      break;
    case 2:
      saveAsPSD (fle)
      break;
  } 
}

function saveAsJPEG( inFileName, inQuality) {
	var jpegOptions = new JPEGSaveOptions();
	jpegOptions.quality = inQuality;
	app.activeDocument.saveAs ( File( inFileName + ".jpg" ), jpegOptions, true );
}

function saveAsPSD( inFileName) {
	var psdSaveOptions = new PhotoshopSaveOptions();
	app.activeDocument.saveAs( File( inFileName + ".psd" ), psdSaveOptions, true);
}

function saveAsTIFF( inFileName) {
	var tiffSaveOptions = new TiffSaveOptions();
    tiffSaveOptions.imageCompression = TIFFEncoding.NONE;
	app.activeDocument.saveAs( File( inFileName + ".tif" ), tiffSaveOptions,true);
}

function runAction (setName, atnName, idx)
{
  idx = idx == undefined ? 0 : idx
  
  var desc = new ActionDescriptor();
  var ref = new ActionReference();

  if (idx!=0) ref.putIndex (gCommand, idx)

  ref.putName(gClassAction, atnName );
  ref.putName(gClassActionSet, setName );
  desc.putReference(gTarget, ref );

  if (idx!=0) desc.putBoolean (gContinue, true)

  try {
    executeAction(gPlay, desc)
    settings.continue = 0
    return true} 
    catch (e) 
    {
      settings.continue = getCurrentCommand ()
      if (Boolean(Number(settings.allowContinue))) {return false} else {return true}
    } 
}

function getCurrentCommand ()
{
  if (Boolean(Number(settings.allowContinue)))
  {
  var idx
  
    try
    {
      var ref = new ActionReference()
      ref.putEnumerated(gClassAction, gOrdinal, gTargetEnum)
      idx = executeActionGet(ref).getInteger(gItemIndex)

      return idx == 1 ? 0 : idx
    } catch (e) {}
  }
      return 0
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

function getActionsList(activeSet) //
{

  var output = []
  var setCounter = 1

  while (true) 
  {
    var ref = new ActionReference()
    ref.putIndex(gClassActionSet, setCounter)

    var desc = undefined
    try { desc = executeActionGet(ref) } catch (e) { break; }

    output.push([desc.getString(gName), []])

    var numberChildren = desc.hasKey(gKeyNumberOfChildren) ? desc.getInteger(gKeyNumberOfChildren) : 0
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
    ref.putIndex(gClassAction, i)
    ref.putIndex(gClassActionSet, setIndex)

    current.push(executeActionGet(ref).getString(gName))
  }
	return current
}

function getActiveSetName () //
{
  var atn, set;

 try {
    var ref = new ActionReference()
    ref.putEnumerated(gClassAction, gOrdinal, gTargetEnum)
    atn = executeActionGet(ref).getString(gParent)

    try {
      var ref = new ActionReference()
      ref.putName(gClassActionSet, atn)
      set = executeActionGet(ref).getString(gName)

      var ref = new ActionReference()
      ref.putEnumerated(gClassAction, gOrdinal, gTargetEnum)
      atn = executeActionGet(ref).getString(gName)
    } catch (e) {
      var ref = new ActionReference()
      ref.putName(gClassAction, atn)
      set = executeActionGet(ref).getString(gParent)
    }
  }
 catch (e) {return [0,0]}  
   
 try 
 {
  var ref = new ActionReference()  
  ref.putName (gClassActionSet, set)   
  set = executeActionGet(ref).getInteger(gItemIndex)
 } catch (e) {set = 1}

 try
 {
  var ref = new ActionReference()  
  ref.putName (gClassAction, atn)   
  atn = executeActionGet(ref).getInteger(gItemIndex)
 } catch (e) {atn = 1}

	return [set-1, atn-1]
}

return output
}

function isActionAvailable(set, action)
{
  try 
  {
    var ref = new ActionReference()
    if (action != undefined) ref.putName(gClassAction, action)
    ref.putName(gClassActionSet, set)
    desc = executeActionGet(ref)
    return true
  } catch (e) {return false}

}

function initExportInfo (s) //
{
    s.autoStart = true
    s.allowContinue = true
    s.saveMode = 0
    s.lastSavePath = ""
    s.fileFormat = 0
    s.flatten = false
    s.jpgQuality = 12
    s.override = false
    s.options = ""
    s.doneCounter = 0
    s.continue = 0
    s.docId = 0
}

function getScriptSettings (settingsObj) //
{
    try {var d = app.getCustomOptions(GUID);
    if (d!=undefined) descriptorToObject(settingsObj, d, strMessage)} catch (e) {}

    function descriptorToObject (o, d, s) 
    {
        $.writeln (" ")
        var l = d.count;
        if (l) {
            if ( d.hasKey(gMessage) && ( s != d.getString(gMessage) )) return;
        }
        for (var i = 0; i < l; i++ ) {
            var k = d.getKey(i); // i + 1 ?
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

function putScriptSettings (settingsObj) //
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
                default: $.writeln (typeof(v)); break;
            }
        }
        return d;
    }    
}

function getActiveDocID ()
{
    var ref = new ActionReference()
    ref.putProperty(gProperty, gDocumentID)
    ref.putEnumerated(gDocument, gOrdinal, gTargetEnum)
    try {var id = executeActionGet(ref).getInteger(gDocumentID)} catch (e) {var id = 0}

    return id
}

function getActiveDocPath () //
{
   try 
    {
        var ref = new ActionReference()
        ref.putProperty(gProperty, gFileReference)
        ref.putEnumerated(gDocument, gOrdinal, gTargetEnum)
        return executeActionGet(ref).getPath(gFileReference)
    } catch (e) {return null}
}

function shortenPath (s) //
{
    var win;
    if (s.indexOf('\\')!=-1) {s=s.split('\\'); win = true} else {s=s.split('//'); win = false}

    if (s.length>1)
    {
         var len = s[s.length-1].length
         var output = []
         var curLen = 0

         output.push(s[0])
         curLen = s[0].length

         for(var i=1; i<s.length-1; i++)
         {
            if (curLen + s[i].length + len < 40) 
            {
                output.push(s[i]); curLen += s[i].length
            } else
            {
                output.push("...")
                break;
            }
         }
         output.push (s[s.length-1])

         if (win) {s = output.join ('\\')} else s = output.join ('//')
    }

    return s
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

function s2t(s) {return stringIDToTypeID(s)} //
function t2s(t) {return typeIDToStringID(t)} //

function putProgressBarSettings (val)
{
    var d = new ActionDescriptor();
    d.putBoolean(s2t(strMessage), val);
    app.putCustomOptions("progressBar", d);
}

function getProgressBarSettings ()
{
    try{var d = app.getCustomOptions("progressBar");
    return d.getBoolean(s2t(strMessage))} catch (e) {return false}
}