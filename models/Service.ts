import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string; slug: string; description: string; fullDescription: string;
  icon?: string; featuredImage?: string; gallery: string[];
  whatsIncluded: string[]; process: { step: string; description: string }[];
  equipment: string[]; faqs: { question: string; answer: string }[];
  relatedServices: string[]; status: "active" | "inactive";
  seo: { metaTitle?: string; metaDescription?: string };
  order: number; createdAt: Date; updatedAt: Date;
}

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  fullDescription: { type: String, required: true },
  icon: String, featuredImage: String, gallery: [String],
  whatsIncluded: [String],
  process: [{ step: String, description: String }],
  equipment: [String],
  faqs: [{ question: String, answer: String }],
  relatedServices: [String],
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  seo: { metaTitle: String, metaDescription: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
