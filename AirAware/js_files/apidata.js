export default function apidata (){
      // Sample key
  const api = "579b464db66ec23bdd00000139aeb6041bfa4c7263cda886ed404225";
  const criteria = { 'city': ["Greater Noida","Delhi"], 'pollutant_id': ["PM10", "PM2.5"] };
  //let data1,data2,data3,data4;
    var offset=0;
     var limit=1000;
  
  const promises = [];

  for (let i = 0; i < 4; i++) {
    promises.push(
      getData(api, criteria, offset + i * 1000, limit)
        .then(data => {
        //  console.log(data);
          return data;
        })
        .catch(error => {
          console.error("Error:", error);
          return []; // Return an empty array in case of an error to avoid breaking Promise.all
        })
    );
  }

  function combineAndSortData() {
    return Promise.all(promises)
      .then(arrayOfData => {
      //  console.log(arrayOfData);
        let combined = combineUniqueById(...arrayOfData.flat());
       // console.log("combined data" ,combined);
       
       // console.log("combined");
        return combined; // Returning the combined and sorted data
      })
      .catch(error => {
        console.error("Error:", error);
        return []; // Return an empty array in case of an error
      });
  }

  return combineAndSortData(); 
}


function getData(api, filters, offset, limit) {
    const baseUrl = "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69";
    const apiKey = api;
    const criteriaAll = Object.keys(filters).map(key => `${key}=${filters[key].map(value => encodeURIComponent(value)).join(",")}`);
    const url1 = `${baseUrl}?api-key=${apiKey}&format=json&offset=${offset}&limit=${limit}`;//${criteriaAll.join("&")
   // console.log(`${criteriaAll.join("&")}`);
    return fetch(url1)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const pollutionData = data.records;
            return pollutionData;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            return [];
        });
  }
  

 


