import logo from './logo.svg';
import data from './data';
import './App.css';
import React from 'react';

/*Components*/

import Aside from './Aside';
import Main from './Main';
import Cart from './Cart';

class App extends React.Component{
    constructor(props){
      super();
      this.state={
          selectedSizes:[],
          cartItems:[],
          cartVisible:false,
      }
  }

  handleAddToCart=(p)=>{
    let isPresent=this.state.cartItems.findIndex((product)=>product.id===p.id) !== -1;
    if(isPresent){
      this.incrementQuantity(p.id);
    }
    else{
      this.setState((prevState)=>{
        return{
          cartItems:prevState.cartItems.concat({...p,quantity:1}),
        }
      })
    }
    
  }

  // componentDidUpdate(){
  //   this.handleUpdateLocalStorage();
  // }

  componentDidMount(){
    if(localStorage.carts){
      this.setState({
        cartItems:JSON.parse(localStorage.carts),
      })
    }
  window.addEventListener('beforeunload',this.handleUpdateLocalStorage);
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload',this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage=()=>{
    localStorage.setItem("carts",JSON.stringify(this.state.cartItems));
  }

  incrementQuantity=(id)=>{
    this.setState((prevState)=>{
      let updatedCartItems=prevState.cartItems.map(p=>{ 
        if(p.id===id){
          return{
            ...p,
            quantity:p.quantity+1
          }
        }
        return p;
      });
      return {
        cartItems:updatedCartItems
      };
    })
  }

  decrementQuantity=(id)=>{
    this.setState((prevState)=>{
      let updatedCartItems=prevState.cartItems.map(p=>{ 
        if(p.id===id){
          return{
            ...p,
            quantity:p.quantity-1
          }
        }
        return p;
      })
      return {
        cartItems:updatedCartItems
      };
    })
  }


  deleteItem=(id)=>{
    console.log('Delete Item');
    this.setState((prevState)=>{
      let updatedCartItems=prevState.cartItems.filter(p=>{ 
          return p.id!==id
      })
      return {
        cartItems:updatedCartItems
      };
    })
  }



  handleSize=(size)=>{
      if(this.state.selectedSizes.includes(size)){
          this.setState((prevState)=>{
              return {
                  selectedSizes:prevState.selectedSizes.filter((s)=>s!==size),
              }
          })
      }

      else{
          this.setState((prevState)=>{
              return {
                  selectedSizes:prevState.selectedSizes.concat(size),
              }
          })
      }
  }

  render(){
    return (
      <div className='container flex app'>
        <Aside data={data} selectedSizes={this.state.selectedSizes} handleSize={this.handleSize}/>
        <Main data={data} selectedSizes={this.state.selectedSizes} handleAddToCart={this.handleAddToCart}/>
        {this.state.cartVisible ?
        
        <Cart cartItems={this.state.cartItems} incrementQuantity={this.incrementQuantity} decrementQuantity={this.decrementQuantity} deleteItem={this.deleteItem} cartVisible={this.state.cartVisible}/>
          :<button onClick={()=>this.setState((prevState)=>{
            return {
              cartVisible:!prevState.cartVisible,
            }
          })} className='cart-btn'><img alt="bag-icon" src="./static/bag-icon.png"/> <span className='item-count'>{this.state.cartItems.reduce((acc,cv)=>{
            acc=acc+cv.quantity;
            return acc;
        },0)}</span></button>
      }
      </div>
    )
  }
}



export default App;
