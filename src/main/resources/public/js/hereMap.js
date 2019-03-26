let map = {

    _center: {
        lat: '',
        lng: '',
    },

    _app_id: "Hcu7cDJnXgzkmNhIrujH",
    _app_code: "rJFx0NRya2Y5FdWQehEDkg",

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
            return null;
        }
    },

    showMap: function () {
        let rootDiv = document.getElementById("root");
        let appendedDiv = "";
        if (this._center.lat !== '') {
            appendedDiv = `<div class="app" id="mapplace">
                                    <h4>Write out this!</h4>
                                </div>`;
        } else {
            appendedDiv = `<div class="app">
                <h4>Please allow location to use this website properly!</h4>
            </div>`;
        }
        dom.appendToElement(rootDiv, appendedDiv);
        map.renderMap();
    },

    renderMap: function () {
        this.createDivForMap();
        this._platform = new H.service.Platform({
            app_id: dom._app_id,
            app_code: dom._app_code,
            center: dom._center,
            zoom: this._zoom
        });

        let layer = this._platform.createDefaultLayers();
        let container = document.getElementById("map");

        this._map = new H.Map(container, layer.normal.map, {
            zoom: this._zoom,
            center: dom._center,
        });

        let events = new H.mapevents.MapEvents(this._map);
        let behavior = new H.mapevents.Behavior(events);
        let ui = new H.ui.UI.createDefault(this._map, layer);
        this.addUserPosition();
    },

    addUserPosition: function () {
        let icon = new H.map.Icon('pin.png'),
            coords = {lat: dom._center.lat, lng: dom._center.lng},
            marker = new H.map.Marker(coords, {icon: icon});

        this._map.addObject(marker);
    },

    createDivForMap: function () {
        let appendableDiv = document.getElementById("mapplace");
        let appendedDiv = `<div id="map" style="width: 100%; height: 400px; background-color: grey"></div>`;
        dom.appendToElement(appendableDiv, appendedDiv);
    },
};