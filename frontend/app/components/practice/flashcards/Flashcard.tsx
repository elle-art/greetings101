import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import "./flashcard.css";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const Flashcard = () => {
  const cardClick = (() => {
    let counter = 0;
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.currentTarget as HTMLElement;
      target.classList.toggle("flip_card");
      target.classList.toggle("slide_over");
      target.style.zIndex = `{counter}`;
      counter++;
    }
    })();
    
    const cardDrag = (e: React.DragEvent<HTMLDivElement>) =>  {
      e.dataTransfer.setData("text/plain", e.currentTarget.id);
    }

  // card design
  return (
    <Card
      sx={{ p: 0, position: "relative" }}
      variant="outlined"
      draggable={true}
      onClick={cardClick}
      onDragStart={cardDrag}
      className="card_container"
      id="{card.id}"
    >
      <CardActionArea>
        <CardContent className="flip">
          {/* if front side */}
          <div className="card_front">
          <Typography gutterBottom variant="h5" component="div">
            vocab word in foreign language
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            language category
          </Typography>
          </div>
          {/* if back side */}
          <div className="card_back">
          <Typography variant="body2" >
            vocab word in english
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