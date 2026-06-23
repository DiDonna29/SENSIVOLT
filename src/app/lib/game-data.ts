export interface GameInfo {
  id: string;
  name: string;
  multiplier: number; // Ratio compared to standard Source Engine (CS:GO/CS2)
}

export const GAMES: GameInfo[] = [
  { id: 'cs2', name: 'CS:GO / CS2 / Apex Legends', multiplier: 1.0 },
  { id: 'valorant', name: 'Valorant', multiplier: 0.3141 },
  { id: 'overwatch2', name: 'Overwatch 2 / CoD / Quake', multiplier: 3.3333 },
  { id: 'r6', name: 'Rainbow Six Siege (Hipfire)', multiplier: 0.1111 },
  { id: 'fortnite', name: 'Fortnite', multiplier: 0.1 },
  { id: 'battlefield', name: 'Battlefield', multiplier: 1.0 },
  { id: 'destiny2', name: 'Destiny 2', multiplier: 3.3333 },
  { id: 'minecraft', name: 'Minecraft', multiplier: 1.1111 },
];

export function convertSensitivity(
  value: number,
  sourceGameId: string,
  targetGameId: string
): number {
  const sourceGame = GAMES.find((g) => g.id === sourceGameId);
  const targetGame = GAMES.find((g) => g.id === targetGameId);

  if (!sourceGame || !targetGame || value <= 0) return 0;

  // Convert to CS:GO equivalent first
  const csSens = value * sourceGame.multiplier;
  // Convert from CS:GO to target
  return csSens / targetGame.multiplier;
}

export function calculateEdpi(sens: number, dpi: number): number {
  if (sens <= 0 || dpi <= 0) return 0;
  return sens * dpi;
}

export function calculateCm360(sens: number, dpi: number, gameId: string): number {
  const game = GAMES.find((g) => g.id === gameId);
  if (!game || sens <= 0 || dpi <= 0) return 0;

  // Standard Source Engine formula logic
  // cm/360 = (360 * 2.54) / (dpi * sens * m_yaw * engine_multiplier)
  const mYaw = 0.022;
  const inchesPer360 = 360 / (dpi * sens * (mYaw * game.multiplier));
  return inchesPer360 * 2.54;
}
