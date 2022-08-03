import { makeStyles } from "@material-ui/core";

const marginTitleBar = "1.5rem"
const radius = 7

export default makeStyles(() => ({
    form: {
        borderRadius: radius,
        backgroundColor: "white",
        padding: "8px"
    },
    titleText: { 
        display: "inline",
        color: "white",
        marginRight: "-"+marginTitleBar,
    },
    titleBar:{
        textAlign: "center",
        margin: "-2rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid black",
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        marginBottom: "1rem",
        backgroundColor: "#232323",
    },
    nameInput: {
        marginBottom: 20,
    },
    fileInput: {
        display: "flex",
        alignItems: "baseline",
        marginBottom: 20,
    },
    icon: {
        height: "15px",
        cursor: "pointer",
        display: "inline",
        float: "right",
        margin: "0.5rem",
        marginRight: marginTitleBar,
    },
}))