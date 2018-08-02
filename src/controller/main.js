var map;
var infowindow;

function initMap()
{
// Creamos un mapa con las coordenadas actuales
  navigator.geolocation.getCurrentPosition(function(pos) {

  lat = pos.coords.latitude;
  lon = pos.coords.longitude;

  var myLatlng = new google.maps.LatLng(lat, lon);

  var mapOptions = {
    center: myLatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  console.log('soy mapOoptions');
console.log(mapOptions);
  map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);
console.log(map);
  // Creamos el infowindow
  infowindow = new google.maps.InfoWindow();
  console.log('soy infowidnwos');
console.log(infowindow);
  // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
  var request = {
    location: myLatlng,
    radius: 5000,
    types: ['restaurant'||'food']
  };
  console.log('soy request');
console.log(request);
  // Creamos el servicio PlaceService y enviamos la petición.
  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        crearMarcador(results[i]);
        console.log('SOY EL QUE RECORRE  EL OBJETO REQUEST '); 
               console.log(results[i].name);
               console.log(results[i].vicinity);
               console.log(results[i].price_level);
               console.log(results[i].types[1]);
      }
    }
  });
});
}

function crearMarcador(place)
{
  // Creamos un marcador
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

// Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  }