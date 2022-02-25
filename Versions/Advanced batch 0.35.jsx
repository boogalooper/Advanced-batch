///////////////////////////////////////////////////////////////////////////////
// Advanced batch - revision 0.351
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

strAcr={ru: "открывать RAW в ACR", en: "open RAW in ACR"}
strActivate={ru: "включить", en: "active"}
strActiveDocFldr={ru: "папка активного документа", en: "folder of active document"}
strAllFiles={ru: "все файлы", en: "all files"}
strAtn={ru: "Операции:", en: "Actions:"}
strAuto = {ru: "автоматически запускать первую операцию при открытии документа", en: "automatically start first action when opening a document"}
strBridgeList = {ru: "список файлов из Bridge", en: "Bridge file list"}
strBrowse={ru: "Обзор...", en: "Browse..."}
strCancel={ru: "Отмена", en: "Cancel"}
strContinue ={ru: "продолжить с места остановки, если она была внутри операции", en: "continue from the point of stop if it was inside the operation"}
strCopy = {ru: " копия", en: " copy"}
strCounter={ru: "количество файлов: ", en: "number of files: "}
strDefailt={ru: "по-умолчанию", en: "default"}
strDelete={ru: "Удалить", en: "Delete"}
strErrActive={ru: "Не найдена папка активного документа!", en: "Folder of active document not found!"}
strErrAtn={ru: "Невозможно активировать строку - операция не найдена!", en: "Unable to activate row - action not found!"}
strErrBatchMode = {ru: "Обработка остановлена!\nОпция \"переопределить команды сохранения\" активна, но при этом последняя операция в списке недоступна!", en: "Processing stopped!\nOption \"override save as commands\" is active, but the last operation in the list is not available!"}
strErrBridge={ru: "Невозможно установить соединение с Bridge!", en: "Unable connect to Bridge!"}
strErrCounter={ru: "Выбрано слишком много файлов!", en: "Too many files selected!"}
strErrDoc = {ru: "Обработка остановлена! Документ закрыт до окончания всех операций!", en: "Processing stopped! Document is closed until the end of all operations!"}
strErrFolder={ru: "Обработка остановлена! Указанная папка недоступна для сохранения файлов!", en: "Processing stopped! The specified folder is not available for saving files!"}
strErrNewFile = {ru: "Обработка остановлена!\nОпция \"сохранить и закрыть\" не работает для новых документов созданных в процессе работы скрипта!", en: "Processing stopped!\nOption \"save and close\" does not work for new documents created during the script!"}
strErrOverride ={ru: "Обработка остановлена!\nОпция \"переопределить команды сохранения\" не работает для новых документов созданных в процессе работы скрипта!", en: "Processing stopped!\nOption \"override save as commands\" does not work for new documents created during the script!"}
strErrPreset={ru: "Набор с таким именем уже существует. Перезаписать?", en: "A set with the same name already exists. Overwrite?"}
strErrSave={ru: "Обработка остановлена! Ошибка при сохранении файла!", en: "Processing stopped! Error saving file!"}
strExt={ru: "открывать следующие типы файлов: ", en: "open following file types: "}
strFlatten={ru: "объединить слои", en: "flatten layers"}
strFormat={ru: "тип файла", en: "file type"}
strFromBridge={ru: "получить файлы из Bridge", en: "get files form Bridge"}
strKeepStructure = {ru: "сохранять структуру подпапок", en: "keep structure of subfolders"}
strMessage = "Advanced batch"
strNext = {ru: "Следующий файл", en: "Next file"}
strNone={ru: "ничего", en: "none"}
strOpen={ru: "Начать обработку", en: "Start processing"}
strOpenFldr={ru: "открыть папку...", en: "open folder..."}
strOverride={ru: "переопределить команды \"сохранить как\" в последней операции", en: "override \"save as\" commands in last action"}
strPostProcess={ru: "После выполнения всех операций:", en: "After completing all actions:"}
strPreset = {ru: "Сохранение пресета", en: "Saving a preset"}
strPresetPromt = {ru: "Укажите имя пресета\nБудут сохранены настройки операций и параметры сохранения файлов", en: "Specify the name of the preset\nThe operation settings and file saving settings will be saved"}
strReplace={ru: "заменять файлы при сохранении", en: "replace files when saving"}
strSC={ru: "сохранить и закрыть", en: "save and close"}
strSAC={ru: "сохранить как… и закрыть", en: "save as… and close"}
strSave={ru: "Сохранить", en: "Save"}
strSaveAs={ru: "Добавить", en: "Add new"}
strSet={ru: "Пресет:", en: "Preset:"}
strSource={ru: "Источник:", en: "Source:"}
strSTF={ru: "сохранить как… в папку", en: "save as… to folder"}
strStop={ru: "Превать обработку", en: "Stop processing"}
strStop={ru: "стоп", en: "stop"}
strSubfolders={ru: "обрабатывать подкаталоги", en: "include all subfolders"}

var maxNumberOfFiles = 1500 // ограничение на максимальное количество файлов в каталоге/подкаталогах

$.localize = true 
//$.locale = "ru" 

gApplication = s2t("application")
gClassAction = s2t("action")
gClassActionSet = s2t( "actionSet" )
gClose = s2t ("close")
gCommand = s2t ("command")
gContinue = s2t("continue")
gDocument = s2t("document")
gDocumentID= s2t("documentID")
gFileReference = s2t("fileReference")
gItemIndex = s2t("itemIndex")
gKeyNumberOfChildren = s2t("numberOfChildren")
gMessage = s2t("message")
gName = s2t("name")
gNo = s2t ("no")
gNotify = s2t("notify")
gNull= s2t("null")
gNumberOfDocuments = s2t("numberOfDocuments")
gOpen = s2t("open")
gOrdinal = s2t("ordinal")
gOverrideOpen = s2t("overrideOpen")
gParent = s2t("parentName")
gPlay = s2t("play")
gProperty = s2t("property")
gSave = s2t ("saving")
gTarget = s2t("target")
gTargetEnum = s2t("targetEnum")
gTitle = s2t ("title")
gYesNo = s2t ("yesNo")
gYes = s2t ("yes")

GUID="e939c6c3-429d-4ca3-ae24-2d82dcf5de2e"

