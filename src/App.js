import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    // creating a state variable to store median returned from api and update the frontend
    this.state = {
      median: []
    };
  }
  // api call to node backend
  connect =  async () => {
    fetch("http://localhost:3001/api/" + this.textInput.value)
         .then((res) => res.json())
         .then((data) => {
            this.setState({median: data.message});
         })
         .catch((err) => {
            console.log(err.message);
            this.setState( { median: ['Error!']});
         });
  }

  componentDidMount() {
    console.log('Component mounted!');
  }
  
  render() {
    return (
      <div>
        <input type="number" ref={(input) => this.textInput = input}  data-testid="input"/>
        <button onClick={() => this.connect()}>Get Median</button>
        <div id="median">The medians are: 
          <div data-testid="median">
            {this.state.median}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
