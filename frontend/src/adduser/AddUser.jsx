import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialState);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => {
      const newData = { ...prevData, [name]: value };

      // verif password dynamique
      if (name === "password" || name === "confirmPassword") {
        setPasswordMatch(
          newData.confirmPassword === "" || newData.password === newData.confirmPassword
        );
      }

      return newData;
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      toast.error("Les mots de passe ne correspondent pas !", {
        position: "top-right",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8008/api/auth/register",
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
        }
      );
      toast.success(response.data.message, { position: "top-right" });
      setUser(initialState);
      setPasswordMatch(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Une erreur est survenue",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h3>Add New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={user.firstname}
            onChange={inputHandler}
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
            placeholder="Enter your lastname"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            placeholder="Enter your email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={inputHandler}
            placeholder="Enter your password"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={inputHandler}
            placeholder="Confirm your password"
            className={
              user.confirmPassword
                ? passwordMatch
                  ? "valid-input"
                  : "invalid-input"
                : ""
            }
          />
          {!passwordMatch && (
            <p className="error-message">
              Les mots de passe ne correspondent pas
            </p>
          )}
        </div>
        <div className="inputGroup">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!passwordMatch || !user.password || !user.confirmPassword}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;