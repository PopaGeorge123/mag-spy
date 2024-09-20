"use client";

import { useState } from "react";

export default function AlertTypeSelector({currentType}) {

  const setCurrentValue = (type) => {
    if (type === "1") {
      return '<';
    } else if (type === "2") {
      return '=';
    } else {
      return '>';
    }
  }


  const [selected_type, setSelectedType] = useState(setCurrentValue(currentType));
  const [dropState, setDropState] = useState('invisible');

  const handleDrop = () => {
    if (dropState === 'invisible') {
      setDropState('visible')
    } else {
      setDropState('invisible')
    }
  }

  const setSelectedTypeAction = (type) => {
    setSelectedType(type)
    setDropState('invisible')
  }

  return (
    <div className='flex flex-col '>
      {/* <label className='flex'>
        <input type="radio" name="typeof" value="1" defaultChecked />
        <h1 className='text-4xl text-white mx-5'>{" < "}</h1>
      </label>
      <label className=' flex'>
        <input type="radio" name="typeof" value="2" />
        <h1 className='text-4xl text-white mx-5'>{" = "}</h1>
      </label>
      <label className=' flex'>
        <input type="radio" name="typeof" value="3" />
        <h1 className='text-4xl text-white mx-5'>{" > "}</h1>
      </label> */}
      <div className={`${dropState} flex bg-gray-700 ml-2 -mt-16 absolute border border-grey-500 w-max z-20 rounded`}>
        <button
          type="button"
          onClick={() => setSelectedTypeAction('<')}
          className="bg-white m-2 border p-2 rounded-lg w-10 h-10 flex justify-center items-center"
        ><p className="text-black text-xl">{"<"}</p></button>


        <button
          type="button"
          onClick={() => setSelectedTypeAction('=')}
          className="bg-white m-2 border p-2 rounded-lg w-10 h-10 flex justify-center items-center"
        ><p className="text-black text-xl">{"="}</p></button>


        <button
          type="button"
          onClick={() => setSelectedTypeAction('>')}
          className="bg-white m-2 border p-2 rounded-lg w-10 h-10 flex justify-center items-center"
        ><p className="text-black text-xl">{">"}</p></button>

      </div>
      
      <button 
        onClick={handleDrop}  
        type="button"
        className=" border border-gray-300 h-5 rounded-lg p-5 mx-5 flex justify-center items-center">
        <p className="text-xl text-white">{selected_type}</p>
      </button>
      
      <input type="radio" name="typeOf" value={
        selected_type === '<' ? "1" : selected_type === '=' ? "2" : "3"
        } className="hidden"
      checked={true} />
    
    </div>
  )
}
