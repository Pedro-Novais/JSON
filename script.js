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
        //view(profile)
    };
}

function view(profile){
    let name = document.createTextNode(profile.task)
    console.log(profile)
    div.appendChild(name)
}

let  icon = document.createElement('img');

icon.setAttribute('src', 'svg/check-solid.svg');
icon.setAttribute('height', '50px');

//div.appendChild(icon)

const level = document.querySelectorAll('.choose-priority')
let priorityId = null;

level.forEach(function(level) {
    level.addEventListener('click', function() {
        clearNewClick()
        priorityId = level.getAttribute('id');
        console.log(priorityId)

        markNewClick(priorityId)
    });
  });

function markNewClick(index){
    let level = document.querySelectorAll('.choose-priority')
    for(let i = 0; i <= index; i++){
        level[i].style.backgroundColor='#d6ac5e';
    }
}
function clearNewClick(){
    let level = document.querySelectorAll('.choose-priority')
    for(let i = 0; i < level.length; i++){
        level[i].style.backgroundColor='#6acfc9';
    }
}