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
            .then(this.getNearCategories());
    },

    sendToBackend: function(coord, title) {
        let response = JSON.stringify({
            lat : coord.lat,
            lng : coord.lng,
            title : title,
        });
        fetch("/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: response
        })
            .then(response => console.log("success: " + JSON.stringify(response)))
    },

    getNearCategories: function () {
        let url = "https://places.cit.api.here.com/places/v1/categories/places" +
            "?app_id=" + hereMap._app_id +
            "&app_code=" + hereMap._app_code +
            "&in=" + hereMap._center.lat + "," + hereMap._center.lng +
            ";r=2000" +
            "&pretty";
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
            })
    },

};