class CustomFooter extends HTMLElement {
  render () {
    this.innerHTML = `
      <footer>
        <span>Copyright &copy; 2021 - RestoRate</span>
      </footer>
    `
  }
}

customElements.define('custom-footer', CustomFooter)
