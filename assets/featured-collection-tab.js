class NavTabs extends HTMLElement {
  constructor() {
    super();
    this.id = this.dataset.id
    const template = document.getElementById(`nav-tabs-template-${this.id}`).content;
    this.appendChild(template.cloneNode(true));

    this.tabs = this.querySelectorAll('.navtab');
    this.contents = this.querySelectorAll('.content');
    this.underline = this.querySelector('.underline');

    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.onTabClick(tab));
    });

    window.addEventListener('resize', () => this.updateUnderline());
    // this.updateUnderline();
  }

  onTabClick(tab) {
    this.tabs.forEach(t => t.classList.remove('active'));
    this.contents.forEach(content => content.classList.remove('active'));

    tab.classList.add('active');
    const target = tab.getAttribute('data-target');
    this.querySelector(`#${target}`).classList.add('active');

    // this.updateUnderline();
  }

  updateUnderline() {
    const activeTab = this.querySelector('.navtab.active');
    this.underline.style.width = `${activeTab.offsetWidth}px`;
    this.underline.style.left = `${activeTab.offsetLeft}px`;
  }
}

customElements.define('nav-tabs', NavTabs);