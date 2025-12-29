
import connectDB from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    
    try {
        const {name,email,password} = await request.json();
        await connectDB();
        let existUser = await User.findOne({email}); // Check if user already exists 
        if (existUser) { 
            return NextResponse.json(
                {message:"User already exists!"},
                {status: 400}
            )
        }

        if(password.length < 6){
            return NextResponse.json(
                {message:"Password must be at least 6 characters long."}, // Validation for password length
                {status: 400}
            )
        }

        // Hash password before saving (you can use bcrypt or any other library)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name, // Here key and value are same so we can write just once,
            email,
            password:  hashedPassword,
        })

        return NextResponse.json(
                user,
                {status: 201}
            )


    } catch (error) {
          return NextResponse.json(
                {message:`Failed to register user: ${error}`},
                {status: 500}
            )
    }

}