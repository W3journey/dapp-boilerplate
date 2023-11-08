"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideIcon, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ClearInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void
  icon?: LucideIcon
  text?: string
}

const ClearInput = React.forwardRef<HTMLInputElement, ClearInputProps>(
  ({ className, type, onClear, icon: Icon = Trash, text, ...props }, ref) => {
    return (
      <div
        className={cn(
          `flex h-10 items-center rounded-md border border-input bg-background pr-0 text-sm ring-offset-background 
        file:border-0 file:bg-transparent file:text-sm file:font-medium 
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
        )}
      >
        <input
          className="w-full px-3 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-muted-foreground focus-visible:outline-none"
          type={type}
          ref={ref}
          {...props}
        />
        <Button variant="ghost" onClick={onClear} type="button">
          {text ? text : <Icon className="w-4 h-4" />}
        </Button>
      </div>
    )
  }
)
ClearInput.displayName = "Input"

export { ClearInput }
