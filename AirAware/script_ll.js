var cityin = document.getElementById("cityin");
var pdis = document.getElementById("pdis");
var hdis = document.getElementById("hdis");
var pm25dis = document.getElementById("pm25dis");
var pm10dis = document.getElementById("pm10dis");
var tdis = document.getElementById("tdis");
var titledis = document.getElementById("search-name");
var search = document.getElementById("search-button");

search.addEventListener("click", () => {
  event.preventDefault();
  // searchit();
  fetchDataForCity(cityin.value,1);

  console.log("search button clicked "+cityin.value );
  
});

function updatedis(data,city){
  

  pdis.innerText = "Pressure : "+data.data.iaqi.p.v + " mbar";
  hdis.innerText = "Humidity : "+data.data.iaqi.h.v + " %";
  pm25dis.innerText = "PM 2.5 : "+data.data.iaqi.pm25.v + " ug/m^3";
  pm10dis.innerText = "PM 10 : "+data.data.forecast.daily.pm10[2].avg + " ug/m^3";
  tdis.innerText = "Temperature : "+data.data.iaqi.t.v + " celsius";
  titledis.innerText = city;

}


var selector ="t";


var submit = document.getElementById("submit2");
submit.addEventListener("click", () => {
  
  console.log("button reload clicked");
});


document.getElementById('button1').addEventListener('click', function () {
  selector="t";
  updateMapWithData();
});

document.getElementById('button2').addEventListener('click', function () {
  selector="h";
  updateMapWithData();
});
document.getElementById('button3').addEventListener('click', function () {
  selector="aqi";
  updateMapWithData();
});


var cityin = document.getElementById("cityin");
var output = document.getElementById("otext");

var city;
var getjsonData=[{
  
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


////////////////////////////////json storage part///////////////////////////////////////////////


const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Lucknow",
  "Nagpur",
  "Bhopal",
  "Indore",
  "Chandigarh",
  "Patna",
  "Bhubaneswar",
  "Guwahati",
  "Raipur",
  "Dehradun",
  "Srinagar",
  "Thiruvananthapuram",
  "Ranchi",
  "Agra",
  "Amritsar",
  "Aurangabad",
  "Coimbatore",
  "Kochi",
  "Vadodara",
  "Vijayawada",
  "Visakhapatnam",
  "Madurai",
  "Jamshedpur",
  "Shimla",
  "Gandhinagar",
  "Nashik",
  "Kanpur",
  // "Noida",
  "Gurgaon",
  "Mysore",
  "Surat",
  "Ludhiana",
  "Nagaland",
  "Rajkot",
  "Bhagalpur",
  "Salem",
  "Tiruchirappalli",
  "Jhansi",
  "Ujjain",
  "Kota",
  "Bikaner",
  "Amravati",
  "Gwalior",
  "Bilaspur",
  "Agartala",
  "Imphal",
  "Kohima",
  "Shillong",
  "Itanagar",
  "Dibrugarh",
  "Gangtok",
  "Panaji",
  "Kavaratti",
  "Lakshadweep",
  "Chandrapur",
  "Siliguri",
  "Kollam",
  "Dhanbad",
  "Sagar",
  "Mathura",
  "Kollam",
  "Tumkur",
  "Hospet",
  "Gulbarga",
  "Hubli",
  "Karnal",
  "Faridabad",
  "Gorakhpur",
  "Kadapa",
  "Kolar",
  "Nizamabad",
  "Warangal",
  "Tirupati",
  "Kakinada",
  "Bhimavaram",
  "Eluru",
  "Bilaspur",
  "Rourkela",
  "Koraput",
  "Bhavnagar",
  "Porbandar",
  "Surendranagar",
  "Morbi",
  "Junagadh",
  "Dwarka",
  "Narmada",
  "Anand",
  "Bharuch",
  "Godhra",
  "Dahod",
  "Valsad",
  "Navsari",
];


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
// Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1AC3ptMI60oGbYBeseroCTdnEDex7AQg",
  authDomain: "airaware-f22c0.firebaseapp.com",
  projectId: "airaware-f22c0",
  storageBucket: "airaware-f22c0.appspot.com",
  messagingSenderId: "580535713947",
  appId: "1:580535713947:web:010ec1671df4d20a1c863e",
  measurementId: "G-RQ1WWWJWKP"
};
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const collectionRef = collection(db, "data");


function fetchDataloop(){
  for(let i=0; i<cities.length ; i++ ){
  fetchDataForCity(cities[i],0);
  
  }
  updateMapWithData();
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
      updatefiredata(data,city)
      .then({}

      )
          return data; // Return the data from the API
      })
      .catch(function(error) {
          // console.error('Error fetching data:', error);
      });
}

function updatefiredata(data,city){
  var firedata = {
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
  };
   const customDocId = city; // Replace with your desired custom ID

  const customDocRef = doc(collectionRef, customDocId);
  
  
  setDoc(customDocRef, firedata)
    .then(() => {
      console.log("Custom document added with ID: " + customDocId);
    })
    .catch((error) => {
      console.error("Error adding custom document: ", error);
    });
  
    const newData = {
    "properties.t": 0, // Update the "t" field
    "properties.h": 2, // Update the "h" field
    "properties.aqi": 3, // Update the "aqi" field
  };
}

