"use client";

import React from "react";
import NoteForm from "../components/NoteForm";
import { useNoteActions } from "../hooks/useNoteActions";

const CreateNotePage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleCreate } = useNoteActions();

  return (
    <div className="flex items-center justify-center from-blue-50 to-purple-100">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Create Note
        </h2>
        <NoteForm
          isLoading={isLoading}
          onSubmit={(form) => handleCreate(form, setIsLoading)}
          submitLabel="Create Note"
        />
      </div>
    </div>
  );
};

export default CreateNotePage;
