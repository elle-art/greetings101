import { Card, CardActionArea, CardContent, SxProps, Theme, Typography } from "@mui/material";
import "./flashcard.css";
import { vocabWord } from "@/types/Courses";

const Flashcard = (props: { ref?: (el: HTMLElement | null) => void, word: vocabWord, lang: string, sx?: SxProps<Theme>, className?: string, orderFunction: () => void }) => {
  const cardClick = (() => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.currentTarget as HTMLElement;
      props.orderFunction();
    } 
  })();

  const cardDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  }

  // card design
  return (
    <Card
      sx={{ ...props.sx }}
      variant="outlined"
      draggable={true}
      onClick={cardClick}
      onDragStart={cardDrag}
      className={`card_container ${props.className || ""}`}
      id={"card-" + props.word.id}
    >
      <CardActionArea>
        <CardContent className="flip">
          {/* front side */}
          <div className="card_front">
            <Typography gutterBottom variant="h4" fontWeight="600" component="div">
              {props.word.span}
            </Typography>
            <Typography id="category" variant="body2" sx={{ color: 'text.secondary' }}>
              {props.lang}
            </Typography>
          </div>
          {/* back side */}
          <div className="card_back">
            <Typography variant="body2" >
              {props.word.eng}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// probably best to have base card and that accepts either front/back card components
// <cardMedia> for ASL

export default Flashcard;
