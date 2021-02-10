class ControlsManagerSingleton {
    createControlsUI(controlsElement, endTurnCallback) {
        controlsElement.append(
            $('<div></div>').text("End Turn").addClass('endTurnButton').on('click', () => { endTurnCallback(); })[0]
        );
    }
}

export default new ControlsManagerSingleton();