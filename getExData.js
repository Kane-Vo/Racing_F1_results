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
                const circuit = {
                    create: {
                        circuitId: Circuit[0].ATTR.circuitId,
                        url: Circuit[0].ATTR.url,
                        name: Circuit[0].CircuitName[0],
                        round: ATTR.round,
                        locations: {
                            create: {
                                lat: Circuit[0].Location[0].ATTR.lat,
                                long: Circuit[0].Location[0].ATTR.long,
                                locality: Circuit[0].Location[0].Locality[0],
                                country: Circuit[0].Location[0].Country[0]                           
                            }
                        },
                        races: {
                            create: {
                                name: RaceName[0],
                                season: ATTR.season,
                                round: ATTR.round,
                                url: ATTR.url,
                                date: Date[0],
                                time: Time[0]
                            }
                        }
                    }
                }
                const loopData = ResultsList[0].Result;
                let results = [];
                loopData.forEach(element => {
                    const {ATTR, Driver, Constructor, Grid, Laps, Status, Time, FastestLap} = element;
                    let object = { circuit };
                    object.driver = {
                        create: {
                            driverId: Driver[0].ATTR.driverId,
                            code: Driver[0].ATTR.code,
                            url: Driver[0].ATTR.url,
                            givenName: Driver[0].GivenName[0],
                            familyName: Driver[0].FamilyName[0],
                            dateOfBirth: Driver[0].DateOfBirth[0],
                            nationality: Driver[0].Nationality[0],
                            number: Driver[0].PermanentNumber[0]
                        }
                    }
                    object.constructors = {
                        create: {
                            constructorId: Constructor[0].ATTR.constructorId,
                            name: Constructor[0].Name[0],
                            url: Constructor[0].ATTR.url,
                            nationality: Constructor[0].Nationality[0]
                        }
                    }
                    object.fastestLap = {
                        create: {
                            time: FastestLap[0].Time[0],
                            rank: FastestLap[0].ATTR.rank,
                            lap: FastestLap[0].ATTR.lap,
                            averageSpeed: FastestLap[0].AverageSpeed[0]["_"],
                            units: FastestLap[0].AverageSpeed[0]["ATTR"].units
                        }
                    }
                    if (Time) {
                        object.time = {
                            create: {
                                time: Time[0]["_"],
                                millis: Time[0].ATTR.millis
                            }
                        }
                    }
                    object.grid = Grid[0]
                    object.laps = Laps[0]
                    object.status = Status[0]['_']
                    object = { ...object, ...ATTR}
                    // results.push(object)
                    console.log(`await prisma.results.create({
                        data: ${JSON.stringify(object)} })`)
    
                });
                // console.log(JSON.stringify(results))

            }
            else {
                console.log(error);
            }
        });
    });
  });
}

myFunction()

  
  