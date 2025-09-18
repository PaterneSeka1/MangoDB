import React, { useEffect, useState } from "react";
import './update.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const Update = () => {

    const users = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
    };

    const [user, setUser] = useState(users);
    const [confirmPassword, setConfirmPassword] = useState(""); // champ de confirmation
    const [passwordMatch, setPasswordMatch] = useState(null); // état pour suivi correspondance

    const navigate = useNavigate();
    const { id } = useParams();


    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser((prevData)=>({
            ...prevData,
            [name]:value
        }))
    };

    // Vérifie en temps réel si les mots de passe correspondent
    useEffect(() => {
        if (user.password || confirmPassword) {
            setPasswordMatch(user.password === confirmPassword);
        } else {
            setPasswordMatch(null);
        }
    }, [user.password, confirmPassword]);

    useEffect (()=>{
        axios.get(`http://localhost:8008/api/auth/user/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id]);

    const submitForm = async(e)=>{
        e.preventDefault();

        // Vérification finale avant envoi
        if (user.password && user.password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas !");
            return;
        }

        await axios.put(`http://localhost:8008/api/auth/update/user/${id}`, user)
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
        <Link to='/' type="button" className="btn btn-secondary">
          <i className="fa-solid fa-backward"></i> back
        </Link>
        <h3>Update User</h3>
        <form className="addUserForm" onSubmit={submitForm} action="">
          <div className="inputGroup">
            <label htmlFor="firstname">Firstname:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={user.firstname}
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
              value={user.lastname}
              onChange={inputHandler}
              autoComplete="on"
              placeholder="Enter your lastname"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={inputHandler}
              value={user.email}
              autoComplete="on"
              placeholder="Enter your email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={inputHandler}
              autoComplete="on"
              placeholder="Enter your password"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              autoComplete="on"
              placeholder="Confirm your password"
            />
            {passwordMatch === true && (
              <p style={{ color: "green", fontSize: "14px" }}>Les mots de passe correspondent</p>
            )}
            {passwordMatch === false && (
              <p style={{ color: "red", fontSize: "14px" }}>Les mots de passe ne correspondent pas</p>
            )}
          </div>
          <div className="inputGroup">
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={passwordMatch === false} // bloque si mots de passe différents
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Update;