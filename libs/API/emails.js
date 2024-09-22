import { sendEmail } from "@/libs/mailgun";
import connectMongo from "../mongoose";
import config from "@/config";
import Product from "@/models/Product";
import Alert from "@/models/Alert";

export async function sendPriceAlertEmail(toEmail, productId, alertId) {
  try {
    await connectMongo();
    const product = await Product.findById(productId);
    const alert = await Alert.findById(alertId);

    const html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MagSpy</title>
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
            <img src="https://MagSpy.app/icon.png" alt="MagSpy Logo">
        </div>
        <h1 style="text-align: center;">MagSpy Alert ${alert.name}</h1>

        <div class="product_presint">
            <img class="main_image" src="${product.imageUrl}" alt="">
            <h1>${product.name}</h1>
        </div>

        <div class="content ">
          <p style="text-align:center">This email alert comes from ${product.name} product because its price is ${alert.typeof === "1" ? "below" : alert.typeof === "2" ? "equal" : "above"} to ${alert.priceValue} !</p>
        </div>
        <div class="content link_to_product">
          <center><a href="${product.productUrl}" class="button">Buy it now!</a></center>
        </div>

        <div class="footer">
            <p>&copy; 2023 MagSpy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;

    const subject = "Price Alert";
    const from = config.mailgun.fromAlertBot;

    await sendEmail({
      to: toEmail,
      from,
      subject,
      html
    });

  } catch (error) {
    console.error("Error sending email:", error);
  }
}
