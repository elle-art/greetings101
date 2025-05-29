// Curved text with image component for EndOfLesson card
import { API_BASE_URL } from "@/utils/constants/api";
import useFetchPfp from "@/utils/user/getPfp";
import { Box } from "@mui/material";

const CurvedTextWithImage = () => {
  const { pfp } = useFetchPfp();

  const pfpUrl = `${API_BASE_URL}${pfp?.url}`

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      height="100vh"
    >
      <svg width="500" height="500" viewBox="0 0 800 800">
        <defs>
          <clipPath id="circleClip">
            <circle cx="400" cy="400" r="250" />
          </clipPath>
          <path
            id="circlePath"
            d="M 450, 430
                            m -250, 0
                            a 250, 200 0 1, 1 400, 0
                            a 250, 200 0 1, 1 -400, 0"
          />
        </defs>
        <circle
          cx="400"
          cy="400"
          r="250"
          stroke="black"
          strokeWidth="12"
          fill="none"
        />
        <image
          href={pfpUrl}
          x="150"
          y="150"
          width="500"
          height="500"
          clipPath="url(#circleClip)"
          preserveAspectRatio="xMidYMid slice"
        />
        <text fontSize="100">
          <textPath href="#circlePath" startOffset="12%">
            ¡Muy Bien!
          </textPath>
        </text>
      </svg>
    </Box>
  );
};

export default CurvedTextWithImage;
