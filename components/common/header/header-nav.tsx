import Link from "next/link";
import { FC } from "react";
import { FaArrowDown } from "react-icons/fa";
import { useAppSelector } from "../../../hooks/useAppSelector";

const HeaderNav: FC = () => {
  const categories = useAppSelector((state) => state.categories);

  console.log("FIRST", categories[1]);

  return (
    <nav className="flex gap-8">
      {categories.map(({ id, name, slug, children }: any) => (
        <span key={id} className="group relative font-bold">
          <Link href={`/categories/${slug}`}>
            <a>
              {name}{" "}
              {!!children.length && (
                <FaArrowDown
                  className="inline transition-transform group-hover:-rotate-180"
                  size={12}
                />
              )}
            </a>
          </Link>
          {!!children.length && (
            <ul className="absolute flex flex-col gap-1 top-full translate-y-1 -left-3 px-3 py-2 border-2 border-gray-400 w-max scale-0 origin-top-left transition-transform group-hover:scale-100 bg-background">
              {children.map(({ id, name, slug }: any) => (
                <li key={id}>
                  <Link href={`/categories/${slug}`} passHref>
                    <a>{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </span>
      ))}
    </nav>
  );
};

export default HeaderNav;
