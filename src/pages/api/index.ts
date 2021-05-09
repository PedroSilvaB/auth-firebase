import { NextApiRequest, NextApiResponse } from "next"

const api = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            res.setHeader("Set-Cookie", "_Secure-TK='api-middleware!';path=/;domain=localhost;Max-Age=2600000;HttpOnly=true;SameSite=None;secure=true;priority=High;")
            res.status(200)
            console.log(JSON.stringify(req.cookies).match(/_Secure-TK/g))
            res.json({})
            break;

        default:
            res.status(401).json({ message: "Method not allowed" })
            break;
    }
}

export default api