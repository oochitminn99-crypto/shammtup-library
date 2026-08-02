import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {

    //input alert
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if (!name || !email || !password) {
        alert("All Fields are Required")
        return NextResponse.json({
            message: "All Fields are Required"
        }, { status: 400 })
    } 
    if (!isValidEmail) {
        return NextResponse.json({
            message: "Invalid Email Format"
        }, { status: 400 })
    } 
    if (password.length < 6) {
        return NextResponse.json({
            message: "Password must be at least 6 character long"
        }, { status: 400 })
    }


    try {
        await connectDB();
        //const body = await req.json();
        const { name, email, password } = await req.json();

        const existingUser = await User.findOne({email});
        if(existingUser) {
            alert("User Already Exist");
            return NextResponse.json({
                message: "User Already Exist"
            }, {status: 400})
        }
        //const user = await User.create(body);
        const hashedPassword = await bcrypt.hash(password, 10);
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