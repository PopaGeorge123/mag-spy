import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";
import { sendEmail } from "@/libs/mailgun";
import config from "@/config";

import parse from 'node-html-parser';
import fs from 'fs';

export async function POST(req) {
  //const filePath = path.join('./welcomeTemplate.html');
  //const htmlTemplate = fs.readFileSync(filePath, 'utf8');

  //const parsedHTML = parse(fs.readFileSync(`./public/templates/mail/welcomeTemplate.html`, 'utf-8'));
  var htmlModule = require('raw-loader!./welcomeTemplate.html');
  var html = htmlModule.default;
  await connectMongo();

  const body = await req.json();

  await sendEmail({
    to: body.email,
    subject: `George from ${config?.appName}`,
    from: config?.mailgun.fromNoReply,
    html: html,
  });

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const lead = await Lead.findOne({ email: body.email });

    if (!lead) {
      await Lead.create({ email: body.email });
      //here will come  the email send code 
    
    }

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
