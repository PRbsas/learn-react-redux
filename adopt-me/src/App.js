import React from 'react';
import logo from './img/adopt-me.png';
import credentials from './credentials';
import petfinder from './petfinder-client';
import SearchControls from './SearchControls';
import PetList from './PetList.js';

const pf = petfinder(credentials)

const App = React.createClass ({
  getInitialState() {
    return {
      animal: 'cat',
      breed: 'Domestic',
      location: 'New York City, NY',
      pets: [],
      favorites: []
    }
  },

  componentDidMount() {
    this.search()
  },
  search() {
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({ animal, breed, location, output: 'full' })

    promise.then((data) => {
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
      this.setState({ pets })
      console.log(data)
    })
  },
  changeBreed(breed) {
    this.setState({ breed }, () => this.search())
  },
  changeAnimal(animal) {
    this.setState({ animal, breed: '' }, () => this.search())
  },
  toggleFavorite(pet, toAdd) {
    let { favorites }  = this.state
    favorites = toAdd ? favorites.concat(pet) : favorites.filter((current) => pet.id !== current.id)
    this.setState({ favorites })
  },
  render() {
    return (
      <div className='app'>
        <img src={logo} alt='adopt-me logo' />
        <SearchControls
          breed={this.state.breed}
          animal={this.state.animal}
          changeBreed={this.changeBreed}
          changeAnimal={this.changeAnimal}
        />
        <PetList
          favorites={this.state.favorites}
          pets={this.state.pets}
          title={'Search Results'}
          toggleFavorite={this.toggleFavorite}
        />
        <PetList
          pets={this.state.favorites}
          favorites={this.state.favorites}
          title={'Favorites'}
          toggleFavorite={this.toggleFavorite}
        />
      </div>
    )
  }
})

export default App
