import React, { useState, useEffect } from "react";
import styles from "./css/NoteForm.module.css";

interface NoteFormProps {
  initialValues?: {
    title: string;
    content: string;
  };
  isLoading?: boolean;
  onSubmit: (form: { title: string; content: string }) => Promise<void>;
  submitLabel?: string;
}

export default function NoteForm({
  initialValues,
  isLoading,
  onSubmit,
  submitLabel = "Submit",
}: NoteFormProps) {
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form
      className={`w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6 border border-gray-100 ${styles["animate-slide-up"]}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Input your title"
        value={form.title}
        onChange={handleChange}
        className={`w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg transition-all duration-300 outline-none shadow-sm ${styles["animate-fade-in"]}`}
        required
      />
      <textarea
        rows={8}
        name="content"
        placeholder="Input your content"
        value={form.content}
        onChange={handleChange}
        className={`w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg transition-all duration-300 outline-none shadow-sm resize-none ${styles["animate-fade-in"]}`}
        required
      />
      <button
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 flex items-center justify-center gap-2 ${
          isLoading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Loading ..." : submitLabel}
      </button>
    </form>
  );
}
