import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import { useData } from './context/DataContext';
import { RiseLoader } from "react-spinners"

export const Prep = () => {

  const { fetchData, loading, setLoading, username, data, navigate, count } = useData()

  useEffect(() => {
    fetchData()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
    username === "" && navigate('/')
  }, [])
    
  return (
    <div className='container'>
      {/* {loading ? <h1><RiseLoader /></h1> : */}
        <div>
          {/* <div>
            <h3>Hi {username},</h3>
            <h3>Your Quiz Selection:</h3>
            <h3>Category: {data[0].category}</h3>
            <h3>Total Number of Questions: {data[0].length}</h3>
            <h3>Difficulty Level: {data[0].difficulty}</h3>
          </div> */}
          <div>

            <h1>Duration:</h1>
            <button><Link to="/quiz" >start quiz</Link></button>
            <h2>Each question carries 2 Marks!</h2>
            <h2>Wish you the very Best!</h2>
            <h2>Click the Button to start quiz!</h2>
          </div>
        </div>
        {/* } */}
    </div>
  )
}
