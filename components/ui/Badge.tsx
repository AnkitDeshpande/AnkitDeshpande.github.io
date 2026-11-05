"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "crimson" | "muted" | "success" | "default";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", dot, children, ...props }, ref) => {
    const variants = {
      crimson: "badge badge-crimson",
      muted: "badge badge-muted",
      success: "badge badge-success",
      default: "badge bg-bg-card-hover text-fg-muted border-border-hover",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-[0.55rem]",
      md: "px-2.5 py-0.5 text-[0.625rem]",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-mono font-semibold uppercase tracking-wider rounded-full",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              variant === "crimson" && "bg-crimson",
              variant === "muted" && "bg-fg-subtle",
              variant === "success" && "bg-green",
              variant === "default" && "bg-fg-subtle"
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  removable?: boolean;
  onRemove?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, removable, onRemove, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium bg-bg-elevated border border-border rounded-lg transition-colors hover:border-crimson/50",
        className
      )}
      {...props}
    >
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-0.5 text-fg-subtle hover:text-crimson-light transition-colors rounded"
          aria-label={`Remove ${children}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  )
);

Tag.displayName = "Tag";