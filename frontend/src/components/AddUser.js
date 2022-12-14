import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
 
export default function Create() {
 const [form, setForm] = useState({
   firstName: "",
   lastName: "",
   email: "",
   userName: "",
   password: "",
   isAdmin: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // Reset the forum fields for the user.
 function resetFields() {
  setForm({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    isAdmin: "",
  })
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, add a new document to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:4000/user/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    isAdmin: "",
   });
   navigate("/blog/users");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    color: '#0f0f0f', width: '50%', margin: '100px auto', paddingBottom: '20px', 
    background: 'linear-gradient(to bottom, transparent, white, white, transparent)'
    }}>

     <h3>Create New User</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="firstName">First Name</label>
         &nbsp;
         <input
           type="text"
           className="form-control"
           id="firstName"
           value={form.firstName}
           onChange={(e) => updateForm({ firstName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="lastName">Last Name</label>
         &nbsp;
         <input
           type="text"
           className="form-control"
           id="lastName"
           value={form.lastName}
           onChange={(e) => updateForm({ lastName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email" style={{paddingRight: '30px'}}>E-Mail</label>
         &nbsp;
         <input
           type="email"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="userName">Username</label>
         &nbsp;
         <input
           type="text"
           className="form-control"
           id="userName"
           value={form.userName}
           onChange={(e) => updateForm({ userName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password" style={{paddingRight: '10px'}}>Password</label>
         &nbsp;
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
          &nbsp; &nbsp;
          <Button variant="contained" onClick={resetFields}>
            Reset Fields
          </Button>
       </div>
     </form>
   </div>
 );
}