import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
    posts: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        verticalAlign: "center",
    },
    center: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
}))