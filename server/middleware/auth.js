import jwt from "jsonwebtoken"

const tokenValidation = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isOwnAuth = token.length < 500

        let decodedData;

        if (token && isOwnAuth){
            decodedData = jwt.verify(token, process.env.privateKey)

            req.userId = decodedData?.id
        }
        else{
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.log(error);
    }
}

export default tokenValidation