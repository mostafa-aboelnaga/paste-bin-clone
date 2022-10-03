import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { BiCopy } from "react-icons/bi";
const Snippet: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const getSnippetQuery = trpc.useQuery(["snippet.getSnippet", { id }]);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Head>
        <title>Paste Bin Clone</title>
        <meta name="description" content="A simple paste bin clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <h1 className="h-full p-2 text-2xl font-bold">Here is your snippet</h1>
        <div className="mx-auto flex h-64 w-1/3 flex-1 flex-col items-center gap-3">
          {getSnippetQuery.isLoading && <p>Loading...</p>}
          {getSnippetQuery.data && (
            <>
              <div
                onClick={() =>
                  handleCopyToClipboard(`${location.origin}/snippets/${id}`)
                }
                className="flex w-full justify-between items-center gap-x-3 rounded-3xl bg-slate-200 hover:bg-slate-300 p-4 text-black hover:cursor-pointer"
              >
                <p className="rounded-md text-xs overflow-hidden">
                  {location.origin}/snippets/{id}
                </p>
                <BiCopy className="w-3 h-3"/>
                {/* <img
                  onClick={() =>
                    handleCopyToClipboard(`${location.origin}/snippets/${id}`)
                  }
                  src="/copy-icon.svg"
                  className="h-3 w-3 hover:cursor-pointer"
                /> */}
              </div>
              <textarea
                className="h-64 w-full rounded-xl bg-gray-200 p-4"
                value={getSnippetQuery.data?.text}
              ></textarea>
              <button
                className="w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-500"
                onClick={() =>
                  handleCopyToClipboard(getSnippetQuery.data?.text!)
                }
              >
                Copy Text To Clipboard
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Snippet;
