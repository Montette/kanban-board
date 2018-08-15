$('document').ready(() => {
	const clockDate = $('<p>').appendTo("#clock");
	const clockTime = $('<p>').appendTo("#clock");
	const getDate = () => {

		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
		let year = date.getFullYear();
		let hour = date.getHours();
		let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

		let todayDate = day + "/" + month + "/" + year;
		let todayTime = hour + ":" + minute + ":" + second;

		clockDate.text(todayDate);
		clockTime.text(todayTime);
		setTimeout( () => {
			getDate()
		}, 1000);
	}
	getDate();
})