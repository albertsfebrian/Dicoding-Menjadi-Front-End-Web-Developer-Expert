import DrawerInitiator from '../utils/initiator/drawer-initiator'
import UrlParser from '../routes/url-parser'
import routes from '../routes/routes'

class App {
  constructor ({ button, drawer, content }) {
    this._button = button
    this._drawer = drawer
    this._content = content

    this._initialAppShell()
  }

  _initialAppShell () {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content
    })
  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = routes[url]
    this._content.innerHTML = await page.render()
    await page.afterRender()

    // Bind Skiplink event onClick (to focus in the main content element)
    const skipLink = document.querySelector('.skip-link')
    skipLink.addEventListener('click', (e) => {
      e.preventDefault()
      this._content.focus()
    })
  }
}

export default App
