//  Carte des vélo

function createDetails() {
    var encart = document.getElementById("encart");

    var titreElt = document.createElement("h2"); // Création d'un élément h2
    titreElt.textContent = "Nom de la Station : ";
    var spanTitre = document.createElement("span");
    spanTitre.id = "stationName";
    titreElt.appendChild(spanTitre)

    var addressElt = document.createElement("p");
    addressElt.textContent = "Adresse : ";
    var spanAddress = document.createElement("span");
    spanAddress.id = "stationAddress";
    addressElt.appendChild(spanAddress);

    var standElt = document.createElement("p");
    standElt.textContent = "Place disponible : ";
    var spanStand = document.createElement("span");
    spanStand.id = "standAvailable";
    standElt.appendChild(spanStand);

    var bikeElt = document.createElement("p");
    bikeElt.textContent = "Nombre de vélo disponible : ";
    var spanBike = document.createElement("span");
    spanBike.id = "bikeAvailable";
    bikeElt.appendChild(spanBike)

    

    var boutonElt = document.createElement("input");
    boutonElt.type = "button";
    boutonElt.value = "Réserver";
    boutonElt.id = "boutonReservation";

    encart.appendChild(titreElt)
    encart.appendChild(addressElt)
    encart.appendChild(standElt)
    encart.appendChild(bikeElt)
    encart.appendChild(boutonElt)
}

// afficher la carte
var markers = [];

function initMap() {
    // map options
    var lyon = {
        lat: 45.75,
        lng: 4.85
    }
    // map Lyon
    map = new google.maps.Map(document.getElementById('map'), {
        center: lyon,
        zoom: 8
    });

    createDetails()

    // recuperer le fichier JSON de l'api JCDECAUX
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=da8ccbf843785573c0e411dfb308a5dc3a9e3b41", function (reponse) {
        var stations = JSON.parse(reponse);
        stations.forEach(function (station) {
            // faire un traitement sur ce fichier pour afficher les marqueurs sur la carte
            var marker = new google.maps.Marker({
                position: station.position,
                map: map,
            });
            markers.push(marker);
            // Ajout d'écouteur d'évènement
            marker.addListener('click', function () {
                var stationTitre = document.getElementById('stationName');
                stationTitre.textContent = '';
                stationTitre.textContent = station.name;
                var stationAddress = document.getElementById('stationAddress');
                stationAddress.textContent = "";
                stationAddress.textContent = station.address;
                var stand = document.getElementById('standAvailable');
                stand.textContent = "";
                stand.textContent = station.available_bike_stands;
                var bike = document.getElementById('bikeAvailable');
                bike.textContent = "";
                bike.textContent = station.available_bikes;
                var boutonResa = document.getElementById("boutonReservation");
                boutonResa.addEventListener("click", function () {
                    console.log("la station est :" + station.name);
                });

            });

            // fin marker

        }); // fin forEach
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

    });
}