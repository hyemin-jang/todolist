import { applyMiddleware, combineReducers, createStore } from 'redux';
import todo from './todo';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';

// 리듀서를 모듈별로 관리
// combineReducers() 를 사용하여 하나로 모음
const rootReducer = combineReducers({
	todo: todo.reducer,
});

// 합쳐진 리듀서에 타입이 __NEXT_REDUX_WRAPPER_HYDRATE__인 리듀서를 추가함
// HYDRATE: 서버에서 생성한 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달해주는 역할
// (서버에서 생성한 상태를 클라이언트 스토어에 합쳐줌)
const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.payload,
		};
		if (state.count) nextState.count = state.count;
		return nextState;
	}
	return rootReducer(state, action);
};

/* 스토어의 타입 */
// 스토어의 타입을 루트 리듀서로부터 얻는다..............????왜여........??????
export type RootState = ReturnType<typeof rootReducer>;

/* 미들웨어 적용을 위한 스토어 reducer */
// redux devtool 확장프로그램 쓰기 위한 코드임
// const bindMiddleware = (middleware: any) => {
// 	if (process.env.NODE_ENV !== 'production') {
// 		const { composeWithDevTools } = require('redux-devtools-extension');
// 		return composeWithDevTools(applyMiddleware(...middleware));
// 	}
// 	return applyMiddleware(...middleware);
// };
// redux toolkit 쓰면 다 없애도 되는 코드

// 리듀서와 미들웨어로 리덕스 스토어를 만들어서 리턴한다
const initStore = () => {
	return configureStore({
		reducer,
		devTools: true,
	});
};

export const wrapper = createWrapper(initStore); // App 컴포넌트에서 wrapper로 사용하기 위해 createWrapper() 사용
