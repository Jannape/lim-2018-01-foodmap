getMyUbication = () => {
  navigator.geolocation.getCurrentPosition = (pos) => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    let myUbication = new google.maps.LatLng(lat, lon);
    return myUbication;
  }
}
createObjMapOptions = (myUbication) => {
  const objMapOptions = {
    center: myUbication,
    zoom: 14,
    viewType: google.maps.mapTypeId.Map
  }
  return objMapOptions;
}
getInfoWindow = () => {
  infowindow = new google.maps.InfoWindow();
  return infowindow;
}

createRequestOfMap = (myUbication) => {
  const request = {
    location: myUbication,
    radius: 500,
    types: ['restaurant']
  };
  return request;
}

createMarkerOptions = (place,infowindow) => {
  // Creamos un marcador
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    
})}

getMarkerPlaceNearby = (map, request, infowindow) => {
  // Creamos el servicio PlaceService y enviamos la petición.
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
              let markerPlaceNearby = createMarkerOptions(results[i],infowindow);
              return markerPlaceNearby;
          }
      }
  });
}