/* global followSocialMedia menuDropdown localStorage */

// lib
import 'lazysizes'

// import loadScript from './util/load-script'
import urlRegexp from './util/url-regular-expression'
import docSelectorAll from './util/document-query-selector-all'

const simplySetup = () => {
  const rootEl = document.documentElement
  const documentBody = document.body

  /* Menu DropDown
  /* ---------------------------------------------------------- */
  const dropDownMenu = () => {
    // Checking if the variable exists and if it is an object
    if (typeof menuDropdown !== 'object' || menuDropdown === null) return

    // check if the box for the menu exists
    const $dropdownMenu = document.querySelector('.js-dropdown-menu')
    if (!$dropdownMenu) return

    Object.entries(menuDropdown).forEach(([name, url]) => {
      if (name !== 'string' && !urlRegexp(url)) return

      const link = document.createElement('a')
      link.href = url
      link.classList = 'dropdown-item block py-2 leading-tight px-5 hover:text-primary'
      link.innerText = name

      $dropdownMenu.appendChild(link)
    })
  }

  dropDownMenu()

  /* Social Media
  /* ---------------------------------------------------------- */
  const socialMedia = () => {
    // Checking if the variable exists and if it is an object
    if (typeof followSocialMedia !== 'object' || followSocialMedia === null) return

    // check if the box for the menu exists
    const $socialMedia = docSelectorAll('.js-social-media')
    if (!$socialMedia.length) return

    const linkElement = element => {
      Object.entries(followSocialMedia).forEach(([name, urlTitle]) => {
        const url = urlTitle[0]

        // The url is being validated if it is false it returns
        if (!urlRegexp(url)) return

        const link = document.createElement('a')
        link.href = url
        link.title = urlTitle[1]
        link.classList = 'p-2 inline-block hover:opacity-70'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.innerHTML = `<svg class="icon"><use xlink:href="#icon-${name}"></use></svg>`

        element.appendChild(link)
      })
    }

    $socialMedia.forEach(linkElement)
  }

  socialMedia()

  /*  Toggle modal
  /* ---------------------------------------------------------- */
  /*const simplyModal = () => {
    const $modals = docSelectorAll('.js-modal')
    const $modalButtons = docSelectorAll('.js-modal-button')
    const $modalCloses = docSelectorAll('.js-modal-close')

    // Modal Click Open
    if (!$modalButtons.length) return
    $modalButtons.forEach($el => $el.addEventListener('click', () => openModal($el.dataset.target)))

    // Modal Click Close
    if (!$modalCloses.length) return
    $modalCloses.forEach(el => el.addEventListener('click', () => closeModals()))

    const openModal = target => {
      documentBody.classList.remove('has-menu')
      const $target = document.getElementById(target)
      rootEl.classList.add('overflow-hidden')
      $target.classList.add('is-active')
    }

    const closeModals = () => {
      rootEl.classList.remove('overflow-hidden')
      $modals.forEach($el => $el.classList.remove('is-active'))
    }

    document.addEventListener('keydown', function (event) {
      const e = event || window.event
      if (e.keyCode === 27) {
        closeModals()
        // closeDropdowns()
      }
    })
  }

  simplyModal()
  */

  headerTransparency()
  /* DropDown Toggle
  /* ---------------------------------------------------------- */
  const dropDownMenuToggle = () => {
    const dropdowns = docSelectorAll('.dropdown:not(.is-hoverable)')

    if (!dropdowns.length) return

    dropdowns.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.stopPropagation()
        el.classList.toggle('is-active')
        documentBody.classList.remove('has-menu')
      })
    })

    const closeDropdowns = () => dropdowns.forEach(function (el) {
      el.classList.remove('is-active')
    })

    document.addEventListener('click', closeDropdowns)
  }

  dropDownMenuToggle()

  /* Toggle Menu
  /* ---------------------------------------------------------- */
  document.querySelector('.js-menu-toggle').addEventListener('click', function (e) {
    e.preventDefault()
    documentBody.classList.toggle('has-menu')
  })

  fetch('https://api.github.com/repos/SoftwareBrothers/adminjs', opts).then(function (response) {
    return response.json();
})
.then(function (res) {
    let count = res.stargazers_count;
    let countFormatted = (count / 1000).toFixed(1) + 'k';
    document.querySelectorAll('.github-box__count').forEach(item => {
        if (typeof count === 'number') {
            item.innerText = countFormatted;
        }

    });
    document.querySelectorAll('.numbers__star-count').forEach(item => {
        if (typeof count === 'number') {
            item.innerText = count;
        }

    });
})
.catch(function (err) {
    console.log("Something went wrong!", err);
});

fetch('https://api.npmjs.org/downloads/point/last-week/adminjs', opts).then(function (response) {
    return response.json();
})
.then(function (res) {
    let downloads = res.downloads;
    document.querySelectorAll('.numbers__download-count').forEach(item => {
        if (typeof downloads === 'number') {
            item.innerText = downloads;
        }
    });
})
.catch(function (err) {
    console.log("Something went wrong!", err);
});

}

document.addEventListener('DOMContentLoaded', simplySetup)
