function c2t(c) { return charIDToTypeID(c) }
app.notifiers.removeAll()
app.notifiersEnabled = true;
var handlerFile = File(File($.fileName).path + '/Welcome.jsx');
app.notifiers.add('Cls ', handlerFile);

var a = app.notifiers[0].reflect.properties

for (var i = 0, len = a.length; i < len; i++) {
try {
$.writeln(a[i].name + ' = ' +  app.notifiers[0][a[i].name]);
} catch (e) {}
}
