var pref = new BatchOptions
pref.destination = BatchDestinationType.FOLDER
pref.destinationFolder = Folder ( "e:/_Output")
pref.overrideSave = true
pref.fileNaming = [FileNamingType.DOCUMENTNAMEMIXED,FileNamingType.EXTENSIONLOWER]
//pref.macintoshCompatible = false
pref.unixCompatible  =false

app.batch ([File(app.activeDocument.fullName)], "Закрыть", "Ретушь", pref)
    