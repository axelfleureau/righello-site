/**
 * Il foglio, il modulo, la conferma e la barra del telefono si scaricano a parte, dopo il caricamento della pagina. Ma SvelteKit
 * mette comunque i loro fogli di stile nell'intestazione di OGNI pagina (come `<link rel="stylesheet">`, che blocca il primo
 * disegno) per evitare uno sfarfallio. Il CSS di quei pezzi serve solo quando il pezzo arriva, e quando arriva lo carica
 * il pacchetto stesso (l'`import()` aspetta i suoi fogli di stile): quindi fuori dalla pagina /contatti, che il modulo lo
 * disegna gia' sul server, quei link si tolgono.
 */
const LAZY_CONTACT_CSS = /<link href="[^"]*\/assets\/(?:ContactSheetBody|ContactForm|CxButton|ContactBar)\.[\w-]+\.css" rel="stylesheet">/g;

export function stripLazyContactCss(html: string, path: string): string {
  if (path === '/contatti') return html;
  return html.replace(LAZY_CONTACT_CSS, '');
}
