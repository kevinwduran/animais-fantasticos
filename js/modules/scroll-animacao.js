export default class ScrollAnimacao {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.classAtivo = 'ativo';
    this.windowMetade = window.innerHeight * 0.6;

    this.animaScroll = this.animaScroll.bind(this);
  }

  animaScroll() {
    this.sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const isSectionVisible = (sectionTop - this.windowMetade) < 0;
      if (isSectionVisible) {
        section.classList.add(this.classAtivo);
      } else if (section.classList.contains(this.classAtivo)) {
        section.classList.remove(this.classAtivo);
      }
    });
  }

  init() {
    this.animaScroll();
    window.addEventListener('scroll', this.animaScroll);
  }
}
