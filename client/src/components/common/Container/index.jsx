import React from 'react';

export default function Container() {
  const layout = `
    display: flex;
    width: 267px;
    height: 75px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    `;
  return <article style={layout}></article>;
}
