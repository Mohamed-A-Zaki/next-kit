import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page description",
};

export default async function Home() {
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}
