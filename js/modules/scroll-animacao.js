import debounce from './debounce.js';

export default class ScrollAnimacao {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.classAtivo = 'ativo';
    //animação acontece quando se passa o scroll na metade da tela
    this.windowMetade = window.innerHeight * 0.6;
    this.checarDistancia = debounce(this.checarDistancia.bind(this), 50);
  }

  //pega a distância em cada objeto em relação ao topo do site
  getDistancia() {
    //forEach não tem return, por isso usamos o map
    this.distance = [...this.sections].map((section) => { //desestruturado para usar o map
      //Distância de cada section referente ao topp
      const sectionTop = section.offsetTop;
      //retorna o elemento (section) e sua distância até o topo
      return {
        elemento: section,
        offsetTop: Math.floor(sectionTop - this.windowMetade),
      };
    });
  }

  //chegar distância em cada objeto em relação ao scroll do site
  checarDistancia() {
    this.distance.forEach((section) => {
      //se valor do scroll até o topo for maior que o valor da section até o topo
      if (window.scrollY > section.offsetTop) {
        //cada section, seu elemento, adiciona ou remove a classe
        section.elemento.classList.add(this.classAtivo);
      } else if (section.elemento.classList.contains(this.classAtivo)) {
        section.elemento.classList.remove(this.classAtivo);
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistancia();
      //já chama o método checarDistancia para rodar uma vez para a primeira section acontecer
      //e não esperar chegar na metade da tela
      this.checarDistancia();
      window.addEventListener('scroll', this.checarDistancia);
    }
    return this;
  }

  //se precisar parar a função, apenas coloque sua const, let .stopScrollAnimation()
  stopScrollAnimation() {
    window.removeEventListener('scroll', this.checarDistancia);
  }
}
