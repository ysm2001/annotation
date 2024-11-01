import React, { useEffect, useState } from 'react';
import { useDataProvider, useNotify } from 'react-admin';
import {
    TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, Input, FormGroup, TablePagination, Paper, Snackbar, Alert
} from '@mui/material';

interface Task {
    id: number;
    name: string;
    deadline: string;
    annotator?: string;
    status: string;
    description?: string;
    tag?: string;
    payment?: string;
    dataset?: File;
}

export const UserTaskmanagement = () => {
    const dataProvider = useDataProvider();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const notify = useNotify();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dataProvider
            .getList<Task>('tasks', {
                pagination: { page: page + 1, perPage: rowsPerPage },
                sort: { field: 'deadline', order: 'ASC' },
                filter: {},
            })
            .then(({ data }) => setTasks(data))
            .catch((error) => notify(`Error: ${error.message}`, { type: 'warning' }));
    }, [dataProvider, notify, page, rowsPerPage]);

    const handleOpenDialog = (task: Task) => {
        setSelectedTask(task);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedTask(null);
    };

    const handleUpdateTask = () => {
        if (selectedTask) {
            dataProvider
                .update<Task>('tasks', {
                    id: selectedTask.id,
                    data: selectedTask,
                    previousData: selectedTask,
                })
                .then(() => {
                    notify('Task updated successfully', { type: 'info' });
                    setDialogOpen(false);
                    setSelectedTask(null);
                    dataProvider
                        .getList<Task>('tasks', {
                            pagination: { page: page + 1, perPage: rowsPerPage },
                            sort: { field: 'deadline', order: 'ASC' },
                            filter: {},
                        })
                        .then(({ data }) => setTasks(data))
                        .catch((error) => notify(`Error: ${error.message}`, { type: 'warning' }));
                })
                .catch((error) => notify(`Error: ${error.message}`, { type: 'warning' }));
        }
    };

    const handleOpenCreateDialog = () => {
        setSelectedTask({ id: 0, name: '', deadline: '', status: 'Pending', description: '', tag: '', payment: '', dataset: undefined });
        setCreateDialogOpen(true);
    };

    const handleCloseCreateDialog = () => {
        setCreateDialogOpen(false);
        setSelectedTask(null);
    };

    const handleCreateTaskSuccess = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    style={{ flexGrow: 4, marginRight: '16px', height: '56px' }}
                    onChange={(e) => {
                        const value = e.target.value.toLowerCase();
                        setTasks((prevTasks) =>
                            prevTasks.filter((task) => task.name.toLowerCase().includes(value))
                        );
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ flexGrow: 1, height: '75px' }}
                    onClick={handleOpenCreateDialog}
                >
                    +Create New Task
                </Button>
            </div>

            <Paper>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-center">Task Name</th>
                            <th className="py-2 px-4 border-b text-center">Deadline</th>
                            <th className="py-2 px-4 border-b text-center">Annotator Assigned</th>
                            <th className="py-2 px-4 border-b text-center">Status</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                            <tr key={task.id}>
                                <td className="py-2 px-4 border-b text-center">{task.name}</td>
                                <td className="py-2 px-4 border-b text-center">{task.deadline}</td>
                                <td className="py-2 px-4 border-b text-center">{task.annotator || 'Not Assigned'}</td>
                                <td className="py-2 px-4 border-b text-center">{task.status}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <Button onClick={() => handleOpenDialog(task)}>View Details</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <TablePagination
                    component="div"
                    count={tasks.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/*task detail*/}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Task Details</DialogTitle>
                <DialogContent>
                    {selectedTask && (
                        <FormGroup>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="task-name" shrink>Task Name</InputLabel>
                                <Input
                                    id="task-name"
                                    value={selectedTask.name}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-deadline" shrink>Deadline</InputLabel>
                                <Input
                                    id="task-deadline"
                                    type="date"
                                    value={selectedTask.deadline}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, deadline: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-status">Status</InputLabel>
                                <Input
                                    id="task-status"
                                    value={selectedTask.status}
                                    disabled
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-description" shrink>Task Description</InputLabel>
                                <TextField
                                    id="task-description"
                                    value={selectedTask.description}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                                    multiline
                                    rows={2}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-tag" shrink>Task Tag</InputLabel>
                                <Input
                                    id="task-tag"
                                    value={selectedTask.tag}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, tag: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-payment" shrink>Payment</InputLabel>
                                <Input
                                    id="task-payment"
                                    value={selectedTask.payment}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, payment: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-dataset" shrink>Upload Dataset</InputLabel>
                                <Input
                                    id="task-dataset"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setSelectedTask((prev) => (prev ? { ...prev, dataset: file } : null));
                                    }}
                                />
                            </FormControl>
                        </FormGroup>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleUpdateTask}>Save Changes</Button>
                </DialogActions>
            </Dialog>

            {/*create task*/}
            <Dialog open={isCreateDialogOpen} onClose={handleCloseCreateDialog} maxWidth="md" fullWidth>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent>
                    {selectedTask && (
                        <FormGroup>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-name" shrink>Task Name</InputLabel>
                                <Input
                                    id="task-name"
                                    value={selectedTask.name}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-deadline" shrink>Deadline</InputLabel>
                                <Input
                                    id="task-deadline"
                                    type="date"
                                    value={selectedTask.deadline}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, deadline: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-description" shrink>Task Description</InputLabel>
                                <TextField
                                    id="task-description"
                                    value={selectedTask.description}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                                    multiline
                                    rows={2}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-tag" shrink>Task Tag</InputLabel>
                                <Input
                                    id="task-tag"
                                    value={selectedTask.tag}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, tag: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-payment" shrink>Payment</InputLabel>
                                <Input
                                    id="task-payment"
                                    value={selectedTask.payment}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, payment: e.target.value })}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="task-dataset" shrink>Upload Dataset</InputLabel>
                                <Input
                                    id="task-dataset"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setSelectedTask((prev) => (prev ? { ...prev, dataset: file } : null));
                                    }}
                                />
                            </FormControl>
                        </FormGroup>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog} color="primary">Cancel</Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        handleUpdateTask();
                        handleCreateTaskSuccess();
                    }}>Create Task</Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    Task created successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default UserTaskmanagement;