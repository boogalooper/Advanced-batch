/*//////////////////////////////////////////////////////////////////////////////
Advanced batch startup script - revision 0.1
jazz-y@ya.ru

put this script to:
windows: <Program Files folder>->Common Files->Adobe->Startup Scripts CC->Adobe Photoshop
macOs: <Bridge folder>->Scripts->Startup Scripts
//////////////////////////////////////////////////////////////////////////////*/

#target bridge

strFromBridge = { ru: "получить файлы из Bridge", en: "get files form Bridge" }
$.localize = true

if (BridgeTalk.appName == "bridge") {
  advancedBatchToolMenu = new MenuElement("command", "Advanced batch: " + strFromBridge, "at the end of Tools", "advancedBatchToolMenu")
  advancedBatchThumbnailMenu = new MenuElement("command", "Advanced batch: " + strFromBridge, "at the end of Thumbnail", "advancedBatchThumbnailMenu")
}

advancedBatchToolMenu.onSelect = function () { advancedBatchThumbnailMenu.onSelect() }
advancedBatchThumbnailMenu.onSelect = function () {
  BridgeTalk.launch('photoshop')

  if (BridgeTalk.isRunning('photoshop')) {
    var bt = new BridgeTalk()
    bt.target = "photoshop"
    bt.body = "" + runAdvancedBatch.toString() + "; runAdvancedBatch();"
    bt.onError = function (err) { alert("Error!\n" + err.body) }
    bt.send()
  } else { alert("Processing stopped! The script could not initialize the launch of Adobe Photoshop") }

  function runAdvancedBatch() {
    try {
      var desc = new ActionDescriptor()
      desc.putBoolean(stringIDToTypeID("fromBridge"), true)
      executeAction(stringIDToTypeID("3338481a-9241-4c33-956e-4088f660e936"), desc, DialogModes.NO)
    } catch (e) { alert("Could not find and run instance of Advanced batch!") }
  }
}
