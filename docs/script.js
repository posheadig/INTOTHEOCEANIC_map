const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';

function initMap() {
  
  //Create the Google Maps Object
  const map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 52, lng: -1.4},
    mapId: '84591267f7b3a201',
    tilt: 40.5,
    zoom: 7
  });
  
const colorRange = [
  [2, 152, 189],[73, 227, 206],[216, 254, 181],
  [254, 173, 84],[209, 55, 78]];
  
  //Create an HexagonLayer visualization
  const hexagonLayer = new deck.HexagonLayer({
    id: 'hexagon',
    colorRange,
    coverage: 1,
    data: fetch(DATA_URL)
      .then(response => response.arrayBuffer())
      .then(buffer => CSVLoader.parse(buffer)),
    elevationRange: [0, 3000],
    elevationScale: 50,
    extruded: true,
    getPosition: d => [d.lng, d.lat],
    radius: 1000
  });

//Create an overlay on Google Maps with the layer
  const overlay = new deck.GoogleMapsOverlay({
    layers: [hexagonLayer]
  });
  //add that overlay to the Google Map
  overlay.setMap(map);
}



initMap();