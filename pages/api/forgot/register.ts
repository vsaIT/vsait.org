import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { isEmpty } from 'lodash';

const sendEmail = async (name: string, email: string, restUrl: string) => {
  const body = {
    api_key: process.env.SMTP2GO_API_KEY,
    to: ['jonnynl@stud.ntnu.no' || email],
    sender: 'noreply@vsait.org',
    subject: '[VSAiT] Tilbakestill passord',
    text_body: `Hei ${name}!\n\nVi har mottatt en forespørsel om å tilbakestille passordet ditt.\nBenytt denne lenken for å opprette et nytt passord: http://localhost/forgot/${restUrl}\n\nHvis du ikke har sendt denne forespørselen, kan du se bort fra denne eposten.\n\nVennlig hilsen,\nVietnamese Student Association in Trondheim`,
    html_body: `
    <body>
    Hei ${name}!<br/>
    <br/>
    Vi har mottatt en forespørsel om å tilbakestille passordet ditt.<br/>
    Benytt denne lenken for å opprette et nytt passord: <a href="http://localhost/forgot/${restUrl}">http://localhost/forgot/${restUrl}</a><br/>
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Only POST requests allowed' });
  const email: string = isEmpty(req.body?.email) ? '' : String(req.body.email);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        firstName: true,
        emailVerificationUrl: true,
      },
    });

    if (user) {
      console.log(123);
      await sendEmail(user.firstName, user.email, user.emailVerificationUrl)
        .then(({ data }) => {
          console.log(data);
          if (data.error) throw new Error('Sending failed');
        })
        .catch(() => {
          throw new Error('Sending failed');
        });
    }

    return res.status(200).json({
      statusCode: 200,
      message:
        'An e-mail with the instructions to reset the password will be sent if a user is registered with given email.',
    });
  } catch (error) {
    console.error('[api] /api/forgot', getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
