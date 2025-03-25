import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Loader size={40} className="text-primary animate-spin" />
    </div>
  );
}
