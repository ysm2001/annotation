import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Paper, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: number;
    name: string;
    deadline: string;
    status: string;
    isCompleted: boolean;
    description?: string; // Add description property
    rating?: number; // Add rating property
    review?: string; // Add review property
    income?: number; // Add income property
}

const UserProfile = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('All'); // Filter status
    const [sortOrder, setSortOrder] = useState<string>('Ascending'); // Sort order
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
    const [username, setUsername] = useState<string>(''); // State for username
    const your_jwt_token = localStorage.getItem('jwtToken');

    // Controls for the dialog window
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('');
    const [dialogContent, setDialogContent] = useState<JSX.Element>(<></>); // Content for the dialog window
    const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Currently selected task

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://54.209.7.226:8080/api/users/profile', {
                    method: 'GET', // 确保方法正确
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${your_jwt_token}`, // 添加 JWT token
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("获取用户信息出错:", error);
            }
        };
        fetchUserProfile();
    }, []);
    

    useEffect(() => {
        const mockTasks: Task[] = [
            { id: 1, name: 'Task One', deadline: '2024-12-01', status: 'In Progress', isCompleted: false, description: 'This is the description for task one.', income: 150 },
            { id: 2, name: 'Task Two', deadline: '2024-12-05', status: 'Completed', isCompleted: true, rating: 4.5, review: 'Task was completed very well!', income: 200 },
            { id: 3, name: 'Task Three', deadline: '2024-11-30', status: 'In Progress', isCompleted: false, description: 'This is the description for task three.', income: 100 },
        ];
        setTasks(mockTasks);
        setFilteredTasks(mockTasks); // Display all tasks on initialization
    }, []);

    // Update filtered tasks based on search query
    useEffect(() => {
        const filtered = tasks.filter(task =>
            task.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [searchQuery, tasks]);

    // Filter tasks
    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setStatusFilter(value);

        const filtered = tasks.filter(task => 
            (value === 'All' || task.status === value) &&
            task.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filtered);
    };

    // Sort tasks
    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setSortOrder(value);

        const sorted = [...filteredTasks].sort((a, b) => 
            value === 'Ascending' 
                ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                : new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
        );
        setFilteredTasks(sorted);
    };

    // Open dialog window
    const handleOpenDialog = (task: Task) => {
        setSelectedTask(task);

        if (task.isCompleted) {
            setDialogTitle('Rating');
            setDialogContent(
                <>
                    <Typography variant="h6">{task.name}</Typography>
                    <Typography>Rating: {task.rating}</Typography>
                    <Typography>Review: {task.review}</Typography>
                </>
            );
        } else {
            setDialogTitle('Task Content');
            setDialogContent(
                <>
                    <Typography variant="h6">{task.name}</Typography>
                    <Typography>{task.description}</Typography>
                </>
            );
        }
        
        setOpenDialog(true);
    };

    // Close dialog window
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        // <Layout>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                {/* Username with edit button */}
                <div style={{ marginBottom: '20px' }}>
                    <Typography variant="h4" style={{ display: 'inline', marginRight: '10px' }}>
                        {username || 'Username'}
                    </Typography>
                    <Button onClick={() => navigate('/editprofile')}>
                        <EditIcon />
                    </Button>
                </div>

                {/* User reputation score, task count, and task income */}
                <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                    <Grid item xs={4}>
                        <Typography variant="body1">Reputation: 100</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Task Count: {filteredTasks.length}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Task Income: ${filteredTasks.reduce((total, task) => total + (task.income || 0), 0)}</Typography>
                    </Grid>
                </Grid>

                {/* Search functionality */}
                <TextField
                    variant="outlined"
                    placeholder="Search by Task Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ margin: '20px', width: '300px' }}
                />

                {/* Filter functionality */}
                <FormControl variant="outlined" style={{ margin: '20px' }}>
                    <InputLabel id="status-filter-label">Filter Status</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        value={statusFilter}
                        onChange={handleFilterChange}
                        label="Filter Status"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>

                {/* Sort functionality */}
                <FormControl variant="outlined" style={{ margin: '20px' }}>
                    <InputLabel id="sort-order-label">Sort Order</InputLabel>
                    <Select
                        labelId="sort-order-label"
                        value={sortOrder}
                        onChange={handleSortChange}
                        label="Sort Order"
                    >
                        <MenuItem value="Ascending">Ascending</MenuItem>
                        <MenuItem value="Descending">Descending</MenuItem>
                    </Select>
                </FormControl>

                {/* Task list */}
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h6" style={{ marginBottom: '20px' }}>Task List</Typography>
                    <Grid container spacing={2}>
                        {/* Task table header */}
                        <Grid container style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                            <Grid item xs={1}><Typography variant="body2"></Typography></Grid>
                            <Grid item xs={5}><Typography variant="body2">Task Name</Typography></Grid>
                            <Grid item xs={3}><Typography variant="body2">Status</Typography></Grid>
                            <Grid item xs={3}><Typography variant="body2">Actions</Typography></Grid>
                        </Grid>

                        {/* Row for each task */}
                        {filteredTasks.map((task) => (
                            <Grid container key={task.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0', alignItems: 'center' }}>
                                <Grid item xs={1}>
                                    <BookmarkIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography>{task.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{task.deadline}</Typography> {/* Place deadline below task name */}
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{task.status}</Typography> {/* Display status */}
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button 
                                        variant="outlined" 
                                        onClick={() => handleOpenDialog(task)}
                                    >
                                        {task.isCompleted ? 'View Rating' : 'View Content'}
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Dialog window */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        {dialogContent}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        // </Layout>
    );
};

export default UserProfile;
