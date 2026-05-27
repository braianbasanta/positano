"use client";

import { useMemo, useRef, useState } from "react";

type Step = 0 | 1 | 2 | 3;

const PUESTOS = [
  "Pizzaiolo / Pizzero",
  "Cocinero",
  "Ayudante de cocina",
  "Camarero / Sala",
  "Bartender / Barra",
  "Lavavajillas / Office",
  "Encargado / Maître",
  "Otro",
];

const EXPERIENCIA = [
  "Sin experiencia",
  "Menos de 1 año",
  "1 – 2 años",
  "3 – 5 años",
  "Más de 5 años",
];

const IDIOMAS = ["Español", "Catalán", "Italiano", "Inglés", "Francés"];

const DISPONIBILIDAD = [
  "Inmediata",
  "En 1 – 2 semanas",
  "En un mes",
  "Más de un mes",
];

const JORNADA = ["Completa", "Parcial", "Fines de semana", "Indiferente"];

const DOCUMENTACION = [
  "Sí, en regla (UE / permiso de trabajo)",
  "En trámite",
  "Aún no tengo",
];

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.rtf,.jpg,.jpeg,.png";
const MAX_SIZE_MB = 5;

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  ciudad: string;
  puesto: string;
  experiencia: string;
  idiomas: string[];
  disponibilidad: string;
  jornada: string;
  documentacion: string;
  motivacion: string;
};

const INITIAL: FormState = {
  nombre: "",
  email: "",
  telefono: "",
  fechaNacimiento: "",
  ciudad: "",
  puesto: "",
  experiencia: "",
  idiomas: [],
  disponibilidad: "",
  jornada: "",
  documentacion: "",
  motivacion: "",
};

const STEPS = [
  { title: "Datos personales", hint: "Cuéntanos quién eres" },
  { title: "Tu perfil", hint: "Puesto y experiencia" },
  { title: "Detalles", hint: "Idiomas, jornada y disponibilidad" },
  { title: "Tu CV", hint: "Adjunta tu currículum y envíalo" },
] as const;

