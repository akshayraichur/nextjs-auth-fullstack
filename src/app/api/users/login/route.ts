import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    console.log(requestBody);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: "user does not exist", status: 400 });
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, existingUser.password);

    if (!validPassword) {
      return NextResponse.json({ error: "password is not the same", status: 400 });
    }

    //create token data
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login done",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
