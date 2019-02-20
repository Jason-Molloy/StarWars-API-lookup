export default class Starship {
  constructor(data) {
    this.name = data.name
    this.model = data.model
    this.make = data.manufacturer
    this.cost = data.cost_in_credits
    this.crew = data.crew
    this.passengers = data.passengers
    this.hyperdrive = data.hyperdrive_rating
    this.url = data.url
  }

  get BasicTemplate() {
    return `<li onclick="app.controllers.ssController.getStarship('${this.url}')">${this.name}</li>`
  }

  get DetailedTemplate() {
    return `
    <h3>${this.name}</h3>
    <p>Model: ${this.model}</p>
    <p>Make: ${this.make}</p>
    <p>Cost: ${this.cost}</p>
    <p>Crew: ${this.crew}</p>
    <p>Passenger Capacity: ${this.passengers}</p>
    <p>HyperDrive Rating: ${this.hyperdrive}</p>
    `
  }
}