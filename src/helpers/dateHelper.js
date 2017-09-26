/**
 * returns true if it has been 5s since date was created
 */
export const isRecent = date => {
  const result = new Date() - date
  return result / 1000 <= 5
}
