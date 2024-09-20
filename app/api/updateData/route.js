import { NextResponse } from "next/server";
import { runDataUpdate } from "@/libs/API/actions";

export async function GET(req) {

  const { searchParams } = new URL(req.url);

  const key = searchParams.get('key');
  const user = searchParams.get('user');

  if (key === "29330064" && user === "geo") {
    try {
      const result = await runDataUpdate();
      if (result) {
        return NextResponse.json({data : result}, { status: 200 });
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
  else {
    return NextResponse.json({ error: "Bad Credentials" }, { status: 405 });
  }
}
