//private
import StarshipService from "./starshipService.js";


let _ssService = new StarshipService()

function drawStarships() {
  let starships = _ssService.Starships
  let template = ''
  starships.forEach(p => {
    template += p.BasicTemplate
  })
  //handles people list
  document.getElementById('sw-starships').innerHTML = template
  document.getElementById('ssButtons').innerHTML = `
    <button ${_ssService.Previous ? '' : 'disabled'} onclick="app.controllers.ssController.getStarships('${_ssService.Previous}')">Previous</button>
    <button ${_ssService.Next ? '' : 'disabled'} onclick="app.controllers.ssController.getStarships('${_ssService.Next}')">Next</button>
    `
}

function drawActiveStarship() {
  document.getElementById('active-starship').innerHTML = _ssService.ActiveStarship.DetailedTemplate
}

//public
export default class StarshipController {
  constructor() {
    //add subscribers to service
    _ssService.addSubscriber('starships', drawStarships)
    _ssService.addSubscriber('activeStarship', drawActiveStarship)


    _ssService.getAllApiStarships()
  }

  getStarships(url) {
    _ssService.getAllApiStarships(url)
  }
  getStarship(url) {

    _ssService.getOneApiStarship(url)
  }

}