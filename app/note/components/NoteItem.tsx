"use client";

import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./css/NoteItem.module.css";

interface Props {
  note: Note;
}

export default function NoteItem({ note }: Props) {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/note?id=" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      router.push("/");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  return (
    <div className={styles.noteCard}>
      <h2 className={styles.noteTitle}>ID: {note.id}</h2>
      <h1 className={styles.noteTitle}>{note.title}</h1>
      <p className={styles.noteContent}>{note.content}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <button
          className={styles.viewBtn}
          onClick={() => router.push(`/note/${note.id}/update`)}
        >
          Update
        </button>
        <button
          className={styles.viewBtn}
          style={{ color: "#fff", background: "#e53935" }}
          onClick={() => handleDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
