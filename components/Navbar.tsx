import Link from "next/link";

const Navbar = () => {
  const user = null;
  const username = true;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button>Feed</button>
          </Link>
        </li>
        {username ? (
          <>
            <li className="push-left">
              <Link href={"/admin"}>
                <button>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/enter">
                <button className="btn-blue">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
