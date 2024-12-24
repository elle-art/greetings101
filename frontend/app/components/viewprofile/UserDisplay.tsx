import { API_BASE_URL } from "@/utils/constants";
import useFetchPfp from "@/utils/user/getPfp";
import { useUser } from "@/utils/user/UserContext";
import { Box, Stack, Typography } from "@mui/material";
import Image from 'next/image';

const UserDisplay = () => {
  const { user } = useUser();

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  const { pfp } = useFetchPfp();

  if (!pfp) {
    return <p>Loading profile picture...</p>;
  }

  const pfpUrl = `${API_BASE_URL}${pfp.url}`

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: 2,
          border: '6px solid white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Image src={pfpUrl} width={300} height={300} alt={pfp.description} priority />
      </Box>
      <Stack mt={10} paddingLeft={3}>
        <Typography
          variant="h2"
          fontWeight={600}
        >
          {user.name}
        </Typography>
        <Typography
          color="text.secondary"
          mt={1}
          fontSize="18px"
          fontWeight={400}
        >
          Joined in {user.yearJoined}
        </Typography>
      </Stack>
    </Box>
  );
}

export default UserDisplay;
