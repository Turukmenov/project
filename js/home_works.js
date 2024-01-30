// HOMEWORK 1
const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button")
const gmailResult = document.querySelector("#gmail_result")
const regExp =/^[A-Za-z\d]{6,30}([.][A-Za-z\d]+)*@gmail.com$/
gmailButton.addEventListener('click', () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML = "NOT OK"
        gmailResult.style.color = "red"
    }
})

// HOMEWORK 1,2
const childBlock = document.querySelector(".child_block")
let X = 0
let Y = 0
const max = 449
const aliveSquare = () => {
    if (X <= max && Y === 0) {
        X++
        childBlock.style.left = `${X}px`
    } else if (X >= max && Y <= max) {
        Y++
        childBlock.style.top = `${Y}px`
    } else if (X >= 0) {
        X--
        childBlock.style.left = `${X}px`
    } else if (Y >= 0) {
        Y--
        childBlock.style.top = `${Y}px`
    }
    setTimeout(aliveSquare, 1)
}
aliveSquare()

// HOMEWORK 2
const start = document.querySelector("#start")
const stop = document.querySelector("#stop")
const reset = document.querySelector("#reset")
const seconds = document.querySelector("#seconds")
let timer
let secondsJs = 0
function updateTimer() {
  secondsJs++
  seconds.textContent = String(secondsJs).padStart(2, "0")
}
start.addEventListener("click", function() {
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
  }
})
stop.addEventListener("click", function() {
  clearInterval(timer)
  timer = null
})
reset.addEventListener("click", function() {
  clearInterval(timer)
  timer = null
  secondsJs = 0
  seconds.textContent = "00"
})

// HOMEWORK 4
const buttons = [document.querySelector('#person0'),
                            document.querySelector('#person1'),
                            document.querySelector('#person2')]
const showContent = async (personIndex) => {
    try {
        const response = await fetch('../data/persons.json')
        const data = await response.json()
        const person = data[personIndex]

        const nameElement = document.querySelector(`.name${personIndex}`)
        const ageElement = document.querySelector(`.age${personIndex}`)
        const nenElement = document.querySelector(`.nen${personIndex}`)
        const photoElement = document.querySelector(`#photo${personIndex}`)
        const personErrorElement = document.querySelector(`.personE${personIndex}`)

        if (nameElement && ageElement && nenElement && photoElement && personErrorElement) {
            nameElement.innerHTML = person.name
            ageElement.innerHTML = person.age
            nenElement.innerHTML = person.nen

            if (person.photo) {
                photoElement.src = person.photo
                photoElement.style.display = 'block'
            } else {
                photoElement.src = 'placeholder.jpg'
                photoElement.style.display = 'none'
            }

            personErrorElement.innerHTML = ''
        } else {
            console.error('Произошла ошибка при поиске персонажа')
        }
    } catch (e) {
        const personErrorElement = document.querySelector(`.personE${personIndex}`)
        personErrorElement.innerHTML = 'Произошла ошибка при загрузке персонажа'
    }
}

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showContent(index)
    })
})
