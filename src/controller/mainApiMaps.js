let myUbication = getMyUbication();
let mapOptions = createObjMapOptions(myUbication);
let request = createRequestOfMap(myUbication);
let infowindow = getInfoWindow();
let autocomplete = document.getElementById('autocomplete');
let map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
let marker = getMarkerPlaceNearby(map, request, infowindow);
let autocomplete = document.getElementById('autocomplete');
// Asignamos el evento click del marcador
google.maps.event.addListener(marker, 'click', function () {
    getMarkerPlaceNearby = (map, request, infowindow)
});

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
