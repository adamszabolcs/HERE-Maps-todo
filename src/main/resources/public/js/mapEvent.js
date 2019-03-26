let mapEvent = {

    dblTap: function () {
        hereMap._map.addEventListener('dbltap', function(evt) {
            let coord = hereMap._map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            hereMap.createMarker(coord.lat, coord.lng);
            mapEvent.sendToBackend(coord);
        });
    },

    sendToBackend: function(coord) {
        fetch("/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(coord),
        })
            .then(response => console.log("success: " + JSON.stringify(response)))
    },

};