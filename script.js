var APIKey ='mDwvoqomEa5fxCiP21JBDfCukRDaZYMxceKYXzfwtRkJeicJ1j';
var secret ='mRZfJm0DLH12TpJJRgUtlnG5b32lHznG0Jyn2vBO';
var token_obj = new Object();
// Call details
var org = 'RI77';
var status = 'adoptable';
// search button
var searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', searchResults);
// back button from results page to bring to initial page 
var backBtn = document.getElementById("back-btn");
backBtn.addEventListener('click', returnInitPage);

function initPage() {
$( document ).ready(function() {
// Call the API

// animal search
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
    return fetch(' https://api.petfinder.com/v2/types', {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(function (resp) {

        // Return the API response as JSON
        return resp.json();
    
    }).then(function (data) {

        // Log the pet data (seached or all?)
        console.log('pets', data);
		let dropdown = $('#petSearch');
		dropdown.append('<option selected="true" disabled>Choose Pet</option>');
dropdown.prop('selectedIndex', 0);
for(var i=0;i< data.types.length; i++){
	
console.log('pets:'+data.types[i].name);
	dropdown.append('<option value="' + data.types[i].name + '">' + data.types[i].name + '</option>');
}

    }).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
});
});

// location search
// This is a POST request, because we need the API to generate a new token for us
fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + APIKey + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (response) {

	// Return the response as JSON
	return response.json();
   

}).then(function (dataLocation) {

	// Log the API data
	console.log('token', dataLocation);
     token_obj.access_token = dataLocation.token_type;
     token_obj.expires_in = dataLocation.expires_in;
     token_obj.token_type=dataLocation.token_type;
    return fetch('https://api.petfinder.com/v2/animals', {
		headers: {
			'Authorization': dataLocation.token_type + ' ' + dataLocation.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(function (response) {

        // Return the API response as JSON
        return response.json();
    
    }).then(function (dataLocation) {
    
        // Log the pet data
        console.log('location', dataLocation);
		let locationSearch = $('#location');
		locationSearch.append('<input>Location:</input>');
		locationSearch.prop('selectedIndex', 0);
for(var i=0;i< dataLocation.types.length; i++){
	
console.log('pets:'+dataLocation.types[i].location);
locationSearch.append('<input type="' + dataLocation.types[i].location + '">' + dataLocation.types[i].location + '</input>');
}

    }).catch(function (error) {

	// Log any errors
	console.log('something went wrong', error);
// submit searched data 

searchResults();
});
});
}

function searchResults() {
	// use searched data to create results page
	var results = {
	petType: data,
	petLocation: dataLocation
	}
	console.log(results);
	showResults();
	showMap();
}


// results page includes other important characteristics/img/map
function showResults() {

}

// map created using google dev API tools 
function showMap() {

}

// return initial page using back buttons
function returnInitPage () {
}q