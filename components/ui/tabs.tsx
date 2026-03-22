"use client"
import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextValue>({ value: "", setValue: () => {} })

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (v: string) => void
  children: React.ReactNode
  className?: string
}) {
  const [internal, setInternal] = useState(defaultValue ?? "")
  const value = controlledValue !== undefined ? controlledValue : internal
  const setValue = (v: string) => {
    setInternal(v)
    onValueChange?.(v)
  }
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex gap-1 border-b border-primary/15 overflow-x-auto", className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  children,
  className,
  style,
}: {
  value: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ctx = useContext(TabsContext)
  const active = ctx.value === value
  return (
    <button
      onClick={() => ctx.setValue(value)}
      style={style}
      className={cn(
        "shrink-0 px-4 py-2.5 font-mono-accent text-[11px] tracking-wider uppercase transition-colors duration-200 -mb-px border-b-2",
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  children,
  className,
  forceMount,
}: {
  value: string
  children: React.ReactNode
  className?: string
  forceMount?: boolean
}) {
  const ctx = useContext(TabsContext)
  if (!forceMount && ctx.value !== value) return null
  return <div className={cn("mt-6", className)}>{children}</div>
}
