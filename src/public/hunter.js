/**
 * Configure properties of the hunter.
 */
function configureHunter() {
    if(map === undefined) {
        geolocation.getCurrentPosition(position => {
            const coordinates = position.coords;
            const {latitude, longitude} = coordinates;
            createMap(new LatLng(latitude, longitude));
        }, () => alert('Unable to get location.'));
    }
}

/**
 * Starts the events that allow the hunter to hunt.
 */
function startHunting() {
    if(map !== undefined) {
        show('map');
    }
    
    taskId = geolocation.watchPosition(position => {
        const coordinates = position.coords;
        const {latitude, longitude} = coordinates;
        updateMarker(new LatLng(latitude, longitude), "You");
    }, () => alert('Unable to get location.'));
}

/**
 * Stops the events that allow the hunter to hunt.
 */
function stopHunting() {
    if(map !== undefined) {
        hide('map');
    }
    
    geolocation.clearWatch(taskId);
}

/**
 * Updates the hunter's map with the position of runners.
 * @param {string} username Players to be displayed on the map.
 * @param {object} coordinates Coordinates of the player.
 */
function updateTarget(username, coordinates) {
    // Update the marker with the specified username.
    updateMarker(new LatLng(coordinates.latitude, coordinates.longitude), username.trim());
}

/**
 * Attempts to refresh the map.
 */
function refreshMap() {
    pushPacket({
        packetId: packetIds.RefreshMapRequest
    });
}