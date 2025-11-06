import { z } from "zod";

const CreateGalleryDTO = z.object({
  description: z.string().min(2).max(1000),
  images: z.array(z.string().url()),
  createdBy: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    imageUrl: z.string().url().optional(),
  }),
});

export { CreateGalleryDTO };
