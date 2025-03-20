import { Card, CardActionArea, CardContent, SxProps, Theme, Typography } from "@mui/material";
import "./flashcard.css";
import { vocabWord } from "@/types/Courses";

const DiscardPile = () => {
  const cardDrop = (e: React.DragEvent<HTMLDivElement>) => {
    let cardID = e.dataTransfer.getData("text/plain");
    let cardDragging = document.getElementById(cardID);
    if (cardDragging) {
      cardDragging.style.top = "0px";
      cardDragging.style.left = "0px";
      cardDragging.style.zIndex = "-5";
      e.currentTarget.appendChild(cardDragging);
    }
  };

  const cardDragOver = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  return (
    <div className="holder_container">
      <div className="holder_label">
        Learned
        <div className="holder_target" onDragOver={cardDragOver} onDrop={cardDrop}></div>
      </div>
    </div>
  );
};

export default DiscardPile;
