"use client";

import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";

const Select = SelectPrimitive.Root;
const MultiSelectValue = SelectPrimitive.Value;

const MultiSelectContext = React.createContext<{
  values: string[];
  onValueChange: (value: string) => void;
  onRemove: (value: string) => void;
}>({
  values: [],
  onValueChange: () => {},
  onRemove: () => {},
});

const MultiSelect = ({
  children,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  defaultValue?: string | string[];
}) => {
  const initialValues = Array.isArray(defaultValue)
    ? defaultValue
    : defaultValue
      ? [defaultValue]
      : [];

  const [values, setValues] = React.useState<string[]>(initialValues);

  const handleValueChange = (value: string) => {
    setValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      return [...prev, value];
    });
  };

  const handleRemove = (value: string) => {
    setValues((prev) => prev.filter((v) => v !== value));
  };

  React.useEffect(() => {
    if (onValueChange) {
      onValueChange(values as any);
    }
  }, [values, onValueChange]);

  return (
    <MultiSelectContext.Provider
      value={{
        values,
        onValueChange: handleValueChange,
        onRemove: handleRemove,
      }}
    >
      <Select {...props} value={undefined} onValueChange={undefined}>
        {children}
      </Select>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectTag = ({ value }: { value: string }) => {
  const { onRemove } = React.useContext(MultiSelectContext);

  return (
    <div className="bg-accent text-accent-foreground flex items-center gap-1 rounded-sm px-1 py-0.5 text-xs">
      <span>{value}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(value);
        }}
        className="hover:bg-accent-foreground/20 rounded-sm"
      >
        <XIcon className="h-3 w-3" />
      </button>
    </div>
  );
};

const MultiSelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) => {
  const { values } = React.useContext(MultiSelectContext);

  return (
    <SelectPrimitive.Trigger
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {values.map((value) => (
            <MultiSelectTag key={value} value={value} />
          ))}
        </div>
      ) : (
        children
      )}
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Trigger>
  );
};

// Multi-select item component
const MultiSelectItem = ({
  className,
  children,
  value,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) => {
  const { values, onValueChange } = React.useContext(MultiSelectContext);
  const isSelected = values.includes(value);

  return (
    <SelectPrimitive.Item
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-accent/50",
        className,
      )}
      value={value}
      {...props}
      onPointerUp={(e) => {
        e.preventDefault();
        onValueChange(value);
        e.stopPropagation();
      }}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

const MultiSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        position === "popper" && "translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
MultiSelectContent.displayName = SelectPrimitive.Content.displayName;

const MultiSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pr-2 pl-8 text-sm font-semibold", className)}
    {...props}
  />
));
MultiSelectLabel.displayName = SelectPrimitive.Label.displayName;

const MultiSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
    {...props}
  />
));
MultiSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectTrigger,
  MultiSelectValue,
};
