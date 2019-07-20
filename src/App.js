import React, {Component} from 'react';
import './App.css';

let personalData = {
  firstName: "Dhananjay",
  lastName: "Kumar",
  Address: "South Melbourne, VIC",
  age: 41
}

//Library 
let BookList = [
   {"title": "Out bond", "author": "Micheal", "pages": 300},
   {"title": "Auto Immune", "author": "Dr. Myer", "pages": 350},
   {"title": "The Myth", "author": "Charls", "pages": 200}
]

const Book = ({title, author, pages, freeBookmark}) => {
   return (
      <section>
         <h2>{title}</h2>
         <p>by: {author}</p>
         <p>Pages: {pages} pages</p>
         <p>Free Bookmark today: {freeBookmark ? 'Yes' : 'No'}</p>
      </section>
   )
}

// Create functional component W/O retun 
const Available = () => <div>Self checkout is Available today to borrow!!</div>
const NotAvailable = () => <div>Self checkout is NOT available today!!</div>

class Library extends Component {
   // Initiallizing state as ES6 pattern
   state = { 
      open: true,
      freeBookmark: false, 
      available: true,
      data: [],
      loading: false
   }
   // Change state based on prevState so that it will maintain state 
   toggleOpenClosed = () => {
      this.setState(prevState => ({
         open: !prevState.open
      }))
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
      this.setState({loading: true})
      fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
          .then(data => data.json())
          .then(data => this.setState({data, loading:false}))
   }

   render () {
      const {books} = this.props;
      return (
            <div>
               {/* Display products from REST API */}
                  {
                     this.state.loading
                     ? "loading..."
                     : <article>
                        {
                           this.state.data.map(product => {
                              return (
                                 <div key={product.id}>
                                    <h3>Library Product of the week!</h3>
                                    <h4>{product.name}</h4>
                                    <img src={product.image} height={100} alt="" />
                                 </div>
                              )
                           })
                        }<hr />
                     </article>
                     
                  }
               <h1>The librry is {this.state.open ? 'open' : 'closed'}</h1>
               <h2>{this.state.available ? <Available /> : <NotAvailable />}</h2>
               <button onClick={this.toggleOpenClosed.bind(this)}>Change</button>
               {books.map(
                  (book, i) => <Book 
                     key={i}
                     title={book.title}
                     author={book.author}
                     pages={book.pages}
                     freeBookmark={this.state.freeBookmark} />
               )}
            </div>
         ) 
   }
}

// Funcational based React component rendering
// Param:  Props and implemented as ES6 parameter of funciton as object
// Funcational based React component - we cann't used state. We need to used only Props
const SimpleCounter = ({msg, minutes, color, increments}) => {
   const style = {color: color}
   return (
      <div>
         <h1 style={style}>{msg}</h1>
         <p>Binding props data; static - {minutes}, counter value - {increments}</p>
      </div>
   )
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
       <section  style={{padding: "20px"}}>
           <Content 
              myNumber = {this.state.data}
              firstName={personalData.firstName}
              lastName={personalData.lastName}
              Address={personalData.Address}
              age={personalData.age}></Content>
           <button onClick = {this.setNewNumber}>INCREMENT</button>
           <hr />
           <Library books={BookList} />
      </section>
     );
  }
}

class Content extends Component {
  /*
  * REACT :: components LIFECYCLE work as on below order
  *          which is depends on user action on page/components
  */

  // Order #1:: Execute On load
  // @depecreated : componentWillMount is deprecated in react 16.3 and stop working in 17.0
  componentWillMount() {
     console.log('Component WILL MOUNT!')
  }
  // Order #2:: Execute On load
  componentDidMount() {
     console.log('Component DID MOUNT!')
  }
  // Order #3
  // @depecreated : componentWillReceiveProps is deprecated in react 16.3 and stop working in 17.0
  componentWillReceiveProps(newProps) {    
     console.log('Component WILL RECIEVE PROPS!')
  }
  // Order #4
  shouldComponentUpdate(newProps, newState) {
     console.log('Component SHOULD UPDATE');
     return true;
  }
  // Order #5
  // @depecreated : componentWillUpdate is deprecated in react 16.3 and stop working in 17.0
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
