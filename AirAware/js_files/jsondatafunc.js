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

 export {jsondataarray, updateJsonWithData};