function s2t(s) { return stringIDToTypeID(s) }
function t2s(s) { return typeIDToStringID(s) }

try{
var d = new ActionDescriptor();
d.putObject( s2t("object"), s2t("object"), arguments[0]);
var jsonDesc = executeAction( s2t("convertJSONdescriptor"),d, DialogModes.NO );

$.writeln(jsonDesc.getString(s2t("json")))} catch (e) {alert (e)}

  var desc = arguments[0];
    var event = arguments[1];
  /* alert(t2s(event));//"AddT", "SbtF"
    alert(desc.count);
     for(i=0;i<desc.count;i++){
     alert(t2s(desc.getKey(i)) + " " + i);
    }*/

alert(desc.getInteger(s2t("documentID")))