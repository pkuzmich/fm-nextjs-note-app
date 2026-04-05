"use client";
import { useState, useEffect } from "react";

export default function TeacherClientPage({ initialNotes, fetchNotes }) {
  const [notes, setNotes] = useState(initialNotes ? initialNotes : []);
  console.log(notes);

  useEffect(() => {
    const interval = setInterval(async () => {
      let sinceId;
      if (notes.length > 0) {
        sinceId = notes[notes.length - 1]?.id ?? null;
      }
      const newNotes = await fetchNotes(sinceId);
      setNotes([...notes, ...newNotes]);
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Teacher's View</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <fieldset>
              <h3>
                from: {note.from_user} | to: {note.to_user}
              </h3>
              <p>{note.note}</p>
            </fieldset>
          </li>
        ))}
      </ul>
    </div>
  );
}
