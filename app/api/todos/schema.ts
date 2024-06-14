import { z } from 'zod';

const schema = z.object({
  text: z.string().min(3) 
});

export default schema;