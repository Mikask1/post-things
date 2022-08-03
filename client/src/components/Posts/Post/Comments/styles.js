import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
    form: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 20,
    },
    btnReset: {
        background: "none",
        color: "inherit",
        border: "none",
        padding: 0,
        font: "inherit",
        cursor: "pointer",
        outline: "inherit",
        margin: 0,
    },
    comments: {
        paddingLeft: 3,
    }
}))