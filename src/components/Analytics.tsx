import Script from "next/script";

// Mismo contenedor de Google Tag Manager que la web WordPress en vivo.
// Reusarlo permite heredar la config de GA4 + Google Ads sin reconfigurar
// nada al migrar de dominio. Si en el futuro se separa el tracking de la
// web nueva, basta con cambiar este ID (o moverlo a una env var).
const GTM_ID = "GTM-5RTLR3HF";

// Script base de GTM. Antes de cargar GTM fijamos el Consent Mode v2 por
// defecto en "denegado" (la web vieja lo hacía con Complianz; aquí no existe,
// así que lo ponemos a mano). El banner de cookies lo actualiza a "concedido"
// cuando el usuario acepta. Sin esto, en España mediríamos sin consentimiento
// y, peor, las conversiones de Ads no dispararían tras la migración.
// Se carga lazyOnload (tras el evento load) para sacar los ~328 KB de GTM de
// la ventana crítica y no penalizar FCP/LCP/TBT en móvil. El Consent Mode
// default va dentro del mismo script, así que se fija justo antes de cargar
// GTM; las conversiones disparan en acción del usuario (submit de reserva),
// mucho después de la carga, por lo que no se pierde tracking.
export function GtmScript() {
  return (
    <Script id="gtm-base" strategy="lazyOnload">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  wait_for_update:500
});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

// Fallback sin JS — debe ir lo más arriba posible dentro del <body>.
export function GtmNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
