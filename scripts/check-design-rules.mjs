import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const checks = [
  {
    file: path.join(root, "src/app/page.tsx"),
    name: "home page design",
    validator: (content) => !/bg-\[#[0-9a-fA-F]+\]/i.test(content),
    message:
      "No se deben usar colores hardcodeados en componentes JSX; usa tokens de diseño.",
  },
  {
    file: path.join(root, "src/app/test/page.tsx"),
    name: "test page design",
    validator: (content) => !/bg-\[#[0-9a-fA-F]+\]/i.test(content),
    message:
      "No se deben usar colores hardcodeados en componentes JSX; usa tokens de diseño.",
  },
];

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    throw new Error(`Falta el archivo requerido: ${check.file}`);
  }

  const content = fs.readFileSync(check.file, "utf8");
  if (!check.validator(content)) {
    throw new Error(`${check.name}: ${check.message}`);
  }
}

console.log(
  "✅ Reglas de diseño validadas: sin colores hardcodeados en páginas.",
);
