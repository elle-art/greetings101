// Flashcard game page - "Flashcards"
'use client'
import React from 'react';
import { Grid, Box } from '@mui/material';
// components
import PageContainer from '@/app/components/container/PageContainer';
import Deck from '@/app/components/practice/flashcards/Deck';
import { useUser } from '@/utils/user/UserContext';

const Flashcards = () => {
    const { user } = useUser();

    return (
        <PageContainer title="Flashcards" description="this is the Flashcards Page">
            <Box mt={3}>
                <Grid container borderRadius={10} height={400} pt={3} sx={{ backgroundColor: user?.preferences.pfColor }}>
                    <Grid item xs={12}>
                        <Deck />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default Flashcards;
