// LESSON 1
const phoneInput = document.querySelector("#phone_input")
const phoneButton = document.querySelector("#phone_button")
const phoneResult = document.querySelector("#phone_result")
const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
phoneButton.addEventListener("click", () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK"
        phoneResult.style.color = "green"
    } else {
        phoneResult.innerHTML = "NOT OK"
        phoneResult.style.color = "red"
    }
})

// LESSON 3
const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
const hideTabContent = () => {
    tabContent.forEach(tabBlock => {
        tabBlock.style.display = 'none'
    })
    tabs.forEach(tabItem => {
        tabItem.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (indexElement = 0) => {
    tabContent[indexElement].style.display = 'block'
    tabs[indexElement].classList.add('tab_content_item_active')
}
hideTabContent()
showTabContent()
tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent()
                currentTab = tabIndex
                showTabContent(currentTab)
            }
        })
    }
}
let currentTab = 0
const autoTabSlider = (i = 0) => {
    hideTabContent()
    currentTab = (currentTab + 1) % tabs.length
    showTabContent(currentTab)
}
setInterval(autoTabSlider, 3000)

//  LESSON 5
const somInput = document.querySelector("#som")
const usdInput = document.querySelector("#usd")
const eurInput = document.querySelector("#eur")
const converter = (element, targetElement, currentValue) => {
    element.addEventListener('input', async () => {
        try {
            const response = await fetch('../data/converter.json')
            const data = await response.json()

            switch (currentValue) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    eurInput.value = (element.value / data.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    eurInput.value = (targetElement.value / data.eur).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2)
                    usdInput.value = (element.value * data.eur / data.usd).toFixed(2)
                    break
                default:
                    break
            }
            element.value === '' && (targetElement.value = '')
        } catch (e) {
            console.error('Ошибка при загрузке данных:', error)
        }
    })
}
converter(somInput, usdInput, 'som')
converter(usdInput, somInput, 'usd')
converter(eurInput, somInput, 'eur')

// LESSON 6
const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
const URL1 = 'https://jsonplaceholder.typicode.com/todos/'
let count = 0

const cardFetcher = async (id = 1) => {
    try {
        const response = await fetch(`${URL1}${id}`)
        const data = await response.json()
        card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `
    } catch (e) {
        card.innerHTML = `<p style="color: red">Ошибка при загрузке данных</p>`
    }
}
document.addEventListener('DOMContentLoaded', () => {
    cardFetcher(1)
})

btnNext.onclick = () => {
    count++
    if (count > 200) count = 1
    cardFetcher(count)
}
btnPrev.onclick = () => {
    count--
    if (count < 1) count = 200
    cardFetcher(count)
}

// HOMEWORK PART II
const URL2 = 'https://jsonplaceholder.typicode.com/posts'
const homework2 = async () => {
    try {
        const response = await fetch(`${URL2}`)
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.error('Ошибка при загрузке данных:', error)
    }
}
homework2()

// LESSON 7
const citySearchInput = document.querySelector('.cityName')
const citiName = document.querySelector('.city')
const cityTemp = document.querySelector('.temp')
const URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

const sitySearch = () => {
    citySearchInput.oninput = async (event) => {
        try {
            const response = await fetch(`${URL}?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            citiName.innerHTML = data.name || 'Город не найден'
            cityTemp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
        } catch (e) {
            cityTemp.innerHTML = 'Ошибка при загрузке данных'
        }
    }
}
sitySearch()
