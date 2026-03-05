"use client"

  import { ToastContainer, toast } from 'react-toastify';
  
  export default  function ToastComponent(){
    const notify = () => toast.success("Successfully Insert Product");

    return (
      <div 
      className="bg-gray-600 mt-50 p-5">  
        <button className='p-5 bg-white' onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }