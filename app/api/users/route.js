import {connectDB} from "@/lib/mongoose";

import {NextResponse} from "next/server";

import User from "@/models/User";

export async function POST(req) {
    try {
         await connectDB();
         //const body = await req.json();
         const {name, email, password} = await req.json();
         const hashedPassword = await bcrypt.hash(password, 10)

         //const user = await User.create(body);
         const user = await User.create({ name, email, password: hashedPassword });

         return NextResponse.json({
            message: "User Created Successfully",
            data: user
         })
    } catch (err) {
        return NextResponse.json({
            message: "Error Creating User",
            error: err.message
        })
    }
}
/*
const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)

        await connectDB();
        await User.create({ name, email, password: hashedPassword });
*/

export async function GET() {
    try {
        await connectDB();

        const users = await User.find();
        return NextResponse.json({
            message: "Users Fetch Successfully",
            data: users
        })
    } catch (err) {
        return NextResponse.json({
            message: "Error Creating User",
            error: err.message,
        });
    }
}