import Script from "next/script";

// Mismo contenedor de Google Tag Manager que la web WordPress en vivo.
// Reusarlo permite heredar la config de GA4 + Google Ads sin reconfigurar
// nada al migrar de dominio. Si en el futuro se separa el tracking de la
// web nueva, basta con cambiar este ID (o moverlo a una env var).
const GTM_ID = "GTM-5RTLR3HF";

// Consent Mode v2 por defecto en "denegado" (la web vieja lo hacía con
// Complianz; aquí no existe, así que lo ponemos a mano). DEBE ejecutarse antes
// que cualquier `consent update` del banner y antes de cargar GTM. Por eso es
// un <script> síncrono e inline (no next/Script): React lo renderiza en el
// HTML y se ejecuta en orden, ANTES de hidratar el ConsentBanner. Es mínimo
// (~5 líneas), así que no penaliza el rendimiento. Sin esto en orden, un
// visitante recurrente que ya aceptó podría enviar el `update` antes que el
// `default` y romper el consentimiento de Ads.
export function GtmConsentDefault() {
  return (
    <script
      id="gtm-consent-default"
      dangerouslySetInnerHTML={{
        // `url_passthrough` propaga el gclid (y wbraid/_gl) por los parámetros de
        // URL al navegar cuando ad_storage está en "denied". Sin cookies y sin
        // consentimiento, es lo que permite que Google Ads/GA4 sigan atribuyendo
        // el clic a su campaña: sin esto, el tráfico de Ads cae en "Unassigned".
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});gtag('set','url_passthrough',true);`,
      }}
    />
  );
}

// Loader de GTM (~328 KB). `afterInteractive` (carga pronto, justo tras la
// hidratación) en lugar de `lazyOnload`: con lazyOnload GTM solo cargaba en el
// idle del navegador y los visitantes de Google Ads (sobre todo PMax en móvil)
// que rebotan en 1-2 s se iban ANTES de que cargara, así que su sesión nunca
// llegaba a GA4 → quedaban sin medir / "Unassigned". afterInteractive las
// captura. El Consent Mode default ya quedó fijado por GtmConsentDefault.
export function GtmScript() {
  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
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
