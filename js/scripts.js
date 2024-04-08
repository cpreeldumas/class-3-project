mapboxgl.accessToken = 'pk.eyJ1IjoiY3ByZWVsZHVtYXMiLCJhIjoiY2x1bHZ0dGJ0MGw4bTJpbGxwdm5jZmQ4cyJ9.ZusuHjH6O73kH4F2RmenWA';

var mapOptions = {
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // dark basemap
    center: [-73.96143, 40.73941], // starting position [lng, lat]
    zoom: 10, // starting zoom
    //hash: true
}

// instantiate the map
const map = new mapboxgl.Map(mapOptions);

// add a navitation control
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

// loop over the pizzaData array to make a marker for each record
ghgData.forEach(function (dataRecord) {

    var color

    // use if statements to assign colors based on pizzaData.program
    if (dataRecord.multifamily_housing_government_subsidized_housing === '100% Yes') {
        color = '#7dafff'
    }
    if (dataRecord.multifamily_housing_government_subsidized_housing === 'No') {
        color = '#faa141'
    }


    // create a popup to attach to the marker
    const popup = new mapboxgl.Popup({
        offset: 24,
        anchor: 'bottom'
    }).setHTML(`
    <h3>${dataRecord.address_1}</h3>
    <p>
        <strong>Total GHG Intensity:</strong> ${dataRecord.total_ghg_intensity} kgCO2e/ft2<br>
        <strong>Gross Floor Area:</strong> ${dataRecord.multifamily_housing_gross_floor_area_ft} sq. ft<br>
        <strong>Number of Residential Units:</strong> ${dataRecord.multifamily_housing_total_number_of_residential_living_units}<br>
        <strong>Year Built:</strong> ${dataRecord.year_built}
    </p>
`);

    // create a marker, set the coordinates, add the popup, add it to the map
    new mapboxgl.Marker({
        scale: 0.65,
        color: color
    })
        .setLngLat([dataRecord.longitude, dataRecord.latitude])
        .setPopup(popup)
        .addTo(map);
})

// Define a function to fly to a random marker and open its popup
function flyToRandomMarker() {
    // Get a random marker from your data
    const randomIndex = Math.floor(Math.random() * ghgData.length);
    const randomMarker = ghgData[randomIndex];

    // Fly the map to the coordinates of the random marker
    map.flyTo({
        center: [randomMarker.longitude, randomMarker.latitude],
        zoom: 14, // Adjust the zoom level as needed
        essential: true // Animation is considered essential, so it should be allowed during full-screen navigation UI
    });
}

// Attach an event listener to the button element
document.getElementById('flyToRandomMarker').addEventListener('click', flyToRandomMarker);

// Define a function to return to the home view
function returnToHome() {
    // Fly the map to the initial center and zoom level
    map.flyTo({
        center: [-73.96143, 40.73941], // Initial center coordinates
        zoom: 10, // Initial zoom level
        essential: true // Animation is considered essential, so it should be allowed during full-screen navigation UI
    });
}

// Attach an event listener to the "Return to Home" button
document.getElementById('returnToHome').addEventListener('click', returnToHome);

