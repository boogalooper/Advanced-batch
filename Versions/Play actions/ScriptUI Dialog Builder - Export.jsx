var w = (function () {

  /*
  Code for Import https://scriptui.joonas.me — (Triple click to select): 
  {"activeId":12,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"w","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Simple batch: play actions","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-10":{"id":10,"type":"Button","parentId":11,"style":{"enabled":true,"varName":"ok","text":"Начать обработку","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-11":{"id":11,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"grBn","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-12":{"id":12,"type":"Button","parentId":11,"style":{"enabled":true,"varName":"cancel","text":"Отмена","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"pnAtn","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Операции:","preferredSize":[0,150],"margins":[20,10,10,10],"orientation":"column","spacing":0,"alignChildren":["left","top"],"alignment":null}},"item-14":{"id":14,"type":"Group","parentId":15,"style":{"enabled":true,"varName":"grBn","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-15":{"id":15,"type":"Group","parentId":59,"style":{"enabled":true,"varName":"grLine","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-16":{"id":16,"type":"Button","parentId":14,"style":{"enabled":true,"varName":"bnAdd","text":"+","justify":"center","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"Button","parentId":14,"style":{"enabled":true,"varName":"dnDel","text":"-","justify":"center","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-19":{"id":19,"type":"DropDownList","parentId":24,"style":{"enabled":true,"varName":"dlSet","text":"DropDownList","listItems":"testSet","preferredSize":[150,0],"alignment":null,"selection":0,"helpTip":null}},"item-20":{"id":20,"type":"DropDownList","parentId":24,"style":{"enabled":true,"varName":"dlAtn","text":"DropDownList","listItems":"TestAction 1","preferredSize":[150,0],"alignment":null,"selection":0,"helpTip":null}},"item-21":{"id":21,"type":"Checkbox","parentId":24,"style":{"enabled":true,"varName":"chStop","text":"стоп","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-22":{"id":22,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":"chContinue","text":"продолжать с места остановки внутри операции","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-23":{"id":23,"type":"Checkbox","parentId":24,"style":{"enabled":true,"varName":"chActive","text":"включить","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-24":{"id":24,"type":"Group","parentId":15,"style":{"enabled":true,"varName":"grOpt","preferredSize":[0,0],"margins":[0,0,0,5],"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-25":{"id":25,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":"chOnOpen","text":"автоматически запускать первую операцию при открытии документа","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-26":{"id":26,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"pnSave","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"После выполнения всех операций:","preferredSize":[0,0],"margins":[20,10,10,10],"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-27":{"id":27,"type":"DropDownList","parentId":29,"style":{"enabled":true,"varName":"dlSave","text":"DropDownList","listItems":"не сохранять,сохранить и закрыть,сохранить в папку","preferredSize":[165,0],"alignment":null,"selection":2,"helpTip":null}},"item-28":{"id":28,"type":"Button","parentId":29,"style":{"enabled":true,"varName":"bnFolder","text":"Обзор...","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-29":{"id":29,"type":"Group","parentId":26,"style":{"enabled":true,"varName":"grFolder","preferredSize":[0,0],"margins":[0,0,0,0],"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-30":{"id":30,"type":"Checkbox","parentId":26,"style":{"enabled":true,"varName":"chBatchMode","text":"переопределить команды \\\"сохранить как\\\" для  последней операции","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-31":{"id":31,"type":"StaticText","parentId":29,"style":{"enabled":true,"varName":"stPath","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"e:\\\\Output","justify":"left","preferredSize":[250,0],"alignment":null,"helpTip":null}},"item-32":{"id":32,"type":"Group","parentId":26,"style":{"enabled":true,"varName":"grSaveOptions","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-34":{"id":34,"type":"StaticText","parentId":32,"style":{"enabled":true,"varName":"stFormat","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"формат файла","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-35":{"id":35,"type":"Group","parentId":32,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-36":{"id":36,"type":"Slider","parentId":35,"style":{"enabled":true,"varName":"slJpg","preferredSize":[150,0],"alignment":null,"helpTip":null}},"item-37":{"id":37,"type":"StaticText","parentId":35,"style":{"enabled":true,"varName":"stJpg","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"12","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-39":{"id":39,"type":"Checkbox","parentId":32,"style":{"enabled":true,"varName":"chFlatten","text":"объединять слои","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-58":{"id":58,"type":"DropDownList","parentId":32,"style":{"enabled":true,"varName":"dlFormat","text":"DropDownList","listItems":"jpg,tif,psd","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-59":{"id":59,"type":"Group","parentId":13,"style":{"enabled":true,"varName":"grAtn","preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}}},"order":[0,13,59,15,14,16,17,24,23,19,20,21,25,22,26,29,27,28,31,32,34,58,39,35,36,37,30,11,10,12],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"itemReferenceList":"var"}}
  */ 

  // W
  // =
  var w = new Window("dialog"); 
      w.text = "Simple batch: play actions"; 
      w.orientation = "column"; 
      w.alignChildren = ["fill","top"]; 
      w.spacing = 10; 
      w.margins = 16; 

  // PNATN
  // =====
  var pnAtn = w.add("panel", undefined, undefined, {name: "pnAtn"}); 
      pnAtn.text = "Операции:"; 
      pnAtn.preferredSize.height = 150; 
      pnAtn.orientation = "column"; 
      pnAtn.alignChildren = ["left","top"]; 
      pnAtn.spacing = 0; 
      pnAtn.margins = [10,20,10,10]; 

  // GRATN
  // =====
  var grAtn = pnAtn.add("group", undefined, {name: "grAtn"}); 
      grAtn.orientation = "column"; 
      grAtn.alignChildren = ["left","center"]; 
      grAtn.spacing = 10; 
      grAtn.margins = 0; 

  // GRLINE
  // ======
  var grLine = grAtn.add("group", undefined, {name: "grLine"}); 
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

  var dnDel = grBn.add("button", undefined, undefined, {name: "dnDel"}); 
      dnDel.text = "-"; 
      dnDel.preferredSize.width = 30; 

  // GROPT
  // =====
  var grOpt = grLine.add("group", undefined, {name: "grOpt"}); 
      grOpt.orientation = "row"; 
      grOpt.alignChildren = ["left","center"]; 
      grOpt.spacing = 10; 
      grOpt.margins = [5,0,0,0]; 

  var chActive = grOpt.add("checkbox", undefined, undefined, {name: "chActive"}); 
      chActive.text = "включить"; 

  var dlSet_array = ["testSet"]; 
  var dlSet = grOpt.add("dropdownlist", undefined, undefined, {name: "dlSet", items: dlSet_array}); 
      dlSet.selection = 0; 
      dlSet.preferredSize.width = 150; 

  var dlAtn_array = ["TestAction 1"]; 
  var dlAtn = grOpt.add("dropdownlist", undefined, undefined, {name: "dlAtn", items: dlAtn_array}); 
      dlAtn.selection = 0; 
      dlAtn.preferredSize.width = 150; 

  var chStop = grOpt.add("checkbox", undefined, undefined, {name: "chStop"}); 
      chStop.text = "стоп"; 

  // W
  // =
  var chOnOpen = w.add("checkbox", undefined, undefined, {name: "chOnOpen"}); 
      chOnOpen.text = "автоматически запускать первую операцию при открытии документа"; 
      chOnOpen.value = true; 

  var chContinue = w.add("checkbox", undefined, undefined, {name: "chContinue"}); 
      chContinue.text = "продолжать с места остановки внутри операции"; 
      chContinue.value = true; 

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
      dlSave.selection = 2; 
      dlSave.preferredSize.width = 165; 

  var bnFolder = grFolder.add("button", undefined, undefined, {name: "bnFolder"}); 
      bnFolder.text = "Обзор..."; 

  var stPath = grFolder.add("statictext", undefined, undefined, {name: "stPath"}); 
      stPath.text = "e:\\Output"; 
      stPath.preferredSize.width = 250; 

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
      dlFormat.selection = 0; 

  var chFlatten = grSaveOptions.add("checkbox", undefined, undefined, {name: "chFlatten"}); 
      chFlatten.text = "объединять слои"; 

  // GROUP1
  // ======
  var group1 = grSaveOptions.add("group", undefined, {name: "group1"}); 
      group1.orientation = "row"; 
      group1.alignChildren = ["left","center"]; 
      group1.spacing = 10; 
      group1.margins = 0; 

  var slJpg = group1.add("slider", undefined, undefined, undefined, undefined, {name: "slJpg"}); 
      slJpg.minvalue = 0; 
      slJpg.maxvalue = 100; 
      slJpg.value = 50; 

  var stJpg = group1.add("statictext", undefined, undefined, {name: "stJpg"}); 
      stJpg.text = "12"; 

  // PNSAVE
  // ======
  var chBatchMode = pnSave.add("checkbox", undefined, undefined, {name: "chBatchMode"}); 
      chBatchMode.text = "переопределить команды \"сохранить как\" для  последней операции"; 
      chBatchMode.value = true; 

  // GRBN1
  // =====
  var grBn1 = w.add("group", undefined, {name: "grBn1"}); 
      grBn1.orientation = "row"; 
      grBn1.alignChildren = ["center","center"]; 
      grBn1.spacing = 10; 
      grBn1.margins = 0; 

  var ok = grBn1.add("button", undefined, undefined, {name: "ok"}); 
      ok.text = "Начать обработку"; 

  var cancel = grBn1.add("button", undefined, undefined, {name: "cancel"}); 
      cancel.text = "Отмена"; 

  // ITEM REFERENCE LIST ( Info: http://jongware.mit.edu/Sui/index_1.html ) 
  w // dialog 
  pnAtn // panel 
  grAtn // group 
  grLine // group 
  grBn // group 
  bnAdd // button 
  dnDel // button 
  grOpt // group 
  chActive // checkbox 
  dlSet // dropdownlist 
  dlAtn // dropdownlist 
  chStop // checkbox 
  chOnOpen // checkbox 
  chContinue // checkbox 
  pnSave // panel 
  grFolder // group 
  dlSave // dropdownlist 
  bnFolder // button 
  stPath // statictext 
  grSaveOptions // group 
  stFormat // statictext 
  dlFormat // dropdownlist 
  chFlatten // checkbox 
  slJpg // slider 
  stJpg // statictext 
  chBatchMode // checkbox 
  grBn1 // group 
  ok // button 
  cancel // button 

  w.show();

  return w;

}());