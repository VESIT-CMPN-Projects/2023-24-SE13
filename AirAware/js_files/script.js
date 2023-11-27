import cities from './citylist.js';
import {jsondataarray, updateJsonWithData} from './jsondatafunc.js';
//import { heatLayer1,legend, updateheat, updateheatL1} from './mapfunc.js';
import {updatedis} from './display.js';

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
           console.error('Error fetching data:', error);
      });
}

document.getElementById('button1').addEventListener('click', function () {
  //   selector="t";
    updateMapWithData("t");
    legendcontrol("t");
  });
  
  document.getElementById('button2').addEventListener('click', function () {
  //   selector="h";
    updateMapWithData("h");
    legendcontrol("h");
  });
  document.getElementById('button3').addEventListener('click', function () {
  //   selector="aqi";
    updateMapWithData("aqi");
    legendcontrol("aqi");
  });
// var i =1;
// var customIcon = L.divIcon({
//   className: 'custom-icon',
//   html: `<div class="marker-label">98</div>`,
//   iconSize: [40, 40], // Adjust the size as needed
// });
// var marker = L.marker(jsondataarray.coordinates, { icon: customIcon }).addTo(map);


  // Call the fetchDataForAllCities function every minute (60,000 milliseconds)
  // setInterval(fetchDataForAllCities, 60000);
  
  //////////////////////////////////////////////mapping part //////////////////////////////////////////

// Initialize the map

const southWest = L.latLng(6.7, 68.2); // Southwest corner
const northEast = L.latLng(37.3, 97.4);  // Northeast corner
const bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  center: [23.7, 82.8], // Centered on India
  zoom: 5, // Adjust the initial zoom level
  maxBounds: bounds, // Restrict the map to India's bounds
  maxBoundsViscosity: 1.0, // Controls how strong the bounds are enforced (1.0 means full bounds restriction)
});

map.setMaxZoom(8); // Set the maximum zoom level
map.setMinZoom(4.2);

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


//legend.addTo(map);

var geojsonLayer = L.geoJSON().addTo(map);

