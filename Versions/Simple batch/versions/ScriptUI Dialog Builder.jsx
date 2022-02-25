/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":13,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"w","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Simple batch","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-1":{"id":1,"type":"Checkbox","parentId":6,"style":{"enabled":true,"varName":"chAcr","text":"открывать RAW в ACR","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-2":{"id":2,"type":"Checkbox","parentId":6,"style":{"enabled":true,"varName":"chSubfld","text":"обрабатывать подкаталоги","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-3":{"id":3,"type":"Button","parentId":4,"style":{"enabled":true,"varName":"bnBrowse","text":"Обзор","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Group","parentId":6,"style":{"enabled":true,"varName":"grFld","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-5":{"id":5,"type":"DropDownList","parentId":4,"style":{"enabled":true,"varName":"dl","text":"DropDownList","listItems":"открыть папку, использовать папку активного документа","preferredSize":[0,0],"alignment":null,"selection":1,"helpTip":null}},"item-6":{"id":6,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"pn","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Источник:","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-7":{"id":7,"type":"StaticText","parentId":6,"style":{"enabled":true,"varName":"st","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"количество файлов: ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"Button","parentId":11,"style":{"enabled":true,"varName":"ok","text":"Начать обработку","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-11":{"id":11,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"grBn","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-12":{"id":12,"type":"Button","parentId":11,"style":{"enabled":true,"varName":"cancel","text":"Отмена","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":"chProgress","text":"показывать прогресс-бар при открытии файлов","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,6,4,5,3,2,1,7,13,11,10,12],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":false,"functionWrapper":false,"itemReferenceList":"var"}}
*/ 

// W
// =
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
    dl.selection = 1; 

var bnBrowse = grFld.add("button", undefined, undefined, {name: "bnBrowse"}); 
    bnBrowse.text = "Обзор"; 

// PN
// ==
var chSubfld = pn.add("checkbox", undefined, undefined, {name: "chSubfld"}); 
    chSubfld.text = "обрабатывать подкаталоги"; 

var chAcr = pn.add("checkbox", undefined, undefined, {name: "chAcr"}); 
    chAcr.text = "открывать RAW в ACR"; 

var st = pn.add("statictext", undefined, undefined, {name: "st"}); 
    st.text = "количество файлов: "; 

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

// ITEM REFERENCE LIST ( Info: http://jongware.mit.edu/Sui/index_1.html ) 
w // dialog 
pn // panel 
grFld // group 
dl // dropdownlist 
bnBrowse // button 
chSubfld // checkbox 
chAcr // checkbox 
st // statictext 
chProgress // checkbox 
grBn // group 
ok // button 
cancel // button 

