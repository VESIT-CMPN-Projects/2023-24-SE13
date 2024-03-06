import { jsongovdataarray } from './jsondatafunc.js';

// Function to get current date and time in the specified format
function getCurrentDateTime() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const currentDateFormatted = `${year}/${month}/${day}`;
  return `${currentTime} ${currentDateFormatted}`;
}

const govDataModal = document.getElementById('govDataModal');
const modalContent = document.getElementById('modalContent');
const navModel = document.querySelector('.nav-model');

function clearModalContent() {
  modalContent.innerHTML = ''; // Clear modal content
}

function clearCityName() {
  const cityNameElement = document.querySelector('.cityname');
  if (cityNameElement) {
    cityNameElement.textContent = ''; // Clear the city name content
  }
}

let aqiValue;

function fetchGovDataForCity(city) {
  clearModalContent(); // Clear existing modal content
  clearCityName(); // Clear city name in navbar
 
  var firstmatch = jsongovdataarray.find(
    (element) => element.properties.station === city
  );
  if(!firstmatch){
    firstmatch = jsongovdataarray.find(
      (element) => element.properties.city === city
    );
  }
  console.log("searched"+firstmatch,city)

  if (firstmatch) {
    aqiValue = firstmatch.properties.aqi; // Obtained AQI value for the city

    // Compare the AQI value with Indian standards
    let aqiCondition = '';
    if (aqiValue >= 0 && aqiValue <= 50) {
      aqiCondition = 'Good';
    } else if (aqiValue >= 51 && aqiValue <= 100) {
      aqiCondition = 'Satisfactory';
    } else if (aqiValue >= 101 && aqiValue <= 200) {
      aqiCondition = 'Moderate';
    } else if (aqiValue >= 201 && aqiValue <= 300) {
      aqiCondition = 'Poor';
    } else if (aqiValue >= 301 && aqiValue <= 400) {
      aqiCondition = 'Very Poor';
    } else if (aqiValue >= 401 && aqiValue <= 500) {
      aqiCondition = 'Severe';
    } else {
      aqiCondition = 'Out of Range';
    }

    const pollutants = {
      SO2: firstmatch.properties.So2,
      NH3: firstmatch.properties.Nh3,
      Ozone: firstmatch.properties.Ozone,
      NO2: firstmatch.properties.No2,
      CO: firstmatch.properties.Co,
      PM25: firstmatch.properties.Pm25,
      PM10: firstmatch.properties.Pm10,
    };

    let maxPollutantValue = -Infinity;
    let maxPollutant = '';

    // Iterate through pollutants to find the highest value and its corresponding pollutant
    for (const pollutant in pollutants) {
      if (pollutants.hasOwnProperty(pollutant)) {
        const value = pollutants[pollutant];
        if (!isNaN(value) && value > maxPollutantValue) {
          maxPollutantValue = value;
          maxPollutant = pollutant;
        }
      }
    }

    const pollutantsArray = Object.keys(pollutants).map((pollutant) => ({
      name: pollutant,
      value: pollutants[pollutant],
    }));

    // Sort pollutants with PM2.5 and PM10 at the top and other pollutants in descending order based on their values
    pollutantsArray.sort((a, b) => {
      if (
        (a.name === 'PM2.5' || a.name === 'PM10') &&
        (b.name !== 'PM2.5' && b.name !== 'PM10')
      ) {
        return -1; // Place PM2.5 and PM10 at the top
      } else if (
        (b.name === 'PM2.5' || b.name === 'PM10') &&
        (a.name !== 'PM2.5' && a.name !== 'PM10')
      ) {
        return 1; // Place PM2.5 and PM10 at the top
      } else if (isNaN(a.value) && isNaN(b.value)) {
        return 0;
      } else if (isNaN(a.value)) {
        return 1; // Place NaN at the end
      } else if (isNaN(b.value)) {
        return -1; // Place NaN at the end
      } else {
        return b.value - a.value;
      }
    });

    // Highlight the maximum value between PM2.5 and PM10 with text color
    const maxPMValue = Math.max(pollutants.PM25, pollutants.PM10);
    const maxPM = pollutantsArray.find(
      (item) => item.name === 'PM2.5' || item.name === 'PM10'
    );
    if (maxPM.value === maxPMValue) {
      maxPM.highlight = true;
    }

    let measuresToReducePollutant = '';

if (maxPollutant === 'CO') {
  measuresToReducePollutant = 'To reduce CO levels in the air, some measures include enhancing ventilation, reducing vehicle emissions, and limiting the use of household fuels like wood and coal.';
} else if (maxPollutant === 'Ozone') {
  measuresToReducePollutant = 'To decrease ozone levels, measures such as reducing vehicle emissions, using public transportation, and avoiding outdoor activities during peak pollution hours can be effective.';
} else if (maxPollutant === 'SO2') {
  measuresToReducePollutant = 'To mitigate SO2 levels, measures such as using low-sulfur fuels, installing emission control devices, and regulating industrial emissions are recommended.';
} else if (maxPollutant === 'NH3') {
  measuresToReducePollutant = 'To reduce NH3 levels, measures such as proper fertilizer application, avoiding excessive livestock waste, and reducing industrial emissions are advisable.';
} else if (maxPollutant === 'PM25') {
  measuresToReducePollutant = 'To lower PM2.5 levels, actions like using air purifiers, reducing vehicle emissions, and minimizing outdoor activities during high pollution periods can be effective.';
} else if (maxPollutant === 'PM10') {
  measuresToReducePollutant = 'To reduce PM10 levels, measures such as reducing dust from construction sites, using dust control methods, and avoiding burning of wood or other materials can be beneficial.';
} else if (maxPollutant === 'NO2') {
  measuresToReducePollutant = 'To mitigate NO2 levels, measures such as using public transportation, reducing vehicle emissions, and implementing stricter emission standards for industries are recommended.';
}


    const content = `
    <small class="Googlemaps"><a href="https://www.google.com/maps/search/?api=1&query=${firstmatch.geometry.coordinates[0]},${firstmatch.geometry.coordinates[1]}" target="_blank"><span class="fas fa-map-marker-alt"></span>See on Google Maps</a></small>
    <br><br>
    <small id="last-update">Last Update: </small><br>
    <small id="city">City: ${firstmatch.properties.city}</small>
    <br>
    <small>${firstmatch.properties.state}/Lat.: ${firstmatch.geometry.coordinates[0]}/Lon.: ${firstmatch.geometry.coordinates[1]}</small>
    <br><small>Timezone: Asia/Kolkata (UTC+5)/Current Time: ${getCurrentDateTime()}</small>
    <br>
    <h4 class="lower-head">AQI and pollutant values:</h4>
    <div class="aqi-info">
      <div class="aqi-pollutants1">
        <div class="aqi-box">
            <h1>AQI: ${aqiValue} </h1>
            <h4 class="aqi-condition">${aqiCondition}</h4>
        </div>
        <div class="person-img">
        </div>
      </div>
      <div class="vertical-line"></div>
      <div class="aqi-pollutants2">
      <table>
      <thead>
        <tr>
          <th style="border: 0px solid #000; padding: 8px 15px 0px 0px;"></th>
          <th style="border: 0px solid #000; padding: 8px 15px 0px 0px;">AQI (ug/m<sup>3</sup>)</th>
        </tr>
      </thead>
      <tbody>
        ${pollutantsArray.map(
          (pollutantData, index) => `
            <tr style="border: 0px solid #000;">
              <td style="border: 0px solid #000; padding: 8px 15px 0px 0px; ${
                index === 0 ? 'background-color: ;' : ''
              }" onclick="showPollutantInfo()">
                <span style="${index === 0 ? ': bold; ;' : ''}">${pollutantData.name}</span>
              </td>
              <td style="border: 0px solid #000; padding: 8px 15px 0px 0px; ${
                index === 0 ? '; ;' : ''
              }">
                ${pollutantData.value}
              </td>
            </tr>
          `
        ).join('')}
      </tbody>
    </table>
    <div id="pollution-container" style="display: none;">
      <div class="close-btn" onclick="hidePollutantInfo()"><span>&times;</span></div>
      <h2></h2>
      <div class="pollutant-information">
                    <div class="sci-diag">
                        <img src="ImagesOfSite/sci-diag.jpeg" width="150px">
                    </div>
                    <div class="values">
                        <p>24h avg</p>
                        <p>24h min</p>
                        <p>24h max</p>
                    </div>
      </div>
     </div>

   </div>    
     </div>
     
    
</div>
    <h4 class="standard">Standard AQI values</h4>
    <div class="standardtable">
      <img src="ImagesOfSite/aqi_modalchart.png" width="80%" height="80%">
    </div>
    <h4 class="pie-head">Distribution of Pollutants</h4>
    <canvas id="mypollutantsChart" width="100%" height="100px"></canvas>
    <div class="high-pollutant">
    <p>Highest Pollutant: ${maxPollutant}</p>
    <p>Highest Pollutant Value: ${maxPollutantValue} ug/m<sup>3</sup></p>
    <p>What can be done to reduce  ${maxPollutant} in the air?</p>
    <p>${measuresToReducePollutant}</p>
    </div>
    <div class="protection-section">
    <h5>Health Advice <i class="fa fa-exclamation-circle"></i></h5>
    <div class="protection-itemslist"> <div class="protection-item">
    <img src="ImagesOfSite/wear-mask-icon.webp" alt="Wear Mask">
    <p>Wear Mask</p>
    <p class="required">Required</p>
  </div>
  <div class="protection-item">
    <img src="ImagesOfSite/stay-indoors-icon.webp" alt="Stay Indoors">
    <p>Stay Indoors</p>
    <p class="required">Not Required</p>
  </div>
  <div class="protection-item">
    <img src="ImagesOfSite/Shut-Openings-icon-cross.webp" alt="Use Air Purifier">
    <p>Windows</p>
    <p class="required">Keep Close</p>
  </div>
  <div class="protection-item">
    <img src="ImagesOfSite/use-a-purifier-icon.webp" alt="Use Air Purifier">
    <p>Use Air Purifier</p>
    <p class="required">Required</p>
  </div>
  <div class="protection-item">
    <img src="ImagesOfSite/family-icon-cross.webp" alt="Use Air Purifier">
    <p>Family</p>
    <p class="required">Avoid Outdoor</p>
  </div></div>
    </div>


    
    
    
    <canvas id="myGaugeChart" width="100" height="100"></canvas>
  `;

    modalContent.innerHTML = content;

    const cityNameElement = document.createElement('h1');
    cityNameElement.classList.add('cityname');
    cityNameElement.textContent = firstmatch.properties.station;

    const spanClose = document.createElement('span');
    spanClose.classList.add('close');
    spanClose.innerHTML = '&times;';

    cityNameElement.appendChild(spanClose);
    navModel.innerHTML = ''; // Clear existing navbar content
    navModel.appendChild(cityNameElement);

    govDataModal.style.display = 'block';

    

