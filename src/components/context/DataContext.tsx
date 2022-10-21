import axios from 'axios';
import React, { useContext, useState } from 'react'
import { createContext } from 'react';
import { AxiosError } from "axios"
import {useNavigate} from "react-router-dom"

type ContextInterface = {
  gameState: string;
  score: number,
  count: number,
  incorrect: [],
  allQuestion: {},
  loading:boolean,
  url:string,
  NoOfQues:number,
  category:number,
  difficulty:string,
  username:string;
}

const DataContext = createContext<ContextInterface | any>(null);

export const useData = () => {
    return useContext(DataContext);
}

export const DataProvider = ({ children }:any) => {
    const navigate = useNavigate()
    
    
    const [url, setUrl] = useState<string>(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`)

    const [count, setCount] = useState(0)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const [username, setUsername] = useState<string>("")


    const getData = async () => {
        setLoading(true)
        const data:any = await (await axios(url))
        if(data){
            setLoading(false)
        }
        try{
            setData(data.data.results);
        }
        catch(error){
            const err = error as AxiosError
            console.log(err.response?.data)
        }
    }
    

    const value = {
        getData,
        count,
        setCount,
        data,
        loading,
        setLoading,
        score,
        setScore,
        url,
        setUrl,
        username,
        setUsername,
        navigate,
    }

  return (
    <DataContext.Provider value={value}>
        { children }
    </DataContext.Provider>
  )
}
