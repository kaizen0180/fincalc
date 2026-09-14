import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  Check,
  Home,
  MousePointerClick,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#calculadoras", label: "Calculadoras" },
  { href: "#por-que-fincalc", label: "Por qué FinCalc" },
];

const mortgageFeatures = [
  "Monto del préstamo, tasa de interés y plazo a tu medida",
  "Cuota mensual desglosada en capital e intereses",
  "Tabla de amortización con cada pago del préstamo",
  "Simula pagos anticipados para ahorrar intereses",
];

const mortgageOutputs = [
  { label: "Pago mensual" },
  { label: "Interés total" },
  { label: "Plan de amortización" },
];

const compoundFeatures = [
  "Capital inicial y aportaciones periódicas",
  "Frecuencia de capitalización ajustable",
  "Proyección del saldo final y el interés ganado",
  "Crecimiento de tus ahorros, año a año",
];

const compoundOutputs = [
  { label: "Saldo final" },
  { label: "Interés ganado" },
  { label: "Proyección de ahorro" },
];

const valueProps = [
  {
    icon: Zap,
    title: "Rápido y preciso",
    description:
      "Resultados al instante y con exactitud, para que tomes decisiones sin esperas ni complicaciones.",
  },
  {
    icon: MousePointerClick,
    title: "Fácil de usar",
    description:
      "Entiende cada número sin ser experto. Pon tus datos y FinCalc hace el trabajo por ti.",
  },
  {
    icon: Wallet,
    title: "Gratis y sin límites",
    description:
      "Todas las calculadoras son gratuitas. Sin registro, sin cuotas y sin sorpresas.",
  },
];

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="#"
            className="flex items-center gap-2 font-medium text-foreground"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-card text-card-foreground">
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

          <Button asChild size="sm">
            <Link href="#calculadoras">Empezar</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="flex flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
          <Badge variant="secondary">
            <Sparkles data-icon="inline-start" />
            Gratis y sin límites
          </Badge>

          <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Planifica tu futuro financiero con números claros
          </h1>

          <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Calcula el pago mensual de tu hipoteca y proyecta cómo el interés
            compuesto multiplica tus ahorros. Resultados precisos al instante,
            gratis y sin necesidad de registro.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/mortgage-repayments-calculator">
                <Home data-icon="inline-start" />
                Calcula tu hipoteca
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#interes-compuesto">
                <TrendingUp data-icon="inline-start" />
                Probar interés compuesto
              </Link>
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calculator className="size-3.5" />2 calculadoras
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5" />
              Resultados al instante
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5" />
              100% gratis · sin registro
            </span>
          </div>
        </section>

        <section
          id="calculadoras"
          className="border-y bg-muted/50 scroll-mt-16"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary">Calculadoras</Badge>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Las cuentas que importan, en un solo lugar
              </h2>
              <p className="max-w-2xl text-pretty text-muted-foreground">
                Dos herramientas esenciales para entender el coste real de una
                hipoteca y el potencial de tus ahorros antes de firmar o
                invertir.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card id="hipoteca" className="scroll-mt-24">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                      <Home />
                    </div>
                    <Badge variant="secondary">Hipotecas</Badge>
                  </div>
                  <CardTitle className="pt-1 text-lg">
                    Calculadora de pagos de hipoteca
                  </CardTitle>
                  <CardDescription>
                    Descubre tu cuota mensual y cuánto pagarás en intereses a lo
                    largo de toda la vida del préstamo.
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                  <ul className="flex flex-col gap-2.5">
                    {mortgageFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-card-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-card-foreground/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Separator className="bg-card-foreground/10" />

                  <div className="grid grid-cols-3 gap-3">
                    {mortgageOutputs.map((output) => (
                      <div
                        key={output.label}
                        className="flex flex-col gap-1 rounded-lg bg-card-foreground/5 p-3"
                      >
                        <span className="text-[0.7rem] font-medium text-card-foreground/60 uppercase">
                          {output.label}
                        </span>
                        <span className="font-heading text-base font-medium text-card-foreground">
                          Resultado claro
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card id="interes-compuesto" className="scroll-mt-24">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                      <TrendingUp />
                    </div>
                    <Badge variant="secondary">Ahorro</Badge>
                  </div>
                  <CardTitle className="pt-1 text-lg">
                    Calculadora de interés compuesto
                  </CardTitle>
                  <CardDescription>
                    Comprueba cómo crece tu dinero con el tiempo y cuánto puedes
                    ganar dejando que el interés compuesto trabaje a tu favor.
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                  <ul className="flex flex-col gap-2.5">
                    {compoundFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-card-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-card-foreground/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Separator className="bg-card-foreground/10" />

                  <div className="grid grid-cols-3 gap-3">
                    {compoundOutputs.map((output) => (
                      <div
                        key={output.label}
                        className="flex flex-col gap-1 rounded-lg bg-card-foreground/5 p-3"
                      >
                        <span className="text-[0.7rem] font-medium text-card-foreground/60 uppercase">
                          {output.label}
                        </span>
                        <span className="font-heading text-base font-medium text-card-foreground">
                          Proyección clara
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="por-que-fincalc" className="scroll-mt-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge variant="secondary">Ventajas</Badge>
              <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                ¿Por qué FinCalc?
              </h2>
              <p className="max-w-2xl text-pretty text-muted-foreground">
                Pensado para que cualquiera entienda sus finanzas sin cursos,
                hojas de cálculo ni tarifas ocultas.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {valueProps.map((prop) => (
                <Card key={prop.title} size="sm">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <prop.icon />
                    </div>
                    <CardTitle className="pt-1">{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-card-foreground/80">
                      {prop.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card text-card-foreground">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6">
            <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Toma el control de tus finanzas hoy
            </h2>
            <p className="max-w-xl text-pretty text-card-foreground/80">
              Convierte la incertidumbre en números claros y fija el rumbo de tu
              hipoteca y de tus ahorros.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/mortgage-repayments-calculator">
                  <Home data-icon="inline-start" />
                  Calcula tu hipoteca
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#interes-compuesto">
                  <TrendingUp data-icon="inline-start" />
                  Probar interés compuesto
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <span className="flex size-7 items-center justify-center rounded-lg bg-card text-card-foreground">
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
