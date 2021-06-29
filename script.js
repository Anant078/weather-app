 // node js file
 const http = require("http");
 const fs = require ("fs") ;
 var requests= require("requests");

 // to read html file 
 const indexfile = fs.readFileSync ("index.html" , "utf-8");

 const replaceVal = (tempVal , orgVal) => {
       
     let temperature = tempVal.replace("{%tempval%}" , orgVal.main.temp);
     temperature = temperature.replace("{%tempmin%}" , orgVal.main.temp_min);
     temperature = temperature.replace("{%tempmax%}" , orgVal.main.temp_max);
     temperature = temperature.replace("{%location%}" , orgVal.name);
     temperature = temperature.replace("{%country%}" , orgVal.sys.country);
     return temperature;
 }
 // create server 
 const server = http.createServer((req, res) => {
      if(req.url=="/")
      {
        requests('http://api.openweathermap.org/data/2.5/weather?q=Gorakhpur&appid=0b61935acdc552d46b2edf05a5899cd6',)
    .on('data',  (chunk) => {
        // we get the data from real time api and convert that data into json format 
    const ondata = JSON.parse(chunk);
    const arrData = [ondata];
    const realTimedata = arrData.map((val) => replaceVal(indexfile,val)).join(" ");
         res.write(realTimedata)
         console.log(realTimedata);
    })

.on('end', function (err) {
  if (err) 
  return console.log('connection closed due to errors', err);
 
 res.end();
  //console.log('end');
});
}     
 });
  server.listen(8000,"127.0.0.1");
 
 