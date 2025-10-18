import React,{useState} from 'react'
import { API_URL } from '../../helpers_utilitys/ApiPath';
// import 

const AddProduct = () => {
   const [productName , setProductName ] = useState("");
   const [price , setPrice ] = useState("");
   const [category , setCategory ] = useState([]);
   const [bestseller , setBestseller ] =useState(false);
   const [ description , setDescription ] = useState("");
   const [image , setImage ] = useState(null);


     const handleCategoryChange = (e)=>{
      const value = e.target.value;
      if(category.includes(value)){
         setCategory(category.filter((item)=> item !==value));
      }
      else{
         setCategory([...category, value]);
      }
   }



   const handleBestsellerChange = (e)=>{
      // const value = e.target.value === "Yes" ? true : false;
      const value = e.target.value === 'true';
      setBestseller(value);

   }


   const handleImageChange = (e)=>{
      // setImage(e.target.files[0]);
      const selectedImage = e.target.files[0];
      if(selectedImage){
         setImage(selectedImage);
      }
      else{
         setImage(null);
      }

   }

   const handleAddProduct = async(e)=>{
      e.preventDefault();
      try {
         const loginToken = localStorage.getItem("loginToken");
         const firmId = localStorage.getItem("firmId");

         if(!loginToken || !firmId){
            console.log("user not authenticated");
            alert("please login first to add product");
         }

         const formData = new FormData();
         formData.append("productName", productName);
         formData.append("price",price);
         // formData.append(("region",JSON.stringify(region)));
         formData.append("description",description);
         // only append image when a file is selected
         // formData.append("image", image);
         if (image) {
            formData.append("image", image);
         }
         // formData.append("category",JSON.stringify(category));
         category.forEach((value) =>{
            formData.append("category",value)
         });

         // bestseller.forEach((value)=>{
         //    formData.append("bestseller",value)
         // });

      // append bestseller flag so backend receives it
      // backend expects field name 'bestSeller' (see productController)
      formData.append('bestSeller', String(bestseller));

         const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
            method: "POST",
            body: formData
         })
         const data = await response.json();
         if(response.ok){
            alert("product added successfully");
            console.log("product added successfully",data);
            setProductName("");
            setPrice("");
            setCategory([]);
            setBestseller(false);
            setDescription("");
            setImage(null);
                   // notify other components (AllProducts) that a new product was added
                   try {
                      const newProduct = data.product;
                      if (newProduct) {
                         window.dispatchEvent(new CustomEvent('product-added', { detail: newProduct }));
                      }
                   } catch (err) {
                      console.warn('product-added event dispatch failed', err);
                   }
         }
      } catch (error) {
         // console.error(data.message);
         console.error("Error adding product ",error)
         alert("failed to add product");
      }
      
   }





  return (
        <div className='firmSection'>
            <form className="restroForm" onSubmit={handleAddProduct}>
                <h2 className='header'>Add Product</h2>
                <label>Product Name</label>
                <input type='text' value={productName} name='productName' onChange={(e)=>setProductName(e.target.value)} placeholder='Enter the Firm/restront Name'/>
                
                <label>price</label>
                <input type='number' value={price} name='price' onChange={(e)=>setPrice(e.target.value)}  placeholder='Enter the Firm/restront Name'/>

                {/* <label>Category</label>
                <input type='text' placeholder='Enter the Firm/restront Name'/> */}

                <div className="checkInp">
                   <label>Category</label>
                        <div className="inputBoxContainer">
                            <div className="checkboxContainer">
                               <label >Veg</label>
                               <input type='checkbox' value="veg" checked={category.includes("veg")} onChange={handleCategoryChange}/>
                            </div>
                            <div className="checkboxContainer">
                               <label >Non-Veg</label>
                               <input type='checkbox' value="non-veg" checked={category.includes("non-veg")} onChange={handleCategoryChange}/>
                            </div>
                            {/* <div className="checkboxContainer">
                               <label >Both</label>
                               <input type='checkbox' value="Both"/>
                            </div> */}
                        </div>
                 </div>


               {/* <label>Best Seller</label>
               <input type='text' placeholder='Enter the Firm/restront Name'/> */}


               <div className="checkInp">
                   <label>Best Seller</label>
                        <div className="inputBoxContainer">
                            <div className="checkboxContainer">
                               <label >Yes</label>
                               <input type='radio' name='bestSeller' value="true" checked={bestseller === true} onChange={handleBestsellerChange}/>
                            </div>
                            <div className="checkboxContainer">
                               <label >No</label>
                               <input type='radio' name='bestSeller' value="false" checked={bestseller === false} onChange={handleBestsellerChange}/>
                            </div>
                        </div>
                 </div>

               <label>Description</label>
               <input type='text' value={description} name='description' onChange={(e)=>setDescription(e.target.value)} placeholder='Enter the Firm/restront Name'/>

               <label>Firm/Product Image</label>
               <input type='file' onChange={handleImageChange} placeholder='Enter the Firm/restront Name'/>
           

              <div className="btnSubmit">
                <button type='submit'>Submit</button>
              </div>
      
        </form>
    
    </div>
   
  )
}

export default AddProduct