import { readFileSync, writeFileSync } from 'fs';
import { TodoType } from '../../types/todo';

// 모든 todolist 반환
const getList = () => {
	const todosBuffer = readFileSync('data/todos.json');
	const todosString = todosBuffer.toString();
	if (!todosString) {
		return [];
	}
	const todos: TodoType[] = JSON.parse(todosString);
	return todos;
};

// 해당 id의 todo 반환
const exist = ({ id }: { id: number }) => {
	const todos = getList();
	const todo = todos.some((todo) => todo.id === id); // some 메소드 : 일치하는 id가 있다면 true, 없다면 false 반환
	return todo;
};

// 투두리스트 저장
const write = async (todos: TodoType[]) => {
	writeFileSync('data/todos.json', JSON.stringify(todos));
};

export default { getList, exist, write };
