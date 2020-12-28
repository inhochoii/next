export const certificationNumber = () => {
	let result: number = Math.floor(Math.random() * 1000000) + 100000;
	if (result > 1000000) {
		result = result - 100000;
	}
	return String(result);
};
