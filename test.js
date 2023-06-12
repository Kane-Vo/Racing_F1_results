const f1Api = require('f1-api-node') 

const myFunction = async () => {
  fetch("http://ergast.com/api/f1/2023/7/results", {
    "method": "GET",
    // "headers": {
    //   "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    //   "x-rapidapi-key": "70046257a0msh337af3ecd09c912p1e2c86jsn1109b471d936",
    //   "x-apisports-key": "df985cff973a3d29260fa6985cb55e82"
    // }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
}

myFunction()
