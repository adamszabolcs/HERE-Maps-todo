let mapEvent = {

    dblTap: function () {
        let mapEvents = new H.mapevents.MapEvents(hereMap._map);

        hereMap._map.addEventListener('tap', function(evt) {
            console.log(evt.type, evt.currentPointer.type);
        })
    }

};