import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";

export const metadata: Metadata = {
  title: "Sound & Production Services | So Productions",
  description: "Professional sound and event production services across South Africa.",
};

export default function Page() {
  return (
    <ServiceDetail
      title="Sound Engineering"
      slug="sound-engineering"
      tagline="Professional FOH mixing, monitor engineering, and live sound production for events of every scale."
      description="Great live sound is invisible. The audience doesn't notice it — they just feel moved by the performance. That's the standard we hold ourselves to on every job."
      whatsIncluded={["Full FOH mixing","Monitor/IEM engineer on request","Pre-show soundcheck","PA system specification and setup","Stage patching and rack setup","Wireless microphone management","Post-show pack-down"]}
      process={[
        { step: "Brief & Site Visit", description: "We review your event brief, visit the venue if possible, and specify the right system for the room." },
        { step: "System Design", description: "We design a PA layout, stage plot, and signal chain tailored to your event." },
        { step: "Load-In & Setup", description: "We arrive early, wire the stage, and do a thorough system check." },
        { step: "Soundcheck", description: "We work through each input, dialing in monitors and the house mix." },
        { step: "Show Day", description: "We run the show and ensure the audience experience is flawless from first note to last." },
      ]}
      equipment={["DiGiCo SD Series","Yamaha CL / QL Series","L-Acoustics K2 / Kara","d&b audiotechnik V-Series","Sennheiser Digital 6000","Shure Axient"]}
      faqs={[
        { question: "Do you provide PA or just engineering?", answer: "Both. We can provide a complete PA package or supply an engineer for your existing system." },
        { question: "How far in advance should I book?", answer: "For large events, 4–8 weeks is ideal. For smaller events, 2 weeks usually works." },
        { question: "Can you do outdoor events?", answer: "Yes. We have extensive experience with outdoor line-array systems and indoor distributed audio." },
      ]}
      relatedServices={[{ title: "Stage Sound Systems", slug: "stage-sound" }, { title: "Guitar Support", slug: "guitar-support" }]}
    />
  );
}
