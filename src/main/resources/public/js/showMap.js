let showmap = {
    _center: {
        lat: '',
        lng: '',
    },

    _app_id: null,
    _app_code: null,

    _error: null,

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
            appendedDiv = `<div className="App">
                <h4>Please allow location to use this website properly!</h4>
            </div>`;
        }
        this.appendToElement(rootDiv, appendedDiv);
    },

    appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();
        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prepend(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },

};