// var submit = document.getElementById("submit");
// submit.addEventListener("click", () => {
//   callit();

//   console.log("button clicked");
// });

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

var citieslist = [
  { name: 'Mumbai', coordinates: [19.0760, 72.8777] },
  { name: 'New Delhi', coordinates: [28.6139, 77.2090] },
  { name: 'Bangalore', coordinates: [12.9716, 77.5946] },
  { name: 'Hyderabad', coordinates: [17.3850, 78.4867] },
  { name: 'Chennai', coordinates: [13.0827, 80.2707] },
  { name: 'Kolkata', coordinates: [22.5726, 88.3639] },
  { name: 'Pune', coordinates: [18.5204, 73.8567] },
  { name: 'Ahmedabad', coordinates: [23.0225, 72.5714] },
  { name: 'Jaipur', coordinates: [26.9124, 75.7873] },
  { name: 'Surat', coordinates: [21.1702, 72.8311] },
  { name: 'Lucknow', coordinates: [26.8467, 80.9462] },
  { name: 'Kanpur', coordinates: [26.4499, 80.3319] },
  { name: 'Nagpur', coordinates: [21.1458, 79.0882] },
  { name: 'Indore', coordinates: [22.7196, 75.8577] },
  { name: 'Thane', coordinates: [19.2183, 72.9781] },
  { name: 'Bhopal', coordinates: [23.2599, 77.4126] },
  { name: 'Visakhapatnam', coordinates: [17.6868, 83.2185] },
  { name: 'Pimpri-Chinchwad', coordinates: [18.6279, 73.8001] },
  { name: 'Patna', coordinates: [25.5941, 85.1376] },
  { name: 'Vadodara', coordinates: [22.3072, 73.1812] },
  { name: 'Ghaziabad', coordinates: [28.6692, 77.4538] },
  { name: 'Ludhiana', coordinates: [30.9010, 75.8573] },
  { name: 'Agra', coordinates: [27.1767, 78.0081] },
  { name: 'Nashik', coordinates: [20.5937, 78.9629] },
  { name: 'Ranchi', coordinates: [23.3441, 85.3096] },
  { name: 'Faridabad', coordinates: [28.4089, 77.3178] },
  { name: 'Coimbatore', coordinates: [11.0168, 76.9558] },
  { name: 'Kochi', coordinates: [9.9312, 76.2673] },
  { name: 'Madurai', coordinates: [9.9252, 78.1198] },
  { name: 'Hubballi-Dharwad', coordinates: [15.3647, 75.1240] },
  { name: 'Varanasi', coordinates: [25.3176, 82.9739] },
  { name: 'Srinagar', coordinates: [34.0837, 74.7973] },
  { name: 'Amritsar', coordinates: [31.6340, 74.8723] },
  { name: 'Dhanbad', coordinates: [23.7957, 86.4304] },
  { name: 'Allahabad', coordinates: [25.4358, 81.8463] },
  { name: 'Ranchi', coordinates: [23.3441, 85.3096] },
  // { name: 'Meerut', coordinates: [28.6139, 77.2090] },
  { name: 'Howrah', coordinates: [22.5958, 88.2636] },
  { name: 'Jabalpur', coordinates: [23.1815, 79.9864] },
  { name: 'Durgapur', coordinates: [23.5204, 87.3119] },
  { name: 'Asansol', coordinates: [23.6739, 86.9527] },
  { name: 'Nanded', coordinates: [19.1383, 77.3203] },
  { name: 'Kolhapur', coordinates: [16.7050, 74.2433] },
  { name: 'Ajmer', coordinates: [26.4691, 74.6390] },
  { name: 'Gulbarga', coordinates: [17.3296, 76.8376] },
  { name: 'Jamnagar', coordinates: [22.4707, 70.0577] },
  { name: 'Ujjain', coordinates: [23.1765, 75.7885] },
  // { name: 'Loni', coordinates: [28.7526, 77.2882] },

  { name: 'Nashik', coordinates: [20.0059, 73.7793] },
  { name: 'Agra', coordinates: [27.1767, 78.0081] },
  // { name: 'Faridabad', coordinates: [28.4089, 77.3178] },
  // { name: 'Meerut', coordinates: [28.6139, 77.2542] },
  { name: 'Rajkot', coordinates: [22.3039, 70.8022] },
  { name: 'Varanasi', coordinates: [25.3176, 82.9739] },
  { name: 'Srinagar', coordinates: [34.0836, 74.7973] },
  { name: 'Dhanbad', coordinates: [23.7957, 86.4304] },
  { name: 'Amritsar', coordinates: [31.6340, 74.8748] },
  { name: 'Navi Mumbai', coordinates: [19.0330, 73.0297] },
  { name: 'Allahabad', coordinates: [25.4358, 81.8463] },
  { name: 'Ranchi', coordinates: [23.3441, 85.3096] },
  { name: 'Howrah', coordinates: [22.5958, 88.2636] },
  { name: 'Coimbatore', coordinates: [11.0168, 76.9558] },
  { name: 'Gwalior', coordinates: [26.2183, 78.1828] },
  { name: 'Jodhpur', coordinates: [26.2389, 73.0243] },
  { name: 'Guwahati', coordinates: [26.1445, 91.7362] },
  { name: 'Vijayawada', coordinates: [16.5062, 80.6480] },
  { name: 'Kota', coordinates: [25.1980, 75.8315] },
  { name: 'Salem', coordinates: [11.6643, 78.1460] },
  { name: 'Aligarh', coordinates: [27.8974, 78.0880] },
  { name: 'Bhubaneswar', coordinates: [20.2961, 85.8245] },
  { name: 'Moradabad', coordinates: [28.8389, 78.7737] },
  { name: 'Bhiwandi', coordinates: [19.3002, 73.0588] },
  { name: 'Kolhapur', coordinates: [16.7050, 74.2433] },
  { name: 'Kurnool', coordinates: [15.8281, 78.0373] },
  { name: 'Guntur', coordinates: [16.3067, 80.4365] },
  { name: 'Warangal', coordinates: [17.9689, 79.5941] },
  { name: 'Saharanpur', coordinates: [29.9679, 77.5459] },
  { name: 'Gorakhpur', coordinates: [26.7519, 83.3710] },
  { name: 'Bikaner', coordinates: [28.0229, 73.3119] },
  // { name: 'Noida', coordinates: [28.5355, 77.3910] },
  { name: 'Gandhinagar', coordinates: [23.2156, 72.6369] },
  { name: 'Jamshedpur', coordinates: [22.8065, 86.2029] },
  { name: 'Raurkela', coordinates: [22.2494, 84.8296] },
  { name: 'Mangalore', coordinates: [12.9141, 74.8560] },
  { name: 'Cuttack', coordinates: [20.4625, 85.8822] },
  { name: 'Firozabad', coordinates: [27.1591, 78.3952] },
  { name: 'Kochi', coordinates: [9.9312, 76.2673] },
  { name: 'Bhavnagar', coordinates: [21.7645, 72.1519] },
  { name: 'Dehradun', coordinates: [30.3165, 78.0322] },
  { name: 'Durgapur', coordinates: [23.5204, 87.3119] },
  { name: 'Asansol', coordinates: [23.6850, 86.9750] },
  { name: 'Nanded', coordinates: [19.1367, 77.3142] },
  { name: 'Ajmer', coordinates: [26.4499, 74.6399] },
  { name: 'Jamnagar', coordinates: [22.4707, 70.0577] },
  { name: 'Ujjain', coordinates: [23.1765, 75.7885] },
  { name: 'Sangli', coordinates: [16.8524, 74.5815] },
  { name: 'Latur', coordinates: [18.4088, 76.5604] },
  { name: 'Imphal', coordinates: [24.8159, 93.9370] }
];
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



