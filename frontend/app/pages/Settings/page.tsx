//Settings page - "Settings"
"use client";
import React, {  } from "react";
import {
  Box,
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import DarkModeButton from "@/app/components/settings/DarkModeButton";

const Settings = () => {
  return (
    <PageContainer title="Settings" description=" ">
      <Box mt={3}>
        <DarkModeButton />
      </Box>
    </PageContainer>
  );
};

export default Settings;
