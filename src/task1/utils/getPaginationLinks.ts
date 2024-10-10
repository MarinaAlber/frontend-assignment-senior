const NextRegex: RegExp = /(?<=<)([\S]*)(?=>; rel="next")/i;
const PrevRegex: RegExp = /(?<=<)([\S]*)(?=>; rel="prev")/i;

export const getPaginationLinks = (link: string = "") => {
  const nextMatch = link.match(NextRegex);
  const prevMatch = link.match(PrevRegex);
  return {
    next: nextMatch ? nextMatch[0] : null,
    prev: prevMatch ? prevMatch[0] : null,
  };
};
