import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";
import axios from '../api/axiosInstance';
import useAuth from "../auth/useAuth";

function NotesApp() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      const response = await axios.post(`${BASE_URL}/add-note`, { title, content });
      if (response.data.data) {
        setNotes((prevNotes) => [...prevNotes, response.data.data]);
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-note/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleEditMode = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const saveNote = async (id, newTitle, newContent) => {
    if (!newTitle.trim() || !newContent.trim()) return;
    try {
      const response = await axios.put(`${BASE_URL}/update-note/${id}`, {
        title: newTitle,
        content: newContent,
      });
      if (response.data.data) {
        await fetchNotes();
      } else {
        alert("Gagal simpan data");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleRefresh = async () => {
    await fetchNotes();
  };

  return (
    <div style={{ maxWidth: 340, margin: "24px auto", padding: "12px" }}>
      {/* Tombol Logout & Refresh di kanan atas */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 8 }}>
        <button
          onClick={handleRefresh}
          style={{
            background: "#3387dd",
            color: "#fff",
            border: "none",
            padding: "4px 12px",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Refresh
        </button>
        <button
          onClick={handleLogout}
          style={{
            background: "#d33",
            color: "#fff",
            border: "none",
            padding: "4px 12px",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Logout
        </button>
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Website Notes</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: 10, marginBottom: 16 }}>
        <input
          style={{ width: "100%", marginBottom: 6, padding: 6, border: "1px solid #ccc", borderRadius: 4, fontSize: 14 }}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={{ width: "100%", marginBottom: 6, padding: 6, border: "1px solid #ccc", borderRadius: 4, fontSize: 14 }}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          style={{
            width: "100%",
            background: "#34b56f",
            color: "#fff",
            border: "none",
            padding: "7px 0",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
          onClick={addNote}
        >
          Add Note
        </button>
      </div>
      <div>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} style={{ border: "1px solid #eee", borderRadius: 4, marginBottom: 12, padding: 8 }}>
              {note.isEditing ? (
                <>
                  <input
                    style={{ width: "100%", marginBottom: 6, padding: 5, border: "1px solid #ccc", borderRadius: 4, fontSize: 13 }}
                    type="text"
                    value={note.title}
                    onChange={(e) =>
                      handleInputChange(note.id, "title", e.target.value)
                    }
                  />
                  <textarea
                    style={{ width: "100%", marginBottom: 6, padding: 5, border: "1px solid #ccc", borderRadius: 4, fontSize: 13 }}
                    value={note.content}
                    onChange={(e) =>
                      handleInputChange(note.id, "content", e.target.value)
                    }
                  ></textarea>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      style={{ flex: 1, background: "#34b56f", color: "#fff", border: "none", padding: "5px 0", borderRadius: 4, cursor: "pointer", fontSize: 13 }}
                      onClick={() => {
                        saveNote(note.id, note.title, note.content);
                        toggleEditMode(note.id);
                      }}
                    >
                      Save
                    </button>
                    <button
                      style={{ flex: 1, background: "#aaa", color: "#fff", border: "none", padding: "5px 0", borderRadius: 4, cursor: "pointer", fontSize: 13 }}
                      onClick={() => toggleEditMode(note.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{note.title}</div>
                  <div style={{ margin: "3px 0 7px 0", color: "#444", fontSize: 13 }}>{note.content}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      style={{ flex: 1, background: "#f6c544", color: "#222", border: "none", padding: "5px 0", borderRadius: 4, cursor: "pointer", fontSize: 13 }}
                      onClick={() => toggleEditMode(note.id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ flex: 1, background: "#d33", color: "#fff", border: "none", padding: "5px 0", borderRadius: 4, cursor: "pointer", fontSize: 13 }}
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div style={{ color: "#888", textAlign: "center", fontSize: 13, marginTop: 24 }}>No notes available</div>
        )}
      </div>
    </div>
  );
}

export default NotesApp;