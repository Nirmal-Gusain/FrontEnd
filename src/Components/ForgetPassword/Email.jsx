import React, { useContext } from "react";
import axios from "axios";
import { EmailContext } from "./emailContext/Emailstore";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const { email, setEmail } = useContext(EmailContext);
  const navigate = useNavigate();
  const handleEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/send-otp", {
        email,
      });
      console.log(response.data);

      if (response.data.status === "success") {
        toast.success("otp sent");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to send OTP");
    }
  };
  return (
    <form onSubmit={handleEmail}>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <button>Submit</button>
    </form>
  );
};

export default Email;
