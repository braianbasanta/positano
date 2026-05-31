"use client";

import { useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Step = 0 | 1 | 2 | 3;

const DICT = {
  es: {
    puestos: [
      "Pizzaiolo / Pizzero",
      "Cocinero",
      "Ayudante de cocina",
      "Camarero / Sala",
      "Bartender / Barra",
      "Lavavajillas / Office",
      "Encargado / Maître",
      "Otro",
    ],
    experiencia: ["Sin experiencia", "Menos de 1 año", "1 – 2 años", "3 – 5 años", "Más de 5 años"],
    idiomas: ["Español", "Catalán", "Italiano", "Inglés", "Francés"],
    disponibilidad: ["Inmediata", "En 1 – 2 semanas", "En un mes", "Más de un mes"],
    jornada: ["Completa", "Parcial", "Fines de semana", "Indiferente"],
    documentacion: ["Sí, en regla (UE / permiso de trabajo)", "En trámite", "Aún no tengo"],
    steps: [
      { title: "Datos personales", hint: "Cuéntanos quién eres" },
      { title: "Tu perfil", hint: "Puesto y experiencia" },
      { title: "Detalles", hint: "Idiomas, jornada y disponibilidad" },
      { title: "Tu CV", hint: "Adjunta tu currículum y envíalo" },
    ],
    fileTooBig: (mb: number) => `El archivo supera ${mb} MB.`,
    sendError: "No se pudo enviar la candidatura.",
    genericError: "Error al enviar el formulario.",
    okEyebrow: "¡Gracias!",
    okTitle: "Tu candidatura está en camino",
    okBodyPre: "Hemos recibido tu CV. Te escribiremos a",
    okBodyPost: "si tu perfil encaja con alguna de nuestras vacantes.",
    progress: (n: number, title: string) => `Paso ${n} / 4 · ${title}`,
    nombre: "Nombre completo *",
    email: "Email *",
    telefono: "Teléfono *",
    nacimiento: "Fecha de nacimiento",
    ciudad: "Ciudad de residencia",
    puestoLabel: "Puesto al que aplicas *",
    expLabel: "Años de experiencia *",
    idiomasLabel: "Idiomas que hablas",
    dispLabel: "Disponibilidad *",
    jornadaLabel: "Tipo de jornada *",
    docLabel: "Documentación para trabajar en España *",
    motivacion: "¿Por qué quieres trabajar en Positano? (opcional)",
    motivacionPlaceholder: "Cuéntanos algo sobre ti…",
    cvLabel: "Adjunta tu CV *",
    cvFormats: (mb: number) => `Formatos aceptados: PDF, Word, RTF, JPG, PNG. Máx. ${mb} MB.`,
    cvSelected: "Archivo seleccionado",
    cvSelect: "Selecciona un archivo",
    cvUpload: "Subir CV",
    atras: "← Atrás",
    continuar: "Continuar",
    enviando: "Enviando…",
    enviar: "Enviar candidatura",
    placeholderCiudad: "Barcelona",
  },
  en: {
    puestos: [
      "Pizzaiolo / Pizza chef",
      "Cook",
      "Kitchen assistant",
      "Waiter / Front of house",
      "Bartender",
      "Dishwasher / Back of house",
      "Manager / Maître",
      "Other",
    ],
    experiencia: ["No experience", "Less than 1 year", "1 – 2 years", "3 – 5 years", "More than 5 years"],
    idiomas: ["Spanish", "Catalan", "Italian", "English", "French"],
    disponibilidad: ["Immediate", "In 1 – 2 weeks", "In a month", "More than a month"],
    jornada: ["Full-time", "Part-time", "Weekends", "No preference"],
    documentacion: ["Yes, in order (EU / work permit)", "In progress", "Not yet"],
    steps: [
      { title: "Personal details", hint: "Tell us who you are" },
      { title: "Your profile", hint: "Role and experience" },
      { title: "Details", hint: "Languages, hours and availability" },
      { title: "Your CV", hint: "Attach your CV and send it" },
    ],
    fileTooBig: (mb: number) => `The file exceeds ${mb} MB.`,
    sendError: "We couldn't send your application.",
    genericError: "Error sending the form.",
    okEyebrow: "Thank you!",
    okTitle: "Your application is on its way",
    okBodyPre: "We've received your CV. We'll write to",
    okBodyPost: "if your profile matches one of our openings.",
    progress: (n: number, title: string) => `Step ${n} / 4 · ${title}`,
    nombre: "Full name *",
    email: "Email *",
    telefono: "Phone *",
    nacimiento: "Date of birth",
    ciudad: "City of residence",
    puestoLabel: "Role you're applying for *",
    expLabel: "Years of experience *",
    idiomasLabel: "Languages you speak",
    dispLabel: "Availability *",
    jornadaLabel: "Type of contract *",
    docLabel: "Documentation to work in Spain *",
    motivacion: "Why do you want to work at Positano? (optional)",
    motivacionPlaceholder: "Tell us something about yourself…",
    cvLabel: "Attach your CV *",
    cvFormats: (mb: number) => `Accepted formats: PDF, Word, RTF, JPG, PNG. Max. ${mb} MB.`,
    cvSelected: "Selected file",
    cvSelect: "Choose a file",
    cvUpload: "Upload CV",
    atras: "← Back",
    continuar: "Continue",
    enviando: "Sending…",
    enviar: "Send application",
    placeholderCiudad: "Barcelona",
  },
} as const;

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

export default function EmpleoForm({ lang = "es" }: { lang?: Locale }) {
  const t = DICT[lang];
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
      setStatus({ type: "error", message: t.fileTooBig(MAX_SIZE_MB) });
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
        throw new Error(json?.error || t.sendError);
      }
      setStatus({ type: "ok" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : t.genericError,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (status?.type === "ok") {
    return (
      <div className="border border-ink/15 bg-cream/40 px-6 py-14 text-center md:px-12 md:py-20">
        <p className="text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
          {t.okEyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl uppercase leading-tight tracking-[0.03em] text-ink md:text-5xl">
          {t.okTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-lg font-serif text-lg text-ink-soft md:text-xl">
          {t.okBodyPre} <span className="text-ink">{data.email}</span> {t.okBodyPost}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-ink/15 bg-cream/40 px-5 py-8 sm:px-8 md:px-12 md:py-12">
      {/* Progreso */}
      <div className="mb-9">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.78rem] uppercase tracking-[0.3em] text-lemon">
            {t.progress(step + 1, t.steps[step].title)}
          </p>
          <p className="hidden text-[0.78rem] uppercase tracking-[0.24em] text-ink-soft sm:block">
            {t.steps[step].hint}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          {t.steps.map((_, index) => (
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
          <Field label={t.nombre}>
            <input
              type="text"
              value={data.nombre}
              onChange={(event) => update("nombre", event.target.value)}
              className={inputClass}
              placeholder="Mario Rossi"
              autoComplete="name"
            />
          </Field>
          <Field label={t.email}>
            <input
              type="email"
              value={data.email}
              onChange={(event) => update("email", event.target.value)}
              className={inputClass}
              placeholder="mario@example.com"
              autoComplete="email"
            />
          </Field>
          <Field label={t.telefono}>
            <input
              type="tel"
              value={data.telefono}
              onChange={(event) => update("telefono", event.target.value)}
              className={inputClass}
              placeholder="+34 600 000 000"
              autoComplete="tel"
            />
          </Field>
          <Field label={t.nacimiento}>
            <input
              type="date"
              value={data.fechaNacimiento}
              onChange={(event) => update("fechaNacimiento", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label={t.ciudad} className="md:col-span-2">
            <input
              type="text"
              value={data.ciudad}
              onChange={(event) => update("ciudad", event.target.value)}
              className={inputClass}
              placeholder={t.placeholderCiudad}
              autoComplete="address-level2"
            />
          </Field>
        </div>
      )}

      {/* Paso 1 */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <Label>{t.puestoLabel}</Label>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {t.puestos.map((opt) => (
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
            <Label>{t.expLabel}</Label>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {t.experiencia.map((opt) => (
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
            <Label>{t.idiomasLabel}</Label>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.idiomas.map((opt) => (
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
              <Label>{t.dispLabel}</Label>
              <div className="mt-4 grid gap-2">
                {t.disponibilidad.map((opt) => (
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
              <Label>{t.jornadaLabel}</Label>
              <div className="mt-4 grid gap-2">
                {t.jornada.map((opt) => (
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
            <Label>{t.docLabel}</Label>
            <div className="mt-4 grid gap-2">
              {t.documentacion.map((opt) => (
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
          <Field label={t.motivacion}>
            <textarea
              value={data.motivacion}
              onChange={(event) => update("motivacion", event.target.value)}
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder={t.motivacionPlaceholder}
              maxLength={1500}
            />
          </Field>
          <div>
            <Label>{t.cvLabel}</Label>
            <p className="mt-2 font-serif text-base text-ink-soft">
              {t.cvFormats(MAX_SIZE_MB)}
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
                <span className="block text-[0.82rem] uppercase tracking-[0.24em] text-ink-soft">
                  {cv ? t.cvSelected : t.cvSelect}
                </span>
                <span className="mt-1 block font-serif text-lg text-ink">
                  {cv ? cv.name : t.cvUpload}
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
          className="text-[0.88rem] uppercase tracking-[0.24em] text-ink-soft transition-colors hover:text-ink disabled:opacity-30"
        >
          {t.atras}
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!stepValid}
            className="rounded-full bg-ink px-9 py-4 text-[0.88rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/40"
          >
            {t.continuar}
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!stepValid || submitting}
            className="rounded-full bg-lemon px-9 py-4 text-[0.88rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? t.enviando : t.enviar}
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
      <span className="block text-[0.78rem] uppercase tracking-[0.24em] text-ink-soft">
        {label}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.78rem] uppercase tracking-[0.24em] text-ink-soft">
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
