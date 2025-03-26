"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        className={className}
      />
      <div className="absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent">
        {showPassword ? (
          <EyeIcon className="h-4 w-4" onClick={() => setShowPassword(false)} />
        ) : (
          <EyeOffIcon
            className="h-4 w-4"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
    </div>
  );
};
