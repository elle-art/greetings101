import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useUser } from "@/utils/user/UserContext";
import DarkModeButton from "./DarkModeButton";

const ColorPicker = ({ updateColor }: { updateColor: Function }) => {
  const { user } = useUser()
  const [selectedColor, setSelectedColor] = useState(user?.preferences.pfColor || "#4287f5");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateColor(null, null, null, color);
  };

  useEffect(() => {
    Coloris.init()

    Coloris({
      el: "#color-picker",
      alpha: false,
      themeMode: "auto",
      theme: "large",
      onChange: handleColorChange
    });

    return () => {
      Coloris.close();
    };
  }, [selectedColor]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9} sm={5} md={3} sx={{ display: "flex" }}>
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: selectedColor,
            border: '2px solid white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        ></Box>
      </Grid>
      <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={12} sm={7} md={9} mt={4}>
        <input id="color-picker" type="text" placeholder="Pick a color" value={selectedColor} style={{ width: "200px" }} />
      </Grid>
      <Grid item xs={12} sm={7}>
        <DarkModeButton />
      </Grid>
      </Stack>
    </Grid>
  );
}

export default ColorPicker;
