
var APIKey ='mDwvoqomEa5fxCiP21JBDfCukRDaZYMxceKYXzfwtRkJeicJ1j';
var secret ='mRZfJm0DLH12TpJJRgUtlnG5b32lHznG0Jyn2vBO';
var token_obj = new Object();
let locArray = [];

var locationInfoArray = new Array();

$(document).ready(function(){

   
    getOrgInfo();
})
function getOrgInfo(){

     // Get the search params out of the URL (i.e. `?q=dog&location=92128`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchZipcodeArr = document.location.search.split('&');

  // Get the query and format values
  var zipcode = searchZipcodeArr[0].split('=').pop();

  searchOrgApi(zipcode);
}


//get details about a single animal type the user selected

// This is a POST request, because we need the API to generate a new token for us

function searchOrgApi(zipcode){


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
        return fetch(' https://api.petfinder.com/v2/organizations='+ zipcode, {
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
                for(let j = 0;j <20 ;j++){

                   orgInfoArray[j] = new Array();
                   var address = data.address.postcode[j].address;
                    orgInfoArray[j] = new Array(address);

                    console.log(orgInfoArray);

                }
                createPopup(orgInfoArray);
                console.log(orgInfoArray)

            }
    });

// creating a popup from click event

$('#locBtn').click(function(){

})
});
}