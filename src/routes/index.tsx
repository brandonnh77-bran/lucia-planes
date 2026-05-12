import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { INITIAL_CHECKOUT_PARAMS, readCheckoutParam } from "../lib/checkoutParams";

export const Route = createFileRoute("/")({
  component: PricingPage,
});

type PlanKey = "basico" | "lucia" | "vip";

const PAYMENT_LINKS: Record<PlanKey, string> = {
  basico: "https://buy.stripe.com/28E9AT3cY4xygej5LNcEw00",
  lucia:  "https://buy.stripe.com/dRmbJ1bJu3tu2nt6PRcEw01",
  vip:    "https://buy.stripe.com/8x25kDbJuaVWbY3a23cEw02",
};

const LOADING_MESSAGES = [
  "Redirigiendo a Stripe...",
  "Preparando tu acceso...",
  "Conectando con Stripe...",
  "Casi listo...",
];

function PricingPage() {
  // Lock the values from the first render so later re-renders or router
  // normalization can't drop them.
  const [ref] = useState<string>(
    () => INITIAL_CHECKOUT_PARAMS.ref || readCheckoutParam("ref"),
  );
  const [phone] = useState<string>(
    () => INITIAL_CHECKOUT_PARAMS.phone || readCheckoutParam("phone"),
  );

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("[checkout] captured params", { ref, phone });
  }, [ref, phone]);

  // Rotate loading messages while spinner is active
  useEffect(() => {
    if (!loading) return;
    setLoadingMsg(LOADING_MESSAGES[0]);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < LOADING_MESSAGES.length) {
        setLoadingMsg(LOADING_MESSAGES[i]);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [loading]);

  function handleCheckout(plan: PlanKey) {
    setError(null);
    setLoading(true);
    try {
      const checkoutRef = ref || readCheckoutParam("ref");
      const checkoutPhone = phone || readCheckoutParam("phone");

      const url = new URL(PAYMENT_LINKS[plan]);
      if (checkoutRef) url.searchParams.set("client_reference_id", checkoutRef);
      if (checkoutPhone) url.searchParams.set("prefilled_phone", checkoutPhone);

      window.location.href = url.toString();
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : "Algo salió mal. Intenta de nuevo.");
    }
  }

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p className="loading-text">{loadingMsg}</p>
        </div>
      )}

      <main className="pricing-root">
        <div className="bg-orb orb1" />
        <div className="bg-orb orb2" />

        <header className="pricing-header">
          <div className="luna-badge">
            <span className="badge-dot" />
            Tu compañera siempre disponible
          </div>
          <h1 className="main-title">
            Habla con <em>Lucía</em>
            <br />
            cuando quieras
          </h1>
          <p className="subtitle">
            Conversaciones privadas y seguras, a tu ritmo. Elige el plan que va contigo.
          </p>
          <span className="privacy-line">
            🔐 Tus conversaciones son solo tuyas. Nunca compartimos tus datos.
          </span>
          <div>
            <span className="free-tag">✦ Continúa sin límites con Lucía</span>
          </div>
        </header>

        <div className="plans-grid">
          {/* Plan Básico */}
          <div className="plan-card">
            <div className="plan-icon icon-basic">💬</div>
            <p className="plan-name">Básico</p>
            <p className="plan-tagline">Da el primer paso</p>
            <div className="plan-price">
              <span className="price-currency">$</span>
              <span className="price-amount">7.99</span>
              <span className="price-period">/mes</span>
            </div>
            <ul className="features-list">
              <li><span className="check check-basic">✓</span><span>Mensajes limitados por mes</span></li>
              <li><span className="check check-basic">✓</span><span>Solo mensajes de texto</span></li>
              <li><span className="check check-basic">✓</span><span>Memoria de conversación</span></li>
              <li><span className="check check-basic">✓</span><span>Acceso solo por texto</span></li>
            </ul>
            <button
              type="button"
              className="cta-btn btn-basic"
              disabled={loading}
              onClick={() => handleCheckout("basico")}
            >
              Empezar con Básico
            </button>
          </div>

          {/* Plan Lucía — RECOMENDADO */}
          <div className="plan-card featured">
            <div className="popular-badge">✦ Más popular</div>
            <div className="plan-icon icon-luna">✨</div>
            <p className="plan-name">Lucía</p>
            <p className="plan-tagline">La experiencia completa</p>
            <div className="plan-price">
              <span className="price-currency">$</span>
              <span className="price-amount">9.99</span>
              <span className="price-period">/mes</span>
            </div>
            <ul className="features-list">
              <li><span className="check check-luna">✓</span><span>Mayor cantidad de mensajes</span></li>
              <li><span className="check check-luna">✓</span><span>Texto, voz e imágenes</span></li>
              <li><span className="check check-luna">✓</span><span>Memoria extendida de conversación</span></li>
              <li><span className="check check-luna">✓</span><span>Respuestas prioritarias</span></li>
              <li><span className="check check-luna">✓</span><span>Lucía te recuerda entre sesiones</span></li>
            </ul>
            <button
              type="button"
              className="cta-btn btn-luna"
              disabled={loading}
              onClick={() => handleCheckout("lucia")}
            >
              Elegir Lucía ✦
            </button>
          </div>

          {/* Plan VIP */}
          <div className="plan-card">
            <div className="plan-icon icon-vip">👑</div>
            <p className="plan-name">Lucía VIP</p>
            <p className="plan-tagline">Totalmente a tu medida</p>
            <div className="plan-price">
              <span className="price-currency">$</span>
              <span className="price-amount">19.99</span>
              <span className="price-period">/mes</span>
            </div>
            <ul className="features-list">
              <li><span className="check check-vip">✓</span><span>Máxima capacidad de mensajes</span></li>
              <li><span className="check check-vip">✓</span><span>Texto, voz e imágenes</span></li>
              <li><span className="check check-vip">✓</span><span>Tono, estilo e intereses propios</span></li>
              <li><span className="check check-vip">✓</span><span>Acceso anticipado a novedades</span></li>
              <li><span className="check check-vip">✓</span><span>Soporte prioritario directo</span></li>
            </ul>
            <button
              type="button"
              className="cta-btn btn-vip"
              disabled={loading}
              onClick={() => handleCheckout("vip")}
            >
              Acceder a VIP
            </button>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="guarantee">
          <span>Cancela cuando quieras. Sin permanencia.</span>
        </div>

        <div className="trust-row">
          <div className="trust-item">🔒 Pago seguro con Stripe</div>
          <div className="trust-dot" />
          <div className="trust-item">↺ Cancela en 1 clic</div>
          <div className="trust-dot" />
          <div className="trust-item">🔐 Privacidad garantizada</div>
        </div>
      </main>
    </>
  );
}
