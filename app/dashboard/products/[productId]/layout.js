import ProductMenu from "@/components/own/dashboard/ProductMenu";

export default async function LayoutPrivate({ children }) {

	return (
		<div className="flex flex-col items-center justify-center">
			<ProductMenu />
			{children}
		</div>
	);
}
