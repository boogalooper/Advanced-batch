// =======================================================
var desc3 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putIndex( charIDToTypeID( "Actn" ), 1 );
ref1.putIndex( charIDToTypeID( "ASet" ), 1 );
desc3.putReference( stringIDToTypeID( "target" ), ref1 );
try {executeAction( charIDToTypeID( "Ply " ), desc3)} catch (e) {alert (e)}

