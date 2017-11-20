var packager = require('electron-packager'),
 	path = require('path');

console.log(path.join(__dirname,'../','dist'))

var options={
	out:"packager",
	overwrite:true,
	dir: path.join(__dirname,'../','dist')
}

packager(options, function done_callback (err, appPaths) { 
	console.log(appPaths)
	if(err){
		console.log('had error',err)
	}

 })