import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";

import { LIGHT_COLORS } from "@/lib/constants";

import { shuffleArray } from "@/lib/shuffleArray";
import { useEffect, useState } from "react";
import { useIsFontReady } from "@/lib/useIsFontReady";

import { useTheme } from "next-themes";
import Header from "@/components/Header";

export default function Home() {
  const [colors, setColors] = useState([]);

  let tempInterval;

  const isFontReady = useIsFontReady();
  const { theme, setTheme } = useTheme();

  const play = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setColors(shuffleArray(LIGHT_COLORS));
  }, []);

  return (
    <Container
      title="Pranay Aryal - Developer"
      description="Full-Stack developer"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <Header />
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          Blogs
        </h3>
        <BlogPost
          title="PubMed Api"
          summary="Explaining pubmed API in a cleaner manner"
          slug="pubmed-api"
        />

      </div>
    </Container>
  );
}
