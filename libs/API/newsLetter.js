"use server";

import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";
import User from "@/models/User";
import { redirect } from 'next/navigation'

import { sendEmail } from "@/libs/mailgun";
import config from "@/config";

function symbolToHtml(str) {
	// Replace <link to text/"url"> with <a href="url">text</a>
	const linkRegex = /<(.*?)\/"(.*?)">/g;
	str = str.replace(linkRegex, (match, text, url) => {
		return `<a class="link_to_datapick" href="${url}">${text}</a>`;
	});

	// Replace |text| with <h1>text</h1>
	const h1Regex = /\|(.*?)\|/g;
	str = str.replace(h1Regex, (match, text) => {
		return `<h3 class="info_text">${text}</h3>`;
	});

	return str;
}

function html(message, id) {
	const messageToSend = symbolToHtml(message);

	const content = `
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
        .link_to_datapick{
            color: #004151;
            text-decoration: none;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://datapick.app/icon.png" alt="Datapick Logo">
        </div>
        
        <div class="content">
            ${messageToSend}
						<h4 style="text-align:left">
							Best regards,<br>
							George <br>
							The Datapick Team <br>
						</h4>
        </div>


        <div class="footer">
						<a href=https://datapick.app/api/users/unsubscribe?user=${id} >Unsubscribe</a>
            <p>&copy; 2023 Datapick. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
	return content;
}

export async function unsubscribe(user) {
	try {
		await connectMongo();

		let userFromDb;
		let type;
		userFromDb = await Lead.findOne({ _id: user });
		type = "lead";

		if (!userFromDb) {
			userFromDb = await User.findOne({ _id: user });
			type = "user";
		}

		if (!userFromDb) {
			return {
				status: "error",
				message: "User not found"
			};
		}

		const userId = userFromDb._id;

		if (type === "lead") {
			await Lead.deleteOne({ _id: userId});
		} else {
			await User.deleteOne({ _id: userId});
		}

		return {
			status: "ok",
			message: "User unsubscribed successfully"
		};
	} catch (e) {
		console.error(e);
		// Redirect to an error page in case of an error
		return {
			status: "error",
			error: "Failed to unsubscribe user. Please try again."
		};
	}
}

export async function executeActionForm(formData) {
	const action = formData.get("action");
	let message = formData.get("message");
	await connectMongo();

	if (action === "send") {

		const users = await User.find({});
		const leads = await Lead.find({});

		// Map users and leads to objects with email and id
		const userObjects = users.map((user) => ({ email: user.email, id: user._id.toString() }));
		const leadObjects = leads.map((lead) => ({ email: lead.email, id: lead._id.toString() }));

		// Concatenate the arrays
		const all = userObjects.concat(leadObjects);
		// const all = [{
		// 	email: "popageo02@gmail.com",
		// 	id: "66e019c9946eef82ad26b7b6"
		// }]
		//console.log(all)

		for (let i = 0; i < all.length; i++) {
			await sendEmail({
				to: all[i].email,
				subject: "Datapick => MagSpy – Exciting Changes Ahead!",
				from: config.mailgun.fromAdmin,
				html: html(message, all[i].id),
			});
		}


		// for (let i = 0; i < sendTo.length; i++) {
		// 	await sendEmail(
		// 		{
		// 			to: sendTo[i],
		// 			subject: "Datapick App is Now Ready for Use!",
		// 			from: config.mailgun.fromAdmin,
		// 			html: html(message),
		// 		}
		// 	);
		// }

		// await sendEmail(message);
	} else if (action === "test") {
		const sendTo = ["popageo02@gmail.com"];


		for (let i = 0; i < sendTo.length; i++) {
			await sendEmail(
				{
					to: sendTo[i],
					subject: "Datapick => MagSpy – Exciting Changes Ahead!",
					from: config.mailgun.fromAdmin,
					html: html(message),
				}
			);
		}
	}
};