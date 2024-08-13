export const removeSeparator = (str: string): string[] => {
  const separator = str.split(":").map((item) => item.trim())
  return separator
}
export const formatVoteAverage = (voteAverage: number) => {
  const percentage = Math.round(voteAverage * 10)
  return percentage + "%"
}
export const rating = (percent: number) => {
  if (percent >= 70) return "green"
  else if (percent < 40) return "red"
  else return "yellow"
}
