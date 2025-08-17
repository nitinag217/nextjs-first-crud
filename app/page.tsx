import styles from "./noteList.module.css";
import NoteItem from "./note/components/NoteItem";

const getNotes = async () => {
  try {
    const response = await fetch(process.env.BASE_URL + "/api/note");
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

async function Home() {
  const notes = await getNotes();
  return (
    <>
      <div className="w-[1200px] mx-auto">
        <h1 className={styles.header}>My Notes</h1>
        <div className={styles.grid}>
          {notes
            .map((note: any) => <NoteItem key={note.id} note={note} />)
            .sort()
            .reverse()}
        </div>
      </div>
    </>
  );
}

export default Home;
