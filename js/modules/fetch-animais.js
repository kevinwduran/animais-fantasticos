import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {

  //cria a div contendo informações com a quantidade de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  //preenche cada animal no DOM.
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  //animação dos números da quantidade de animais
  function animaAnimaisNumero() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  //puxa os animais através de um arquivo JSON
  //cria cada animal usando create animal
  async function criarAnimais() {
    try {
      //fetch espera resposta
      const animaisResponse = await fetch(url);
      //transforma a resposta em JSON
      const animaisJSON = await animaisResponse.json();

      //para cada animal do arquivo Json ele chama a função preencher
      animaisJSON.forEach(animal => preencherAnimais(animal));

      //chama função que anima os números
      animaAnimaisNumero();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
