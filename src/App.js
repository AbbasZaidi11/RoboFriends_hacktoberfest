import {Component} from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component.jsx';
import SearchBox from './components/search-box/search-box.component.jsx';

class App extends Component {
   constructor() {
     super();
     this.state = {
     monsters: [],
     searchField: ''
     };
   }
//movng our onchange call back function to the component for perfomance optimization

onSearchChange = (event)=> {
        const searchField  = event.target.value.toLocaleLowerCase();
        this.setState(() => {
          return { searchField };
        })
       }

   componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => this.setState(() => {
          return {monsters: users}
        }//Writing two functions in then 
        ));
   }

//whenever each changes needs to update the DOM its calls the render menthod
  render() {
    const { monsters , searchField } =  this.state ;
    const { onSearchChange } = this;
        const filteredMonsters = monsters.filter((monster) => {
          return  monster.name.toLocaleLowerCase().includes(searchField);
        });

      return (
      <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
      className = 'monsters-search-box'
      onChangeHandler={onSearchChange} 
      placeholder = 'Search-Monsters'
      />
{/* doubt regarding the flower bracket */}
    <CardList monsters= {filteredMonsters} />
  </div>
      );
    }
  }
  

export default App;
