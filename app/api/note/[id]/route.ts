import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
    });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("Error fetching note by id:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const body = await req.json();
    const updatedNote = await prisma.note.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
};
