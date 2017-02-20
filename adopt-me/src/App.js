import React from 'react';
import credentials from './credentials';
import petfinder from './petfinder-client';
import Pet from './Pet';

const pf = petfinder(credentials)

const App = React.createClass ({
  getInitialState() {
    return {
      animal: 'cat',
      breed: 'Domestic',
      location: 'New York City, NY',
      pets: []
    }
  },

  componentDidMount() {
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({ animal, breed, location, output: 'full' })
    promise.then((data) => {
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
      this.setState({ pets })
      console.log(data)
    })
  },

  render() {
    return (
      <div className='app'>
        <img src='./img/adopt-me.png' alt='adopt-me logo' />
        <div>
          { this.state.pets.map((pet) => (
            <Pet key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    )
  }
})

export default App;
