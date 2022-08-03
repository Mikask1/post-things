import React, { useEffect, useState } from 'react'
import { Card, CardContent, TextField, Typography, Button } from '@material-ui/core'
import jwt_decode from "jwt-decode"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import "./styles.css"
import useStyles from "./styles"
import {signin, signup} from "../../actions/auth.js"

const useScript = (url, onload) => {
    useEffect(() => {
        let script = document.createElement("script");
        script.src = url;
        script.onload = onload;
        document.head.appendChild(script);
        return () => document.head.removeChild(script);
    }, [url, onload]);
};

export const Login = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authData = useSelector((state) => state.auth)
    const [errorMessage, setErrorMessage] = useState("")

    const [isSignup, setIsSingup] = useState(false)
    const [loginData, setLoginData] = useState({name: "", email: "", password: "", confirmPassword: ""})
    
    useEffect(() => setErrorMessage(authData?.authData?.message ? authData.authData?.message : ""), [authData?.authData?.message])

    const handleGoogleCallback = (response) => {
        const token = response?.credential
     
        try {
            const result = jwt_decode(token)
            dispatch({ type: "AUTH", payload: { result, token } }) 
            navigate("/")
        } catch (error) {
            console.log(error);
        }        
    }

    useScript("https://accounts.google.com/gsi/client", () => {
        window.google.accounts.id.initialize({
            client_id: "697591298915-01k79s4flcsbaniafv2qiokunr9jupbv.apps.googleusercontent.com",
            callback: handleGoogleCallback,
            auto_select: false,
            cookiePolicy: "single_host_origin"
        });

        window.google.accounts.id.renderButton(document.getElementById("google-button"), {
            size: "large",
        });

        window.google.accounts.id.prompt()
    });

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignup){
            dispatch(signup(loginData, navigate))
        }
        else{
            dispatch(signin(loginData, navigate))
        }
    }
    
    return (
        <div id='login'>
            <Card className={classes.center}>
                <CardContent>
                    <Typography variant="h5" className={classes.formContent}>{isSignup ? "SIGN UP" : "SIGN IN"}</Typography>
                    <form onSubmit={handleSubmit}>
                        {!isSignup &&
                            <div className={classes.formInput + " " + classes.bottomLine}>
                                <TextField label="Email" name="email" variant="outlined" required onChange={handleChange} fullWidth className={classes.formContent} autoComplete="eh"></TextField>
                                <TextField label="Password" name="password" variant="outlined" required type="password" onChange={handleChange} fullWidth className={classes.formContent}></TextField>
                                <Button variant="contained" type="submit" className={classes.button + " " + classes.formButton}><Typography>Sign in</Typography></Button>
                                <div id='google-button'></div>
                                <p style={{ color: "red" }}>{errorMessage}</p>
                            </div>
                        }
                        {isSignup &&
                            <div>
                                <div className={classes.formInput + " " + classes.bottomLine}>
                                    <TextField label="Username" variant="outlined" name="name" onChange={handleChange} fullWidth className={classes.formContent} required autoComplete="eh"></TextField>
                                    <TextField label="Email" variant="outlined" name="email" onChange={handleChange} fullWidth className={classes.formContent} required></TextField>
                                    <TextField label="Password" type="password" name="password" onChange={handleChange} variant="outlined" fullWidth className={classes.formContent} required></TextField>
                                    <TextField label="Re-enter Password" name="confirmPassword" type="password" onChange={handleChange} variant="outlined" fullWidth className={classes.formContent} required></TextField>
                                    <Button variant="contained" type="submit" className={classes.button}><Typography>Sign Up</Typography></Button>
                                    <p style={{ color: "red" }}>{errorMessage}</p>
                                </div>
                            </div>
                        }
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Typography variant="body2" style={{ display: "inline" }}>{isSignup ? "Already have an account? " : "Don't have an account yet? "}</Typography>
                            <Typography variant='body2' style={{ display: "inline", cursor: "pointer", color: "#0000EE", paddingLeft: "0.2rem" }}><a onClick={() => {setIsSingup(!isSignup); setErrorMessage("")}}>{isSignup ? "Sign in." : "Sign up."}</a></Typography>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
