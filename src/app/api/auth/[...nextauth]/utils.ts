export const sendConfirmEmail = async (
  name: string,
  email: string,
  code: string
) => {
  const url = process.env.HOST;
  const body = {
    api_key: process.env.SMTP2GO_API_KEY,
    to: [email],
    sender: 'noreply@vsait.org',
    subject: '[VSAiT] Bekreft Email',
    text_body: `Hei ${name}!\n\nVi har mottatt en forespørsel om din registrering av ny bruker.\nBenytt denne lenken for å bekrefte email på brukeren din ${url}/confirm-email?code=${code}\n\nHvis du ikke har sendt denne forespørselen, kan du se bort fra denne eposten.\n\nVennlig hilsen,\nVietnamese Student Association in Trondheim`,
    html_body: `
        <body>
        Hei ${name}!<br/>
        <br/>
        Vi har mottatt en forespørsel om din registrering av ny bruker.<br/>
        Benytt denne lenken for å bekrefte email på brukeren din: <a href="${url}/confirm-email?code=${code}">${url}/confirm-email?code=${code}<br/>
        Hvis du ikke har sendt denne forespørselen, kan du se bort fra denne eposten.<br/>
        <br/>
        Vennlig hilsen,<br/>Vietnamese Student Association in Trondheim
        </body>
        `,
  };
  const response = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
