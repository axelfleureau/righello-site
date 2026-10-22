import { internationalDigits, telHref } from './contact-validation';
import type { LeadAnalysis } from './contact-analysis';

const SITE_URL = 'https://www.wearerighello.com';
const LOGO_WHITE_URL = `${SITE_URL}/logo-white.png`;
const EMAIL_ASSET_URL = `${SITE_URL}/email`;
const FONT_REGULAR_URL = `${SITE_URL}/fonts/DegularDisplay-Regular_1768475446675.woff2`;
const FONT_SEMIBOLD_URL = `${SITE_URL}/fonts/DegularDisplay-Semibold_1768475446675.woff2`;
const FONT_BOLD_URL = `${SITE_URL}/fonts/DegularDisplay-Bold_1768475446675.woff2`;
const BRAND_BLACK = '#050505';
const BRAND_PINK = '#D6487E';
const BRAND_CYAN = '#06B6D4';
const TEXT_MAIN = '#202020';
const PANEL_BG = '#F6F6F6';
const PANEL_BORDER = '#E9E9E9';
const SOFT_PINK = '#FFF3F7';
const SOFT_CYAN = '#EEFDFE';
const PRIVACY_URL = 'https://www.iubenda.com/privacy-policy/47301653';



/** Da dove arriva il contatto: il client lo manda, il server lo ripulisce, la mail al team lo mostra. */
export interface ContactSource {
  path: string;
  cta?: string;
  from?: string;
  referrer?: string;
  utm?: { source?: string; medium?: string; campaign?: string; term?: string; content?: string };
}

export interface ContactForm {
  name: string;
  /** Vuota se il visitatore ha lasciato solo il telefono. */
  email: string;
  /** Vuoto se il visitatore ha lasciato solo l'email. */
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  /** Codice `RH-XXXXXX`: nell'oggetto e nel corpo di entrambe le mail. */
  reference: string;
  source?: ContactSource;
}

export interface LeadPriority {
  label: string;
  color: string;
  bg: string;
}

/** Cio' che le mail dicono dei canali di Righello: arriva da `$lib/data/contact` (una sola sorgente), mai scritto qui. */
export interface EmailChannels {
  /** "entro 72 ore lavorative" */
  reply: string;
  /** Indirizzo da dare a chi non riesce a inviare il modulo. */
  email: string;
  /** Link WhatsApp di Righello con il testo gia' scritto. */
  whatsappHref: (text: string) => string;
}

interface ShellOptions {
  preheader: string;
  eyebrow: string;
  title: string;
  intro?: string;
  body: string;
  footerNote?: string;
}

type EmailIconName = 'reply' | 'map' | 'target' | 'clock' | 'spark';

export function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(str: string): string {
  return escHtml(str).replace(/`/g, '&#96;');
}


export function buildClientSubject(form: ContactForm): string {
  return `${form.name}, abbiamo ricevuto la tua richiesta (${form.reference}) - Righello`;
}

export function buildTeamSubject(form: ContactForm, priority: LeadPriority): string {
  return `[${form.reference}] ${priority.label} | Nuovo contatto: ${form.name}${form.company ? ` - ${form.company}` : ''}`;
}

function compact(value: string | undefined, fallback = 'Non indicato'): string {
  const cleaned = value?.trim();
  return cleaned ? cleaned : fallback;
}

function paragraphsFromText(text: string, fallback: string): string {
  const source = text.trim() || fallback;
  return source
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p class="rh-copy" style="margin:0 0 16px 0;font-size:17px;line-height:1.72;color:${TEXT_MAIN};font-weight:400;">${escHtml(p)}</p>`)
    .join('');
}

function detailRow(label: string, value: string, accent = false, href?: string): string {
  return `
    <tr>
      <td class="rh-detail-row" style="padding:14px 0;border-bottom:1px solid #EEEEEE;">
        <div class="rh-muted" style="font-size:11px;line-height:1.2;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">${escHtml(label)}</div>
        <div class="rh-detail-value" style="margin-top:6px;font-size:15px;line-height:1.5;color:${accent ? BRAND_PINK : '#202020'};font-weight:${accent ? '700' : '500'};">${href ? `<a href="${escAttr(href)}" style="color:inherit;text-decoration:none;border-bottom:1px solid ${BRAND_PINK};">${escHtml(value)}</a>` : escHtml(value)}</div>
      </td>
    </tr>`;
}

