const f1Api = require('f1-api-node') 

// let express = require('express');
// let xmlparser = require('express-xml-bodyparser');

// let app = express();
// app.use(xmlparser());
const http = require('http');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });



const myFunction = async () => {
  let req = http.get("http://ergast.com/api/f1/2023/7/results", function(res) {
    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });
    res.on('end', function(){
        parser.parseString(data, function(error, result) {
            if(error === null) {
                const data = result.MRData.RaceTable[0].Race[0];
                const { RaceName, Circuit, ATTR, ResultsList, Date, Time } = data
            }
            else {
                console.log(error);
            }
        });
    });
  });
}

myFunction()
