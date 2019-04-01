let mapEvent = {

    _coord: null,

    sendInfoFromModal: function () {
        let todoTitle = document.getElementById("message-text").value;
        communication.sendTodoToBackend(mapEvent._coord, todoTitle);
        $('#exampleModal').modal('hide');
    },

    addModalSubmitListener: function () {
        let submitButton = document.getElementById("send");
        submitButton.addEventListener('click', function() {
            mapEvent.sendInfoFromModal();
        })
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