import Link from "next/link";

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/my">My Notes</Link>
        </li>
        <li>
          <Link href="/write">Write Note</Link>
        </li>
        <li>
          <Link href="/teacher">Secret Teacher Feed</Link>
        </li>
        <li>
          <Link href="/who-am-i">Who Am I?</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
