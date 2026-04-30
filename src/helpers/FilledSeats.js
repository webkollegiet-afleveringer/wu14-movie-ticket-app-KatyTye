export async function getFilledSeats(filledSeats = 10) {
	let cancelled = false;

	async function addOccupiedNumbers() {
		const temp = []
		while (!cancelled && temp.length < filledSeats) {
			const newNumber = randomInt(1, 44)
			if (!temp.includes(newNumber)) temp.push(newNumber)
			await new Promise(r => setTimeout(r, 0))
		}
		return temp
	}

	addOccupiedNumbers().then(final => {
		return final
	}).catch(console.error)

	return () => { cancelled = true }
}