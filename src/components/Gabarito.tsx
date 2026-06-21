/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flag, HelpCircle } from 'lucide-react';
import { Question } from '../data/questionsGenerator';

interface GabaritoProps {
  questions: Question[];
  answers: { [qId: number]: number };
  flagged: { [qId: number]: boolean };
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
}

export default function Gabarito(props: GabaritoParams) {
  const {
    questions,
    answers,
    currentQuestionIndex,
    onSelectQuestion,
    onSelectAnswer,
    starredQuestions
  } = props;

  const totalQuestions = questions.length;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <span className="h-5 w-1.5 bg-blue-600 rounded-full"></span>
            HOJA DE RESPUESTAS (Gabarito)
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Use lápiz virtual para rellenar los círculos.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-blue-600"></span> Resuelto
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-amber-400"></span> Marcada
          </div>
        </div>
      </div>

      {/* RNE & Header */}
      <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-bold text-slate-600 mb-3 uppercase tracking-wider bg-slate-200/50 py-1.5 rounded-lg">
        <div>Preg.</div>
        <div className="col-span-3">Círculos de Selección</div>
      </div>

      {/* Bubble Grid */}
      <div id="gabarito-bubble-grid" className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[500px] lg:max-h-[600px]">
        {questions.map((q, idx) => {
          const isSelected = idx === currentQuestionIndex;
          const answeredIndex = answers[q.id];
          const isFlagged = starredQuestions[q.id];

          return (
            <div
              key={q.id}
              className={`flex items-center justify-between py-1 px-2 rounded-lg cursor-pointer transition select-none ${
                isSelected 
                  ? 'bg-blue-600/10 border border-blue-200' 
                  : 'hover:bg-slate-100 border border-transparent'
              }`}
              onClick={() => onSelectQuestion(idx)}
            >
              {/* Question Number & Flag indicator */}
              <div className="flex items-center gap-1.5 w-10 text-right">
                {isFlagged ? (
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" title="Marcada para revisión"></span>
                ) : answeredIndex !== undefined ? (
                  <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                )}
                <span className={`font-mono text-xs font-bold ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Bubbles A, B, C, D */}
              <div className="flex items-center gap-3.5">
                {['A', 'B', 'C', 'D'].map((letter, optIdx) => {
                  const isChecked = answeredIndex === optIdx;
                  return (
                    <button
                      key={letter}
                      id={`bubble-${q.id}-${letter}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid shifting the left page view
                        onSelectAnswer(q.id, optIdx);
                      }}
                      className={`h-6.5 w-6.5 text-[10px] font-bold rounded-full border-2 transition duration-150 flex items-center justify-center cursor-pointer ${
                        isChecked
                          ? 'bg-slate-700 border-slate-700 text-white font-black shadow-inner scale-102 scale-y-102 hover:bg-slate-800'
                          : 'bg-white hover:bg-slate-200 border-slate-300 text-slate-600 hover:border-slate-500'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Helpful Hint */}
      <div className="mt-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[10.5px] leading-relaxed text-slate-500 flex gap-2">
        <HelpCircle className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
        <span>Hacer clic en cualquier fila para saltar inmediatamente a esa de pregunta del cuadernillo. Rellene una y otra vez si desea cambiar de opción.</span>
      </div>
    </div>
  );
}

// Inline custom prop types matching actual TS structure
interface GabaritoParams {
  questions: Question[];
  answers: { [qId: number]: number };
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
  starredQuestions: { [qId: number]: boolean };
}
