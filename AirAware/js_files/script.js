import cities from './citylist.js';
import { updateJsonWithData} from './jsondatafunc.js';
import { heatLayer1,legend, updateheat, updateheatL1} from './mapfunc.js';

var cityin = document.getElementById("cityin");
var pdis = document.getElementById("pdis");
var hdis = document.getElementById("hdis");
var pm25dis = document.getElementById("pm25dis");
var pm10dis = document.getElementById("pm10dis");
var tdis = document.getElementById("tdis");
var aqidis = document.getElementById("aqidis");
var titledis = document.getElementById("search-name");
var search = document.getElementById("search-button");
var submit = document.getElementById("submit2");

search.addEventListener("click", () => {
  event.preventDefault();
  // searchit();
  var inputValue = cityin.value;
  if (inputValue.length > 0) {
    var capitalizedText = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    cityin.value = capitalizedText;
  }
  fetchDataForCity(cityin.value,1);

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
  updatefiredata(data,city);
  console.log("button reload clicked");
});
}




var cityin = document.getElementById("cityin");
var output = document.getElementById("otext");

var city;


////////////////////////////////json storage part///////////////////////////////////////////////




function fetchDataloop(){
  for(let i=0; i<cities.length ; i++ ){
  fetchDataForCity(cities[i],0);
  
  }
  updateMapWithData("t");
}
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

 // Save the updated GeoJSON data back to a JSON file (see step 4 below)
// })
// // .catch(function(error) {
// //   console.error('Error loading template GeoJSON:', error);
// // });
// }

// var i =1;
// var customIcon = L.divIcon({
//   className: 'custom-icon',
//   html: `<div class="marker-label">98</div>`,
//   iconSize: [40, 40], // Adjust the size as needed
// });
// var marker = L.marker(jsondataarray.coordinates, { icon: customIcon }).addTo(map);


  //   function fetchDataForAllCities() {
  //     citieslist.forEach(function(city) {
  //         fetchDataForCity(city)
  //             .then(function(data) {
                  
  //                 updateJsonWithData(data);
  //                 // updateMapWithData(data);
  //             });
  //     });
  // }
  
  // Call the fetchDataForAllCities function every minute (60,000 milliseconds)
  // setInterval(fetchDataForAllCities, 60000);
  





  //////////////////////////////////////////////mapping part //////////////////////////////////////////

// Initialize the map
// var map = L.map('map').setView([28.6139, 77.2090], 6); // Set initial center and zoom  [28.6139, 77.2090] for delhi [28.6139, 77.2090] for mumbai

const southWest = L.latLng(6.7, 68.2); // Southwest corner
const northEast = L.latLng(37.3, 97.4);  // Northeast corner
const bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  center: [23.7, 82.8], // Centered on India
  zoom: 5, // Adjust the initial zoom level
  maxBounds: bounds, // Restrict the map to India's bounds
  maxBoundsViscosity: 1.0, // Controls how strong the bounds are enforced (1.0 means full bounds restriction)
});

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


legend.addTo(map);

map.setMaxZoom(8); // Set the maximum zoom level
map.setMinZoom(4.2);  // Set the minimum zoom level

var geojsonLayer = L.geoJSON().addTo(map);



// function updateMapWithData() {
//   // Assuming data is GeoJSON format
//   // Clear existing GeoJSON data
//   geojsonLayer.clearLayers();

//   // Add the new data to the GeoJSON layer
//   geojsonLayer.addData(jsondataarray);

//   // You may want to customize the marker icon and popup content
//   jsondataarray.forEach(function (feature) {
//     var coordinates = feature.geometry.coordinates;
//     var name = feature.properties.name;
//     var co = feature.properties.air_quality.co;

//   //   var marker = L.marker(coordinates).addTo(map);
//   //   marker.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
//   //
//   layer.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
// });
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
 
  // function generateGradient(colorsCount) {
  //   const gradient = {};
  //   const startColor = hexToRGB('#FF0000'); // Blue //lightgreen
  //   const middleColor = hexToRGB('#ADD8E6'); // Lime//blue
  //   const endColor = hexToRGB('#8B008B');   // Red
  
  //   for (let i = 0; i < colorsCount; i++) {
  //     const ratio = i / (colorsCount - 1);
  //     let color;
  //     if (ratio < 0.5) {
  //       // Interpolate between blue and lime
  //       color = interpolateColors(startColor, middleColor, ratio * 2);
  //     } else {
  //       // Interpolate between lime and red
  //       color = interpolateColors(middleColor, endColor, (ratio - 0.5) * 2);
  //     }
  //     gradient[ratio.toFixed(2)] = rgbToHex(color.r, color.g, color.b);
  //   }
  
  //   return gradient;
  // }
  
  // function hexToRGB(hex) {
  //   const bigint = parseInt(hex.slice(1), 16);
  //   const r = (bigint >> 16) & 255;
  //   const g = (bigint >> 8) & 255;
  //   const b = bigint & 255;
  //   return { r, g, b };
  // }
  
  // function rgbToHex(r, g, b) {
  //   return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  // }
  
  // function interpolateColors(color1, color2, ratio) {
  //   const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
  //   const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
  //   const b = Math.round(color1.b + (color2.b - color1.b) * ratio);
  //   return { r, g, b };
  // }
  
  // // Define the number of colors (50)
  // const colorsCount = 5;
  
  // // Generate the gradient
  // const gradient2 = generateGradient(colorsCount);
  
  // // Output the gradient in the specified format
  // console.log(gradient2);



//  console.log(heatData);
  
updateheat(selector);
updateheatL1(); 

// Create a Heatmap layer
heatLayer1.addTo(map);


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

  // Update the legend or any other map elements as needed
  fetchDataloop();

  export {updateMapWithData};