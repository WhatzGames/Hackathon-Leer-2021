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
const data2 = {
    "description": "Der Discounter deiner Wahl. Hier gibt es alles, nur kein Klopapier.",
    "image": "https://static.euronews.com/articles/stories/04/55/22/00/773x435_cmsv2_0cc90040-5d30-5cbf-8efb-e6e42aae2940-4552200.jpg",
    "timeOfDayStart": 0,
    "timeOfDayEnd": 24,
    "actions": [
        {
            "text": "Du brauchst dringend einen Jahresvorat Mehl, Dosenobst und Nudeln. Gehe in den Supermarkt und kaufe von jedem 30 Stück.",
            "probability": 1,
            "score": 4,
            "duration": 1,
            "response": "Nachdem du letze Woche schon das ganze Klopapier gekauft hast bist du jetzt bereit für jede Quarantäne!",
            "newStart": null
        },
        {
            "text": "Leck am Griff vom Einlaufswagen.",
            "probability": 1,
            "score": 7,
            "duration": 1,
            "response": "Du hast jetzt bestimmt Corona. Und alles andere auch.",
            "newStart": null
        },
        {
            "text": "Mach ganz normal deinen Wocheneinkauf.",
            "probability": 1,
            "score": -2,
            "duration": 1,
            "response": "Du ergatterst das allerletzte Paket Klopapier. Auf dem Parkplatz teilst du es mit einer alten Dame.",
            "newStart": null
        }
    ],
    "here": {
        "xCoordinate": 5,
        "yCoordinate": "C"
    },
    "north": {
        "xCoordinate": 5,
        "yCoordinate": "B"
    },
    "east": {
        "xCoordinate": 4,
        "yCoordinate": "C"
    },
    "south": {
        "xCoordinate": 5,
        "yCoordinate": "D"
    },
    "west": null
}

function startGame() {
    state = {}
    showTextNode(data)
}

function showTextNode(gameData) {
    const textNode = gameData
    textElement.innerText = textNode.description
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.actions.forEach(action => {
        if (showOption(action)) {
            const button = document.createElement('button')
            button.innerText = action.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(action));
            optionButtonsElement.appendChild(button)
        }
    })
}

function selectOption(option){
    if(option.newStart != null){
        return startGame()
    }
    
    showTextNode(data2);
}

function showOption(option) {
    return option.newStart == null
}

startGame()