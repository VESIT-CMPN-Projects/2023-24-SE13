import { updateMapWithData } from './script.js';
var jsondataarray=[{
  
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [19, 72]
    },
    "properties": {
      "id":i,
      "name": "mumbai",
      "aqi":89,
      "t":34,
      "h":10,
      }
     }
  
];


var i=0; //counter for id of cities;

function updateJsonWithData(data,city) {
  i++;
 
  jsondataarray.push( {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [data.data.city.geo[1],data.data.city.geo[0]]//data.location.lon, data.location.lat
    },
    "properties": {
      "id":i,
      "name": `${city}`, //data.location.name,
      "aqi":data.data.aqi ,
      "t": data.data.iaqi.t.v,
      "h": data.data.iaqi.h.v,
    }
  });
  if(i%10==0){
    updateMapWithData("t");
  }
 
 }



 var jsongovdataarray=[
];
 function updateGovData(data) {
  
 
data.forEach(element => {
  
  jsongovdataarray.push( {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [element.latitude,element.longitude]//data.location.lon, data.location.lat
    },
    "properties": {
      "id"      :element.id,
      "station" : element.station, 
      "city"    :element.city,
      "state"   :element.state,
      "aqi"     :element.aqi ,
      "So2"     :element.pollutants.SO2?.pollutant_avg?? NaN,
      "Nh3"     :element.pollutants.NH3?.pollutant_avg ?? NaN,
      "Ozone"   :element.pollutants.OZONE?.pollutant_max?? NaN,
      "No2"     :element.pollutants.NO2?.pollutant_avg?? NaN,
      "Co"      :element.pollutants.CO?.pollutant_max?? NaN,
      "Pm25"    :element.pollutants["PM2.5"]?.pollutant_avg?? NaN,
      "Pm10"    :element.pollutants.PM10?.pollutant_avg?? NaN,
    }
  });
  if(i%100==0){
    updateMapWithData("t");
  }
});
 
 }
 export {jsondataarray,jsongovdataarray, updateJsonWithData,updateGovData};