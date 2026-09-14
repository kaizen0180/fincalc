import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function TestPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Página de prueba</CardTitle>
          <CardDescription>
            Ruta temporal para validar los componentes de la interfaz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" size="sm">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
