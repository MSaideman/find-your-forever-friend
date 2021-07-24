// testing to see if map works
$(document).ready(function(){
  initMap();
})

function initMap(lat, lng) {
  console.log(lat, lng)
    // The location of Uluru
    const uluru = { lat: lat, lng: lng};
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }