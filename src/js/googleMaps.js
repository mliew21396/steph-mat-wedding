function initMaps() {

  var googleMapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2e5d4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5dac6"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5c6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d7c6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbfaf7"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#acbcc9"
            }
        ]
    }
  ];

  var ceremonyReceptionCoordinates = {lat: 42.1957536, lng: -87.9252177};

  var ceremonyReceptionMap = new google.maps.Map(document.getElementById('ceremony-reception-map'), {
      center: ceremonyReceptionCoordinates,
      zoom: 12,
      styles: googleMapStyle
  });

  var ceremonyReceptionMarker = new google.maps.Marker({
      title:"Cermony-Reception",
      position: ceremonyReceptionCoordinates,
      map: ceremonyReceptionMap,
      animation: google.maps.Animation.DROP
  });
}

window.initMaps = initMaps;