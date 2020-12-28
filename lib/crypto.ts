import crypto from 'crypto';

const key = 'sksmssmdglgkftndlteksksmscjswoek';
const iv = Buffer.from([
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
	0x00,
]);

export const aes256Encrypt = (text: string) => {
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	let result = cipher.update(text, 'utf8', 'base64');
	result += cipher.final('base64');
	return result;
};

export const aes256Decrypt = (cryptogram: string) => {
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	let result = decipher.update(cryptogram, 'base64', 'utf8');
	result += decipher.final('utf8');
	return result;
};
