/*
 * A small syntax highlighter for the code samples on this page. It runs
 * during prerendering, so the colored code is in the HTML and the page
 * loads no highlighter library. It knows only the three languages that
 * the samples use.
 */

export type CodeLanguage = 'typescript' | 'shell' | 'xml';

export type TokenKind =
  | 'plain'
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'type'
  | 'tag'
  | 'attribute'
  | 'command';

export type Token = Readonly<{
  kind: TokenKind;
  text: string;
}>;

type Rule = Readonly<{
  kind: TokenKind;
  pattern: RegExp;
}>;

const TYPESCRIPT_KEYWORDS =
  'import|from|export|const|let|var|await|async|if|else|return|throw|new|function|typeof|null|undefined|true|false';

const RULES: Readonly<Record<CodeLanguage, readonly Rule[]>> = {
  typescript: [
    { kind: 'comment', pattern: /\/\/[^\n]*/y },
    { kind: 'string', pattern: /'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/y },
    {
      kind: 'keyword',
      pattern: new RegExp(`\\b(?:${TYPESCRIPT_KEYWORDS})\\b`, 'y'),
    },
    { kind: 'type', pattern: /\b[A-Z][A-Za-z0-9]*\b/y },
    { kind: 'function', pattern: /\b[a-z][A-Za-z0-9]*(?=\()/y },
    { kind: 'number', pattern: /\b\d+(?:\.\d+)?\b/y },
  ],
  shell: [
    { kind: 'comment', pattern: /#[^\n]*/y },
    { kind: 'command', pattern: /(?<=^|\n)[a-z]+\b/y },
    { kind: 'string', pattern: /@[\w./@-]+/y },
  ],
  xml: [
    { kind: 'comment', pattern: /<!--[\s\S]*?-->/y },
    { kind: 'tag', pattern: /<\/?[\w:.-]+|\/?>/y },
    { kind: 'attribute', pattern: /\b[\w:.-]+(?==)/y },
    { kind: 'string', pattern: /"[^"]*"/y },
  ],
};

/**
 * Splits code into colored tokens. Text that no rule matches is plain.
 * Joined together, the tokens always give the original code.
 */
export function highlight(code: string, language: CodeLanguage): Token[] {
  const rules = RULES[language];
  const tokens: Token[] = [];
  let plain = '';
  let index = 0;

  while (index < code.length) {
    const match = matchAt(code, index, rules);

    if (!match) {
      plain += code[index];
      index += 1;
      continue;
    }

    if (plain) {
      tokens.push({ kind: 'plain', text: plain });
      plain = '';
    }

    tokens.push(match);
    index += match.text.length;
  }

  if (plain) {
    tokens.push({ kind: 'plain', text: plain });
  }

  return tokens;
}

function matchAt(
  code: string,
  index: number,
  rules: readonly Rule[],
): Token | null {
  for (const rule of rules) {
    rule.pattern.lastIndex = index;
    const match = rule.pattern.exec(code);

    if (match && match[0].length > 0) {
      return { kind: rule.kind, text: match[0] };
    }
  }

  return null;
}
