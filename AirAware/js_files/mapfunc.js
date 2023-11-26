import {jsondataarray} from './jsondatafunc.js';
import { updateMapWithData } from './script.js';

// var selector ="t";

document.getElementById('button1').addEventListener('click', function () {
//   selector="t";
  updateMapWithData("t");
});

document.getElementById('button2').addEventListener('click', function () {
//   selector="h";
  updateMapWithData("h");
});
document.getElementById('button3').addEventListener('click', function () {
//   selector="aqi";
  updateMapWithData("aqi");
});

var heatData = jsondataarray.map(feature => [
    feature.geometry.coordinates[1], // Latitude
    feature.geometry.coordinates[0], // Longitude
    feature.properties.t // Intensity value from properties
  ]);
  
function updateheat(selector){

  if(selector=="aqi"){
    console.log("aqi updating");
     heatData = jsondataarray.map(feature => [
      feature.geometry.coordinates[1], // Latitude
      feature.geometry.coordinates[0], // Longitude
      feature.properties.aqi // Intensity value from properties
  ]);
  }else if(selector=="h"){
    console.log("h updating");
     heatData = jsondataarray.map(feature => [
      feature.geometry.coordinates[1], // Latitude
      feature.geometry.coordinates[0], // Longitude
      feature.properties.h // Intensity value from properties
  ]);
  }else if(selector=="t"){
    // console.log("t updating");
     heatData = jsondataarray.map(feature => [
      feature.geometry.coordinates[1], // Latitude
      feature.geometry.coordinates[0], // Longitude
      feature.properties.t // Intensity value from properties
  ]);
  }}

var heatLayer1;
function updateheatL1(){
  heatLayer1 = L.heatLayer(heatData, {
    name:"heatlayer",
    radius: 50, // Adjust the radius of the heatmap points
    blur: 80,
    opacity:0.001,
    max:0.1,
  //   scale: {
  //     // 0: 'blue',       // Color for values equal to 0
  //     50: 'green',     // Color for values between 0 and 10
  //     100: 'lightgreen',    // Color for values between 10 and 20
  //     200: 'grey',
  //     300: 'yellow',
  //     400: 'orange',
  //     500: 'red'        // Color for values between 20 and 30
  // },
    gradient:
    
     {
      0.0: 'red',
      0.1: 'orange',
      0.2: 'yellow',
      0.3: 'green',
      0.4: 'lightgreen',
      0.5: 'lightblue',
      0.6: 'blue',
      0.7: 'indigo',
      0.8: 'violet',
      0.9: 'purple',
  },
  
  maxZoom: 17,
  scaleRadius: true,
})
}

//   const gradient = {
//     0.0: 'red',
//     0.1: 'orange',
//     0.2: 'yellow',
//     0.3: 'green',
//     0.4: 'lightgreen',
//     0.5: 'lightblue',
//     0.6: 'blue',
//     0.7: 'indigo',
//     0.8: 'violet',
//     0.9: 'purple',
//     1.0: 'darkpurple',
//   };
  
  




// Create a custom legend control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h4>Color Codes</h4>' +
    '<div class="legend-item"><div class="legend-color" style="background: indigo"></div> High </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: blue"></div> Medium </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: lightgreen"></div> Low </div>';

  return div;
};

export {heatData,legend, updateheat, heatLayer1, updateheatL1};