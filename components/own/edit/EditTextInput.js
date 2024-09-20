"use client";

import React, { useState } from 'react';

export default function EditTextInput({ name , placeholder }) {
  const [value, setValue] = useState(placeholder);
  console.log(value);

  return (
    <input 
      type="text" 
      name={name}  
      className="text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      placeholder={placeholder} 
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
    />
  )
}
