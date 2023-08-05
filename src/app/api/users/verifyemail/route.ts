import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
