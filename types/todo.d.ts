// d.ts : 타입스크립트 코드의 타입 추론을 돕는 파일

export type TodoType = {
	id: number;
	text: string;
	category: { name: string; emoji: string };
	checked: boolean;
};
