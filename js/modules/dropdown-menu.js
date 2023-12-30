import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(menus, events) {
    this.dropdownMenus = document.querySelectorAll(menus);

    //se o usuário não definir um argumento padrão para events
    //será colocado touchstart e click
    if (events === undefined) {
      this.events = ['touchstart', 'click'];
    } else {
      this.events = events;
    }
    this.activeClass = 'active';
    this.activeDropDownMenu = this.activeDropDownMenu.bind(this);
  }

  //ativa o dropdown menu e adiciona a função
  //que observa o clique fora dele
  activeDropDownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  //adciona os eventos ao dropdown menu
  addDropDownMenuEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropDownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropDownMenuEvent();
    }
    return this;
  }
}