function brandBadge(label: string, color = BRAND_PINK): string {
  return `<span class="rh-badge" style="display:inline-block;border:1px solid ${color};border-radius:999px;padding:6px 10px;font-size:10px;line-height:1;color:${color};text-transform:uppercase;letter-spacing:0.12em;font-weight:800;">${escHtml(label)}</span>`;
}

function emailIcon(name: EmailIconName, alt: string, size = 38): string {
  return `<img src="${EMAIL_ASSET_URL}/icon-${name}.png" width="${size}" height="${size}" alt="${escAttr(alt)}" style="display:block;width:${size}px;height:${size}px;border:0;outline:none;text-decoration:none;">`;
}

function summaryCell(label: string, value: string, color = BRAND_PINK, icon?: EmailIconName): string {
  return `
    <td class="rh-summary-col" width="33.33%" valign="top" style="padding:15px 18px;">
      ${icon ? `<div style="margin:0 0 10px 0;">${emailIcon(icon, '', 30)}</div>` : ''}
      <div class="rh-muted" style="font-size:10px;line-height:1.2;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.1em;font-weight:800;">${escHtml(label)}</div>
      <div style="margin-top:6px;font-size:15px;line-height:1.25;color:${color};font-weight:800;">${escHtml(value)}</div>
    </td>`;
}

