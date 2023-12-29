export default class ScrollSuave {
  //é possível passar o link e opções desejadas, se necessário.
  constructor(links, options) {
    this.linksInternos = document.querySelectorAll(links);//pega todos os links internos
    if (options === undefined) { //se opções forem undefined, aplique o padrão
      this.options = {
        behavior: 'smooth',
        block: 'start',
      };
    } else {
      this.options = options;
    }
    //this da class ScrollSuave
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) { //link
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href'); // pega o '#exemplo'
    const section = document.querySelector(href); //pega a section referente ao href
    section.scrollIntoView(this.options); //método js que vai até o elemento desejado, neste caso, a section
  }

  addLinkEvent() {
    this.linksInternos.forEach((link) => {
      link.addEventListener('click', this.scrollToSection);
    });
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
