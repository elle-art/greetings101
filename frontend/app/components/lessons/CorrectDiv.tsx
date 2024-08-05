import { Prompts } from "@/types/Courses";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";

const CorrectDiv = (props: {prompt: Prompts, onAdvance: () => void}) => {
    return (
        <div>
            <Alert 
                severity="success" 
                sx={{
                    mt: "50px",
                    width: "80%"
                }}>
                {/*  title message */}
                <AlertTitle>{props.prompt.title}</AlertTitle>
                {/* in english */}
                <Typography
                    color="textSecondary"
                    mt={1}
                    fontSize="16px"
                    fontWeight={400}
                >
                En Inglés:  {props.prompt.translation}
                </Typography>
                <Button onClick={props.onAdvance} variant="contained" color="success" style={{ marginTop: '20px',  width: "80%"}}>
                    Next
                </Button>
            </Alert>
        </div>
    )           
};

export default CorrectDiv;
