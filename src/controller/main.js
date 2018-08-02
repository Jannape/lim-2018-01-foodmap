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
      mapTypeId: google.maps.MapTypeId.Map
    };

    map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
    console.log(map);
    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow();

    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    let request = {
      location: myLatlng,
      radius: 1000,
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
  console.log('soy el marcador ');
  console.log(marker);
  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {

    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  var autocomplete = document.getElementById('autocomplete');
  const search = new google.maps.places.Autocomplete(autocomplete);
  console.log(search);
  search.bindTo("bounds", map);

  search.addListener('place_changed', function () {
    infowindow.close();
    marker.setVisible(false);
    var place = search.getPlace();
    console.log(place);
    //geometry nos permite saber calculos de la superficie
    if (!place.geometry.viewport) {
      window.alert('Error al mostrar el lugar');
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(14);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    let address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || ''),

      ];
    }
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
}



