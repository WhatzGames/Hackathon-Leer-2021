const textElement = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const buttonsContainer = document.getElementById('buttons');

let globalData;


function GetGlobalData(){
    return fetch(`/api/Game/globalData?guid=${id}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}


let id;

const directions = ["Nord", "Ost", "Süd", "West"];

async function startGame() {
    globalData = await GetGlobalData();
    id = uuidv4();
    const data = await GetAction();
    showTextNode(data)
}

function refreshGlobals(){
    scoreElement.innerText = globalData.totalScore + " Score";
    timeElement.innerText = globalData.time + " Stunden verbleibend";
}

function showTextNode(gameData) {
    refreshGlobals();
    textElement.innerText = gameData.description;
    gameData.actions.forEach((action, index) => {
        createOption(action, index);
    })
}

function createButton(content){
    const button = document.createElement("button");
    button.innerText = content;
    button.classList.add('btn');
    return button
}

function resetButtonsContainer(){
    buttonsContainer.innerHTML = "";
}

function createOption(action, index){
    const button = createButton(action.text);
    button.addEventListener('click', async () => {
        resetButtonsContainer();
        await postData(index);
        globalData = await GetGlobalData();
        refreshGlobals();
        directions.forEach(direction => createDirection(direction))
    });
    buttonsContainer.appendChild(button);
}

function createDirection(direction){
    const button = createButton(direction)
    button.addEventListener('click', async () => {
        resetButtonsContainer()
        await walkOption(direction)
    });
    buttonsContainer.appendChild(button);
}

async function selectOption(option, index) {
    if (option.newStart != null) {
        return startGame()
    }    
    await postData(index);
    const data = await GetAction();
    showTextNode(data)
}

async function postData(index){
    await fetch(`/api/Game/Do?guid=${id}&index=${index}`)
        .catch(error => console.error(error));
    globalData = await GetGlobalData();
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