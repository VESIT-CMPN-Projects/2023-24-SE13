import { jsongovdataarray } from './jsondatafunc.js';

//  Get the modal element and close button
const govDataModal = document.getElementById('govDataModal');
const modalContent = document.getElementById('modalContent');
const spanClose = document.querySelector('.modal-content .close');

function fetchGovDataForCity(city) {
  var firstmatch = jsongovdataarray.find(element => element.properties.city === city);
  if (firstmatch) {
    const content = `
    <h2>Station: ${firstmatch.properties.station}</h2>
    <p>City: ${firstmatch.properties.city}</p>
    <p>State: ${firstmatch.properties.state}</p>
    <p>AQI: ${firstmatch.properties.aqi}</p>
    <p>SO2: ${firstmatch.properties.So2}</p>
    <p>NH3: ${firstmatch.properties.Nh3}</p>
    <p>Ozone: ${firstmatch.properties.Ozone}</p>
    <p>NO2: ${firstmatch.properties.No2}</p>
    <p>CO: ${firstmatch.properties.Co}</p>
    <p>PM2.5: ${firstmatch.properties.Pm25}</p>
    <p>PM10: ${firstmatch.properties.Pm10}</p>
    <p>Latitude: ${firstmatch.geometry.coordinates[0]}</p>
    <p>Longitude: ${firstmatch.geometry.coordinates[1]}</p>
    `;

    modalContent.innerHTML = content;
    govDataModal.style.display = 'block';
  }
}

// Close the modal when the close button is clicked
spanClose.addEventListener('click', function() {
  govDataModal.style.display = 'none';
});

export { fetchGovDataForCity };
