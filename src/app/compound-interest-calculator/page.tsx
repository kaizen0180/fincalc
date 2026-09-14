import type { Metadata } from "next";
import { Calculator, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CompoundInterestCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Calculadora de interés compuesto — FinCalc",
  description:
    "Proyecta cómo crece tu dinero con interés compuesto: saldo final, aportaciones e intereses ganados. Rápido, sencillo y gratis.",
};

const navLinks = [
  { href: "/#calculadoras", label: "Calculadoras" },
  { href: "/#por-que-fincalc", label: "Por qué FinCalc" },
];

export default function CompoundInterestCalculatorPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-foreground"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator />
            </span>
            FinCalc
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <Home data-icon="inline-start" />
              Inicio
            </Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="flex flex-col items-center gap-4 px-4 pt-16 text-center sm:px-6">
          <h1 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Calculadora de interés compuesto
          </h1>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Ingresa tu capital inicial y tus aportaciones y descubre cuánto
            puede crecer tu dinero con el tiempo gracias al interés compuesto.
          </p>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <CompoundInterestCalculator />
        </section>
      </main>

      <footer className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Calculator />
                </span>
                FinCalc
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Calculadoras financieras gratuitas para planificar tu hipoteca y
                tus ahorros con claridad.
              </p>
            </div>

            <nav className="flex flex-wrap gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 FinCalc. Todos los derechos reservados.</p>
            <p>
              Las estimaciones son orientativas y no constituyen asesoramiento
              financiero.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
