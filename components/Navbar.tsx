import Link from "next/link";
import { useAuth } from "../lib/UserAuth";

const Navbar = () => {
  const { user, username } = useAuth();

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
