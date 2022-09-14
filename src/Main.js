import Products from './Products';

function Main(props){
    let {products}=props.data;
    return(
        <div className='col-75'>
            <Products products={products} selectedSizes={props.selectedSizes} handleAddToCart={props.handleAddToCart}/>
        </div>
    )
}

export default Main;