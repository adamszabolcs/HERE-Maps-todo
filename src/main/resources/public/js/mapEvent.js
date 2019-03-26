let mapEvent = {

    dblTap: function () {
        hereMap._map.addEventListener('dbltap', function(evt) {
            let coord = hereMap._map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            hereMap.createMarker(coord.lat, coord.lng);
        });
    }

};