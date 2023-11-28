// import { fetchDataForCity1 } from "./script";
import { updateJsonWithData,jsongovdataarray} from './jsondatafunc.js';

var pdis = document.getElementById("pdis");
var hdis = document.getElementById("hdis");
var pm25dis = document.getElementById("pm25dis");
var pm10dis = document.getElementById("pm10dis");
var tdis = document.getElementById("tdis");
var aqidis = document.getElementById("aqidis");
var titledis = document.getElementById("search-name");

var search = document.getElementById("search-button");
var submit = document.getElementById("submit2");
var cityin = document.getElementById("cityin");

function fetchDataForCity(city , task) {


  return fetch( `https://api.waqi.info/feed/${city}/?token=26cae8703d2177a6f0be5b5557ca009d2f56ace0` ) // Replace with your API endpoint
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
        
        updateJsonWithData(data,city); //calling function to update json data
        
          if(task==1){
        updatedis(data,city);
           console.log(data);
      }  
      // updatefiredata(data,city)
      // .then({}      )
          return data; // Return the data from the API
      })
      .catch(function(error) {
          // console.error('Error fetching data:', error);
      });
}

function fetchGovDataForCity(city){
  var firstmatch= jsongovdataarray.find(element => element.properties.city === city);
  if (firstmatch) {
    alert( 
    //"id: "      ,firstmatch.properties.id,
    "Station: " + firstmatch.properties.station + "\n" +
    "City: " + firstmatch.properties.city + "\n" +
    "State: " + firstmatch.properties.state + "\n" +
    "AQI: " + firstmatch.properties.aqi + "\n" +
    "SO2: " + firstmatch.properties.So2 + "\n" +
    "NH3: " + firstmatch.properties.Nh3 + "\n" +
    "Ozone: " + firstmatch.properties.Ozone + "\n" +
    "NO2: " + firstmatch.properties.No2 + "\n" +
    "CO: " + firstmatch.properties.Co + "\n" +
    "PM2.5: " + firstmatch.properties.Pm25 + "\n" +
    "PM10: " + firstmatch.properties.Pm10
    );
   // console.log("City ID:", firstmatch.properties.id);
    //console.log("AQI:", firstmatch.properties.aqi);
    // Access other properties as needed
  }
}

search.addEventListener("click", () => {
    event.preventDefault();
    // searchit();
    var inputValue = cityin.value;
    if (inputValue.length > 0) {
      var capitalizedText = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      cityin.value = capitalizedText;
    }
   // console.log(cityin.value);
    fetchGovDataForCity(cityin.value);
  
    cityin.value = '';
    console.log("search button clicked "+cityin.value );
    
  });
  

  
submit.addEventListener("click", () => {
  event.preventDefault();
  // console.log("button reload clicked");
});

 function updatedis(data,city){
  

  pdis.innerText = "Pressure : "+data.data.iaqi.p.v + " mbar";
  hdis.innerText = "Humidity : "+data.data.iaqi.h.v + " %";
  pm25dis.innerText = "PM 2.5 : "+data.data.iaqi.pm25.v + " ug/m^3";
  pm10dis.innerText = "PM 10 : "+data.data.forecast.daily.pm10[2].avg + " ug/m^3";
  tdis.innerText = "Temperature : "+data.data.iaqi.t.v + " celsius";
  aqidis.innerText = "AQI : "+data.data.aqi ;
  titledis.innerText = city;

  
submit.addEventListener("click", () => {
//  updatefiredata(data,city);
  console.log("button reload clicked");
});
}

export {updatedis};