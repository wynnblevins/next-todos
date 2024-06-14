import { z } from 'zod';

const schema = z.object({
  text: z.string() 
});

export default schema;