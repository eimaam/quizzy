import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import { useData } from './context/DataContext';
import { RiseLoader } from "react-spinners"

export const Prep = () => {

  const { getData, loading } = useData()
    
  return (
    <div className='container'>
      {loading ? <h1><RiseLoader /></h1> :
        <div>
            <h1>Duration:</h1>
            <button><Link to="/quiz" >start quiz</Link></button>
            <h2>Each question carries 2 Marks!</h2>
            <h2>Wish you the very Best!</h2>
            <h2>Click the Button to start quiz!</h2>
        </div>
        }
    </div>
  )
}
