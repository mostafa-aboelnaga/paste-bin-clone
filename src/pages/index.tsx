import { router } from "@trpc/server";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const router = useRouter()
  const [snippetText, setSnippetText] = useState("");
  const saveSnippetMutation = trpc.useMutation("snippet.saveSnippet");

  const handleSaveSnippet = async () => {
    const newlyCreatedSnippet = await saveSnippetMutation.mutateAsync({text: snippetText});
    router.push(`/snippets/${newlyCreatedSnippet.id}`)
  };

  return (
    <>
      <Head>
        <title>Paste Bin Clone</title>
        <meta name="description" content="A simple paste bin clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        Paste Bin Clone
        <p>
          Feel free to paste a snippet of text or code, and you will get it
          saved for you!
        </p>
        <textarea
          className="h-64 w-1/2 border p-4"
          value={snippetText}
          onChange={(e) => setSnippetText(e.target.value)}
        ></textarea>
        <button
          onClick={handleSaveSnippet}
          className="rounded-md bg-blue-600 p-3 text-white hover:bg-blue-500"
        >
          Save Snippet
        </button>
      </main>
    </>
  );
};

export default Home;
