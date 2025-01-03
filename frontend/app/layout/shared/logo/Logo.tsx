import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import React from 'react';

const LinkStyled = styled(Link)(() => ({
  height: "55px",
  width: "70px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logo-words.png" alt="logo" height={55} width={70} priority />
    </LinkStyled>
  );
};

export default Logo;
