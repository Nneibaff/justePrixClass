class MyApp {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.start();
    console.log(this.htmlElement);
  }

  start() {
    new Affichage(this.htmlElement);
  }
}

class Affichage {
  constructor(htmlElement) {
    this.prix = Math.floor(Math.random() * 100) + 1;

    this.lastUserAttemp;
    this.resultMessage = [];
    this.attemps = 0;
    this.inputElement = null;
    this.ulElement = null;
    this.htmlElement = htmlElement;

    this.buildTemplate();
    this.InitEvents();
  }

  buildTemplate() {
    this.htmlElement.innerHTML = `
      <h1>JUSTE PRIX</h1>
      
      <input type="number" id="inputElement" value=""></input>
      
      <button id="proposer">proposer</button>
      <button id="reponse">reponse</button>
      <button id="reset" >reset</button>
      
      
      <ul id="ulElement"></ul>
      `;

    this.inputElement = this.htmlElement.querySelector('#inputElement');
    this.ulElement = this.htmlElement.querySelector('#ulElement');
  }

  InitEvents() {
    this.htmlElement
      .querySelector('#proposer')
      .addEventListener('click', () => {
        const { value } = inputElement; // recupere la value de l'element et la met dans une variable value
        const userValue = Number(value);

        this.attemps++;

        let message;
        if (userValue > this.prix) {
          message = `c'est moins que ${userValue}`;
        }
        if (userValue < this.prix) {
          message = `c'est plus que ${userValue}`;
        }
        if (userValue === this.prix) {
          message = `felicitation!! ${this.userValue} est le juste prix!! vous avez trouvé en ${this.attemps} tentatives`;
        }

        // stock message dans tableau
        this.resultMessage.push(`${message}`);

        //affichage avec tableau
        this.ulElement.innerHTML = this.resultMessage
          .map((element) => {
            return `<li>${element}</li>`;
          })
          .join(''); // par defaut ajoute des virgules entre les elements, avec .join on les enleve
      });

    this.htmlElement.querySelector('#reponse').addEventListener('click', () => {
      this.ulElement.innerHTML = `<br/> dommage, aprés ${this.attemps} tentative(s), ${this.prix} est le juste prix`;
    });

    this.htmlElement.querySelector('#reset').addEventListener('click', () => {
      this.ulElement.innerHTML = ``;
      this.inputElement.value = '';
      this.prix = Math.floor(Math.random() * 100) + 1;
      this.attemps = 0;
    });
  }
}

new MyApp(document.querySelector('#myApp'));
