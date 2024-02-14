function createMap(mapContainerID, lat, lng) {
    const map = L.map(mapContainerID);
    map.setView([lat, lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
        .addTo(map);
    return map;
}

function addMarkersToMap(searchResults, layer, map) {

    // remove all existing markers from the provided layer
    layer.clearLayers();

    // Get a reference to div#search-results
    const searchResultsContainer = document.querySelector('#search-results');
    // Remove all existing search results
    searchResultsContainer.innerHTML = '';

    // take one location at a time from data.results
    for (let location of searchResults.results) {
        const lat = location.geocodes.main.latitude;
        const lng = location.geocodes.main.longitude;
        const name = location.name;
        const marker = L.marker([lat, lng]);
        marker.bindPopup(function () {

            const divElement = document.createElement('div');
            divElement.innerHTML = `
                <h3>${location.name}</h3>
                <img src="#" style="display:none"/>
                <h4>${location.location.formatted_address}</h4>
            `;

            async function getPicture() {
                const photos = await getPhotoFromFourSquare(location.fsq_id);
                if (photos && photos.length > 0) {
                    const firstPhoto = photos[0];
                    // display image at 150px width and 150px height
                    const photoUrl = firstPhoto.prefix + '150x150' + firstPhoto.suffix;
                    divElement.querySelector("img").src = photoUrl;
                    divElement.querySelector("img").style.display = "block";
                }
            }

            getPicture();

            return divElement;
        });

        // add the marker to the map
        marker.addTo(layer);

        // add search result
        const searchResultElement = document.createElement('div');
        searchResultElement.textContent = name;
        searchResultElement.addEventListener('click', function () {
            map.flyTo([lat, lng], 16);
            marker.openPopup();
        });
        searchResultsContainer.appendChild(searchResultElement);

        // repeat until there are no location left in searchResults.results
    }
}