// Creating the bar chart using Chart.js
const ctxBar = document.getElementById('mypollutantsChart').getContext('2d');

ctxBar.canvas.width = 100; // Set your desired width
ctxBar.canvas.height = 200; 

const pollutantsData = {
  NH3: firstmatch.properties.Nh3,
  CO: firstmatch.properties.Co,
  SO2: firstmatch.properties.So2,
  Ozone: firstmatch.properties.Ozone,
  NO2: firstmatch.properties.No2,
  PM25: firstmatch.properties.Pm25,
  PM10: firstmatch.properties.Pm10,
};

// Filter out pollutants with 0 values
const filteredLabels = [];
const filteredData = [];

Object.keys(pollutantsData).forEach((pollutant) => {
  const value = pollutantsData[pollutant];
  if (!isNaN(value) && value !== 0) {
    filteredLabels.push(pollutant);
    filteredData.push(value);
  }
});

const barChartData = {
  labels: filteredLabels,
  datasets: [
    { 
      label: 'Pollutant Values (ug/m^3)',
      data: filteredData,
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)', // Teal
  'rgba(255, 99, 132, 0.6)', // Red
  'rgba(255, 205, 86, 0.6)', // Yellow
  'rgba(255, 159, 64, 0.6)', // Orange
  'rgba(153, 102, 255, 0.6)', // Purple
  'rgba(255, 0, 0, 0.6)', // Dark Red
  'rgba(0, 128, 0, 0.6)', // Dark Green
      ],
      borderWidth: 1, // Add border width for better visibility
    },
  ],
};

new Chart(ctxBar, {
  type: 'bar',
  data: barChartData,
  options: {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Pollutants',
        },
        grid: {
          display: false, // Set to false to hide x-axis grid lines
        },
        font: {
          size: 80, // Increase font size as needed
        },

      },

      y: {
        display: true,
        title: {
          display: true,
          text: 'Pollutant Values (ug/m^3)',
        },
         grid: {
          display: false, // Set to false to hide x-axis grid lines
        },
        font: {
          size: 80, // Increase font size as needed
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Set to true if you want to display the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = barChartData.labels[context.dataIndex];
            const value = context.parsed.y;
            return `${label}: ${value} ug/m^3`;
          },
        },
      },
    },
  },
});

    

    spanClose.addEventListener('click', function () {
      govDataModal.style.display = 'none';
    });
  }
}

// Function to show the pollutant info container
function showPollutantInfo() {
  document.getElementById("pollution-container").style.display = "block";
}

// Function to hide the pollutant info container
function hidePollutantInfo() {
  document.getElementById("pollution-container").style.display = "none";
}




export { fetchGovDataForCity };