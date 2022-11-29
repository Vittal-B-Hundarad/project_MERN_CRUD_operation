import React from 'react';
// import products from '../../../backend/DB/products';
const AddProduct=()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [id,setid]=React.useState('');
    const [expiryDate,setExpiryDate]=React.useState('');
    const [error, setError]=React.useState(false);
    
    
    const addProduct=async ()=>{
     
        console.warn(!name);
        if(!name || !price || !id || !expiryDate)
        {
           setError(true);
           return false;

        }

     console.warn(name,price,id,expiryDate);
     let userId=JSON.parse(localStorage.getItem('user'))._id;
     console.warn(userId);


     let result = await fetch('http://localhost:5000/add-product',{
        method:'post',
        body:JSON.stringify({name,price,id,expiryDate}),
        headers:{
           'Content-Type':'application/json',
           authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
     }
    
     );
     result=await result.json();
     console.warn(result);
    }
    return (
        <div className='addProducts'>
            <h2>Add Items</h2>

            <input type="text" placeholder='Enter Item name' className='inputbox'
            value={name} onChange={(e)=>{setName(e.target.value)}} />
            {error && !name && <span className='invalid-input' >Enter valid name</span>}

            <input type="text" placeholder='Enter Item price' className='inputbox'
            value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            {error && !price && <span className='invalid-input' >Enter valid price</span>}


            <input type="text" placeholder='Enter item id ' className='inputbox'
            value={id} onChange={(e)=>{setid(e.target.value)}} />
            {error && !id && <span className='invalid-input' >Enter valid category</span>}


           <input type="text" placeholder='Enter product expiry date' className='inputbox'
           value={expiryDate} onChange={(e)=>{setExpiryDate(e.target.value)}} />
           {error && !expiryDate && <span className='invalid-input' >Enter valid company</span>}


        <button onClick={addProduct} className="btn">Add Product</button>
        </div>
    )
}

export default AddProduct;