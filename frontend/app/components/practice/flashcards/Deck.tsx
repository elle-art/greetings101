import { useEffect, useRef, useState } from "react";
import Flashcard from "./Flashcard";
import "./flashcard.css";
import { vocabWord } from "@/types/Courses";
import { Grid } from "@mui/material";

//should be user.vocabwords + custom game settings
//  (i.e. spanish only, or missed words)
const cards = [
    {
        id: 1,
        eng: "hi",
        span: "hola",
        asl: null
    },
    {
        id: 2,
        eng: "bye",
        span: "adios",
        asl: null
    },
    {
        id: 3,
        eng: "okay",
        span: "claro",
        asl: null
    }
]

const Deck = () => {
    const [initialDeck, setInitialDeck] = useState<vocabWord[]>(cards);
    const [seenDeck, setSeenDeck] = useState<vocabWord[]>([]);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);

    const removeCard = (card: vocabWord, deck: string, index: number) => {

        if (deck === "initialDeck") {
            const newInitialDeck = initialDeck.filter((item) => item !== card);
            setInitialDeck(newInitialDeck);
            addCard(card, "seenDeck");
        } else {
            const newSeenDeck = seenDeck.filter((item) => item !== card);
            setSeenDeck(newSeenDeck);
            addCard(card, "initialDeck");
        }
        const target = cardRefs.current[index]; // Get the target card using the index
        setTimeout(() => {
            if (target)
            target.classList.add("flip_card");

        }, 300); 

        console.log("init", initialDeck);
        console.log("seen", seenDeck);
        console.log("ref", target);

    };

    const addCard = (card: vocabWord, deck: string) => {
        if (deck === "seenDeck") {
            setSeenDeck((prevOrder) => {
                return [...prevOrder, card]
            });
        } else {
            setInitialDeck((prevOrder) => {
                return [...prevOrder, card]
            });
        }
    };

    const shuffle = (() => {

    })();
    
    // deck design
    return (
        <Grid container spacing={2}>
            <Grid item id="deck_div" xs={4}>
                {initialDeck.map((card, index) => (
                    <Flashcard
                        key={card.id}
                        word={card}
                        lang={"spanish"}
                        sx={{
                            top: `${index * 5}px`,
                            left: `${index * 5}px`,
                        }}
                        className={"stacked_card"}
                        orderFunction={() => removeCard(card, "initialDeck", index)}
                    />
                ))}
            </Grid>
            <Grid item id="seen_deck_div" xs={4}>
                {seenDeck.map((card, index) => {
                    const cardRef = (el: HTMLElement | null) => {
                        cardRefs.current[index] = el;
                    };
                    return(
                    <Flashcard
                        key={card.id}
                        ref={cardRef}
                        word={card}
                        lang={"spanish"}
                        sx={{
                            top: `${index * 5}px`,
                            left: `${index * 5}px`,
                        }}
                        className={"stacked_card"}
                        orderFunction={() => removeCard(card, "seenDeck", index)}
                    />
                )})}
            </Grid>
        </Grid>
    );
};

export default Deck;
