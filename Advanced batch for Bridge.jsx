/*//////////////////////////////////////////////////////////////////////////////
Advanced batch startup script - revision 0.2
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
  var bridgeSelection = getBridgeSelectionSnapshot(),
    bt = new BridgeTalk()
  bt.target = "photoshop"
  bt.body = "" + runAdvancedBatch.toString() + "; runAdvancedBatch(" + bridgeSelection.toSource() + ");"
  bt.onError = function (err) { alert("Error!\n" + err.body) }
  bt.send()

  function getBridgeSelectionSnapshot() {
    var result = { version: 2, presentationPath: app.document.presentationPath, items: [] },
      selections = app.document.selections,
      len = selections.length;
    if (len == 0) {
      var current = bridgeItemFromThumbnail(app.document.thumbnail)
      if (current != null) result.items.push(current)
    } else {
      for (var i = 0; i < len; i++) {
        var item = bridgeItemFromThumbnail(selections[i])
        if (item != null) result.items.push(item)
      }
    }
    return result
    function bridgeItemFromThumbnail(thumbnail) {
      if (thumbnail == null) return null
      var bridgeType = "other",
        aliasType = "",
        path = "",
        spec;
      try { bridgeType = thumbnail.type } catch (e) { }
      if (bridgeType == "alias") {
        try { aliasType = thumbnail.aliasType } catch (e) { }
      }
      try { spec = thumbnail.spec } catch (e) { }
      if (spec != undefined) {
        try { path = spec.fsName } catch (e) { }
      }
      if (path == "") {
        try { path = thumbnail.path } catch (e) { }
      }
      if (path == "") return null
      return { path: path, type: bridgeType, aliasType: aliasType }
    }
  }

  function runAdvancedBatch(bridgeSelection) {
    try {
      var desc = new ActionDescriptor()
      desc.putBoolean(stringIDToTypeID("fromBridge"), true)
      if (bridgeSelection != null) desc.putString(stringIDToTypeID("bridgeSelection"), bridgeSelection.toSource())
      executeAction(stringIDToTypeID("3338481a-9241-4c33-956e-4088f660e936"), desc, DialogModes.NO)
    } catch (e) { alert("Could not find and run instance of Advanced batch!") }
  }
}
