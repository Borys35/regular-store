import Link from "next/link";
import { FC, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Input from "../../atoms/input";

const HeaderSearch: FC = () => {
  const [q, setQ] = useState("");
  const aRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && aRef.current && aRef.current.click()
        }
        value={q}
      />
      <Link href={`/search?q=${q}`}>
        <a ref={aRef}>
          <FaSearch
            className="absolute right-4 top-1/2 -translate-y-1/2 fill-accent"
            size={18}
          />
        </a>
      </Link>
    </div>
  );
};

export default HeaderSearch;
