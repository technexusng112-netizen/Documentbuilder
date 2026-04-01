import { InquiryForm } from "@/components/inquiry-form";

export default function ContactPage() {
  return <InquiryForm endpoint="/api/contact" title="Contact Us" />;
}
