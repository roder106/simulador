/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
  isParagraph?: boolean;
}

/**
 * MathText is a custom renderer component that beautifully formats mathematical and 
 * scientific expressions. Text wrapped in backticks (e.g. `4^(x - 2) = 32`) or standard
 * scientific variables will be styled with beautiful monospaced fonts, colored accents, 
 * superscript/subscript tags, and refined operators.
 */
export default function MathText({ text, className = '', isParagraph = true }: MathTextProps) {
  if (!text) return null;

  // Render clean math helper to convert exponents/subscripts to unicode, make symbols clean and readable
  const convertCaretsToUnicode = (input: string): string => {
    const superscriptMap: Record<string, string> = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
      '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
      'x': 'ˣ', 'y': 'ʸ', 'u': 'ᵘ', 'v': 'ᵛ', 'n': 'ⁿ', 'm': 'ᵐ',
      'i': 'ⁱ', 'r': 'ʳ', 't': 'ᵗ', 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ',
      'd': 'ᵈ', 'p': 'ᵖ', 'q': 'ᵠ', ' ': ' ', '*': '·'
    };

    let result = input;
    
    // 1. Handle ^(...) first nested paren pattern
    const parenRegex = /\^(\(([^)]+)\))/g;
    result = result.replace(parenRegex, (_, __, p2) => {
      let converted = '';
      for (const char of p2) {
        if (superscriptMap[char] !== undefined) {
          converted += superscriptMap[char];
        } else {
          converted += char;
        }
      }
      return converted;
    });

    // 2. Handle single char/alphanumeric superscripts like ^2, ^x, ^-1, ^3
    const singleRegex = /\^([a-zA-Z0-9+-]+)/g;
    result = result.replace(singleRegex, (_, p1) => {
      let converted = '';
      for (const char of p1) {
        if (superscriptMap[char] !== undefined) {
          converted += superscriptMap[char];
        } else {
          converted += char;
        }
      }
      return converted;
    });

    return result;
  };

  const convertSubscriptsToUnicode = (input: string): string => {
    const subscriptMap: Record<string, string> = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
      '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
      'x': 'ₓ', 'y': 'ᵧ', 'u': 'ᵤ', 'v': 'ᵥ', 'n': 'ₙ', 'm': 'ₘ',
      'a': 'ₐ', 'e': 'ₑ', 'o': 'ₒ', 'r': 'ᵣ', 't': 'ₜ', ' ': ' '
    };

    let result = input;
    
    // 1. Handle _(...) first paren pattern
    const parenRegex = /_(\(([^)]+)\))/g;
    result = result.replace(parenRegex, (_, __, p2) => {
      let converted = '';
      for (const char of p2) {
        if (subscriptMap[char] !== undefined) {
          converted += subscriptMap[char];
        } else {
          converted += char;
        }
      }
      return converted;
    });

    // 2. Handle single char subscripts like _3 or _x or _n
    const singleRegex = /_([a-zA-Z0-9+-]+)/g;
    result = result.replace(singleRegex, (_, p1) => {
      if (p1 === 'query' || p1 === 'blank' || p1 === 'above' || p1 === 'under' || p1 === 'line') {
        // Exclude general URLs or variables that use underscores
        return `_${p1}`;
      }
      let converted = '';
      for (const char of p1) {
        if (subscriptMap[char] !== undefined) {
          converted += subscriptMap[char];
        } else {
          converted += char;
        }
      }
      return converted;
    });

    return result;
  };

  const cleanSymbolsAndFormulas = (input: string): string => {
    let result = input
      .replace(/=>/g, ' → ')
      .replace(/->/g, ' → ')
      .replace(/<=/g, ' ≤ ')
      .replace(/>=/g, ' ≥ ')
      .replace(/!=/g, ' ≠ ')
      .replace(/sqrt/g, '√')
      .replace(/\s\*\s/g, ' × ')
      .replace(/\s\s+/g, ' ')
      .replace(/\bpi\b/g, 'π')
      .replace(/\btheta\b/g, 'θ')
      .replace(/\balpha\b/g, 'α')
      .replace(/\bbeta\b/g, 'β');

    result = convertCaretsToUnicode(result);
    result = convertSubscriptsToUnicode(result);
    return result;
  };

  // Convert entire text symbols and exponents
  const cleanInputText = cleanSymbolsAndFormulas(text);

  // Split content by backticks: even indices are normal text, odd indices are math expressions
  const parts = cleanInputText.split('`');

  const formatMathSegment = (math: string, index: number) => {
    return (
      <span 
        key={`math-${index}`} 
        className="font-mono bg-blue-50/95 text-blue-900 border border-blue-200/40 px-1.5 py-0.5 rounded-lg mx-0.5 font-bold text-[12.5px] shadow-3xs inline-flex items-center align-middle"
      >
        {math}
      </span>
    );
  };

  const renderedContent = parts.map((part, index) => {
    const isMath = index % 2 !== 0;
    if (isMath) {
      return formatMathSegment(part, index);
    }
    
    // Style double asterisks **bold** inside normal text segments
    if (part.includes('**')) {
      const bParts = part.split('**');
      return bParts.map((bPart, bIdx) => {
        if (bIdx % 2 !== 0) {
          return <strong key={`b-${index}-${bIdx}`} className="font-extrabold text-slate-900">{bPart}</strong>;
        }
        return <span key={`n-${index}-${bIdx}`}>{bPart}</span>;
      });
    }

    return <span key={index}>{part}</span>;
  });

  if (isParagraph) {
    return <p className={`leading-relaxed whitespace-pre-wrap ${className}`}>{renderedContent}</p>;
  }

  return <span className={className}>{renderedContent}</span>;
}
