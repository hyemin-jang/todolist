import styled from 'styled-components';
import palette from '../styles/palette';
import { useState } from 'react';
import { TodoType } from '../types/todo';
import { addTodoAPI } from '../lib/api/todos';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Container = styled.div`
	float: right;
	width: calc(100% - 300px);
	height: 100vh;
	background-color: #f7f7f7;

	.add-todo-header {
		display: flex;
		justify-content: left;
		align-items: center;
		background-color: white;
		padding: 10px;
		margin: 20px;
		border-radius: 10px;
		overflow-x: auto;

		.todo-category-title {
			display: inline-block;
			width: 70px;
			text-align: center;
			margin: 10px;
		}

		.todo-category {
			width: 70px;
			height: 70px;
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
		.selected {
			border: 3px solid black;
		}

		.new-category {
			width: 150px;
			text-align: center;
			margin: 10px;

			.new-category-input {
				width: 100%;
				margin: 2px;
			}

			button {
				width: 100%;
				background-color: black;
				color: white;
				border: none;
				margin: 2px;
			}
		}
	}

	.add-todo-body {
		padding: 0px 20px;

		textarea {
			width: 100%;
			border-radius: 5px;
			height: 300px;
			border-color: ${palette.gray};
			resize: none;
			outline: none;
			padding: 12px;
			font-size: 16px;
		}
	}

	.add-todo-bottom {
		text-align: center;

		.add-button {
			width: 100px;
			height: 40px;
			font-size: 18px;
			background-color: ${palette.pink};
			border: none;
			border-radius: 10px;
			margin-top: 20px;
			cursor: pointer;
		}
	}
`;

const AddTodo: React.FC = () => {
	const todos = useSelector((state: RootState) => state.todo.todos);
	const [categories, setCategories] = useState(
		[...new Set(todos.map((v) => JSON.stringify(v.category)))].map((v) =>
			JSON.parse(v)
		)
	);
	const [newCategory, setNewCategory] = useState<TodoType['category']>({
		name: '',
		emoji: '',
	});
	const [showNewCategory, setShowNewCategory] = useState(false);

	const [selectedCategory, setSelectedCategory] = useState<
		TodoType['category']
	>({ name: '', emoji: '' });
	const [text, setText] = useState('');
	const router = useRouter();

	/* 카테고리 선택 */
	const selectCategory = (e) => {
		setSelectedCategory({ name: e.target.id, emoji: e.target.innerText });
	};

	/* 새로운 카테고리 등록 */
	const handleSubmit = (e) => {
		setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
	};
	const addNewCategory = () => {
		console.log(newCategory);
		setSelectedCategory(newCategory);
		setCategories([...categories, newCategory]);
		setShowNewCategory(false);
	};

	/* 투두 추가하기 */
	const addTodo = async () => {
		try {
			if (!selectedCategory) {
				alert('카테고리를 선택해주세요!');
				if (!text) {
					alert('내용을 입력해주세요!');
					return;
				}
				return;
			}
			await addTodoAPI({ text, category: selectedCategory });
			router.push('/');
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Container>
			<div className='add-todo-header'>
				<span className='todo-category-title'>카테고리 선택</span>
				{categories.map((v, index) => (
					<button
						className={`todo-category ${
							v.name === selectedCategory.name ? 'selected' : ''
						}`}
						key={index}>
						<span
							id={v.name}
							className='todo-category-emoji'
							onClick={selectCategory}>
							{v.emoji}
						</span>
						<br />
						<span className='todo-category-name'>{v.name}</span>
					</button>
				))}
				{!showNewCategory && (
					<button
						className='todo-category'
						onClick={() => {
							setShowNewCategory(true);
						}}>
						카테고리 추가
					</button>
				)}
				{showNewCategory && (
					<span className='new-category'>
						<input
							type='text'
							name='name'
							placeholder='카테고리 이름'
							className='new-category-input'
							onChange={handleSubmit}
						/>
						<input
							type='text'
							name='emoji'
							placeholder='이모지 추가:)'
							className='new-category-input'
							onChange={handleSubmit}
						/>
						<button onClick={addNewCategory}>완료</button>
					</span>
				)}
			</div>
			<div className='add-todo-body'>
				<textarea
					value={text}
					onChange={(e) => setText(e.currentTarget.value)}
					placeholder='할일을 입력해주세요.'
				/>
			</div>
			<div className='add-todo-bottom'>
				<button className='add-button' onClick={addTodo}>
					추가
				</button>
			</div>
		</Container>
	);
};

export default AddTodo;
