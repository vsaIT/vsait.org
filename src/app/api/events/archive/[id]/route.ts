import { base64ToBlob, isValidImageUrl } from '@/lib/imageBlobUtil';
import { getErrorMessage } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { del, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { v4 as uuidv4 } from 'uuid';
import { requireAdmin } from '../../../utils';

export const dynamic = 'force-dynamic';

// Returns a single archived past event.
const GET = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const event = await prisma.eventArchive.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json(
        { message: `Could not find archived event with id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error(
      '[api] /api/events/archive/[id] [GET]',
      getErrorMessage(error)
    );
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

// Updates an archived event. 
const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const id = Number(params.id);
    const body = await req.json();

    const current = await prisma.eventArchive.findUnique({ where: { id } });
    if (!current) {
      return NextResponse.json(
        { message: `Could not find archived event with id ${id}` },
        { status: 404 }
      );
    }

    let imageUrl = current.image;
    if (typeof body.image === 'string' && body.image.startsWith('data:image')) {
      const blob = base64ToBlob(body.image);

      // Remove the previous blob image (if any) before uploading the new one.
      if (isValidImageUrl(current.image)) {
        await del(current.image as string);
      }

      const filename = uuidv4();
      const { url } = await put(`images/${filename}`, blob, {
        access: 'public',
      });
      imageUrl = url;
    }

    const data: Prisma.EventArchiveUpdateInput = { image: imageUrl };

    if (typeof body.title === 'string' && body.title.trim()) {
      data.title = body.title.trim();
    }
    if (typeof body.description === 'string') {
      data.description = body.description;
    }
    if (typeof body.location === 'string') {
      data.location = body.location;
    }
    if (body.eventType === 'OPEN' || body.eventType === 'MEMBERSHIP') {
      data.eventType = body.eventType;
    }

    for (const field of ['maxRegistrations', 'registrations'] as const) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ''
      )
        continue;
      const value = Number(body[field]);
      if (Number.isInteger(value) && value >= 0) data[field] = value;
    }

    for (const field of ['startTime', 'endTime'] as const) {
      if (!body[field]) continue;
      const value = new Date(body[field]);
      if (!Number.isNaN(value.getTime())) data[field] = value;
    }

    const updated = await prisma.eventArchive.update({ where: { id }, data });
    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (error) {
    console.error(
      '[api] /api/events/archive/[id] [PUT]',
      getErrorMessage(error)
    );
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET, PUT };
