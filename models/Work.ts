import mongoose, { Schema, Document } from "mongoose";

export interface IWork extends Document {
  title: string; slug: string; client?: string; location: string;
  eventType: string; date: Date; description: string;
  challenge: string; solution: string; result: string;
  images: string[]; videos: string[]; tags: string[];
  featured: boolean; status: "draft" | "published";
  seo: { metaTitle?: string; metaDescription?: string };
  createdAt: Date; updatedAt: Date;
}

const WorkSchema = new Schema<IWork>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  client: String, location: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  challenge: String, solution: String, result: String,
  images: [String], videos: [String], tags: [String],
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  seo: { metaTitle: String, metaDescription: String },
}, { timestamps: true });

export const Work = mongoose.models.Work || mongoose.model<IWork>("Work", WorkSchema);