export default function EmpleoForm() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormState>(INITIAL);
  const [cv, setCv] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<
    { type: "ok" } | { type: "error"; message: string } | null
  >(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggleIdioma = (idioma: string) => {
    setData((prev) => ({
      ...prev,
      idiomas: prev.idiomas.includes(idioma)
        ? prev.idiomas.filter((value) => value !== idioma)
        : [...prev.idiomas, idioma],
    }));
  };

  const stepValid = useMemo(() => {
    if (step === 0) {
      return (
        data.nombre.trim().length > 1 &&
        /.+@.+\..+/.test(data.email) &&
        data.telefono.trim().length >= 6
      );
    }
    if (step === 1) {
      return data.puesto !== "" && data.experiencia !== "";
    }
    if (step === 2) {
      return data.disponibilidad !== "" && data.jornada !== "" && data.documentacion !== "";
    }
    if (step === 3) {
      return cv !== null;
    }
    return false;
  }, [step, data, cv]);

  const goNext = () => {
    if (!stepValid) return;
    setStep((prev) => (Math.min(prev + 1, 3) as Step));
  };
  const goBack = () => setStep((prev) => (Math.max(prev - 1, 0) as Step));

  const handleFile = (file: File | null) => {
    if (!file) {
      setCv(null);
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setStatus({
        type: "error",
        message: `El archivo supera ${MAX_SIZE_MB} MB.`,
      });
      return;
    }
    setStatus(null);
    setCv(file);
  };

  const submit = async () => {
    if (!stepValid || submitting) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const body = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => body.append(key, item));
        } else {
          body.append(key, value);
        }
      });
      if (cv) body.append("cv", cv);

      const res = await fetch("/api/empleo", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "No se pudo enviar la candidatura.");
      }
      setStatus({ type: "ok" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Error al enviar el formulario.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (status?.type === "ok") {
    return (
      <div className="border border-ink/15 bg-cream/40 px-6 py-14 text-center md:px-12 md:py-20">
        <p className="text-[0.72rem] uppercase tracking-[0.34em] text-lemon">
          ¡Gracias!
        </p>
        <h2 className="mt-4 font-display text-4xl uppercase leading-tight tracking-[0.03em] text-ink md:text-5xl">
          Tu candidatura está en camino
        </h2>
        <p className="mx-auto mt-5 max-w-lg font-serif text-lg text-ink-soft md:text-xl">
          Hemos recibido tu CV. Te escribiremos a{" "}
          <span className="text-ink">{data.email}</span> si tu perfil encaja con
          alguna de nuestras vacantes.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-ink/15 bg-cream/40 px-5 py-8 sm:px-8 md:px-12 md:py-12">
      {/* Progreso */}
      <div className="mb-9">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-lemon">
            Paso {step + 1} / 4 · {STEPS[step].title}
          </p>
          <p className="hidden text-[0.7rem] uppercase tracking-[0.24em] text-ink-soft sm:block">
            {STEPS[step].hint}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          {STEPS.map((_, index) => (
            <span
              key={index}
              className={`h-1 flex-1 transition-colors ${
                index <= step ? "bg-lemon" : "bg-ink/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Paso 0 */}
      {step === 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nombre completo *">
            <input
              type="text"
              value={data.nombre}
              onChange={(event) => update("nombre", event.target.value)}
              className={inputClass}
              placeholder="Mario Rossi"
              autoComplete="name"
            />
          </Field>
          <Field label="Email *">
            <input
              type="email"
              value={data.email}
              onChange={(event) => update("email", event.target.value)}
              className={inputClass}
              placeholder="mario@ejemplo.com"
              autoComplete="email"
            />
          </Field>
          <Field label="Teléfono *">
            <input
              type="tel"
              value={data.telefono}
              onChange={(event) => update("telefono", event.target.value)}
              className={inputClass}
              placeholder="+34 600 000 000"
              autoComplete="tel"
            />
          </Field>
          <Field label="Fecha de nacimiento">
            <input
              type="date"
              value={data.fechaNacimiento}
              onChange={(event) => update("fechaNacimiento", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Ciudad de residencia" className="md:col-span-2">
            <input
              type="text"
              value={data.ciudad}
              onChange={(event) => update("ciudad", event.target.value)}
              className={inputClass}
              placeholder="Barcelona"
              autoComplete="address-level2"
            />
          </Field>
        </div>
      )}

      {/* Paso 1 */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <Label>Puesto al que aplicas *</Label>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {PUESTOS.map((opt) => (
                <ChoicePill
                  key={opt}
                  active={data.puesto === opt}
                  onClick={() => update("puesto", opt)}
                >
                  {opt}
                </ChoicePill>
              ))}
            </div>
          </div>
          <div>
            <Label>Años de experiencia *</Label>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {EXPERIENCIA.map((opt) => (
                <ChoicePill
                  key={opt}
                  active={data.experiencia === opt}
                  onClick={() => update("experiencia", opt)}
                >
                  {opt}
                </ChoicePill>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paso 2 */}
      {step === 2 && (
        <div className="space-y-8">
          <div>
            <Label>Idiomas que hablas</Label>
            <div className="mt-4 flex flex-wrap gap-2">
              {IDIOMAS.map((opt) => (
                <ChoicePill
                  key={opt}
                  active={data.idiomas.includes(opt)}
                  onClick={() => toggleIdioma(opt)}
                >
                  {opt}
                </ChoicePill>
              ))}
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Label>Disponibilidad *</Label>
              <div className="mt-4 grid gap-2">
                {DISPONIBILIDAD.map((opt) => (
                  <ChoicePill
                    key={opt}
                    active={data.disponibilidad === opt}
                    onClick={() => update("disponibilidad", opt)}
                  >
                    {opt}
                  </ChoicePill>
                ))}
              </div>
            </div>
            <div>
              <Label>Tipo de jornada *</Label>
              <div className="mt-4 grid gap-2">
                {JORNADA.map((opt) => (
                  <ChoicePill
                    key={opt}
                    active={data.jornada === opt}
                    onClick={() => update("jornada", opt)}
                  >
                    {opt}
                  </ChoicePill>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label>Documentación para trabajar en España *</Label>
            <div className="mt-4 grid gap-2">
              {DOCUMENTACION.map((opt) => (
                <ChoicePill
                  key={opt}
                  active={data.documentacion === opt}
                  onClick={() => update("documentacion", opt)}
                >
                  {opt}
                </ChoicePill>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paso 3 */}
      {step === 3 && (
        <div className="space-y-6">
          <Field label="¿Por qué quieres trabajar en Positano? (opcional)">
            <textarea
              value={data.motivacion}
              onChange={(event) => update("motivacion", event.target.value)}
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder="Cuéntanos algo sobre ti…"
              maxLength={1500}
            />
          </Field>
          <div>
            <Label>Adjunta tu CV *</Label>
            <p className="mt-2 font-serif text-base text-ink-soft">
              Formatos aceptados: PDF, Word, RTF, JPG, PNG. Máx. {MAX_SIZE_MB} MB.
            </p>
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-4 flex w-full items-center justify-between gap-4 border border-dashed border-ink/35 bg-cream/60 px-5 py-5 text-left transition-colors hover:border-lemon hover:bg-cream"
            >
              <span>
                <span className="block text-[0.72rem] uppercase tracking-[0.24em] text-ink-soft">
                  {cv ? "Archivo seleccionado" : "Selecciona un archivo"}
                </span>
                <span className="mt-1 block font-serif text-lg text-ink">
                  {cv ? cv.name : "Subir CV"}
                </span>
                {cv && (
                  <span className="mt-1 block text-sm text-ink-soft">
                    {(cv.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 text-lemon"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {status?.type === "error" && (
        <p className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {status.message}
        </p>
      )}

      {/* Acciones */}
      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0 || submitting}
          className="text-[0.78rem] uppercase tracking-[0.24em] text-ink-soft transition-colors hover:text-ink disabled:opacity-30"
        >
          ← Atrás
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!stepValid}
            className="rounded-full bg-ink px-9 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/40"
          >
            Continuar
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!stepValid || submitting}
            className="rounded-full bg-lemon px-9 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Enviando…" : "Enviar candidatura"}
          </button>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full border-b border-ink/20 bg-transparent px-1 py-2.5 font-serif text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-lemon";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[0.7rem] uppercase tracking-[0.24em] text-ink-soft">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-ink-soft">
      {children}
    </p>
  );
}

function ChoicePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-5 py-3 text-left font-serif text-base transition-all duration-200 ${
        active
          ? "border-lemon bg-lemon text-ink"
          : "border-ink/25 bg-cream/30 text-ink hover:border-ink/60"
      }`}
    >
      {children}
    </button>
  );
}
