import apiFetch from '@wordpress/api-fetch';

export default function fetchData() {
	return apiFetch("./store.json")
		.then((response) => {
			response.json();
			console.log(response);
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
			return null;
		});
}
