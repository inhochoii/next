import React from 'react';

interface Props {
	top: React.ReactChild;
}

const WalletTemplate: React.FC<Props> = ({ top, children }) => {
	return (
		<>
			{top}
			{children}
		</>
	);
};
export default WalletTemplate;
