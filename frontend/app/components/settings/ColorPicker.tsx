"use client";
import "@melloware/coloris/dist/coloris.css";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useUser } from "@/utils/user/UserContext";

const ColorPicker = ({ updateColor }: { updateColor: Function }) => {
  const { user } = useUser();
  const [selectedColor, setSelectedColor] = useState(
    user?.preferences.pfColor || "#4287f5"
  );

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateColor(null, null, null, color);
  };

  useEffect(() => {
    let colorisInstance: any;
    if (typeof window !== "undefined") {
      import("@melloware/coloris").then((ColorisModule) => {
        const Coloris = ColorisModule.default;
        Coloris.init();
        Coloris({
          el: "#color-picker",
          alpha: false,
          themeMode: "auto",
          theme: "large",
          onChange: handleColorChange,
        });
        colorisInstance = Coloris;
      });
    }
    return () => {
      if (colorisInstance) {
        colorisInstance.close && colorisInstance.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9} sm={5} md={3} sx={{ display: "flex" }}>
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            backgroundColor: selectedColor,
            border: "2px solid white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} sm={7} md={9} mt={4}>
        <input
          id="color-picker"
          type="text"
          placeholder="Pick a color"
          value={selectedColor}
          style={{ width: "200px" }}
          readOnly
        />
      </Grid>
    </Grid>
  );
};

export default ColorPicker;
