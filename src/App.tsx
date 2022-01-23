import React, {useState} from 'react';
import {Box, Button, Container, Pagination, Paper, Typography} from "@mui/material";
import QuestionCard from "./components/QuestionCard";
import {Difficulty, fetchQuestions, Question} from "./API";


const TOTAL_QUESTIONS = 10;
export type Answer = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string
}

function App() {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([])
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [displayScore, setDisplayScore] = useState(false);

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setDisplayScore(false);

        const newQuestions = await fetchQuestions(10, Difficulty.EASY);
        setQuestions(newQuestions);

        setLoading(false);

    }

    const checkAnswer = (chosenAnswer: string) => {
        if (!gameOver) {
            const correct = questions[number].correct_answer === chosenAnswer;
            if (correct) {
                setScore(prevScore => prevScore + 1);
            }

            const answer: Answer = {
                question: questions[number].question,
                answer: chosenAnswer,
                correct,
                correctAnswer: questions[number].correct_answer
            };

            setUserAnswers(prev => [...prev, answer]);
        }
    }

    const nextQuestion = () => {
        const nextQuestion = number + 1;

        if (TOTAL_QUESTIONS === nextQuestion) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }
    }


    return (
        <>
            <Container maxWidth="md">
                <Box sx={{
                    p: 10,
                    display: 'grid',
                    height: '70vh',

                }}>
                    <Paper sx={{p: 5}} variant={"outlined"}>
                        <Typography variant="h3" component="div" gutterBottom>
                            Quiz
                        </Typography>

                        {(gameOver || displayScore) &&
                            <Button variant="contained" disableElevation onClick={startTrivia}>Start</Button>}

                        {/*{!gameOver && <Typography variant={"subtitle2"} component="div">Score: {`${score}/${TOTAL_QUESTIONS}`}</Typography>}*/}

                        {loading &&
                            <p><Typography variant={"h3"} component="div">Loading Question</Typography></p>
                        }

                        {(!loading && !gameOver && !displayScore) &&
                            <QuestionCard questionNumber={number + 1}
                                          totalQuestions={TOTAL_QUESTIONS}
                                          question={questions[number].question}
                                          answers={questions[number].answers}
                                          userAnswer={userAnswers ? userAnswers[number] : undefined}
                                          callback={checkAnswer}/>
                        }

                        {displayScore &&
                            <Typography variant={"h2"}>Score: {`${score} / ${TOTAL_QUESTIONS}`}</Typography>}

                        {!(loading || gameOver || TOTAL_QUESTIONS === userAnswers.length || userAnswers.length !== number + 1) &&
                            <Button variant="contained" disableElevation onClick={nextQuestion}>Next Question</Button>}
                        {(TOTAL_QUESTIONS === userAnswers.length && !displayScore) &&
                            <Button variant="contained" disableElevation onClick={event => setDisplayScore(true)}>View
                                Result</Button>}

                        {(!loading && !gameOver && !displayScore) &&
                            <Box sx={{
                                mt: 3,
                                mb: 1
                            }
                            }> <Pagination count={TOTAL_QUESTIONS} siblingCount={TOTAL_QUESTIONS} page={number + 1}
                                           color="primary"
                                           hideNextButton hidePrevButton/> </Box>}
                    </Paper>
                </Box>
            </Container>
        </>
    );
}

export default App;
