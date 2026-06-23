"use client"

import * as React from "react"
import { GAMES, convertSensitivity, calculateCm360, calculateEdpi } from "@/app/lib/game-data"
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
import { MousePointer2, Target, MoveHorizontal, Zap, Hash, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SensitivityConverter() {
  const [lang, setLang] = React.useState<Lang>("es")
  const [sourceGame, setSourceGame] = React.useState(GAMES[1].id) // Valorant
  const [targetGame, setTargetGame] = React.useState(GAMES[0].id) // CS2
  const [sensitivity, setSensitivity] = React.useState<string>("0.4")
  const [dpi, setDpi] = React.useState<string>("800")
  const [copied, setCopied] = React.useState(false)

  const t = translations[lang]

  const sensValue = parseFloat(sensitivity) || 0
  const dpiValue = parseFloat(dpi) || 0

  const convertedSens = convertSensitivity(sensValue, sourceGame, targetGame)
  const sourceEdpi = calculateEdpi(sensValue, dpiValue)
  const targetEdpi = calculateEdpi(convertedSens, dpiValue)
  const sourceCm360 = calculateCm360(sensValue, dpiValue, sourceGame)
  const targetCm360 = calculateCm360(convertedSens, dpiValue, targetGame)

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedSens.toFixed(3))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen p-4 md:p-12 flex flex-col items-center justify-center max-w-5xl mx-auto space-y-10">
      {/* Esports Header */}
      <header className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left group cursor-default">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="bg-primary p-1 rounded-sm transform -skew-x-12">
              <Zap className="h-8 w-8 text-primary-foreground fill-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-foreground uppercase leading-none">
              {t.title}
            </h1>
          </div>
          <div className="inline-block px-2 py-1 bg-primary/10 border-l-4 border-primary">
            <p className="text-[10px] md:text-xs font-black tracking-[0.4em] text-primary uppercase">
              {t.subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-card border-2 border-primary/20 shadow-xl p-2 rounded-lg transform skew-x-[-4deg]">
          <div className="transform skew-x-[4deg] flex items-center gap-2">
            <LanguageToggle currentLang={lang} onLanguageChange={setLang} />
            <div className="w-[2px] h-8 bg-border mx-1" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Grid UI */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Animated Central Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex z-20">
          <div className="bg-primary p-4 rounded-none transform rotate-45 border-4 border-background shadow-[0_0_30px_rgba(244,63,94,0.5)]">
            <MoveHorizontal className="h-8 w-8 text-white -rotate-45" />
          </div>
        </div>

        {/* Source Section */}
        <Card className="border-0 shadow-2xl bg-card overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-muted-foreground/20 group-hover:bg-primary transition-colors" />
          <div className="bg-muted/30 p-5 border-b flex justify-between items-center">
            <h2 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              <MousePointer2 className="h-5 w-5 text-primary" />
              {t.sourceGame}
            </h2>
            <div className="px-3 py-1 bg-background text-[10px] font-bold tracking-widest border border-border rounded uppercase opacity-60">
              Input Stage
            </div>
          </div>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">{t.sourceGame}</Label>
              <Select value={sourceGame} onValueChange={setSourceGame}>
                <SelectTrigger className="h-14 text-lg font-black italic uppercase tracking-tight border-2 focus:ring-primary rounded-none bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-black italic uppercase">
                  {GAMES.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">{t.currentSens}</Label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    type="number"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(e.target.value)}
                    className="pl-12 h-14 text-2xl font-black border-2 focus:ring-primary rounded-none bg-background font-mono"
                    placeholder={t.placeholderSens}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">{t.dpi}</Label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <Input
                    type="number"
                    value={dpi}
                    onChange={(e) => setDpi(e.target.value)}
                    className="pl-12 h-14 text-2xl font-black border-2 focus:ring-primary rounded-none bg-background font-mono"
                    placeholder={t.placeholderDpi}
                  />
                </div>
              </div>
            </div>

            {/* Source Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dashed">
              <div className="bg-background/50 p-4 border rounded-none">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t.edpi}</p>
                <p className="text-2xl font-black text-foreground font-mono italic">
                  {sourceEdpi.toFixed(0)}
                </p>
              </div>
              <div className="bg-background/50 p-4 border rounded-none">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t.cm360}</p>
                <p className="text-2xl font-black text-foreground font-mono italic">
                  {sourceCm360.toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Section */}
        <Card className="border-4 border-primary shadow-[0_0_50px_rgba(244,63,94,0.2)] bg-card overflow-hidden relative">
          <div className="bg-primary p-5 text-white flex justify-between items-center">
            <h2 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t.targetGame}
            </h2>
            <div className="px-3 py-1 bg-white/20 text-[10px] font-bold tracking-widest rounded uppercase">
              Output Ready
            </div>
          </div>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">{t.targetGame}</Label>
              <Select value={targetGame} onValueChange={setTargetGame}>
                <SelectTrigger className="h-14 text-lg font-black italic uppercase tracking-tight border-2 border-primary/30 rounded-none bg-primary/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-black italic uppercase">
                  {GAMES.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative group/sens">
              <div className="bg-primary/10 border-2 border-primary/30 p-10 flex flex-col items-center justify-center transition-all group-hover/sens:bg-primary/20 relative">
                <span className="text-[10px] font-black uppercase text-primary tracking-[0.3em] mb-4">
                  {t.convertedSens}
                </span>
                <div className="text-6xl md:text-8xl font-black italic tracking-tighter text-foreground font-mono drop-shadow-lg">
                  {convertedSens.toFixed(3)}
                </div>
                <Button 
                  onClick={handleCopy}
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 bottom-4 text-primary hover:bg-primary/20"
                >
                  {copied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                </Button>
              </div>
              {copied && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-tighter animate-in fade-in slide-in-from-top-2">
                  {t.copied}
                </div>
              )}
            </div>

            {/* Target Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dashed">
              <div className="bg-primary/5 p-4 border-2 border-primary/10">
                <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{t.edpi}</p>
                <p className="text-2xl font-black text-foreground font-mono italic">
                  {targetEdpi.toFixed(0)}
                </p>
              </div>
              <div className="bg-primary/5 p-4 border-2 border-primary/10">
                <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{t.cm360}</p>
                <p className="text-2xl font-black text-foreground font-mono italic">
                  {targetCm360.toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Esports Footer */}
      <footer className="w-full flex flex-col items-center gap-6 text-muted-foreground py-10">
        <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
          <span className="hover:text-primary transition-colors">VALORANT</span>
          <span className="hover:text-primary transition-colors">COUNTER-STRIKE 2</span>
          <span className="hover:text-primary transition-colors">OVERWATCH 2</span>
          <span className="hover:text-primary transition-colors">APEX LEGENDS</span>
          <span className="hover:text-primary transition-colors">RAINBOW SIX</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-border" />
          <p className="text-[11px] font-black tracking-[0.5em] text-primary bg-primary/5 px-8 py-3 transform skew-x-[-12deg] border-l-4 border-primary">
            <span className="transform skew-x-[12deg] block">{t.gamingMotto}</span>
          </p>
          <div className="h-[1px] w-12 bg-border" />
        </div>
      </footer>
    </div>
  )
}
