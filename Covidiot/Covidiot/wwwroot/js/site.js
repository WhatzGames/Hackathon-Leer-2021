const textElement = document.getElementById('text');
const scoreElement = document.getElementById('score');
const riskElement = document.getElementById('risk');
const timeElement = document.getElementById('time');
const buttonsContainer = document.getElementById('buttons');
const buttonsContainer2 = document.getElementById('buttons2');
const imageElement = document.getElementById('image');
const alertElement = document.getElementById('alertBox');
const walkElement = document.getElementById('walking');
const allElement = document.getElementById('all');

let id = sessionStorage.getItem("id");
if(id === null){
    id = uuidv4();
    sessionStorage.setItem("id", id);
}
let name = {};

const directions = ["Nord","West", "Süd", "Ost"];
let lastActionLocationResult = undefined;

async function refreshGlobals(){
    const globalData = await GetGlobalData();
    scoreElement.innerText = globalData.totalScore + " Score";
    timeElement.innerText = globalData.time + " Stunden verbleibend";
    riskElement.innerText = "Risiko: " + globalData.risk;
    await endGame(globalData.time, globalData.totalScore);
}

async function startGame(){
    if(window.location.href === "https://localhost:5001/" || "https://localhost:5001/home" === window.location.href){
        hideElement(walkElement);
        name = prompt("Geben Sie Ihren Name an", 'UserName');
        await showTextNode();
    }
}

async function showTextNode() {
    buttonsContainer2.innerHTML = "";
    const gameData = await GetAction();
    await refreshGlobals();
    imageElement.src = gameData.image;
    hideElement(alertElement);
    await typeEffect(textElement, 5, gameData.description, () => {
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

function createOption(action, index) {
    const button = createButton(action.text);
    button.addEventListener('click', async () => {
        resetButtonsContainer();
        alertElement.innerText = action.response;
        showElement(alertElement);
        await runAction(index);
        await refreshGlobals();

        if (lastActionLocationResult === undefined) {
            directions.forEach(direction => createDirection(direction))
        } else {
            const continueButton = createButton("Weiter")
            buttonsContainer.appendChild(continueButton);
            continueButton.addEventListener('click', async () => {
                resetButtonsContainer();
                await jumpOption();
            })
        }
    });
    buttonsContainer.appendChild(button);
}


function createDirection(direction){
    const button = createButton(direction)
    button.addEventListener('click', async () => {
        resetButtonsContainer()
        await walkOption(direction)
    });
    
    switch (direction){
        case "Nord":
            buttonsContainer.appendChild(button)
            break;
        case "Ost":
            buttonsContainer2.appendChild(button)
            break;
        case "West":
            buttonsContainer2.appendChild(button)
            break;
        case "Süd":
            buttonsContainer2.appendChild(button)
            break;
    }
}

async function runAction(index){
    lastActionLocationResult = await fetch(`/api/Game/Do?guid=${id}&index=${index}`)
        .then(response => response.ok ? response.json() : undefined)
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
    hideElement(allElement);
    showElement(walkElement);
    await new Promise(resolve => setTimeout(resolve, 3000));
    hideElement(walkElement);
    showElement(allElement);
    await fetch(`api/Game/Walk?guid=${id}&direction=${data}`);
    await showTextNode();
}

async function jumpOption() {
    await fetch(`api/Game/jump?guid=${id}&newStart=${lastActionLocationResult.xCoordinate}${lastActionLocationResult.yCoordinate}`)
        .catch(error => console.error(error));
    await showTextNode();
}

async function Add(){
    const globalData = await GetGlobalData();
    await fetch(`api/Game/Add?Name=${name}&score=` + encodeURIComponent(globalData.totalScore));
}

async function endGame(time, score){
    if(time === 0 || time < 0){
        await Add();
        window.alert("Deine Zeit ist abgelaufen. Du hast einen Score von " + score)
        window.location = "https://localhost:5001/home/scoreboard";
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function hideElement(element){
    element.style.display = "none";
}

function showElement(element){
    element.style.display = "block";
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

startGame();