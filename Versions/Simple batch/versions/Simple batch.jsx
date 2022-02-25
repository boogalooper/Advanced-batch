#target photoshop

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>Simple batch: open files</name>
<category>jazzy</category>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

GUID="fa20502a-984b-4fbd-ad9b-aba9f5c38f61"
strMessage = "Simple batch: open files"

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
var a =t2s(charIDToTypeID( 'Opn ' ))

var ArrayOfFileExtensions = ["PSD","PDD","PSDT","PSB","BMP","RLE","DIB","GIF","EPS","IFF","TDI","JPG","JPEG","JPE","JPF","JPX","JP2","J2C",
"J2K","JPC","JPS","MPO","PCX","PDF","PDP","RAW","PXR","PNG","SCT","TGA","VDA","ICB","VST","TIF","TIFF","PBM","PGM","PPM","PNM","PFM","PAM",
"DCM","DC3","DIC","TIF","CRW","NEF","RAF","ORF","MRW","DCR","MOS","SRF","PEF","DCR","CR2","DNG","ERF","X3F","RAW"]
var ArrayOfRawExtensions = ["TIF", "CRW", "NEF", "RAF", "ORF", "MRW", "DCR", "MOS", "SRF", "PEF", "DCR", "CR2", "DNG", "ERF", "X3F", "RAW"]

var settings = new Object

initExportInfo (settings)
var err = false

var isCancelled = false
var isEvent = true
var allFiles = []

try {if (arguments.length ==0) isEvent = false} catch (e) {isEvent = false}

if (isEvent) {main(arguments)} else {main()}

isCancelled ? 'cancel' : undefined

function main (arguments)
{   
    if (!isEvent)
    {
       try {var d = app.getCustomOptions(GUID)
       if (d!=undefined) descriptorToObject(settings, d, strMessage)} catch (e) {}

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
                } else
                {
                    var output = settings.fileList.split ('\n')
                    settings.fileCounter = output.length

                    if (output.length > 0)
                    {
                        if (settings.showProgress) 
                        {
                            app.doForcedProgress ("","openFile(output)")
                        } else 
                        {
                            openFile (output)
                        }
                    } 
                }

                if (output.length>0)
                {
                    settings.lastDocId = getActiveDocID()
                    settings.fileCounter = output.length+1
                    settings.fileList = output.join('\n')
                
                    if (chkEvt()) delEvt()
                    addEvt ()
                }
                
            var d = objectToDescriptor(settings, strMessage)
            app.putCustomOptions(GUID, d)

            } else {isCancelled = true}
        } else
        {
            var w = buildWindow (true); var result = w.show ()

            if (result!=2)
            {
                settings.lastDocId = 0
                settings.fileCounter = 0
                settings.fileList = ""

                delEvt()

                var d = objectToDescriptor(settings, strMessage)
                app.putCustomOptions(GUID, d)

                main ()
            } else {isCancelled = true}
    
        }
    } else
    {
        // from event
        var event = arguments[1]
   
        if (event == gNotify)
        {
            delEvt ()

            settings.lastDocId = 0
            settings.fileCounter = 0
            settings.fileList = ""
        } else
        {
            try {var d = app.getCustomOptions(GUID)
            if (d!=undefined) descriptorToObject(settings, d, strMessage)} catch (e) {}
                      
            if (!getDocumentID())
            {
                var output = settings.fileList.split ('\n')

                if (output.length > 0)
                {
                    if (settings.showProgress) 
                    {
                        app.doForcedProgress ("","openFile(output)")
                    } else 
                    {
                        openFile (output)
                    }
                } 

                if (output.length>0)
                {
                    settings.lastDocId = getActiveDocID()
                    settings.fileList = output.join('\n')
                } else
                {
                    settings.lastDocId = 0
                    settings.fileCounter = 0
                    settings.fileList = ""

                    delEvt ()
                }
                var d = objectToDescriptor(settings, strMessage)
                app.putCustomOptions(GUID, d)

                isCancelled = true
            }
        }
    }
}

