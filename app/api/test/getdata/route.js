import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";
import User from "@/models/User";

export async function GET(req) {
  await connectMongo();

  const { searchParams } = new URL(req.url);

  const key = searchParams.get('key');
  const user = searchParams.get('user');

  if (key === "29330064" && user === "geo") {
    try {
      const leads = await Lead.find();
      const users = await User.find();
      const leadCount = leads.length;
      const userCount = users.length;

      return NextResponse.json({
        current_leads : leadCount,
        current_users : userCount,
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
  else {
    return NextResponse.json({ error: "Bad Credentials" }, { status: 405 });
  }
}
