import React from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchField: '',
      meaningOfLife: 47 + this.props.increment,
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  //需要綁定this
  // handleChange(e) {
  //   this.setState({ searchField: e.target.value });
  // }

  //不用綁定this
  handleChange = e => {
    // setState 是一個非同步的事件,可以利用setState的第二個參數 再往下做
    this.setState({ searchField: e.target.value }, () =>
      console.log(this.state)
    );
  };

  // 這是比較好的寫法 用來解決非同步的問題
  handleClick = () => {
    this.setState(
      (prevState, prevProps) => {
        return {
          meaningOfLife: prevState.meaningOfLife + prevProps.increment,
        };
      },
      () => console.log(this.state.meaningOfLife)
    );
  };
  render() {
    const { monsters, searchField } = this.state;
    const filterMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        {/* <input
          type="search"
          placeholder="search monsters"
          onChange={e =>
            // setState 是一個非同步的事件,可以利用setState的第二個參數 再往下做
            this.setState({ searchField: e.target.value }, () =>
              console.log(this.state)
            )
          }
        /> */}
        <h1>Monsters Rolodex</h1>
        <p>{this.state.meaningOfLife}</p>
        <button onClick={this.handleClick}>test btn</button>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filterMonsters} />
      </div>
    );
  }
}

export default App;
