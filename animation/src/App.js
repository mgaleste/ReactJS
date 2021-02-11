import React, { Component } from "react";
import Transition from 'react-transition-group/Transition'

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  }

  showModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button 
        onClick={() => this.setState(prevState => ({showBlock: !prevState.showBlock}))}>Toggle</button> <br/>
        {/*{this.state.showBlock ?*/}
        <Transition 
          in={this.state.showBlock} 
          timeout={2000}
          mountOnEnter
          unmountOnExit
          onEnter={()=>console.log('onEnter')}
          onEntering={()=>console.log('onEntering')}
          onEntered={()=>console.log('onEntered')}
          onExit={()=>console.log('onExit')}
          onExiting={()=>console.log('onExiting')}
          onExited={()=>console.log('onExited')}
          > 
        {state => (
          <div style={{
              backgroundColor: 'red', 
              height:100, 
              width:100,
              margin:'auto',
              transition: 'opacity 1.5s ease-out',
              opacity: state==='exited' ? 0: 1
          }}></div> 
        )}
        
        </Transition>
        {/*: null }*/}

            <Modal show={this.state.modalIsOpen} closed={this.closeModal}/>

        
        {this.state.modalIsOpen ?
        <Backdrop show /> :
        null
        }
        
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;   
