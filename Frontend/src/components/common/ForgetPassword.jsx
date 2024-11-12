import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Message from "../common/Message.jsx";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/AddStudent.module.css";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      fontFamily: "Metropolis, sans-serif",
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "green",
      },
      fontFamily: "Metropolis, sans-serif",
    },
  },
  errorText: {
    color: "red",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
  },
}));

function ForgotPassword({ setLoading, setIsOtpSubmitting, onClosed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailPattern.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const storedOtp = localStorage.getItem("otp");
  const validateOtp = (otp) => {
    if (!otp) return "Otp is required";
    if (storedOtp != otp) return "Invalid OTP";
    return "";
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const otpError = validateOtp(otp);

    setErrors({ email: emailError, password: passwordError, otp: otpError });

    if (!emailError && !passwordError) {
      setLoading(true); // Show loader
      setIsOtpSubmitting(true);
      try {
        const response = await axios.post(
          "http://localhost:1218/api/public/session/forgotpassword",
          { email, password, otp },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          if (response.data.message) {
            setIsError(false);
            setMessage(response.data.message); // Success message
            handleClose();
          } else if (response.data.error) {
            setIsError(true);
            setMessage(response.data.error); // Error message from backend
            console.log(response.data.error); // Log the error
          }
        }
        setVisible(true); // Show message
      } catch (error) {
        console.error("There was an error!", error.response || error.message);
        setIsError(true);
        setMessage("Login failed. Please try again.");
        setVisible(true); // Show error message
      } finally {
        setLoading(false); // Hide loader
        setIsOtpSubmitting(false);
      }
    }
  };

  const handleCloseMessage = () => {
    setVisible(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      onClosed();
    }, 300); // Match the animation duration
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className={`relative font-metropolis h-auto w-[475px] bg-white p-7 flex flex-col rounded-md shadow-lg shadow-indigo-500/40 popup ${
        isClosing ? styles.popupClosing : styles.popupAnimation
      } z-60`}
      style={{
        maxHeight: errors && Object.keys(errors).length > 0 ? "90vh" : "auto", // Sets max height only when errors are present
        overflowY: errors && Object.keys(errors).length > 0 ? "auto" : "hidden", // Enables scrolling when errors exist
      }}
    >
      <Message
        message={message}
        isError={isError}
        isVisible={visible}
        onClose={handleCloseMessage}
      />

      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-bold">Update Password</h1>

        <span onClick={handleClose} className="text-xl cursor-pointer">
          &#10006;
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <TextField
          fullWidth
          id="outlined-email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.root}
          error={Boolean(errors.email)}
        />
        {errors.email && (
          <span className={classes.errorText}>{errors.email}</span>
        )}

        <TextField
          fullWidth
          id="outlined-password"
          label="New Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.root}
          error={Boolean(errors.password)}
        />
        {errors.password && (
          <span className={classes.errorText}>{errors.password}</span>
        )}

        <TextField
          fullWidth
          id="outlined-basic"
          label="One Time Password"
          variant="outlined"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className={classes.root}
          error={Boolean(errors.otp)}
        />
        {errors.otp && <span className={classes.errorText}>{errors.otp}</span>}
      </div>

      <button
        onClick={handleForgotPassword}
        className="ease-in duration-200 text-center bg-[#00c6ff] rounded-md p-3 mt-5 text-[#ffffff] hover:bg-[#0082fe] shadow-sm shadow-slate-200"
      >
        Update Password
      </button>
    </div>
  );
}

export default ForgotPassword;