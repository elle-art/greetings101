import React from "react";
import { Typography, Grid, SvgIconProps } from "@mui/material";

type HeaderProps = {
    icon: React.ComponentType<SvgIconProps> | null;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2";
    title: string;
  }
  
const HeaderWithIcon = ({ icon: Icon, variant, title }: HeaderProps) => {
  return (
    <Grid container alignItems="center" spacing={1}> 
      {Icon && (
        <Grid item>
          <Icon width={30} height={30} />
        </Grid>
      )}
      <Grid item>
        <Typography variant={variant}>{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default HeaderWithIcon;