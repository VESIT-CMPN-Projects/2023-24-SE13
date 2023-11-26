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
      "region": "maharashtra",
      "country": "india",
      "localtime": "gv",
      "localtime_epoch": "bhj",
      "weather": {
        "condition": "hb",
        "temp_c": 29,
        "humidity": 84,
        "is_day": 0,
        "wind_dir": "NW",
        "wind_kph": 6.8,
        "cloud": 25,
        "precip_in": 0,
        "precip_mm": 0
      },
      "air_quality": {
        "co": 2349.9,
        // "gb-defra-index": data.current.air_quality.gb-defra-index,
        "no2": 74.7,
        "o3": 0.8,
        "pm2_5": 140.8,
        "pm10": 229.5,
        "so2": 63.9,
        //  "us_epa_index": data.current.air_quality.us-epa-index
      }
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
  // { name: 'Bangalore', coordinates: [12.9716, 77.5946] },
  // { name: 'Hyderabad', coordinates: [17.3850, 78.4867] },
  // { name: 'Chennai', coordinates: [13.0827, 80.2707] },
  // { name: 'Kolkata', coordinates: [22.5726, 88.3639] },
  // { name: 'Pune', coordinates: [18.5204, 73.8567] },
  // { name: 'Ahmedabad', coordinates: [23.0225, 72.5714] },
  // { name: 'Jaipur', coordinates: [26.9124, 75.7873] },
  // { name: 'Surat', coordinates: [21.1702, 72.8311] },
  // { name: 'Lucknow', coordinates: [26.8467, 80.9462] },
  // { name: 'Kanpur', coordinates: [26.4499, 80.3319] },
  // { name: 'Nagpur', coordinates: [21.1458, 79.0882] },
  // { name: 'Indore', coordinates: [22.7196, 75.8577] },
  // { name: 'Thane', coordinates: [19.2183, 72.9781] },
  // { name: 'Bhopal', coordinates: [23.2599, 77.4126] },
  // { name: 'Visakhapatnam', coordinates: [17.6868, 83.2185] },
  // { name: 'Pimpri-Chinchwad', coordinates: [18.6279, 73.8001] },
  // { name: 'Patna', coordinates: [25.5941, 85.1376] },
  // { name: 'Vadodara', coordinates: [22.3072, 73.1812] },
  // { name: 'Ghaziabad', coordinates: [28.6692, 77.4538] },
  // { name: 'Ludhiana', coordinates: [30.9010, 75.8573] },
  // { name: 'Agra', coordinates: [27.1767, 78.0081] },
  // { name: 'Nashik', coordinates: [20.5937, 78.9629] },
  // { name: 'Ranchi', coordinates: [23.3441, 85.3096] },
  // { name: 'Faridabad', coordinates: [28.4089, 77.3178] },
  // { name: 'Coimbatore', coordinates: [11.0168, 76.9558] },
  // { name: 'Kochi', coordinates: [9.9312, 76.2673] },
  // { name: 'Madurai', coordinates: [9.9252, 78.1198] },
  // { name: 'Hubballi-Dharwad', coordinates: [15.3647, 75.1240] },
  // { name: 'Varanasi', coordinates: [25.3176, 82.9739] },
  // { name: 'Srinagar', coordinates: [34.0837, 74.7973] },
  // { name: 'Amritsar', coordinates: [31.6340, 74.8723] },
  // { name: 'Dhanbad', coordinates: [23.7957, 86.4304] },
  // { name: 'Allahabad', coordinates: [25.4358, 81.8463] },
  // { name: 'Ranchi', coordinates: [23.3441, 85.3096] },
  // { name: 'Meerut', coordinates: [28.6139, 77.2090] },
  // { name: 'Howrah', coordinates: [22.5958, 88.2636] },
  // { name: 'Jabalpur', coordinates: [23.1815, 79.9864] },
  // { name: 'Durgapur', coordinates: [23.5204, 87.3119] },
  // { name: 'Asansol', coordinates: [23.6739, 86.9527] },
  // { name: 'Nanded', coordinates: [19.1383, 77.3203] },
  // { name: 'Kolhapur', coordinates: [16.7050, 74.2433] },
  // { name: 'Ajmer', coordinates: [26.4691, 74.6390] },
  // { name: 'Gulbarga', coordinates: [17.3296, 76.8376] },
  // { name: 'Jamnagar', coordinates: [22.4707, 70.0577] },
  // { name: 'Ujjain', coordinates: [23.1765, 75.7885] },
  // { name: 'Loni', coordinates: [28.7526, 77.2882] },
];


