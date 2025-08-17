"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoteForm from "../../components/NoteForm";
import { useNoteActions } from "../../hooks/useNoteActions";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function UpdateNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { handleUpdate } = useNoteActions();
  const router = useRouter();
  const [state, setState] = useState({
    note: null as Note | null,
    isLoading: false,
    fetching: true,
    message: null as string | null,
  });

  useEffect(() => {
    (async () => {
      const { id } = await params;
      try {
        const response = await fetch(`/api/note/${id}`);
        if (!response.ok) throw new Error("Failed to fetch note");
        const data = await response.json();
        setState((prev) => ({ ...prev, note: data, fetching: false }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          message: "Note not found.",
          fetching: false,
        }));
      }
    })();
  }, [params]);

  if (state.fetching)
    return <div className="text-center py-20">Loading...</div>;
  if (!state.note)
    return (
      <div className="text-center py-20 text-red-500">{state.message}</div>
    );

  return (
    <div className="flex items-center justify-center from-blue-50 to-purple-100">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Update Note
        </h2>
        {state.message && (
          <div
            className={`mb-4 text-center ${
              state.message.includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {state.message}
          </div>
        )}
        <NoteForm
          initialValues={{
            title: state.note.title,
            content: state.note.content,
          }}
          isLoading={state.isLoading}
          onSubmit={(form) => handleUpdate(form, String(state.note?.id), setState)}
          submitLabel="Update Note"
        />
      </div>
    </div>
  );
}
