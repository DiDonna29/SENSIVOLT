"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { Lang } from "@/app/lib/translations"

interface LanguageToggleProps {
  currentLang: Lang;
  onLanguageChange: (lang: Lang) => void;
}

export function LanguageToggle({ currentLang, onLanguageChange }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onLanguageChange(currentLang === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2 font-headline font-bold uppercase tracking-wider text-xs px-3 h-9 rounded-full hover:bg-primary/20"
    >
      <Languages className="h-4 w-4" />
      <span>{currentLang}</span>
    </Button>
  )
}