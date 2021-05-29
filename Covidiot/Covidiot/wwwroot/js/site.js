const textElement = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const buttonsContainer = document.getElementById('buttons');
const imageElement = document.getElementById('image');
const alertElement = document.getElementById('alertBox');

let id = sessionStorage.getItem("id");
if(id === null){
    id = uuidv4();
    sessionStorage.setItem("id", id);
}

const directions = ["Nord", "Ost", "Süd", "West"];

async function refreshGlobals(){
    const globalData = await GetGlobalData();
    scoreElement.innerText = globalData.totalScore + " Score";
    timeElement.innerText = globalData.time + " Stunden verbleibend";
}

async function showTextNode() {
    hideElement(alertElement);
    const gameData = await GetAction();
    await refreshGlobals();
    imageElement.src = gameData.image;
    await typeEffect(textElement, 37, gameData.description, () => {
        gameData.actions.forEach((action, index) => {
            createOption(action, index);
        });
    });
    
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
        alertElement.innerText = action.response;
        showElement(alertElement);
        await runAction(index);
        await refreshGlobals();
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

async function runAction(index){
    await fetch(`/api/Game/Do?guid=${id}&index=${index}`)
        .catch(error => console.error(error));
}

function GetGlobalData(){
    return fetch(`/api/Game/globalData?guid=${id}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}

function GetAction(){
    return fetch(`/api/Game/timedaction?guid=${id}`)
        .then(response => response.json())
        .catch(error => console.error(error));
}

async function walkOption(data){
    await fetch(`api/Game/Walk?guid=${id}&direction=${data}`);
    await showTextNode();
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function hideElement(element){
    element.style.visibility = "hidden";
}

function showElement(element){
    element.style.visibility = "visible";
}

async function typeEffect(element, speed, data, action) {
    const text = data;
    element.innerText = "";

    let i = 0;
    const timer = await setInterval(async function() {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
            await new Promise(resolve => setTimeout(resolve, 500));
            action();
        }
    }, speed);
    
}

showTextNode();