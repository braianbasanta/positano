// Inyecta datos estructurados (JSON-LD) en el documento. Es un Server
// Component: el <script> se renderiza en el HTML inicial, así que Google y
// los buscadores de IA lo leen sin depender de JS.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
