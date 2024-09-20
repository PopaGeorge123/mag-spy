"use client";

import { useState , useEffect } from "react";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/libs/API/user";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    async function getUserState(){
      document.title = "Support";
      const dataAboutUser = await getCurrentUser();

      if(dataAboutUser.isSignedIn){
        setUserSignedIn(true);
        setName(dataAboutUser.name);
        setEmail(dataAboutUser.user);
      }
    }
    getUserState();
  }, []);
    

  async function handleSubmit(event) {
    event.preventDefault();
    setButtonDisabled(true);

    const response = await fetch("/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message);
      location.href = "/";
    } else {
      toast.error(result.message);
    }
    setButtonDisabled(false);
  }

  return (
    <div className="max-w-2xl my-10 mx-auto p-8 bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Support</h1>
      <p className="text-lg mb-6 text-center text-gray-300">For support, please fill out the form below:</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name:</label>
          <input type="text" 
          //make this input uneditable if the user is signed in
          readOnly={userSignedIn}
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email:</label>
          <input type="email" 
          readOnly={userSignedIn}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">How can we help you:</label>
          <textarea id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div className="text-center">
          <button 
          type="submit"
          disabled={buttonDisabled}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </div>
      </form>
    </div>
  )
}