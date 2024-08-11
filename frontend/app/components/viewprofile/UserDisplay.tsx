import { API_BASE_URL, UPDATE_USER_ENDPOINT } from "@/utils/constants";
import getPfp from "@/utils/user/getPfp";
import { useUser } from "@/utils/user/UserContext";
import { Box, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import { useState } from "react";

const UserDisplay = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const {user} = useUser();

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  const { name, email } = user;
  const pfpId = user.preferences.pfpId;
  const pfColor = user.preferences.pfColor;
  const { imageLink, alt } =  getPfp(user.preferences.pfpId);

  if (editMode) {
    const editUser = async () => {
      setErrorMessage(null);
    
      const updatedUser = {
        ...user,
        name,
        email,
        pfpId,
        pfColor
      };
    
      const response = await fetch(`${API_BASE_URL}${UPDATE_USER_ENDPOINT}${ user.id }`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updatedUser }),
      });
    
      if (response.ok) {
          const result = await response.json();
          localStorage.setItem('user', JSON.stringify(result.user));
          window.location.reload();
      } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message);
      }
    };

      {errorMessage && (
        <Typography color="error" variant="body2">
            {errorMessage}
        </Typography>
    )}
  }

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
        <Image src={imageLink} width={300} height={300} alt={alt} priority/>
      </Box>
      <Stack mt={6} paddingLeft={3}>
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
