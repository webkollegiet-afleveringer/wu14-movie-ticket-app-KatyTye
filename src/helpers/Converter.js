const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
]

export function convertMinutesToText(minutes) {
	const hours = Math.floor(minutes / 60)
	const remainingMinutes = minutes % 60

	if (hours > 0) {
		return `${hours}h ${remainingMinutes}m`
	} else {
		return `${remainingMinutes}m`
	}
}

export function convertDateToText(date) {
	return months[date.getMonth()]
}