import { makeStyles } from "@material-ui/core";

export default makeStyles({
    media: {
        paddingTop: '50%',
        backgroundColor: '#232323',
        backgroundSize: 'contain',
    },
    card: {
        width: "50vw",
        marginBottom: "10vh",
        position: "relative",
        borderLeft: "0.3rem solid",
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        textShadow: "1px 1px 0px black"
    },
    overlay2: {
        position: 'absolute',
        top: '15px',
        right: '5px',
    },
    tags: { 
        textAlign: "right",
        marginTop: "1rem", 
        marginBottom: "-1rem"
    },
    noImage: {
        padding: "16px",
        backgroundColor: "#232323",
        color: 'white',
    },
    horizIcon: {
        color: "white", 
        margin: 0,
        padding: 0,
    },
    center: {
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignItems: "center"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-evenly",
        margin: "0.5rem 0"
    },
    icon: {
        height: "15px",
        cursor: "pointer",
        display: "inline",
        paddingLeft: "3rem",
    },
    titleBar: {
        backgroundColor: "#232323",
        color: "white",
    }
});