var ArrayOfFileExtensions = ["PSD","PDD","PSDT","PSB","BMP","RLE","DIB","GIF","EPS","IFF","TDI","JPG","JPEG","JPE","JPF","JPX","JP2","J2C",
"J2K","JPC","JPS","MPO","PCX","PDF","PDP","RAW","PXR","PNG","SCT","TGA","VDA","ICB","VST","TIF","TIFF","PBM","PGM","PPM","PNM","PFM","PAM",
"DCM","DC3","DIC","TIF","CRW","NEF","RAF","ORF","MRW","DCR","MOS","SRF","PEF","DCR","CR2","DNG","ERF","X3F","RAW"]
var ArrayOfRawExtensions = ["TIF", "CRW", "NEF", "RAF", "ORF", "MRW", "DCR", "MOS", "SRF", "PEF", "DCR", "CR2", "DNG", "ERF", "X3F", "RAW"]

var err = false // глобальная ошибка при чтении каталога
var isEvent = true // режим запуска из ивента или нет
var allFiles = [] // массив с файлами из папки
var renew = true // необходимость чтения из панели экшенов
var isCancelled = false // не записывать скрипт в палитру при отмене
var fromBridge = false

var settings = new Object
initExportInfo (settings)

try{var d = app.playbackParameters
fromBridge = d.getBoolean(d.getKey(0))} catch (e) {}

//alert (fromBridge)

var actionsList = getActionsList ()

try {if (arguments.length==0) isEvent = false} catch (e) {isEvent = false}
if (isEvent) {main(arguments)} else {main()}

isCancelled ? 'cancel' : undefined

function main (arguments)
{   
 //   alert ("запуск основной функции")
    if (!isEvent)
    {
       getScriptSettings (settings)
       // первый запуск, в случае, если нет уже установленных слушателей событий
       if (!chkEvt() && !settings.globalErr || fromBridge)
       {
  //       alert ("запуск в нормальном режиме\n" + settings.toSource()) 
         
         if (fromBridge) {delEvt();resetBatch()}

          var w = buildWindow (false); var result = w.show ()

            if (result!=2)
            {
           //   alert ("after save " + settings.sourceMode  )
               // добавить слушателя событий
              if (chkEvt()) delEvt()
              addEvt ()
            
              if (settings.sourceMode == 1 && !fromBridge) 
              {
                // исключить из списка уже открытый файл
                var tmp = settings.fileList.split('\n')
                var cur = getActiveDocPath()
                var output = []

                if (tmp.length > 0 && cur != null) 
                {
                    for (var i = 0; i < tmp.length; i++) 
                    {
                    if (tmp[i] == cur) {continue;} else {output.push(tmp[i])}
                    }
                }

                settings.fileList = output.join('\n')

                initCounters (getActiveDocID(), 1, 0)
                doBatch(true)
              } else
              {
                initCounters (0, 0,-1)
                doBatch()
              }
            } else {isCancelled = true}
        } 
        else
        {
            // если есть связанные со скриптом слушатели событий
            // если на экране не найден ранее открытый документ
       //     alert ("запуск при наличии назначенныйх событий \n" + settings.toSource())
            if (!getDocumentID() || settings.globalErr)//////
            {
              if (settings.globalErr)
              {
                if (settings.fileList !="")
                {
        //          alert ("была ошибка, нужно обязательно показать окно\n")
                  errWindow (true) 
                } else
                {
         //         alert ("в очереди больше нет файлов\nостанавливаем обработку, удаляем события")
                  resetBatch ()
                  main()
                } 
              } else
              {
        //        alert ("на экране нет документа, разбираемся почему\n")
                if (settings.fileList !="")
                {
       //             alert ("в очереди обработки еще есть файлы\n")
                    if (settings.saveMode == 0)
                    {
           //           alert ("Включена опция \"Не сохранять\".\nЕсли операция была последней в очереди, то открыть следующий\n")
                      if (settings.doneCounter == settings.options.split('\n').length)
                        {
           //               alert ("операция была последней, сбрасываем счетчики, открываем след документ\n")
                          resetCurrentJob (true)
                        } else
                        {
            //             alert ("операция НЕ была последней, открываем окно")
                          errWindow ()
                        }
                    }
                    else
                    {
            //          alert ("причина непонятна, показываем окно\n")
                      errWindow ()
                    }
                }
                else
                {
         //        alert ("в очереди больше нет файлов\nостанавливаем обработку, удаляем события")
                  resetBatch ()
                  main()
                }
              }
            } 
            else
            {
      //        alert ("всё в порядке!\nвыполняем следующую операцию")
              doBatch ()
            }
        }
    } 
    else
    {
   //     alert ("запуск иницилизирован событием")
        try {var event = arguments[1]} catch (e) {/*alert ("режим события, но аргумента нет");*/ return}

        if (event == gNotify)
        {
     //     alert ("перезапуск фотошопа, удяляем события, чистим очередь")
          resetBatch ()
        } 
        else
        {
   //       alert ("только что был закрыт файл")
          getScriptSettings (settings)
   //       alert ("запуск по событию close" +"\n" + settings.toSource())/////

         //  если на экране уже нет ранее запомненного документа
          if (!getDocumentID())
          {
      //     alert ("на экране нет документа, разбираемся почему\n")
            // если это был последний документ
            if (settings.fileList == "")
            {
      //        alert ("Это был последний документ в очереди, удяляем события, чистим очередь")
              resetBatch ()
              return
            }

              // если при прошлом запуске не было ошибки
            if (settings.globalErr == false) 
            { 
      //       alert ("не было ошибки, пытаемся выполнить следующее действие"); 
              doBatch ()
            } 
            else 
            { 
       //       alert ("была ошибка,сбрасываем флаг, открываем окно в режиме ошибки")
              errWindow (true)
            }
          }
        }
    }


//==========================================
// вспомогаетельные функции
//==========================================
function initCounters (id, shiftTotal, startFrom)
{
  settings.lastDocId = id
  settings.total = settings.fileList.split('\n').length + shiftTotal
  settings.doneCounter = startFrom
  settings.continue = 0
}

function errWindow (resetErr)
{
  if (resetErr) settings.globalErr = false
 // alert ("до запуска формы" +"\n" + settings.toSource())
  var w = buildWindow (true); var result = w.show ()
//  alert ("после запуска формы" +"\n" + settings.toSource())

  if (result==2)
  {
    settings.lastDocId = 0
    settings.fileCounter = 0
    settings.fileList = ""
    settings.doneCounter = -1
    settings.continue = 0

    delEvt()
    putScriptSettings(settings)

    // перезапуск скрипта
    main ()
  } else 
  {
    
    settings.lastDocId = 0
    settings.doneCounter = -1
    settings.continue = 0
    doBatch ()
  }
}

function resetCurrentJob (proceed)
{
  settings.globalErr = false
  settings.lastDocId = 0
  settings.doneCounter = -1
  settings.continue = 0
  if (proceed) doBatch ()
}

function resetBatch ()
{
  settings.globalErr = false
  settings.lastDocId = 0
  settings.fileCounter = 0
  settings.fileList = ""
  settings.doneCounter = -1
  settings.continue = 0

  delEvt()

  putScriptSettings(settings)
}
}

