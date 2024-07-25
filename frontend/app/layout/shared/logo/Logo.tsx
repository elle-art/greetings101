import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import React from 'react';

const LinkStyled = styled(Link)(() => ({
  height: "40px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/templogo.png" alt="logo" height={40} width={105} priority />
    </LinkStyled>
  );
};

export default Logo;
