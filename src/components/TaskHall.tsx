import React, { useEffect, useState } from 'react';
import { useDataProvider, useNotify } from 'react-admin';
import { Button, Card, CardActions, CardContent, Typography, Grid, TextField,
    Paper, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination } from '@mui/material';

interface Task {
    id: number;
    name: string;
    deadline: string;
    description?: string;
    tag?: string;
    payment?: string;
}

export const TaskHall = () => {
    const dataProvider = useDataProvider();
    const [tasks, setTasks] = useState<Task[]>([]);
    const notify = useNotify();
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        dataProvider
            .getList<Task>('tasks', {
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'deadline', order: 'ASC' },
                filter: {},
            })
            .then(({ data }) => {
                setTasks(data);
                setFilteredTasks(data);
            })
            .catch((error) => notify(`Error: ${error.message}`, { type: 'warning' }));
    }, [dataProvider, notify]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setFilteredTasks(tasks.filter((task) => task.name.toLowerCase().includes(value)));
    };

    const handleApplyTask = (taskId: number) => {
        notify(`You have applied for task ID: ${taskId}`, { type: 'info' });
    };

    const handleViewDetails = (task: Task) => {
        setSelectedTask(task);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedTask(null);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            {/*Search*/}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Paper>

            {/*Task cards*/}
            <Grid container spacing={3}>
                {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <Card elevation={3} style={{ backgroundColor: '#f5f5f5' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {task.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                                    Deadline: {task.deadline}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                                    Payment: {task.payment ? `$${task.payment}` : 'Not provided'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleApplyTask(task.id)}>
                                    Apply
                                </Button>
                                <Button size="small" color="primary" onClick={() => handleViewDetails(task)}>
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/*Pagination*/}
            <TablePagination
                component="div"
                count={filteredTasks.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/*Task details*/}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Task Details</DialogTitle>
                <DialogContent>
                    {selectedTask && (
                        <div>
                            <Typography variant="h6">Task Name</Typography>
                            <Typography variant="body1" gutterBottom>{selectedTask.name}</Typography>

                            <Typography variant="h6">Deadline</Typography>
                            <Typography variant="body1" gutterBottom>{selectedTask.deadline}</Typography>

                            <Typography variant="h6">Description</Typography>
                            <Typography variant="body1" gutterBottom>{selectedTask.description || 'No description available'}</Typography>

                            <Typography variant="h6">Tag</Typography>
                            <Typography variant="body1" gutterBottom>{selectedTask.tag || 'No tag provided'}</Typography>

                            <Typography variant="h6">Payment</Typography>
                            <Typography variant="body1">{selectedTask.payment ? `$${selectedTask.payment}` : 'Not provided'}</Typography>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TaskHall;
