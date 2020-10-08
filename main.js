const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {

/* XMLHttpRequest is an inbuilt JavaScript object that allows us to consume APIs.
It gives us the method to open connections to send connections and close them. */
var xhr = new XMLHttpRequest();

xhr.open("GET", baseURL + type + "/");

xhr.send();

/*Whenever the state of our XHR object changes we want to run a check.
When the state changes JS gets the div with the id 'data' and changes its inner text*/
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        cb(JSON.parse(this.responseText));
    }
};
}

function writeToDocument(type) {
    getData(type, function(data){
        document.getElementById("data").innerHTML=data;
    });
}