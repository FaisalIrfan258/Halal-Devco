"use client";
import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import ContactForm from "./ContactForm";

const IntroText = ({ tagLine, title2, darkGreen, gradientText1 }) => {
  const titleRef = React.useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.3 });

  return (
    <div className="text-black flex-1">
      <motion.div
        ref={titleRef}
        className="space-y-2"
        initial={{ x: -100, opacity: 0 }}
        animate={titleInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {tagLine}
        </motion.p>

        <motion.h2
          className="text-4xl lg:text-6xl  font-light text-dark-green"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {darkGreen && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-semibold"
            >
              {darkGreen}
            </motion.span>
          )}{" "}
          {title2 && <span>{title2} </span>}
          {""}
          {gradientText1 && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="bg-primary-gradient bg-clip-text text-transparent font-bold "
            >
              {gradientText1}
            </motion.span>
          )}
        </motion.h2>
      </motion.div>
    </div>
  );
};

const Form = ({ ques, heading2, Data }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_Number: "",
    Sector: "",
    Message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("./api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data to the backend
      });

      if (response.ok) {
        alert("Form submitted successfully! We'll be in touch soon.");
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="md:py-12 flex flex-col items-center justify-center">
      <div className="translate-y-4 max-w-5xl self-start">
        <IntroText
          darkGreen={heading2?.darkText}
          title2={heading2?.lightText2}
          gradientText1={heading2?.gradientText}
        />
        <p className="max-w-lg text-justify md:text-justify mt-10 text-[#7C7C7C]">
          {ques}
        </p>
      </div>
      <div className="lg:w-[1000px] mt-20">
        <form
          className="flex flex-col gap-y-6 text-black md:m-10 "
          onSubmit={handleSubmit}
        >
          <div className="w-full md:flex items-baseline justify-center gap-x-6 space-y-6 ltr:text-left rtl:text-right ">
            <input
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleChange} // Handle input change
              placeholder={Data?.name}
              className="bg-gradient-to-l from-green/30 to-green/5 w-full md:w-1/2 p-4 rounded-lg focus-within:bg-none"
              required
            />
            <input
              type="email"
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange} // Handle input change
              placeholder={Data?.email}
              className="bg-gradient-to-l from-green/30 to-green/5 w-full md:w-1/2 p-4 rounded-lg focus-within:bg-none"
              required
            />
          </div>

          <input
            type="text" 
            id="phoneNumber"
            name="Phone_Number"
            value={formData.Phone_Number}
            onChange={handleChange} // Handle input change
            placeholder={Data?.phone}
            className="bg-gradient-to-l from-green/30 to-green/5 w-full p-4 rounded-lg focus-within:bg-none focus-within:outline-dark-green"
            required
          />

          <input
            type="text"
            id="sector"
            name="Sector"
            value={formData.Sector}
            onChange={handleChange} // Handle input change
            placeholder={Data?.sector}
            className="bg-gradient-to-l from-green/30 to-green/5 w-full p-4 rounded-lg focus-within:bg-none"
            required
          />

          <textarea
            id="message"
            name="Message"
            value={formData.Message}
            onChange={handleChange} // Handle input change
            placeholder={Data?.message}
            className="bg-gradient-to-l from-green/30 to-green/5 w-full p-4 rounded-lg focus-within:bg-none"
            rows="12"
            required
          />

          <Button
            size="lg"
            className="bg-primary-gradient w-full"
            type="submit"
          >
            {Data?.btnText || "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
