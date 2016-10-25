global.alasql=require('../../assets/vendor/alasql.min.v3.2.js');

var data = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a',[data]);
console.log("alasql",res);

// window['xlsx.js']=require('xlsx');
// import XLSX  from 'xlsx';
 // require('../assets/vendor/js-xlsx/dist/xlsx.core.min.js');

// xlsx = require('../assets/vendor/xslx.core.full.min.js');
// xlsx = require('../assets/vendor/xslx.core.min.js');