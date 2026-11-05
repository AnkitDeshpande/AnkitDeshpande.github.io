"use client";

import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
);

Separator.displayName = "Separator";

interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio: `${number}/${number}`;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio, children, ...props }, ref) => {
    const [width, height] = ratio.split("/").map(Number);
    const paddingBottom = `${(height / width) * 100}%`;

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        style={{ paddingBottom }}
        {...props}
      >
        <div
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
        >
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div";
}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, as: Component = "span", children, ...props }, ref) => {
    const Element = Component as ElementType;
    return (
      <Element
        ref={ref as never}
        className={cn("visually-hidden", className)}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";

export function SkipLink({ href = "#main" }: { href?: string }) {
  return (
    <a
      href={href}
      className="visually-hidden focus:not-visually-hidden fixed top-4 left-4 z-[1000] px-4 py-2 bg-crimson text-bg font-semibold rounded-lg"
    >
      Skip to main content
    </a>
  );
}