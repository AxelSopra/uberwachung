export const PAUSE_DURATION_MIN = 5;
export const MAX_PAUSES = 4;
export const MAX_PAUSES_PER_HALF_DAY = 1;
export const HALF_DAY_PERIODS = [
  { start: 8, end: 12 },
  { start: 12, end: 20 }
];
export const AVATAR_LIST = [
  "😀", "😎", "🦊", "🐼", "🐧", "🐸", "🦁", "🐻", "🐨", "🐯", "🦄", "🐵", "🐶", "🐱", "🐰"
];

export function generateAnonymousName() {
  const animals = ["Aigle", "Tigre", "Loup", "Renard", "Panthère", "Ours", "Lynx", "Cerf", "Héron", "Chouette", "Dauphin", "Panda", "Zèbre", "Koala", "Gazelle"];
  const colors = ["bleu", "rouge", "vert", "jaune", "noir", "blanc", "gris", "orange", "violet", "rose", "marron", "argenté", "doré", "turquoise", "sable"];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `${animal} ${color}`;
}
