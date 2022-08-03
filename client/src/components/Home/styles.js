import { makeStyles, withMobileDialog } from "@material-ui/core";

const logoHeight = 30
const margin = 10

export default makeStyles(() => ({
    appBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        height: logoHeight,
        margin: margin,
        marginLeft: "30px",
    },
    icon: {
        height: "15px",
        cursor: "pointer"
    },
    posts: {
        marginTop: margin * 2 + logoHeight + 20,
    },
    authButton: { 
        color: "white", 
        borderColor: "white",
        marginRight: "1rem"
    },
    userProfile:{
        display: "flex",
        justifyContent: "flex-start",
        padding: "0 1rem"
    },
    rightNav:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    leftNav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "50vw",
    }
}))