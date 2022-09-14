import React from 'react';

class Products extends React.Component{
    constructor(props){
        super();
        this.state={
            selectedOrder:''
        }
    }
    handleOrderBy=(event)=>{
        this.setState({
            selectedOrder:event.target.value,
        },()=>console.log(this.state.selectedOrder))
    }

    handleOrderProducts=(order,sizes,products)=>{
        let sortedProducts=[...products];
        if(sizes.length>0){
            sortedProducts=sortedProducts.filter((p)=>{
                for(const size of sizes){
                   if(p.availableSizes.includes(size)){
                       return true;
                   } 
                }
           })
        }
        if(order ==='highest'){
            sortedProducts=sortedProducts.sort((a,b)=>b.price - a.price)
        }
        if(order ==='lowest'){
            sortedProducts=sortedProducts.sort((a,b)=>a.price - b.price)
        }
        return sortedProducts;
    }


    render(){

        let {selectedOrder}=this.state;
        let products=this.handleOrderProducts(selectedOrder,this.props.selectedSizes, this.props.products);


        return(
            <div className='center'>
                <p className='noOfProducts'>{`${this.props.products.length} Product${this.props.products.length>1?'(s)':''} found`}</p>

                <OrderBy 
                selectedOrder={selectedOrder}
                handleOrderBy={this.handleOrderBy}
                />

                 <div className='flex'>
                {products.map((product)=><Product key={product.id} product={product} handleAddToCart={this.props.handleAddToCart}/>)}
            </div>
            </div>
        )
    }
}

function OrderBy(props){
    return(
        <select value={props.selectedOrder} onChange={props.handleOrderBy}>
            <option value=''>Select</option>
            <option value='lowest'>Lowest to Highest</option>
            <option value='highest'>Highest to Lowest</option>
        </select>
    );
}

function Product(props){
    return(
        <div className='product-item width-22 flex-col'>
            <div className='product-label'></div>
                <img alt={props.product.title} className='product-item-img' src={`./static/products/${props.product.sku}_1.jpg`}/>
                <div className='product-item-details flex-col'>
                    <p className='product-item-title'>{props.product.title}</p>
                    <div className='line'></div>
                    <h3 className='product-item-price'>${props.product.price}</h3>
                </div>
                <button className='btn-cart' onClick={()=>props.handleAddToCart(props.product)}>Add to Cart</button>
        </div>
    )
}

export default Products;