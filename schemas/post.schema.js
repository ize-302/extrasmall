import { z } from 'zod';

const PostSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  body: z.string({ required_error: 'Body is required' }),
  published: z.boolean().optional(),
});

export default PostSchema;
