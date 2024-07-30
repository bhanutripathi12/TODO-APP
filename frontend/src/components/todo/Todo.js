import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { red, green, yellow } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default class Todo extends Component {

    constructor(props) {
        super(props);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateToDoItem = this.updateToDoItem.bind(this);

        this.state = {
            message: this.props.message,
            status: this.props.status
        }
    }

    async updateStatus(id, status) {

        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        };

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todo/markstatus/${id}`, { status: status }, config)
            .then((res) => {
                console.log('updated Status');
            })

    }

    async updateToDoItem(id) {
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization"),
            },
        };

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todo/updatetodo/${id}`, { message: this.state.message }, config)
            .then((res) => {
                console.log('updated Todo Item');
                this.props.getTodo();
            })
    }

    render() {
        return (

            <Card sx={{ display: 'flex', mt: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', mx: "auto" }}>
                    <CardContent sx={{ mx: "auto" }}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={this.props.status}
                            onChange={(e) => {
                                this.updateStatus(this.props.itemID, e.target.value)
                            }}
                        >
                            <FormControlLabel value="1" control={<Radio sx={{
                                color: red[800],
                                '&.Mui-checked': {
                                    color: red[600],
                                },
                            }} size="small" />} label="Todo" />
                            <FormControlLabel value="2" control={<Radio sx={{
                                color: yellow[800],
                                '&.Mui-checked': {
                                    color: yellow[600],
                                },
                            }} size="small" />} label="Inprogress" />
                            <FormControlLabel value="3" control={<Radio sx={{
                                color: green[800],
                                '&.Mui-checked': {
                                    color: green[600],
                                },
                            }} size="small" />} label="Done" />
                        </RadioGroup>
                    </CardContent>
                    <CardContent sx={{ mx: "auto" }}>
                        <TextField
                            required
                            sx={{ width: '100%' }}
                            label="Message"
                            placeholder="get milk"
                            value={this.state.message}
                            onChange={(e) => this.setState({ message: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 1, ml: 1 }}
                            aria-label="add"
                            onClick={() => this.updateToDoItem(this.props.itemID)}
                        >
                            Update
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        )
    }
}
