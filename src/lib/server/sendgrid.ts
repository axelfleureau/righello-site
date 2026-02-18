import sgMail from '@sendgrid/mail';

async function getReplitCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken || !hostname) {
    return null;
  }

  try {
    const connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    if (!connectionSettings?.settings?.api_key || !connectionSettings?.settings?.from_email) {
      return null;
    }
    return { apiKey: connectionSettings.settings.api_key, email: connectionSettings.settings.from_email };
  } catch {
    return null;
  }
}

function getEnvCredentials() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const email = process.env.SENDGRID_FROM_EMAIL || 'hello@wearerighello.com';

  if (!apiKey) {
    return null;
  }
  return { apiKey, email };
}

export async function getUncachableSendGridClient() {
  const credentials = await getReplitCredentials() || getEnvCredentials();

  if (!credentials) {
    throw new Error('SendGrid not configured. Set SENDGRID_API_KEY env var or connect via Replit.');
  }

  sgMail.setApiKey(credentials.apiKey);
  return {
    client: sgMail,
    fromEmail: credentials.email
  };
}
