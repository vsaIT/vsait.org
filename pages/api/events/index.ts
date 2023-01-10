import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { isEmpty } from 'lodash';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = isEmpty(req.query?.page) ? 0 : Number(req.query.page);
  const upcoming = isEmpty(req.query?.upcoming) ? false : true;
  const take = 5;
  try {
    // Query all events, and then slice by current page :sweat_smile:
    const events = await prisma.event.findMany({
      // skip: page * take,
      // take: take,
      where: upcoming
        ? {
            isDraft: false,
            startTime: {
              gte: new Date(),
            },
          }
        : {
            isDraft: false,
          },
      orderBy: {
        startTime: 'desc',
      },
      include: {
        registrationList: true,
      },
    });
    const pages = Math.ceil(events.length / take);
    const currentPage = Math.min(page || 1, pages);

    return res.status(200).json({
      events: events.slice((currentPage - 1) * take, currentPage * take),
      page: currentPage,
      pages: pages,
    });
  } catch (error) {
    console.error('[api] /api/events', getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
