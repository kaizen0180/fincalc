"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type CompoundingFrequency = "annually" | "quarterly" | "monthly" | "daily";

const compoundingPeriods: Record<CompoundingFrequency, number> = {
  annually: 1,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [rate, setRate] = useState("");
  const [frequency, setFrequency] = useState<CompoundingFrequency>("monthly");
  const [termValue, setTermValue] = useState("");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");

  const result = useMemo(() => {
    const principal = parseFloat(initialAmount);
    const contribution = parseFloat(monthlyContribution);
    const annualRate = parseFloat(rate);
    const term = parseFloat(termValue);

    if (
      isNaN(principal) ||
      isNaN(contribution) ||
      isNaN(annualRate) ||
      isNaN(term)
    ) {
      return null;
    }

    if (
      principal < 0 ||
      contribution < 0 ||
      annualRate < 0 ||
      term <= 0 ||
      (principal === 0 && contribution === 0)
    ) {
      return null;
    }

    const totalMonths = termUnit === "years" ? term * 12 : term;

    if (totalMonths <= 0) {
      return null;
    }

    const periodsPerYear = compoundingPeriods[frequency];
    const nominal = annualRate / 100;
    const annualFactor =
      periodsPerYear === 0
        ? 1
        : Math.pow(1 + nominal / periodsPerYear, periodsPerYear);
    const monthlyFactor = Math.pow(annualFactor, 1 / 12);

    let balance = principal;
    const yearlyRows: Array<{
      year: number;
      contributed: number;
      interest: number;
      balance: number;
    }> = [];

    for (let month = 1; month <= totalMonths; month++) {
      balance += contribution;
      balance *= monthlyFactor;

      if (month % 12 === 0 || month === totalMonths) {
        yearlyRows.push({
          year: month / 12,
          contributed: principal + contribution * month,
          interest: balance - (principal + contribution * month),
          balance,
        });
      }
    }

    const totalContributed = principal + contribution * totalMonths;

    return {
      finalBalance: balance,
      totalContributed,
      totalInterest: balance - totalContributed,
      yearlyRows,
    };
  }, [
    initialAmount,
    monthlyContribution,
    rate,
    frequency,
    termValue,
    termUnit,
  ]);

  const handleFrequencyChange = (value: string) => {
    if (
      value === "annually" ||
      value === "quarterly" ||
      value === "monthly" ||
      value === "daily"
    ) {
      setFrequency(value);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos de la inversión</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="compound-initial-amount">
                  Capital inicial
                </FieldLabel>
                <Input
                  id="compound-initial-amount"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="10000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="compound-monthly-contribution">
                  Aporte mensual
                </FieldLabel>
                <Input
                  id="compound-monthly-contribution"
                  type="number"
                  min="0"
                  step="50"
                  placeholder="200"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="compound-rate">
                  Tasa de interés anual (%)
                </FieldLabel>
                <Input
                  id="compound-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="5"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="compound-frequency">
                  Frecuencia de capitalización
                </FieldLabel>
                <ToggleGroup
                  id="compound-frequency"
                  spacing={2}
                  type="single"
                  value={frequency}
                  onValueChange={handleFrequencyChange}
                >
                  <ToggleGroupItem value="annually">Anual</ToggleGroupItem>
                  <ToggleGroupItem value="quarterly">
                    Trimestral
                  </ToggleGroupItem>
                  <ToggleGroupItem value="monthly">Mensual</ToggleGroupItem>
                  <ToggleGroupItem value="daily">Diaria</ToggleGroupItem>
                </ToggleGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="compound-term">Plazo</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="compound-term"
                    type="number"
                    min="1"
                    placeholder="10"
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
                  Saldo final
                </span>
                <span className="font-heading text-2xl font-semibold text-foreground">
                  {result ? currencyFormatter.format(result.finalBalance) : "—"}
                </span>
              </div>

              <Separator />

              <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Total aportado
                </span>
                <span className="font-heading text-lg font-medium text-foreground">
                  {result
                    ? currencyFormatter.format(result.totalContributed)
                    : "—"}
                </span>
              </div>

              <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Interés ganado
                </span>
                <span className="font-heading text-lg font-medium text-foreground">
                  {result
                    ? currencyFormatter.format(result.totalInterest)
                    : "—"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Proyección año a año</CardTitle>
        </CardHeader>
        <CardContent>
          {result && result.yearlyRows.length > 0 ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Año</TableHead>
                    <TableHead className="text-right">Aportado</TableHead>
                    <TableHead className="text-right">
                      Interés acumulado
                    </TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.yearlyRows.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>
                        {Number.isInteger(row.year)
                          ? row.year
                          : row.year.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {currencyFormatter.format(row.contributed)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {currencyFormatter.format(row.interest)}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {currencyFormatter.format(row.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Completa los datos de la inversión para ver la proyección año a
              año.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
