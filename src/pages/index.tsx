import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const timeUsed = "7h 30min";
  const motd = "12min until break";

  const handleActionButton = () => {
    // get the current state from this user
    // write the relevant entry into a datastore
    // update the relevant props
  };

  return (
    <>
      <Head>
        <title>Stopwatch</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center">
          <h1 className="mb-6 text-5xl font-medium">{timeUsed}</h1>
          <p className="text-lg">{motd}</p>
          <AuthShowcase />
          <PostList />
          <div className="container flex flex-col items-center justify-center md:flex-row">
            <button
              className="m-5 w-4/5 rounded p-7 text-slate-700 shadow-lg md:w-2/5"
              id="actionButton"
              onClick={handleActionButton}
            >
              Start day
            </button>
            <button
              className="m-5 w-4/5 rounded p-7 text-slate-700 shadow-lg md:w-2/5"
              id="endDayButton"
            >
              End day
            </button>
          </div>

          <div className="container flex flex-col items-center justify-center md:flex-row">
            <button
              className="m-5 w-4/5 rounded p-7 text-slate-700 shadow-lg md:w-2/5"
              id="viewEntriesButton"
            >
              View entries
            </button>
            <button
              className="m-5 w-4/5 rounded p-7 text-slate-700 shadow-lg md:w-2/5"
              id="editEntriesButton"
            >
              Edit entries
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-slate-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const PostList: React.FC = () => {
  const { data } = trpc.example.getAll.useQuery();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <p>Hello</p>
      {data.map((post) => {
        return <div key={post.id}>{post.id}</div>;
      })}
    </div>
  );
};
