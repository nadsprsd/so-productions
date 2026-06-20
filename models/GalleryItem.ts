import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string; url: string; type: "image" | "video"; caption?: string;
  event?: string; category?: string; featured: boolean;
  status: "active" | "inactive"; order: number; createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ["image", "video"], required: true },
  caption: String, event: String, category: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const GalleryItem = mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
