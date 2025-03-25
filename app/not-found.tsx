import { Button } from "@/components/ui/button";
import { URLS } from "@/utils/urls";
import Link from "next/link";

export default function nNtFound() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={URLS.home}>
        <Button>Go back to Homepage</Button>
      </Link>
    </div>
  );
}
