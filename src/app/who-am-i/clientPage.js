"use client";

import { updateUsername } from "./updateUsername";

export default function ClientWhoAmIPage({ children, id }) {
  return (
    <div>
      {children}
      <form action={updateUsername}>
        <h3>Enter new username</h3>
        <input type="text" name="username" placeholder="username" required />
        <input type="hidden" name="id" value={id} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
