import { ServiceCards } from "@/components/service-cards";

export default function ServicesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="text-slate-600 dark:text-slate-300">Professional academic support for undergraduate and postgraduate students.</p>
      <ServiceCards />
    </section>
  );
}
