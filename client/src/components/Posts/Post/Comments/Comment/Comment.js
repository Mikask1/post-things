import { Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from "./styles"
import moment from "moment"
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../../../../actions/posts'

const Comment = ({ userId, post, comment, doneComment, setDoneComment }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [alert, setAlert] = useState("")

    const isCreator = userId === comment.userId
    const handleDeleteComment = () => {
        if (!doneComment) {
            setTimeout(() => {
                setAlert("")
            }, 2500)
            setAlert("Please wait until comment is updated")
            return
        }

        setDoneComment(!doneComment)
        dispatch(deleteComment(post._id, comment._id))
    }

    return (
        <Paper className={classes.comment}>
            <div className={classes.nameBar}>
                <Typography variant='body1'>{comment.name}</Typography>
                <Typography variant="caption" className={classes.time}>{moment(comment.createdAtProperty).fromNow()}</Typography>
            </div>
            <Typography variant='subtitle2' className={classes.message}>{comment.message}</Typography>
            {isCreator && <a onClick={handleDeleteComment}>
                <Typography variant="caption" className={classes.delete}>Delete</Typography>
            </a>}
            <Typography variant="caption">{alert}</Typography>
        </Paper>
    )
}

export default Comment