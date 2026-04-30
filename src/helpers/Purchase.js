export async function handlePurchase(data, elements) {

	if (!import.meta.env.VITE_PRODUCTION) {
		const response = fetch("http://localhost:3000/mymovies/tickets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"key-path": `${import.meta.env.VITE_PRM_API_PATH}`,
				details: JSON.stringify(data),
				payment: JSON.stringify({
					cardNumber: elements.cnumber.value,
					cardHolder: elements.card.value,
					expiryDate: elements.date.value,
					cvv: elements.cvv.value,
					email: elements.email.value
				}),
				Authorization: `Bearer ${import.meta.env.VITE_PRM_API_KEY}`
			}
		})

		const result = await response

		if (result.status != 201) {
			return false
		} else {
			return true
		}
	} else {
		const response = fetch(`${import.meta.env.VITE_PRM_API_URL || 'http://localhost:3000/mymovies/tickets'}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"key-path": `${import.meta.env.VITE_PRM_API_PATH}`,
				details: JSON.stringify(data),
				payment: JSON.stringify({
					cardNumber: elements.cnumber.value,
					cardHolder: elements.card.value,
					expiryDate: elements.date.value,
					cvv: elements.cvv.value,
					email: elements.email.value
				}),
				Authorization: `Bearer ${import.meta.env.VITE_PRM_API_KEY}`
			}
		})

		const result = await response

		if (result.status != 201) {
			return false
		} else {
			return true
		}
	}
}