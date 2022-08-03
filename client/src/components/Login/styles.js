import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    center: {
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
    },
    formContent: {
        marginBottom: "1rem",
        display: "block",
        margin: "0 auto"
    },
    formButton: {
        marginBottom: "1rem",
    },
    formInput: {
        width: "25vw",
        display: "flex",
        flexDirection: "column",
        padding: "0 5vw",
    },
    button: {
        backgroundColor: "#232323",
        color: "white",
        '&:hover': {
            backgroundColor: "#404040",
        },
    },
    bottomLine: {
        borderBottom: "1px solid black",
        marginBottom: "1rem"
    }
}))