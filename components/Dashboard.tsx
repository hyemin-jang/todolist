import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import palette from '../styles/palette';

const Container = styled.div`
	background-color: ${palette.pink};
	float: left;
	width: 300px;
	height: calc(100vh - 60px);
	left: 0;
	padding: 20px;
	display: flex;
	justify-content: center;

	.todo-count-box {
		background-color: white;
		width: 80%;
		height: 200px;
		border-radius: 10px;
		border: 1px solid ${palette.gray};
		text-align: center;
		padding: 0;
		overflow: hidden;

		.total-todo-top {
			height: 120px;
			padding: 30px 10px;

			.total-todo-count {
				font-size: 48px;
				font-weight: 800;
			}
		}

		.total-todo-bottom {
			display: flex;
			justify-content: center;
			div {
				width: 50%;
				height: 80px;
				border: 1px solid ${palette.gray};
				margin: 0;
				padding: 5px;
			}
		}
	}
`;

const Dashboard: React.FC = () => {
	const todos = useSelector((state: RootState) => state.todo.todos);

	return (
		<Container>
			<div className='todo-count-box'>
				<div className='total-todo-top'>
					<p>내 Todo List 개수</p>
					<p className='total-todo-count'>{todos.length}</p>
				</div>
				<div className='total-todo-bottom'>
					<div className='remaining-todo'>
						<p>남은 할일</p>
						{todos.length}
					</div>
					<div className='completed-todo'>
						<p>완료한 할일</p>
						{todos.length}
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Dashboard;
