import { useState } from "react";
import Flashcard from "./Flashcard";
import "./flashcard.css";
import { vocabWord } from "@/types/Courses";
import { Button, Grid } from "@mui/material";
import { shuffleArray } from "@/utils/courses/lessons/arrayFunctions";
import Popout from "../../shared/Popout";
import OptionsList from "./OptionsList";

const Deck = () => {
    //  should be user.vocabwords + custom game settings
    //  (i.e. spanish only, or missed words)
    const myVocabList = localStorage.getItem('myVocabList');
    let words: vocabWord[] = [];

    if (myVocabList) {
        const parsedVocabList = JSON.parse(myVocabList);
        for (let lesson of parsedVocabList) {
            words = [...words, ...lesson.words];
        }
    }

    const [initialDeck, setInitialDeck] = useState<vocabWord[]>(words);
    const [seenDeck, setSeenDeck] = useState<vocabWord[]>([]);
    const [discardDeck, setDiscardDeck] = useState<vocabWord[]>([]);

    const changeDeck = (e: React.DragEvent<HTMLDivElement>, deck: string) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("text/plain");
        const wordId = parseInt(cardId.replace('card-', ''));
        const word = initialDeck.find((item) => item.id === wordId);

        if (!word) return;

        setInitialDeck((prev) => prev.filter((item) => item.id !== wordId));
        if (deck === "seenDeck") {
            setSeenDeck((prev) => [...prev, word]);
        } else {
            setDiscardDeck((prev) => [...prev, word]);

        };
    };
    const shuffle = () => {
        const combinedDeck = [...initialDeck, ...seenDeck];

        setInitialDeck(shuffleArray(combinedDeck));
        setSeenDeck([]);
    };

    const reset = () => {
        window.location.reload();
    };

    // deck design
    return (
        <Grid container p={3}>
            <Grid item container xs={9} display={"flex"} justifyContent={'space-between'}>
                <Grid item className="deck_div" xs={3} mr={4} onDrop={(e) => changeDeck(e, 'discardDeck')} onDragOver={(e) => e.preventDefault()} >
                    <div className="holder_label holder_container">Learned</div>
                    {discardDeck.map((card, index) => {
                        return (
                            <Flashcard
                                key={card.id}
                                word={card}
                                lang={"spanish"}
                                className={"stacked_card"}
                                onDragStart={(e) => e.dataTransfer.setData("text/plain", `card-${card.id}`)}
                            />
                        )
                    })}
                </Grid>
                <Grid item className="deck_div" xs={4} onDrop={(e) => changeDeck(e, 'initialDeck')} onDragOver={(e) => e.preventDefault()}>
                    {initialDeck.map((card, index) => {
                        return (
                            <Flashcard
                                key={card.id}
                                word={card}
                                lang={"spanish"}
                                sx={{
                                    top: `${index * 3}px`,
                                    left: `${index * 3}px`,
                                }}
                                className={"stacked_card"}
                                onDragStart={(e) => e.dataTransfer.setData("text/plain", `card-${card.id}`)}
                            />
                        )
                    })}
                </Grid>
                <Grid item className="deck_div holder_container" xs={3} onDrop={(e) => changeDeck(e, 'seenDeck')} onDragOver={(e) => e.preventDefault()} >
                    {seenDeck.map((card, index) => {
                        return (
                            <Flashcard
                                key={card.id}
                                word={card}
                                lang={"spanish"}
                                sx={{
                                    top: `${index * 3}px`,
                                    left: `${index * 3}px`,
                                }}
                                className={"stacked_card"}
                                onDragStart={(e) => e.dataTransfer.setData("text/plain", `card-${card.id}`)}
                            />
                        )
                    })}
                </Grid>
            </Grid>
            <Grid item container xs={3} mt={8} mb={8} pl={5}>
                <Grid item xs={12} >
                    <Button variant="contained" fullWidth onClick={shuffle}>Shuffle</Button>
                    <Button sx={{ mt: 2 }} variant="contained" fullWidth onClick={reset}>Reset</Button>
                    <Popout label='Edit Deck'>
                        <OptionsList
                            setInitialDeck={setInitialDeck} />
                    </Popout>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Deck;
