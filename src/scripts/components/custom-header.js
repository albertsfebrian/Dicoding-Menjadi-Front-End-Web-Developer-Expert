class CustomHeader extends HTMLElement {
  render () {
    this.innerHTML = `
      <header>
        <nav class="container">
          <div><a href="#/" class="logo">RestoRate</a></div>
          <div>
            <button aria-label="show menu" id="hamburger-btn">
              <i class="fas fa-bars fa-lg"></i>
            </button>
            <ul id="menu-list">
              <li class="menu-item">
                <a href="#/">Home</a>
              </li>
              <li class="menu-item">
                <a href="#/favorite">Favorite</a>
              </li>
              <li class="menu-item">
                <a href="https://github.com/albertsfebrian" target="_blank" rel="noopener noreferrer">About Us</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    `
  }
}

customElements.define('custom-header', CustomHeader)
