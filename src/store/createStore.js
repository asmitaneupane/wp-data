import { createReduxStore, register } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";

export const CUSTOM_STORE = "wp-data/store";

const initialState = {
	products: [],
	isLoading: false,
	error: null,
};

export const customStore = createReduxStore(CUSTOM_STORE, {
	reducer(state = initialState, action) {
		switch (action.type) {
			case "SET_PRODUCTS":
				return {
					...state,
					products: action.products,
				};
			case "SET_LOADING":
				return {
					...state,
					isLoading: action.isLoading,
				};
			case "SET_ERROR":
				return {
					...state,
					error: action.error,
				};
			default:
				return state;
		}
	},
	actions: {
		setProducts: (products) => ({
			type: "SET_PRODUCTS",
			products,
		}),
		setLoading: (isLoading) => ({
			type: "SET_LOADING",
			isLoading,
		}),
		setError: (error) => ({
			type: "SET_ERROR",
			error,
		}),
		fetchData: () => {
			return async (dispatch) => {
				try {
					dispatch(actions.setLoading(true));

					const response = await apiFetch({
						url: LOCALIZED,
					});
					const data = await response.json();

					dispatch(actions.setProducts(data));
				} catch (error) {
					dispatch(actions.setError(error.message));
				} finally {
					dispatch(actions.setLoading(false));
				}
			};
		},
	},
	selectors: {
		getProducts(state) {
			return state.products;
		},
	},
});

register(customStore);