import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string; slug: string; excerpt: string; content: string;
  featuredImage?: string; category: string; tags: string[];
  author: string; status: "draft" | "published";
  seo: { metaTitle?: string; metaDescription?: string; canonicalUrl?: string };
  publishedAt?: Date; createdAt: Date; updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: String,
  category: { type: String, required: true },
  tags: [String],
  author: { type: String, default: "So Productions" },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  seo: { metaTitle: String, metaDescription: String, canonicalUrl: String },
  publishedAt: Date,
}, { timestamps: true });

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
