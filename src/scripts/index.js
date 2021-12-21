import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.scss'
import './components/custom-header'
import './components/custom-hero'
import './components/custom-footer'
import App from './views/app'
import swRegister from './utils/helper/sw-register'

const customHeader = document.querySelector('custom-header')
const customHero = document.querySelector('custom-hero')
const customFooter = document.querySelector('custom-footer')
customHeader.render()
customHero.render()
customFooter.render()

const app = new App({
  button: document.querySelector('#hamburger-btn'),
  drawer: document.querySelector('#menu-list'),
  content: document.querySelector('#main-content')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})
