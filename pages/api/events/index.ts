import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';
import { getErrorMessage } from '@lib/utils';
import { isEmpty } from 'lodash';
import { getSession } from '@lib/auth/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = isEmpty(req.query?.page) ? 0 : Number(req.query.page);
  const upcoming = isEmpty(req.query?.upcoming) ? false : true;
  const all = isEmpty(req.query?.all) ? false : true;
  const session = await getSession({ req });

  // Retrieve all events, admins only
  try {
    if (all) {
      if (session?.user?.role !== 'ADMIN')
        return res.status(401).json({
          statusCode: 401,
          message: 'Unauthorized',
        });
      const events = await prisma.event.findMany({
        orderBy: {
          startTime: 'desc',
        },
        include: {
          registrationList: true,
          waitingList: true,
          attendanceList: true,
        },
      });
      return res.status(200).json({
        events: events,
        page: 1,
        pages: 1,
      });
    } else {
      const take = 5;
      const events = await prisma.event.findMany({
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
    }
  } catch (error) {
    console.error('[api] /api/events', getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
