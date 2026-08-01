import {connectDB} from "@/lib/mongoose";
import User from "@/models/User";
import {NextResponse} from "next/server";

import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
         await connectDB();
         //const body = await req.json();
         const {name, email, password} = await req.json();
         const hashedPassword = await bcrypt.hash(password, 10);

         //const user = await User.create(body);
         const user = await User.create({name, email, password: hashedPassword});

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