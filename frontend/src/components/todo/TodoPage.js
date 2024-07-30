import React, { Component } from 'react';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Todo from './Todo';

export class TodoPage extends Component {
    constructor(props) {
        super(props);
        this.addToDoItem = this.addToDoItem.bind(this);
        this.logout = this.logout.bind(this);
        this.getTodo = this.getTodo.bind(this);

        this.state = {
            name: "",
            email: "",
            dataSource: [], // Ensure this is initialized as an array
            message: "",
        }
    }

    async componentDidMount() {
        if (localStorage.getItem("Authorization") === null) {
            window.location = '/signin';
        }

        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getuser`, config);
            this.setState({
                name: res.data.user.username,
                email: res.data.user.email
            });
            await this.getTodo();
        } catch (error) {
            console.log(error.message);
            window.location = "/signin";
        }
    }

    async getTodo() {
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todo/gettodos`, config);
            this.setState({
                dataSource: res.data.todo || [] // Ensure dataSource is always an array
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async addToDoItem(e) {
        e.preventDefault();
        e.target.reset();
        let message = this.state.message;
        let todo = { message: message };

        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        };

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo/addtodo`, todo, config);
            console.log('Item Added');
            this.setState({
                dataSource: [...this.state.dataSource, res.data.todo]
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async logout() {
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        };

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, {}, config);
            localStorage.removeItem("Authorization");
            window.location = "/signin";
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Box sx={{ my: 3 }}>
                    <Stack direction="row" spacing={'auto'} sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 2 }}>
                            Hi, {this.state.name} 👋
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            aria-label="logout"
                            onClick={this.logout}
                        >
                            LogOut
                        </Button>
                    </Stack>

                    <form onSubmit={this.addToDoItem}>
                        <TextField
                            required
                            sx={{ width: '85%' }}
                            id="outlined-required"
                            label="Message"
                            placeholder="get milk"
                            onChange={(e) => this.setState({ message: e.target.value })}
                        />
                        <IconButton
                            variant="contained"
                            color="success"
                            sx={{ mt: 1, ml: 1 }}
                            aria-label="add"
                            type="submit"
                        >
                            <AddIcon />
                        </IconButton>
                    </form>
                    {this.state.dataSource.length > 0 ? (
                        this.state.dataSource.map((item) => (
                            <Todo
                                key={item._id}
                                itemID={item._id}
                                userID={item.userID}
                                message={item.message}
                                status={item.status}
                                getTodo={this.getTodo}
                            />
                        ))
                    ) : (
                        <Box sx={{ my: 5 }}>
                            <Typography variant="h5" component="h5" gutterBottom sx={{ mb: 2 }}>
                                No todos, add more!
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        )
    }
}

export default TodoPage;
