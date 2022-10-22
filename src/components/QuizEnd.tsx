import React, { useEffect } from 'react';
import { useData }  from './context/DataContext';
import { RiseLoader } from "react-spinners"

export const QuizEnd = () => {
    const {data, username, score, navigate, loading, setLoading } = useData()
    
    useEffect(() => {
      username === "" && navigate('/')
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 3000);
    }, [])

  return (
    <div className='container'>
      {loading ? <div><h1><RiseLoader /></h1></div> : 
      <div>
        <h2>{username}</h2>
        <h2>You scored</h2>
        <h1>{score} <span>out of</span> {data.length}</h1>
      </div>
      }
    </div>
  )
}
