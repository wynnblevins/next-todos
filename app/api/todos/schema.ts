import { z } from 'zod';

const schema = z.object({
  text: z.string(),
  completed: z.boolean()
});

export default schema;