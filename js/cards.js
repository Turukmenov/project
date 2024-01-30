// HOMEWORK 7
const cardsContainer = document.querySelector('.innerCardsBlock');
const URL = 'https://jsonplaceholder.typicode.com/posts';
const cardsCount = 99;

const fetchAndFillCards = async () => {
    try {
        const response = await fetch(URL)
        const data = await response.json()

        for (let i = 0; i < cardsCount; i++) {
            const card = document.createElement('div')
            card.classList.add('card')

            const cardsPhoto = document.createElement('div')
            cardsPhoto.classList.add('cardsPhoto')

            const img = document.createElement('img')
            img.src = 'https://i.pinimg.com/564x/18/b0/f7/18b0f754927cefd954767f93105a4560.jpg'
            img.alt = 'photo'
            img.classList.add('photo')
            cardsPhoto.appendChild(img)

            const firstCard = cardsContainer.querySelector('.card')
            const firstCardTitle = firstCard.querySelector('.cardsTittle')
            const firstCardBody = firstCard.querySelector('.cardsBody')
            firstCardTitle.textContent = `Нэйм:  ${data[0].title}`
            firstCardBody.textContent = `Описание: ${data[0].body}`

            const cardsTittleContainer = document.createElement('div')
            const cardsTittle = document.createElement('span')
            cardsTittle.classList.add('cardsTittle')
            cardsTittle.textContent = `Нэйм:  ${data[i].title}`
            cardsTittleContainer.appendChild(cardsTittle)

            const cardsBodyContainer = document.createElement('div')
            const cardsBody = document.createElement('span')
            cardsBody.classList.add('cardsBody')
            cardsBody.textContent = `Описание: ${data[i].body}`
            cardsBodyContainer.appendChild(cardsBody)

            card.appendChild(cardsPhoto)
            card.appendChild(cardsTittleContainer)
            card.appendChild(cardsBodyContainer)

            cardsContainer.appendChild(card)
        }
    } catch (e) {
        console.error('Ошибка при загрузке данных:', e)
    }
};
document.addEventListener('DOMContentLoaded', fetchAndFillCards)