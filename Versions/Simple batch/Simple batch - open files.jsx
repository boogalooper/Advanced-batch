///////////////////////////////////////////////////////////////////////////////
// Simple batch: open files - revision 0.3
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

strMessage = "Simple batch: open files"
strSource={ru: "Источник:", en: "Source:"}
strOpenFldr={ru: "открыть папку...", en: "open folder..."}
strActiveDocFldr={ru: "использовать папку активного документа", en: "get folder of active document"}
strFromBridge={ru: "получить файлы из Bridge", en: "get files form Bridge"}
strBrowse={ru: "Обзор...", en: "Browse..."}
strSubfolders={ru: "обрабатывать подкаталоги", en: "include all subfolders"}
strAcr={ru: "открывать RAW в ACR", en: "open RAW in ACR"}
strExt={ru: "открывать следующие типы файлов: ", en: "open following file types: "}
strCounter={ru: "количество файлов: ", en: "number of files: "}
strAllFiles={ru: "все файлы", en: "all files"}
strProgress={ru: "показывать прогресс-бар при открытии файлов", en: "show progress-bar while opening files"}
strOpen={ru: "Начать обработку", en: "Start processing"}
strCancel={ru: "Отмена", en: "Cancel"}
strBridgeList = {ru: "список файлов из Bridge", en: "Bridge file list"}
strStop={ru: "Превать обработку", en: "Stop processing"}
strErrBridge={ru: "Невозможно установить соединение с Bridge!", en: "Unable connect to Bridge!"}
strErrCounter={ru: "Выбрано слишком много файлов!", en: "Too many files selected!"}
strErrActive={ru: "Не найдена папка активного документа!", en: "Folder of active document not found!"}

var maxNumberOfFiles = 1000 // ограничение на максимальное количество файлов в каталоге/подкаталогах
$.localize = true 
//$.locale = "ru" 

gDocument = s2t("document")
gOrdinal = s2t("ordinal")
gProperty = s2t("property")
gFileReference = s2t("fileReference")
gTargetEnum = s2t("targetEnum")
gDocumentID= s2t("documentID")
gNumberOfDocuments = s2t("numberOfDocuments")
gApplication = s2t("application")
gNotify = s2t("notify")
gMessage = s2t("message")
gNull= s2t("null")
gOverrideOpen = s2t("overrideOpen")
gOpen = s2t("open")

GUID="fa20502a-984b-4fbd-ad9b-aba9f5c38f61"
var ArrayOfFileExtensions = ["PSD","PDD","PSDT","PSB","BMP","RLE","DIB","GIF","EPS","IFF","TDI","JPG","JPEG","JPE","JPF","JPX","JP2","J2C",
"J2K","JPC","JPS","MPO","PCX","PDF","PDP","RAW","PXR","PNG","SCT","TGA","VDA","ICB","VST","TIF","TIFF","PBM","PGM","PPM","PNM","PFM","PAM",
"DCM","DC3","DIC","TIF","CRW","NEF","RAF","ORF","MRW","DCR","MOS","SRF","PEF","DCR","CR2","DNG","ERF","X3F","RAW"]
var ArrayOfRawExtensions = ["TIF", "CRW", "NEF", "RAF", "ORF", "MRW", "DCR", "MOS", "SRF", "PEF", "DCR", "CR2", "DNG", "ERF", "X3F", "RAW"]

var err = false
var isCancelled = false
var isEvent = true
var allFiles = []

// заполняем настройки данными по-умолчанию
var settings = new Object
initExportInfo (settings)


// пробуем передать аргументы запуска скрипта в main
try {if (arguments.length ==0) isEvent = false} catch (e) {isEvent = false}
if (isEvent) {main(arguments)} else {main()}

// не записывать скрипт в панели эшкенов, если была нажата кнопка "отмена"
isCancelled ? 'cancel' : undefined


// обработка событиый при запуске скрипта
function main (arguments)
{   
// обычный запуск
    if (!isEvent)
    {
       getScriptSettings (settings)

       // в случае, если нет уже установленных слушателей событий
       if (!chkEvt())
       {
            var w = buildWindow (false); var result = w.show ()

            if (result!=2)
            {
                if (settings.sourceMode == 1)
                {
                    var tmp = settings.fileList.split ('\n')
                    var cur = getActiveDocPath ()
                    var output = []
                    
                    if (tmp.length > 0 && cur != null)
                    {
                        for (var i=0; i<tmp.length;i++)
                        {
                            if (tmp[i] == cur) {continue;} else {output.push(tmp[i])}
                        }                   
                    }

                    settings.total = output.length + 1
                } else
                {
                    var output = settings.fileList.split ('\n')
                    settings.total = output.length

                    if (output.length > 0)
                    {
                        if (getProgressBarSettings()) 
                        {
                            app.doForcedProgress ("","openFile(output)")
                        } else 
                        {
                            openFile (output)
                        }
                    } 
                }

                // после построения списка файлов
                if (output.length>0)
                {
                    settings.lastDocId = getActiveDocID()
                    settings.fileCounter = settings.total-output.length
                    settings.fileList = output.join('\n')
                
                    if (chkEvt()) delEvt()
                    addEvt ()
                }
                
            putScriptSettings(settings)
            } else {isCancelled = true}
        } else
        {
            // если есть связанные со скриптом слушатели событий
            var w = buildWindow (true); var result = w.show ()

            if (result!=2)
            {
                settings.lastDocId = 0
                settings.fileCounter = 0
                settings.fileList = ""

                delEvt()

                putScriptSettings(settings)

                // перезапуск скрипта
                main ()
            } else {isCancelled = true}
        }
    } else
    {
        //если запуск инициализирован событием в фотошопе
        var event = arguments[1]
   
        if (event == gNotify)
        {
            delEvt ()

            settings.lastDocId = 0
            settings.fileCounter = 0
            settings.fileList = ""
        } else
        {
            getScriptSettings (settings)
            
            // если на экране уже нет ранее запомненного документа
            if (!getDocumentID())
            {
                var output = settings.fileList.split ('\n')
            
                if (output.length > 0)
                {
                    if (getProgressBarSettings ()) 
                    {
                        app.doForcedProgress ("","openFile(output)")
                    } else 
                    {
                        openFile (output)
                    }
                } 

                // после открытия документа
                if (output.length>0)
                {
                    settings.fileCounter = settings.total - output.length
                    settings.lastDocId = getActiveDocID()
                    settings.fileList = output.join('\n')
                } else
                {
                    settings.lastDocId = 0
                    settings.fileCounter = 0
                    settings.fileList = ""

                    delEvt ()
                }
                putScriptSettings (settings)
            }
        }
    }
}

