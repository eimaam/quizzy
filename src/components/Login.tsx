import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useData } from './context/DataContext'
import { useNavigate } from "react-router-dom"

export const Login = () => {
  let { url, urlSetting, setUrlSetting, setUrl, setLoading, NoOfQues, category, difficulty, setUsername } = useData()

  const navigate = useNavigate()
  
  const [data, setData] = useState<any>({
    username: "",
    category: "",
    difficulty: "",
    questions: 10,

  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
    e.preventDefault()
    const {name, value} = e.target
    setData((prevData:any) => ({
      ...prevData,
      [name]:value
    }))
    setUsername(data.username)
    // setUrl(`https://opentdb.com/api.php?amount=${data.questions}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`)
    setUrlSetting({
      NoOfQues: data.questions,
      category: data.category,
      difficulty: data.difficulty
    })
    
    console.log(data)
    console.log(url)
  }

  const handleSubmit = (e:React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setLoading(true)
    NoOfQues = data.questions;
    category = data.category;
    difficulty = data.difficulty
    // setUrl(`https://opentdb.com/api.php?amount=${data.questions}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`)
    // setUrlSetting((prevData:any) => ({
    //   ...prevData,
    //   NoOfQues: data.questions,
    //   category: data.category,
    //   difficulty: data.difficulty
    // }))
    // console.log(urlSetting)
    console.log(url)
    navigate('/prep')
  }



  return (
    <div className='container'>
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Enter a Username'
                name="username"
                value={data.username}
                onChange={handleChange} 
                />
                <select title='quiz type' name="category" value={data.category} onChange={handleChange} >
                  <option value="9">General Knowledge</option>
                  <option value="17">Science & Nature</option>
                  <option value="18">Science: Computers</option>
                  <option value="19">Science: Mathematics</option>
                  <option value="21">Sports</option>
                  <option value="23">History</option>
                </select>
                <select title='difficulty' value={data.difficulty} name="difficulty" onChange={handleChange}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <select title='no of questions' value={data.questions} name="questions" onChange={handleChange}>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
                
                <input type="submit" value="START QUIZ"/>
            </form>
        </div>
    </div>
  )
}