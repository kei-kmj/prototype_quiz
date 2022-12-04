import React, {useState} from "react"
import QuestionCard from "./components/QuestionCard";
import {fetchQuizQuestions} from "./API";
import {QuestionsState, Difficulty} from "./API";
import "./App.css"

export type AnswerObject = {
    question: string,
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

export const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [questions, setQuestions] = useState<QuestionsState[]>([])
    const [number, setNumber] = useState<number>(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState<number>(0)
    const [gameOver, setGameOver] = useState<boolean>(true)

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        )
        setQuestions(newQuestions)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = e.currentTarget.value
            const correct = questions[number].correct_answer === answer

            if (correct) setScore((prev: number) => prev + 1)

            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            }
            setUserAnswers((prev) => [...prev, answerObject])
        }
    }

    const nextQuestion = () => {
        const nextQuestionNumber = number + 1
        if (nextQuestionNumber === TOTAL_QUESTIONS) {
            setGameOver(true)
        } else {
            setNumber(nextQuestionNumber)
        }
    }


    return (
        <>
            <h1 className="text-2xl text-blue-700 font-bold m-3 text-center">QUIZ</h1>
            <h2 className="text-gray-700 text-center">Hello My Quiz Page!</h2>
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className="btn btn-active btn-accent btn-wide"
                            onClick={startTrivia}> Start</button>) : null}
                {!gameOver ? <p>Score:{score}</p> : null}
                {loading ? <p>Loading Questions...</p> : null}
                {!loading && !gameOver && (
                    <QuestionCard
                        questionNumber={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].question}
                        answers={questions[number].answers}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        callback={checkAnswer}
                    />)}
                {!gameOver &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== TOTAL_QUESTIONS - 1 ? (
                    <button className="btn btn-secondary" onClick={nextQuestion}>Next</button>) : null}
                <div className="radiobox m-3">

                    <input id="radio1" className="radiobutton" name="hoge" hidden type="radio" value="ラジオボタン1"/>
                    <label htmlFor="radio1" className="bg-gray-400 m-2">ラジオボタン1</label>

                    <input id="radio2" className="radiobutton" name="hoge" hidden type="radio" value="ラジオボタン2"/>
                    <label htmlFor="radio2" className="bg-gray-400 m-2">ラジオボタン2</label>

                    <input id="radio3" className="radiobutton" name="hoge" hidden type="radio" value="ラジオボタン3"/>
                    <label htmlFor="radio3" className="bg-gray-400 m-2">ラジオボタン3</label>
                </div>

            </div>
        </>
    )
}


