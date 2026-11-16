const dialog = document.querySelector('dialog')

if (typeof dialog.showModal === 'function') {
  const content = dialog.querySelector('.dialog-content')
  document.documentElement.classList.add('enhanced')

  for (const link of document.querySelectorAll('[data-detail]')) {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const offering = document.getElementById(link.dataset.detail)
      if (!offering) return

      event.preventDefault()
      content.replaceChildren(...Array.from(offering.children, (element) => element.cloneNode(true)))
      content.querySelector('h2').id = 'detail-heading'
      dialog.showModal()
    })
  }

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })

  const initialOffering = document.getElementById(window.location.hash.slice(1))
  if (initialOffering?.closest('.service-details')) {
    document.querySelector(`[data-detail="${initialOffering.id}"]`)?.click()
  }
}
