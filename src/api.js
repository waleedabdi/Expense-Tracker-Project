const API_URL = 'https://open.er-api.com/v6/latest';

export async function fetchExchangeRates(baseCurrency = 'USD') {
	const currency = String(baseCurrency).trim().toUpperCase();

	if (!/^[A-Z]{3}$/.test(currency)) {
		throw new Error('Please choose a valid three-letter currency code.');
	}

	let response;
	try {
		response = await fetch(`${API_URL}/${encodeURIComponent(currency)}`);
	} catch {
		throw new Error('Check your internet connection and try again.');
	}

	if (!response.ok) {
		throw new Error(`The rates service responded with ${response.status}.`);
	}

	let data;
	try {
		data = await response.json();
	} catch {
		throw new Error('The rates service returned unreadable data.');
	}

	if (data.result !== 'success' || !data.rates || typeof data.rates !== 'object') {
		throw new Error(data['error-type'] || 'The rates service could not provide exchange rates.');
	}

	return {
		baseCurrency: data.base_code || currency,
		rates: data.rates,
		updatedAt: data.time_last_update_utc || null,
	};
}
