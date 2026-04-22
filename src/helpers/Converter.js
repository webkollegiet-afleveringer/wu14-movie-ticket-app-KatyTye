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

const clockHours = [
	"12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
	"6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
	"12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
	"6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
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

export function convertDateToText(date, short = false) {
	if (short) {
		return months[date.getMonth()].slice(0, 3)
	} else {
		return months[date.getMonth()]
	}
}

export function returnDateAndTime() {
	const start = new Date()
	const dateArray = []

	for (let i = 0; i <= 9; i++) {
		let d = new Date(start)
		d.setDate(start.getDate() + i)

		const day = d.getDate() <= 9 ? `0${d.getDate()}` : d.getDate()

		const newDay = `${day}/${convertDateToText(d, true)}/${d.getFullYear()}`

		dateArray.push(newDay)
	}
	return {
		dates: dateArray,
		times: clockHours
	};
}

export function randomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
