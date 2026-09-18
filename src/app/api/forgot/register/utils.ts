export const sendEmail = async (
  name: string,
  email: string,
  restUrl: string
) => {
  const url = process.env.HOST;
  const body = {
    api_key: process.env.SMTP2GO_API_KEY,
    to: [email],
    sender: 'noreply@vsait.org',
    subject: '[VSAiT] Tilbakestill passord',
    text_body: `Hei ${name}!\n\nVi har mottatt en forespørsel om å tilbakestille passordet ditt.\nBenytt denne lenken for å opprette et nytt passord: ${url}/forgot/${restUrl}\n\nLenken er gyldig i 1 time og kan bare brukes én gang.\n\nHvis du ikke har sendt denne forespørselen, kan du se bort fra denne eposten.\n\nVennlig hilsen,\nVietnamese Student Association in Trondheim`,
    html_body: `
      <body>
      Hei ${name}!<br/>
      <br/>
      Vi har mottatt en forespørsel om å tilbakestille passordet ditt.<br/>
      Benytt denne lenken for å opprette et nytt passord: <a href="${url}/forgot/${restUrl}">${url}/forgot/${restUrl}</a><br/>
      <br/>
      Lenken er gyldig i 1 time og kan bare brukes én gang.<br/>
      <br/>
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
