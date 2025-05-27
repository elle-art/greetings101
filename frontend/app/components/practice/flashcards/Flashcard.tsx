import { Card, CardActionArea, CardContent, SxProps, Theme, Typography } from "@mui/material";
import "./flashcard.css";
import { vocabWord } from "@/types/Courses";
import { useRef, useState } from "react";

const Flashcard = (props: { word: vocabWord, lang: string, sx?: SxProps<Theme>, className?: string, onDragStart: (e: any) => any}) => {
  const [isFlipped, setIsFlipped] = useState(-1);
  const cardRef = useRef(null);

  const cardClick = (id: number) => {
    setIsFlipped(id !== isFlipped ? id : -1);
  };

  const cardDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  }

  // card design
  return (
    <Card
      sx={{ ...props.sx, backgroundColor: props.word.id !== isFlipped ?"#d9e6f7" : "#fff", color: "#000" }}
      variant="outlined"
      ref={cardRef}
      draggable={true}
      onClick={() => cardClick(props.word.id)}
      onDragStart={cardDrag}
      className={`card_container ${props.className || ""}`}
      id={"card-" + props.word.id}
    >
      <CardActionArea>
        <CardContent>
          {/* front and back side */}
          {props.word.id === isFlipped ?
            <div className="card_back">
              <Typography variant="body2" >
                {props.word.eng}
              </Typography>
            </div> :
            <div className="card_front">
            <Typography gutterBottom variant="h4" fontWeight="600" component="div">
              {props.word.span}
            </Typography>
            <Typography id="category" variant="body2" sx={{ color: 'text.secondary' }}>
              {props.lang}
            </Typography>
          </div> 
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// ***probably best to have base card and that accepts either front/back card components
// <cardMedia> for ASL

export default Flashcard;
