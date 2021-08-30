import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { menuNav } from "../utils/menuNav";
import Link from "next/link";
const Container = (props) => {
  
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  //After mounting , we have access to the theme
  React.useEffect(() => setMounted(true));
  const router = useRouter();
  const meta = {
    title: "Danilo Morales - Developer, writer, creator.",
    description:
      "Front-end developer , JavaScript enthusiast and Materials Engineer",
    type: "website",
  };

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta name="twitter:site" content="@darmo10" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {/* <meta name="twitter:image" content={meta.image} /> */}
      </Head>

      <div className="h-12 flex content-center">
      <nav className="max-w-4xl px-4 container mx-auto flex flex-wrap justify-between content-center">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="w-4 h-4 text-gray-800 dark:text-gray-200"
            >
              {resolvedTheme === "dark" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
        <div>
          {menuNav.map((item) => {
            return (
              <Link href={item.href} passHref key={item.id}>
                <a className={`${item.className} mr-4 `}>{item.title}</a>
              </Link>
            );
          })}
        </div>
      </nav>
      </div>
      <main
        id="#skip"
        className="px-4"
       
      >
          {props.children}
      </main>
    </div>
  );
};

export default Container;
