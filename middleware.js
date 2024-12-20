// import { NextResponse } from "next/server";
// import { jwtVerify } from 'jose';

// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function middleware(req) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     // Redirect to signin if no token is found
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }

//   try {
//     // Verify the token using 'jose'
//     await jwtVerify(token, JWT_SECRET);
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Invalid token:", error);
//     // Redirect to signin if the token is invalid
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }
// }

// // Apply middleware to protect specific routes
// export const config = {
//   matcher: ["/dashboard", "/analyze", "/profile"], // Add routes to protect
// };
