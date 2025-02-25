"use client";
import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState , useEffect , Suspense } from "react";
import { quiz } from "../data";


export default function Page() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers , setAnswers] = useState([]);
  const [correctAnswer , setCorrectAnswer] = useState("");
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });



  useEffect(() => {

    setTimeout(() => {
      setAnswers(questions[activeQuestion].answers);
      setCorrectAnswer(questions[activeQuestion].correctAnswer);
      
    }, 2000);


  } , [result])









  const { questions } = quiz;


  const onAnswerSelected = (answer, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);

    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log("true");
    } else {
      setSelectedAnswer(false);
      console.log("false");
    }
  };



  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) => selectedAnswer ?  {...prev , score: prev.score + 5 , correctAnswers: prev.correctAnswers + 1 } : {...prev , wrongAnswers: prev.wrongAnswers + 1 })

    if(activeQuestion !== questions.length - 1) {
        setActiveQuestion(prev => prev + 1);
        setCorrectAnswer("");
        setAnswers([]);

    }else{
             setActiveQuestion(0);
             setShowResult(true);
    }
    setChecked(false);
    
  }

  return (
    <div className="w-96 p-4 ">
      <h1 className="font-moraba text-2xl bg-[#ff990a] rounded-lg  h-14 flex justify-center items-center  text-[#010513] ">
        صفحه آزمون
      </h1>
      <div> 
        {
            !showResult ? (
                <p className="w-full mt-4 font-moraba text-center"> سوال {activeQuestion + 1} از  <span>{questions.length}</span> </p>
            ) : null
        }
        
         </div>

      {!showResult ? (
        <div className="">
          <h3 className="mt-4 text-center font-moraba ">
            {" "}
            {questions[activeQuestion].question}
          </h3>
      {answers.length > 0 ? (


  answers.map((answer, index) => (
            <li
              className={`list-none bg-[#304359] w-full rounded-lg my-4 h-9 flex justify-center items-center text-white font-moraba  ${
                selectedAnswerIndex === index ? "bg-green-600" : ""
              }`}
              key={index}
              onClick={() => onAnswerSelected(answer, index)}
            >
              {" "}
              <span>{answer}</span>
            </li>
          ))



      ) : (
<Skeleton count={4}  baseColor="#202020" highlightColor="#444" direction="rtl" height="36px" className="my-3 rounded-lg"/>
      )}
        
          {checked ? (
            <button
              className="w-full bg-[#ff990a] rounded-lg  h-9 font-moraba text-[#010513]"
              onClick={nextQuestion}
            >
              {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
            </button>
          ) : (
            <button
              className="w-full bg-[#ff990a] rounded-lg h-9 font-moraba text-[#010513]"
              onClick={nextQuestion}
              disabled
            >
              {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h3 className="font-moraba text-xl mt-4">نتایج آزمون شما</h3>
          <p className="font-moraba mt-4 ">
    
            به طور کلی {(result.score / 25) * 100}% به سوالات جواب داده اید
          </p>
          <p className="text-[#ff990a] font-moraba mt-4">

            کل سوالات : {questions.length}{" "}
          </p>
          <p className="text-[#ff990a] font-moraba mt-4">
    
            کل امتیاز : {result.score}{" "}
          </p>
          <p className="text-[#ff990a] font-moraba mt-4">
        
            سوالات درست : {result.correctAnswers}{" "}
          </p>
          <p className="text-[#ff990a] font-moraba mt-4">
        
            سوالات غلط : {result.wrongAnswers}{" "}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-[#ff990a] rounded-lg h-9 font-moraba text-[#010513]"
          >
            شروع مجدد آزمون
          </button>
        </div>
      )}
    </div>
  );
}
