import { InquiryForm } from "@/components/inquiry-form";

export default function HirePage() {
  return <InquiryForm endpoint="/api/service-requests" title="Hire Us" />;
}
