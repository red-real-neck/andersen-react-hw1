import './App.css';
import { Component } from 'react';
import Card from './modules/Card/Card';
import BeerService from './services/BeerService';
import RegistrationForm from './modules/RegistrationForm/RegistrationForm';

export default class App extends Component {
  beerService = new BeerService('https://api.punkapi.com/v2/beers/?per_page=80');

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    data: null,
    searchTerm: '',
    sortChecked: false,
    isFormOpen: false
    }

    this.changeFormActive = this.changeFormActive.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    this.beerService.getSomeBeers()
      .then(res => {
        console.log(res);
        this.setState({
          data: res,
          isLoaded: true
        });
      })
  }

  renderCards() {
    if (!this.state.isLoaded) {
      throw new Error('Пиво не доехало((');
    }
    const cards = this.state.data.filter(beer => {
      if (this.state.searchTerm === '') {
        return beer;
      } else if (beer.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
        return beer;
      }
    }).sort((a, b) => {
      if (this.state.sortChecked) {
        return a.abv - b.abv;
      } else {
        return b.abv - a.abv;
      }
    }).map((beer) => {
      return <Card key={beer.name} name={beer.name} abv={beer.abv} description={beer.description} img={beer.image_url} />
    })

    return cards;
  }

  changeFormActive(e) {
    if (e.target.id === 'registration_wrapper' || e.target.id === 'close' || e.target.id === 'sign_up_btn') {
      this.setState({isFormOpen: !this.state.isFormOpen});
      console.log(this.state.isFormOpen)
    }
    return;
  }

  signUp(errors) {
    debugger;
    if (Object.keys(errors).length === 0) {
      this.setState({isFormOpen: !this.state.isFormOpen});
    }
  }


  render() {
    return (
      <>
        <div className="main_wrapper">
        <input type="text" className="input" placeholder="Search by beer's name..." onChange={event => {this.setState({searchTerm: event.target.value})}}/>
        <button id='sign_up_btn' className="sign_up_btn" onClick={(e) => this.changeFormActive(e)}>Sign up</button>
        <div className="sort_wrapper">
          <div className="sort_text">Strong at first</div>
          <input type="checkbox" className="sort" onChange={() => this.setState({sortChecked: !this.state.sortChecked})}/>
          <div className="sort_text">Not strong at first</div>
        </div>
          <div className='container'>
            {this.state.isLoaded ? this.renderCards() : <div>loading...</div>}
          </div>
        </div>
        <div className="form">
          {this.state.isFormOpen ? <RegistrationForm signUp={this.signUp} changeFormActive={this.changeFormActive}/> : null}
        </div>
      </>
    )
  }
};