function combineUniqueById(...arrays) {
    const combinedData = {};
   // console.log(arrays);
    
// To store unique and repeated IDs
const uniqueIds = new Set();
const repeatedIds = new Set();
const allIds = {}; // Optional: Use an object to count occurrences of each ID

// Iterate through the array
arrays.forEach(item => {
  const id = item.id;

  // Check if the ID has been encountered before
  if (uniqueIds.has(id)) {
    repeatedIds.add(id); // Add to repeated IDs set
  } else {
    uniqueIds.add(id); // Add to unique IDs set
  }

  // Optionally, count occurrences of each ID
  allIds[id] = allIds[id] ? allIds[id] + 1 : 1;
});

//console.log("Unique IDs:", Array.from(uniqueIds));
console.log("Repeated IDs:", Array.from(repeatedIds));
//console.log("Occurrences of all IDs:", allIds);

  
// Organizing the data by station and including constant fields
const stationData = {};

arrays.forEach(item => {
  const station = item.station;

  // Check if station exists in the 'stationData' object
  if (!stationData[station]) {
    // Create an entry for the station including constant fields
    stationData[station] = {
      country: item.country,
      state: item.state,
      city: item.city,
      station:item.station,
      latitude:parseFloat(item.latitude),
      longitude:parseFloat(item.longitude),
      last_update: item.last_update,
      aqi:0,
      // Add other constant fields...
      pollutants: {} // Initialize pollutants object to store pollutant data
    };
  }

  // Store pollutant data under the station
  const pollutantId = item.pollutant_id;
  
  stationData[station].pollutants[pollutantId] = {
    pollutant_avg: parseFloat(item.pollutant_avg),
    pollutant_max: parseFloat(item.pollutant_max),
    pollutant_min: parseFloat(item.pollutant_min),
   
    // Add other properties as needed
  };
  //console.log(station);
  stationData[station].aqi=calculateAQI(stationData[station].pollutants);
});
// Sort stations alphabetically based on state, city, and station
const sortedStations = Object.values(stationData).sort((a, b) => {
    if (a.state && b.state && a.state !== b.state) {
      return a.state.localeCompare(b.state);
    } else if (a.city && b.city && a.city !== b.city) {
      return a.city.localeCompare(b.city);
    } else if (a.station && b.station) {
      return a.station.localeCompare(b.station);
    }
    return 0; // Return 0 if properties are undefined or equal
  });

// Assign IDs to the sorted stations
const stationsWithIds = sortedStations.map((station, index) => {
  return {
    id: index + 1, // Assigning IDs starting from 1
    ...station
  };
});

console.log("station with id: ",stationsWithIds);

const uniquecitys = new Set();
const repeatedcitys = new Set();
const allcitys = {}; // Optional: Use an object to count occurrences of each ID

// Iterate through the array
stationsWithIds.forEach(item => {
  const city = item.city;

  // Check if the ID has been encountered before
  if (uniquecitys.has(city)) {
    repeatedcitys.add(city); // Add to repeated IDs set
  } else {
    uniquecitys.add(city); // Add to unique IDs set
  }

  // Optionally, count occurrences of each ID
  allcitys[city] = allcitys[city] ? allcitys[city] + 1 : 1;
});

//console.log("Unique cities:", Array.from(uniquecitys));
//console.log("Repeated cities:", Array.from(repeatedcitys));
//console.log("Occurrences of all cities:", allcitys);

    return stationsWithIds;
    //return Object.values(combinedData);
  }
  
  // Combine data from multiple arrays while ensuring uniqueness based on 'id'
  function calculateAQI(pollutants){
   // console.log("aqI",pollutants);
  function calculateAQIPM10(pm10) {
    if (isNaN(pm10)) {
      return 0;
    } else if (pm10 <= 50) {
      return pm10;
    } else if (pm10 > 50 && pm10 <= 100) {
      return pm10;
    } else if (pm10 > 100 && pm10 <= 250) {
      return 100 + ((pm10 - 100) * 100) / 150;
    } else if (pm10 > 250 && pm10 <= 350) {
      return 200 + (pm10 - 250);
    } else if (pm10 > 350 && pm10 <= 430) {
      return 300 + ((pm10 - 350) * (100 / 80));
    } else if (pm10 > 430) {
      return 400 + ((pm10 - 430) * (100 / 80));
    }
  }
  function calculateAQIPM25(pm25) {
    if (isNaN(pm25)) {
      return 0;
    } else if (pm25 <= 30) {
      return pm25 * (50 / 30);
    } else if (pm25 > 30 && pm25 <= 60) {
      return 50 + ((pm25 - 30) * (50 / 30));
    } else if (pm25 > 60 && pm25 <= 90) {
      return 100 + ((pm25 - 60) * (100 / 30));
    } else if (pm25 > 90 && pm25 <= 120) {
      return 200 + ((pm25 - 90) * (100 / 30));
    } else if (pm25 > 120 && pm25 <= 250) {
      return 300 + ((pm25 - 120) * (100 / 130));
    } else if (pm25 > 250) {
      return 400 + ((pm25 - 250) * (100 / 130));
    }
  }
  function calculateAQISO2(so2) {
    if (isNaN(so2)) {
      return 0;
    } else if (so2 <= 40) {
      return so2 * (50 / 40);
    } else if (so2 > 40 && so2 <= 80) {
      return 50 + ((so2 - 40) * (50 / 40));
    } else if (so2 > 80 && so2 <= 380) {
      return 100 + ((so2 - 80) * (100 / 300));
    } else if (so2 > 380 && so2 <= 800) {
      return 200 + ((so2 - 380) * (100 / 420));
    } else if (so2 > 800 && so2 <= 1600) {
      return 300 + ((so2 - 800) * (100 / 800));
    } else if (so2 > 1600) {
      return 400 + ((so2 - 1600) * (100 / 800));
    }
  }
  function calculateAQINO2(no2) {
    if (isNaN(no2)) {
      return 0;
    } else if (no2 <= 40) {
      return no2 * (50 / 40);
    } else if (no2 > 40 && no2 <= 80) {
      return 50 + ((no2 - 40) * (50 / 40));
    } else if (no2 > 80 && no2 <= 180) {
      return 100 + ((no2 - 80) * (100 / 100));
    } else if (no2 > 180 && no2 <= 280) {
      return 200 + ((no2 - 180) * (100 / 100));
    } else if (no2 > 280 && no2 <= 400) {
      return 300 + ((no2 - 280) * (100 / 120));
    } else if (no2 > 400) {
      return 400 + ((no2 - 400) * (100 / 120));
    }
  }
  function calculateAQICO(co) {
    if (isNaN(co)) {
      return 0;
    } else if (co <= 1) {
      return co * (50 / 1);
    } else if (co > 1 && co <= 2) {
      return 50 + ((co - 1) * (50 / 1));
    } else if (co > 2 && co <= 10) {
      return 100 + ((co - 2) * (100 / 8));
    } else if (co > 10 && co <= 17) {
      return 200 + ((co - 10) * (100 / 7));
    } else if (co > 17 && co <= 34) {
      return 300 + ((co - 17) * (100 / 17));
    } else if (co > 34) {
      return 400 + ((co - 34) * (100 / 17));
    }
  }
  function calculateAQIO3(o3) {
    if (isNaN(o3)) {
      return 0;
    } else if (o3 <= 50) {
      return o3 * (50 / 50);
    } else if (o3 > 50 && o3 <= 100) {
      return 50 + ((o3 - 50) * (50 / 50));
    } else if (o3 > 100 && o3 <= 168) {
      return 100 + ((o3 - 100) * (100 / 68));
    } else if (o3 > 168 && o3 <= 208) {
      return 200 + ((o3 - 168) * (100 / 40));
    } else if (o3 > 208 && o3 <= 748) {
      return 300 + ((o3 - 208) * (100 / 539));
    } else if (o3 > 748) {
      return 400 + ((o3 - 400) * (100 / 539));
    }
  }
  function calculateAQINH3(nh3) {
    if (isNaN(nh3)) {
      return 0;
    } else if (nh3 <= 200) {
      return nh3 * (50 / 200);
    } else if (nh3 > 200 && nh3 <= 400) {
      return 50 + ((nh3 - 200) * (50 / 200));
    } else if (nh3 > 400 && nh3 <= 800) {
      return 100 + ((nh3 - 400) * (100 / 400));
    } else if (nh3 > 800 && nh3 <= 1200) {
      return 200 + ((nh3 - 800) * (100 / 400));
    } else if (nh3 > 1200 && nh3 <= 1800) {
      return 300 + ((nh3 - 1200) * (100 / 600));
    } else if (nh3 > 1800) {
      return 400 + ((nh3 - 1800) * (100 / 600));
    }
  }



  const AQICO = calculateAQICO(pollutants.CO?.pollutant_max/1000 || 0);
  const AQINH3 = calculateAQINH3(pollutants.NH3?.pollutant_avg || 0);
  const AQINO2 = calculateAQINO2(pollutants.NO2?.pollutant_avg || 0);
  const AQIO3 = calculateAQIO3(pollutants.OZONE?.pollutant_max || 0);
  const AQIPM10 = calculateAQIPM10(pollutants.PM10?.pollutant_avg || 0);
  const AQIPM25 = calculateAQIPM25(pollutants["PM2.5"]?.pollutant_avg || 0);
  const AQISO2 = calculateAQISO2(pollutants.SO2?.pollutant_avg || 0);

  //console.log(AQICO, AQINH3, AQINO2, AQIO3, AQIPM10, AQIPM25, AQISO2);
  if(!(AQIPM10||AQIPM25)){
    return -1;
  }
  return Math.max(AQICO, AQINH3, AQINO2, AQIO3, AQIPM10, AQIPM25, AQISO2);

}