function buildWindow (fromEvent)
{
// =========================================
// open files module
// =========================================  
var doNotUpdate = false;

var w = new Window("dialog"); 
    w.text = strMessage; 
    w.orientation = "column"; 
    w.alignChildren = ["fill","top"]; 
    w.spacing = 10; 
    w.margins = 16; 

// PN
// ==
var pn = w.add("panel", undefined, undefined, {name: "pn"}); 
    pn.text = strSource; 
    pn.orientation = "column"; 
    pn.alignChildren = ["fill","top"]; 
    pn.spacing = 10; 
    pn.margins = 10; 

// GRFLD
// =====
var grFld = pn.add("group", undefined, {name: "grFld"}); 
    grFld.orientation = "row"; 
    grFld.alignChildren = ["left","center"]; 
    grFld.spacing = 10; 
    grFld.margins = 0; 

var dl_array = [strOpenFldr,strActiveDocFldr,strFromBridge]; 
var dl = grFld.add("dropdownlist", undefined, undefined, {name: "dl", items: dl_array}); 
dl.preferredSize.width = 180; 

var bnBrowse = grFld.add("button", undefined, undefined, {name: "bnBrowse"}); 
    bnBrowse.text = strBrowse; 
    
var stPath = grFld.add("statictext", undefined, undefined, {name: "stPath"}); 
    stPath.preferredSize.width = 250
// PN
// ==

var chSubfld = pn.add("checkbox", undefined, undefined, {name: "chSubfld"}); 
    chSubfld.text = strSubfolders; 

var chAcr = pn.add("checkbox", undefined, undefined, {name: "chAcr"}); 
    chAcr.text = strAcr; 

    // GR
// ==
var gr = pn.add("group", undefined, {name: "gr"}); 
    gr.orientation = "row"; 
    gr.alignChildren = ["left","fill"]; 
    gr.spacing = 10; 
    gr.margins = 0; 

var statictext1 = gr.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = strExt; 
 
var dlTypes_array = [strAllFiles]; 
var dlTypes = gr.add("dropdownlist", undefined, undefined, {name: "dlTypes", items: dlTypes_array}); 
    dlTypes.selection = 0; 

var stCounter = pn.add("statictext", undefined, undefined, {name: "st"}); 
    stCounter.text = strCounter + "00000/00000";     
// W
// =

// GRPRESET
// ========
  var grPreset = w.add("group", undefined, {name: "grPreset"}); 
      grPreset.orientation = "row"; 
      grPreset.alignChildren = ["left","center"]; 
      grPreset.spacing = 10; 

  var dlPreset_array = [strDefailt]; 
  var dlPreset = grPreset.add("dropdownlist", undefined, undefined, {name: "dlPreset", items: dlPreset_array}); 
      dlPreset.text= strSet
      dlPreset.preferredSize.width = 250

  var bnSave = grPreset.add("button", undefined, undefined, {name: "bnSave"}); 
      bnSave.text = strSave

  var bnSaveAs = grPreset.add("button", undefined, undefined, {name: "bnSaveAs"}); 
      bnSaveAs.text = strSaveAs

  var bnDel = grPreset.add("button", undefined, undefined, {name: "bnDel"}); 
      bnDel.text = strDelete 

// =========================================
// action module
// =========================================    

// PNATN
// =====
var pnAtn = w.add("panel", undefined, undefined, {name: "pnAtn"}); 
  pnAtn.text = strAtn 
  pnAtn.preferredSize.height = 220; 
  pnAtn.orientation = "column"; 
  pnAtn.alignChildren = ["left","top"]; 
  pnAtn.spacing = 5; 
  pnAtn.margins = [10,20,10,10]; 


var grCheck = w.add("group", undefined); 
  grCheck.orientation = "column"; 
  grCheck.alignChildren = ["left","center"]; 
  grCheck.spacing = 10; 
  grCheck.margins = [0,0,0,0]; 
 
var chOnOpen = grCheck.add("checkbox", undefined, undefined, {name: "chOnOpen"}); 
  chOnOpen.text = strAuto 

var chContinue = grCheck.add("checkbox", undefined, undefined, {name: "chContinue"}); 
  chContinue.text = strContinue

// PNSAVE
// ======
var pnSave = w.add("panel", undefined, undefined, {name: "pnSave"}); 
  pnSave.text = strPostProcess
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

var dlSave_array = [strNone,strSC, strSAC,strSTF]; 
var dlSave = grFolder.add("dropdownlist", undefined, undefined, {name: "dlSave", items: dlSave_array}); 
  dlSave.preferredSize.width = 180; 

var chReplace = pnSave.add("checkbox"); 
chReplace.text = strReplace

var bnFolder = grFolder.add("button", undefined, undefined, {name: "bnFolder"}); 
  bnFolder.text = strBrowse
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
  stFormat.text = strFormat

var dlFormat_array = ["jpg","tif","psd"]; 
var dlFormat = grSaveOptions.add("dropdownlist", undefined, undefined, {name: "dlFormat", items: dlFormat_array}); 

var chFlatten = grSaveOptions.add("checkbox", undefined, undefined, {name: "chFlatten"}); 
  chFlatten.text = strFlatten

var slJpg = grSaveOptions.add("slider", undefined, undefined, undefined, undefined, {name: "slJpg"}); 
  slJpg.minvalue = 1; 
  slJpg.maxvalue = 12; 
  slJpg.preferredSize.width = 120

var stJpg = grSaveOptions.add("statictext", undefined, undefined, {name: "stJpg"}); 
stJpg.preferredSize.width = 20;

// PNSAVE
// ======
var chBatchMode = pnSave.add("checkbox", undefined, undefined, {name: "chBatchMode"}); 
  chBatchMode.text = strOverride 

var chKeepStructure = pnSave.add("checkbox"); 
chKeepStructure.text = strKeepStructure 

var bar = w.add('progressbar', undefined, 0, settings.total);
bar.preferredSize =[undefined,20]
bar.value = settings.fileCounter
bar.helpTip = strCounter + settings.fileCounter + "\\" + settings.total
// GRBN
// ====
var grBn = w.add("group", undefined, {name: "grBn"}); 
    grBn.orientation = "row"; 
    grBn.alignChildren = ["center","center"]; 
    grBn.spacing = 10; 
    grBn.margins = 0; 

var ok = grBn.add("button", undefined, undefined, {name: "ok"}); 
    ok.text = strOpen; 

var cancel = grBn.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = strCancel; 

bnBrowse.onClick = function ()
{
    var tmp = settings.sourceMode
    settings.sourceMode = 0
    if (getFiles () == false) settings.sourceMode = tmp
}

dl.onChange = function ()
{
  if (this.selection.index != 0) {bnBrowse.enabled=false} else {bnBrowse.enabled=true}
    
  var tmp = settings.sourceMode
  settings.sourceMode = this.selection.index
  if (getFiles () == false)
  {
    tmp = tmp == settings.sourceMode ? 0 : tmp
    doNotUpdate = true; this.selection = tmp; settings.sourceMode = tmp; doNotUpdate = false 
  }

 // alert ("mode from droplist: "+ settings.sourceMode)
}

dlTypes.onChange = function ()
{
    settings.lastFileType = this.selection.text
    enumFiles (Folder(settings.lastPath), this.selection.text)
}

chSubfld.onClick = function () {settings.doSubfolders = this.value; doNotUpdate = true; getFiles();doNotUpdate = false}
chAcr.onClick = function () {settings.doACR = this.value}

// ======================================================
// панель операций
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
      putArrayToSettings (settings, a)

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
      putArrayToSettings (settings, a)

      var len = pnAtn.children.length
      for (var i=0;i<len; i++) {pnAtn.remove(pnAtn.children[0])}

      w.onShow(true)
    }
  }

    settings.preset = this.selection.index
    putScriptSettings (settings)
    checkPresetIntegrity()
}

