import { NextApiRequest, NextApiResponse } from "next";
const api = async (req: NextApiRequest, res: NextApiResponse) =>{
    switch (req.method) {
        case "GET":
            res.status(200)
            res.json({})
            break;
    
        default:
            res.status(401).json({message: "Method not allowed"})
            break;
    }
}

export default api