import { useRouter } from "next/navigation";

export function useNoteActions() {
  const router = useRouter();

  const handleCreate = async (
    form: { title: string; content: string },
    setIsLoading: (v: boolean) => void
  ) => {
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
      router.push("/");
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (
    form: { title: string; content: string },
    id: string,
    setState: (fn: (prev: any) => any) => void,
    pushOnSuccess: boolean = true
  ) => {
    setState((prev: any) => ({ ...prev, isLoading: true, message: null }));
    try {
      const response = await fetch(`/api/note/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to update note");
      setState((prev: any) => ({
        ...prev,
        message: "Note updated successfully!",
      }));
      if (pushOnSuccess) setTimeout(() => router.push("/"), 1200);
    } catch (error) {
      setState((prev: any) => ({ ...prev, message: "Error updating note." }));
    } finally {
      setState((prev: any) => ({ ...prev, isLoading: false }));
    }
  };

  const handleDelete = async (
    id: string,
    setState: (fn: (prev: any) => any) => void,
    pushOnSuccess: boolean = true
  ) => {
    setState((prev: any) => ({ ...prev, isLoading: true, message: null }));
    try {
      const response = await fetch(`/api/note/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete note");
      setState((prev: any) => ({
        ...prev,
        message: "Note deleted successfully!",
      }));
      if (pushOnSuccess) setTimeout(() => router.push("/"), 1200);
    } catch (error) {
      setState((prev: any) => ({ ...prev, message: "Error deleting note." }));
    } finally {
      setState((prev: any) => ({ ...prev, isLoading: false }));
    }
  };

  return { handleCreate, handleUpdate, handleDelete };
}
