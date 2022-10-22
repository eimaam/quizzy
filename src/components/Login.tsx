import React, { useState } from 'react'
import { useData } from './context/DataContext'
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const { setUrl, setLoading, setUsername, url } = useData()

  const navigate = useNavigate()
  
  const [quizData, setQuizData] = useState<any>({
    username: "",
    category: "",
    difficulty: "",
    questions: "",
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
    e.preventDefault()
    const {name, value} = e.target
    setQuizData((prevData:any) => ({
      ...prevData,
      [name]:value
    }))
    setUrl(`https://opentdb.com/api.php?amount=${quizData.questions}&category=${quizData.category}&difficulty=${quizData.difficulty}&type=multiple`)
    setUsername(quizData.username)
  }
  

  const handleSubmit = (e:React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setUrl(`https://opentdb.com/api.php?amount=${quizData.questions}&category=${quizData.category}&difficulty=${quizData.difficulty}&type=multiple`)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300);
    navigate('/prep')
    return setUrl(`https://opentdb.com/api.php?amount=${quizData.questions}&category=${quizData.category}&difficulty=${quizData.difficulty}&type=multiple`)
    
  }

  function toggle(){
    const body = document.body
    body.classList.toggle('dark')
  }


  return (
    <div className='container'>
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Enter a Username'
                name="username"
                value={quizData.username}
                onChange={handleChange} 
                maxLength={16}
                required
                />
                <select title='quiz type' name="category" defaultValue="Select Category" onChange={handleChange} required>
                  <option value="9">General Knowledge</option>
                  <option value="17">Science & Nature</option>
                  <option value="18">Science: Computers</option>
                  <option value="19">Science: Mathematics</option>
                  <option value="21">Sports</option>
                  <option value="23">History</option>
                  <option defaultValue="" disabled>Select Category</option>
                </select>
                <select title='difficulty' defaultValue="Select Difficulty Level" name="difficulty" onChange={handleChange} required>
                  <option defaultValue="" disabled>Select Difficulty Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <select title='no of questions' defaultValue="Select Number of Questions" name="questions" onChange={handleChange} required>
                  <option defaultValue="" disabled>Select Number of Questions</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
                
                <input type="submit" value="START QUIZ"/>
            </form>
            <div>
              <button onClick={toggle}>Toggle</button>
            </div>
        </div>
    </div>
  )
}
