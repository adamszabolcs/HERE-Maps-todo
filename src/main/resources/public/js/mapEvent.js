let mapEvent = {

    _coord: null,

    openModal: function () {
        $('#exampleModal').on('show.bs.modal', function (event) {
            $('#exampleModal').modal('show');
        })
    },

    sendInfoFromModal: function () {
        let todoTitle = document.getElementById("message-text").value;
        hereMap.createMarker(mapEvent._coord.lat, mapEvent._coord.lng, todoTitle);
        communication.sendTodoToBackend(mapEvent._coord, todoTitle);
        $('#exampleModal').modal('hide');
    },

    dblTap: function () {
        hereMap.map._map.addEventListener('dbltap', function (evt) {
            mapEvent._coord = hereMap.map._map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            $('#exampleModal').modal('show');
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