class Localizacion {
    constructor(callback) {
        if (navigator.geolocation) {
            //obtener ubicación 

            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                console.log(this.longitude);
                console.log(this.latitude);
                callback();

            });

        } else {
            alert("Tu navegador no soporta la geolicalitation");
        }
    }
}
