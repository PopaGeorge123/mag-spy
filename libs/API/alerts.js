"use server";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import Alert from "@/models/Alert";
import User from "@/models/User";
import GetSesion from "@/libs/session";

import { redirect } from 'next/navigation'
import { ObjectId } from 'mongodb';

export async function addNewAlert(formData) {
	await connectMongo();

	const name = formData.get('name');
	const typeofAlert = formData.get('typeOf');
	const priceValue = formData.get('priceValue');
	const productId = formData.get('productId');

	const session = await GetSesion();
	const user = await User.findOne({ _id: session.user.id });
	const thisProduct = await Product.findOne({ _id: formData.get('productId') });

	if (!user.hasAccess && thisProduct.alerts.length >= 1) {
		redirect(`/dashboard/products/${productId}/alerts`);
	}

	const frequency = 'frequency';
	const enabled = true;
	const alertId = new ObjectId();

	//const crtProduct = await Product.findOne({ _id: productId });

	await Product.updateOne(
		{ _id: productId },
		{
			$push: { alerts: alertId.toString() }
		}
	);

	let newAlert = await Alert.create({
		name,
		typeof: typeofAlert,
		frequency,
		priceValue,
		enabled,
		_id: alertId,
	});
	newAlert.save();

	redirect('/dashboard/products/' + productId + '/alerts');
}

export async function EditAlert(formData) {
	await connectMongo();

	const name = formData.get('name');
	const alertId = formData.get('alertId');
	const typeofAlert = formData.get('typeOf');
	const priceValue = formData.get('priceValue');

	const productId = formData.get('productId');

	let editedAlert = await Alert.updateOne(
		{ _id: alertId },
		{
			name,
			typeof: typeofAlert,
			priceValue
		}
	);

	redirect(`/dashboard/products/${productId}/alerts`);
}

export async function DeleteAlert(alertId) {
	try {
		await connectMongo();
		const alert = await Alert.findOne({ _id: alertId });
		const productId = alert.productId;

		await Alert.deleteOne({ _id: alertId });
		await Product.updateOne({ _id: productId }, { $pull: { alerts: alertId } });


		return true;

	} catch (e) {
		console.log(e);
		return false;
	}
}

export async function updateBellState(alert, state) {
	await connectMongo();
	const currentAlert = await Alert.findOne({ _id: alert });
	currentAlert.enabled = state;
	currentAlert.save();
	return true;
}



