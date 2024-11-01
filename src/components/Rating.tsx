import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Rating,
} from '@mui/material';

const RatingPage: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [value, setValue] = useState<number | null>(0);
    const [feedback, setFeedback] = useState<string>('');

    const handleSubmit = async () => {
        const data = {
            taskId,
            userRating: value,
            userComment: feedback,
        };

        try {
            const response = await fetch('http://54.209.7.226:8080/api/rating/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Rating submitted successfully');
                setValue(0);
                setFeedback('');
            } else {
                console.error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Paper style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
                Task Rating
            </Typography>

            <Typography variant="subtitle1" style={{ marginBottom: '20px' }}>
                Task ID: {taskId}
            </Typography>

            <Typography component="legend">Rating:</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ marginBottom: '20px' }}
            />

            <TextField
                label="Detailed Feedback"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit Rating
            </Button>
        </Paper>
    );
};

export default RatingPage;
