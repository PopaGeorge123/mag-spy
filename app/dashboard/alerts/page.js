import GetSesion from "@/libs/session";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Product from "@/models/Product";

import AlertComponent from "@/components/own/alerts/AlertComponent";


export default async function AlertsPage() {
	await connectMongo();

	const session = await GetSesion();
	const user = await User.findOne({ _id: session.user.id });
	const inbox_alerts = user.inboxAlerts.reverse();


	//console.log("Alerts : ",inbox_alerts);

	return (
		<>
			<h1 className="text-2xl">Istoricul alertelor tale</h1>
			<div className="mt-5">
				<AlertComponent alertData={inbox_alerts} />
			</div>
		</>
	);
}
