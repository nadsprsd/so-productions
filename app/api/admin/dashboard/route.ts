import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Work } from "@/models/Work";
import { BlogPost } from "@/models/BlogPost";
import { GalleryItem } from "@/models/GalleryItem";
import { Testimonial } from "@/models/Testimonial";
import { ContactSubmission } from "@/models/ContactSubmission";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  await connectDB();

  const [
    totalWorks,
    publishedWorks,
    totalPosts,
    publishedPosts,
    totalGallery,
    activeGallery,
    totalTestimonials,
    activeTestimonials,
    newEnquiries,
    totalEnquiries,
  ] = await Promise.all([
    Work.countDocuments(),
    Work.countDocuments({ status: "published" }),
    BlogPost.countDocuments(),
    BlogPost.countDocuments({ status: "published" }),
    GalleryItem.countDocuments(),
    GalleryItem.countDocuments({ status: "active" }),
    Testimonial.countDocuments(),
    Testimonial.countDocuments({ status: "active" }),
    ContactSubmission.countDocuments({ status: "new" }),
    ContactSubmission.countDocuments(),
  ]);

  return NextResponse.json({
    works: { total: totalWorks, published: publishedWorks },
    blog: { total: totalPosts, published: publishedPosts },
    gallery: { total: totalGallery, active: activeGallery },
    testimonials: { total: totalTestimonials, active: activeTestimonials },
    contacts: { new: newEnquiries, total: totalEnquiries },
  });
}
