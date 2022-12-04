import React from "react"
import {AnswerObject} from "../App";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
                                           question,
                                           answers,
                                           callback,
                                           userAnswer,
                                           questionNumber,
                                           totalQuestions,
                                       }) => (
    <div>
        <div className="container py-3 px-10 mx-0 min-w-full flex flex-col items-center">
            <p> Question: {questionNumber} / {totalQuestions}
            </p>
            <p
                className="text-xl text-bold m-5" dangerouslySetInnerHTML={{__html: question}}/>
            <div>
                {answers.map((answer) => (

                    <div className="m-3" key={answer}>
                        <div>
                            <button className="btn btn-primary btn-wide "
                                    disabled={!!userAnswer}
                                    value={answer}
                                    onClick={callback}>
                                <span dangerouslySetInnerHTML={{__html: answer}}/>
                            </button>
                        </div>



                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default QuestionCard
