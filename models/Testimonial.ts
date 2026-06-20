import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string; role: string; company?: string; quote: string;
  stars: number; avatar?: string; featured: boolean; status: "active" | "inactive";
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: String, quote: { type: String, required: true },
  stars: { type: Number, min: 1, max: 5, default: 5 },
  avatar: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
