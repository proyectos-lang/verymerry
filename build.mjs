// Genera dist/ para Vercel: copia los .dc.html a nombres limpios (sin espacios)
// y arrastra los archivos que las paginas piden por ruta relativa.
// Todo queda plano en la raiz de dist/ porque los .dc.html referencian
// "./support.js" y "assets/..." por ruta relativa: moverlos a subcarpetas
// romperia esas rutas.
import { cp, mkdir, rm, copyFile, readFile, writeFile } from 'node:fs/promises';

const OUT = 'dist';

const PAGES = [
  ['Very Merry Tienda Prototipo.dc.html', 'index.html'],  // /
  ['Very Merry Panel Admin.dc.html', 'admin.html'],       // /admin
  ['Very Merry Tienda.dc.html', 'diseno.html'],           // /diseno
];

// image-slot.js y su sidecar .image-slots.state.json ya no se despliegan:
// ninguna pagina los carga. Siguen en el repo porque son parte del entorno
// de edicion en el canvas, no del sitio publicado.
const SUPPORT = ['support.js'];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// Los enlaces entre paginas usan el nombre original del .dc.html, que no existe
// en dist/. Se reescriben al nombre publicado (cleanUrls sirve /admin sin .html).
const LINKS = PAGES.map(([src, dest]) =>
  [src, dest === 'index.html' ? '/' : '/' + dest.slice(0, -5)]);

for (const [src, dest] of PAGES) {
  let html = await readFile(src, 'utf8');
  for (const [from, to] of LINKS) {
    html = html.replaceAll(`href="${from}"`, `href="${to}"`);
  }
  await writeFile(`${OUT}/${dest}`, html);
  console.log(`  ${src}  ->  ${dest}`);
}

for (const file of SUPPORT) {
  await copyFile(file, `${OUT}/${file}`);
  console.log(`  ${file}`);
}

await cp('assets', `${OUT}/assets`, { recursive: true });
console.log('  assets/');

console.log(`\nBuild listo en ${OUT}/`);
