import React, { useState } from "react";
import authService from "../api/authService";

const Register = () => {

  const [form, setForm] = useState({
    email:"",
    username:"",
    password:"",
    role:"USER"

  })

}
export default Register