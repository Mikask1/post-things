import React, { useCallback, useState, useEffect } from "react";
import { Button, Typography, TextField, Dialog, DialogContent } from "@material-ui/core";
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles"
import CloseIcon from "../../images/close.png"
import { createPost, updatePost } from "../../actions/posts";

export const Form = React.forwardRef((props, ref) => {
    const { openModal, setOpenModal, currentID, setCurrentID } = props
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ title: "", message: "", tags: "", file: "" })

    const user = JSON.parse(localStorage.getItem("profile"))?.result?.name

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    // Close Modal
    const handleUploadModal = () => {
        setOpenModal(!openModal)
        setCurrentID(null)
        setPostData({ title: "", message: "", tags: "", file: "" })
    }

    // Update Post
    const updatedPost = useSelector((state) => {
        return currentID ? state.posts.find((post) => post._id === currentID) : null
    })

    useEffect(() => {
        if (updatedPost) {
            setPostData(updatedPost)
        }
    }, [updatedPost])


    // Create Post and Update Post
    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        // Update Post
        if (currentID) {
            setOpenModal(!openModal)
            setPostData({ title: "", message: "", tags: "", file: "" })
            
            setCurrentID(null)
            dispatch(updatePost(currentID, { ...postData, user: user }))
            
            window.location.reload()
        }
        else { // Create Post
            postData.file = String(postData.file.base64)

            dispatch(createPost({...postData, user: user}))

            setOpenModal(!openModal)
            setCurrentID(null)
            setPostData({ title: "", message: "", tags: "", file: "" })
        }
    }, [setOpenModal, openModal, dispatch, postData, currentID, setCurrentID, user])

    return (
        <Dialog open={openModal} onClose={() => setOpenModal(false)} style={{ overflow: "hidden"}}>
            <DialogContent>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <div className={classes.titleBar}>
                            <Typography variant="h6" className={classes.titleText}>{currentID ? "Edit Post" : "Upload New Post"}</Typography>
                            <a onClick={handleUploadModal}><img src={CloseIcon} className={classes.icon} alt="close button"></img></a>
                        </div>
                        <TextField name="title" required label="Title" onChange={handleChange} value={postData.title} className={classes.nameInput} autoComplete="eh" fullWidth></TextField>
                        <TextField name="message"variant="outlined" label="Message" onChange={handleChange} value={postData.message} className={classes.nameInput} multiline minRows={4} maxRows={4} required fullWidth></TextField>
                        <TextField name="tags" variant="outlined" label="Tags (space-separated)" onChange={handleChange} value={postData.tags} className={classes.nameInput} multiline minRows={2} maxRows={2} fullWidth></TextField>
                        <div className={classes.fileInput}>
                            <FileBase type="file" multiple={false} onDone={(base64) => setPostData({ ...postData, file: base64 })}/>
                            <p>(max: 1mb)</p>
                        </div>
                        <Button variant="contained" style={{backgroundColor: "#232323", color: "white"}} type="submit" fullWidth><Typography>Submit</Typography></Button>
                    </form>
            </DialogContent>
        </Dialog>
    )
})