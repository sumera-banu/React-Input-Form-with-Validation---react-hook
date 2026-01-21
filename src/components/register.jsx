import React from "react";
import { useState} from "react"
import { useNavigate,useLocation } from "react-router-dom";

function Register(){

    const navigate = useNavigate();
    const location=useLocation();
    
    const[formData, setFormData]=useState(location.state || {
         name:"", gender:"",address:"",mobile:"",city:"",state:"",dob:"",agree:false,
    
      });

    const[nameError, setNameError]=useState("");
    const[mobileError, setMobileError]=useState("");
    const[addressError, setAddressError]=useState("");

    const capitalizeName=(text)=>{
      return text.toLowerCase().split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}

      
    
       
    const handleChange =(e) => {

      const{name, value, type, checked}=e.target;

      let newValue=value;

      if(name==="name"){
        newValue=capitalizeName(value);
      }

      if(name==="mobile"){
        setMobileError(false);
      }
      
      if(name==="address"){
        setAddressError(false);
      }
      setFormData({...formData, [name]: type === "checkbox" ? checked : newValue,})
      }

    
    
      const handleSubmit = (e)=>{
        e.preventDefault();
        
        let valid = true;

        setNameError("");
        setMobileError("");
        setAddressError("");

        const regName = /^[A-Za-z -.]{3,25}$/;
         if(!regName.test(formData.name)){
          setNameError("Please enter only characters with 3-25 length ");
          valid=false;
        }

         const regMobile=/^[6-9]\d{9}$/;
          if(!regMobile.test(formData.mobile)){
          setMobileError("Please enter 10 digit start with 6,7,8,9 ");
         valid=false;
        }
        
        const regAddress = /^[A-Za-z0-9 ,.-]{15,100}$/;
         if (!regAddress.test(formData.address)) {
          setAddressError("Please enter address with 15-100 length" );
         valid=false;
        }
    
         if(!formData.agree){
          alert("please confirm that entered data is correct");
          return;
        }
       if (valid) {
          navigate("/result", { state: formData });
       }
      }
                
      
    return(
    <>
<h2>Registration Page</h2>

    <form className="page" onSubmit={handleSubmit}>
     <div className="field">
       <label>Name:</label><br/>
      <input className="text-input" type="text" name="name" value={formData.name} onChange={handleChange}  />
       {nameError && <p  className="error">{nameError}</p>}
      </div>

       <div className="field">
        <label>Gender:</label><br/>
      <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
      <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
      <input type="radio" name="gender" value="Others" onChange={handleChange} /> Others
       </div>

      <div className="field">
        <label>Address:</label><br/>
      <textarea  className="text-input" name="address" value={formData.address} onChange={handleChange} />
            {addressError && <p  className="error">{addressError}</p>}

      </div>

      <div className="field">
         <label>Phone Number:</label><br/>
        <input  className="text-input"  type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
        {mobileError && <p  className="error">{mobileError}</p>}
      </div>

      <div className="field">
        <label>City:</label><br/>
      <select  className="text-input" name="city" value={formData.city} onChange={handleChange} >
        <option value="">Select city</option>
        <option value="Banglore">Banglore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>
      </div>

      <div className="field">
        <label>State:</label><br/>
      <select  className="text-input" name="state" value={formData.state} onChange={handleChange} >
        <option value="">Select state</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
      </select>
      </div><br/>

      <div className="field">
        <label>Date of Birth:</label><br/>
        <input type="date"  name="dob" value={formData.dob} onChange={handleChange} />
      </div>
      
      <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange}  />
      <label>I confirm that entered data is correct</label>
      <br/>
       <button type="submit">Submit</button>
    </form>
    </>
)}

export default Register