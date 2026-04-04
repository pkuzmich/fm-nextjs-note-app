import { AsyncDatabase } from "promised-sqlite3";

const SQL_GET_FROM_NOTES = `
SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user
FROM notes n
JOIN users f
ON f.id = n.from_user
JOIN users t
ON t.id = n.to_user
WHERE from_user = ?
`;

const SQL_GET_TO_NOTES = `
SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user
FROM notes n
JOIN users f
ON f.id = n.from_user
JOIN users t
ON t.id = n.to_user
WHERE to_user = ?
`;

const USER_ID = 1;

export default async function MyNotes() {
  async function fetchNotes() {
    const db = await AsyncDatabase.open("./notes.db");
    const fromPromise = await db.all(SQL_GET_FROM_NOTES, [USER_ID]);
    const toPromise = await db.all(SQL_GET_TO_NOTES, [USER_ID]);
    const [from, to] = await Promise.all([fromPromise, toPromise]);

    return { from, to };
  }

  const notes = await fetchNotes();

  return (
    <>
      <h1>My Notes</h1>
      <fieldset>
        <legend>Notes To You</legend>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {notes.from.map((note) => (
              <tr key={note.id}>
                <td>{note.from_user}</td>
                <td>{note.to_user}</td>
                <td>{note.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
      <fieldset>
        <legend>Notes From You</legend>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {notes.to.map((note) => (
              <tr key={note.id}>
                <td>{note.from_user}</td>
                <td>{note.to_user}</td>
                <td>{note.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </>
  );
}
