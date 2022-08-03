import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
    comment: {
        display: "block",
        marginBottom: 10,
        padding: 10,
    },
    message: {
        paddingLeft: "0.2rem"
    },
    nameBar: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "baseline",
    },
    time: {
        marginLeft: "0.5rem",
        color: "gray"
    },
    delete: {
        display: "flex",
        justifyContent: "flex-end",
        cursor: "pointer",
    },
}))