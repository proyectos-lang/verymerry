// Genera dist/ para Vercel: copia los .dc.html a nombres limpios (sin espacios)
// y arrastra los archivos que las paginas piden por ruta relativa.
// Todo queda plano en la raiz de dist/ porque los .dc.html referencian
// "./support.js" y "assets/..." — moverlos a subcarpetas romperia esas rutas.
import { cp, mkdir, rm, copyFile } from 'node:fs/promises';

const OUT = 'dist';

const PAGES = [
  ['Very Merry Tienda Prototipo.dc.html', 'index.html'],  // /
  ['Very Merry Panel Admin.dc.html', 'admin.html'],       // /admin
  ['Very Merry Tienda.dc.html', 'diseno.html'],           // /diseno
];

const SUPPORT = [
  'support.js',
  'image-slot.js',
  '.image-slots.state.json',
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const [src, dest] of PAGES) {
  await copyFile(src, `${OUT}/${dest}`);
  console.log(`  ${src}  ->  ${dest}`);
}

for (const file of SUPPORT) {
  await copyFile(file, `${OUT}/${file}`);
  console.log(`  ${file}`);
}

await cp('assets', `${OUT}/assets`, { recursive: true });
console.log('  assets/');

console.log(`\nBuild listo en ${OUT}/`);
