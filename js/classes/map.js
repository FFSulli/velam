// Construction de l'objet GoogleMap

class GoogleMap {
    constructor(latGmap, lngGmap, zoomGmap) {
        this.latGmap = latGmap
        this.lngGmap = lngGmap
        this.zoomGmap = zoomGmap
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: this.latGmap, lng: this.lngGmap },
            zoom: this.zoomGmap,
            gestureHandling: 'greedy',
            styles: [
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#e0efef"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "hue": "#1900ff"
                        },
                        {
                            "color": "#c0e8e8"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 700
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#7dcdcd"
                        }
                    ]
                }
            ]
        })
    }
    get latGmap() {
        return this._latGmap;
    }
    set latGmap(value) {
        if (typeof value === "number")
            this._latGmap = value;
    }
    get lngGmap() {
        return this._lngGmap;
    }
    set lngGmap(value) {
        if (typeof value === "number")
            this._lngGmap = value;
    }
    get zoomGmap() {
        return this._zoomGmap;
    }
    set zoomGmap(value) {
        if (typeof value === "number")
            this._zoomGmap = value;
    }
}