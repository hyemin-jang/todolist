import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import TrashCanIcon from '../public/statics/svg/trash_can.svg';
import CheckIcon from '../public/statics/svg/check.svg';
import { checkTodoAPI, deleteTodoAPI } from '../lib/api/todos';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Container = styled.div`
	float: right;
	width: calc(100% - 300px);
	height: calc(100vh - 60px);
	background-color: #f7f7f7;

	.todo-list-header {
		display: flex;
		justify-content: left;
		background-color: white;
		padding: 10px;
		margin: 20px;
		border-radius: 10px;

		.todo-category {
			width: 70px;
			background-color: ${palette.pink};
			border: none;
			border-radius: 10px;
			margin: 10px;
			padding: 5px;
			text-align: center;

			.todo-category-emoji {
				font-size: 32px;
				display: inline-block;
				cursor: pointer;
			}
		}
	}

	.todo-list {
		padding: 0px 20px;
		height: calc(100vh - 350px);
		overflow: auto;

		.todo-item {
			background-color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 52px;
			border-bottom: 1px solid ${palette.gray};
			padding: 20px;

			.todo-left-side {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;

				.todo-button {
					width: 20px;
					height: 20px;
					border-radius: 3px;
					border: 1px solid ${palette.gray};
					background-color: transparent;
					outline: none;
					margin-right: 10px;
				}

				.checked-todo-text {
					color: ${palette.gray};
					text-decoration: line-through;
				}

				.todo-text {
					margin-left: 12px;
					font-size: 16px;
				}
			}

			.todo-right-side {
				.delete-button {
					background-color: ${palette.gray}
					width: 20px;
					height: 20px;
					border-radius: 50%;
					border: none;
				}
			}
		}
	}

	.todo-list-bottom {
		text-align: center;

		.add-button {
			width: 60px;
			height: 60px;
			font-size: 48px;
			background-color: transparent;
			border: 2px solid ${palette.gray};
			border-radius: 10px;
			position: fixed;
			bottom: 30px;
			cursor: pointer;
		}
	}
`;

interface IProps {
	todos: TodoType[];
}

// 객체의 문자열 인덱스 사용을 위한 타입
type ObjectIndexType = {
	[key: string]: number | undefined;
};

const TodoList: React.FC<IProps> = () => {
	const todos = useSelector((state: RootState) => state.todo.todos);
	const [localTodos, setLocalTodos] = useState(todos);
	// const [categories, setCategories] = useState([
	// 	...localTodos
	// 		.filter((todo, idx, arr) =>
	// 			arr.findIndex(
	// 				(item) =>
	// 					item.category.name === todo.category.name &&
	// 					item.category.emoji === todo.category.emoji
	// 			)
	// 		)
	// 		.map((todo) => todo.category),
	// ]);
	const [categories, setCategories] = useState(
		[...new Set(todos.map((v) => JSON.stringify(v.category)))].map((v) =>
			JSON.parse(v)
		)
	);
	const router = useRouter();

	/* 카테고리별 보기 */
	const changeCategory = (e) => {
		if (e.target.id === 'all') {
			setLocalTodos([...todos]);
		} else {
			setLocalTodos([...todos.filter((v) => v.category.name === e.target.id)]);
		}
	};

	/* 투두 체크처리 */
	const checkTodo = async (id: number) => {
		try {
			await checkTodoAPI(id);
			// 1.
			router.push('/'); // 변경사항 새로 받아오기 (reload 하기보다 클라이언트측 내비게이션 사용하여 전체를 다시 불러오지 않도록)
			// 2. useState 통해서 뷰 변화시키기
			// const newTodos = localTodos.map((todo) => {
			// 	if (todo.id === id) {
			// 		return { ...todo, checked: !todo.checked };
			// 	}
			// 	return todo;
			// });
			// setLocalTodos(newTodos);
		} catch (e) {
			console.log(e);
		}
	};

	/* 투두 삭제 */
	const deleteTodo = async (id: number) => {
		try {
			await deleteTodoAPI(id);
			// setLocalTodos(localTodos.filter((todo) => todo.id !== id));
			setCategories(
				[...new Set(localTodos.map((v) => JSON.stringify(v.category)))].map(
					(v) => JSON.parse(v)
				)
			);
			router.push('/');
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Container>
			<div className='todo-list-header'>
				<button className='todo-category'>
					<span
						id='all'
						className='todo-category-emoji'
						onClick={changeCategory}>
						😀
					</span>
					<br />
					<span className='todo-category-name'>ALL</span>
				</button>
				{categories.map((v, index) => (
					<button className='todo-category' key={index}>
						<span
							id={v.name}
							className='todo-category-emoji'
							onClick={changeCategory}>
							{v.emoji}
						</span>
						<br />
						<span className='todo-category-name'>{v.name}</span>
					</button>
				))}
			</div>
			<ul className='todo-list'>
				{localTodos.map((todo) => (
					<li className='todo-item' key={todo.id}>
						<div className='todo-left-side'>
							<button
								type='button'
								className='todo-button'
								onClick={() => {
									checkTodo(todo.id);
								}}
							/>

							<p
								className={`todo-text ${
									todo.checked ? 'checked-todo-text' : ''
								}`}>
								{todo.text}
							</p>
						</div>
						<div className='todo-right-side'>
							<button
								type='button'
								className='delete-button'
								onClick={() => {
									deleteTodo(todo.id);
								}}>
								X
							</button>
						</div>
					</li>
				))}
			</ul>
			<div className='todo-list-bottom'>
				<button
					className='add-button'
					onClick={() => {
						router.push('/todo/add');
					}}>
					+
				</button>
			</div>
		</Container>
	);
};

export default TodoList;
