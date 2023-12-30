export default class Funcionamento {
  constructor(funcionamento, activeClass) {
    this.funcionamento = document.querySelector(funcionamento);//li com dias semana
    this.activeClass = activeClass;
  }

  dadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(',').map(Number);//Array: 1,2,3,4,5
    this.horarioSemana = this.funcionamento.dataset.horario.split(',').map(Number);//Array: 8, 18
  }

  dadosAgora() {
    this.dataAgora = new Date();//str com dia, horário, etc
    this.diaAgora = this.dataAgora.getDay(); //semana vai de 0-6. Retorna o número, se for sábado:6
    this.horarioAgora = this.dataAgora.getUTCHours() - 3;//Horário de Brasília, apenas horas
  }

  estaAberto() {
    //o dia da semana de seg a sex e o dia de agora são diferentes de -1
    //a semana vai de 1 a 5, se for sábado, dia 6, 'this.diasSemana.indexOf(this.diaAgora)' retornará - 1
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;
    const horarioAberto = (this.horarioAgora >= this.horarioSemana[0] && this.horarioAgora < this.horarioSemana[1]);
    return semanaAberto && horarioAberto;//se ambos forem true, retorna true
  }

  ativaSeAberto() {
    if (this.estaAberto()) {
      this.funcionamento.classList.add(this.activeClass);//muda para verde
    }
  }

  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAgora();
      this.ativaSeAberto();
    }
    return this;
  }
}
