import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const blogPostSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(20).max(500),
  content: z.string().min(100),
  category: z.string().min(2),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]),
  seo: z.object({
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
  }).optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20).max(300),
  fullDescription: z.string().min(100),
  whatsIncluded: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  status: z.enum(["active", "inactive"]),
});
