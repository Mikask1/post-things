import { Dialog, Button, TextField, Typography, DialogContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import ArrowRightIcon from "@material-ui/icons/ArrowRight"

import Comment from './Comment/Comment'
import useStyles from "./styles"
import { addComment } from '../../../../actions/posts'

const Comments = ({user, post, commentModal, setCommentModal}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
    const [alert, setAlert] = useState("")
    const [doneComment, setDoneComment] = useState(true)
    const userId = user?.result?.sub ? user?.result?.sub : user?.result?._id

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!user){
            setTimeout(() => {
                setAlert("")
            }, 2500)
            setAlert("Please sign in to comment.")
            return
        }

        if (!doneComment){
            setTimeout(() => {
                setAlert("")
            }, 2500)
            setAlert("Please wait until comment is updated")
            return
        }

        setDoneComment(!doneComment)
        dispatch(addComment(comment, userId, user?.result?.name, post._id))
        setComment("")
    }

    useEffect(() =>{
        setDoneComment(true)
    }, [post.comments])

    return (
        <Dialog open={commentModal} onClose={() => setCommentModal(false)} fullWidth>
            <DialogContent>
                    <Typography variant='h6' className={classes.dialog}>{post.comments.length} Comments</Typography>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextField required label="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} fullWidth></TextField>
                        <Button className={classes.btnReset} type="submit">
                            <ArrowRightIcon fontSize='small' />
                        </Button>
                    </form>
                    <Typography variant="caption" style={{color: "red"}}>{alert}</Typography>
                    <div className={classes.comments}>
                        {post.comments.map((comment) =>
                            <Comment key={comment._id} post={post} comment={comment} doneComment={doneComment} setDoneComment={setDoneComment} userId={userId}></Comment>
                        )}
                    </div>
            </DialogContent>
        </Dialog>
    )
}

export default Comments