function fetchDataloop(){
  for(let i=0; i<citieslist.length ; i++ ){
  fetchDataForCity(citieslist[i].name);
  }
}
function fetchDataForCity(city) {
  return fetch( `https://api.weatherapi.com/v1/current.json?key=0639f0668a854a0f8bd141747233108&q=${city}&aqi=yes` ) // Replace with your API endpoint
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
        
        updateJsonWithData(data); //calling function to update json data
        console.log(data);
          return data; // Return the data from the API
      })
      .catch(function(error) {
          console.error('Error fetching data:', error);
      });
}


var i=0; //counter for id of cities;

function updateJsonWithData(data) {

  function calculateAQI(C, index) {
    if (isNaN(C)) {
        return 0; // Handle cases where C is not a number (text or invalid input)
    }

    switch (index) {
        case 8:
            if (C <= 50) {
                return C;
            } else if (C > 50 && C <= 100) {
                return C;
            } else if (C > 100 && C <= 250) {
                return 100 + ((C - 100) * 100) / 150;
            } else if (C > 250 && C <= 350) {
                return 200 + (C - 250);
            } else if (C > 350 && C <= 430) {
                return 300 + (C - 350) * (100 / 80);
            } else if (C > 430) {
                return 400 + (C - 430) * (100 / 80);
            }
            break;
        case 10:
            if (C <= 30) {
                return (C * 50) / 30;
            } else if (C > 30 && C <= 60) {
                return 50 + ((C - 30) * 50) / 30;
            } else if (C > 60 && C <= 90) {
                return 100 + ((C - 60) * 100) / 30;
            } else if (C > 90 && C <= 120) {
                return 200 + ((C - 90) * 100) / 30;
            } else if (C > 120 && C <= 250) {
                return 300 + ((C - 120) * 100) / 130;
            } else if (C > 250) {
                return 400 + ((C - 250) * 100) / 130;
            }
            break;
        case 12:
            if (C <= 40) {
                return (C * 50) / 40;
            } else if (C > 40 && C <= 80) {
                return 50 + ((C - 40) * 50) / 40;
            } else if (C > 80 && C <= 180) {
                return 100 + ((C - 80) * 100) / 100;
            } else if (C > 180 && C <= 280) {
                return 200 + ((C - 180) * 100) / 100;
            } else if (C > 280 && C <= 400) {
                return 300 + ((C - 280) * 100) / 120;
            } else if (C > 400) {
                return 400 + ((C - 400) * 100) / 120;
            }
            break;
        case 14:
              if (C <= 40) {
                return (C * 50) / 40;
            } else if (C > 40 && C <= 80) {
                return 50 + ((C - 40) * 50) / 40;
            } else if (C > 80 && C <= 180) {
                return 100 + ((C - 80) * 100) / 100;
            } else if (C > 180 && C <= 280) {
                return 200 + ((C - 180) * 100) / 100;
            } else if (C > 280 && C <= 400) {
                return 300 + ((C - 280) * 100) / 120;
            } else if (C > 400) {
                return 400 + ((C - 400) * 100) / 120;
            }
            break;
        case 16:
           C= C*0.001;
            if (C <= 50) {
                return (C * 50) / 50;
            } else if (C > 50 && C <= 100) {
                return 50 + ((C - 50) * 50) / 50;
            } else if (C > 100 && C <= 168) {
                return 100 + ((C - 100) * 100) / 68;
            } else if (C > 168 && C <= 208) {
                return 200 + ((C - 168) * 100) / 40;
            } else if (C > 208 && C <= 748) {
                return 300 + ((C - 208) * 100) / 539;
            } else if (C > 748) {
                return 400 + ((C - 400) * 100) / 539;
            }
            break;
        case 18:
            if (C <= 200) {
                return (C * 50) / 200;
            } else if (C > 200 && C <= 400) {
                return 50 + ((C - 200) * 50) / 200;
            } else if (C > 400 && C <= 800) {
                return 100 + ((C - 400) * 100) / 400;
            } else if (C > 800 && C <= 1200) {
                return 200 + ((C - 800) * 100) / 400;
            } else if (C > 1200 && C <= 1800) {
                return 300 + ((C - 1200) * 100) / 600;
            } else if (C > 1800) {
                return 400 + ((C - 1800) * 100) / 600;
            }
            break;
        case 20:
            if (C <= 2000) {
                return (C * 50) / 2000;
            } else if (C > 2000 && C <= 3000) {
                return 50 + ((C - 2000) * 50) / 1000;
            } else if (C > 3000 && C <= 4000) {
                return 100 + ((C - 3000) * 100) / 1000;
            } else if (C > 4000 && C <= 5000) {
                return 200 + ((C - 4000) * 100) / 1000;
            } else if (C > 5000 && C <= 10000) {
                return 300 + ((C - 5000) * 100) / 5000;
            } else if (C > 10000) {
                return 400 + ((C - 10000) * 100) / 5000;
            }
            break;    
        default:
            return 0; // Handle cases where the index is not recognized
    }
}
let subi_co   =calculateAQI(data.current.air_quality.co ,16);
let subi_no2  =calculateAQI(data.current.air_quality.no2,14);
let subi_o3   =calculateAQI(data.current.air_quality.o3,18);
let subi_pm2_5=calculateAQI(data.current.air_quality.pm2_5,10);
let subi_pm10 =calculateAQI(data.current.air_quality.pm10,8);
let subi_so2  =calculateAQI(data.current.air_quality.so2,12);

console.log("AQI for CO: " + subi_co);
console.log("AQI for NO2: " + subi_no2);
console.log("AQI for O3: " + subi_o3);
console.log("AQI for PM2.5: " + subi_pm2_5);
console.log("AQI for PM10: " + subi_pm10);
console.log("AQI for SO2: " + subi_so2);

var caledAqi = Math.max(subi_co   
  ,subi_no2  
  ,subi_o3   
  ,subi_pm2_5
  ,subi_pm10 
  ,subi_so2  );

  console.log(caledAqi+" is of "+data.location.name);


  // Update the map based on the data
  // You can use this function to update map markers, colors, or any other visual elements
i++;
  // Load the template GeoJSON file
// fetch('cities.json')
// .then(function(response) {
//   return response.json();
// })
// .then(function(templateData) {
//   // Initialize the GeoJSON data with the template
//   var geojsonData = templateData;

  // Now you have an empty GeoJSON structure to which you can add city data

  // Perform CRUD operations to add data for 100 cities
  // Add features to geojsonData.features for each city
  // Example:
  getjsonData.push( {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [data.location.lon, data.location.lat]
    },
    "properties": {
      "id":i,
      "name": data.location.name,
      "region": data.location.region,
      "country": data.location.country,
      "localtime": data.location.localtime,
      "localtime_epoch": data.location.localtime_epoch,
      "weather": {
        "condition": data.current.condition.text,
        "temp_c": data.current.temp_c,
        "humidity": data.current.humidity,
        "is_day": data.current.is_day,
        "wind_dir": data.current.wind_dir,
        "wind_kph": data.current.wind_kph,
        "cloud": data.current.cloud,
        "precip_in": data.current.precip_in,
        "precip_mm": data.current.precip_mm
      },
      "air_quality": caledAqi
      // {
      //   "co": data.current.air_quality.co,
      //   // "gb-defra-index": data.current.air_quality.gb-defra-index,
      //   "no2": data.current.air_quality.no2,
      //   "o3": data.current.air_quality.o3,
      //   "pm2_5": data.current.air_quality.pm2_5,
      //   "pm10": data.current.air_quality.pm10,
      //   "so2": data.current.air_quality.so2,
      //   // "us-epa-index": data.current.air_quality.us-epa-index
      // }
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

  // You may want to customize the marker icon and popup content
  geojsonLayer.eachLayer(function (layer) {
    var feature = layer.feature;
    var coordinates = feature.geometry.coordinates;
    var name = feature.properties.name;
    var co = feature.properties.air_quality;

    layer.bindPopup(`City: ${name}<br>AQI: ${co}`).openPopup();
  });

  // Update the legend or any other map elements as needed
}

  // Update the legend or any other map elements as needed
