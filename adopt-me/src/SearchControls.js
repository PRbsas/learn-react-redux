import React from 'react';
import petfinder from './petfinder-client';
const pf = petfinder()

const SearchControls = React.createClass({
  getInitialState() {
    return {
      breeds: []
    }
  },

  componentDidMount() {
    this.getNewBreeds(this.props.animal)
  },
  getNewBreeds(animal) {
    pf.breed.list({ animal })
      .then((data) => {
        if(data.petfinder.breeds) {
          this.setState({ breeds: data.petfinder.breeds.breed })
        }
      })
  },
  handleBreedChange(event) {
    this.props.changeBreed(event.target.value)
  },
  render() {
    const breedSelector = !this.props.animal ? null : (
      <select value={this.props.breed} onChange={this.handleBreedChange}>
        <option value=''></option>
        {this.state.breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
    )
    return (
      <div className='search'>
        {breedSelector}
      </div>
    )
  }
})

export default SearchControls