function fetchDataloop(){
  for(let i=0; i<citieslist.length ; i++ ){
  fetchDataForCity(cities[i]);
  
  }
  updateMapWithData();
}
function fetchDataForCity(city) {
  return fetch( `https://api.waqi.info/feed/${city}/?token=26cae8703d2177a6f0be5b5557ca009d2f56ace0` ) // Replace with your API endpoint
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
        
        updateJsonWithData(data,city); //calling function to update json data
        //  console.log(data);
          return data; // Return the data from the API
      })
      .catch(function(error) {
          // console.error('Error fetching data:', error);
      });
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
var map = L.map('map').setView([28.6139, 77.2090], 5); // Set initial center and zoom  [28.6139, 77.2090] for delhi [28.6139, 77.2090] for mumbai

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var geojsonLayer = L.geoJSON().addTo(map);
  // Load your GeoJSON data (replace 'your_data.geojson' with your data file)
// fetch('cities.json')
// .then(function(response) {
//     return response.json();
// })
// .then(function(data) {
//     // Function to style each feature based on its properties
//     function style(feature) {
//         var value = feature.properties.air_quality.co; // Replace 'value' with your data property name
//         return {
//             fillColor: getColor(value),
//             weight: 1,
//             opacity: 1,
//             color: 'white',
//             fillOpacity: 0.7
//         };
//     }

//     // Function to define color based on data value
//     function getColor(value) {
//         return d3.interpolateViridis(value / maxValue); // Adjust the color scale as needed
//     }

//     var maxValue = d3.max(data.features, function(feature) {
//         return feature.properties.air_quality.co;
//     });

//     // Add GeoJSON layer with styling
//     L.geoJSON(data, {
//         style: style
//     }).addTo(map);

//     // Add a legend (customize as needed)
//     var legend = L.control({ position: 'bottomright' });
//     legend.onAdd = function(map) {
//         var div = L.DomUtil.create('div', 'info legend');
//         var grades = [0, maxValue / 4, maxValue / 2, (3 * maxValue) / 4, maxValue];
//         var labels = [];

//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//                 '<i style="background:' + getColor(grades[i]) + '"></i> ' +
//                 grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//         }

//         return div;
//     };
//     legend.addTo(map);
// })
// .catch(function(error) {
//     console.error('Error loading GeoJSON:', error);
// });


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

  
 // geojsonLayer.addData(getjsonData);

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