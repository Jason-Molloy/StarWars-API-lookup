//private
import Person from "../models/person.js"


let _peopleApi = axios.create({
  baseURL: 'https://swapi.co/api/people'
})


let _state = {
  people: [],
  nextPrevPeople: {
    nexturl: '',
    previousurl: ''
  },
  activePerson: {}
}

let _subscribers = {
  people: [],
  nextPrevPeople: [],
  activePerson: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn());
}

//public
export default class StarWarsService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  //get local data
  get People() {
    //BREAKS REFERENCES OF EACH OBJECT IN STATE
    return _state.people.map(p => new Person(p))
  }

  get Next() {
    return _state.nextPrevPeople.nextUrl
  }

  get Previous() {
    return _state.nextPrevPeople.previousUrl
  }

  get ActivePerson() {
    //CREATES A NEW OBJECT THAT IS A COPY OF THE ACTIVE PERSON (BREAKING REFERENCE)
    return new Person(_state.activePerson)
  }

  //make a call to swapi to get all people
  getAllApiPeople(url = '') {
    _peopleApi.get(url)
      .then(response => {
        //happens after data comes back
        //all axios requests retrun '.data' in the response
        let people = response.data.results.map(d => new Person(d))
        let urlData = {
          nextUrl: response.data.next,
          previousurl: response.data.previous
        }
        setState('nextPrevPeople', urlData)
        setState('people', people)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //make a call to swapi to get person
  getOneApiPerson(url) {
    _peopleApi.get(url)
      .then(res => {
        setState('activePerson', new Person(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}