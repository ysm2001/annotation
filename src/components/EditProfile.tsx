import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    TextField,
    Divider,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditProfile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        userName: 'User Name',
        gender: '',
        email: '',
        phoneNumber: '',
        taskIncome: '',
        tags: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleTagChange = (event) => {
        const { target: { value } } = event;
        setUserInfo({
            ...userInfo,
            tags: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleSave = () => {
        // TODO: 发送数据到后端
        console.log('Saving user info...', userInfo);
        navigate('/profile'); // 成功后跳转回前一个页面
    };

    return (
        <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Personal Information</span>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Typography>

            <Divider sx={{ borderColor: 'black', width: '100%' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="User Name"
                    name="userName"
                    value={userInfo.userName}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    sx={{ backgroundColor: '#d0d0d0', mb: 1 }}
                />

                <FormControl fullWidth variant="outlined">
                    <InputLabel>Gender</InputLabel>
                    <Select
                        label="Gender"
                        name="gender"
                        value={userInfo.gender}
                        onChange={handleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="prefer not to say">Prefer not to say</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                />

                <FormControl fullWidth variant="outlined">
                    <InputLabel>Tags</InputLabel>
                    <Select
                        label="Tags"
                        name="tags"
                        multiple
                        value={userInfo.tags}
                        onChange={handleTagChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {['image classification', 'image annotation', 'text classification', 'audio classification'].map((tag) => (
                            <MenuItem key={tag} value={tag}>
                                <Checkbox checked={userInfo.tags.indexOf(tag) > -1} />
                                <ListItemText primary={tag} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ alignSelf: 'center', width: '50%', mt: 3 }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default EditProfile;
