/* eslint-disable prefer-const */
export const calculDate = (date: any) => {
	let days: any;
	let hours: any;
	let minutes: any;
	let seconds: any;
	seconds = Math.floor(date / 1000);
	minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	days = Math.floor(hours / 24);
	hours = hours % 24;

	seconds = seconds < 10 ? '0' + seconds : seconds;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	hours = hours < 10 ? '0' + hours : hours;

	return days + '일' + hours + ':' + minutes + ':' + seconds;
};
