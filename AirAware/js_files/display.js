// import { fetchDataForCity1 } from "./script";
import { jsongovdataarray} from './jsondatafunc.js';



function fetchGovDataForCity(city){
  var firstmatch= jsongovdataarray.find(element => element.properties.city=== city);
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
    "PM10: " + firstmatch.properties.Pm10 + "\n" +
    "lat: " + firstmatch.geometry.coordinates[0] + "\n" +
    "long: " + firstmatch.geometry.coordinates[1]
    );
   // console.log("City ID:", firstmatch.properties.id);
    //console.log("AQI:", firstmatch.properties.aqi);
    // Access other properties as needed
  }
}



export {fetchGovDataForCity};