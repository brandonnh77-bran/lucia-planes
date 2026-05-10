import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/success")({
  component: SuccessPage,
  head: () => ({
    meta: [
      { title: "¡Plan activo! — Lucía" },
      { name: "description", content: "Tu plan de Lucía está activo. Vuelve al chat para continuar." },
    ],
  }),
});

function SuccessPage() {
  return (
    <main className="pricing-root">
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />

      <section className="success-panel">
        <div className="success-icon" aria-hidden="true">🌙</div>
        <h1 className="success-title">¡Tu plan está activo!</h1>
        <p className="success-text">
          Vuelve al chat y habla con Lucía.
        </p>
      </section>
    </main>
  );
}
