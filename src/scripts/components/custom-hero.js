class CustomHero extends HTMLElement {
  render () {
    this.innerHTML = `
      <div class="hero">
        <div class='overlay'></div>
        <div class="hero-content">
          <div class="container">
            <h1>Temukan makanan & minuman terbaik di sini</h1>
          </div>
        </div>
        <img src="/images/hero.jpg" alt="Hero Image">
      </div>
    `
  }
}

customElements.define('custom-hero', CustomHero)
