import React,{useState} from 'react'
import { API_URL } from '../../helpers_utilitys/ApiPath';

const AddFirm = () => {

   const [firmName , setFirmName ]= useState("");
   const [area , setArea ]= useState("");
   const [category , setCategory ] = useState([]);
   const [region , setRegion ] = useState([]);
   const [offer , setOffer ] = useState("");
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

    const handleRegionChange = (e)=>{
      const value = e.target.value;
      if(region.includes(value)){
         setRegion(region.filter((item)=> item !==value));
      }
      else{
         setRegion([...region, value]);
      }
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


const handlerFirmSubmit = async(e)=>{
      e.preventDefault();
      try {
         const loginToken = localStorage.getItem("loginToken");
         if(!loginToken){
            console.error("No login token found or user not authenticated");
            alert("please login first to add firm");
            return; // stop submission when not authenticated
         }
         const formData = new FormData();
         formData.append("firmName", firmName);
         formData.append("area",area);
         // formData.append("category",JSON.stringify(category));

         category.forEach((value) =>{
            formData.append("category",value)
         });

         region.forEach((value)=>{
            formData.append("region",value)
         });

         // formData.append(("region",JSON.stringify(region)));
         formData.append("offer",offer);
         // only append image when a file is selected
         if (image) {
            formData.append("image", image);
         }

         const response = await fetch(`${API_URL}/firm/add-firm`,{
            method:"POST",
            headers:{
               'token': `${loginToken}`
            },
            body: formData
         });
         const data = await response.json();
         if(response.ok){
            console.log("Firm added successfully",data);
            setFirmName("");
            setArea("");
            setCategory([]);
            setRegion([]);
            setOffer("");
            setImage(null);
            alert("Firm added successfully");
         }else if(data.message === "vendor can have only one firm"){
            alert("vendor can have only one firm ");
         }else{
            alert("failed to add firm");
         }
         console.log("this is firmId", data.firmId);
         const firmId = data.firmId;
         localStorage.setItem("firmId",firmId);
      } catch (error) {
         console.error("Error adding firm or failed to add product", error);
      }

}
   
  return (
    <div className='firmSection'>
        <form className="restroForm" onSubmit={handlerFirmSubmit} >
            <h2 className='header'>Add Firm</h2>
            <label>Firm Name</label>
            <input type='text' name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}  placeholder='Enter the Firm/restront Name'/>

            <label>Area</label>
            <input type='text' name='area' value={area} onChange={(e)=>setArea(e.target.value)} placeholder='Enter the Firm/restront Name'/>

            {/* <label>Category</label>
            <input type='text' placeholder='Enter the Firm/restront Name'/> */}

            <div className="checkInp">
                <label>Category</label>
                   <div className="inputBoxContainer">
                      <div className="checkboxContainer">
                         <label >Veg</label>
                         <input type='checkbox' checked={category.includes("veg")} value="veg" onChange={ handleCategoryChange }/>
                      </div>
                     <div className="checkboxContainer">
                        <label >Non-Veg</label>
                        <input type='checkbox' checked={category.includes("non-veg")} value="non-veg" onChange={handleCategoryChange}/>
                     </div>
                     {/* <div className="checkboxContainer">
                        <label >Both</label>
                        <input type='checkbox' checked={category.includes("veg , Non-veg ")} value={Both} onChange={handleCategoryChange}/>
                     </div> */}
                   </div>
            </div>



            {/* <label>Region</label>
            <input type='text' placeholder='Enter the Firm/restront Name'/> */}

            <div className="checkInp">
                <label>Region</label>
                   <div className="inputBoxContainer">
                      <div className="checkboxContainer">
                         <label >South-Indian</label>
                         <input type='checkbox' checked={region.includes("south-indian")} value="south-indian" onChange={handleRegionChange} />
                      </div>
                     <div className="checkboxContainer">
                        <label >North-Indian</label>
                        <input type='checkbox' checked={region.includes("north-indian")} value="north-indian" onChange={handleRegionChange} />
                     </div>
                     <div className="checkboxContainer">
                        <label >Chinese</label>
                        <input type='checkbox' checked={region.includes("chinese")} value="chinese" onChange={handleRegionChange} />
                     </div>
                     <div className="checkboxContainer">
                        <label >Bakery</label>
                        <input type='checkbox' checked={region.includes("backery-items")} value="backery-items" onChange={handleRegionChange}  />
                     </div>
                   </div>
            </div>



            <label>Offer</label>
            <input type='text' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)} placeholder='Enter the Firm/restront Name'/>

            <label>Firm/Restront Image</label>
            <input type='file' onChange={handleImageChange}/>
           

             <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
      
        </form>
    
    </div>
  )
}

export default AddFirm
