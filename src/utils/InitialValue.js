
import { Value } from 'slate';

const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'text',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'Start writing',
							},
						],
					},
				],
			},
		],
	},
});

export default initialValue;