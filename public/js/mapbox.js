/* eslint-disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2FtdWVsd2ViYWxlbSIsImEiOiJjbGRrbjVjYnMwMzN0M3BycTBpdzhtcmJpIn0.chrSskLY82sls7ohRIuPSg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/samuelwebalem/cldktrydk000001mwynibfg38',
    scrollZoom: false,
  });
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.day} days: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });

}
  