function Increment(props){
    return(
        <button className="quantity-btn" onClick={props.incrementQuantity}>+</button>
    );
}

export default Increment;