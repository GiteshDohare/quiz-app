import React, {useEffect} from 'react';
import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Answer} from "../App";

type QuestionCardProps = {
    question: string;
    answers: string[];
    callback: (chosenAnswer: string) => void;
    userAnswer: Answer | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
                                                       question,
                                                       answers,
                                                       callback,
                                                       userAnswer,
                                                       questionNumber,
                                                       totalQuestions
                                                   }) => {

    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);

    const handleListItemClick = (index: number, answer: string) => {
        setSelectedIndex(index);
        callback(answer);
    };

    useEffect(()=> {
        setSelectedIndex(undefined);
    }, [question])

    return (
        <div>
            <Typography variant={"subtitle1"}><span dangerouslySetInnerHTML={{ __html: question }} /></Typography>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {
                    answers.map((answer, index) => {
                        return (
                            <>
                                <ListItem key={answer} alignItems="flex-start" button
                                          disabled={userAnswer ? true : false}
                                          selected={selectedIndex === index}
                                          onClick={(event) => handleListItemClick(index, answer)}>
                                    <ListItemText primary={
                                        <React.Fragment>
                                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                                        </React.Fragment>
                                    }/>
                                </ListItem>
                                <Divider component="li"/>
                            </>
                        );
                    })
                }
            </List>
        </div>
    );
};

export default QuestionCard;