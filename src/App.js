import React from 'react';
import { CardList } from './components/card-list/card-list.component';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }
  render() {
    return (
      <div className="App">
        <input
          type="search"
          placeholder="search monsters"
          onChange={e =>
            // setState 是一個非同步的事件,可以利用setState的第二個參數 再往下做
            this.setState({ searchField: e.target.value }, () =>
              console.log(this.state)
            )
          }
        />
        <CardList monsters={this.state.monsters} />
      </div>
    );
  }
}

export default App;
