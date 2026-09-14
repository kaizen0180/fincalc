import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const checks = [
  {
    file: path.join(root, 'src/app/globals.css'),
    name: 'global design tokens',
    validator: (content) => /--surface-card:\s*#FFC0CB/i.test(content),
    message: 'Debe existir el token --surface-card con el valor #FFC0CB en src/app/globals.css.',
  },
  {
    file: path.join(root, 'src/app/page.tsx'),
    name: 'home page design',
    validator: (content) => !/#FFC0CB|bg-\[#FFC0CB\]/i.test(content),
    message: 'No se debe usar el color directo #FFC0CB en componentes JSX; usa el token centralizado.',
  },
  {
    file: path.join(root, 'src/app/test/page.tsx'),
    name: 'test page design',
    validator: (content) => !/#FFC0CB|bg-\[#FFC0CB\]/i.test(content),
    message: 'La ruta /test debe usar el token centralizado y no un color hardcodeado.',
  },
];

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    throw new Error(`Falta el archivo requerido: ${check.file}`);
  }

  const content = fs.readFileSync(check.file, 'utf8');
  if (!check.validator(content)) {
    throw new Error(`${check.name}: ${check.message}`);
  }
}

console.log('✅ Reglas de diseño validadas: token centralizado #FFC0CB y sin hardcode en páginas.');
