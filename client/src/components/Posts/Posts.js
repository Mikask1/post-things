import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import { Post } from "./Post/Post"

import useStyles from "./styles"

const cardColor = ["#53efff", "#ffff53", "#00c2ee", "#ee7164", "#00ff00", "#ff8c00", "#ffa500", "#6f00ff", "#ffc0cb"]

function randomColor() {
    return cardColor[Math.floor(Math.random() * cardColor.length)]
}

export const Posts = (props) => {
    const classes = useStyles()

    const { currentID, setCurrentID, setOpenModal, openModal } = props

    const posts = useSelector((state) => state.posts)
    
    return (
        !posts.length ? <div className={classes.center}><CircularProgress /></div> :
            <div className={classes.posts}>
                {posts.map((post) => 
                    <Post openModal={openModal} setOpenModal={setOpenModal} key={post._id} post={post} color={randomColor()} setCurrentID={setCurrentID} currentID={currentID}></Post>
                )}
            </div>
    )
}