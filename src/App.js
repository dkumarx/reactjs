import React, {Component} from 'react';
import './App.css';

let personalData = {
  firstName: "Dhananjay",
  lastName: "Kumar",
  Address: "South Melbourne, VIC",
  age: 40
}
class App extends Component {
  constructor(props) {
     super(props);
     
     this.state = {
        data: 0
     }
     this.setNewNumber = this.setNewNumber.bind(this)
  };
  setNewNumber() {
     this.setState({data: this.state.data + 1})
  }
  render() {
     return (
       <section>
        <div>
           <Content 
              myNumber = {this.state.data}
              firstName={personalData.firstName}
              lastName={personalData.lastName}
              Address={personalData.Address}
              age={personalData.age}></Content>
           <hr />
           <button onClick = {this.setNewNumber}>INCREMENT</button>
        </div>
      </section>
     );
  }
}

class SimpleCounter extends React.Component {
  render () {
    const {msg, minutes, color} = this.props;
    const style = {color: color}
    return (
      <div>
        <h1 style={style}>{msg}</h1>
        <p>Binding props data; static - {minutes}, counter value - {this.props.increments}</p>
      </div>
    )
  }
}
class Content extends Component {
  /*
  * REACT :: components LIFECYCLE work as on below order
  *          which is depends on user action on page/components
  */

  // Order #1:: Execute On load
  componentWillMount() {
     console.log('Component WILL MOUNT!')
  }
  // Order #2:: Execute On load
  componentDidMount() {
     console.log('Component DID MOUNT!')
  }
  // Order #3
  componentWillReceiveProps(newProps) {    
     console.log('Component WILL RECIEVE PROPS!')
  }
  // Order #4
  shouldComponentUpdate(newProps, newState) {
     console.log('Component SHOULD UPDATE');
     return true;
  }
  // Order #5
  componentWillUpdate(nextProps, nextState) {
     console.log('Component WILL UPDATE!');
  }
  // Order #6
  componentDidUpdate(prevProps, prevState) {
     console.log('Component DID UPDATE!')
  }
  // Order #7 :: FINAL WHICH COMPONENT WILL UNMOUNT FROM LIFECYCLE HOOK
  componentWillUnmount() {
     console.log('Component WILL UNMOUNT!')
  }
  render() {
     const {firstName, lastName, Address, age} = this.props;
     return (
        <div>
           <SimpleCounter 
              color="blue" 
              msg="Hello React!" 
              minutes={5} 
              increments={this.props.myNumber} />

              <h2>{firstName} {lastName} - {age} years, {Address} </h2>

        </div>
     );
  }
}

export default App;
