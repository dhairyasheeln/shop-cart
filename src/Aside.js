import React from 'react';

function Aside(props){   

        let {products}=props.data;
        let selectedSizes=props.selectedSizes;

        let sizes=products.reduce((acc,cv)=>{
        acc=acc.concat(cv.availableSizes);
        return acc;
        },[]);
        let uniqueSizes=[...new Set(sizes)];


        return(
            <aside className="aside col-15">
                <h3 className="sizeLabel">Sizes:</h3>

                <div className="sizes">
                        {uniqueSizes.map((size)=><span key={size} onClick={()=>props.handleSize(size)} className={`size ${selectedSizes.includes(size)?'active':''}`}>{size} </span>)}
                </div>
            </aside>
    )    
}

export default Aside;