bnSave.onClick = function ()
{
  var a = putSettingsToArray (settings)
  var nm = dlPreset.selection.text
  putPreset (nm, a, "save")

  putScriptSettings (settings)
  checkPresetIntegrity()
}

bnSaveAs.onClick = function ()
{
  var a = putSettingsToArray (settings)
  var nm = prompt(strPresetPromt, dlPreset.selection.text + strCopy, strPreset)
  
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
        if (confirm (strErrPreset, false,strPreset))
        {
          putPreset (nm, a, "save")

          doNotUpdate = true;
          dlPreset.selection = dlPreset.find (nm)
          doNotUpdate = false;
        } 
      }
    }
  }

  putScriptSettings (settings)
  checkPresetIntegrity()
}

bnDel.onClick = function ()
{
  var a = putSettingsToArray (settings)
  var nm = dlPreset.selection.text
  var num = dlPreset.selection.index

  putPreset (nm, a, "delete")
  loadPresets ()

  num = num > dlPreset.items.length-1 ? dlPreset.items.length-1 : num
  dlPreset.selection = num

  putScriptSettings (settings)
  checkPresetIntegrity()
}

chOnOpen.onClick = function () {settings.autoStart = this.value; checkPresetIntegrity()}
chContinue.onClick = function () {settings.allowContinue = this.value; checkPresetIntegrity()}
chFlatten.onClick = function () {settings.flatten = this.value; checkPresetIntegrity()}
chKeepStructure.onClick = function () {settings.keepStruct = this.value; checkPresetIntegrity()}
chReplace.onClick = function () {settings.replaceFile = this.value; checkPresetIntegrity()}

dlSave.onChange = function ()
{
  settings.saveMode = this.selection.index
  switch (this.selection.index)
  {
    case 0:
    case 1:  
      if (settings.fileList!="") ok.enabled = true
      stSavePath.visible = bnFolder.enabled = chReplace.enabled = false
      grSaveOptions.enabled = chBatchMode.enabled = chKeepStructure.enabled = false
      pnAtn.children[pnAtn.children.length-1].children[1].children[3].visible = true
    break;
    case 2:
      if (settings.fileList!="") ok.enabled = true
      stSavePath.visible = bnFolder.enabled = chKeepStructure.enabled = false
      chBatchMode.enabled = chReplace.enabled = true
      if (!settings.override) {grSaveOptions.enabled = true} else {grSaveOptions.enabled = false}
      pnAtn.children[pnAtn.children.length-1].children[1].children[3].visible = !settings.override
    break;
    case 3:
      stSavePath.visible = bnFolder.enabled = true
      chBatchMode.enabled = chKeepStructure.enabled = chReplace.enabled = true
      if (!settings.override) {grSaveOptions.enabled = true} else {grSaveOptions.enabled = false}
      pnAtn.children[pnAtn.children.length-1].children[1].children[3].visible = !settings.override
      
      var fol = new Folder (settings.lastSavePath)
      if (fol.exists && isFolderWritable(fol)) 
      {
        stSavePath.text = shortenPath (fol.fsName)
        stSavePath.helpTip = fol.fsName
        if (settings.fileList!="") ok.enabled = true
      } 
      else 
      {
        settings.lastSavePath=stSavePath.text=stSavePath.helpTip = ""
        ok.enabled =false
      }
    break;
  }
  checkPresetIntegrity()
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
  checkPresetIntegrity()
}

chBatchMode.onClick = function () 
{
  settings.override = this.value
  grSaveOptions.enabled = chReplace.enabled = !this.value

  if (settings.saveMode > 1) pnAtn.children[pnAtn.children.length-1].children[1].children[3].visible = !settings.override
  checkPresetIntegrity()
}

slJpg.onChanging = function () {settings.jpgQuality = stJpg.text = Math.round (this.value); checkPresetIntegrity()}
slJpg.addEventListener ('keyup', commonHandler)
slJpg.addEventListener ('mouseup', commonHandler)
slJpg.addEventListener ('mouseout', commonHandler)
function commonHandler(evt) {settings.jpgQuality = slJpg.value = stJpg.text = Math.round (slJpg.value); checkPresetIntegrity()}

bnFolder.onClick = function ()
{
  var fol = new Folder(settings.lastSavePath)
  var userSelectedFolder = fol.selectDlg()

  if (userSelectedFolder) 
  {
    if (isFolderWritable(userSelectedFolder)) 
    {
      if (settings.fileList!="") ok.enabled = true
      settings.lastSavePath = stSavePath.helpTip = userSelectedFolder.fsName; stSavePath.text = shortenPath (settings.lastSavePath)
    } 
  } else
  {
    if (settings.lastSavePath=="")
    {
      ok.enabled = false
    }
  }

  checkPresetIntegrity()
}

ok.onClick = function ()
{
  collectSettings (pnAtn)
  putScriptSettings (settings)
  w.close (1)
}

