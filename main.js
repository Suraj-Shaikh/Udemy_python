window.onload = init

function init() {

  var map = new ol.Map({
    view: new ol.View({
      center: ol.proj.fromLonLat([75.10494, 19.66939]),
      zoom: 8,
      rotation:0.5,
    }),

    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        title: 'Open Street Map',
        visible: true,
      }),
      new ol.layer.Tile({
        title: "India States",
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/Local_postgres/wms',
          params: { 'LAYERS': 'Local_postgres:nbss_all_soil_data', 'TILED': true },
          serverType: 'geoserver',
          visible: true
        }),
      })
    ],
    target: 'js-map',
    keyboardEventTarget:document
    // view: mapView
  })
  const popupContainerElement = document.getElementById('popup-coordinates');

  const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: 'center-right'
  })

  map.addOverlay(popup);

  map.on('click', function (e) {
    const clickedCoordinate = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clickedCoordinate);
    popupContainerElement.innerHTML = clickedCoordinate;
  })

  //DragRotate Interaction
  const DragRotateInteraction = new ol.interaction.DragRotate({
    condition:ol.events.condition.altKeyOnly
  })
map.addInteraction(DragRotateInteraction)

// Drow Interaction
};



