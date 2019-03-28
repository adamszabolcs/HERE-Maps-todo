let fetches = {


    getApiKey: function () {
        fetch("/map")
            .then(response => response.json())
            .then(responseData => {
                hereMap._app_code = responseData.hereMapsAppCode,
                    hereMap._app_id = responseData.hereMapsAppId
            })
            .then(hereMap.setCoordinates());
    },

    getMarkers: function () {
        fetch("/list")
            .then(response => response.json())
            .then(responseData => {
                hereMap._markers = responseData;
                hereMap.addMarkersToMap();
            })
    },
};