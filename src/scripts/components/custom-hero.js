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
        <picture>
          <source media="(min-width: 768px)" srcset="/images/hero-large.jpg">
          <img src="/images/hero-small.jpg" alt="Hero Image"></img>
        </picture>
      </div>
    `
  }
}

customElements.define('custom-hero', CustomHero)
