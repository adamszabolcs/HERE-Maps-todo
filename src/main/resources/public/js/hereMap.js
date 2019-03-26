let hereMap = {

    _center: {
        lat: '',
        lng: '',
    },

    _app_id: "",
    _app_code: "",

    _error: null,

    _platform: null,
    _map: null,

    _zoom: "16",



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

    getApiKey: function () {
        fetch("/map")
            .then(response => response.json())
            .then(responseData => {
                this._app_code = responseData.hereMapsAppCode,
                this._app_id = responseData.hereMapsAppId
            })
            .then(this.setCoordinates());
    },

    renderMap: function () {
        this.createDivForMap();
        this._platform = new H.service.Platform({
            app_id: this._app_id,
            app_code: this._app_code,
            center: this._center,
            zoom: this._zoom
        });

        let layer = this._platform.createDefaultLayers();
        let container = document.getElementById("hereMap");

        this._map = new H.Map(container, layer.normal.map, {
            zoom: this._zoom,
            center: this._center,
        });

        var events = new H.mapevents.MapEvents(this._map);
        let behavior = new H.mapevents.Behavior(events);
        let ui = new H.ui.UI.createDefault(this._map, layer);
        behavior.disable(H.mapevents.Behavior.DBLTAPZOOM);
        this.addUserPosition();
        mapEvent.dblTap();
    },

    addUserPosition: function () {
        let icon = new H.map.Icon('./image/pin.png'),
            coords = {lat: this._center.lat, lng: this._center.lng},
            marker = new H.map.Marker(coords, {icon: icon});

        this._map.addObject(marker);
    },

    addMarker: function(lat, lng) {
        let icon = new H.map.Icon('./image/pin.png'),
            coords = {lat: lat, lng: lng},
            marker = new H.map.Marker(coords, {icon: icon});

        this._map.addObject(marker);
    },

    createDivForMap: function () {
        let appendableDiv = document.getElementById("mapplace");
        let appendedDiv = `<div id="hereMap" style="width: 100%; height: 400px; background-color: grey"></div>`;
        dom.appendToElement(appendableDiv, appendedDiv);
    },
};