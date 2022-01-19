import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import TodoList from '../components/TodoList';
import { getTodosAPI } from '../lib/api/todos';
import { wrapper } from '../store';
import { TodoType } from '../types/todo';
import { todoActions } from '../store/todo';

const Container = styled.div`
	padding: 20px;
`;

interface IProps {
	todos: TodoType[];
}

const index: NextPage<IProps> = ({ todos }) => {
	return <TodoList todos={[]} />;
};

//index 페이지 띄우자마자 GET요청
export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		try {
			const { data } = await getTodosAPI();
			store.dispatch(todoActions.setTodo(data));
			return { props: {} };
		} catch (e) {
			console.log(e);
			return { props: {} };
		}
	}
);

export default index;