w.onShow = function (fromPreset)
{
  if (fromBridge) {var SM = settings.sourceMode} 
  if (fromBridge) {var SP = settings.lastPath} 
  
  if (!fromPreset)
  {
    doNotUpdate = true
  
    if (!fromEvent)
    {
      if (!fromBridge)
      {
        settings.sourceMode = settings.sourceMode == 1 && getActiveDocPath()==null ? 0 : settings.sourceMode 
        settings.sourceMode = !BridgeTalk.isRunning('bridge') && settings.sourceMode == 2 ? 0 : settings.sourceMode
        dl.selection = settings.sourceMode
      } else {dl.selection = 2}

      stPath.text = settings.sourceMode == 2 ? strBridgeList : shortenPath(settings.lastPath)
      stPath.helpTip = settings.sourceMode == 2 ? strBridgeList : settings.lastPath
      w.remove(bar)
    }
    else
    {
    //  alert ("начало запуска формы, сохраняем настройки" +"\n" + settings.toSource())
      putScriptSettings(settings)
      dl.selection = settings.sourceMode
      stPath.text = shortenPath(settings.lastPath)
      stPath.helpTip = settings.lastPath
      pn.enabled = false
      bnBrowse.enabled = false
      stCounter.text = strCounter + settings.total
      ok.text = strNext
      cancel.text = strStop
      getScriptSettings(settings)
    }

    chSubfld.value = settings.doSubfolders
    chAcr.value = settings.doACR
    
    loadPresets();
    doNotUpdate = true; dlPreset.selection = settings.preset > dlPreset.items.length - 1 ? 0 : settings.preset; doNotUpdate = false
    checkPresetIntegrity()
  }

  chOnOpen.value = settings.autoStart
  chContinue.value = settings.allowContinue
  dlFormat.selection = settings.fileFormat
  chFlatten.value = settings.flatten
  slJpg.value = settings.jpgQuality; slJpg.onChanging()
  chBatchMode.value = settings.override
  chKeepStructure.value = settings.keepStruct
  chReplace.value = settings.replaceFile

  renew = false
  var tmp = settings.options.split('\n'), len = tmp.length;
  for (var i = 0; i < len; i++) { addAction(pnAtn, tmp[i]) }
  if (settings.saveMode > 1) pnAtn.children[pnAtn.children.length - 1].children[1].children[3].visible = !settings.override
  renew = true

  dlSave.selection = settings.saveMode // здесь специально, потому что панель операций должна быть загружена раньше
  if (fromBridge) settings.sourceMode = SM // здесь специально, сохраняем изначально введенные настройки

  w.layout.layout(true) 


}