var i=0; //counter for id of cities;

function updateJsonWithData(data,city) {
  i++;
 
  getjsonData.push( {
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
    updateMapWithData();
  }
 
 } // Save the updated GeoJSON data back to a JSON file (see step 4 below)
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
// var marker = L.marker(getjsonData.coordinates, { icon: customIcon }).addTo(map);


    function fetchDataForAllCities() {
      citieslist.forEach(function(city) {
          fetchDataForCity(city)
              .then(function(data) {
                  
                  updateJsonWithData(data);
                  // updateMapWithData(data);
              });
      });
  }
  
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



map.setMaxZoom(8); // Set the maximum zoom level
map.setMinZoom(4.2);  // Set the minimum zoom level

var geojsonLayer = L.geoJSON().addTo(map);



// function updateMapWithData() {
//   // Assuming data is GeoJSON format
//   // Clear existing GeoJSON data
//   geojsonLayer.clearLayers();

//   // Add the new data to the GeoJSON layer
//   geojsonLayer.addData(getjsonData);

//   // You may want to customize the marker icon and popup content
//   getjsonData.forEach(function (feature) {
//     var coordinates = feature.geometry.coordinates;
//     var name = feature.properties.name;
//     var co = feature.properties.air_quality.co;

//   //   var marker = L.marker(coordinates).addTo(map);
//   //   marker.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
//   //
//   layer.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
// });
function updateMapWithData() {
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
     console.log(`Layer Name: ${layer.options.name}`);
  });

  
  // geojsonLayer.addData(getjsonData); //used to add markers

  // Add the new data to the GeoJSON layer
 
//   function generateGradient(colorsCount) {
//     const gradient = {};
//     const startColor = hexToRGB('#0000FF'); // Blue
//     const middleColor = hexToRGB('#00FF00'); // Lime
//     const endColor = hexToRGB('#FF0000');   // Red
  
//     for (let i = 0; i < colorsCount; i++) {
//       const ratio = i / (colorsCount - 1);
//       let color;
//       if (ratio < 0.5) {
//         // Interpolate between blue and lime
//         color = interpolateColors(startColor, middleColor, ratio * 2);
//       } else {
//         // Interpolate between lime and red
//         color = interpolateColors(middleColor, endColor, (ratio - 0.5) * 2);
//       }
//       gradient[ratio.toFixed(2)] = rgbToHex(color.r, color.g, color.b);
//     }
  
//     return gradient;
//   }
  
//   function hexToRGB(hex) {
//     const bigint = parseInt(hex.slice(1), 16);
//     const r = (bigint >> 16) & 255;
//     const g = (bigint >> 8) & 255;
//     const b = bigint & 255;
//     return { r, g, b };
//   }
  
//   function rgbToHex(r, g, b) {
//     return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
//   }
  
//   function interpolateColors(color1, color2, ratio) {
//     const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
//     const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
//     const b = Math.round(color1.b + (color2.b - color1.b) * ratio);
//     return { r, g, b };
//   }
  
//   // Define the number of colors (50)
//   const colorsCount = 5;
  
//   // Generate the gradient
//   const gradient = generateGradient(colorsCount);
  
//   // Output the gradient in the specified format
//   console.log(gradient);
var heatData = getjsonData.map(feature => [
  feature.geometry.coordinates[1], // Latitude
  feature.geometry.coordinates[0], // Longitude
  feature.properties.t // Intensity value from properties
]);
if(selector=="aqi"){
  console.log("aqi updating");
   heatData = getjsonData.map(feature => [
    feature.geometry.coordinates[1], // Latitude
    feature.geometry.coordinates[0], // Longitude
    feature.properties.aqi // Intensity value from properties
]);
}else if(selector=="h"){
  console.log("h updating");
   heatData = getjsonData.map(feature => [
    feature.geometry.coordinates[1], // Latitude
    feature.geometry.coordinates[0], // Longitude
    feature.properties.h // Intensity value from properties
]);
}else if(selector=="t"){
  console.log("t updating");
   heatData = getjsonData.map(feature => [
    feature.geometry.coordinates[1], // Latitude
    feature.geometry.coordinates[0], // Longitude
    feature.properties.t // Intensity value from properties
]);
}

//  console.log(heatData);
  
  
const gradient = {
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
  1.0: 'darkpurple',
};

// Create a Heatmap layer
var heatLayer1 = L.heatLayer(heatData, {
    name:"heatlayer",
    radius: 50, // Adjust the radius of the heatmap points
    blur: 80,
    opacity:0.001,
    max:0.1,
    gradient:  {
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
      // 1: 'darkpurple',
    },
  //    {
  //      0.1: 'blue',
  //     0.6: 'lime',
  //     1: 'red'
  // },
  
  maxZoom: 17,
  scaleRadius: true,
})

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