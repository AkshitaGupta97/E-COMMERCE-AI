import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        // check header exist
        if (!authHeader) {
            return res.json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // check bearer token format
        const tokenParts = authHeader.split(" ");

        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.json({
                success: false,
                message: "Invalid token format"
            });
        }

        const token = tokenParts[1];

        // verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode?.id) {
            return res.json({
                success: false,
                message: "Invalid token payload"
            });
        }

        // attach userId
        req.userId = decode.id;

        next();

    } catch (error) {
        console.log("Auth Middleware Error:", error.message);

        return res.json({
            success: false,
            message: "Unauthorized"
        });
    }
}

