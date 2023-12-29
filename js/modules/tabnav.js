//Mudança do conteúdo ao clique
export default class TabNav {
  constructor(menu, content) {
    this.tabMenu = document.querySelectorAll(menu); //imagens animais
    this.tabContent = document.querySelectorAll(content); //conteúdo referente a cada animal
    this.activeClass = 'ativo';
  }

  //ativa a tab de acordo com o index da mesma
  activeTab(index) {
    this.tabContent.forEach((sectionConteudo) => {
      sectionConteudo.classList.remove(this.activeClass);
    });
    const direcao = this.tabContent[index].dataset.anime; //data-anime="show-right"
    this.tabContent[index].classList.add(this.activeClass, direcao); //a direção é passada aqui para ter a transição, apenas.
  }

  //adiciona os eventos as tabs
  addTabNavEvent() {
    this.tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => this.activeTab(index));
    });
  }

  init() {
    if (this.tabMenu.length && this.tabContent.length) {
      //ativar primeiro item sempre que a página for carregada
      this.activeTab(0);
      this.addTabNavEvent();
    }
  }
}