// var marker = L.marker(coordinates).addTo(map);
//   //   marker.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
//   //
//   layer.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
function updateMapWithData(selector) {
  // Assuming data is GeoJSON format
  // Clear existing GeoJSON data
  geojsonLayer.clearLayers();
  const mapLayers = [];
  map.eachLayer(layer => {
      mapLayers.push(layer);
  });
  
  // Iterate through the list of layers
  mapLayers.forEach(layer => {
     if(layer.options.name == "heatlayer"){
      map.removeLayer(layer);
     }
    //  console.log(`Layer Name: ${layer.options.name}`);
  });

  
  // geojsonLayer.addData(jsondataarray); //used to add markers

  // Add the new data to the GeoJSON layer
  var heatData = jsondataarray.map(feature => [
    feature.geometry.coordinates[1], // Latitude
    feature.geometry.coordinates[0], // Longitude
    feature.properties.h // Intensity value from properties
  ]);
  
var heatData_h = jsondataarray.map(feature => [
  feature.geometry.coordinates[1], // Latitude
  feature.geometry.coordinates[0], // Longitude
  feature.properties.h // Intensity value from properties
]);
var heatData_t = jsondataarray.map(feature => [
  feature.geometry.coordinates[1], // Latitude
  feature.geometry.coordinates[0], // Longitude
  feature.properties.t // Intensity value from properties
]);
var heatData_aqi = jsondataarray.map(feature => [
  feature.geometry.coordinates[1], // Latitude
  feature.geometry.coordinates[0], // Longitude
  feature.properties.aqi // Intensity value from properties
]);  
console.log(heatData_aqi);
for (var i=0; i<heatData_aqi.length; i++){
  if(heatData_aqi[i][2]>=500){
    heatData_aqi[i][2]=500;
  }
}
heatData_aqi.push([0,0,0]);
heatData_aqi.push([0,0,500]);
console.log(heatData_aqi);
//updateheat(selector);
var heatLayer1;
heatLayer1 = L.heatLayer(heatData_t, {
  name:"heatlayer",
  radius: 50, // Adjust the radius of the heatmap points
  blur: 20,
  opacity:0.01,
  max:0.05,

  gradient:
  
   {
    0: '#0000FF',       // Blue for temperatures below 0
    0.1: '#3366FF',     // Lighter blue for 0 to 5 range
    0.2: '#66CCFF',     // Light blue for 5 to 10 range
    0.3: '#66FF66',     // Green for 10 to 15 range
    0.35: '#CCFF66',    // Light green for 15 to 18 range
    0.4: '#FFFF66',     // Yellow for 18 to 21 range
    0.45: '#FFCC66',    // Light orange for 21 to 24 range
    0.5: '#FF9966',     // Orange for 24 to 27 range
    0.6: '#FF6666',     // Red for 27 to 30 range
    0.7: '#FF3333',     // Darker red for 30 to 33 range
    0.8: '#FF0000',     // Bright red for 33 to 36 range
    0.9: '#CC0000',     // Dark red for 36 to 40 range
    1: '#660000'   
},

maxZoom: 17,
scaleRadius: true,
})
var heatLayer2;
heatLayer2 = L.heatLayer(heatData_h, {
  name:"heatlayer",
  radius: 50, // Adjust the radius of the heatmap points
  blur: 80,
  opacity:0.001,
  max:0.1,

  gradient:
  
   {0: '#0000FF',       // Blue for humidity close to 0
   0.3: '#3366FF',     // Lighter blue for 0 to 30 range
   0.4: '#66CCFF',     // Light blue for 30 to 40 range
   0.5: '#66FF66',     // Green for 40 to 50 range
   0.6: '#CCFF66',     // Light green for 50 to 60 range
   0.65: '#FFFFB3',    // Light greenish for 65
   0.7: '#FFFF66',     // Yellow for 65 to 70 range
   0.75: '#FFEC66',    // Yellowish for 75
   0.8: '#FFCC66',     // Light orange for 70 to 80 range
   0.85: '#FFB366',    // Orange for 85
   0.9: '#FF9966',     // Orange for 80 to 90 range
   0.95: '#FF6666',    // Reddish for 90 to 95 range
   1: '#FF0000' 
},

maxZoom: 17,
scaleRadius: true,
})
var heatLayer3;
heatLayer3 = L.heatLayer(heatData_aqi, {
  name:"heatlayer",
  radius: 50, // Adjust the radius of the heatmap points
  blur: 80,
  opacity:0.001,
  max:0.1,

  gradient:
  
   {
  //   0.0: 'green',
  //  0.2:'yellow',
  //  0.3: 'orange',
  //  0.4: 'red',
  //  0.5: 'purple',
  //  0.7: 'violet',
  //  0.1: 'black',
  0.0: 'green',
  0.2: 'yellow',
  0.4: 'orange',
  0.6: 'red',
  0.8: 'purple',
  1.0: 'black'
},

maxZoom: 17,
scaleRadius: true,
})
//updateheatL1(); 

// Create a Heatmap layer
if(selector=='t'){
  heatLayer1.addTo(map);
}else if(selector=='h'){
  heatLayer2.addTo(map);
}else if(selector=='aqi'){
  heatLayer3.addTo(map);
}

//console.log(heatData_h);

  // You may want to customize the marker icon and popup content
  // geojsonLayer.eachLayer(function (layer) {
  //   var feature = layer.feature;
  //   var coordinates = feature.geometry.coordinates;
  //   var name = feature.properties.name;
  //   var co = feature.properties.aqi;
  //   var tem = feature.properties.t;
  //   var hum = feature.properties.h;
  //   layer.bindPopup(`City: ${name}<br>AQI: ${co}<br>humidity: ${hum}<br>temp: ${tem}`).openPopup();
  // });

  // Update the legend or any other map elements as needed
}

var legend1 = L.control({ position: 'bottomright' });

legend1.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h4>Color Codes</h4>' +
    '<div class="legend-item"><div class="legend-color" style="background: #66CCFF"></div> High </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: #FFFF66"></div> Medium </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: #FF6666"></div> Low </div>';

  return div;
};
var legend2 = L.control({ position: 'bottomright' });

legend2.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h4>Color Codes</h4>' +
    '<div class="legend-item"><div class="legend-color" style="background: lightgreen"></div> High </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: #FFCC66"></div> Medium </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: #FF6666"></div> Low </div>';

  return div;
};
var legend3 = L.control({ position: 'bottomright' });

legend3.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h4>Color Codes</h4>' +
    '<div class="legend-item"><div class="legend-color" style="background: lightgreen"></div> High </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: orange"></div> Medium </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: purple"></div> Low </div>';

  return div;
};
function legendcontrol(selector){
  map.removeControl(legend1);
  map.removeControl(legend2);
  map.removeControl(legend3);

  if(selector=='aqi'){
    legend3.addTo(map);
  }else if(selector=='t'){
    legend1.addTo(map);
  }else if (selector=='h'){
    legend2.addTo(map);
  }
}

function fetchDataloop(){
  for(let i=0; i<cities.length ; i++ ){
  fetchDataForCity(cities[i],0);
  
  }
  updateMapWithData("t");
}

  fetchDataloop();
  legendcontrol("t");

  export {updateMapWithData};