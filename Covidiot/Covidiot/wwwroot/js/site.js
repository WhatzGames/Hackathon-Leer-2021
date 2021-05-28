const textElement = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const optionButtonsElement = document.getElementById('option-buttons');
const directionButtonsElement = document.getElementById('direction-buttons');

let score = 0;
let duration = 24;


let id = {}

const directions = ["north", "east", "south", "west"];

async function startGame() {
    id = uuidv4();
    const data = await GetAction();
    showTextNode(data)
}

function showTextNode(gameData) {
    const textNode = gameData;
    textElement.innerText = textNode.description;
    scoreElement.innerText = score.toString() + " Score";
    timeElement.innerText = duration.toString() + " Stunden verbleibend";
    
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    while (directionButtonsElement.firstChild) {
        directionButtonsElement.removeChild(directionButtonsElement.firstChild)
    }
    
    textNode.actions.forEach((action, index) => {
        if (showOption(action)) {
            createOption(action, index);
        }
    })
    
    directions.forEach(name => {
       createDirection(name);
    });
    
}

function createOption(action, index){
    const button = document.createElement('button')
    button.innerText = action.text
    button.classList.add('btn')
    button.addEventListener('click', () => selectOption(action, index));
    optionButtonsElement.appendChild(button)
}

function createDirection(data){
    const button = document.createElement('button-direction')
    button.innerText = data
    button.classList.add('btn')
    button.addEventListener('click', () => walkOption(data));
    directionButtonsElement.appendChild(button)
}

async function selectOption(option, index) {
    if (option.newStart != null) {
        return startGame()
    }

    score = score + option.score;
    duration = duration - option.duration;

    if(duration === 0){
        console.log("End");
    }
    
    await postData(index);
}

async function postData(index){
    await fetch(`/api/Game/Do?guid=${id}&index=${index}`)
        .catch(error => console.log("Something went wrong"));
}

async function GetAction(){
    return fetch(`/api/Game/timedaction?guid=${id}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}

function showOption(option) {
    return option.newStart == null
}

async function walkOption(data){
    await fetch(`api/Game/Walk?guid=${id}&direction=${data}`);
    
    data = await GetAction();
    
    showTextNode(data);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


startGame()