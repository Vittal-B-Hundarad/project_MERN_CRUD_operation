import React, { useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateProduct=()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [id,setId]=React.useState('');
    const [expirydate,setExpiryDate]=React.useState('');
    const params=useParams();
    const navigate=useNavigate();


    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails=async ()=>{
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result=await result.json();
        setName(result.name)
        setPrice(result.price)
        setId(result.id)
        setExpiryDate(result.expirydate)
    }

    const updateProduct=async ()=>{
     
       console.warn(name,price,id,expirydate);
     let result=await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,id,expirydate}),
        headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
     });
     result=await result.json();
     console.warn(result);
     navigate('/');
        }

    return (
        <div className='addProducts'>
            <h2>Update Product </h2>

            <input type="text" placeholder='Enter item name' className='inputbox'
            value={name} onChange={(e)=>{setName(e.target.value)}} />

            <input type="text" placeholder='Enter item price' className='inputbox'
            value={price} onChange={(e)=>{setPrice(e.target.value)}} />


            <input type="text" placeholder='Enter item id' className='inputbox'
            value={id} onChange={(e)=>{setId(e.target.value)}} />


           <input type="text" placeholder='Enter expiry date' className='inputbox'
           value={expirydate} onChange={(e)=>{setExpiryDate(e.target.value)}} />


        <button onClick={updateProduct} className="btn">Update Product</button>
        </div>
    )
}

export default UpdateProduct;