import React from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { useRouter } from 'next/router';

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 60px;
	padding: 0 12px;
	border-bottom: 1px solid ${palette.gray};
	h1 {
		font-size: 21px;
		cursor: pointer;
	}
`;

const Header: React.FC = () => {
	const router = useRouter();

	return (
		<Container>
			<h1 onClick={() => router.push('/')}>Todo List</h1>
		</Container>
	);
};

export default Header;
