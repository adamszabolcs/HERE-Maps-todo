let showmap = {
    _center: {
        lat: '',
        lng: '',
    },

    _app_id: "Hcu7cDJnXgzkmNhIrujH",
    _app_code: "rJFx0NRya2Y5FdWQehEDkg",

    _error: null,

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