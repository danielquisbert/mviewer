/*Ejemplo con mapbox local, los cambios adicionados con /// */
var layer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://ows.terrestris.de/osm/service',
    params: {
      'LAYERS': 'OSM-Overlay-WMS'
    }
  })
});

var ol2d = new ol.Map({
  layers: [
//    new ol.layer.Tile({
//      source: new ol.source.OSM()
//    })
      layer
  ]
  ,
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([25, 20], 'EPSG:4326', 'EPSG:3857'),
//    center: ol.proj.transform([25, 20], 'EPSG:4326', 'EPSG:900913'),
    zoom: 3
  })
});

var ol3d = new olcs.OLCesium({map: ol2d});
var scene = ol3d.getCesiumScene();
var terrainProvider = new Cesium.CesiumTerrainProvider({
    url : '//assets.agi.com/stk-terrain/world'
});
scene.terrainProvider = terrainProvider;

ol3d.setEnabled(true);
var camera = ol3d.getCamera();

var infoDiv = document.getElementById('infoDiv');
var printInfo = function() {
  infoDiv.innerHTML = 'Center: ' + camera.getCenter() + '<br />' +
                      'Distance: ' + camera.getDistance() + '<br />' +
                      'Heading: ' + camera.getHeading() + '<br />' +
                      'Tilt: ' + camera.getTilt() + '<br />' +
                      '<i>Position:</i> ' + camera.getPosition() + '<br />' +
                      '<i>Altitude:</i> ' + camera.getAltitude() + '<br />';
};
setInterval(printInfo, 100);
