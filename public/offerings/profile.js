const previousOfferingLinks = new Set(['#automation', '#analytics', '#pipelines'])
if (previousOfferingLinks.has(window.location.hash)) {
  window.location.replace('/offerings/offerings.html' + window.location.hash)
}

const printButton = document.querySelector('.print-button')
const sections = Array.from(document.querySelectorAll('.cv-list details'))
let openSections = []

printButton.hidden = false
printButton.addEventListener('click', () => window.print())

window.addEventListener('beforeprint', () => {
  openSections = sections.filter((section) => section.open)
  sections.forEach((section) => { section.open = true })
})

window.addEventListener('afterprint', () => {
  sections.forEach((section) => { section.open = openSections.includes(section) })
})
