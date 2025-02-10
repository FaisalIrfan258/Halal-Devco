"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

const ContactForm = ({ data }) => {
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
    <div className="flex flex-col md:flex-row justify-stretch gap-8">
      <div className="md:w-[840px]">
        <img src={`https://dev-api.hpdc.sa${data?.image?.url}`} />
      </div>
      <form
        className="w-full flex flex-col gap-y-6 text-black md:m-10"
        onSubmit={handleSubmit}
      >
        <div className="w-full md:flex items-baseline justify-center gap-x-6 space-y-6 ">
          <input
            type="text"
            id="name"
            name="Name"
            placeholder={data?.name || "Your Name"}
            value={formData.Name}
            onChange={handleChange}
            required
            className="bg-gradient-to-l from-green/30 to-green/5 w-full md:w-1/2 p-4 rounded-lg focus-within:bg-none"
          />
          <input
            type="email"
            id="email"
            name="Email"
            placeholder={data?.email || "Your Email"}
            value={formData.Email}
            onChange={handleChange}
            required
            className="bg-gradient-to-l from-green/30 to-green/5 w-full md:w-1/2 p-4 rounded-lg focus-within:bg-none"
          />
        </div>
        <input
          type="text"
          id="phoneNumber"
          name="Phone_Number"
          placeholder={data?.phone || "Your Phone Number"}
          value={formData.Phone_Number}
          onChange={handleChange}
          required
          className="bg-gradient-to-l from-green/30 to-green/5 w-full p-4 rounded-lg focus-within:bg-none focus-within:outline-dark-green"
        />

        <input
          type="text"
          id="sector"
          name="Sector"
          required
          placeholder={data?.sector || "Your Sector"}
          value={formData.Sector}
          onChange={handleChange}
          className="bg-gradient-to-l from-green/30 to-green/5 w-full p-4 rounded-lg focus-within:bg-none"
        />

        <textarea
          id="message"
          name="Message"
          required
          placeholder={data?.message || "Your Message"}
          value={formData.Message}
          onChange={handleChange}
          className="bg-gradient-to-l from-green/30 to-green/5 w-full p-4 rounded-lg focus-within:bg-none"
          rows="12"
        />
        <Button
          size="lg"
          className="bg-primary-gradient self-start w-60"
          type="submit"
        >
          {data?.btnText || "Send"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
