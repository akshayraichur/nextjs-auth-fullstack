import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);

    const user = await User.findOne({ _id: id }).select("-password");

    return NextResponse.json({ message: "user found", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
