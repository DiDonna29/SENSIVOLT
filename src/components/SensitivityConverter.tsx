"use client"

import * as React from "react"
import { GAMES, convertSensitivity, calculateCm360 } from "@/app/lib/game-data"
import { translations, Lang } from "@/app/lib/translations"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"
import { MousePointer2, Target, MoveHorizontal, Hash, Zap } from "lucide-react"

export function SensitivityConverter() {
  const [lang, setLang] = React.useState<Lang>("en")
  const [sourceGame, setSourceGame] = React.useState(GAMES[1].id) // Valorant
  const [targetGame, setTargetGame] = React.useState(GAMES[0].id) // CS2
  const [sensitivity, setSensitivity] = React.useState<string>("0.4")
  const [dpi, setDpi] = React.useState<string>("800")

  const t = translations[lang]

  const sensValue = parseFloat(sensitivity) || 0
  const dpiValue = parseFloat(dpi) || 0

  const convertedSens = convertSensitivity(sensValue, sourceGame, targetGame)
  const sourceCm360 = calculateCm360(sensValue, dpiValue, sourceGame)
  const targetCm360 = calculateCm360(convertedSens, dpiValue, targetGame)

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <Zap className="h-8 w-8 text-primary fill-primary" />
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground">
              {t.title}
            </h1>
          </div>
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary uppercase">
            {t.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card border shadow-sm p-2 rounded-full">
          <LanguageToggle currentLang={lang} onLanguageChange={setLang} />
          <div className="w-[1px] h-6 bg-border" />
          <ThemeToggle />
        </div>
      </header>

      {/* Main UI */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex z-10">
          <div className="bg-primary p-3 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] animate-pulse">
            <MoveHorizontal className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Source Column */}
        <Card className="border-2 border-transparent hover:border-primary/20 transition-all shadow-xl bg-card overflow-hidden">
          <div className="bg-primary/5 p-4 border-b">
            <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
              <MousePointer2 className="h-5 w-5 text-primary" />
              {t.sourceGame}
            </h2>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">{t.sourceGame}</Label>
              <Select value={sourceGame} onValueChange={setSourceGame}>
                <SelectTrigger className="h-12 text-base font-medium focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GAMES.map((game) => (
                    <SelectItem key={game.id} value={game.id} className="font-medium">
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-muted-foreground">{t.currentSens}</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(e.target.value)}
                    className="pl-9 h-12 text-lg font-bold focus:ring-primary"
                    placeholder={t.placeholderSens}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-muted-foreground">{t.dpi}</Label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={dpi}
                    onChange={(e) => setDpi(e.target.value)}
                    className="pl-9 h-12 text-lg font-bold focus:ring-primary"
                    placeholder={t.placeholderDpi}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-muted-foreground">{t.cm360}</span>
                <span className="font-mono text-lg font-black text-primary">
                  {sourceCm360.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Column */}
        <Card className="border-2 border-primary/40 shadow-2xl bg-card overflow-hidden">
          <div className="bg-primary p-4 text-white">
            <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t.targetGame}
            </h2>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">{t.targetGame}</Label>
              <Select value={targetGame} onValueChange={setTargetGame}>
                <SelectTrigger className="h-12 text-base font-medium border-primary/50 bg-primary/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GAMES.map((game) => (
                    <SelectItem key={game.id} value={game.id} className="font-medium">
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-primary/10 rounded-xl p-8 flex flex-col items-center justify-center border border-primary/20 transition-all hover:scale-[1.02]">
              <span className="text-xs font-black uppercase text-primary tracking-widest mb-2">
                {t.convertedSens}
              </span>
              <div className="text-5xl md:text-6xl font-black tracking-tighter text-foreground drop-shadow-sm">
                {convertedSens.toFixed(3)}
              </div>
            </div>

            <div className="pt-4 border-t border-dashed">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-muted-foreground">{t.cm360}</span>
                <span className="font-mono text-lg font-black text-primary">
                  {targetCm360.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer info */}
      <footer className="w-full flex flex-col items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-60">
          <span className="px-2 py-1 bg-foreground/10 rounded">VALORANT</span>
          <span className="px-2 py-1 bg-foreground/10 rounded">CS2</span>
          <span className="px-2 py-1 bg-foreground/10 rounded">OVERWATCH 2</span>
          <span className="px-2 py-1 bg-foreground/10 rounded">APEX</span>
        </div>
        <p className="text-[10px] md:text-xs font-bold tracking-widest text-primary/80 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
          {t.gamingMotto}
        </p>
      </footer>
    </div>
  )
}