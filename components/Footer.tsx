import React from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { useRouter } from 'next/router';

const Container = styled.div`
	width: 100%;
	height: 53px;
	position: fixed;
	bottom: 0;
	border-top: 1px solid ${palette.gray};
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;

	.footer-button {
		font-size: 32px;
		width: 32px;
		height: 32px;
		border-radius: 5px;
		border: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		padding: 0;
		line-height: 0;
		outline: none;
	}
`;

const Footer: React.FC = () => {
	const router = useRouter();
	const isMain = router.pathname === '/'; // 메인페이지에서와 아닐때 푸터 모양 다르게 하기 위한 변수

	return (
		<Container>
			<button
				type='button'
				className='footer-button'
				onClick={() => router.push(isMain ? '/todo/add' : '/')}>
				{isMain ? '+' : '-'}
			</button>
		</Container>
	);
};

export default Footer;
