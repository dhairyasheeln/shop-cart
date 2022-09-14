import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component{
    constructor(props){
        super();
        this.state={
            isOpen:false,
        }
    }

    close=()=>{
        this.setState({
            isOpen:false,
        })
    }

    open=()=>{
        this.setState({
            isOpen:true,
        })
    }

    render(){
        let totalAmount=this.props.cartItems.reduce((acc,cv)=>{
            acc=acc+cv.price * cv.quantity;
            return acc;
        },0)
        return(
            <>
                {this.state.isOpen ?
        
                <aside className='cart'>
                <div className='close-btn' onClick={this.close}>
                    X
                </div>
                <div className='cart-body'>
                    <div className='cart-heading'>
                        <div className='cart-icon'>
                            <img alt='cart-icon' src='./static/bag-icon.png'/>
                            <span className='item-count'>{this.props.cartItems.reduce((acc,cv)=>{
                                acc=acc+cv.quantity;
                                return acc;
                            },0)}</span>
                            <span className='cart-label'>Cart</span>
                        </div>
                    </div>
                    {this.props.cartItems.map((item)=><CartItem key={item.id}
                    cartItem={item}
                    incrementQuantity={this.props.incrementQuantity}
                    decrementQuantity={this.props.decrementQuantity} 
                    deleteItem={this.props.deleteItem }
                    />)}
                    <div className='cart-checkout'>
                        <div className='sub-total flex'>
                        <p className='sub-total-label'>Subtotal</p>
                        <p className='sub-total-amt'>$ {totalAmount}</p>
                        </div>
                    <button onClick={()=>alert(`Total Amount is : ${totalAmount}`)}  className='checkout-btn'>CHECKOUT</button>
                    </div>
                </div>
            </aside>

                  :<button onClick={()=>this.setState((prevState)=>{
                    return {
                      isOpen:!prevState.isOpen,
                    }
                  })} className='cart-btn'><img alt="bag-icon" src="./static/bag-icon.png"/> <span className='item-count'>{this.props.cartItems.reduce((acc,cv)=>{
                    acc=acc+cv.quantity;
                    return acc;
                },0)}</span></button>
              }

              </>

        );
    }
    
}

// function closedCart(){
//     return(
//         <div className='close-cart'>

//         </div>
//     )
// }

export default Cart;