/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Clock, CheckSquare, Award, AlertCircle } from 'lucide-react';
import { Student } from './StudentPortal';

interface HeaderProps {
  activeStudent: Student | null;
  subjectName: string;
  timeRemainingSeconds: number;
  onTimerExpire: () => void;
  isExamActive: boolean;
  totalQuestions: number;
  answeredCount: number;
  onGoToStart?: () => void;
}

export default function Header({
  activeStudent,
  subjectName,
  timeRemainingSeconds,
  onTimerExpire,
  isExamActive,
  totalQuestions,
  answeredCount,
  onGoToStart
}: HeaderProps) {
  
  // Format seconds to H:MM:SS
  const formatTime = (totalSecs: number) => {
    if (totalSecs <= 0) return '0:00:00';
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <header id="app-header" className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* State Shield & App Logo */}
        <div 
          onClick={() => {
            if (onGoToStart) {
              onGoToStart();
            }
          }}
          className="flex items-center gap-3 cursor-pointer select-none group"
          title="Regresar al inicio"
        >
          <div className="flex items-center justify-center h-10 w-11 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-black text-center text-sm shadow-inner shrink-0 transition duration-150 group-hover:scale-105 active:scale-95">
            DR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-yellow-100 group-hover:bg-yellow-250 text-yellow-800 font-bold px-1.5 py-0.5 rounded uppercase transition duration-150">SIMULACRO OFICIAL</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight font-semibold">6to SECUNDARIA</span>
            </div>
            <h1 className="text-md font-extrabold text-slate-800 group-hover:text-blue-900 tracking-tight leading-tight transition duration-150">
              {subjectName ? `Prueba Nacional: ${subjectName}` : 'Pruebas Nacionales Dominicana'}
            </h1>
          </div>
        </div>

        {/* Exam active metrics */}
        {isExamActive ? (
          <div className="flex flex-wrap items-center gap-4 bg-slate-50 border border-slate-200 py-2 px-4 rounded-2xl w-full md:w-auto">
            {/* Countdown timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold font-mono text-sm shadow-xs ${
              timeRemainingSeconds < 300 
                ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse' 
                : 'bg-white text-slate-700 border border-slate-200'
            }`}>
              <Clock className="h-4 w-4 shrink-0 text-blue-600" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            {/* Answered Progress bar */}
            <div className="flex-1 md:flex-initial min-w-[150px]">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                <span className="flex items-center gap-1 text-[11px]"><CheckSquare className="h-3 w-3 text-emerald-500" /> {answeredCount} de {totalQuestions}</span>
                <span>{progressPercentage.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          activeStudent && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 py-1.5 px-3.5 rounded-2xl transition duration-150">
              <Award className="h-4 w-4 text-blue-600" />
              <span>Estudiante activo: <strong>{activeStudent.name}</strong> ({activeStudent.rne})</span>
            </div>
          )
        )}
      </div>
    </header>
  );
}
