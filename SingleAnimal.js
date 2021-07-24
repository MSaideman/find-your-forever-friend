// API key and Secret for the session

var APIKey ='mDwvoqomEa5fxCiP21JBDfCukRDaZYMxceKYXzfwtRkJeicJ1j';
var secret ='mRZfJm0DLH12TpJJRgUtlnG5b32lHznG0Jyn2vBO';
var token_obj = new Object();
var animalInfoArray = new Array();


var storedAnimalLocation = new Array();
// API openweather
var APIOWMkey = 'c9299c81fa72cf0649fc417ca5d0c2b7';

$(document).ready(function(){

   
    getParams();
})
function getParams(){

     // Get the search params out of the URL (i.e. `?q=dog&location=92128`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var animalType = searchParamsArr[0].split('=').pop();
  var location = searchParamsArr[1].split('=').pop();

  searchApi(animalType, location);
}


//get details about a single animal type the user selected

// This is a POST request, because we need the API to generate a new token for us

function searchApi(animalType, location){


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
        return fetch(' https://api.petfinder.com/v2/animals?type='+ animalType+ '&location='+location, {
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

                console.log("data"+ JSON.stringify(data));
                // var queryStrings = new Array();
                for(let j = 0; j < 20; j++){
                    var id = data.animals[j].id;

                console.log(data.animals);
                for(let j = 0;j <20 ;j++){
               
                   var id = data.animals[j].id;

                   var name = data.animals[j].name;
                   var gender=data.animals[j].gender;
                  var size =data.animals[j].size;
                  var age =data.animals[j].age;

                   animalInfoArray[j] = new Array(id,name,gender,size,age);

                  var city = data.animals[j].contact.address.city;
                   animalInfoArray[j] = new Array(id,name,gender,size,age,city);

                   

                }
                

                createTable(animalInfoArray);

                // for(let j = 0;j <20 ;j++){
                //     let organizationLink = 'https://api.petfinder.com/v2/organizations/' + data.animals[j].organization_id;
                    
                //     fetch(organizationLink, {
                //         headers: {
                //             'Authorization': oauthData.token_type + ' ' + oauthData.access_token,
                //             'Content-Type': 'application/json'
                //         }
                //     }).then(function(resp){
                //         return resp.json();
                //     }).then(function(org){
                //         // console.log(org);
                //         let address = org.organization.address;
                //         //console.log(address);
                //         let beforeHTML = $('#animalTable').data[j]
                //         $('#animalTable').data[j][1] = '<a href=' + 
                //         'thirdpage.html?address=' + 
                //         address.address1 + 
                //         ',+' + 
                //         address.city + 
                //         ',+' + 
                //         address.state + 
                //         '&key=AIzaSyDCXM4aNnhOduTO2-16fXCEss9rp3vQh1E>' +
                //         beforeHTML +
                //         '</a>';
                //     });
                                                        
                // }
            }
    });
});
}

// function setNextPage(page){
//     queryString = page;
//     console.log(queryString);
// }
// creating a table with fetch response


// get lat/long from openweather 
function getCoord(city) {
fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIOWMkey}`)
.then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
    initMap(data.coord.lat, data.coord.lon);
}) 
}


// creating a table with fetch response

function createTable(animalInfoArray){
    // console.log(animalInfoArray);
    $('#animalTable').DataTable({
    
    "data" : animalInfoArray,
    "columns": [
        { "title": "Id" },
        { "title": "Name" },
        { "title": "Gender" },
        { "title": "Size" },
        { "title": "Age" },
        { "title": "City"}
    ]
    
    });

    // var table = $('#animalTable');
    // var rows = table.getElementsByTagName('tr');
    // for(i=0; i < rows.length; i++){
    //     var currentRow = table.rows[i];
    //     var createClickHandler = 
    //         function(row){
    //             return function(){
    //                 // function getAnimalData(index){
    //                 //     return row.getElementsByTagName('td')[index].innerHTML;
    //                 // }
    //                 // let Id = getAnimalData(0);
    //                 // let Name = getAnimalData(1);
    //                 // let Gender = getAnimalData(2);
    //                 // let Size = getAnimalData(3);
    //                 // let Age = getAnimalData(4);
                    
    //                 // open third page with animal info

    //                 //var queryString = 'thirdpage.html?Id=' + Id + '&Name=' + Name + '&Gender=' + Gender + '&Size=' + Size + '&Age=' + Age;
    //                 let address = storedAnimalLocation[i];
                    
    //                 var queryString = 'thirdpage.html?address=' + address.address1 + ',+' + address.city + ',+' + address.state + '&key=AIzaSyDCXM4aNnhOduTO2-16fXCEss9rp3vQh1E';


	//                 document.location.assign(queryString);
    //             };
    //         };
    //     currentRow.onclick = createClickHandler(currentRow);
    // }
    
    }



    // inside click action will call open weather search and hand it the 5th index of the array

