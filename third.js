var APIgoogleKey = 'AIzaSyCWnMYgAxmbFA2YqFGIZgNvXgFu3v70FXw';
var APIKey ='mDwvoqomEa5fxCiP21JBDfCukRDaZYMxceKYXzfwtRkJeicJ1j';
var secret ='mRZfJm0DLH12TpJJRgUtlnG5b32lHznG0Jyn2vBO';
var token_obj = new Object();
var weatherGeocodingAPIKey = '74188098e57f83a47b8566f3d3a0cabf'
// testing to see if map works
$(document).ready(function(){
  getParams();
  getCoord(/*zip code, state code*/)
  // initMap();
});

function getCoord(zip, state) {
  fetch (`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${state}&appid=${weatherGeocodingAPIKey}`) 
  .then(function(response){
      return response.json();
  }).then(function(data){
      console.log(data);
      initMap(data.lat, data.lon);
  }); 
}

function initMap(lat, lng) {
  console.log(lat, lng)
  // The location
  const location = { lat: lat, lng: lng};
  // The map, centered at the location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: location,
  });
  // The marker, positioned at the location
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

function getParams(){

  var searchParamsArr = document.location.search.split('&');
  // Get the query and format values
  var animalId = searchParamsArr[0].split('=').pop();
   getInfoById(animalId);
}

function getInfoById(Id){


  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + APIKey + '&client_secret=' + secret,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function (resp) {

    // Return the response as JSON
    return resp.json();
   

}).then(function (data) {

    // Log the API data
    console.log('token', data);
    var oauthData = data
     token_obj.access_token = data.token_type;
     token_obj.expires_in = data.expires_in;
     token_obj.token_type=data.token_type;
    return fetch(' https://api.petfinder.com/v2/animals/'+Id, {
        headers: {
            'Authorization': data.token_type + ' ' + data.access_token,
            'Content-Type': 'application/json'
        }
    }).then(function (resp) {

        // Return the API response as JSON
        return resp.json();
    
    }).then(function(data){
        
        if(!data){
            console.log('No results found!');
        }
        else{
            console.log(data);

            displayDetails(data)
        
        }
    }
);
});
  
}

function displayDetails(data){
  console.log(data.animal.name);

$('#petName').text (data.animal.name);
console.log(data.animal.size);
$('#size').val(data.animal.size);
if(!data.animal.contact.address.address1 == null){
$('#address').val(data.animal.contact.address.address1 ,
  data.animal.contact.address.city,data.animal.contact.address.state,
  data.animal.contact.address.country,data.animal.contact.postalcode );
}
else{
  $('#address').val(data.animal.contact.address.city,data.animal.contact.address.state,
    data.animal.contact.address.country,data.animal.contact.postalcode );
}
$("#breed").val(data.animal.breeds.primary);
if(!data.animal.colors.primary === null){
$('#color').val(data.animal.colors.primary);
}
else
{
  $('#color').val('data not available');
}
$('#status').val(data.animal.status);
$('#image').attr("src",data.animal.photos[0].full)

}