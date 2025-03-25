import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home page",
  description: "Home page description",
};

export default async function Home() {
  return (
    <>
      <h1>Home page</h1>
    </>
  );
}
