//private
import Starship from "../models/starship.js";

//Creates an object to send requests from
let _starshipsApi = axios.create({
  baseURL: 'https://swapi.co/api/starships'
})


let _state = {
  starships: [],
  nextPrevStarships: {
    nextUrl: '',
    previousUrl: ''
  },
  activeStarship: {}
}

let _subscribers = {
  starships: [],
  nextPrevStarships: [],
  activeStarship: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn());
}


//public
export default class StarshipService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }
  //get local data
  get Starships() {
    //Breaks Refrences of each object in state
    return _state.starships.map(p => new Starship(p))
  }

  get Next() {
    return _state.nextPrevStarships.nextUrl
  }

  get Previous() {
    return _state.nextPrevStarships.previousUrl
  }

  get ActiveStarship() {
    //Creates a new object that is a copy of the active starship (breaking refrence)
    return new Starship(_state.activeStarship)
  }

  //make a call to swapi api to get all starships
  getAllApiStarships(url = '') {
    _starshipsApi.get(url)
      //Happens after data comes back
      .then(response => {
        //all axios requests return 'data' in the response
        let starships = response.data.results.map(d => new Starship(d))
        let urlData = {
          nextUrl: response.data.next,
          previousUrl: response.data.previous
        }
        setState('nextPrevStarships', urlData)
        setState('starships', starships)
      })
      .catch(err => {
        console.error(err)
      })
  }
  getOneApiStarship(url) {
    _starshipsApi.get(url)
      .then(res => {
        setState('activeStarship', new Starship(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }

}