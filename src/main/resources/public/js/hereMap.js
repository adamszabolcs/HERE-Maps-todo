let hereMap = {

    _center: {
        lat: '',
        lng: '',
    },

    _app_id: "",
    _app_code: "",

    _error: null,

    _zoom: "16",

    map: {
        _platform: null,
        _map: null,
        _ui: null,
        _events: null,
        _behavior: null,
        _group: null,
    },

    setCoordinates: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this._center.lat = position.coords.latitude;
                    this._center.lng = position.coords.longitude;
                    this.showMap();
                }, (error) => {
                    this._error = error.message;
                }
            );
        } else {
            this.showMap();
        }
    },

    showMap: function () {
        let rootDiv = document.getElementById("root");
        let appendedDiv = "";
        if (this._center.lat !== '') {
            appendedDiv = `<div class="app" id="mapplace">
                                </div>`;
        } else {
            appendedDiv = `<div class="app">
                                <h4>Please allow location to use this website properly!</h4>
                            </div>`;
        }
        dom.appendToElement(rootDiv, appendedDiv);
        hereMap.renderMap();
    },

    renderMap: function () {
        this.createDivForMap();
        this.map._platform = new H.service.Platform({
            app_id: this._app_id,
            app_code: this._app_code,
            center: this._center,
            zoom: this._zoom
        });

        let layer = this.map._platform.createDefaultLayers();
        let container = document.getElementById("hereMap");

        this.map._map = new H.Map(container, layer.normal.map, {
            zoom: this._zoom,
            center: this._center,
        });
        this.map._events = new H.mapevents.MapEvents(this.map._map);
        this.map._behavior = new H.mapevents.Behavior(this.map._events);
        this.map._ui = new H.ui.UI.createDefault(this.map._map, layer);
        this.map._group = new H.map.Group();
        this.map._map.addObject(this.map._group);
        this.map._behavior.disable(H.mapevents.Behavior.DBLTAPZOOM);
        this.addUserPosition();
        communication.getMarkers();
        mapEvent.dblTap();
        this.searchForCategory();
    },

    createMarker: function(lat, lng, data) {
        let icon = new H.map.Icon('./image/pin.png'),
            coords = {lat: lat, lng: lng},
            marker = new H.map.Marker(coords, {icon: icon});
        marker.setData(data);

        this.map._group.addObject(marker);
    },

    addMarkersToMap: function (markers) {
        for (marker of markers) {
            this.createMarker(marker.latitude, marker.longitude, marker.title);
        }
    },

    addUserPosition: function () {
        let icon = new H.map.Icon('./image/pin.png'),
            coords = {lat: this._center.lat, lng: this._center.lng},
            marker = new H.map.Marker(coords, {icon: icon});

        marker.setData("Here you are!");

        this.map._group.addObject(marker);
        mapEvent.addBubbleInfo();
    },

    createDivForMap: function () {
        let appendableDiv = document.getElementById("mapplace");
        let appendedDiv = `<div id="hereMap" style="width: 100%; height: 400px; background-color: grey"></div>`;
        dom.appendToElement(appendableDiv, appendedDiv);
    },

    searchForCategory: function () {
        let explore = new H.places.Explore(this.map._platform.getPlacesService()), exploreResult, error;

        let params = {
            'cat' : 'petrol-station',
            'in' : this._center.lat + ',' + this._center.lng + ";r=2000"
        };

        explore.request(params, {}, onResult, onError);

        function onResult(data) {
            exploreResult = data;
        }

        function onError(data) {
            error = data;
        }

    }
};