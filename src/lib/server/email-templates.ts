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

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

export interface LeadPriority {
  label: string;
  color: string;
  bg: string;
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

export function getLeadPriority(budget: string): LeadPriority {
  const b = budget.toLowerCase().trim();
  const digits = b.replace(/[^0-9]/g, '');
  const numericValue = digits ? parseInt(digits, 10) : 0;
  const normalizedNum = numericValue < 100 && /k/i.test(b) ? numericValue * 1000 : numericValue;

  if (normalizedNum >= 10000 || /alto|alta|high|premium/i.test(b)) {
    return { label: 'Alta priorità', color: '#B42318', bg: '#FDECEC' };
  }

  if (normalizedNum >= 3000 || /medi[oa]|medium/i.test(b)) {
    return { label: 'Media priorità', color: '#A15C07', bg: '#FFF4D8' };
  }

  return { label: 'Standard', color: '#047857', bg: '#E7F7EF' };
}

export function buildClientSubject(form: ContactForm): string {
  return `${form.name}, abbiamo ricevuto la tua richiesta - Righello`;
}

export function buildTeamSubject(form: ContactForm, priority: LeadPriority): string {
  return `${priority.label} | Nuovo contatto: ${form.name}${form.company ? ` - ${form.company}` : ''}`;
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

function detailRow(label: string, value: string, accent = false): string {
  return `
    <tr>
      <td class="rh-detail-row" style="padding:14px 0;border-bottom:1px solid #EEEEEE;">
        <div class="rh-muted" style="font-size:11px;line-height:1.2;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">${escHtml(label)}</div>
        <div class="rh-detail-value" style="margin-top:6px;font-size:15px;line-height:1.5;color:${accent ? BRAND_PINK : '#202020'};font-weight:${accent ? '700' : '500'};">${escHtml(value)}</div>
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

function featureCell(icon: EmailIconName, title: string, text: string, color = BRAND_PINK): string {
  return `
    <td class="rh-feature-col" width="33.33%" valign="top" style="padding:0 8px 16px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-icon-card" style="background:#FFFFFF;border:1px solid ${PANEL_BORDER};border-radius:20px;box-shadow:0 12px 34px rgba(0,0,0,0.045);">
        <tr>
          <td style="padding:18px 16px 17px 16px;">
            ${emailIcon(icon, '', 40)}
            <div style="margin-top:14px;font-size:15px;line-height:1.18;color:${color};font-weight:800;">${escHtml(title)}</div>
            <div class="rh-soft-copy" style="margin-top:7px;font-size:13px;line-height:1.45;color:#484848;">${escHtml(text)}</div>
          </td>
        </tr>
      </table>
    </td>`;
}

function featureGrid(items: Array<{ icon: EmailIconName; title: string; text: string; color?: string }>): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:2px 0 24px 0;">
      <tr>
        ${items.map((item) => featureCell(item.icon, item.title, item.text, item.color)).join('')}
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
      .rh-feature-col { display: block !important; width: auto !important; padding: 0 0 12px 0 !important; }
      .rh-header-eyebrow { display: none !important; }
    }
    @media (prefers-color-scheme: dark) {
      .rh-body, .rh-bg { background: #080808 !important; }
      .rh-card { background: #111111 !important; color: #F4F4F4 !important; box-shadow: none !important; }
      .rh-title, .rh-copy, .rh-detail-value, .rh-soft-copy { color: #F4F4F4 !important; }
      .rh-intro, .rh-muted, .rh-footer-note, .rh-footer-text { color: #BDBDBD !important; }
      .rh-panel, .rh-summary { background: #181818 !important; border-color: #303030 !important; box-shadow: none !important; }
      .rh-icon-card { background: #181818 !important; border-color: #303030 !important; box-shadow: none !important; }
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
    [data-ogsc] .rh-icon-card { background: #181818 !important; border-color: #303030 !important; box-shadow: none !important; }
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

export function buildClientEmailHtml(form: ContactForm, enhancedBody: string): string {
  const fallbackBody = [
    `Ciao ${form.name}, grazie per averci scritto.`,
    `Abbiamo ricevuto la tua richiesta${form.service ? ` su ${form.service}` : ''} e la stiamo leggendo con attenzione. Ti risponderemo entro 72 ore lavorative con un riscontro concreto, non con una risposta automatica travestita da email.`,
    'Nel frattempo mettiamo a fuoco contesto, obiettivi e prime domande utili per capire come aiutarti nel modo giusto.'
  ].join('\n\n');

  const summaryRows = [
    detailRow('Azienda', compact(form.company)),
    detailRow('Area richiesta', compact(form.service)),
    detailRow('Budget indicativo', compact(form.budget), Boolean(form.budget)),
  ].join('');

  const body = `
    ${paragraphsFromText(enhancedBody, fallbackBody)}
    ${featureGrid([
      {
        icon: 'map',
        title: 'Mettiamo ordine',
        text: 'Processo, priorità e vincoli prima della soluzione.',
      },
      {
        icon: 'target',
        title: 'Cerchiamo impatto',
        text: 'Proponiamo solo passi utili e sostenibili.',
        color: BRAND_CYAN,
      },
      {
        icon: 'reply',
        title: 'Risposta umana',
        text: 'Niente automatismi generici: ti risponde il team.',
      },
    ])}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-panel" style="margin:28px 0 26px 0;background:${PANEL_BG};border-radius:22px;border:1px solid ${PANEL_BORDER};">
      <tr>
        <td style="padding:24px 24px 18px 24px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_PINK};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:10px;">Riepilogo richiesta</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${summaryRows}
            <tr>
              <td style="padding:14px 0 0 0;">
                <div class="rh-muted" style="font-size:11px;line-height:1.2;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Messaggio</div>
                <p class="rh-copy" style="margin:8px 0 0 0;font-size:15px;line-height:1.6;color:#303030;">${escHtml(form.message)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-dark-block" style="margin:0 0 20px 0;background:${BRAND_BLACK};border-radius:24px;">
      <tr>
        <td style="padding:26px 26px 8px 26px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:18px;">Cosa succede ora</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${processStep('1', 'Lettura umana', 'Leggiamo contesto, obiettivo e vincoli. Niente risposta automatica generica.')}
            ${processStep('2', 'Prima direzione', 'Se c’è fit, ti proponiamo un prossimo passo chiaro e sostenibile.', BRAND_CYAN)}
            ${processStep('3', 'Call concreta', 'Quando serve, partiamo da una call breve per capire priorità e impatto.', BRAND_PINK)}
          </table>
        </td>
      </tr>
    </table>
    ${summaryStrip([
      { label: 'Tempo', value: '72 ore lavorative', icon: 'clock' },
      { label: 'Metodo', value: 'prima analisi', color: BRAND_CYAN, icon: 'map' },
      { label: 'Output', value: 'prossimo passo', icon: 'spark' },
    ])}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-soft-cyan" style="margin:0 0 28px 0;background:${SOFT_CYAN};border:1px solid #D8F6F8;border-radius:20px;">
      <tr>
        <td style="padding:20px 22px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:8px;">Metodo Righello</div>
          <p class="rh-soft-copy" style="margin:0;font-size:15px;line-height:1.65;color:${TEXT_MAIN};">Prima capiamo il processo. Poi scegliamo canali, sito, automazioni e strumenti. L’obiettivo è costruire qualcosa che lavori davvero, non solo qualcosa che “sembra bello”.</p>
        </td>
      </tr>
    </table>
    ${ctaButton(`${SITE_URL}/progetti`, 'Guarda i progetti Righello')}
  `;

  return emailShell({
    preheader: 'Abbiamo ricevuto la tua richiesta. Il team Righello ti risponderà entro 72 ore lavorative.',
    eyebrow: 'Richiesta ricevuta',
    title: 'Richiesta ricevuta. Ora la leggiamo sul serio.',
    intro: 'Grazie per averci contattato. Il punto non è rispondere in fretta: è rispondere con criterio.',
    body,
  });
}

export function buildClientEmailText(form: ContactForm, enhancedBody: string): string {
  const body = enhancedBody.trim() || `Ciao ${form.name}, grazie per averci scritto. Abbiamo ricevuto la tua richiesta e ti risponderemo entro 72 ore lavorative.`;
  return [
    'Righello - richiesta ricevuta',
    '',
    body,
    '',
    'Riepilogo richiesta',
    `Azienda: ${compact(form.company)}`,
    `Area richiesta: ${compact(form.service)}`,
    `Budget indicativo: ${compact(form.budget)}`,
    `Messaggio: ${form.message}`,
    '',
    `Progetti Righello: ${SITE_URL}/progetti`,
    'Contatti: hello@wearerighello.com',
  ].join('\n');
}

export function buildTeamEmailHtml(form: ContactForm, leadAnalysis: string, priority: LeadPriority): string {
  const now = new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const replyHref = `mailto:${encodeURIComponent(form.email)}?subject=${encodeURIComponent(`Re: richiesta a Righello - ${form.name}`)}`;
  const actionWindow = priority.label.toLowerCase().includes('alta') ? 'entro 24 ore' : 'entro 72 ore';
  const rows = [
    detailRow('Ricevuto', now),
    detailRow('Nome', form.name),
    detailRow('Email', form.email, true),
    detailRow('Telefono', compact(form.phone)),
    detailRow('Azienda', compact(form.company)),
    detailRow('Area richiesta', compact(form.service)),
    detailRow('Budget indicativo', compact(form.budget), Boolean(form.budget)),
  ].join('');

  const analysisHtml = leadAnalysis.trim()
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-dark-block" style="margin:28px 0 0 0;background:#050505;border-radius:22px;">
        <tr>
          <td style="padding:24px;">
            <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:12px;">Analisi operativa</div>
            ${leadAnalysis
              .split(/\n+/)
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => `<p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#F4F4F4;">${escHtml(line)}</p>`)
              .join('')}
          </td>
        </tr>
      </table>`
    : '';

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-dark-block" style="margin:0 0 24px 0;background:${BRAND_BLACK};border-radius:24px;">
      <tr>
        <td style="padding:24px 26px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_CYAN};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:10px;">Lead cockpit</div>
          <div style="font-size:24px;line-height:1.05;color:#FFFFFF;font-weight:800;">${escHtml(priority.label)}</div>
          <p style="margin:10px 0 0 0;font-size:15px;line-height:1.6;color:#D8D8D8;">Rispondere ${escHtml(actionWindow)} con una domanda mirata, una proposta di call breve e un primo criterio di valutazione.</p>
        </td>
      </tr>
    </table>
    ${featureGrid([
      {
        icon: 'target',
        title: 'Valuta fit',
        text: 'Capire subito se richiesta, budget e urgenza sono allineati.',
      },
      {
        icon: 'clock',
        title: actionWindow,
        text: 'Finestra consigliata per la prima risposta commerciale.',
        color: BRAND_CYAN,
      },
      {
        icon: 'reply',
        title: 'Prima risposta',
        text: 'Domanda mirata, call breve e un criterio di avanzamento.',
      },
    ])}
    ${summaryStrip([
      { label: 'Priorità', value: priority.label, color: priority.color, icon: 'target' },
      { label: 'Risposta', value: actionWindow, icon: 'clock' },
      { label: 'Fonte', value: 'form sito', color: BRAND_CYAN, icon: 'spark' },
    ])}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px 0;">
      <tr>
        <td class="rh-priority-box" style="padding:18px 20px;border-radius:20px;background:${priority.bg};border:1px solid rgba(0,0,0,0.04);">
          <div class="rh-priority-title" style="font-size:11px;line-height:1.2;color:${priority.color};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;">Azione consigliata</div>
          <div class="rh-priority-copy" style="margin-top:7px;font-size:18px;line-height:1.35;color:${priority.color};font-weight:800;">Rispondere ${escHtml(actionWindow)} con una domanda mirata e una proposta di call breve.</div>
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
                <p class="rh-message-box" style="margin:8px 0 0 0;font-size:15px;line-height:1.6;color:#303030;background:#FFFFFF;border-radius:16px;padding:18px;border:1px solid #EEEEEE;">${escHtml(form.message)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${analysisHtml}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="rh-soft-pink" style="margin:28px 0 0 0;background:${SOFT_PINK};border:1px solid #F5D6E2;border-radius:20px;">
      <tr>
        <td style="padding:20px 22px;">
          <div style="font-size:12px;line-height:1.2;color:${BRAND_PINK};text-transform:uppercase;letter-spacing:0.1em;font-weight:800;margin-bottom:10px;">Primo messaggio utile</div>
          <p class="rh-soft-copy" style="margin:0;font-size:15px;line-height:1.6;color:${TEXT_MAIN};">Ciao ${escHtml(form.name)}, grazie per il messaggio. Abbiamo letto il contesto e ti proponiamo una call breve per capire obiettivi, priorità e prossimi passi.</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0 0 0;">
      <tr>
        <td align="center" style="padding-bottom:12px;">
          ${ctaButton(replyHref, 'Rispondi al cliente', 'primary')}
        </td>
      </tr>
      <tr>
        <td align="center">
          <a href="mailto:${encodeURIComponent(form.email)}" style="font-size:13px;line-height:1.5;color:#777777;text-decoration:none;">${escHtml(form.email)}</a>
        </td>
      </tr>
    </table>
  `;

  return emailShell({
    preheader: `Nuovo contatto da ${form.name}${form.company ? `, ${form.company}` : ''}. ${priority.label}.`,
    eyebrow: 'Nuovo lead',
    title: 'Nuovo lead dal sito.',
    intro: 'Dati essenziali, priorità e prima azione consigliata per rispondere senza perdere contesto.',
    body,
    footerNote: 'Notifica interna generata dal sito Righello.',
  });
}

export function buildTeamEmailText(form: ContactForm, leadAnalysis: string, priority: LeadPriority): string {
  return [
    `Nuova richiesta dal sito - ${priority.label}`,
    '',
    `Nome: ${form.name}`,
    `Email: ${form.email}`,
    `Telefono: ${compact(form.phone)}`,
    `Azienda: ${compact(form.company)}`,
    `Area richiesta: ${compact(form.service)}`,
    `Budget indicativo: ${compact(form.budget)}`,
    '',
    'Messaggio:',
    form.message,
    '',
    leadAnalysis.trim() ? `Analisi operativa:\n${leadAnalysis.trim()}` : '',
    '',
    `Rispondi: mailto:${form.email}`,
  ].filter(Boolean).join('\n');
}

export function buildPreviewContactForm(): ContactForm {
  return {
    name: 'Marco Bianchi',
    email: 'axel@wearerighello.com',
    phone: '+39 333 123 4567',
    company: 'Nordest Components S.r.l.',
    service: 'Sito web, automazioni AI e acquisizione lead',
    budget: '10.000 - 20.000 euro',
    message: 'Vorremmo rifare il sito aziendale e capire come automatizzare preventivi, richieste commerciali e gestione dei contatti. Cerchiamo un partner che ci aiuti a mettere ordine nei processi e a trasformare il sito in uno strumento commerciale concreto.',
  };
}

export function buildPreviewLeadAnalysis(): string {
  return [
    'Score: 8/10',
    'Priorità: alta. Il lead ha budget coerente, contesto aziendale chiaro e una richiesta collegata a sito, automazioni e vendite.',
    'Profilo: PMI B2B con bisogno operativo concreto, probabilmente interessata a un progetto integrato e non a una semplice landing.',
    'Azione consigliata: rispondere con una call breve, chiedendo esempi di preventivi, flusso lead attuale e obiettivi commerciali dei prossimi 6 mesi.',
    'Segnali chiave: budget dichiarato, problema ripetitivo, richiesta di partner strategico.'
  ].join('\n');
}
