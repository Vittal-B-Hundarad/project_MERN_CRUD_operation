import React ,{useEffect} from 'react';
import { Link } from 'react-router-dom';

const ProductList=()=>{
    const [products,setProducts]=React.useState([]);
    
    useEffect(()=>{
        getproducts();
    },[]);

    const getproducts= async ()=>{
        let result =await fetch("http://localhost:5000/products",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await result.json();
        setProducts(result);
    }

    const deleteProduct=async(id)=>{
        console.warn(id);
        let result= await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          
        });
        result=await result.json();
        if(result){
            getproducts();
        }
    }
     const searchHandle=async(event)=>{
      console.warn(event.target.value);  
      let key=event.target.value;
      if(key){

    
      let result =await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })  ;
      result=await result.json();
      if(result){
        setProducts(result);
      } 
    }else{
        getproducts();
    }
     }

    return (
        <div className='product-list'>
            <h2>Items List</h2>
            <input type="text" placeholder='Search items'className='search-product-box'
            onChange={searchHandle}
            />
            <ul >
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Id</li>
                <li>Expiry_date</li>
                {/* <li>company</li> */}
                <li>Operation</li>
            </ul>
            {
              products.length>0?  products.map((item,index)=>
            <ul>
                <li>{index+1}</li>
                <li>{item.name}</li>

                <li>${item.price}</li>
                <li>{item.id}</li>
                <li>{item.expiryDate}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}>Update</Link>
                </li>

            </ul>
                )
                :
                <h2>No Result Found</h2>
            }
           
        </div>
    )
}

export default ProductList;