const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
let data = {
    "description": "Hier ist die Polizei. Ausser den dienstleistenden Beamten ist kein Mensch zu sehen.",
    "image": "https://m.ga-online.de/media/newsimage_pub/638489/m-big/e7b1d6f8ffa1163aece189b8af192e68",
    "timeOfDayStart": 0,
    "timeOfDayEnd": 24,
    "actions": [
        {
            "text": "Laufe um das Gebäude",
            "probability": 1,
            "score": 0,
            "duration": 1,
            "response": "Das war anstrengender als gedacht und auch ziemlich langweilig.",
            "newStart": null
        },
        {
            "text": "Gehe hinein, drehe wieder um und gehe hinaus.",
            "probability": 1,
            "score": 0,
            "duration": 1,
            "response": "Wegen frisch desinfizierten Türgriffen ist das Corona Infektionsrisiko nicht wesentlcih gestiegen.",
            "newStart": null
        },
        {
            "text": "Rede kurz mit dem diensthebenden Beamten über das Wetter und die aktuelle Situation vor Ort",
            "probability": 1,
            "score": 0,
            "duration": 1,
            "response": "Da Ihr über eine Glasscheibe voneinander getrennt wart ist Corona-technisch nichts passsiert",
            "newStart": null
        }
    ],
    "here": {
        "xCoordinate": 3,
        "yCoordinate": "A"
    },
    "north": null,
    "east": {
        "xCoordinate": 2,
        "yCoordinate": "A"
    },
    "south": {
        "xCoordinate": 1,
        "yCoordinate": "B"
    },
    "west": null
}

function startGame() {
    state = {}
    showTextNode(data)
}

function showTextNode(gameData) {
    const textNode = data
    textElement.innerText = textNode.description
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.actions.forEach(action => {
        if (showOption(action)) {
            const button = document.createElement('button')
            button.innerText = action.text
            button.classList.add('btn')
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.newStart == null
}

startGame()