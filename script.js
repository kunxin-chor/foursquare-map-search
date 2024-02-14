document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    const map = createMap('map', 1.3521, 103.8198);
    const searchLayer = L.layerGroup();
    searchLayer.addTo(map);

    document.querySelector('#searchBtn').addEventListener('click', async function() {
        const searchTerms = document.querySelector('#searchTerms').value;

        const center = map.getBounds().getCenter();
        const data = await search( center.lat, center.lng, searchTerms,);

        // adding markers to the map for the search results
        addMarkersToMap(data, searchLayer, map);
    });

    document.querySelector("#toggleSearchBtn").addEventListener("click", function(){
        
        const searchContainer = document.querySelector("#search-container");
        const style = window.getComputedStyle(searchContainer);
        // if the search container is already visible, we'll hide it
        if (style.display != "none") {
            searchContainer.style.display = "none";
        } else {
            // otherwise, show it
            searchContainer.style.display = 'block';
        }
    })

    
});