import React, { useState, useEffect } from "react";
import { Container, AppBar, Grow, Button, Typography } from "@material-ui/core"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode"

import { getPosts } from "../../actions/posts"

import PostThingsLogo from "../../images/post-things-logo.png"
import PlusIcon from "../../images/plus.png"

import { Posts } from "../Posts/Posts"
import { Form } from "../Form/Form"

import useStyles from "./styles"

export const Home = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const dispatch = useDispatch()

    const [currentID, setCurrentID] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        navigate("/")
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decoded = decode(token)

            if (decoded.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [])

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Container>
            <AppBar className={classes.appBar} position="fixed" style={{ background: "#232323" }}>
                <div className={classes.leftNav}>
                    <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><img className={classes.logo} src={PostThingsLogo} alt="memories logo" /></a>
                    {user !== null && <a onClick={() => { setOpenModal(!openModal) }}><img className={classes.icon} src={PlusIcon} alt="upload button" /></a>}
                </div>
                <div className={classes.rightNav}>
                    {user !== null &&
                        <div className={classes.userProfile}>
                            {user?.result.picture && <img src={user?.result.picture} width={20} height={20} alt="profile pic"></img>}
                            <Typography variant="body2" style={{ marginLeft: "0.5rem" }}>{user?.result.name}</Typography>
                        </div>
                    }

                    {user == null ?
                        <div onClick={() => navigate("/login")} className={classes.authButton} size="small"><Button variant="outlined" className={classes.authButton}>SIGN IN</Button></div>
                        :
                        <div onClick={logout} className={classes.authButton}><Button variant="outlined" size="small" className={classes.authButton}><Typography variant="body2">SIGN OUT</Typography></Button></div>
                    }
                </div>
            </AppBar>
            <Grow in>
                <Container className={classes.posts}>
                    <Posts openModal={openModal} setOpenModal={setOpenModal} setCurrentID={setCurrentID} currentID={currentID} />
                    <Form openModal={openModal} setOpenModal={setOpenModal} setCurrentID={setCurrentID} currentID={currentID} />
                </Container>
            </Grow>
        </Container>
    )
}