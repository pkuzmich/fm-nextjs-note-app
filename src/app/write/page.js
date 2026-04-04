import { AsyncDatabase } from "promised-sqlite3";

export default async function Write() {
  async function getUsers() {
    const db = await AsyncDatabase.open("./notes.db");
    return await db.all("SELECT * FROM users");
  }

  const users = await getUsers();

  return (
    <div>
      <fieldset className="note-fieldset">
        <legend>Write a new note</legend>
        <form className="note-form">
          <label>
            From
            <select name="from_user">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            To
            <select name="to_user">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Note
            <textarea name="note" />
          </label>
          <button type="submit">Save</button>
        </form>
      </fieldset>
    </div>
  );
}
