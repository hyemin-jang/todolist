import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const todos = Data.todo.getList();
			res.statusCode = 200;
			return res.send(todos);
		} catch (e) {
			console.log(e);
			res.statusCode = 500;
			res.send(e);
		}
	}

	/* 새로운 todo 추가 */
	if (req.method === 'POST') {
		const { text, category } = req.body;
		if (!text || !category) {
			res.statusCode = 400;
			return res.send('text 혹은 category가 없습니다.');
		}
		const todos = Data.todo.getList();
		let todoId: number;
		// 추가할 todo의 id값 세팅
		if (todos.length > 0) {
			todoId = todos[todos.length - 1].id + 1;
		} else {
			todoId - 1;
		}

		const newTodo = {
			id: todoId,
			text,
			category,
			checked: false,
		};

		Data.todo.write([...todos, newTodo]);
		res.statusCode = 200;
		res.end();
	}
};
