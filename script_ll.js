var submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  callit();

  console.log("button clicked");
});

var submit = document.getElementById("submit2");
submit.addEventListener("click", () => {
  fetchDataloop();

  console.log("button reload clicked");
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
      }
     }
  
];

let outputcall;

function callit() {
    city= cityin.value
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'YOUR_API_KEY'
    },
    params: {
      q: city,
      // Other parameters as needed
    }
  };

  // Use backticks (`) for template literals
  var url = `https://api.weatherapi.com/v1/current.json?key=0639f0668a854a0f8bd141747233108&q=${options.params.q}&aqi=yes`;

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response as JSON
    })
    .then(data => {
      // Handle the JSON data here
      outputcall = data;
      // console.log(outputcall.current); //only for air quality data
      // console.log(outputcall.current); for all current data of that location
     update();
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });
}

function update() {
  output.innerText = " Co of air quality index is "+ outputcall.current.air_quality.co;
  
}


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
  { name: 'Meerut', coordinates: [28.6139, 77.2090] },
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
  { name: 'Loni', coordinates: [28.7526, 77.2882] },
];


function fetchDataloop(){
  for(let i=0; i<citieslist.length ; i++ ){
  fetchDataForCity(citieslist[i].name);
  }
}
function fetchDataForCity(city) {
  return fetch( `https://api.waqi.info/feed/${city}/?token=26cae8703d2177a6f0be5b5557ca009d2f56ace0` ) // Replace with your API endpoint
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
        
        updateJsonWithData(data,city); //calling function to update json data
        console.log(data);
          return data; // Return the data from the API
      })
      .catch(function(error) {
          console.error('Error fetching data:', error);
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
      "aqi":data.data.aqi 
    }
  });

  updateMapWithData();
 } // Save the updated GeoJSON data back to a JSON file (see step 4 below)
// })
// // .catch(function(error) {
// //   console.error('Error loading template GeoJSON:', error);
// // });
// }


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

  // Add the new data to the GeoJSON layer
  geojsonLayer.addData(getjsonData);
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
    feature.properties.aqi // Intensity value from properties
]);

// Create a Heatmap layer
var heatLayer = L.heatLayer(heatData, {
    radius: 70, // Adjust the radius of the heatmap points
    blur: 15,
    // gradient: {gradient} 
    // Adjust the blur radius
})
// Get the canvas element from the heatmap layer


// Add the heatmap layer to the map
heatLayer.addTo(map);




  // You may want to customize the marker icon and popup content
  geojsonLayer.eachLayer(function (layer) {
    var feature = layer.feature;
    var coordinates = feature.geometry.coordinates;
    var name = feature.properties.name;
    var co = feature.properties.aqi;

    layer.bindPopup(`City: ${name}<br>AQI: ${co}`).openPopup();
  });

  // Update the legend or any other map elements as needed
}

  // Update the legend or any other map elements as needed
