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
function getTableHeaders(obj){
    var tableHeaders = [];
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    })
    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    /*Resets the page to blank every time the button is clicked. */
    el.innerHTML = " ";

    getData(type, function(data){
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        /* forEach loop. For each element in data it will run this function. */
        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${item[key]}</td>`);
            })
            tableRows.push(`<tr>${dataRow}</tr>`);
            })
            el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
        });
}

