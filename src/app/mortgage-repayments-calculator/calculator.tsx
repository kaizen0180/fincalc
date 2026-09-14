"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function MortgageCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [termValue, setTermValue] = useState("");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");

  const result = useMemo(() => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const term = parseFloat(termValue);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(term)) {
      return null;
    }

    if (principal <= 0 || annualRate < 0 || term <= 0) {
      return null;
    }

    const totalMonths = termUnit === "years" ? term * 12 : term;
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment: number;

    if (monthlyRate === 0) {
      monthlyPayment = principal / totalMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyPayment = (principal * (monthlyRate * factor)) / (factor - 1);
    }

    const totalPaid = monthlyPayment * totalMonths;
    const totalInterest = totalPaid - principal;

    return {
      monthlyPayment,
      totalInterest,
      totalPaid,
    };
  }, [amount, rate, termValue, termUnit]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Datos del préstamo</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="mortgage-amount">
                Monto del préstamo
              </FieldLabel>
              <Input
                id="mortgage-amount"
                type="number"
                min="0"
                step="1000"
                placeholder="150000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="mortgage-rate">
                Tasa de interés anual (%)
              </FieldLabel>
              <Input
                id="mortgage-rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="3.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="mortgage-term">
                Plazo del préstamo
              </FieldLabel>
              <div className="flex gap-2">
                <Input
                  id="mortgage-term"
                  type="number"
                  min="1"
                  placeholder="25"
                  className="flex-1"
                  value={termValue}
                  onChange={(e) => setTermValue(e.target.value)}
                />
                <ToggleGroup
                  spacing={2}
                  type="single"
                  value={termUnit}
                  onValueChange={(value) => {
                    if (value === "years" || value === "months") {
                      setTermUnit(value);
                    }
                  }}
                >
                  <ToggleGroupItem value="years">Años</ToggleGroupItem>
                  <ToggleGroupItem value="months">Meses</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex w-full flex-col gap-4 lg:w-72">
        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
              <span className="text-xs font-medium uppercase text-muted-foreground">
                Pago mensual
              </span>
              <span className="font-heading text-2xl font-semibold text-foreground">
                {result ? currencyFormatter.format(result.monthlyPayment) : "—"}
              </span>
            </div>

            <Separator />

            <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
              <span className="text-xs font-medium uppercase text-muted-foreground">
                Interés total
              </span>
              <span className="font-heading text-lg font-medium text-foreground">
                {result ? currencyFormatter.format(result.totalInterest) : "—"}
              </span>
            </div>

            <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
              <span className="text-xs font-medium uppercase text-muted-foreground">
                Total a pagar
              </span>
              <span className="font-heading text-lg font-medium text-foreground">
                {result ? currencyFormatter.format(result.totalPaid) : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