function buildWindow (fromEvent)
{
// W
// =
var doNotUpdate = false;

var w = new Window("dialog"); 
    w.text = "Simple batch"; 
    w.orientation = "column"; 
    w.alignChildren = ["fill","top"]; 
    w.spacing = 10; 
    w.margins = 16; 

// PN
// ==
var pn = w.add("panel", undefined, undefined, {name: "pn"}); 
    pn.text = "Источник:"; 
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

var dl_array = ["открыть папку","использовать папку активного документа"]; 
var dl = grFld.add("dropdownlist", undefined, undefined, {name: "dl", items: dl_array}); 
    dl.selection = 0; 

var bnBrowse = grFld.add("button", undefined, undefined, {name: "bnBrowse"}); 
    bnBrowse.text = "Обзор"; 

    
// PN
// ==
var stPath = pn.add("statictext", undefined, undefined, {name: "stPath"}); 
    stPath.text = "0000000000000000000000000000000000000000000000000000"; 

var chSubfld = pn.add("checkbox", undefined, undefined, {name: "chSubfld"}); 
    chSubfld.text = "обрабатывать подкаталоги"; 

var chAcr = pn.add("checkbox", undefined, undefined, {name: "chAcr"}); 
    chAcr.text = "открывать RAW в ACR"; 

    // GR
// ==
var gr = pn.add("group", undefined, {name: "gr"}); 
gr.orientation = "row"; 
gr.alignChildren = ["left","fill"]; 
gr.spacing = 10; 
gr.margins = 0; 

var statictext1 = gr.add("statictext", undefined, undefined, {name: "statictext1"}); 
statictext1.text = "открывать следующие типы файлов:"; 

var dlTypes_array = ["все файлы"]; 
var dlTypes = gr.add("dropdownlist", undefined, undefined, {name: "dlTypes", items: dlTypes_array}); 
dlTypes.selection = 0; 

var stCounter = pn.add("statictext", undefined, undefined, {name: "st"}); 
    stCounter.text = "количество файлов: 00000/00000"; 
  

// W
// =
var chProgress = w.add("checkbox", undefined, undefined, {name: "chProgress"}); 
    chProgress.text = "показывать прогресс-бар при открытии файлов"; 

// GRBN
// ====
var grBn = w.add("group", undefined, {name: "grBn"}); 
    grBn.orientation = "row"; 
    grBn.alignChildren = ["center","center"]; 
    grBn.spacing = 10; 
    grBn.margins = 0; 

var ok = grBn.add("button", undefined, undefined, {name: "ok"}); 
    ok.text = "Начать обработку"; 

var cancel = grBn.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = "Отмена"; 


bnBrowse.onClick = function ()
{
    var tmp = settings.sourceMode
    settings.sourceMode = 0
    if (getFiles () == false) settings.sourceMode = tmp
}

dl.onChange = function ()
{
    settings.sourceMode = this.selection.index
    getFiles ()
}

dlTypes.onChange = function ()
{
    settings.lastFileType = this.selection.text
    enumFiles (Folder(settings.lastPath), this.selection.text)
}


chSubfld.onClick = function () {settings.doSubfolders = this.value; doNotUpdate = true; getFiles();doNotUpdate = false}
chAcr.onClick = function () {settings.doACR = this.value}
chProgress.onClick = function () {settings.showProgress = this.value}

    w.onShow = function ()
    {
        if (!fromEvent)
        {
            doNotUpdate = true
            settings.sourceMode = app.documents.length == 0 ? 0 : settings.sourceMode 
            dl.selection = settings.sourceMode
            chSubfld.value = settings.doSubfolders
            chAcr.value = settings.doACR
            chProgress.value=settings.showProgress 
            stPath.text = shortenPath(settings.lastPath)
            if (app.documents.length >0 && settings.sourceMode == 1 || settings.sourceMode == 0) {getFiles();doNotUpdate = false}
        } else
        {
            doNotUpdate = true
            dl.selection = settings.sourceMode
            chSubfld.value = settings.doSubfolders
            chAcr.value = settings.doACR
            chProgress.value=settings.showProgress 
            stPath.text = shortenPath(settings.lastPath)
            pn.enabled = false
            bnBrowse.enabled = false
            var tmp = settings.fileList.split('\n')
            var len = tmp.length
            stCounter.text = "количество файлов: " + (settings.fileCounter-len) + "\\" + settings.fileCounter
            ok.text = "Прервать обработку"
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
        if (!doNotUpdate || settings.sourceMode == 1)
        {
            var userSelectedFolder = getActiveDocPath ()

            if (userSelectedFolder == null) 
            {doNotUpdate = true; dl.selection=0; doNotUpdate =false}
            else
            {userSelectedFolder = Folder (userSelectedFolder.path)}
        }
    }
        if (userSelectedFolder) 
        {
            enumFiles (userSelectedFolder)
        } else 
        {
            var fol = new Folder(settings.lastPath)
            if (fol.exists)
            {
                enumFiles (fol)
            } else {
                stPath.text =  settings.lastPath = ""
                stCounter.text = "количество файлов: 0"
                ok.enabled =false
            }
        }   
}

function enumFiles (userSelectedFolder, filter)
    {
        var readFromFS = !filter ? true : false
        filter = !filter || filter == "все файлы" ? ArrayOfFileExtensions : [filter]
        var shortList = ["все файлы"]

        if (readFromFS)
        {
            allFiles = []
            findAllFiles(userSelectedFolder, allFiles, settings.doSubfolders)
            if (checkErr ()) {return}  
        }       
            var files = allFiles.slice(0)
            var filesToDo = []
            for (var i=0; i<files.length; i++)
            {
                if (files[i] instanceof File) {} else {files[i] = File(files[i])}
                if (isFileOneOfThese (files[i],filter,shortList)) filesToDo.push (files[i].toString())
            }

            settings.lastPath = userSelectedFolder.fsName
            settings.fileList = filesToDo.join ('\n')

            stPath.text = shortenPath(settings.lastPath)
            stCounter.text = "количество файлов: " + filesToDo.length

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
    }

    function checkErr ()
    {
        if (err) 
        {
            err = false
            alert ("Выбрано слишком много файлов! Выберите другую папку!")

            return true
        }
        return false
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
        if (settings.showProgress) 
        {
            var s = getFileName(cur)
            var total = settings.fileCounter
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
    } catch (e) {alert ("Не найдена папка активного документа!"); return null}
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
        if (destArray.length >= 1000) {err = true; return}
            
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

function initExportInfo (exportInfo) 
{
        exportInfo.sourceMode = 0
        exportInfo.lastPath = ""
        exportInfo.doSubfolders = true
        exportInfo.doACR = true
        exportInfo.showProgress = true
        exportInfo.fileList = ""
        exportInfo.fileCounter = 0
        exportInfo.lastDocId = 0
        exportInfo.lastFileType = ""
}

function shortenPath (s)
{
    var win;
    if (s.indexOf('\\')!=-1) {s=s.split('\\'); win = true} else {s=s.split('//'); win = false}

    if (s.length>0)
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
function c2t(c) { return charIDToTypeID(c)}