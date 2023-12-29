//dica/mensagem no mapa
export default class Tooltip {
  constructor(elementToolTip) {
    this.tooltips = document.querySelectorAll(elementToolTip);

    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  //move a tooltip de acordo com seus estilos e posição/tamanho da tela
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 150}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  //retira os eventos quando coloco o mouse fora, e remove a mensagem
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    currentTarget.removeEventListener('mousemove', this.onMouseMove);
  }

  //criação de tooltip box e coloca em uma div
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    this.tooltipBox = tooltipBox;
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
  }

  onMouseOver({ currentTarget }) {
    //cria a tooltip box e colova em uma propriedade
    this.criarTooltipBox(currentTarget);//mapa
    currentTarget.addEventListener('mousemove', this.onMouseMove);
    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }

  addToolTipEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addToolTipEvent();
    }
    return this;
  }
}
