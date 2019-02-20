import StarWarsController from "./starWarscomponents/starWarsController.js";
import StarshipController from "./starshipComponents/starshipController.js"


class App {
  constructor() {
    this.controllers = {
      swController: new StarWarsController(),
      ssController: new StarshipController()
    }
  }
}


window['app'] = new App()