function summaryStrip(items: Array<{ label: string; value: string; color?: string; icon?: EmailIconName }>): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-summary" style="margin:0 0 24px 0;background:#FFFFFF;border:1px solid ${PANEL_BORDER};border-radius:18px;box-shadow:0 10px 28px rgba(0,0,0,0.04);">
      <tr>
        ${items.map((item) => summaryCell(item.label, item.value, item.color, item.icon)).join('')}
      </tr>
    </table>`;
}

function processStep(index: string, title: string, text: string, color = BRAND_PINK): string {
  return `
    <tr>
      <td width="40" valign="top" style="padding:0 14px 18px 0;">
        <div style="width:34px;height:34px;border-radius:999px;background:${color};color:#FFFFFF;text-align:center;font-size:13px;line-height:34px;font-weight:800;">${escHtml(index)}</div>
      </td>
      <td valign="top" style="padding:0 0 18px 0;">
        <div style="font-size:16px;line-height:1.25;color:#FFFFFF;font-weight:800;">${escHtml(title)}</div>
        <div class="rh-dark-muted" style="margin-top:5px;font-size:14px;line-height:1.55;color:#CFCFCF;">${escHtml(text)}</div>
      </td>
    </tr>`;
}

function ctaButton(href: string, label: string, variant: 'primary' | 'dark' = 'primary'): string {
  const bg = variant === 'dark' ? BRAND_BLACK : BRAND_PINK;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr>
        <td align="center" style="border-radius:999px;background:${bg};">
          <a href="${escAttr(href)}" style="display:inline-block;padding:14px 22px;color:#FFFFFF;text-decoration:none;font-size:14px;line-height:1;font-weight:700;border-radius:999px;">${escHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}


function emailShell(options: ShellOptions): string {
  const intro = options.intro
    ? `<p class="rh-intro" style="margin:0 0 22px 0;font-size:17px;line-height:1.55;color:#4A4A4A;">${escHtml(options.intro)}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escHtml(options.title)}</title>
  <style>
    @font-face {
      font-family: 'Degular Display';
      src: url('${FONT_REGULAR_URL}') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Degular Display';
      src: url('${FONT_SEMIBOLD_URL}') format('woff2');
      font-weight: 600;
      font-style: normal;
    }
    @font-face {
      font-family: 'Degular Display';
      src: url('${FONT_BOLD_URL}') format('woff2');
      font-weight: 700;
      font-style: normal;
    }
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    @media only screen and (max-width: 640px) {
      .rh-shell { width: 100% !important; }
      .rh-pad { padding-left: 22px !important; padding-right: 22px !important; }
      .rh-title { font-size: 29px !important; line-height: 1.08 !important; }
      .rh-two-col { display: block !important; width: 100% !important; }
      .rh-summary-col { display: block !important; width: auto !important; padding: 13px 16px !important; }
      .rh-header-eyebrow { display: none !important; }
    }
    @media (prefers-color-scheme: dark) {
      .rh-body, .rh-bg { background: #080808 !important; }
      .rh-card { background: #111111 !important; color: #F4F4F4 !important; box-shadow: none !important; }
      .rh-title, .rh-copy, .rh-detail-value, .rh-soft-copy { color: #F4F4F4 !important; }
      .rh-intro, .rh-muted, .rh-footer-note, .rh-footer-text { color: #BDBDBD !important; }
      .rh-panel, .rh-summary { background: #181818 !important; border-color: #303030 !important; box-shadow: none !important; }
      .rh-detail-row { border-bottom-color: #343434 !important; }
      .rh-message-box { background: #101010 !important; border-color: #2B2B2B !important; color: #EDEDED !important; }
      .rh-soft-cyan { background: #07191B !important; border-color: #0D3D42 !important; }
      .rh-soft-pink, .rh-priority-box { background: #241018 !important; border-color: #4A1D31 !important; }
      .rh-priority-title, .rh-priority-copy { color: #FF8A7A !important; }
      .rh-dark-block { background: #050505 !important; }
      .rh-footer-link { color: #F06A9E !important; }
      .rh-privacy-link { color: #BDBDBD !important; }
    }
    [data-ogsc] .rh-body, [data-ogsc] .rh-bg { background: #080808 !important; }
    [data-ogsc] .rh-card { background: #111111 !important; color: #F4F4F4 !important; box-shadow: none !important; }
    [data-ogsc] .rh-title, [data-ogsc] .rh-copy, [data-ogsc] .rh-detail-value, [data-ogsc] .rh-soft-copy { color: #F4F4F4 !important; }
    [data-ogsc] .rh-intro, [data-ogsc] .rh-muted, [data-ogsc] .rh-footer-note, [data-ogsc] .rh-footer-text { color: #BDBDBD !important; }
    [data-ogsc] .rh-panel, [data-ogsc] .rh-summary { background: #181818 !important; border-color: #303030 !important; box-shadow: none !important; }
    [data-ogsc] .rh-detail-row { border-bottom-color: #343434 !important; }
    [data-ogsc] .rh-message-box { background: #101010 !important; border-color: #2B2B2B !important; color: #EDEDED !important; }
    [data-ogsc] .rh-soft-cyan { background: #07191B !important; border-color: #0D3D42 !important; }
    [data-ogsc] .rh-soft-pink, [data-ogsc] .rh-priority-box { background: #241018 !important; border-color: #4A1D31 !important; }
    [data-ogsc] .rh-priority-title, [data-ogsc] .rh-priority-copy { color: #FF8A7A !important; }
    [data-ogsc] .rh-dark-block { background: #050505 !important; }
    [data-ogsc] .rh-footer-link { color: #F06A9E !important; }
    [data-ogsc] .rh-privacy-link { color: #BDBDBD !important; }
  </style>
</head>
<body class="rh-body" style="margin:0;padding:0;background:#ECECEC;font-family:'Degular Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#202020;">
  <span style="display:none!important;font-size:1px;color:#ECECEC;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escHtml(options.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-bg" style="width:100%;background:#ECECEC;">
    <tr>
      <td align="center" style="padding:34px 14px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" class="rh-shell" style="width:640px;max-width:640px;border-collapse:separate;border-spacing:0;">
          <tr>
            <td style="background:${BRAND_BLACK};border-radius:28px 28px 0 0;padding:0;" class="rh-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:32px 34px 30px 34px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="middle">
                          <img src="${LOGO_WHITE_URL}" width="142" alt="Righello" style="display:block;width:142px;height:auto;border:0;outline:none;text-decoration:none;">
                        </td>
                        <td valign="middle" align="right" class="rh-header-eyebrow" style="font-size:11px;line-height:1.2;color:#D8D8D8;text-transform:uppercase;letter-spacing:0.12em;font-weight:800;">
                          <span style="display:inline-block;border:1px solid rgba(255,255,255,0.18);border-radius:999px;padding:8px 12px;">${escHtml(options.eyebrow)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#FFFFFF;padding:40px 42px 44px 42px;border-radius:0 0 28px 28px;box-shadow:0 18px 60px rgba(0,0,0,0.08);" class="rh-pad rh-card">
              <div style="margin:0 0 18px 0;">${brandBadge('Righello response system')}</div>
              <h1 class="rh-title" style="margin:0 0 14px 0;font-size:34px;line-height:1.05;color:#111111;font-weight:800;letter-spacing:-0.02em;">${escHtml(options.title)}</h1>
              ${intro}
              ${options.body}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 14px 0 14px;text-align:center;">
              <p class="rh-footer-note" style="margin:0 0 10px 0;font-size:13px;line-height:1.5;color:#696969;">${escHtml(options.footerNote || 'Righello S.r.l. - Marketing, advertising e sviluppo digitale.')}</p>
              <p class="rh-footer-text" style="margin:0;font-size:12px;line-height:1.6;color:#8A8A8A;">
                Sede legale Pordenone · Base operativa Mestre - Venezia · P.IVA 01979970934<br>
                <a href="mailto:hello@wearerighello.com" class="rh-footer-link" style="color:${BRAND_PINK};text-decoration:none;">hello@wearerighello.com</a>
                <span style="color:#BDBDBD;"> · </span>
                <a href="${SITE_URL}" class="rh-footer-link" style="color:${BRAND_PINK};text-decoration:none;">wearerighello.com</a>
                <span style="color:#BDBDBD;"> · </span>
                <a href="${PRIVACY_URL}" class="rh-privacy-link" style="color:#8A8A8A;text-decoration:underline;">Privacy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function sourceRows(source: ContactForm['source']): Array<[string, string]> {
  if (!source) return [];
  const rows: Array<[string, string]> = [];
  if (source.path) rows.push(['Pagina', source.path]);
  if (source.cta) rows.push(['Pulsante', source.cta]);
  if (source.from) rows.push(['Scheda o servizio di provenienza', source.from]);
  if (source.referrer) rows.push(['Arrivato da', source.referrer]);
  const u = source.utm;
  if (u) {
    const campaign = [u.source, u.medium, u.campaign].filter(Boolean).join(' / ');
    const extra = [u.term && `termine: ${u.term}`, u.content && `contenuto: ${u.content}`].filter(Boolean).join(', ');
    const value = [campaign, extra].filter(Boolean).join(' - ');
    if (value) rows.push(['Campagna', value]);
  }
  return rows;
}

/** Recapiti cliccabili del contatto: email, telefono, WhatsApp (solo se il numero si legge con sicurezza). */
function replyLinks(form: ContactForm): Array<{ label: string; value: string; href: string }> {
  const links: Array<{ label: string; value: string; href: string }> = [];
  if (form.email) {
    links.push({
      label: 'Email',
      value: form.email,
      href: `mailto:${form.email}?subject=${encodeURIComponent(`Re: la tua richiesta a Righello (${form.reference})`)}`,
    });
  }
  if (form.phone) {
    links.push({ label: 'Telefono', value: form.phone, href: telHref(form.phone) });
    const wa = internationalDigits(form.phone);
    if (wa) {
      const text = `Ciao ${form.name}, siamo Righello: ti scriviamo per la tua richiesta ${form.reference}.`;
      links.push({ label: 'WhatsApp', value: form.phone, href: `https://wa.me/${wa}?text=${encodeURIComponent(text)}` });
    }
  }
  return links;
}

export function buildClientEmailHtml(form: ContactForm, enhancedBody: string, channels: EmailChannels): string {
  const fallbackBody = [
    `Ciao ${form.name}, grazie per averci scritto.`,
    `Abbiamo ricevuto la tua richiesta${form.service ? ` su ${form.service}` : ''}. Una persona del team la legge e ti risponde ${channels.reply}${form.email ? ` all’indirizzo ${form.email}` : ''}.`,
  ].join('\n\n');

  const summary: Array<[string, string]> = [];
  if (form.service) summary.push(['Cosa serve', form.service]);
  if (form.company) summary.push(['Azienda', form.company]);
  if (form.budget) summary.push(['Budget indicativo', form.budget]);
  summary.push(['Recapito', form.email || form.phone]);
  const summaryRows = summary.map(([label, value]) => detailRow(label, value)).join('');
  const waText = `Ciao, ho inviato una richiesta dal sito (riferimento ${form.reference}).`;

  const body = `
    ${paragraphsFromText(enhancedBody, fallbackBody)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-soft-pink" style="margin:6px 0 24px 0;background:${SOFT_PINK};border:1px solid #F5D6E2;border-radius:20px;">
      <tr>
        <td style="padding:20px 22px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_PINK};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:8px;">Il tuo codice di riferimento</div>
          <div class="rh-priority-title" style="font-size:30px;line-height:1.1;color:${BRAND_PINK};font-weight:800;letter-spacing:0.06em;">${escHtml(form.reference)}</div>
          <p class="rh-soft-copy" style="margin:10px 0 0 0;font-size:14px;line-height:1.55;color:${TEXT_MAIN};">Se ci scrivi su WhatsApp o per email, indicalo: ritroviamo subito la tua richiesta.</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-panel" style="margin:0 0 24px 0;background:${PANEL_BG};border-radius:22px;border:1px solid ${PANEL_BORDER};">
      <tr>
        <td style="padding:24px 24px 18px 24px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_PINK};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:10px;">Riepilogo richiesta</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${summaryRows}
            ${
              form.message
                ? `<tr>
              <td style="padding:14px 0 0 0;">
                <div class="rh-muted" style="font-size:11px;line-height:1.2;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Messaggio</div>
                <p class="rh-copy" style="margin:8px 0 0 0;font-size:15px;line-height:1.6;color:#303030;white-space:pre-line;">${escHtml(form.message)}</p>
              </td>
            </tr>`
                : ''
            }
          </table>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-dark-block" style="margin:0 0 26px 0;background:${BRAND_BLACK};border-radius:24px;">
      <tr>
        <td style="padding:26px 26px 8px 26px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:18px;">Cosa succede ora</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${processStep('1', 'Lettura', 'Una persona del team legge la tua richiesta, non un automatismo.')}
            ${processStep('2', 'Risposta', `Ti rispondiamo ${channels.reply}${form.email ? ` all’indirizzo ${form.email}` : ''}.`, BRAND_CYAN)}
            ${processStep('3', 'Prossimo passo', 'Se serve, fissiamo una chiamata breve per capire priorità e tempi.', BRAND_PINK)}
          </table>
        </td>
      </tr>
    </table>
    ${ctaButton(channels.whatsappHref(waText), 'Scrivici su WhatsApp')}
    <p class="rh-soft-copy" style="margin:16px 0 0 0;font-size:13px;line-height:1.5;color:#696969;text-align:center;">Non hai inviato tu questa richiesta? Rispondi a questa email e la cancelliamo.</p>
  `;

  return emailShell({
    preheader: `Abbiamo ricevuto la tua richiesta (${form.reference}). Il team Righello ti risponde ${channels.reply}.`,
    eyebrow: 'Richiesta ricevuta',
    title: 'Richiesta ricevuta.',
    intro: `Grazie per averci contattato. Il tuo riferimento è ${form.reference}.`,
    body,
  });
}

export function buildClientEmailText(form: ContactForm, enhancedBody: string, channels: EmailChannels): string {
  const body =
    enhancedBody.trim() ||
    `Ciao ${form.name}, grazie per averci scritto. Abbiamo ricevuto la tua richiesta: una persona del team la legge e ti risponde ${channels.reply}${form.email ? ` all’indirizzo ${form.email}` : ''}.`;
  return [
    `Righello - richiesta ricevuta (${form.reference})`,
    '',
    body,
    '',
    `Il tuo codice di riferimento: ${form.reference}`,
    'Se ci scrivi su WhatsApp o per email, indicalo: ritroviamo subito la tua richiesta.',
    '',
    'Riepilogo richiesta',
    form.service ? `Cosa serve: ${form.service}` : '',
    form.company ? `Azienda: ${form.company}` : '',
    form.budget ? `Budget indicativo: ${form.budget}` : '',
    `Recapito: ${form.email || form.phone}`,
    form.message ? `Messaggio: ${form.message}` : '',
    '',
    'Cosa succede ora',
    '1. Una persona del team legge la tua richiesta.',
    `2. Ti rispondiamo ${channels.reply}${form.email ? ` all’indirizzo ${form.email}` : ''}.`,
    '3. Se serve, fissiamo una chiamata breve.',
    '',
    `WhatsApp: ${channels.whatsappHref(`Ciao, ho inviato una richiesta dal sito (riferimento ${form.reference}).`)}`,
    `Progetti Righello: ${SITE_URL}/progetti`,
    'Non hai inviato tu questa richiesta? Rispondi a questa email e la cancelliamo.',
  ]
    .filter((line, i, all) => line !== '' || all[i - 1] !== '')
    .join('\n');
}

export function buildTeamEmailHtml(form: ContactForm, analysis: LeadAnalysis): string {
  const { priority, window: actionWindow } = analysis;
  const now = new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const links = replyLinks(form);
  const wa = links.find((l) => l.label === 'WhatsApp');
  const rows = [
    detailRow('Ricevuto', now),
    detailRow('Codice', form.reference, true),
    detailRow('Nome', form.name),
    ...links.map((l) => detailRow(l.label, l.value, l.label === 'Email' || (l.label === 'Telefono' && !form.email), l.href)),
    detailRow('Azienda', compact(form.company)),
    detailRow('Area richiesta', compact(form.service)),
    detailRow('Budget indicativo', compact(form.budget), Boolean(form.budget)),
  ].join('');

  const origin = sourceRows(form.source);
  const originHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-panel" style="margin:22px 0 0 0;background:${PANEL_BG};border-radius:22px;border:1px solid ${PANEL_BORDER};">
      <tr>
        <td style="padding:22px 24px 10px 24px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:4px;">Da dove arriva</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${origin.length ? origin.map(([label, value]) => detailRow(label, value)).join('') : detailRow('Provenienza', 'Non indicata (richiesta senza dati di provenienza)')}
          </table>
        </td>
      </tr>
    </table>`;

  const analysisHtml = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-dark-block" style="margin:22px 0 0 0;background:#050505;border-radius:22px;">
        <tr>
          <td style="padding:24px;">
            <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:12px;">Analisi operativa</div>
            ${analysis.lines.map((line) => `<p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#F4F4F4;">${escHtml(line)}</p>`).join('')}
          </td>
        </tr>
      </table>`;

  const quickLinks = links
    .map((l) => `<a href="${escAttr(l.href)}" style="color:#FFFFFF;text-decoration:underline;font-size:15px;line-height:1.6;font-weight:600;">${escHtml(l.label === 'Email' ? l.value : `${l.label} ${l.value}`)}</a>`)
    .join('<span style="color:#8A8A8A;"> &nbsp;·&nbsp; </span>');

  const buttons = [
    form.email ? { href: links.find((l) => l.label === 'Email')!.href, label: 'Rispondi per email', variant: 'primary' as const } : null,
    wa ? { href: wa.href, label: 'Scrivi su WhatsApp', variant: form.email ? ('dark' as const) : ('primary' as const) } : null,
    form.phone ? { href: telHref(form.phone), label: 'Chiama', variant: 'dark' as const } : null,
  ].filter((b): b is { href: string; label: string; variant: 'primary' | 'dark' } => b !== null);

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-dark-block" style="margin:0 0 24px 0;background:${BRAND_BLACK};border-radius:24px;">
      <tr>
        <td style="padding:24px 26px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:10px;">Lead cockpit</div>
          <div style="font-size:24px;line-height:1.1;color:#FFFFFF;font-weight:800;">${escHtml(priority.label)} <span style="color:${BRAND_PINK};letter-spacing:0.06em;">${escHtml(form.reference)}</span></div>
          <div style="margin-top:12px;font-size:19px;line-height:1.25;color:#FFFFFF;font-weight:700;">${escHtml(form.name)}${form.company ? ` <span style="color:#BDBDBD;font-weight:500;">· ${escHtml(form.company)}</span>` : ''}</div>
          <div style="margin-top:8px;">${quickLinks}</div>
          <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:#D8D8D8;">Rispondere ${escHtml(actionWindow)} con una domanda mirata e una proposta di chiamata breve.</p>
        </td>
      </tr>
    </table>
    ${summaryStrip([
      { label: 'Priorità', value: priority.label, color: priority.color, icon: 'target' },
      { label: 'Risposta', value: actionWindow, icon: 'clock' },
      { label: 'Codice', value: form.reference, color: BRAND_CYAN, icon: 'spark' },
    ])}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px 0;">
      <tr>
        <td class="rh-priority-box" style="padding:18px 20px;border-radius:20px;background:${priority.bg};border:1px solid rgba(0,0,0,0.04);">
          <div class="rh-priority-title" style="font-size:11px;line-height:1.2;color:${priority.color};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;">Azione consigliata</div>
          <div class="rh-priority-copy" style="margin-top:7px;font-size:18px;line-height:1.35;color:${priority.color};font-weight:800;">Rispondere ${escHtml(actionWindow)}${form.email ? ' per email' : ' al telefono o su WhatsApp'}, con una domanda mirata e una chiamata breve.</div>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-panel" style="background:${PANEL_BG};border-radius:22px;border:1px solid ${PANEL_BORDER};">
      <tr>
        <td style="padding:10px 24px 24px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rows}
            <tr>
              <td style="padding:16px 0 0 0;">
                <div class="rh-muted" style="font-size:11px;line-height:1.2;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Messaggio</div>
                <p class="rh-message-box" style="margin:8px 0 0 0;font-size:15px;line-height:1.6;color:#303030;background:#FFFFFF;border-radius:16px;padding:18px;border:1px solid #EEEEEE;white-space:pre-line;">${form.message ? escHtml(form.message) : 'Nessun messaggio: ha scelto solo il tema.'}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${originHtml}
    ${analysisHtml}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-soft-pink" style="margin:22px 0 0 0;background:${SOFT_PINK};border:1px solid #F5D6E2;border-radius:20px;">
      <tr>
        <td style="padding:20px 22px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_PINK};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:10px;">Primo messaggio utile</div>
          <p class="rh-soft-copy" style="margin:0;font-size:15px;line-height:1.6;color:${TEXT_MAIN};">Ciao ${escHtml(form.name)}, grazie per il messaggio (${escHtml(form.reference)}). Abbiamo letto il contesto e ti proponiamo una chiamata breve per capire obiettivi, priorità e prossimi passi.</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0 0 0;">
      ${buttons.map((b) => `<tr><td align="center" style="padding-bottom:12px;">${ctaButton(b.href, b.label, b.variant)}</td></tr>`).join('')}
    </table>
  `;

  return emailShell({
    preheader: `${form.reference} · ${priority.label} · ${form.name}${form.company ? `, ${form.company}` : ''}${form.service ? ` · ${form.service}` : ''}`,
    eyebrow: 'Nuovo lead',
    title: 'Nuovo lead dal sito.',
    intro: 'Codice, priorità, recapito e provenienza: tutto per rispondere senza perdere contesto.',
    body,
    footerNote: 'Notifica interna generata dal sito Righello.',
  });
}

export function buildTeamEmailText(form: ContactForm, analysis: LeadAnalysis): string {
  const links = replyLinks(form);
  const origin = sourceRows(form.source);
  return [
    `[${form.reference}] Nuova richiesta dal sito - ${analysis.priority.label}`,
    '',
    `Nome: ${form.name}`,
    form.email ? `Email: ${form.email}` : '',
    form.phone ? `Telefono: ${form.phone}` : '',
    `Azienda: ${compact(form.company)}`,
    `Area richiesta: ${compact(form.service)}`,
    `Budget indicativo: ${compact(form.budget)}`,
    '',
    'Messaggio:',
    form.message || '(nessun messaggio: ha scelto solo il tema)',
    '',
    'Da dove arriva:',
    ...(origin.length ? origin.map(([label, value]) => `${label}: ${value}`) : ['Non indicata']),
    '',
    `Analisi operativa:\n${analysis.lines.join('\n')}`,
    '',
    'Come rispondere:',
    ...links.map((l) => `${l.label}: ${l.href}`),
  ]
    .filter((line, i, all) => line !== '' || all[i - 1] !== '')
    .join('\n');
}

export function buildPreviewContactForm(): ContactForm {
  return {
    name: 'Marco Bianchi',
    email: 'axel@wearerighello.com',
    phone: '+39 333 123 4567',
    company: 'Nordest Components S.r.l.',
    service: 'Sviluppo Web & Software',
    budget: '10.000€ - 25.000€',
    message:
      'Vorremmo rifare il sito aziendale e capire come automatizzare preventivi, richieste commerciali e gestione dei contatti. Cerchiamo un partner che ci aiuti a mettere ordine nei processi e a trasformare il sito in uno strumento commerciale concreto.',
    reference: 'RH-7K2M9Q',
    source: { path: '/progetti/tetha', cta: 'chiusura-pagina', from: 'tetha', referrer: 'https://www.google.com/', utm: { source: 'google', medium: 'cpc', campaign: 'sito-aziendale' } },
  };
}
