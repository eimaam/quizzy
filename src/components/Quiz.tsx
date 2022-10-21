import React, { ReactElement, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useData } from './context/DataContext';
import axios from "axios"
import { AxiosError } from "axios"
import { RiseLoader } from "react-spinners" 
import { useQuizContext } from './context/QuizContext';
import { Navigate } from 'react-router-dom';

export const Quiz = () => {
  const { url, username, navigate } = useData() 
  const { gameState, setGameState } = useQuizContext()

  // state managers
  const [data, setData] = useState<any>([])
  const [options, setOptions] = useState<any>({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  })
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [end, setEnd] = useState(false)

  const optionsArr:ReactElement | any = [
    <h3>A.{options.optionA}</h3>,
    <h3>B.{options.optionB}</h3>,
    <h3>C.{options.optionC}</h3>,
    <h3>D.{options.optionD}</h3>,
  ]
  
  function shuffle(array:[]) {
      let arrayLength = 4;
      let random;
  
      while (arrayLength != 0) {
      // Pick a remaining element.
      random = Math.floor(Math.random() * arrayLength);
      arrayLength--;
      // And swap it with the current element.
      [array[arrayLength], array[random]] = [array[random], array[arrayLength]];
    }
    return array;
  }


  // function to fetch data
  const fetchData = async () => {
    setLoading(true)
    const data:any = await (await axios(url))
    if(data){
        setLoading(false)
    }
    try{
        setData(data.data.results);
        setOptions((prevData:any) => ({
          ...prevData,
          optionA: data.data.results[count].correct_answer,
          optionB: data.data.results[count].incorrect_answers[0],
          optionC: data.data.results[count].incorrect_answers[1],
          optionD: data.data.results[count].incorrect_answers[2],
        }))
    }
    catch(error){
        const err = error as AxiosError
        console.log(err.response?.data)
    }
}




useEffect(() => {
  username === "" && navigate('/')
  fetchData()
}, [])

  const [selectedOption, setSelectedOption] = useState<any>(null)

  // FUNCTIONS
  const chooseOption = (chosen:string) => {
    setSelectedOption(chosen);
  }

  // go to next question
  const next = () => {
    setCount(count+1)
    if(count === data.length-1){
      setEnd(true)
    }
    selectedOption === data[count].correct_answer && setScore(score+1)
    
    return data;
  }


  // const submitGame = () => {
  //   setGameState("end")
  // };

  
  
  
    


 
  


  return (
    <React.StrictMode>
    {loading ? <div className='container'><h1><RiseLoader /></h1></div> : 
    <div className='container'>
      <div className='question--card'>
        <div>
          <h2>{data[count].difficulty}</h2>
          <h2>{username}</h2>
          <h2>{count+1} of {data.length}</h2>
          <h2 >{data[count].question.replaceAll(/\&quot;/g, '"').replaceAll(/\&shy;/g, "-").replaceAll(/\&#039;/g, "'").replaceAll(/\&rsquo;/g, "'")}</h2>
        </div>
        <div id='options'>
          <div>
              <h3 className={selectedOption === data[count].correct_answer ? "h3--selected" : ""} onClick={() => chooseOption(data[count].correct_answer)}>A. {data[count].correct_answer}</h3>
              <h3 className={selectedOption === "optionB" ? "h3--selected" : ""} onClick={() => chooseOption("optionB")}>B. {data[count].incorrect_answers[0]}</h3>
          </div>

          <div>
              <h3 className={selectedOption === "optionC" ? "h3--selected" : ""}  onClick={() => chooseOption("optionC")}>C. {data[count].incorrect_answers[1]}</h3>
              <h3 className={selectedOption === "optionD" ? "h3--selected" : ""}  onClick={() => chooseOption("optionD")}>D. {data[count].incorrect_answers[2]}</h3>
          </div>
        </div>
        <div className='flex-col' style={{gap: "2rem"}}>
          <div className='flex' style={{gap: "12rem"}}>
            {/* <button id='prev' onClick={prev}><FaArrowLeft /> previous </button> */}
            <button id='next' onClick={next}>next <FaArrowRight /> </button>
          </div>
          <div>
            <button className='btn-success' onClick={() => shuffle(optionsArr)}>SUBMIT</button>
          </div>
        </div>
        <div>
          <h2>Score: {score}</h2>
        </div>
        {
          end &&
          <div>
            <h2>Dear {username},</h2>
            <h2>You scored {score} out of {data.length}</h2>
          </div>
        }
        
        {/* <div className='flex' id="listQuestions">
          {numberOfQuestions}
        </div> */}
        </div>
    </div>
      }
    </React.StrictMode>
  )
}
