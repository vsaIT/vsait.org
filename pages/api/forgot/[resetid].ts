import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';
import { getErrorMessage } from '@lib/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { resetid } = req.query;
  try {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetUrl: String(resetid),
      },
      select: {
        id: true,
      },
    });
    return res.status(200).json({ statusCode: 200, user });
  } catch (error) {
    console.error('[api] /api/forgot/[resetid]', getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
