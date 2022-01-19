import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../types/todo';

interface TodoReduxState {
	todos: TodoType[];
}

/* 초기 상태 */
const initialState: TodoReduxState = {
	todos: [],
};

// createSlice : 액션타입정의, 액션생성자만들기, (+saga 만들기), reducer 만들기 => 한방에 해결
const todo = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setTodo(state, action: PayloadAction<TodoType[]>) {
			state.todos = action.payload;
		},
	},
});

export const todoActions = { ...todo.actions };

export default todo;

// /* 액션 타입 정의 */
// export const SET_TODO_LIST = 'todo/SET_TODO_LIST';

// /* 액션 생성자 정의 */
// // 액션 생성자는 항상 함수형태로 export 해야 한다
// export const setTodo = (payload: TodoType[]) => {
// 	return {
// 		type: SET_TODO_LIST,
// 		payload,
// 	};
// };

// export const todoActions = { setTodo };

// interface TodoReduxState {
// 	todos: TodoType[];
// }

// /* 초기 상태 */
// const initialState: TodoReduxState = {
// 	todos: [],
// };

// /* 리듀서 */
// export default function todo(state = initialState, action: any) {
// 	switch (action.type) {
// 		case SET_TODO_LIST:
// 			const newState = { ...state, todos: action.payload };
// 			return newState;
// 		default:
// 			return state;
// 	}
// }
