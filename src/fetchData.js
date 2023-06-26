import apiFetch from "@wordpress/api-fetch";

export default function fetchData() {

	apiFetch({
		url: LOCALIZED,
	})
	.then((response) => {
		console.log(response.products);
		return response.products;
	})
	.catch((error) => {
		console.error("Error fetching data:", error);
		return null;
	});
}
