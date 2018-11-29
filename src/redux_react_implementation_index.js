import { createStore } from "redux";
import { connect } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import black from "./images/black.png";
import blue from "./images/blue.png";
import red from "./images/red.png";

/*----------------------------------Redux Configuration------------------------------------*/

// This is the reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SWITCHDEVICECOLOR":
          console.log(state);
          return {activeImageColor: action.payload};
        default:
          return state
  }
}
 
//initialState is optional.
//For this demo, I am using a counter, but usually state is an object
const initialState = {
  activeImageColor: 'red'
};

const updatedState = {
  activeImageColor: 'red'
}

const store = createStore(reducer, initialState);

// Now we're going to listen to any changes in the store, and then console.log() 
// the current state of the store
store.subscribe( () => {
    console.log(store.getState());
    updatedState.activeImageColor = store.getState().activeImageColor;
    console.log("State has changed "  + updatedState.activeImageColor);
})

// function which returns an increment action
const switchDeviceColor = (newColor) => {
  return {
    type: "SWITCHDEVICECOLOR",
    payload: newColor
  }
}

/*----------------------------------Redux Configuration------------------------------------*/

// Left side detailed image of the product
class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.activeImageColor = initialState.activeImageColor;
  }

  render() {
    if(this.props) {
      this.activeImageColor = this.props.activeImageColor;
    }
    return (
      <div className="left-column">
        <p>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii----------{updatedState.activeImageColor}</p>
        <img data-image="black" className={this.activeImageColor === 'black' ? 'active' : null} src={black} alt="" />
        <img data-image="blue" className={this.activeImageColor === 'blue' ? 'active' : null} src={blue} alt="" />
        <img data-image="red" className={this.activeImageColor === 'red' ? 'active' : null} src={red} alt="" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("help");
  return { activeImageColor: state };
}
export default connect(mapStateToProps, null, null, null)(ProductImage);


// Descriptive details of the selected product
class ProductDescription extends React.Component {
  render() {
    return (
      <div className="product-description">
        <span>Headphones</span>
        <h1>Beats EP</h1>
        <p>The preferred choice of a vast range of acclaimed DJs. Punchy, bass-focused sound and high isolation. Sturdy headband and on-ear cushions suitable for live performance</p>
      </div>
    )
  }
}

// Color variants of the product
class ProductColorConfig extends React.Component {
  selectNewColor(evt) {
    store.dispatch(switchDeviceColor(evt.target.value));
  };

  render() {

    return (
      <div className="product-color">
        <span>Color</span>
 
        <div className="color-choose">
          <div>
            <input onClick={this.selectNewColor} data-image="red" type="radio" id="red" name="color" value="red" defaultChecked />
            <label htmlFor="red"><span></span></label>
          </div>
          <div>
            <input onClick={this.selectNewColor} data-image="blue" type="radio" id="blue" name="color" value="blue" />
            <label htmlFor="blue"><span></span></label>
          </div>
          <div>
            <input onClick={this.selectNewColor} data-image="black" type="radio" id="black" name="color" value="black" />
            <label htmlFor="black"><span></span></label>
          </div>
        </div>
      </div>
    )
  }
}

// Other configurable details like memory_size/wired/wireless etc. of the selected product
class ProductOtherConfig extends React.Component {
  render() {
    return (
      <div className="cable-config">
        <span>Cable configuration</span>
        <div className="cable-choose">
          <button>Straight</button>
          <button>Coiled</button>
          <button>Long-coiled</button>
        </div>
        <a>How to configurate your headphones</a>
      </div>
    )
  }
}

// Product's price details
class ProductPriceConfig extends React.Component {
  render() {
    return (
      <div className="product-price">
        <span>148$</span>
        <a className="cart-btn">Add to cart</a>
      </div>
    )
  }
}

// Right side's product detail section
class ProductDetails extends React.Component {

  constructor() {
    super();
    this.selectNewColor = this.selectNewColor.bind(this);
  }
  
  selectNewColor(color) {
    this.props.selectNewColor(color);
  }

  render() {
    return (
      <div className="right-column">
        <ProductDescription />
        <div className="product-configuration">
          <ProductColorConfig colorInfo={this.props.colorInfo} selectNewColor={this.selectNewColor} />
          <ProductOtherConfig />
        </div>
        <ProductPriceConfig />
      </div>
    );
  }
}

// Parent component which is the container for overall product details 
class ParentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeImageColor: 'red',
    };
    this.selectNewColor = this.selectNewColor.bind(this);
  }

  selectNewColor(color) {
    this.setState({activeImageColor : color});
  }

  render() {
    return (
      <main className="container">
        <ProductImage activeImageColor={this.state.activeImageColor} />
        <ProductDetails selectNewColor={this.selectNewColor} colorInfo={this.state.activeImageColor}/>
      </main>
    );
  }
}

// ========================================

ReactDOM.render(
  <ParentContainer />,
  document.getElementById('root')
);