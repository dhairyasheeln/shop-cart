import Increment from './Increment';
import Decrement from './Decrement';

function CartItem(props){

    // src={`./static/products/${props.cartItem.sku}_2.jpg`}
    return(
        <div className="cart-item flex align-center">
        <img className="cart-item-img" src={`./static/products/${props.cartItem.sku}_2.jpg`} alt='item img' width='80'/>
        <div className="cart-item-details">
            <p className="cart-item-name">{props.cartItem.title}</p>
            <p className="cart-item-style">{props.cartItem.availableSizes[0]} | {props.cartItem.style}</p>
            <p>print Quantity : {props.cartItem.quantity}</p>
        </div>
        <div className="cart-price">
            <p onClick={()=>props.deleteItem(props.cartItem.id)} className="cart-cross">X</p>
            <p className="price">{`${props.cartItem.currencyFormat + props.cartItem.price}`}</p>
            <div>
                <Increment incrementQuantity={()=>props.incrementQuantity(props.cartItem.id)}/>
                <Decrement decrementQuantity={()=>props.decrementQuantity(props.cartItem.id)}/>
            </div>
        </div>
    </div>
    )
}

export default CartItem;