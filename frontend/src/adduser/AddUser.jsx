import React, { useState } from "react";
import "./adduser.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {

    const users = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
    };

    const [user, setUser] = useState(users);

    const navigate = useNavigate();


    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser((prevData)=>({
            ...prevData,
            [name]:value
        }))
        console.log(name, value)
    };

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8008/api/auth/register", user)
        .then((response)=>{
            toast.success(response.data.message, {position: "top-right"});
            navigate('/');
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  return (
    <>
      <div className="addUser">
        <Link to='/' type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> back</Link>
        <h3>Add New User</h3>
        <form className="addUserForm" onSubmit={submitForm} action="">
          <div className="inputGroup">
            <label htmlFor="firstname">Firstname:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={inputHandler}
              autoComplete="on"
              placeholder="Enter your firstname"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lastname">Lastname:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={inputHandler}
              autoComplete="on"
              placeholder="Enter your lastname"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={inputHandler}
              autoComplete="on"
              placeholder="Enter your email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">password:</label>
            <input
              type="password"
              id="email"
              name="password"
              onChange={inputHandler}
              autoComplete="on"
              placeholder="Enter your password"
            />
          </div>
          <div className="inputGroup">
            <button type="submit" className="btn btn-primary" name="submit">submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
