import {shuffleArray} from "./Util";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

// data type for returned data from API
type APIQuestion =  {
    category: string;
    type: string;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export type Question = APIQuestion & {answers: string[]}



export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;

    const data = await(await fetch(endpoint)).json();

    return data.results.map((question: APIQuestion) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ));
}