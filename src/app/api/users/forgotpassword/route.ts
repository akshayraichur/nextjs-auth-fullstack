import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function GET(request: NextRequest) {
  try {
    // const requestBody = await request.json();
    const token = request.cookies.get("token")?.value!;

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const username = decodedToken?.username;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "no user found with this token", status: 400 });
    }

    console.log(decodedToken);

    let emailResponse = await sendEmail({ email: decodedToken?.email, emailType: "RESET", userId: decodedToken.id });

    return NextResponse.json({ message: "email has been sent" });
  } catch (error: any) {
    return NextResponse.json({ error: "something went wrong", status: 500, errorMsg: error.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return NextResponse.json({ error: "cant update password", status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({ message: "password reset done", success: true, status: 200 });
  } catch (error: any) {}
}
