import mongoose, { Schema, Document } from "mongoose";

export interface IContactSubmission extends Document {
  name: string; email: string; phone?: string; eventType?: string;
  eventDate?: string; message: string; status: "new" | "read" | "replied";
  ipAddress?: string; createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String, eventType: String, eventDate: String,
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  ipAddress: String,
}, { timestamps: true });

export const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