// форма главного окна
function buildWindow (fromEvent)
{
// W
// =
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
  //  dl.selection = 0; 

var bnBrowse = grFld.add("button", undefined, undefined, {name: "bnBrowse"}); 
    bnBrowse.text = strBrowse; 
    
// PN
// ==
var stPath = pn.add("statictext", undefined, undefined, {name: "stPath"}); 
    stPath.text = "0000000000000000000000000000000000000000000000000000"; 

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
var chProgress = w.add("checkbox", undefined, undefined, {name: "chProgress"}); 
    chProgress.text = strProgress; 

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
}

dlTypes.onChange = function ()
{
    settings.lastFileType = this.selection.text
    enumFiles (Folder(settings.lastPath), this.selection.text)
}


chSubfld.onClick = function () {settings.doSubfolders = this.value; doNotUpdate = true; getFiles();doNotUpdate = false}
chAcr.onClick = function () {settings.doACR = this.value}
chProgress.onClick = function () {putProgressBarSettings (this.value)}

    w.onShow = function ()
    {
        if (!fromEvent)
        {
            doNotUpdate = true

            settings.sourceMode = settings.sourceMode == 1 && getActiveDocPath()==null ? 0 : settings.sourceMode 
            settings.sourceMode = !BridgeTalk.isRunning('bridge') && settings.sourceMode == 2 ? 0 : settings.sourceMode 

            dl.selection = settings.sourceMode
            chSubfld.value = settings.doSubfolders
            chAcr.value = settings.doACR
            chProgress.value=getProgressBarSettings ()
            stPath.text = settings.sourceMode == 2 ? strBridgeList : shortenPath(settings.lastPath)
            
           // getFiles()
            doNotUpdate = false

        } else
        {
            doNotUpdate = true
            dl.selection = settings.sourceMode
            chSubfld.value = settings.doSubfolders
            chAcr.value = settings.doACR
            chProgress.value= getProgressBarSettings ()
            stPath.text = shortenPath(settings.lastPath)
            pn.enabled = false
            bnBrowse.enabled = false
            stCounter.text = strCounter + settings.fileCounter + "\\" + settings.total
            ok.text = strStop
        }
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
                stPath.text = settings.lastPath = ""
                stCounter.text = ""
                ok.enabled =false
            }
        }   

        if (result == false) {stPath.text = settings.lastPath = stCounter.text = ""; ok.enabled =false; return false} else {return true}
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

                    for (var i=0; i<userSelectedFolder.length; i++)
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
                    if (isFolder(File(userSelectedFolder[0]))) 
                    {
                        settings.lastPath = File(userSelectedFolder[0]).fsName
                    } else 
                    {
                        var tmp = File(userSelectedFolder[0]).path
                        settings.lastPath = Folder (tmp).fsName
                    }
                } else {settings.lastPath = userSelectedFolder.fsName} 
                
                settings.fileList = filesToDo.join ('\n')
                if (settings.sourceMode != 2) {stPath.text = shortenPath(settings.lastPath)} else {stPath.text = strBridgeList}

                if (filesToDo.length != 0) {stCounter.text = strCounter + filesToDo.length} else {stCounter.text = strCounter + "0"}

                if (settings.sourceMode == 0) {doNotUpdate = true; dl.selection=0; doNotUpdate =false}
                if (filesToDo.length > 0) {ok.enabled = true} else {ok.enabled =false}
                
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

    return w
}

function openFile (files)
{
    var counter = 0
    var len = files.length
    for (var i=0; i<len; i++)
    {
        var cur = File(files.shift())
        if (getProgressBarSettings ()) 
        {
            var s = getFileName(cur)
            var total = settings.total
            var current = total -(files.length+1) +1
            app.updateProgress(current, total)
            app.changeProgressText(current + '\\' + total + ": " + s) 
        } 

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

function initExportInfo (exportInfo) 
{
        exportInfo.sourceMode = 0
        exportInfo.lastPath = ""
        exportInfo.doSubfolders = true
        exportInfo.doACR = true
        exportInfo.fileList = ""
        exportInfo.fileCounter = 0
        exportInfo.total = 0
        exportInfo.lastDocId = 0
        exportInfo.lastFileType = ""
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
function t2s(t) {return typeIDToStringID(t)}

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

function getFilesFromBridge(){var files=[];var len=app.document.selections.length;
if (len==0) {files.push (app.document.presentationPath)}{for (var i=0; i<len; i++){files.push (app.document.selections[i].path);}} return files.toSource()}