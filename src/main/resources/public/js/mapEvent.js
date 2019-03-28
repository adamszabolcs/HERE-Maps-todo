let mapEvent = {

    dblTap: function () {
        hereMap.map._map.addEventListener('dbltap', function(evt) {
            let coord = hereMap.map._map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            let title = "This is a marker";
            hereMap.createMarker(coord.lat, coord.lng, title);
            communication.sendTodoToBackend(coord, title);
        });
    },

    addBubbleInfo: function () {
        hereMap.map._group.addEventListener('tap', function (evt) {
            let bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
                content: evt.target.getData()
            });
            hereMap.map._ui.addBubble(bubble);
        }, false);
    }

};