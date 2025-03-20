//Flashcard game page - "Flashcards"
'use client'
import React from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
// components
import PageContainer from '@/app/components/container/PageContainer';
import DiscardPile from '@/app/components/practice/flashcards/DiscardPile';
import Deck from '@/app/components/practice/flashcards/Deck';

const Flashcards = () => {
    return (
        <PageContainer title="Courses" description="this is the Courses Page">
            <Box mt={3}>
                <Grid container spacing={3} sx={{ border: "2px solid green" }}>
                    <Grid item xs={3} border={"1px solid yellow"}>
                        <DiscardPile />
                    </Grid>
                    <Grid item xs={7}>
                        <Deck />
                    </Grid>
                    <Grid item container xs={2}>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth>Shuffle</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth>Reset</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default Flashcards;
