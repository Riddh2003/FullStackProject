import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Message from "../common/Message.jsx";
import styles from "../../styles/AddStudent.module.css";
import { useNavigate } from "react-router-dom";

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

function SendOtp({ setLoading, setIsOtpSubmitting, onClosed , onOtpSent }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const classes = useStyles();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailPattern.test(email)) return "Invalid email format";
    return "";
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);

    setErrors({ email: emailError });

    if (!emailError) {
      setLoading(true); // Show loader
      setIsOtpSubmitting(true); // Show OTP submission loader
      try {
        const response = await axios.post(
          "http://localhost:9999/api/public/session/sendotp",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const otp = response.data.otp;
          localStorage.setItem("otp", otp);
          console.log(otp);
          if (response.data.message) {
            setIsError(false);
            setMessage(response.data.message); // Success message
            console.log(response.data.message); // Log the message
            // Start closing animation
            setIsClosing(true);
            // Close modal after animation completes
            setTimeout(() => {
              setIsOpen(false);
              onClosed();
            }, 300);
            onOtpSent();
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
        setMessage("SendOtp failed. Please try again.");
        setVisible(true); // Show error message
      } finally {
        setLoading(false); // Hide loader
        setIsOtpSubmitting(false); // Hide OTP submission loader
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
        <h1 className="text-3xl font-bold">SendOtp</h1>

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
      </div>

      <button
        onClick={handleSendOtp}
        className="ease-in duration-200 text-center bg-white  rounded-md p-3 mt-5 text-[#ff4848] hover:bg-[#ff4848] hover:text-white shadow-sm shadow-slate-200"
      >
        Send One Time Password
      </button>
    </div>
  );
}

export default SendOtp;