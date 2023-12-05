
import { updateGovData, jsongovdataarray } from './jsondatafunc.js';
import apidata from './apidata.js';
import {fetchGovDataForCity} from './display.js';
import coordata from './data.js';


apidata()
  .then(function (response) {
    return response;
  })
  .then(function (data) {
    console.log("data received", data);
    updateGovData(data);
  })

  async () => {
    try {
      const response = await fetch('YOUR_FIREBASE_FUNCTION_ENDPOINT');
      const data = await response.json();
      console.log(data.message); // This will log the response from the function
    } catch (error) {
      console.error("Error:", error);
    }
  }

  var search = document.getElementById("search-button");

  var cityin = document.getElementById("cityin");
  
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

map.setMaxZoom(12); // Set the maximum zoom level
map.setMinZoom(4.2);

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

//const rectangle = L.rectangle(bounds, { color: 'red', weight: 0, fillOpacity: 0.1, blur:0.5 }).addTo(map);
//legend.addTo(map);

var geojsonLayer = L.geoJSON().addTo(map);


var note = L.control({ position: 'bottomright' });

note.onAdd = function () {
  var noteDiv = L.DomUtil.create('div', 'info note');
  noteDiv.innerHTML = '<p>Displayed on the map is the predominant pollutant present within the specific city, indicated by the color of pollutant.</p>';
  return noteDiv;
};
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h4>Most dominant pollutant</h4>' +
    '<div class="legend-item"><div class="legend-color" style="background: black"></div> pm2.5 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: purple"></div> pm10 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: red"></div> no2 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: orange"></div> ozone </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: yellow"></div> so2 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: blue"></div> co </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: lightgreen"></div> nh3 </div>';

  return div;
};
console.log("lol")
note.addTo(map);
legend.addTo(map);

// You can change the position by updating the CSS of the legend and note divs
document.querySelector('.legend').style.marginRight = '10px'; // Adjust the margins as needed
document.querySelector('.note').style.marginTop = '10px'; // Adjust the margins as needed

// Custom Marker at Delhi's coordinates

// Adding a popup to the marker

// var marker = L.marker(coordinates).addTo(map);
//   //   marker.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
//   //
//   layer.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
// if (!jsongovdataarray || !jsongovdataarray.length) {
//   jsongovdataarray = coordata;
// }
function  updateMapWithData (){
  jsongovdataarray.map(feature => {

    function customIcon(col,val){
      var color;
      if(col=="nh3"){
        color ="green.png";}
        else if(col=="co"){
          color ="blue.png";}
          else if(col=="so2"){
            color ="yellow.png";}
            else if(col=="o3"){
              color ="orange.png";}
              else if(col=="no2"){
                color ="Red.png";}
                else if(col=="pm10"){
                  color ="purple.png";}
                  else if(col=="pm25"){
                    color ="black.png";}
                    else{color="grey.png"}
    return  customIcon = L.icon({
      iconUrl: `./ImagesOfSite/${color}`,
    //   html: `<div style=" height:20px;width:20px; position:absolute;">
    //   <img src="./ImagesOfSite/${color}"  style="width:16px; height:16px; padding: 0;border: none;">
    //   <div style="">${val}</div>
    // </div>
    // `,
      iconSize: [10, 10], // size of the icon
      iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });
  }
    try{
    var marker = L.marker([feature.geometry.coordinates[0], // Latitude
    feature.geometry.coordinates[1],], { icon: customIcon(feature.properties.maxele, feature.properties.max) });
     marker.addTo(map);
     let aqi =feature.properties.aqi;
     if (aqi==-1){
      aqi="Insufficient data";
     } else{
      aqi =aqi + " ug/m3";
     }
    marker.bindPopup(`<b>${feature.properties.station}</b>
                    <br><b>City: ${feature.properties.city}</b>
                    <br>Aqi: ${aqi}
                    <br>PM 2.5: ${feature.properties.Pm25} ug/m3
                    <br>PM 10: ${feature.properties.Pm10} ug/m3
                    <br>NO2: ${feature.properties.No2} ug/m3
                    <br>O3: ${feature.properties.Ozone} ug/m3
                    <br>SO2: ${feature.properties.So2} ug/m3
                    <br>CO: ${feature.properties.Co} mg/m3
                    <br>NH3: ${feature.properties.Nh3} ug/m3
                    `);
    }catch(error){
      console.log(error);
    }
    // Adding a popup to the marker
  });

}

updateMapWithData();
export { updateMapWithData };