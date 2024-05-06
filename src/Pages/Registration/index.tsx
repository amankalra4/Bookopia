import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../utils/axios";
import { ROUTES } from "../../utils/constants";
import { setLocalStorageItem } from "../../utils";
import "./styles.css";

type FormData = {
  fullName: string;
  email: string;
  location: string;
  password: string;
  confirmPassword: string;
};

type KeyValuePair = {
  [key: string]: string;
};

export type RegistrationResponse = {
  message: string;
  token: string;
  success: boolean;
  name: string | null;
};

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<KeyValuePair>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: KeyValuePair = {};
    if (!formData.fullName) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.location) {
      errors.location = "Location is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const { fullName, email, location, password } = formData;
        const registrationResponse =
          await customAxios.post<RegistrationResponse>("auth/register", {
            name: fullName,
            email: email,
            location: location,
            password: password,
          });
        const { token, success = false } = registrationResponse.data;
        if (success) {
          setLocalStorageItem("token", token);
          navigate(ROUTES.HOME);
        }
      } catch (err: any) {
        console.error(err.response.data);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        {errors.fullName && <p>{errors.fullName}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        {errors.location && <p>{errors.location}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Register</button>
      </form>
      <p className="login-text">
        Already have an account? <a href={ROUTES.LOGIN}>Login here</a>
      </p>
    </div>
  );
};

export default Registration;
