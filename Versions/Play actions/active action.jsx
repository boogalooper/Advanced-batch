function s2t(s) {return stringIDToTypeID(s)}
function t2s(t) {return typeIDToStringID(t)}

gClassAction = s2t("action")
gOrdinal = s2t("ordinal")
gTargetEnum = s2t("targetEnum")

var ref = new ActionReference()  
var desc = new ActionDescriptor()  
ref.putEnumerated(gClassAction, gOrdinal, gTargetEnum)   
desc = executeActionGet(ref)

$.writeln ("============================")
for (var i=0; i<desc.count; i++) {$.writeln (t2s(desc.getKey(i) ) + " " + getValues(desc, i) )}


function getValues(desc, keyNum) {
var kTypeID = desc.getKey(keyNum);
switch (desc.getType(kTypeID)) {
case DescValueType.OBJECTTYPE:
return (desc.getObjectValue(kTypeID) + "_" + t2s(desc.getObjectType(kTypeID)));
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