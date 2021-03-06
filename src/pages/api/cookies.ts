// pages/api/cookies.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  //__Secure HTTPS
  //res.setHeader("Set-Cookie", "_Secure-TK='api-middleware!';path=/;domain=localhost;Max-Age=2600000;HttpOnly=true;SameSite=None;secure=true;priority=High;")
  const date: Date = new Date()
  console.log(req.cookies)
  date.setMonth(date.getMonth() + 1)
  setCookie(res, "auth", "verdade", {
    secure: true,
    domain: "localhost",
    sameSite: "strict",
    httpOnly: true,
    path: "/",
    expires: date
  })
  req.cookies
  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  /* res.end(res.getHeader('Set-Cookie')) */
  res.status(200).json([])
}

export default handler