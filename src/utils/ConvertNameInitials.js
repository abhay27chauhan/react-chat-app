const LETTER_PATTERN = /^[a-z\u00C0-\u017F]/i;

// Return initials for a given name
export default function (name) {
  if (!name) return "";
  const nameTokens = name.toUpperCase().split(/[\s+-]/);
  let tokens = [];

  let initials = "";

  for (var i = 0; i < nameTokens.length; i++) {
    if (!LETTER_PATTERN.test(nameTokens[i])) {
      break;
    }

    tokens.push(nameTokens[i]);
  }

  if (tokens.length >= 1) {
    initials += tokens[0].substr(0, 1);
  }

  if (tokens.length >= 2) {
    let foundNonInitial = false;

    for (let i = 1; i < tokens.length; i++) {
      if (!tokens[i].match(/.\./)) {
        foundNonInitial = true;
        initials += tokens[i].substr(0, 1);
        break;
      }
    }

    if (!foundNonInitial) {
      initials += tokens[1].substr(0, 1);
    }
  }

  return initials;
}
