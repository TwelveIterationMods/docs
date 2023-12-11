export default function getGameImage(game: string, icon: string) {
  return `https://game-images.pages.dev/${game}/${icon.replace(':', '/')}.png`
}