function checkPresetIntegrity()
{
  if (dlPreset.selection.index>0)
  {
    var cur = putSettingsToArray (settings)
    var old = getPreset(dlPreset.selection.text)

    bnSave.enabled = cur == old ? false : true
  } else {bnSave.enabled = false}
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

function getFiles()
{
    if (settings.sourceMode == 0 && !doNotUpdate)
    {
        var fol = new Folder(settings.lastPath)
        var userSelectedFolder = fol.selectDlg()
        if (!userSelectedFolder) return false 
    }
    else
    {
        if (settings.sourceMode == 1)
        {
            var userSelectedFolder = getActiveDocPath ()

            if (userSelectedFolder == null) 
            {
                alert (strErrActive)
                return false 
            }
            else
            {userSelectedFolder = Folder (userSelectedFolder.path)}
        }

        if (settings.sourceMode == 2) 
        {
                if (BridgeTalk.isRunning('bridge')) 
                {
                    var bt = new BridgeTalk();
                    bt.target = "bridge";
                    bt.body = "" + getFilesFromBridge.toString() + "; getFilesFromBridge();";
                    bt.onResult = function(response) 
                        {
                        var filesArray = eval(response.body)
                        userSelectedFolder = filesArray
                        }

                    bt.onError = function(err) {
                    alert("Error!\n" + err.body)}

                    bt.send(3000); 
                } else
                { 
                    alert (strErrBridge)
                    return false
                }

        }
    }
        if (userSelectedFolder) 
        {
            var result = enumFiles (userSelectedFolder)
        } else 
        {
            var fol = new Folder(settings.lastPath)
            if (fol.exists)
            {
                var result = enumFiles (fol)
            } else {
                stPath.text = stPath.helpTip = settings.lastPath = ""
                stCounter.text = ""
                ok.enabled =false
            }
        }   

        if (result == false) {stPath.text =  stPath.helpTip = settings.lastPath = stCounter.text = ""; ok.enabled =false; return false} else {return true}
}

function enumFiles (userSelectedFolder, filter)
    {

        var readFromFS = !filter ? true : false
        filter = !filter || filter == strAllFiles ? ArrayOfFileExtensions : [filter]
        var shortList = [strAllFiles]

        if (settings.sourceMode != 2)
        {
            if (readFromFS)
            {
                errOversize = false
                allFiles = []
                findAllFiles(userSelectedFolder, allFiles, settings.doSubfolders)
                if (checkErr ()) {allFiles = []; return false}  
            }       
        } else
            {
                if (readFromFS)
                {
                    errOversize = false
                    allFiles = []

                    for (var i=1; i<userSelectedFolder.length; i++) //перебор файлов всех каталогов, кроме первого
                    {
                        var tmp = File (userSelectedFolder[i])
                        if (tmp.exists)
                        {
                            if (!isFolder(tmp))
                            {
                                allFiles.push (tmp)
                            }
                            else {
                                findAllFiles(tmp, allFiles, settings.doSubfolders)
                                if (checkErr ()) {allFiles = []; return false}  
                            }
                        }
                    } 
                }
            }

                var files = allFiles.slice(0)
                var filesToDo = []
                for (var i=0; i<files.length; i++)
                {
                  if (files[i] instanceof File) {} else {files[i] = File(files[i])}
                  if (isFileOneOfThese (files[i],filter,shortList)) filesToDo.push (files[i].toString())
                }

                if (userSelectedFolder instanceof Array)
                {
                  var fol = Folder (userSelectedFolder[0])
                  if (fol.exists)
                  {
                    if (userSelectedFolder.length>2)
                        {
                          settings.lastPath = fol.fsName
                        } 
                        else
                        {
                          var fle = File(userSelectedFolder[1])
                          if (isFolder(fle)) 
                          {
                            settings.lastPath = fle.fsName
                          }
                          else
                          {
                            settings.lastPath = fol.fsName
                          }
                        }
                  } else 
                  {
                        for (var i=1; i<userSelectedFolder.length; i++)
                        {
                          var fle = File(userSelectedFolder[i])
                          if (isFolder(fle) && fle.exists) 
                          {
                            settings.lastPath = fle.fsName; break;
                          }
                          else
                          {
                            settings.lastPath = fle.parent.fsName; break;
                          }
                       }
                  }
                } else {settings.lastPath = userSelectedFolder.fsName} 
                
                settings.fileList = filesToDo.join ('\n')
                if (settings.sourceMode != 2) {stPath.text = shortenPath(settings.lastPath); stPath.helpTip = settings.lastPath} else {stPath.text = strBridgeList; stPath.helpTip = strBridgeList}

                if (filesToDo.length != 0) {stCounter.text = strCounter + filesToDo.length} else {stCounter.text = strCounter + "0"}

                if (settings.sourceMode == 0) {doNotUpdate = true; dl.selection=0; doNotUpdate =false}
                if (filesToDo.length > 0) {if (settings.lastSavePath != "" || settings.saveMode != 2) ok.enabled = true} else {ok.enabled =false}
                
                if (readFromFS)
                {
                    dlTypes.removeAll ()
                    for (var i = 0; i<shortList.length; i++) 
                    {
                        dlTypes.add("item",shortList[i])
                    }

                    if (dlTypes.find(settings.lastFileType)) {dlTypes.selection = dlTypes.find(settings.lastFileType).index} else {dlTypes.selection = 0}
                }

    return true
    }

    function checkErr ()
    {
        if (err) 
        {
            err = false
            alert (strErrCounter)
            return true
        }
        return false
    }

    function isFolder (s)
    {
       if (s.fsName.lastIndexOf(".") != -1 && s.fsName.length - s.fsName.lastIndexOf(".") <=5) {return false}
       return true
    }


// ======================================================
// ======================================================
    
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
    chActive.text = strActivate 
    chActive.label = true
    
    var dlSet = grOpt.add("dropdownlist", undefined, undefined, {name: "dlSet"}); 
    dlSet.selection = 0; 
    dlSet.preferredSize.width = 150; 

    var dlAtn = grOpt.add("dropdownlist", undefined, undefined, {name: "dlAtn"}); 
    dlAtn.selection = 0; 
    dlAtn.preferredSize.width = 150; 

    var chStop = grOpt.add("checkbox", undefined, undefined, {name: "chStop"}); 
    chStop.text = strStop

    bnAdd.onClick = function ()
    {
      renew = false 
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
      if (settings.saveMode > 1) parent.children[i].children[1].children[3].visible = !settings.override

      renew = true

      collectSettings (parent)
      w.layout.layout (true) 
    }

    bnDel.onClick = function ()
    {
      renew = false
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
      if (settings.saveMode > 1) parent.children[i].children[1].children[3].visible = !settings.override

      renew = true

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
      if (renew) collectSettings (parent)
    }

    chStop.onClick = function () {if (renew) collectSettings (parent)}

    chActive.onClick = function ()
    {
      if (this.label)
      {
        dlSet.enabled=dlAtn.enabled=chStop.enabled=this.value

      } else {this.value = false; alert (strErrAtn)}

      if (renew) collectSettings (parent)
    }
    
    // выполняется один раз при загрузке строки
    addLine (s.split('\t'))
    checkLine ()
    collectSettings (parent)

    dlSet.enabled=dlAtn.enabled=chStop.enabled=chActive.value
    
    var len = parent.children.length
    if (len == 5) {for (var i=0; i<len; i++) {parent.children[i].children[0].children[0].enabled = false}}
    {

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
            s[cur] = s[cur] == "" ? 1 : Number(s[cur])
          }
          else 
          {
            s[cur] = s[cur] == undefined ? 0 : Number(s[cur])
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
                    line.push (Number(parent.children[i].value))
                    break;       
                default: $.writeln (parent.children[i].type)
                break;
            }
        } 
    return line.join('\t')    
    }
}
    return w
}

