let map;
let infowindow;
function initMap() {
  console.log('me estan llamando soy initMap');
  // Creamos un mapa con las coordenadas actuales
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, lon);
    console.log(myLatlng);
    var mapOptions = {
      center: myLatlng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
    console.log(map);
    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow();

    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    var request = {
      location: myLatlng,
      radius: 500,
      types: ['restaurant']
    };

    // Creamos el servicio PlaceService y enviamos la petición.
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i]);
          console.log('soy results');
          console.log(results);
          console.log('lugARES CERCANOS ');
          console.log(results[i].name);


        }
      }
    });
  });
}

function crearMarcador(place) {
  // Creamos un marcador
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  var autocomplete = document.getElementById('autocomplete');
  const search = new google.maps.places.Autocomplete(autocomplete);
  console.log(search);
  search.bindTo("bounds", map);
}



