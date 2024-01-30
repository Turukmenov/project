const modal = document.querySelector(".modal")
const modalTriggerButton = document.querySelector("#btn-get")
const modalCloseButton = document.querySelector(".modal_close")

const openModal = () => {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
}
const closeModal = () => {
    modal.style.display = "none"
    document.body.style.overflow = ""
}
modalTriggerButton.onclick = () => openModal()
modalCloseButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

// HOMEWORK 3
setTimeout(() => {
    openModal()
}, 10000)
const openModal2 = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    window.removeEventListener('scroll', modalScrollTrigger)
}
const modalScrollTrigger = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(openModal2, 500)
        }
}
window.addEventListener('scroll', modalScrollTrigger)
