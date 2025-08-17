import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newNote = await prisma.note.create({
      data: { title, content },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedNote = await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json(deletedNote, { status: 200 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { id, title, content } = await req.json();
    if (!id || !title || !content) {
      return NextResponse.json(
        { error: "ID, title, and content are required" },
        { status: 400 }
      );
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
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
