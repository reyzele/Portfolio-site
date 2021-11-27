import GoogleMapsLoader from "google-maps";

export default function() {
  GoogleMapsLoader.KEY = "AIzaSyD6eW8zDiHL0CeU2kFhEuP_BDBb0AINmxs";
  GoogleMapsLoader.load(function(google) {
    new google.maps.Map(document.getElementById("map"), {
      center: { lat: 31.5178348, lng: 34.5949618 },
      zoom: 12,

      styles: [
        { elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        {
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ffffff", stroke: 1 }]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#455a64" }]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#263c3f" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#455a64" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#61dac9" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#61dac9" }]
        }
      ]
    });
  });
}
