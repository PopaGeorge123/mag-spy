import { NextResponse } from "next/server";
import { sendEmail } from "@/libs/mailgun";
import config from "@/config";

export async function POST(req) {
  const body = await req.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ message: "Please fill out all fields." }, { status: 400 });
  }

  const { name, email, message } = body;

  const html = `
    <h1>New message from ${name}</h1>
    <p>${message}</p>
    <p>Email: ${email}</p>
  `;

  //inform the owner (me) that a new message has been sent
  await sendEmail({
    to: "popageo02@gmail.com",
    subject: `New message from ${name}`,
    from: config.mailgun.supportEmail,
    html,
  });

  //inform the support requester that the message has been sent
  await sendEmail({
    to: email,
    subject: "Datapick | Your request has been sent. We will get back to you as soon as possible.",
    from: config.mailgun.supportEmail,
    html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Datapick</title>
    <style>
        
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #004151;
            border-radius: 10px 10px 0 0;
        }
        .header img {
            max-width: 80px;
        }
        .content {
            text-align: center;
            padding: 20px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        .content h1 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content p {
            color: #666666;
            line-height: 1.8;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #999999;
            font-size: 14px;
            border-top: 1px solid #eeeeee;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }
        .button:hover {
            background-color: #45a049;
        }
        .main_image {
            max-width: 100px;
            margin-right: 20px;
        }
        .product_presint {
            text-align: center;
            padding: 20px 0;
            border-radius: 10px 10px 0 0;
        }
        .link_to_product{
            text-align: center;
            padding: 20px 0;
            border-radius: 10px 10px 0 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://datapick.app/icon.png" alt="Datapick Logo">
        </div>
        <h1 style="text-align: center;">Support</h1>

        <div>
            <h3>Your request has been sent.</h3>
            <p>We will get back to you as soon as possible.</p>
        </div>

        <div class="footer">
            <p>&copy; 2023 Datapick. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `,
  });

  return NextResponse.json({ message: "Message sent successfully. We will send you a solution as soon as possible." }, { status: 200 });
}