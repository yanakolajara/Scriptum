export const generateContextContent = ({ chat }) => [
  {
    role: 'user',
    parts: [
      {
        text: `
The following is a transcript of the user talking about themselves. Use it to infer their context:

${chat.map((m) => m.parts.map((p) => p.text).join(' ')).join('\n')}
`,
      },
    ],
  },
];

export const updateContextContent = ({ currentContext, chat }) => [
  {
    role: 'user',
    parts: [
      {
        text: `
Current user context:
${JSON.stringify(currentContext, null, 2)}

New chat data to analyze:
${chat.map((m) => m.parts.map((p) => p.text).join(' ')).join('\n')}
              `.trim(),
      },
    ],
  },
];