function doBatch (skipOpened)
{
  // если выполнены все экшены и нужно открыть следующий файл
  // - 1 команда была успешно выполнена, можно открывать следующий файл, 0 - 6 ничего не открывать, выполнять экшен
  if (settings.doneCounter == -1 && !getDocumentID () && settings.fileList != "")
  {
   // alert ("открываем файл и сбрасываем счетчики операций\n" + settings.toSource())
    var output = settings.fileList.split ('\n')

    if (!skipOpened)
    {
      if (output.length > 0)
      {
        app.doForcedProgress ("","openFile(output)")
      }
    }

    settings.doneCounter = 0 // готов к выполнению операций
    settings.continue = 0 // обнуляем команды продолжения
    settings.lastDocId = getActiveDocID() // записать id открытого документа

    settings.fileCounter = settings.total - output.length
    settings.fileList = output.length == 0 ? "" : output.join('\n')

  ////  alert ("файл открыт\n" + settings.toSource())
    // записать в настройки что файл был открыт
    putScriptSettings(settings)
  }
  
  // пропускаем первую операцию
  if (settings.doneCounter == 0 && Boolean(settings.autoStart) == false) settings.doneCounter = -2 

 // alert ("начинаем задание\nначальная операция " + settings.doneCounter + "\n номер команды " + settings.continue)
  if (settings.doneCounter != -1) 
  {
  // если есть незавершенные операции
  var todo = settings.options.split ('\n')

  if (settings.doneCounter <= todo.length && settings.doneCounter != -2) 
  {
      settings.doneCounter = settings.doneCounter < 0 ? 0 : settings.doneCounter
      do
      {
     //   alert ("документ на экране " + getDocumentID () + "\nрежим сохранения " +settings.saveMode)
        if (getDocumentID () || settings.saveMode == 0)  //если ранее открытый документ есть на экране или установлен режим "не сохранять"
        {
          if (settings.doneCounter<todo.length)
          {
            var tmp = todo[settings.doneCounter].split ('\t')
        //    alert ("сейчас будет операция " + tmp)
            if (isActionAvailable (tmp[1],tmp[2]) && Boolean(Number(tmp[0])) == true) 
            {
          //    alert ("Операция доступна! Выполняем операцию: " + settings.doneCounter + "\nномер команды " + settings.continue)
              if (settings.doneCounter<todo.length-1 || Boolean(settings.override) == false || settings.saveMode == 0 || settings.saveMode == 1)
                {
                  if (!getDocumentID ()) {/*alert ("установлено, что перед началом операции нет документа на экране!");*/ settings.globalErr = true; break;} // если документ уже закрыт
                 
                  var isDone = runAction (tmp[1],tmp[2], settings.continue) //проверить внезапную отмену операции, проверить поведение если документ закрыт на последней операции
                  if (isDone == true)
                  {
                    settings.doneCounter++
                    if (Boolean(Number(tmp[3]))) break;
                  } else {break;}

                  if (!getDocumentID () && settings.saveMode !=0) {alert (strErrDoc); settings.globalErr = true; break;} //проверил
                } 
                else
                {
              //    alert ("сохраняем в режиме batch")      
                  var pref = new BatchOptions
                  pref.overrideSave = true
                  pref.fileNaming = [FileNamingType.DOCUMENTNAMEMIXED,FileNamingType.EXTENSIONLOWER]
                  pref.unixCompatible = false
                  var pth = getActiveDocPath ()
                  
                    switch (settings.saveMode)
                    {
                      case 0:
                      case 1:
               //         alert ("вас тут не должно быть!")
                        break;
                      case 2:
                        if (pth==null) {alert (strErrOverride); settings.globalErr = true; break;} //проверил
                        pref.destination = BatchDestinationType.SAVEANDCLOSE
                 //       alert ("сохраняем как в режиме batch: файл " + pth + "\nопции " + pref.toString() )
                        try {app.batch ([pth],tmp[2],tmp[1], pref)} catch (e) {alert (strErrSave);settings.globalErr = true; break;}
                        break;
                      case 3:
                        if (pth==null) {alert (strErrOverride); settings.globalErr = true; break;}
                        var fol = Boolean (settings.keepStruct) ? rebuildPath (pth.path, settings.lastSavePath) :Folder (settings.lastSavePath)
                        if (!fol.exists) {alert (strErrFolder); settings.globalErr = true; break;}
                        pref.destinationFolder = fol
                        pref.destination = BatchDestinationType.FOLDER
                   //     alert ("сохраняем в папку в режиме batch: файл " + pth + "\nопции " + pref.toString() )
                        try {app.batch ([pth], tmp[2],tmp[1], pref)} catch (e) {alert (strErrSave);settings.globalErr = true; break;}
                        break;
                    }

                if (settings.globalErr) {break;}

                settings.doneCounter = -1
             //   alert ("после выполнения batch: done counter " + settings.doneCounter + "\nsave mode: " + settings.saveMode)
                if (settings.saveMode!=0) {/*alert ("как я тут оказался?!, но вызываю повторно doBatch ()");*/ doBatch ()} // ?????????? когда сюда попадает
                break;
              }
            } else {settings.doneCounter++/*; alert ("опеарация неактивна! переходим к операции " + settings.doneCounter)*/} // если строка неактивна, пропустить
          } 
          else 
          {
       //     alert ("сохраняем при помощи save")
            if (!settings.override || settings.saveMode == 0 || settings.saveMode == 1)
            {
              if (settings.saveMode == 2 || settings.saveMode == 3)
              {
                var fileName = getActiveDocPath ()
                fileName = fileName == null ? File (getDocTitle()).name : fileName.name
                fileName = removeExtension (fileName)
                var pth = getActiveDocPath ()
                if (pth!=null) {pth = pth.path}
              //  alert ("нормальное сохранение, инициализируем пути! fileName: " +  fileName + "\n pth: "+ pth)
              }

              switch (settings.saveMode)
              {
                case 0:
            //      alert ("сохранение не требуется, ставим флаг успешного выполнения команды!")
                  settings.doneCounter = -1
                  break;
                case 1:
                  var fol = getActiveDocPath ()
                  if (fol == null) {alert (strErrNewFile); settings.globalErr = true; break;}
             //     alert ("сохранить и закрыть\n " + fol.fsName + " "+ fol.exists)
                  try {closeDocument (true)} catch (e) {alert (strErrSave); settings.globalErr = true; break}
                  settings.doneCounter = -1
                  break;
                case 2:
                  if (pth==null) {alert (strErrNewFile); settings.globalErr = true; break;}
             //     alert ("сохранить как закрыть\n " + pth)
                  try {saveAs (fileName, pth)} catch (e) {alert (strErrSave); settings.globalErr = true; break}
                  closeDocument ()
                  break;
                case 3:
                  fol = Boolean (settings.keepStruct) ? rebuildPath(pth, settings.lastSavePath) : Folder (settings.lastSavePath)
                  if (!fol.exists) {alert (strErrFolder); settings.globalErr = true; break}
              //    alert ("сохранить в папку\n " + fol + "\n" +fileName )
                  try {saveAs (fileName, fol)} catch (e) {alert (strErrSave); settings.globalErr = true; break}
                  closeDocument ()
                  break;
              }
            } else {alert(strErrBatchMode);settings.globalErr = true; break} // если последнее действие деактивировано и мы попали сюда вместо override
            
            if (settings.globalErr) {break;}

            settings.doneCounter = -1
        //    alert ("как я тут оказался?!, но вызываю повторно doBatch ()")
            doBatch ()
            break;
          }
        } else {settings.globalErr = true; break;}
    } while (true)

    if (settings.globalErr) {/*alert("В процессе выполнения операции возникла ошибка!\nзапускаем окно для принятия решения");*/ putScriptSettings(settings); main (arguments)}

  } else {settings.doneCounter = -3} // ручной запуск
  
  // записать в настройки результат выполнения экшенов
  if (settings.fileList == "" && settings.doneCounter == -1) {delEvt()/*; alert("обработка закончена, удаляем ивенты")*/}
  putScriptSettings (settings)
  
  } 
}

