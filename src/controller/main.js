
  function initMap(){
    const ubicacion = new Localizacion(()=>{
        const options = {
            center: {
                lat: ubicacion.latitude,
                lng: ubicacion.longitude
            },
            zoom: 20 
        }
  
      
        var map = document.getElementById('map');
        mapa = new google.maps.Map(map,options); 

     console.log(mapa);
     console.log(options);
    });
}


