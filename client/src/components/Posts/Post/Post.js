import { Card, CardActions, CardContent, CardMedia, Typography, Button, Modal, Fade } from "@material-ui/core";
import { useDispatch } from "react-redux";

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import React, { useCallback, useState } from "react";
import useStyles from "./styles"
import moment from "moment"

import { updateLike, deletePost } from "../../../actions/posts";
import Comments from "./Comments/Comments";

export const Post = (props) => {
    const post = props.post

    const classes = useStyles()
    const dispatch = useDispatch()

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
    const [commentModal, setCommentModal] = useState(false)

    const user = JSON.parse(localStorage.getItem("profile"))
    

    const isCreator = user?.result?.sub ? user?.result?.sub === post?.userId : user?.result?._id === post?.userId

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const handleDeleteModal = useCallback(() => {
        setOpenDeleteAlert(!openDeleteAlert)
    }, [setOpenDeleteAlert, openDeleteAlert])

    return (
        <Card className={classes.card} style={{ borderColor: props.color }}>
            {post.file !== "undefined" && <CardMedia className={classes.media} image={post.file} title={post.title}></CardMedia>}
            <div className={post.file !== "undefined" ? classes.overlay : classes.noImage}>
                <Typography variant="h6">{post.user}</Typography>
                <Typography variant="body2">{moment(post.createdAtProperty).fromNow()}</Typography>
            </div>

            { (user && isCreator) &&
            <div className={classes.overlay2}>
                <Button size="small" onClick={() => { props.setOpenModal(!props.openModal); props.setCurrentID(post._id) }}>
                    <MoreHorizIcon fontSize="small" className={classes.horizIcon} />
                </Button>
            </div>}
            <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" gutterBottom>{post.message}</Typography>
                <Typography className={classes.tags} variant="body2">{post.tags === undefined || post.tags.length === 0 ? "" : post.tags.split(" ").map((tag) => `#${tag} `)}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                {/* LIKE BUTTON */}
                <Button color="primary" size="small" onClick={() => dispatch(updateLike(post._id, post.likes))} disabled={user?.result?.name ? false : true}>
                    <Likes/>
                </Button>
                {/* COMMENT BUTTON */}
                <Button onClick={() => setCommentModal(!commentModal)}>
                    <Typography variant="caption">Open Comments</Typography>
                    <ArrowDropDownIcon></ArrowDropDownIcon>
                </Button>
                {/* DELETE BUTTON */}
                { user && isCreator &&
                <Button color="secondary" size="small" onClick={() => { setOpenDeleteAlert(!openDeleteAlert) }}>
                    <DeleteIcon fontSize="small" />
                    <span style={{ paddingLeft: "0.3rem" }}>Delete</span>
                </Button>}
            </CardActions>

            {/* Delete Modal */}
            <Modal open={openDeleteAlert}>
                <Fade in={openDeleteAlert}>
                    <Card className={classes.center}>
                        <CardContent className={classes.titleBar}>
                            <Typography variant="h6">Are you sure you want to delete this post?</Typography>
                        </CardContent>
                        <CardActions className={classes.buttons}>
                            <Button onClick={() => { dispatch(deletePost(post._id)); handleDeleteModal() }} variant="contained" disableElevation >Yes</Button>
                            <Button onClick={handleDeleteModal} variant="contained" disableElevation color="secondary">No</Button>
                        </CardActions>
                    </Card>
                </Fade>
            </Modal>

            <Comments user={user} post={post} commentModal={commentModal} setCommentModal={setCommentModal}/>
        </Card>
    )
}