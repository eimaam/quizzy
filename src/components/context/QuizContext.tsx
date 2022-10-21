import React, { useContext, useState } from 'react'
import { createContext } from 'react'

interface ContextInterface {
  gameState: string;
  score: number
}

const QuizContext = createContext<any | undefined>(undefined);

export const useQuizContext = () => {
    return useContext(QuizContext);
}

export const QuizProvider = ({ children }:any) => {
    let [gameState, setGameState] = useState<string>("");

    const value = {
        gameState,
        setGameState,
    }

  return (
    <QuizContext.Provider value={value}>
        { children }
    </QuizContext.Provider>
  )
}
