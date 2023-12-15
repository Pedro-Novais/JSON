const div = document.querySelector('#container')

getJson()
function getJson(){
    let requestURL = "actions.json"; 

    let request = new XMLHttpRequest()

    request.open("GET", requestURL);

    request.responseType = "json";
    request.send();

    request.onload = function () {
        let profile = request.response;
        view(profile)
    };
}

function view(profile){
    let name = document.createTextNode(profile.task)
    console.log(profile)
    div.appendChild(name)
}


