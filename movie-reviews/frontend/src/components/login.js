import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();

    const onChangeName = e => {
        const name = e.target.value;
        setName(name);
    }

    const onChangeId = e => {
        const id = e.target.value;
        setId(id);
    }

    const login = () => {
        props.login({ name, id });
        history.push('/'); 
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa" 
        }}>
            <div style={{
                width: "300px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            value={name} 
                            onChange={onChangeName} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter ID" 
                            value={id} 
                            onChange={onChangeId} 
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={login} style={{ width: "100%" }}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;
