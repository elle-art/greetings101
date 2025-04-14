import { Language, vocabWord } from "@/types/Courses";
import { useUser } from "@/utils/user/UserContext";
import { Box, Typography } from "@mui/material";

const VocabList = (props: { lesson_name: string, lesson_words: vocabWord[], language: Language }) => {
    const { user } = useUser();

    return (
        <Box key={props.lesson_name} sx={{ maxHeight: "455px", overflow: "hidden", pt: 4 }}>
            <Typography variant="h1">{props.lesson_name}</Typography>

            <Box sx={{ width: '95%', background: `${user?.preferences.pfColor}80`, borderRadius: '10px',  p: 3,  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'  }}>
                {props.lesson_words.map((vocabWord) => (
                    <Box key={vocabWord.id} sx={{ display: 'inline-block', width: '300px' }} >
                        <Typography variant="h4" fontWeight={700}>{vocabWord[props.language]}</Typography>
                        <Typography color={"grey"}>{vocabWord.eng}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default VocabList;
