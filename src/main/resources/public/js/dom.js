let dom = {


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