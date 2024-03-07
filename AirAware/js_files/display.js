import { jsongovdataarray } from './jsondatafunc.js';
import { showsuggonmap } from './script.js';
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
  if (!firstmatch) {
    firstmatch = jsongovdataarray.find(
      (element) => element.properties.city === city
    );
  }
  showsuggonmap(jsongovdataarray,firstmatch.properties.city)

  console.log("searched" + firstmatch, city)

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
    // Get the image element
var personImage = document.getElementById('personImage');

// Function to update the image based on AQI condition

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

            // Define the function to show pollutant information
      function showPollutantInfo(pollutant) {
        console.log("PollutantInfo function called")
        const pollutantInfo = document.getElementById('pollutant-info');
        pollutantInfo.innerHTML = `Information for ${pollutant}`;
      }

      // Add event listeners to each button
      document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const pollutant = this.getAttribute('data-pollutant');
                showPollutantInfo(pollutant);
            });
        });
      });
    const content = `
    <small class="Googlemaps"><a href="https://www.google.com/maps/search/?api=1&query=${firstmatch.geometry.coordinates[0]},${firstmatch.geometry.coordinates[1]}" target="_blank"><span class="fas fa-map-marker-alt"></span>See on Google Maps</a></small>
    <br><br>
    <small id="last-update">Last Update:${firstmatch.properties.last_update} </small><br>
    <small id="city">City: ${firstmatch.properties.city}</small>
    <br>
    <small>${firstmatch.properties.state}/Lat.: ${firstmatch.geometry.coordinates[0]}/Lon.: ${firstmatch.geometry.coordinates[1]}</small>
    <br><small>Timezone: Asia/Kolkata (UTC+5)/Current Time: ${getCurrentDateTime()}</small>
    <br>
    <h4 class="lower-head">AQI and pollutant values:</h4>
    <div class="aqi-info">
      <div class="aqi-pollutants1">
        <div class="aqi-box" style="background-color: ${getAqiColor(aqiValue)}; ">
            <h1>AQI: ${aqiValue} </h1>
            <h4 class="aqi-condition">${aqiCondition}</h4>
        </div>
        <div class="person-img">
            <img id="personImage" src="ImagesOfSite/person.png">
        </div>
      </div>
      <div class="vertical-line"></div>
      <div class="aqi-pollutants2">
        <ul class="button-list" id="pollutantButtons">
          <li><button class="button" data-pollutant="PM10">PM10</button></li>
          <li><button class="button" data-pollutant="CO">CO</button></li>
          <li><button class="button" data-pollutant="PM25">PM2.5</button></li>
          <li><button class="button" data-pollutant="Ozone">Ozone</button></li>
          <li><button class="button" data-pollutant="NO2">NO2</button></li>
          <li><button class="button" data-pollutant="SO2">SO2</button></li>
          <li><button class="button" data-pollutant="NH3">NH3</button></li>
        </ul>
        <div id="pollutant-info">
          <div id="sci-img"><img src="ImagesOfSite/sci-diag.jpeg" width="150px"></div>
          <div id="avgminmax">
            <p>24H avg:</p>
            <p>24 Min:</p>
            <p>24H Max:</p>
          </div>
        
        </div>
    </div>

     
    
</div>
    <h4 class="standard">Standard AQI values</h4>
    <div class="standardtable">
      <img src="ImagesOfSite/aqi_modalchart.png" width="80%" height="80%">
    </div>
    <h4 class="pie-head">Distribution of Pollutants</h4>
    <canvas id="mypollutantsChart" width="250px"></canvas>
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

    const aqidataDiv = document.querySelector(".aqidata");
    function updateImage(aqi) {
      var personImage = document.getElementById('personImage');
       if(personImage){
        console.log("done")
       }
       else{
        console.log("sorry not done")
       }
        if (aqi >= 0 && aqi <= 50) {
            personImage.src = "ImagesOfSite/aqi_0_50.png";
        } else if (aqi > 50 && aqi <= 100) {
            personImage.src = "ImagesOfSite/aqi_50_100.png";
        } else if (aqi > 100 && aqi <= 200) {
            personImage.src = "ImagesOfSite/aqi_100_200.png";
        } else if (aqi > 200 && aqi <= 300) {
            personImage.src = "ImagesOfSite/aqi_200_300.png";
        } else if (aqi > 300 && aqi <= 400) {
            personImage.src = "ImagesOfSite/aqi_300_400.png";
        } else if (aqi > 400 && aqi <= 500) {
            personImage.src = "ImagesOfSite/aqi_400_500.png";
        } else {
            personImage.src = "ImagesOfSite/default-person.png"; // Default image for other conditions
        }
    }
    updateImage(`${aqiValue}`);
    function getAqiColor(aqiValue) {
      if (aqiValue >= 0 && aqiValue <= 50) {
          return 'rgba(0, 128, 0, 0.6)'; // Green
      } else if (aqiValue >= 51 && aqiValue <= 100) {
          return 'rgba(144, 238, 144, 0.6)'; // Light Green
      } else if (aqiValue >= 101 && aqiValue <= 150) {
          return 'rgba(255, 255, 0, 0.6)'; // Yellow
      } else if (aqiValue >= 151 && aqiValue <= 200) {
          return 'rgba(255, 165, 0, 0.6)'; // Orange
      } else if (aqiValue >= 201 && aqiValue <= 300) {
          return 'rgba(255, 0, 0, 0.6)'; // Red
      } else if (aqiValue >= 301 && aqiValue <= 500) {
          return 'rgba(128, 0, 128, 0.6)'; // Purple
      } else {
          return 'rgba(128, 128, 128, 0.6)'; // Default color (grey)
      }
  }
  
    // // Check if the element is found
    // if (aqidataDiv) {
    //   // Add the onclick event listener to the element
    //   aqidataDiv.addEventListener("click", function () {
    //     // Your desired function to be executed when clicked
    //     console.log("AQI data clicked!");
    //     showPollutantInfo()
    //     // Replace this with your actual code logic
    //     // (e.g., display details, open a modal, etc.)
    //   });
    // } else {
    //   console.error("Element with class .aqidata not found!");
    // }

  

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
    
    // Assign colors based on specified pollutants using the same logic as createRectangleMarker
    const backgroundColors = filteredLabels.map((pollutant) => {
      switch (pollutant) {
        case 'NH3':
          return 'rgba(0, 128, 0, 0.5)'; // Green
        case 'CO':
          return 'rgba(0, 0, 255, 0.5)'; // Blue
        case 'SO2':
          return 'rgba(255, 255, 0, 0.7)'; // Yellow
        case 'Ozone':
          return 'rgba(255, 165, 0, 0.5)'; // Orange
        case 'NO2':
          return 'rgba(255, 0, 0, 0.5)'; // Red
        case 'PM25':
          return 'rgba(0, 0, 0, 0.5)'; // Black
        case 'PM10':
          return 'rgba(128, 0, 128, 0.5)'; // Purple
        default:
          return 'rgba(128, 128, 128, 0.5)'; // Grey
      }
    });
    
    const barChartData = {
      labels: filteredLabels,
      datasets: [
        { 
          label: 'Pollutant Values (ug/m^3)',
          data: filteredData,
          backgroundColor: backgroundColors,
          borderWidth: 1, // Add border width for better visibility
        },
      ],
    };
    
    const barChartData2 = {
      labels: ['Pollutant1', 'Pollutant2', 'Pollutant3'],
      datasets: [{
        label: 'Pollutant Values (ug/m^3)',
        data: [10, 20, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Pollutants',
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 14,
              color:"black",
              weight:"bold"
            },
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Pollutant Values (ug/m^3)',
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 14,
              color:"black",
              weight:"bold"
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
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
    };

    new Chart('mypollutantsChart', {
      type: 'bar',
      data: barChartData,
      options: options,
    });



    spanClose.addEventListener('click', function () {
      govDataModal.style.display = 'none';
    });
  }
}





export { fetchGovDataForCity };