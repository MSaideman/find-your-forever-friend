var APIKey ='mDwvoqomEa5fxCiP21JBDfCukRDaZYMxceKYXzfwtRkJeicJ1j';
var secret ='mRZfJm0DLH12TpJJRgUtlnG5b32lHznG0Jyn2vBO';
var token_obj = new Object();
// Call details
var org = 'RI77';
var status = 'adoptable';

$( document ).ready(function() {
// Call the API
// This is a POST request, because we need the API to generate a new token for us
// fetch('https://api.petfinder.com/v2/oauth2/token', {
// 	method: 'POST',
// 	body: 'grant_type=client_credentials&client_id=' + APIKey + '&client_secret=' + secret,
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded'
// 	}
// });
// Call the API
// This is a POST request, because we need the API to generate a new token for us
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
     token_obj.access_token = data.token_type;
     token_obj.expires_in = data.expires_in;
     token_obj.token_type=data.token_type;
    return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(function (resp) {

        // Return the API response as JSON
        return resp.json();
    
    }).then(function (data) {
    
        // Log the pet data
        console.log('pets', data);
    
    }).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
});
});