function openFile (files)
{
    var counter = 0
    var len = files.length

    for (var i=0; i<len; i++)
    {
        var cur = File(files.shift())
        var s = getFileName(cur)
        var total = settings.total
        var current = total -(files.length+1) +1
        app.updateProgress(current, total)
        app.changeProgressText(current + '\\' + total + ": " + s) 

        try 
        {
            if (settings.doACR && isFileOneOfThese(cur,ArrayOfRawExtensions)) 
            {
                openCameraRaw (cur, settings.doACR)
            } else 
            {
                app.open (cur)
            } 
            break;
        } catch (e) {counter ++}

        if (counter>=2) 
        {
            var len = files.length
            for (var i=0; i<len; i++) {var tmp = files.shift()}
            settings.lastDocId = 0
            settings.fileCounter = 0
            settings.fileList = ""
            break;
        }
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
        try {return executeActionGet(ref).getInteger(gDocumentID)} catch (e) {return 0}
}

function getDocumentID ()
{
    var ref = new ActionReference()
    ref.putProperty(gProperty, gNumberOfDocuments)
    ref.putEnumerated(gApplication, gOrdinal, gTargetEnum)
    var len = executeActionGet(ref).getInteger(gNumberOfDocuments)

    for (var i = 1; i <= len; i++) {
        var ref = new ActionReference()
        ref.putProperty(gProperty, gDocumentID)
        ref.putIndex(gDocument, i)
       
        if (executeActionGet(ref).getInteger(gDocumentID) == settings.lastDocId) return true;
    }

    return false
}

function findAllFiles(srcFolderStr, destArray, useSubfolders) 
{    
	var fileFolderArray = Folder( srcFolderStr ).getFiles();
    for ( var i = 0; i < fileFolderArray.length; i++ ) 
    {
        if (destArray.length >= maxNumberOfFiles) {err = true; return}
            
            var fileFoldObj = fileFolderArray[i];
		if ( fileFoldObj instanceof File ) {
			if (!fileFoldObj.hidden) destArray.push( fileFoldObj );
		} else { // folder
			if (useSubfolders) findAllFiles( fileFoldObj.toString(), destArray, useSubfolders);
		}
	}
	return destArray;
}

function isFileOneOfThese (fileName, arrayOfExtensions, shortcutArray)
{
    var tmp = fileName.fsName.toUpperCase ()
    var lastDot = tmp.lastIndexOf( "." )
    if (lastDot == -1) return false

    var extension = tmp.substr(lastDot + 1, tmp.length - lastDot);

    if (shortcutArray instanceof Array)
    {
        for (var i=0; i<shortcutArray.length; i++)
        {
            if (extension == shortcutArray[i])
            {
                return true
            }
        }
    } else {shortcutArray = []}

    for (var i=0; i<arrayOfExtensions.length; i++)
    {
        if (extension == arrayOfExtensions[i])
        {
            shortcutArray.push (extension)
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
                default: $.writeln (typeof(v)); break;
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
  s.doACR = true
  s.fileList = ""
  s.fileCounter = 0
  s.total = 0
  s.lastDocId = 0
  s.lastFileType = ""

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
  var fle = Boolean (settings.replaceFile) ? File( inFileName + ".jpg" ) : CreateUniqueFileName (inFileName, ".jpg")
	app.activeDocument.saveAs (fle, jpegOptions, true );
}

function saveAsPSD( inFileName) {
  var psdSaveOptions = new PhotoshopSaveOptions();
  var fle = Boolean (settings.replaceFile) ? File( inFileName + ".psd" ) : CreateUniqueFileName (inFileName, ".psd")
	app.activeDocument.saveAs(fle, psdSaveOptions, true);
}

function saveAsTIFF( inFileName) {
	var tiffSaveOptions = new TiffSaveOptions();
  tiffSaveOptions.imageCompression = TIFFEncoding.NONE;
  var fle = Boolean (settings.replaceFile) ? File( inFileName + ".tif" ) : CreateUniqueFileName (inFileName, ".tif")
	app.activeDocument.saveAs(fle, tiffSaveOptions,true);
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
  if (settings.allowContinue) 
  {
    try
    {
      var idx
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

function getActionsList() //
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

function shortenPath (s)
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

function getFileName (s)
{
    s = File(s).fsName
    if (s.indexOf('\\')!=-1) {s=s.split('\\')} else {s=s.split('//');}

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

function rebuildPath (from, to)
{
  to = Folder (to)
  if (Boolean(settings.keepStruct) && from != null)
  {
    if (from.toString().indexOf(Folder(settings.lastPath).toString())!=1)
    {
       to = new Folder(to + from.toString().replace(Folder (settings.lastPath).toString(),""))
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
    
    app.eraseCustomOptions("advancedBatch")

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
    return output
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

function createBridgeMenu ()
{
var header = "/*//////////////////////////////////////////////////////////////////////////////\
Advanced batch startup script - revision 0.1\
jazz-y@ya.ru\
\
put this script to\
windows: <Program Files folder>->Common Files->Adobe->Startup Scripts CC->Adobe Photoshop\
macOs: <Bridge folder>->Scripts->Startup Scripts\
//////////////////////////////////////////////////////////////////////////////*/\n"

if ( $.os.search(/windows/i) != -1 )
{
  try {
  var pth = new Folder ($.getenv ("COMMONPROGRAMFILES") + "/Adobe/Startup Scripts CC/Adobe Photoshop/")
  if (!pth.exists) pth.create ()
  var f = new File (pth + "/Advanced batch for Bridge.jsx")
  if (!f.exists) 
  {
    if (f.open( "w", "TEXT", "????" )){
    f.write(header + "\n#target bridge\nstartupScript()\n" + startupScript.toString())
    f.close()}
  }} catch (e) {}
} 

function startupScript() {
  strFromBridge = { ru: "получить файлы из Bridge", en: "get files form Bridge" }
  strErrPs = { ru: "Обработка остановлена! Скрипт не смог инициализировать запуск Adobe Photoshop", en: "Processing stopped! The script could not initialize the launch of Adobe Photoshop" }
  strErrScript = { ru: "Не удалось найти установленный экземпляр Advanced batch!\nЗайдите в настройки Bridge, чтобы удалить этот пункт меню", en: "Could not find the installed instance of Advanced batch!\nGo to Bridge settings to remove this menu item" }
  $.localize = true

  if (BridgeTalk.appName == "bridge") { advancedBatch = new MenuElement("command", "Advanced batch: " + strFromBridge, "at the end of Tools"); }

  advancedBatch.onSelect = function () {
    BridgeTalk.launch('photoshop');

    if (BridgeTalk.isRunning('photoshop')) {
      var bt = new BridgeTalk()
      bt.target = "photoshop"
      bt.body = "" + runAdvancedBatch.toString() + "; runAdvancedBatch();"
      bt.onError = function (err) { alert("Error!\n" + err.body) }
      bt.send()
    } else { alert(strErrPs) }

    function runAdvancedBatch() {
      try {
        var desc = new ActionDescriptor()
        desc.putBoolean(stringIDToTypeID("fromBridge"), true)
        executeAction(stringIDToTypeID("f016f8c5-4f04-4740-a463-9f519f2483e0"), desc, DialogModes.NO)
      } catch (e) { alert(strErrScript) }
    }
  }
}
}

function getFilesFromBridge(){var files=[app.document.presentationPath];var len=app.document.selections.length;
  if(len==0){files.push(app.document.presentationPath)}{for (var i=0; i<len; i++){files.push(app.document.selections[i].path)}}return files.toSource()}