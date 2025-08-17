import { useState } from "react";

export function useCreateNote() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to create note");
      }
      const data = await response.json();
      setForm({ title: "", content: "" });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
