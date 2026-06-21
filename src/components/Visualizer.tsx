/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface VisualizerProps {
  questionId: number;
  category: string;
  subjectId: string;
  isReview?: boolean;
}

export default function Visualizer({ questionId, category, subjectId, isReview = false }: VisualizerProps) {
  // Renders specific high-quality pedagogical diagrams depending on the active question or category
  const renderDiagram = () => {

  // -------------------------------------------------------------------------
  // 1. MATHEMATICS (matematica)
  // -------------------------------------------------------------------------
  if (subjectId === 'matematica') {
    if (questionId === 1) {
      return (
        <div className="border border-slate-300 rounded-xl bg-slate-50 p-4 font-mono text-xs text-slate-705 max-w-sm mx-auto shadow-xs">
          <div className="text-center font-bold text-slate-500 mb-2 uppercase tracking-wide border-b pb-1">Procedimiento de Resolución</div>
          <div className="space-y-1">
            <p className="text-blue-700 font-bold border-r-4 border-blue-500 pr-2 inline-block">4^(x-2) = 32</p>
            <p><span className="text-slate-400 font-sans">Paso 1:</span> 2^(2(x-2)) = 2^5</p>
            <p><span className="text-slate-400 font-sans">Paso 2:</span> 2(x-2) = 5</p>
            <p className="text-red-600 line-through"><span className="text-slate-400 font-sans">Error Común:</span> 2x - 4 = 5 {"=>"} 2x = 7</p>
            {isReview ? (
              <p><span className="text-slate-400 font-sans">Paso 4:</span> x = 7/2 (3.5)</p>
            ) : (
              <p><span className="text-slate-400 font-sans">Paso 4:</span> x = despeje final (?)</p>
            )}
          </div>
        </div>
      );
    }

    if (questionId === 2) {
      return (
        <div className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Distribución de Cultivos Acuíferos</span>
          <div className="flex items-center gap-6">
            <svg className="w-24 h-24 transform -rotate-90 select-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" fill="none" stroke="#e2e8f0" strokeWidth="16" />
              {/* Plátanos: 45% */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="98.96 219.91" strokeDashoffset="0" />
              {/* Mangos: 30% */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f97316" strokeWidth="16" strokeDasharray="65.97 219.91" strokeDashoffset="-98.96" />
              {/* Aguacate: 15% */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="32.99 219.91" strokeDashoffset="-164.93" />
              {/* Cacao: 10% */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#6366f1" strokeWidth="16" strokeDasharray="21.99 219.91" strokeDashoffset="-197.92" />
              <circle cx="50" cy="50" r="22" fill="#ffffff" />
            </svg>
            <div className="text-[10px] text-slate-600 space-y-1 font-semibold">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" /><span>Plátanos: 45%</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#f97316]" /><span>Mangos: 30%</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]" /><span>Aguacate: 15%</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#6366f1]" /><span>Cacao: 10%</span></div>
            </div>
          </div>
          <span className="text-[9px] text-slate-400 mt-2 font-sans">Producción Total Registrada = 12,000 sacos</span>
        </div>
      );
    }

    if (questionId === 3) {
      return (
        <div className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Diseño del Acueducto Rural</span>
          <svg className="w-52 h-40 text-slate-700" viewBox="0 0 130 100">
            {/* Grid */}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={i} x1="15" y1={10 + i * 8} x2="115" y2={10 + i * 8} stroke="#f1f5f9" strokeWidth="0.8" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={i} x1={15 + i * 10} y1="10" x2={15 + i * 10} y2="90" stroke="#f1f5f9" strokeWidth="0.8" />
            ))}
            <line x1="15" y1="90" x2="120" y2="90" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="15" y1="5" x2="15" y2="90" stroke="#cbd5e1" strokeWidth="1.2" />
            {/* Segment A(2,3) to B(8,11) => X_svg = 15+x*10, Y_svg = 90-y*7 */}
            <line x1="35" y1="69" x2="95" y2="13" stroke="#2563eb" strokeWidth="2.5" />
            <circle cx="35" cy="69" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
            <text x="21" y="77" className="text-[7.5px] fill-slate-500 font-bold">A(2, 3)</text>
            <circle cx="95" cy="13" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
            <text x="98" y="20" className="text-[7.5px] fill-slate-500 font-bold">B(8, 11)</text>
            {/* Midpoint M(5,7) */}
            {isReview ? (
              <>
                <circle cx="65" cy="41" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                <text x="71" y="44" className="text-[8px] fill-amber-705 font-bold">M(5, 7)</text>
              </>
            ) : (
              <>
                <circle cx="65" cy="41" r="5" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
                <text x="71" y="44" className="text-[8px] fill-slate-400 font-bold">M(x_m, y_m)</text>
              </>
            )}
          </svg>
          <span className="text-[9.5px] text-slate-400 mt-1 font-sans">Punto Medio de Seguridad del Caudal</span>
        </div>
      );
    }

    if (questionId === 4) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 text-center">Cálculo de Límite: Discontinuidad Evitable</span>
          <svg className="w-44 h-32" viewBox="0 0 120 80">
            {/* Axes */}
            <line x1="15" y1="65" x2="110" y2="65" stroke="#cbd5e1" strokeWidth="1" /> {/* X axis */}
            <line x1="30" y1="10" x2="30" y2="75" stroke="#cbd5e1" strokeWidth="1" /> {/* Y axis */}
            {/* Curve representation f(x) = 1/(x+2) near x=2 */}
            {/* x going from 0 to 8. mapping X_svg = 30 + x*8, Y_svg = 65 - y*80 */}
            <path d="M 30 45 Q 62 45 110 50" fill="none" stroke="#2563eb" strokeWidth="2" />
            {/* Hole at x=2, y=0.25 (svg: x=46, y=45) */}
            <circle cx="46" cy="45" r="3.5" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
            {isReview ? (
              <text x="44" y="37" className="text-[7.5px] fill-rose-600 font-bold font-sans">Limit = 1/4</text>
            ) : (
              <text x="44" y="37" className="text-[7.5px] fill-rose-600 font-bold font-sans">Limit = ?</text>
            )}
            <text x="112" y="67" className="text-[6.5px] fill-slate-400 font-mono">X</text>
            <text x="21" y="71" className="text-[6.5px] fill-slate-400 font-mono">x=2</text>
          </svg>
          <span className="text-[9.5px] text-slate-400 mt-1 font-sans">La función original posee una discontinuidad en x = 2</span>
        </div>
      );
    }

    if (questionId === 5) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Lectura Angular: Reloj Pluviómetro</span>
          <svg className="w-28 h-28 text-slate-700" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
            {/* Tick marks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return <line key={i} x1={50 + 40 * Math.sin(angle)} y1={50 - 40 * Math.cos(angle)} x2={50 + 43 * Math.sin(angle)} y2={50 - 43 * Math.cos(angle)} stroke="currentColor" strokeWidth="1.5" />;
            })}
            {/* Hands pointing 5 o'clock */}
            <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50 + 26 * Math.sin(150 * Math.PI / 180)" y2="50 - 26 * Math.cos(150 * Math.PI / 180)" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            {/* Arc */}
            <path d="M 50 25 A 25 25 0 0 1 64.35 64.35" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
            {isReview ? (
              <text x="65" y="38" className="text-[8.5px] fill-amber-600 font-bold font-mono">150°</text>
            ) : (
              <text x="65" y="38" className="text-[8.5px] fill-amber-600 font-bold font-mono">θ = ?</text>
            )}
          </svg>
          {isReview ? (
            <span className="text-[9.5px] text-slate-400 mt-1 font-mono">Ángulo = 5h * 30° = 150°</span>
          ) : (
            <span className="text-[9.5px] text-slate-400 mt-1 font-mono">Calcula el ángulo barrido en radianes</span>
          )}
        </div>
      );
    }

    if (questionId === 6) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Discriminante f(x) = 2x² - 4x + 1</span>
          <svg className="w-40 h-32 text-slate-700" viewBox="0 0 100 100">
            <line x1="10" y1="65" x2="90" y2="65" stroke="#cbd5e1" strokeWidth="1" /> {/* X axis */}
            <line x1="40" y1="10" x2="40" y2="90" stroke="#cbd5e1" strokeWidth="1" /> {/* Y axis */}
            {/* Parabola vertex at x=1 (svg: 55), y=-1 (svg: 75), opening upwards */}
            <path d="M 25 20 Q 55 95 85 20" fill="none" stroke="#2563eb" strokeWidth="2" />
            {/* Crossing points */}
            <circle cx="43.5" cy="65" r="2.5" fill="#e11d48" />
            <circle cx="66.5" cy="65" r="2.5" fill="#e11d48" />
            <text x="21" y="58" className="text-[7px] fill-slate-500 font-semibold font-mono">f(x)=0 (Dos Intersecciones)</text>
          </svg>
          {isReview ? (
            <span className="text-[9.5px] text-slate-400 mt-1 font-sans">D = (-4)² - 4(2)(1) = 8 {">"} 0</span>
          ) : (
            <span className="text-[9.5px] text-slate-400 mt-1 font-sans">Comportamiento del Discriminante (D)</span>
          )}
        </div>
      );
    }

    if (questionId === 7) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Cálculo de la Mediana: Datos Ordenados</span>
          <div className="flex items-center gap-1.5 mb-2 font-mono text-sm font-bold">
            <span className="px-2.5 py-1 border border-slate-200 bg-slate-50 rounded-md text-slate-400">1</span>
            <span className="px-2.5 py-1 border-2 border-amber-500 bg-amber-50 rounded-md text-amber-700">3</span>
            <span className="px-2.5 py-1 border-2 border-amber-500 bg-amber-50 rounded-md text-amber-700">3</span>
            <span className="px-2.5 py-1 border border-slate-200 bg-slate-50 rounded-md text-slate-400">4</span>
          </div>
          <p className="text-[9.5px] text-slate-500 text-center font-semibold mb-1">Puesto que el tamaño par N = 4:</p>
          <div className="text-xs font-mono font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
            {isReview ? "Mediana = (3 + 3) / 2 = 3" : "Mediana = (elemento_2 + elemento_3) / 2 = ?"}
          </div>
        </div>
      );
    }

    if (questionId === 8) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-slate-50 font-mono text-xs font-bold text-slate-700 shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-center text-slate-400 mb-2 uppercase font-sans">Multiplicación de Matrices M × N</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className="text-2xl text-slate-400 font-thin">[</span>
              <div className="text-center px-1">
                <div>2 &nbsp; -5</div>
                <div>-1 &nbsp; 3</div>
              </div>
              <span className="text-2xl text-slate-400 font-thin">]</span>
            </div>
            <span className="text-slate-400">×</span>
            <div className="flex items-center">
              <span className="text-2xl text-slate-400 font-thin">[</span>
              <div className="text-center px-1">
                <div>4 &nbsp; 8</div>
                <div>-2 &nbsp; 2</div>
              </div>
              <span className="text-2xl text-slate-400 font-thin">]</span>
            </div>
          </div>
          {isReview ? (
            <span className="text-[8.5px] text-slate-400 font-sans mt-2">Fórmula: c_11 = (2)(4) + (-5)(-2) = 18</span>
          ) : (
            <span className="text-[8.5px] text-slate-400 font-sans mt-2">Calcula el elemento de la fila 1 y columna 1 (c_11)</span>
          )}
        </div>
      );
    }

    if (questionId === 9) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Derivada y Recta Tangente</span>
          <svg className="w-40 h-32" viewBox="0 0 100 100">
            <line x1="10" y1="70" x2="90" y2="70" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="20" y1="10" x2="20" y2="90" stroke="#cbd5e1" strokeWidth="1" />
            {/* Polynomial curve f(x) = 2x^3 + 5x */}
            <path d="M 20 85 Q 40 60 70 20" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            {/* Tangent line at a point (e.g. point at svg coordinates 50, 45) */}
            <line x1="30" y1="70" x2="70" y2="20" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2,2" />
            <circle cx="50" cy="45" r="3" fill="#e11d48" />
            <text x="56" y="48" className="text-[7.5px] fill-rose-600 font-bold font-sans">Razón de Cambio</text>
          </svg>
          <span className="text-[9.5px] text-slate-400 mt-1 font-sans">f'(x) = 6x² + 5</span>
        </div>
      );
    }

    if (questionId === 10) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tabla de Comprobación de Dos Dados</span>
          <div className="grid grid-cols-6 gap-1 text-[8.5px] font-mono leading-none select-none">
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 6 }).map((_, c) => {
                const isSuccess = (r + 1) * 2 === (c + 1); // Success condition: d2 = 2*d1. Rows (r) as d1, Cols (c) as d2
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-6 h-6 flex items-center justify-center border font-bold rounded-xs ${
                      isSuccess
                        ? 'bg-amber-100 text-amber-700 border-amber-400 scale-105 animate-pulse'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    {r + 1},{c + 1}
                  </div>
                );
              })
            )}
          </div>
          {isReview ? (
            <span className="text-[9px] text-slate-505 mt-2 font-semibold">Casos Favorables: (1,2), (2,4), (3,6) {"=>"} P = 3/36 = 1/12</span>
          ) : (
            <span className="text-[9px] text-slate-505 mt-2 font-semibold">Identifica la cantidad de casos favorables respecto al espacio muestral</span>
          )}
        </div>
      );
    }

    if (questionId === 11) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Diseño de Silo de Agua Cilíndrico</span>
          <svg className="w-24 h-32 text-indigo-600" viewBox="0 0 100 130">
            <ellipse cx="50" cy="20" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="20" x2="20" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="20" x2="80" y2="100" stroke="currentColor" strokeWidth="2" />
            <path d="M 20 100 A 30 8 0 0 0 80 100" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M 20 100 A 30 8 0 0 1 80 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="85" y1="20" x2="85" y2="100" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
            <text x="88" y="65" className="text-[9px] fill-rose-600 font-bold font-mono">h = 10m</text>
            <line x1="50" y1="20" x2="80" y2="20" stroke="#2563eb" strokeWidth="1.5" />
            <text x="58" y="16" className="text-[8px] fill-blue-600 font-bold font-mono">r = 3m</text>
            <circle cx="50" cy="20" r="1.5" fill="#2563eb" />
          </svg>
          <span className="text-[9px] text-slate-400 font-mono mt-1">Fórmula: V = π × r² × h</span>
        </div>
      );
    }

    if (questionId === 12) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Triangulación del Terreno en Constanza</span>
          <svg className="w-52 h-28 text-slate-700" viewBox="0 0 160 80">
            <ellipse cx="80" cy="45" rx="35" ry="15" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1" />
            <text x="68" y="48" className="text-[6.5px] fill-sky-600 font-sans tracking-wide">Lago</text>
            <polygon points="15,60 145,60 70,15" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M 62 20 A 10 10 0 0 0 78 20" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <text x="64" y="32" className="text-[7.5px] fill-blue-700 font-bold font-mono">C=60°</text>
            <text x="115" y="40" className="text-[8px] fill-slate-700 font-bold">a = 50 m</text>
            <text x="25" y="40" className="text-[8px] fill-slate-700 font-bold">b = 80 m</text>
            <text x="75" y="73" className="text-[8.5px] fill-rose-600 font-black">c = ?</text>
            <circle cx="15" cy="60" r="3" fill="#1e293b" />
            <text x="8" y="65" className="text-[8px] font-bold">A</text>
            <circle cx="145" cy="60" r="3" fill="#1e293b" />
            <text x="148" y="65" className="text-[8px] font-bold">B</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-mono">Ley del Coseno: c² = a² + b² - 2ab · cos(C)</span>
        </div>
      );
    }

    if (questionId === 13) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Histograma de Frecuencia de Calificaciones</span>
          <svg className="w-56 h-32" viewBox="0 0 160 100">
            <line x1="20" y1="10" x2="20" y2="80" stroke="#475569" strokeWidth="1.5" />
            <line x1="20" y1="80" x2="150" y2="80" stroke="#475569" strokeWidth="1.5" />
            <line x1="20" y1="65" x2="150" y2="65" stroke="#cbd5e1" strokeDasharray="2,2" />
            <text x="8" y="68" className="text-[7.5px] fill-slate-500 font-mono">2</text>
            <line x1="20" y1="50" x2="150" y2="50" stroke="#cbd5e1" strokeDasharray="2,2" />
            <text x="8" y="53" className="text-[7.5px] fill-slate-500 font-mono">3</text>
            <line x1="20" y1="20" x2="150" y2="20" stroke="#cbd5e1" strokeDasharray="2,2" />
            <text x="8" y="23" className="text-[7.5px] fill-slate-500 font-mono">5</text>
            <rect x="30" y="50" width="30" height="30" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="1" />
            <text x="45" y="45" className="text-[8px] fill-indigo-700 font-bold">f=3</text>
            <rect x="60" y="20" width="30" height="60" fill="#3b82f6" opacity="0.85" stroke="#1d4ed8" strokeWidth="1" />
            <text x="75" y="15" className="text-[8px] fill-blue-800 font-bold">f=5</text>
            <rect x="90" y="60" width="30" height="20" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
            <text x="105" y="55" className="text-[8px] fill-blue-700 font-bold">f=2</text>
            <text x="30" y="90" className="text-[7.5px] fill-slate-500 font-mono">10</text>
            <text x="60" y="90" className="text-[7.5px] fill-slate-500 font-mono">20</text>
            <text x="90" y="90" className="text-[7.5px] fill-slate-500 font-mono">30</text>
            <text x="120" y="90" className="text-[7.5px] fill-slate-500 font-mono">40</text>
            <text x="45" y="100" className="text-[6.5px] fill-indigo-500 font-semibold italic text-center">M1=15</text>
            <text x="75" y="100" className="text-[6.5px] fill-blue-500 font-semibold italic text-center">M2=25</text>
            <text x="105" y="100" className="text-[6.5px] fill-sky-600 font-semibold italic text-center">M3=35</text>
          </svg>
        </div>
      );
    }

    if (questionId === 14) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Representación del Sistema de Ventas</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <line x1="15" y1="95" x2="120" y2="95" stroke="#475569" strokeWidth="1.5" />
            <line x1="20" y1="10" x2="20" y2="100" stroke="#475569" strokeWidth="1.5" />
            <text x="110" y="105" className="text-[6.5px] fill-slate-400">x (Café)</text>
            <text x="5" y="18" className="text-[6.5px] fill-slate-400">y (Cacao)</text>
            <line x1="20" y1="35" x2="80" y2="95" stroke="#10b981" strokeWidth="2.5" />
            <text x="82" y="90" className="text-[6.5px] fill-emerald-600 font-bold">x + y = 30</text>
            <line x1="20" y1="55" x2="100" y2="95" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="85" y="75" className="text-[6px] fill-blue-600 font-bold">x + 2y = 40</text>
            {isReview ? (
              <>
                <circle cx="60" cy="75" r="4" fill="#ef4444" className="animate-ping" />
                <circle cx="60" cy="75" r="3.5" fill="#ef4444" />
                <text x="65" y="73" className="text-[8px] fill-rose-600 font-black">Cruce: (20, 10)</text>
                <text x="65" y="81" className="text-[7px] fill-slate-500 font-semibold font-sans">y = 10 Cacao</text>
              </>
            ) : (
              <>
                <circle cx="60" cy="75" r="3.5" fill="#3b82f6" />
                <text x="65" y="75" className="text-[8px] fill-blue-700 font-black font-sans">Punto de Intersección</text>
              </>
            )}
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Intersección de ambas restricciones</span>
        </div>
      );
    }

    if (questionId === 15) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ondas de Propagación Sismológica</span>
          <svg className="w-48 h-48 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 120 120">
            <line x1="10" y1="60" x2="110" y2="60" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="60" y1="10" x2="60" y2="110" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="80" cy="75" r="25" fill="#fecaca" opacity="0.3" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
            <circle cx="80" cy="75" r="15" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
            <circle cx="80" cy="75" r="5" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.75" />
            {isReview ? (
              <>
                <circle cx="80" cy="75" r="3.5" fill="#ef4444" />
                <line x1="80" y1="75" x2="105" y2="75" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="68" y="90" className="text-[8px] fill-rose-600 font-extrabold font-sans">Centro C(4, -3)</text>
                <text x="86" y="71" className="text-[7.5px] fill-blue-700 font-bold font-mono">Radio r = 5</text>
              </>
            ) : (
              <>
                <circle cx="80" cy="75" r="3.5" fill="#3b82f6" />
                <line x1="80" y1="75" x2="105" y2="75" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="68" y="90" className="text-[8px] fill-blue-600 font-bold font-sans">Epicentro C(h, k)</text>
                <text x="86" y="71" className="text-[7.5px] fill-slate-550 font-bold font-sans">Radio r</text>
              </>
            )}
            <text x="110" y="58" className="text-[6px] fill-slate-400 font-mono">+x</text>
            <text x="54" y="117" className="text-[6px] fill-slate-400 font-mono">-y</text>
          </svg>
          {isReview ? (
            <span className="text-[8.5px] text-slate-400 font-serif mt-1">Ecuación: (x - 4)² + (y + 3)² = 5²</span>
          ) : (
            <span className="text-[8.5px] text-slate-400 font-serif mt-1">Escribe la ecuación cartesiana de la circunferencia sísmica</span>
          )}
        </div>
      );
    }

    if (questionId === 16) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Arco Parabólico sobre Río Chavón</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <line x1="20" y1="90" x2="120" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="20" y1="10" x2="20" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 30 90 Q 70 20 110 90" fill="none" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="70" cy="20" r="3.5" fill="#ef4444" />
            <text x="70" y="14" textAnchor="middle" className="text-[8px] fill-rose-600 font-extrabold">Vértice: (20, 40)</text>
            <text x="30" y="100" textAnchor="middle" className="text-[6.5px] fill-slate-400 font-semibold">Pilar Principal</text>
            <text x="110" y="100" textAnchor="middle" className="text-[6.5px] fill-slate-400 font-semibold">Pilar Final</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Vértice (h, k) indica altura máxima</span>
        </div>
      );
    }

    if (questionId === 17) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Canasta Básica por Macro-Región</span>
          <div className="w-full space-y-2 py-1 col-span-3">
            <div className="space-y-1">
              <div className="flex justify-between text-[8.5px] font-medium text-slate-600">
                <span>Metropolitana</span>
                <span className="font-bold text-slate-900 font-mono">RD$ 40,000</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[8.5px] font-medium text-slate-600">
                <span>Cibao Norte</span>
                <span className="font-bold text-slate-900 font-mono">RD$ 36,000</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-550 h-full rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
            <div className={`space-y-1 p-1 rounded-lg ${isReview ? 'bg-amber-50 border border-amber-200' : ''}`}>
              <div className="flex justify-between text-[8.5px] font-medium text-slate-600">
                <span className="font-bold text-amber-800">Región Sur</span>
                <span className="font-black text-amber-950 font-mono">RD$ 32,000</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[8.5px] font-medium text-slate-600">
                <span>Región Este</span>
                <span className="font-bold text-slate-900 font-mono">RD$ 34,000</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
          <span className="text-[8.5px] text-slate-400 font-sans mt-0.5 text-center block">La Región Sur presenta un costo 20% menor</span>
        </div>
      );
    }

    if (questionId === 18) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Triángulo del Faro de Punta Torrecilla</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <path d="M 25 20 L 25 85 L 105 85 Z" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <line x1="25" y1="20" x2="65" y2="20" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M 25 20 Q 35 20 33 24" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <text x="38" y="16" className="text-[7.5px] fill-rose-600 font-black">Depresión: 30°</text>
            <text x="12" y="55" className="text-[8px] font-bold fill-slate-700">h = 40m</text>
            <text x="65" y="93" className="text-[8px] font-mono font-bold fill-blue-700">d = 40 * √3 = 69.28m</text>
            <text x="100" y="85" className="text-sm">🚢</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Ángulo de elevación alterno interno es de 30°</span>
        </div>
      );
    }

    if (questionId === 19) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-2xl p-4 max-w-sm mx-auto shadow-xs text-xs font-sans relative">
          <div className="text-center font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-2">Simulación de Microcrédito (Vallejuelo)</div>
          <table className="w-full text-[9px] border-collapse bg-white rounded-xl shadow-3xs overflow-hidden border">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-1 px-2 text-left font-bold text-slate-500">Esquema Financiero</th>
                <th className="p-1 text-center font-bold text-slate-500">Tasa Anual</th>
                <th className="p-1 text-right font-bold text-slate-500">Monto Final (2 años)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-1 px-2 text-slate-600 font-semibold">A - Interés Simple</td>
                <td className="p-1 text-center text-slate-505">10%</td>
                <td className="p-1 text-right font-bold text-slate-800 font-mono">RD$ 120,000</td>
              </tr>
              <tr className="bg-orange-50/20">
                <td className="p-1 px-2 text-amber-800 font-bold">B - Interés Compuesto</td>
                <td className="p-1 text-center text-slate-500">10%</td>
                <td className="p-1 text-right font-black text-rose-700 font-mono">RD$ 121,000</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 text-[8px] text-center font-mono text-slate-400">Diferencial de Intereses Acumulados: <span className="font-black text-rose-600">RD$ 1,000</span></div>
        </div>
      );
    }

    if (questionId === 20) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Predio Agrícola de Zanahorias</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <path d="M 35 25 L 95 25 L 115 85 L 15 85 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
            <line x1="35" y1="25" x2="35" y2="85" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="40" y="55" className="text-[8px] font-extrabold fill-slate-700">altura = 80m</text>
            <text x="65" y="18" textAnchor="middle" className="text-[9px] font-bold fill-amber-700">Base menor = 120m</text>
            <text x="65" y="98" textAnchor="middle" className="text-[9px] font-bold fill-amber-800">Base mayor = 180m</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1 text-center">Área = ((Base Mayor + Base Menor) * altura) / 2 = 12,000 m²</span>
        </div>
      );
    }

    if (questionId === 21) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-2xl p-4 max-w-sm mx-auto shadow-xs text-center text-xs font-sans relative">
          <div className="text-[9px] font-bold text-blue-700 uppercase tracking-widest mb-2">Cálculo de Determinante de Matriz</div>
          <div className="flex justify-center items-center gap-4 py-2 bg-white rounded-xl border border-slate-100 mb-2">
            <span className="text-xl font-light text-slate-400">[</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono font-bold text-sm text-slate-800">
              <span>4</span> <span>6</span>
              <span>2</span> <span>8</span>
            </div>
            <span className="text-xl font-light text-slate-400">]</span>
          </div>
          <span className="text-[8px] text-slate-400 font-mono block">Determinante: (4 * 8) - (6 * 2) = 32 - 12 = <span className="font-extrabold text-blue-700">20</span></span>
        </div>
      );
    }

    if (questionId === 22) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Torre de Señal en el Santo Cerro</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <path d="M 25 25 L 25 85 L 105 85 Z" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="14" y="55" className="text-[7.5px] font-mono fill-blue-700 font-bold">h = ?</text>
            <text x="65" y="96" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-600">Base = 30 metros</text>
            <path d="M 105 85 L 90 85 A 15 15 0 0 1 93 74 Z" fill="#fef3c7" opacity="0.6" stroke="#d97706" />
            <text x="82" y="81" className="text-[7.5px] font-black fill-amber-700">30°</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Altura = 30 * tan(30°) = 17.32 metros</span>
        </div>
      );
    }

    if (questionId === 23) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Histograma de Frecuencia de Alumnos</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 135 110">
            <line x1="20" y1="90" x2="130" y2="90" stroke="#475569" strokeWidth="1.5" />
            <line x1="20" y1="10" x2="20" y2="90" stroke="#475569" strokeWidth="1.5" />
            <rect x="50" y="30" width="30" height="60" fill="#3b82f6" opacity="0.8" stroke="#1d4ed8" />
            <text x="65" y="25" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">f = 18</text>
            <rect x="80" y="50" width="30" height="40" fill="#10b981" opacity="0.8" stroke="#047857" />
            <text x="95" y="45" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">f = 12</text>
            <text x="65" y="98" textAnchor="middle" className="text-[6.5px] font-semibold fill-slate-500">70-79</text>
            <text x="95" y="98" textAnchor="middle" className="text-[6.5px] font-semibold fill-slate-500">80-89</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Suma acumulada de aprobados: 18 + 12 = 30 alumnos</span>
        </div>
      );
    }

    if (questionId === 24) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Estanque Circular de Jarabacoa</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <circle cx="65" cy="55" r="35" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M 65 55 L 65 20 A 35 35 0 0 1 95.3 37.5 Z" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.5" />
            <circle cx="65" cy="55" r="2.5" fill="#1d4ed8" />
            <text x="75" y="32" className="text-[7.5px] font-bold fill-blue-800">60°</text>
            <line x1="65" y1="55" x2="40" y2="79" stroke="#64748b" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="44" y="66" className="text-[7px] font-mono fill-slate-505 font-bold">r = 6m</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Área sector = (π * 6² * 60) / 360 = 6π m²</span>
        </div>
      );
    }

    if (questionId === 25) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Diagrama de Venn: Preferencias Deportivas</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <circle cx="50" cy="55" r="28" fill="#a5b4fc" opacity="0.5" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="80" cy="55" r="28" fill="#fecaca" opacity="0.5" stroke="#ef4444" strokeWidth="1.5" />
            <text x="35" y="58" className="text-[8px] font-black fill-indigo-700 text-center">B: 30%</text>
            <text x="65" y="58" textAnchor="middle" className="text-[8px] font-extrabold fill-slate-800 text-center">B ∩ V: 30%</text>
            <text x="95" y="58" className="text-[8px] font-black fill-rose-600 text-center">V: 20%</text>
            <text x="65" y="95" textAnchor="middle" className="text-[7.5px] font-mono fill-slate-550 font-bold text-center">Exterior: 20% (Ninguno)</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Unión: 30% + 30% + 20% = 80%. Exterior: 100% - 80% = 20%.</span>
        </div>
      );
    }

    if (questionId === 26) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recta Tangente en Curva de Productividad</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <path d="M 20 90 Q 65 15 110 90" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="82" cy="40" r="3.5" fill="#ef4444" />
            <line x1="60" y1="52" x2="105" y2="28" stroke="#10b981" strokeWidth="2" strokeDasharray="3,2" />
            <text x="86" y="36" className="text-[7.5px] font-black fill-emerald-600">f&apos;(3) = 2 (Pendiente)</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">La derivada f&apos;(x) determina la pendiente tangente</span>
        </div>
      );
    }

    if (questionId === 27) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Trayectorias de Embarcaciones en Samaná</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <path d="M 30 80 L 100 80 L 80 35 Z" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="65" y="90" textAnchor="middle" className="text-[7.5px] font-semibold fill-slate-500">Barco A: 5 km</text>
            <text x="40" y="55" className="text-[7.5px] font-semibold fill-slate-500">Barco B: 4 km</text>
            <text x="96" y="55" className="text-[8.5px] font-bold fill-blue-700 font-mono">d = √21 ≈ 4.58 km</text>
            <path d="M 30 80 Q 40 80 38 73" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <text x="43" y="77" className="text-[7.5px] font-black fill-amber-700">60°</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Ley de Cosenos: d² = 4² + 5² - 2(4)(5)*cos(60°) = 21</span>
        </div>
      );
    }

    if (questionId === 28) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Trayecto de Fibra Óptica Coordenada</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <line x1="20" y1="90" x2="120" y2="90" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="20" y1="10" x2="20" y2="90" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="30" y1="80" x2="110" y2="20" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="30" cy="80" r="3.5" fill="#2563eb" />
            <text x="35" y="84" className="text-[7.5px] font-bold fill-slate-600">A(1, 2)</text>
            <circle cx="110" cy="20" r="3.5" fill="#2563eb" />
            <text x="100" y="14" className="text-[7.5px] font-bold fill-slate-600">B(7, 10)</text>
            <text x="75" y="45" className="text-[8.5px] font-mono font-black fill-emerald-600">d = 10 km</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1 text-center">Longitud: d = √((7 - 1)² + (10 - 2)²) = 10 km</span>
        </div>
      );
    }

    if (questionId === 29) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-2xl p-4 max-w-sm mx-auto shadow-xs text-xs font-sans relative">
          <div className="text-center font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-2">Simulación de Interés Simple (Arrocero Nagua)</div>
          <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1 text-left text-[9.5px]">
            <p className="flex justify-between"><span>Capital Inicial (P):</span> <span className="font-bold">RD$ 200,000</span></p>
            <p className="flex justify-between"><span>Tasa Anual (r):</span> <span className="font-semibold">12%</span></p>
            <p className="flex justify-between"><span>Plazo en Tiempo (t):</span> <span className="font-semibold">1.5 Años (18 meses)</span></p>
            <div className="border-t my-1" />
            <p className="flex justify-between text-emerald-800 font-bold"><span>Interés Acumulado (I):</span> <span>RD$ 36,000</span></p>
            <p className="flex justify-between text-blue-800 font-black"><span>Monto Acumulado Total:</span> <span>RD$ 236,000</span></p>
          </div>
        </div>
      );
    }

    if (questionId === 30) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tabla de Verdad: Condicional Implicativo (p → q)</span>
          <table className="border-collapse border-2 border-slate-300 font-mono text-[9px] text-center w-full max-w-[130px]">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300">
                <th className="p-1 font-bold">p</th>
                <th className="p-1 font-bold">q</th>
                <th className="p-1 font-extrabold text-blue-700">p → q</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-1">V</td>
                <td className="p-1">V</td>
                <td className="p-1 font-bold">V</td>
              </tr>
              <tr className="border-b">
                <td className="p-1">V</td>
                <td className="p-1">F</td>
                <td className="p-1 font-bold text-red-500">F</td>
              </tr>
              <tr className="bg-emerald-50/50 border-b border-emerald-100">
                <td className="p-1 font-bold text-rose-600">F</td>
                <td className="p-1 font-bold text-emerald-600">V</td>
                <td className="p-1 font-black text-emerald-700">V</td>
              </tr>
              <tr>
                <td className="p-1">F</td>
                <td className="p-1">F</td>
                <td className="p-1 font-bold">V</td>
              </tr>
            </tbody>
          </table>
          <span className="text-[8.5px] text-slate-400 font-sans mt-2">La implicación es verdadera si el antecedente es falso.</span>
        </div>
      );
    }

    return null;
  }

  // -------------------------------------------------------------------------
  // 2. SPANISH LANGUAGE (espanol)
  // -------------------------------------------------------------------------
  if (subjectId === 'espanol') {
    if (questionId === 1) {
      return (
        <div className="border border-slate-200 rounded-2xl bg-slate-50 p-3.5 max-w-sm mx-auto shadow-xs text-xs font-sans">
          <div className="text-center font-bold text-slate-400 uppercase tracking-widest text-[9.5px] mb-2">Estructura Argumental del Ensayo</div>
          <div className="space-y-1.5">
            <div className="bg-blue-600 text-white rounded-md p-1.5 text-center font-bold text-[10px]">Tesis: "La familia es el núcleo existencial de la sociedad"</div>
            <div className="flex gap-2">
              <div className="bg-white border rounded-sm p-1 text-[9.5px] text-slate-600 flex-1 text-center font-medium">Motivaciones Afectivas</div>
              <div className="bg-white border rounded-sm p-1 text-[9.5px] text-slate-600 flex-1 text-center font-medium">Forja de Hábitos</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-md p-1.5 text-center font-semibold text-[9.5px] text-red-700">Riesgo Societal: Debilitamiento estructural = {">"} Criminalidad</div>
          </div>
        </div>
      );
    }

    if (questionId === 2) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Afinidad de Campo Semántico</span>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1.5 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-extrabold text-[10.5px]">Modelar</div>
            <span className="text-slate-400">↔</span>
            <div className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md">FORJAR</div>
            <span className="text-slate-400">↔</span>
            <div className="px-2.5 py-1.5 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-extrabold text-[10.5px]">Construir</div>
          </div>
          {isReview ? (
            <div className="mt-2 text-[9px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-100">Antónimo: Destruir</div>
          ) : (
            <div className="mt-2 text-[9px] text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded-sm border border-slate-200">Antónimo: (¿?)</div>
          )}
        </div>
      );
    }

    if (questionId === 3) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2">Cronología del Cuento "Luis Pie"</span>
          <div className="relative pl-4 border-l-2 border-amber-400 space-y-3 font-sans text-[10px] py-1 w-full text-left">
            {isReview ? (
              <>
                <div className="text-left">
                  <span className="absolute -left-[5px] top-[4px] w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <p className="font-bold text-slate-500 leading-none">Viernes por la Tarde</p>
                  <p className="text-slate-600 text-[9px] mt-0.5">Sufre un corte en el pie con hierro viejo cortando caña.</p>
                </div>
                <div className="text-left">
                  <span className="absolute -left-[5px] top-[44px] w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <p className="font-bold text-red-650 leading-none">Sábado por la Noche</p>
                  <p className="text-slate-605 font-semibold text-[9px] mt-0.5">Aturdido por la fiebre, parálisis temporal y debilidad física.</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-left">
                  <span className="absolute -left-[5px] top-[4px] w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <p className="font-bold text-slate-400 leading-none">Día de la Infección (¿?)</p>
                  <p className="text-slate-500 text-[9px] mt-0.5">Analiza el desfase de tiempo sugerido por el narrador sobre el cañaveral.</p>
                </div>
                <div className="text-left">
                  <span className="absolute -left-[5px] top-[44px] w-2.5 h-2.5 rounded-full bg-red-400" />
                  <p className="font-bold text-slate-500 leading-none">Sábado por la Noche (Establecido)</p>
                  <p className="text-slate-500 text-[9px] mt-0.5">Luis Pie es visto a lo lejos arrastrando su cuerpo por el camino...</p>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    if (questionId === 4) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Tres Fases Claves del Storytelling</span>
          <div className="flex gap-1.5 text-[9px] font-bold select-none text-center">
            <span className="flex-1 px-1.5 py-2 bg-slate-50 border rounded-lg text-slate-500">1. Introducción</span>
            <span className="flex-1 px-1.5 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">2. Nudo / Conflicto</span>
            <span className="flex-1 px-1.5 py-2 bg-slate-50 border rounded-lg text-slate-500">3. Desenlace</span>
          </div>
        </div>
      );
    }

    if (questionId === 5) {
      return (
        <div className="border border-slate-300 rounded-2xl bg-white max-w-xs mx-auto overflow-hidden shadow-sm">
          <div className="bg-slate-800 text-white p-2 text-center select-none">
            <p className="text-[7.5px] font-mono tracking-widest text-slate-400">PRENSA NACIONAL DOMINICANA</p>
            <p className="font-serif font-bold text-sm tracking-tight leading-none my-1">Diario de la Reforestación</p>
          </div>
          <div className="p-3 text-[9.5px]">
            <p className="font-bold text-slate-700 border-b pb-1 mb-2">(ENTRADILLA) Santo Domingo, R.D.</p>
            <p className="text-slate-600 italic leading-snug">
              Se anuncia una movilización nacional en la Cuenca de los Ríos. Se evalúa el tipo de secuencia <span className="font-bold text-blue-700">expositivo-informativa</span> para detallar los propósitos.
            </p>
          </div>
        </div>
      );
    }

    if (questionId === 6) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Recursos de Salomé Ureña</span>
          <div className="w-full text-[10px] rounded-lg border p-2 bg-amber-50 border-amber-200 text-amber-900 leading-snug italic">
            "¡Patria querida, tu soberana cumbre desafía la aurora..."
          </div>
          <div className="flex gap-2 w-full mt-2 justify-center text-[9px] font-extrabold text-white">
            <span className="px-2 py-0.5 bg-blue-600 rounded-md">Personificación</span>
            <span className="px-2 py-0.5 bg-purple-600 rounded-md">Metáfora</span>
          </div>
        </div>
      );
    }

    if (questionId === 7) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-slate-50 shadow-xs max-w-sm mx-auto text-[10px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Estructura de la Oración Sintáctica</span>
          <div className="w-full space-y-1.5 select-none">
            <div className="bg-white border rounded-md p-1.5 flex justify-between items-center">
              <span className="text-amber-705 font-bold">SUJETO</span>
              <span className="font-bold">La <span className="underline decoration-blue-650 decoration-2 font-serif text-blue-700">soberanía</span> nacional</span>
              <span className="text-[8.5px] font-mono text-slate-400">(Núcleo: "soberanía")</span>
            </div>
            <div className="bg-white border rounded-md p-1.5 flex justify-between items-center">
              <span className="text-emerald-700 font-bold">PREDICADO</span>
              <span className="text-slate-600">florece con el civismo firme...</span>
              <span className="text-[8.5px] font-mono text-slate-400">(Núcleo: "florece")</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 8) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Jakobson: Función Apelativa / Conativa</span>
          <svg className="w-56 h-20 text-slate-700" viewBox="0 0 150 50">
            {/* Emisor */}
            <rect x="5" y="10" width="35" height="18" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
            <text x="11" y="22" className="text-[7.5px] fill-slate-600 font-bold">Emisor</text>
            {/* Arrow with mandate */}
            <line x1="40" y1="19" x2="110" y2="19" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="110,19 105,16 105,22" fill="#e11d48" />
            <text x="45" y="14" className="text-[7px] fill-rose-600 font-extrabold tracking-tight">"¡Vacúnate por tu país!"</text>
            {/* Receptor */}
            <rect x="110" y="10" width="35" height="18" rx="4" fill="#2563eb" stroke="#1d4ed8" />
            <text x="114" y="22" className="text-[7.5px] fill-white font-bold">Receptor</text>
          </svg>
          {isReview ? (
            <span className="text-[9.5px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded border border-green-100">Búsqueda implícita: Modificar la conducta del receptor</span>
          ) : (
            <span className="text-[9.5px] text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200">Búsqueda implícita: ¿?</span>
          )}
        </div>
      );
    }

    if (questionId === 9) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-[10px]">
          <span className="text-[10.5px] font-bold text-slate-400 uppercase mb-2">Clasificación de Acentuación RAE</span>
          <div className="grid grid-cols-2 gap-2 w-full font-mono">
            <div className="bg-purple-50 p-1 rounded border border-purple-200 text-center">
              <span className="font-sans block text-[8px] uppercase font-bold text-purple-400 leading-none">Esdrújulas</span>
              <span className="font-bold text-purple-800">prís-ti-no</span>
            </div>
            <div className="bg-emerald-50 p-1 rounded border border-emerald-200 text-center">
              <span className="font-sans block text-[8px] uppercase font-bold text-emerald-400 leading-none">Águdas</span>
              <span className="font-bold text-emerald-800">co-ra-zón / a-sí</span>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-200 text-center col-span-2">
              <span className="font-sans block text-[8px] uppercase font-bold text-blue-400 leading-none">Graves / Llanas</span>
              <span className="font-bold text-blue-800">fá-cil</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 10) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-slate-50 shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Cohesión: Selección de Conectores</span>
          <div className="flex flex-col gap-1.5 w-full font-serif italic text-slate-600">
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-3xs flex items-center justify-between">
              <span className="font-sans font-bold text-[9px] text-slate-400 block uppercase leading-none">Consecutivo</span>
              {isReview ? (
                <span className="font-sans font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100">por consiguiente,</span>
              ) : (
                <span className="font-sans font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm border">¿?</span>
              )}
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-3xs flex items-center justify-between">
              <span className="font-sans font-bold text-[9px] text-slate-400 block uppercase leading-none">Límite Temporal</span>
              {isReview ? (
                <span className="font-sans font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100">hasta que</span>
              ) : (
                <span className="font-sans font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm border">¿?</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 11) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-slate-50 shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Comparativa: Ensayo vs Poesía Lírica</span>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-3xs">
              <span className="font-bold text-[9.5px] text-blue-700 uppercase tracking-wider block mb-1">Ensayo</span>
              <p className="text-[10px] leading-tight text-slate-500 font-sans italic">"Prosa rigurosa, argumentos lógicos, estructura lineal secuencial."</p>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-3xs">
              <span className="font-bold text-[9.5px] text-rose-700 uppercase tracking-wider block mb-1">Poesía Lírica</span>
              <p className="text-[10px] leading-tight text-slate-500 font-sans italic">"Métrica de versos, rima musical consonante, emoción pura."</p>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 12) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-slate-50 shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Perspectiva del Narrador: Primera Plural</span>
          <div className="bg-white px-3.5 py-1.5 rounded-xl border border-indigo-200 shadow-3xs flex items-center justify-center gap-3 w-full">
            <span className="text-lg font-bold text-indigo-700">NOSOTROS</span>
            <div className="h-5 w-[1px] bg-indigo-200" />
            <span className="text-[9.5px] text-slate-500 font-sans">
              Uso de: <span className="font-mono font-bold text-indigo-600">"nosotros", "sabíamos", "nuestra"</span>
            </span>
          </div>
        </div>
      );
    }

    if (questionId === 13) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Efecto de Aliteración Fónica</span>
          <div className="bg-sky-50 border border-sky-300 rounded-xl p-3 text-center text-[11px] leading-relaxed w-full font-serif font-semibold italic text-sky-900">
            "El tierno <span className="text-rose-600 border-b border-rose-400 px-0.5 font-bold">S</span>ilbo de lo<span className="text-rose-600 border-b border-rose-400 px-0.5 font-bold">S</span> viento<span className="text-rose-600 border-b border-rose-400 px-0.5 font-bold">S</span> <span className="text-rose-600 border-b border-rose-400 px-0.5 font-bold">S</span>uave<span className="text-rose-600 border-b border-rose-400 px-0.5 font-bold">S</span> <span className="text-rose-600 border-b border-rose-400 px-0.5 font-bold">S</span>u<span className="text-rose-600 border-b border-rose-400 px-0.5 font-bold">S</span>pira..."
            <div className="text-[9px] font-sans font-bold text-sky-600 not-italic mt-1 bg-white inline-block px-2 py-0.5 rounded border border-sky-100">Imita el silbido fónico del viento suave</div>
          </div>
        </div>
      );
    }

    if (questionId === 14) {
      return (
        <div className="flex flex-col items-center justify-center p-2.5 border border-slate-200 rounded-2xl bg-slate-50 shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Oratoria: Conector de Refutación</span>
          <div className="bg-white p-2.5 rounded-lg border border-red-200 w-full text-center">
            {isReview ? (
              <span className="font-bold text-rose-750 bg-rose-50 px-2.5 py-1 rounded border border-rose-100 font-mono text-[11px]">Por el contrario / Sin embargo</span>
            ) : (
              <span className="font-bold text-slate-550 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono text-[11px]">¿Cuál conector refuta con respeto?</span>
            )}
            <div className="text-[9.5px] text-slate-400 italic mt-1.5">Conector idóneo de oposición rigurosa y respetuosa</div>
          </div>
        </div>
      );
    }

    if (questionId === 15) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-slate-50 shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Desglose de Registro Semántico</span>
          <div className="grid grid-cols-2 gap-3 w-full text-center">
            <div className="bg-white p-1.5 rounded border border-slate-200 opacity-60">
              <span className="block text-[8px] uppercase font-bold text-slate-400">Denotativo Literal</span>
              <span className="font-semibold text-[10px] text-slate-700">Metal áureo físico</span>
            </div>
            <div className="bg-emerald-50 p-1.5 rounded border border-emerald-300">
              <span className="block text-[8px] uppercase font-bold text-emerald-500">Connotativo Figurado</span>
              <span className="font-black text-[10px] text-emerald-800">Bondad y nobleza</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 16) {
      return (
        <div className="border border-amber-200 rounded-2xl bg-amber-50/40 p-4 max-w-sm mx-auto shadow-xs text-xs font-serif leading-relaxed relative overflow-hidden">
          {/* Subtle sun in background */}
          <div className="absolute -right-6 -top-6 w-16 h-16 bg-amber-200/50 rounded-full blur-xl" />
          <div className="text-center font-sans font-bold text-amber-600 uppercase tracking-widest text-[8.5px] mb-2 border-b border-amber-200 pb-1">Pedro Mir - Poesía Nacional</div>
          <div className="italic text-center text-slate-800 space-y-1">
            <p>"Hay un país en el mundo</p>
            <p className="font-bold text-amber-700">colocado en el mismo trayecto del sol."</p>
            <p>Errante y campesino. Cantarín y penoso.</p>
            <p>Y no es más que un soplo de libertad..."</p>
          </div>
          <div className="mt-3 text-center text-[9px] font-sans text-slate-450">Análisis: Metáfora de localización caribeña vinculada a realidades de penuria campesina.</div>
        </div>
      );
    }

    if (questionId === 17) {
      return (
        <div className="border border-slate-300 bg-slate-50 p-4 max-w-sm mx-auto shadow-xs text-xs font-sans relative">
          <div className="bg-slate-800 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 absolute top-0 left-4 rounded-b">COLUMNA DE OPINIÓN</div>
          <div className="text-center font-serif font-extrabold text-base text-slate-800 pt-1 mb-2 border-b-2 border-slate-800 pb-1 uppercase tracking-tight">El Eco Nacional</div>
          <p className="text-[10px] text-slate-700 font-serif leading-relaxed italic border-l-2 border-red-500 pl-2 bg-white p-2 rounded">
            "El progresivo ahogamiento de la cuenca media del <span className="underline decoration-red-500 font-bold">Río Ozama</span> debido al vertido de plásticos urbanos e industriales <span className="font-black bg-yellow-101">representa un colapso ecológico</span> que amenaza de raíz la salud colectiva de miles de familias..."
          </p>
          <div className="mt-2.5 flex justify-between items-center text-[8.5px] font-mono text-slate-400">
            <span>Rhetoric: Persuasivo / Crítico</span>
            <span className="text-red-600 font-bold">★ Tesis Directa</span>
          </div>
        </div>
      );
    }

    if (questionId === 18) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto select-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Cartografía Lingüística: Geolectos Dominicanos</span>
          <svg className="w-52 h-28 text-slate-700" viewBox="0 0 150 80">
            {/* Outline of Dominican Republic (simple shape representation) */}
            <path d="M 15,40 A 40,25 0 0,1 110,25 Q 125,15 140,40 Q 115,70 65,70 Z" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            
            {/* Cibao Label (North) */}
            <rect x="40" y="24" width="42" height="11" rx="2" fill="#fffbeb" stroke="#d97706" strokeWidth="0.8" />
            <text x="43" y="32" className="text-[6.5px] fill-amber-800 font-bold font-sans">Cibao: Vocaliza "i"</text>
            
            {/* Sur Label (Southwest) */}
            <rect x="18" y="52" width="40" height="11" rx="2" fill="#ecfdf5" stroke="#059669" strokeWidth="0.8" />
            <text x="21" y="60" className="text-[6.5px] fill-emerald-800 font-bold font-sans">Sur: Rotación "l"</text>
            
            {/* Este Label (Southeast) */}
            <rect x="88" y="50" width="48" height="11" rx="2" fill="#f0f9ff" stroke="#0284c7" strokeWidth="0.8" />
            <text x="91" y="58" className="text-[6.5px] fill-sky-800 font-bold font-sans">Este: Geminación "r"</text>
          </svg>
        </div>
      );
    }

    if (questionId === 19) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-xs font-sans text-slate-700 space-y-2">
          <div className="bg-rose-100 text-rose-800 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 text-center rounded-md border border-rose-200">Guía de Prevención contra el Dengue (MSP)</div>
          <div className="space-y-1 text-[10px]">
            <p className="flex items-center gap-1.5"><span className="text-rose-500 font-bold text-xs">❶</span> <span className="font-bold text-slate-800">Tape</span> herméticamente tanques con agua.</p>
            <p className="flex items-center gap-1.5"><span className="text-rose-500 font-bold text-xs">❷</span> <span className="font-bold text-slate-800">Vacíe</span> recipientes acumuladores de lluvia.</p>
            <p className="flex items-center gap-1.5"><span className="text-rose-500 font-bold text-xs">❸</span> <span className="font-bold text-slate-800">Coloque</span> cloro untado en las paredes.</p>
          </div>
          <div className="bg-slate-50 text-[8px] font-mono text-slate-400 text-center border-t pt-1.5 uppercase">Estructura Gramatical: Verbos Guías en Imperativo Directo</div>
        </div>
      );
    }

    if (questionId === 20) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-2xl p-4 max-w-sm mx-auto shadow-xs text-center text-xs font-sans relative overflow-hidden">
          <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-sky-200/40 rounded-full blur-lg" />
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Salomé Ureña y el Idealismo Cívico</div>
          <div className="flex justify-center items-center gap-6 py-2.5 bg-white rounded-xl border border-slate-100 mb-1.5">
            <div className="space-y-0.5">
              <span className="block text-[7px] font-bold uppercase text-slate-400">Ejes Clave</span>
              <span className="font-black text-xs text-blue-700">CIENCIA</span>
              <span className="block text-[6.5px] fill-slate-500">+ EDUCACIÓN</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="space-y-0.5 text-left">
              <p className="text-[8.5px] font-serif italic">"¡Patria mía cansa de dolores..."</p>
              <p className="text-[8.5px] font-serif italic">"...luz de escuela redentora!"</p>
            </div>
          </div>
          <span className="text-[8px] text-slate-400 font-mono">Corriente: Romanticismo Cívico & Positivismo Hostosiano</span>
        </div>
      );
    }

    if (questionId === 21) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3 max-w-sm mx-auto shadow-xs text-xs font-sans">
          <div className="text-center font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-2.5">Organigrama Discursivo: Tipos de Texto</div>
          <div className="grid grid-cols-2 gap-2 text-center text-[9px]">
            <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg">
              <span className="block font-black text-blue-800 uppercase">Argumentativo</span>
              <p className="text-slate-500 mt-1 leading-tight">Persuadir y convencer mediante una tesis y argumentos lógicos.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
              <span className="block font-black text-slate-700 uppercase">Expositivo</span>
              <p className="text-slate-400 mt-1 leading-tight">Informar de forma neutra y objetiva sobre un tema conceptual.</p>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 22) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-xl p-3 max-w-sm mx-auto shadow-xs text-center text-xs font-sans">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Analizador Sintáctico de la Oración</div>
          <div className="bg-white p-2.5 rounded-lg border text-[10px] space-y-1.5 font-mono">
            <p className="text-slate-800 font-bold">"Los valientes <span className="text-blue-600 border-b-2 border-blue-500 px-0.5">patricios</span> fundaron <span className="text-emerald-600 border-b-2 border-emerald-500 px-0.5">una sociedad secreta</span>."</p>
            <div className="flex justify-around text-[8px] font-sans pt-1">
              <span className="text-blue-700 font-semibold">↑ Súst. Núcleo Sujeto</span>
              <span className="text-emerald-700 font-semibold">↑ Objeto Directo</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 23) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3 max-w-sm mx-auto shadow-xs text-xs font-sans space-y-2">
          <div className="text-center font-bold text-slate-400 uppercase tracking-widest text-[9px]">Clasificador Ortográfico de Palabras Llanas</div>
          <div className="grid grid-cols-2 gap-2 text-center text-[9px]">
            <div className="bg-slate-50 border p-2 rounded-lg">
              <span className="block font-black text-slate-800">DU-AR-TE (Llana)</span>
              <span className="text-[8px] text-red-600 bg-red-50/50 block rounded mt-1">Sin Tilde</span>
              <p className="text-[7.5px] text-slate-400 mt-1 leading-none">Termina en vocal -e.</p>
            </div>
            <div className="bg-amber-50/50 border border-amber-200 p-2 rounded-lg">
              <span className="block font-black text-amber-900">SÁN-CHEZ (Llana)</span>
              <span className="text-[8px] text-emerald-700 bg-emerald-50 block rounded mt-1 font-bold">Con Tilde</span>
              <p className="text-[7.5px] text-slate-400 mt-1 leading-none">Termina en consonante -Z.</p>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 24) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-center text-xs font-sans">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Visualizador Métrico de Sinalefas</div>
          <p className="font-serif italic text-sm mb-2 text-slate-800">"Hay un país <span className="bg-blue-100 text-blue-800 px-1 rounded border border-blue-200">en_el</span> mundo"</p>
          <div className="inline-block bg-white border font-mono text-[8.5px] py-1 px-3 rounded-full text-slate-550">
            en_el = 1 sílaba métrica (Sinalefa)
          </div>
        </div>
      );
    }

    if (questionId === 25) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3 max-w-sm mx-auto shadow-xs text-center text-xs font-sans space-y-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Apreciación de Figuras Retóricas</span>
          <div className="bg-teal-50/50 border border-teal-100 p-2.5 rounded-xl">
            <p className="font-serif italic text-slate-800">"Tu voz es <span className="text-teal-700 font-bold bg-teal-100/50 px-1 rounded border border-teal-205">como</span> un río de cristales rotos"</p>
          </div>
          <span className="text-[8.5px] text-slate-400 font-mono block">Relación de semejanza explícita: <span className="font-black text-teal-700">SÍMIL o COMPARACIÓN</span></span>
        </div>
      );
    }

    if (questionId === 26) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-xl p-3 max-w-sm mx-auto shadow-xs text-center text-xs font-sans">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Bloques Secuenciales del Ensayo Argumentativo</div>
          <div className="flex items-center justify-between text-[9px] space-x-1.5">
            <div className="bg-white border p-1 rounded font-semibold text-slate-600 flex-1">Introducción / Tesis</div>
            <span className="text-slate-400">➔</span>
            <div className="bg-blue-600 text-white p-1 rounded font-black flex-1 shadow-sm">Cuerpo de Argumentos</div>
            <span className="text-slate-400">➔</span>
            <div className="bg-white border p-1 rounded font-semibold text-slate-600 flex-1">Conclusión</div>
          </div>
          <span className="text-[8px] text-slate-400 font-serif block mt-2">La tesis se apoya directamente en el bloque de Argumentos</span>
        </div>
      );
    }

    if (questionId === 27) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3 max-w-sm mx-auto shadow-xs text-center text-xs font-sans">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Conectores de Oración Compuesta</div>
          <div className="bg-slate-50 border p-2 rounded-lg text-left text-[9.5px] space-y-1">
            <p className="text-slate-500 leading-none">Proposición 1: Estudió con gran empeño.</p>
            <p className="text-indigo-700 font-black leading-none py-1 flex items-center gap-1.5">➔ Conector: [ <span className="bg-indigo-100 px-1 rounded">por consiguiente</span> ]</p>
            <p className="text-slate-500 leading-none">Proposición 2: Superó con honores las pruebas.</p>
          </div>
          <div className="mt-2 text-[8px] font-mono text-slate-400">Relación semántica: <span className="font-bold text-indigo-700">CONSECUTIVA o ILATIVA</span></div>
        </div>
      );
    }

    if (questionId === 28) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3 max-w-sm mx-auto shadow-sm text-xs font-sans relative overflow-hidden">
          <div className="text-center font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-2">Bosquejo Estructural de Prensa</div>
          <div className="border border-slate-305 p-1.5 rounded-md bg-slate-50 space-y-1 text-[8.5px] text-left">
            <div className="bg-slate-300 h-2 w-16 rounded-xs" />
            <div className="bg-blue-600 text-white font-black text-[9px] p-0.5 px-1 tracking-tight leading-none uppercase">Gran Titular del Periódico de Prensa</div>
            <div className="bg-amber-100 text-amber-900 border border-amber-200 p-1 text-[7.5px] leading-tight font-serif italic">
              <strong>"Lead", "Entrada" o "Copete":</strong> Sintetiza en un párrafo breve quién, qué, cómo, cuándo y por qué del suceso cívico.
            </div>
            <div className="grid grid-cols-2 gap-1 py-0.5">
              <div className="bg-slate-200 h-10 rounded-2xs" />
              <div className="space-y-0.5">
                <div className="bg-slate-300 h-1.5 w-full rounded-2xs" />
                <div className="bg-slate-300 h-1.5 w-full rounded-2xs" />
                <div className="bg-slate-300 h-1.5 w-11 rounded-2xs" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 29) {
      return (
        <div className="border border-slate-200 bg-slate-100/30 rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-center text-xs font-sans">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sociolingüística: Viñeta de Diálogo Escolar</div>
          <div className="flex gap-2 justify-center py-1">
            <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-lg text-[9px] font-bold">"¡Qué chulo!"</span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg text-[9px] font-bold">"un chin"</span>
            <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg text-[9px] font-bold">"vacilón"</span>
          </div>
          <div className="mt-2 text-[8px] font-mono text-slate-400 leading-none">Registro de Habla: <span className="font-extrabold text-blue-700">COLOQUIAL / POPULAR DOMINICANO</span></div>
        </div>
      );
    }

    if (questionId === 30) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-center text-xs font-sans">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Evolución Léxica en el Caribe Tecnológico</div>
          <div className="grid grid-cols-3 gap-2 py-1 text-[9px] font-mono font-bold text-indigo-805">
            <div className="bg-slate-50 border p-1 rounded-md">cliquear</div>
            <div className="bg-slate-50 border p-1 rounded-md">chatear</div>
            <div className="bg-slate-50 border p-1 rounded-md">escanear</div>
          </div>
          <span className="text-[8px] text-slate-400 block mt-1">Vocablos extranjeros adaptados morfofonéticamente: <span className="font-black text-indigo-700">NEOLOGISMOS</span></span>
        </div>
      );
    }

    return null;
  }

  // -------------------------------------------------------------------------
  // 3. SOCIAL SCIENCES (sociales)
  // -------------------------------------------------------------------------
  if (subjectId === 'sociales') {
    if (questionId === 1) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto select-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Eje de Cronología Nacional</span>
          <svg className="w-52 h-24 text-slate-700" viewBox="0 0 150 70">
            <line x1="20" y1="40" x2="130" y2="40" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="30" cy="40" r="3.5" fill="#2563eb" />
            <text x="30" y="27" textAnchor="middle" className="text-[7.5px] fill-blue-700 font-extrabold font-mono">{isReview ? "1930" : "????"}</text>
            <text x="30" y="55" textAnchor="middle" className="text-[6px] fill-slate-400 font-semibold leading-none">{isReview ? "Trujillo" : "Evento A"}</text>
            <circle cx="75" cy="40" r="3.5" fill="#2563eb" />
            <text x="75" y="27" textAnchor="middle" className="text-[7.5px] fill-blue-700 font-extrabold font-mono">{isReview ? "1965" : "????"}</text>
            <text x="75" y="55" textAnchor="middle" className="text-[6px] fill-slate-400 font-semibold leading-none">{isReview ? "Rev. Abril" : "Evento B"}</text>
            <circle cx="120" cy="40" r="3.5" fill="#eab308" />
            <text x="120" y="27" textAnchor="middle" className="text-[7.5px] fill-amber-600 font-extrabold font-mono">{isReview ? "1966" : "????"}</text>
            <text x="120" y="55" textAnchor="middle" className="text-[6px] fill-slate-400 font-semibold leading-none">{isReview ? "12 Años" : "Evento C"}</text>
          </svg>
          <span className="text-[9px] text-slate-400 font-sans mt-0.5">Sucesión cronológica del poder en el siglo XX</span>
        </div>
      );
    }

    if (questionId === 2) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-slate-50 shadow-xs max-w-sm mx-auto text-[10px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Organigrama de Poderes del Estado Dominicano</span>
          <div className="grid grid-cols-3 gap-2 w-full text-center font-bold">
            <div className={`p-2 rounded border text-amber-900 ${isReview ? 'bg-amber-50 border-amber-305' : 'bg-slate-100 border-slate-200 opacity-80'}`}>
              <span className="block text-[8px] text-amber-500 uppercase leading-none">Atribución de Ley</span>
              Legislativo
              <span className="block text-[8px] text-amber-600 font-normal leading-tight mt-1">{isReview ? "Crea Tributos / Congreso" : "Poder del Estado (¿?)"}</span>
            </div>
            <div className="bg-blue-50 p-2 rounded border border-blue-200 text-blue-900">
              <span className="block text-[8px] text-blue-400 uppercase leading-none">Administración</span>
              Ejecutivo
              <span className="block text-[8px] text-blue-500 font-normal leading-tight mt-1">Presidencia</span>
            </div>
            <div className="bg-slate-100 p-2 rounded border text-slate-700">
              <span className="block text-[8px] text-slate-400 uppercase leading-none">Garantía</span>
              Judicial
              <span className="block text-[8px] text-slate-500 font-normal leading-tight mt-1">Suprema Corte</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 3) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Región Este y San Pedro de Macorís</span>
          <svg className="w-52 h-28 border rounded-lg bg-indigo-50/20" viewBox="0 0 140 80">
            {/* Coastline */}
            <path d="M 10 40 Q 60 40 100 60 T 130 50" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />
            {/* Rivers */}
            <path d="M 40 10 Q 55 30 50 60" fill="none" stroke="#60a5fa" strokeWidth="2.5" /> {/* Río Higuamo */}
            <path d="M 90 10 Q 95 35 100 61" fill="none" stroke="#60a5fa" strokeWidth="1.5" /> {/* Río Soco */}
            {/* San Pedro */}
            <circle cx="50" cy="59" r="4.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
            <text x="56" y="62" className="text-[8px] fill-rose-600 font-extrabold">Puerto SPM</text>
            <text x="15" y="25" className="text-[7.5px] fill-emerald-700 font-serif font-bold">Llanura Costera del Este</text>
          </svg>
          <span className="text-[9.5px] text-slate-400 mt-1 font-sans">Abundante caudal de ríos y llanuras extensas</span>
        </div>
      );
    }

    if (questionId === 4) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Confrontación Bipolar de la Guerra Fría</span>
          <div className="flex justify-between items-center w-full max-w-[280px] p-2 bg-slate-50 border rounded-lg text-center font-bold">
            <div className="flex-1 text-blue-700">
              <span className="block text-[8px] text-blue-400 uppercase font-sans leading-none">Occidental</span>
              Capitalismo
              <span className="block text-[8px] text-slate-400 font-normal font-sans tracking-tight mt-1">(Bloque OTAN)</span>
            </div>
            <span className="text-rose-500 font-mono text-xs px-2">VS</span>
            <div className="flex-1 text-red-700">
              <span className="block text-[8px] text-red-400 uppercase font-sans leading-none">Oriental</span>
              Socialismo
              <span className="block text-[8px] text-slate-400 font-normal font-sans tracking-tight mt-1">(Pacto de Varsovia)</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 5) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Escudo Juramento de La Trinitaria</span>
          <div className="border-2 border-slate-800 p-2 rounded-xl text-center font-bold w-full select-none">
            {isReview ? (
              <div className="text-[10.5px] tracking-widest text-blue-700 animate-pulse">DIOS • PATRIA • LIBERTAD</div>
            ) : (
              <div className="text-[10.5px] tracking-widest text-slate-400 font-mono">* * * • * * * • * * *</div>
            )}
            <div className="text-[8px] text-slate-400 font-sans tracking-tight font-normal my-1">Socios Fundadores del 16 de Julio de 1838:</div>
            <div className="flex justify-around text-[9px] text-slate-705 border-t pt-1.5 mt-1.5">
              <span>J.P. Duarte</span>
              <span>F. Sánchez</span>
              <span>R. Mella</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 6) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Altitud Comparativa de Relieve (MINERD)</span>
          <div className="space-y-1.5 w-full">
            <div>
              <div className="flex justify-between text-[9px] font-extrabold mb-0.5">
                <span className="text-slate-700">Pico Duarte {isReview ? "(Cordillera Central)" : "(Sist. Montañoso ?)"}</span>
                <span className="text-blue-700">3,087 metros (Más Alto)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] font-extrabold mb-0.5">
                <span className="text-slate-500">Sierra de Neiba</span>
                <span className="text-slate-500">2,279 metros</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '73.8%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] font-extrabold mb-0.5">
                <span className="text-slate-500">Sierra de Bahoruco</span>
                <span className="text-slate-500">2,099 metros</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 7) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Campaña de la Restauración 1863</span>
          <svg className="w-48 h-20 text-slate-750 border rounded-lg bg-indigo-50/10" viewBox="0 0 120 50">
            {/* Capotillo border point */}
            <circle cx="20" cy="25" r="4.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
            <text x="12" y="15" className="text-[7.5px] fill-rose-600 font-extrabold">Capotillo (Dajabón)</text>
            {/* Arrow campaign stream */}
            <path d="M 23 25 Q 55 10 90 28" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
            <polygon points="90,28 85,25 83,31" fill="#2563eb" />
            {/* Santiago siege */}
            <circle cx="95" cy="30" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
            <text x="96" y="42" className="text-[7.5px] fill-emerald-700 font-bold">Santiago (Cuna)</text>
          </svg>
          <span className="text-[9px] text-slate-400 mt-1 font-sans">Cruzada militar cibaeña contra la {isReview ? "anexión española" : "anexión extranjera"}</span>
        </div>
      );
    }

    if (questionId === 8) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Generaciones de Derechos Humanos</span>
          <div className="grid grid-cols-3 gap-1.5 text-center font-bold text-[9px] select-none text-slate-650">
            <div className="p-1 pb-2 border rounded-md">
              <span className="block text-slate-400 text-[8px] font-mono leading-none mb-1">1ª GEN</span>
              Cívicos y Políticos
              <span className="block font-normal text-[8px] text-slate-405 leading-tight mt-1">(Voto, expresión)</span>
            </div>
            <div className={`p-1 pb-2 rounded-md ${isReview ? 'border-2 border-blue-500 bg-blue-50 text-blue-800' : 'border border-slate-250 text-slate-600'}`}>
              <span className={`block text-[8px] font-mono leading-none mb-1 ${isReview ? 'text-blue-400' : 'text-slate-400'}`}>2ª GEN</span>
              Económicos y Sociales
              <span className={`block font-normal text-[8px] leading-tight mt-1 ${isReview ? 'text-blue-500' : 'text-slate-400'}`}>{isReview ? "(Salud, Educ, Trabajo)" : "(Derechos ¿??)"}</span>
            </div>
            <div className="p-1 pb-2 border rounded-md">
              <span className="block text-slate-400 text-[8px] font-mono leading-none mb-1">3ª GEN</span>
              Solidaridad y Paz
              <span className="block font-normal text-[8px] text-slate-405 leading-tight mt-1">(Paz, Ambiente)</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 9) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Devastaciones de Osorio (1605-1606)</span>
          <svg className="w-52 h-28 border rounded-lg bg-orange-50/10" viewBox="0 0 130 70">
            {/* Outline of Hispaniola northern-western coast */}
            <path d="M 12 35 Q 25 15 50 20 T 110 35 L 115 55 T 45 61 Z" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Despobladas zone (North/West) shaded */}
            <path d="M 14 31 Q 25 16 48 20 L 45 45 L 20 45 Z" fill="#ffedd5" opacity="0.6" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" />
            <text x="18" y="32" className="text-[8px] fill-orange-705 font-bold italic">Banda Abandonada</text>
            {/* Concentration point (Santo Domingo) */}
            <circle cx="85" cy="51" r="4.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
            <text x="72" y="61" className="text-[7.5px] fill-rose-650 font-bold">Santo Domingo City</text>
          </svg>
          <span className="text-[9px] text-slate-400 mt-1 font-sans">El despoblamiento dejó el oeste propicio para {isReview ? "piratas franceses" : "asentamientos de otra corona"}</span>
        </div>
      );
    }

    if (questionId === 10) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Desbalance Demográfico Dominicano provincial</span>
          <div className="flex gap-4 items-center">
            <svg className="w-20 h-20 transform -rotate-90 select-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#e2e8f0" strokeWidth="12" />
              {/* Gran Santo Domingo: 35% */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#e11d48" strokeWidth="12" strokeDasharray="83.56 238.76" strokeDashoffset="0" />
              {/* Rest of the country: 65% */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#94a3b8" strokeWidth="12" strokeDasharray="155.20 238.76" strokeDashoffset="-83.56" />
            </svg>
            <div className="text-[9.5px] text-slate-650 space-y-1 font-semibold">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-600" /><span>Gran Santo Domingo: 35%</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-400" /><span>Resto del País: 65%</span></div>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 11) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Relieve y Clima: Valle de Constanza</span>
          <svg className="w-52 h-26 text-slate-705" viewBox="0 0 160 80">
            <path d="M 10 70 L 45 25 L 80 50 L 115 15 L 145 70" fill="none" stroke="#0f766e" strokeWidth="2.5" />
            <circle cx="80" cy="50" r="3" fill="#ef4444" />
            <line x1="80" y1="50" x2="80" y2="70" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
            <text x="58" y="77" className="text-[8px] fill-rose-600 font-bold font-sans">Valle Constanza (~1,250 m)</text>
            <text x="117" y="15" className="text-[7px] fill-emerald-700 font-extrabold font-sans">Cordillera Central</text>
          </svg>
          <span className="text-[9px] text-slate-400 font-serif italic mt-1 text-center">Clima templado montañoso húmedo en altitud</span>
        </div>
      );
    }

    if (questionId === 12) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Acta de Anexión a España (1861)</span>
          <div className="bg-amber-50/40 p-2.5 rounded-xl border border-amber-200 w-full text-center">
            <span className="font-serif italic text-amber-900 block font-bold text-[11px]">"Sujeción voluntaria de la soberanía nacional..."</span>
            <div className="mt-2 text-[9px] text-slate-500 font-semibold uppercase font-sans">Firmado por: <span className="text-rose-750 font-black">Gral. Pedro Santana</span></div>
          </div>
        </div>
      );
    }

    if (questionId === 13) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 text-center">Flujo Agroindustrial (Guerra en Cuba 1868)</span>
          <svg className="w-56 h-24 text-slate-700" viewBox="0 0 160 70">
            <rect x="15" y="15" width="40" height="25" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="21" y="30" className="text-[8px] font-black fill-red-800">CUB-1868</text>
            <text x="18" y="22" className="text-[6.5px] fill-rose-600 font-semibold font-sans">Guerra 10 Años</text>
            <path d="M 60 27 L 95 27" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,1" />
            <polygon points="98,27 92,24 92,30" fill="#2563eb" />
            <text x="61" y="21" className="text-[6.5px] fill-blue-700 font-bold font-sans">Inversión y Técnicos</text>
            <rect x="103" y="15" width="42" height="25" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="109" y="30" className="text-[7.5px] font-black fill-blue-800">RD-1875</text>
            <text x="106" y="22" className="text-[6.5px] fill-blue-600 font-semibold font-sans">Ingenios Vapor</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-sans mt-1">Despegue azucarero dominicano en San Pedro de Macorís</span>
        </div>
      );
    }

    if (questionId === 14) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Control de Constitucionalidad de las Leyes</span>
          <div className="bg-sky-50 border border-sky-300 p-3 rounded-xl text-center w-full">
            <span className="font-extrabold text-[11px] text-sky-800 uppercase block mb-1">Tribunal Constitucional RD</span>
            <div className="text-[9px] text-slate-500 font-sans font-semibold">Garante supremo de la supremacía de la Carta Magna</div>
          </div>
        </div>
      );
    }

    if (questionId === 15) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 text-center">Saldo de Crecimiento de Población Receptora</span>
          <svg className="w-52 h-28 text-slate-600" viewBox="0 0 160 80">
            <line x1="20" y1="10" x2="20" y2="70" stroke="#cbd5e1" />
            <line x1="20" y1="70" x2="150" y2="70" stroke="#cbd5e1" />
            <rect x="35" y="60" width="18" height="10" fill="#94a3b8" />
            <text x="33" y="78" className="text-[6px] fill-slate-500 font-bold font-sans">Pedernales</text>
            <rect x="65" y="55" width="18" height="15" fill="#94a3b8" />
            <text x="63" y="78" className="text-[6px] fill-slate-500 font-bold font-sans">Bahoruco</text>
            <rect x="95" y="20" width="22" height="50" fill="#f43f5e" />
            <text x="94" y="15" className="text-[7.5px] fill-rose-600 font-black font-sans animate-bounce">Altagracia</text>
            <text x="96" y="78" className="text-[6px] fill-rose-900 font-semibold font-sans">Bávaro-PC</text>
          </svg>
        </div>
      );
    }

    if (questionId === 16) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 text-center">Perfil Hidrológico y de Erosión: Río Yaque del Norte</span>
          <svg className="w-56 h-32 text-slate-700" viewBox="0 0 170 90">
            {/* Mountain skyline */}
            <path d="M 15,80 L 45,20 L 75,55 L 120,65 L 155,80" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <polygon points="45,20 75,55 120,65 155,80 155,90 15,90" fill="#eff6ff" />
            
            {/* Peak (Pico del Yaque: 2,580m) */}
            <circle cx="45" cy="20" r="3" fill="#ef4444" />
            <text x="14" y="15" className="text-[7.5px] fill-rose-600 font-bold font-sans">Cabecera (2,580 m)</text>
            
            {/* Deforestación indicator */}
            <text x="36" y="38" className="text-[11px]">🪓</text>
            <text x="12" y="48" className="text-[6.5px] fill-red-600 font-black font-sans">Deforestada (Pérdida de Retención)</text>

            {/* Basin/Valley (Cibao valley) */}
            <text x="80" y="52" className="text-[7px] fill-emerald-800 font-bold font-sans">Valle del Cibao</text>
            <text x="80" y="61" className="text-[6px] fill-red-500 font-bold font-sans">🚨 Inundación por lodo</text>

            {/* Sea mouth at Montecristi */}
            <circle cx="155" cy="80" r="3.5" fill="#0284c7" />
            <text x="110" y="87" className="text-[6.5px] fill-sky-700 font-bold font-sans">Monte Cristi Atlantic</text>
          </svg>
        </div>
      );
    }

    if (questionId === 17) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 text-center">Deuda Externa & "Papeletas de Lilís" (1888-1899)</span>
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="bg-red-50 border border-red-200 p-2 rounded-xl text-center">
              <span className="text-[7.5px] font-bold text-red-700 uppercase block leading-none">Santo Domingo Improvement Co.</span>
              <p className="font-serif italic font-black text-rose-950 text-[13px] my-1">US$ 1.5M</p>
              <span className="text-[6.5px] text-slate-400 block font-normal leading-tight">Garantizado con los ingresos de Aduanas nacionales de SDO y Puerto Plata</span>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-center">
              <span className="text-[7.5px] font-bold text-amber-700 uppercase block leading-none">Crisis Monetaria de Emisión</span>
              <p className="font-serif italic font-black text-amber-950 text-[13px] my-1">PAPEL LILÍS</p>
              <span className="text-[6.5px] text-slate-400 block font-normal leading-tight">Papel moneda fiduciaria impreso sin un centavo de oro real de respaldo</span>
            </div>
          </div>
          <div className="mt-2 bg-slate-900 text-white font-mono text-[8px] py-1.5 px-3 rounded-md w-full text-center">
            Estado de Cuentas: Bancarrota General en {isReview ? "Julio 1899" : "Fin de Era Lilís"}
          </div>
        </div>
      );
    }

    if (questionId === 18) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-2xl p-4 max-w-sm mx-auto shadow-xs text-xs font-sans relative">
          <div className="text-center font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-2">Estructura Histórica de la Gestión Bosch de 1963</div>
          <div className="space-y-2">
            <div className="bg-indigo-600 text-white rounded-md p-1.5 text-center font-bold text-[10px]">Hito: Constitución Social y Cívica de 1963</div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border text-center rounded p-1 text-[8px]">
                <strong className="block text-indigo-700">Agrario</strong>
                Prohibido latifundio improductivo
              </div>
              <div className="bg-white border text-center rounded p-1 text-[8px]">
                <strong className="block text-indigo-700">Laboral</strong>
                Reparto de utilidades obreras
              </div>
              <div className="bg-white border text-center rounded p-1 text-[8px]">
                <strong className="block text-indigo-700">Social</strong>
                Libertades públicas e ideológicas
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 text-red-800 rounded p-1.5 text-center text-[7.5px] font-mono uppercase">
              Duración del periodo democrático: Solo 7 Meses (Derrocado por Golpe)
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 19) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 text-center">El Modelo Terciario: Pilares del Tríptico de Servicios RD</span>
          <div className="grid grid-cols-3 gap-2 w-full text-center">
            <div className="bg-sky-50 border border-sky-100 p-2 rounded-xl">
              <span className="text-xl">🌴</span>
              <strong className="block text-[8px] uppercase text-sky-800 mt-1 font-bold">Turismo</strong>
              <span className="text-[7px] text-slate-400 block font-normal">Sustento hotelero del Este y Norte</span>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 p-2 rounded-xl">
              <span className="text-xl">⚙️</span>
              <strong className="block text-[8px] uppercase text-indigo-800 mt-1 font-bold">Zonas Francas</strong>
              <span className="text-[7px] text-slate-400 block font-normal">Maquila y exportación fabril</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl">
              <span className="text-xl">✉️</span>
              <strong className="block text-[8px] uppercase text-emerald-800 mt-1 font-bold">Remesas</strong>
              <span className="text-[7px] text-slate-400 block font-normal">Flujo monetario continuo de diáspora</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 20) {
      return (
        <div className="border border-slate-200 bg-emerald-50/20 rounded-2xl p-4 max-w-sm mx-auto shadow-xs text-center text-xs font-sans relative">
          <div className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest mb-1.5">CONSTITUCIÓN DE MOCA (1858) - Liberalismo Radical</div>
          <div className="space-y-1.5 text-left text-[9.5px] bg-white rounded-xl border border-emerald-100 p-3 shadow-3xs">
            <p className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold text-xs">✔</span> <span className="font-bold">Sufragio Universal Directo</span> (exclusivo para elegir presidentes).</p>
            <p className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold text-xs">✔</span> <span className="font-bold">Abolición de la Pena de Muerte</span> política.</p>
            <p className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold text-xs">✔</span> Descentralización y <span className="font-bold">Límites estrictos</span> al Ejecutivo Santana.</p>
          </div>
          <div className="mt-2 text-[7.5px] text-slate-400 font-mono">Consagrada como la Carta más progresista democrática del Siglo XIX</div>
        </div>
      );
    }

    if (questionId === 21) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Límites Geográficos del Litoral Dominicano</span>
          <svg className="w-52 h-28 border rounded-lg bg-sky-50/20" viewBox="0 0 140 80">
            <path d="M 10 10 L 50 10 L 50 70 L 10 70 Z" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M 50 10 L 130 10 L 130 70 L 50 70 Z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="70" stroke="#b91c1c" strokeWidth="2" />
            <text x="25" y="42" className="text-[8px] fill-red-800 font-bold block text-center">Haití</text>
            <text x="90" y="42" className="text-[8px] fill-blue-800 font-bold block text-center">R. Dom.</text>
            <text x="54" y="65" className="text-[6.5px] fill-red-700 font-mono font-bold leading-none">Frontera: 376 km</text>
          </svg>
        </div>
      );
    }

    if (questionId === 22) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Perfil de Relieve Central de la Isla</span>
          <svg className="w-52 h-28 border rounded-lg bg-slate-50" viewBox="0 0 140 80">
            <path d="M 10 70 L 40 55 L 70 20 L 95 60 L 130 70 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            <circle cx="70" cy="20" r="3" fill="#ea580c" />
            <text x="70" y="13" textAnchor="middle" className="text-[7.5px] font-black fill-orange-700">Pico Duarte: 3,087m</text>
            <text x="70" y="55" textAnchor="middle" className="text-[8px] font-extrabold fill-slate-700">Cordillera Central</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 mt-1">Sistemas de plegamiento alpino del Cuaternario</span>
        </div>
      );
    }

    if (questionId === 23) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Red Hidrográfica: Río Yaque del Norte</span>
          <svg className="w-52 h-28 border rounded-lg bg-sky-50/10" viewBox="0 0 140 80">
            <path d="M 20 65 C 50 65, 45 35, 75 35 C 105 35, 95 15, 120 15" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <circle cx="20" cy="65" r="3" fill="#16a34a" />
            <text x="24" y="70" className="text-[7.5px] font-bold fill-slate-600">Nacimiento: Pico Yaque (2,580m)</text>
            <circle cx="120" cy="15" r="3" fill="#d97706" />
            <text x="74" y="11" className="text-[7.5px] font-bold fill-slate-600">Desembocadura: Montecristi</text>
            <text x="55" y="44" className="text-[8px] font-mono font-black text-blue-700 text-center">Longitud: 296 km</text>
          </svg>
        </div>
      );
    }

    if (questionId === 24) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Estructura Jerárquica: Pirámide de Kelsen</span>
          <svg className="w-52 h-40 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 110">
            <path d="M 65 10 L 115 90 L 15 90 Z" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <path d="M 65 10 L 80 34 L 50 34 Z" fill="#3b82f6" opacity="0.9" stroke="#1d4ed8" strokeWidth="1" />
            <text x="65" y="27" textAnchor="middle" className="text-[6.5px] font-black fill-white">CONSTITUCIÓN</text>
            <path d="M 50 34 L 80 34 L 95 58 L 35 58 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />
            <text x="65" y="49" textAnchor="middle" className="text-[6.5px] font-bold fill-slate-700">Leyes Ordinarias</text>
            <path d="M 35 58 L 95 58 L 110 82 L 20 82 Z" fill="#f1f5f9" stroke="#475569" strokeWidth="0.8" />
            <text x="65" y="73" textAnchor="middle" className="text-[6.5px] font-semibold fill-slate-500">Decretos y Resoluciones</text>
          </svg>
          <span className="text-[8px] text-slate-400 font-sans mt-1">El Bloque Constitucional se sitúa en el ápice jurídico</span>
        </div>
      );
    }

    if (questionId === 25) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-xs font-sans text-center">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Geopolítica Histórica: Tratado de Ryswick (1697)</div>
          <div className="flex items-center justify-between text-[9px] gap-2 p-1 bg-slate-50 border rounded-lg">
            <div className="p-1 rounded font-bold text-blue-800 bg-blue-50 flex-1">España (Este)</div>
            <span className="text-slate-400 font-black">↔</span>
            <div className="p-1 rounded font-bold text-red-800 bg-red-50 flex-1">Francia (Oeste)</div>
          </div>
          <span className="text-[8px] text-slate-400 font-serif block mt-1.5">Marca el inicio formal de la división territorial de la isla</span>
        </div>
      );
    }

    if (questionId === 26) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Transición Demográfica de la Natalidad</span>
          <svg className="w-52 h-28 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 80">
            <line x1="20" y1="70" x2="120" y2="70" stroke="#94a3b8" />
            <line x1="20" y1="10" x2="20" y2="70" stroke="#94a3b8" />
            <path d="M 25 20 C 50 25, 75 55, 115 62" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="65" y="15" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">Tasa de Natalidad en Descenso</text>
            <text x="115" y="77" textAnchor="middle" className="text-[6px] fill-slate-400 font-semibold">siglo XXI</text>
          </svg>
        </div>
      );
    }

    if (questionId === 27) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Ubicación del Fuerte de la Navidad (1492)</span>
          <svg className="w-52 h-28 border rounded-lg bg-indigo-50/10" viewBox="0 0 140 80">
            <path d="M 10 30 Q 30 20 60 30 T 110 20 T 130 35" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="35" cy="22" r="4.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
            <text x="43" y="24" className="text-[7.5px] font-black fill-red-700 text-left">Fuerte de la Navidad</text>
            <text x="10" y="55" className="text-[7.5px] fill-slate-400 font-mono italic">Encallamiento de la Santa María</text>
          </svg>
        </div>
      );
    }

    if (questionId === 28) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-xs font-sans text-center space-y-1.5">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Estado Miembro Co-Fundador (1945)</div>
          <div className="bg-slate-50 border p-2 rounded-xl inline-block">
            <span className="font-serif text-lg font-bold text-slate-800 tracking-tight text-center">O N U</span>
            <span className="block text-[8px] font-mono text-slate-400 mt-1 uppercase text-center">Conferencia de San Francisco</span>
          </div>
          <span className="text-[7.5px] text-slate-400 block leading-tight text-center">La República Dominicana firmó como uno de los 51 miembros originarios</span>
        </div>
      );
    }

    if (questionId === 29) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-xl p-3 max-w-sm mx-auto shadow-xs text-xs font-sans text-center">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estructura del Gobierno Municipal (Cabildo)</div>
          <div className="grid grid-cols-2 gap-2 text-[9px] font-bold">
            <div className="bg-white border p-1.5 rounded-lg">
              <span className="block text-blue-700 uppercase">Órgano Ejecutivo</span>
              <p className="text-slate-500 text-[8px] font-normal mt-1 leading-tight">Alcalde / Alcaldesa</p>
            </div>
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
              <span className="block uppercase text-blue-105">Órgano Fiscalizador</span>
              <p className="text-white text-[8px] font-bold mt-1 leading-tight">Concejo de Regidores</p>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 30) {
      return (
        <div className="border border-slate-200 bg-amber-50/10 rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-center text-xs font-sans space-y-1.5">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Escritura Central del Escudo Dominicano</div>
          <div className="bg-white p-2.5 rounded-xl border border-amber-200 shadow-3xs">
            <p className="font-serif italic text-slate-800 text-[10px]">"Y conoceréis la verdad, y la verdad os hará libres."</p>
            <span className="text-[8px] font-mono text-amber-800 block mt-1.5 font-bold">Juan 8:32</span>
          </div>
        </div>
      );
    }

    return null;
  }

  // -------------------------------------------------------------------------
  // 4. SCIENCES OF NATURE (naturaleza)
  // -------------------------------------------------------------------------
  if (subjectId === 'naturaleza') {
    if (questionId === 1) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide mb-1.5 font-bold">Cuadro de Punnett (Cruce Ll x Ll)</span>
          <table className="border-collapse border-2 border-slate-400 font-mono text-xs font-bold text-center">
            <thead>
              <tr className="bg-slate-100">
                <th className="border-2 border-slate-400 p-2 text-slate-400">Gam.</th>
                <th className="border-2 border-slate-400 p-2 text-blue-600">L</th>
                <th className="border-2 border-slate-400 p-2 text-blue-600">l</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-slate-400 p-2 bg-slate-100 text-blue-600">L</td>
                <td className="border-2 border-slate-400 p-2 bg-green-50 text-slate-800">LL (Liso)</td>
                <td className="border-2 border-slate-400 p-2 bg-green-50 text-slate-800">Ll (Liso)</td>
              </tr>
              <tr>
                <td className="border-2 border-slate-400 p-2 bg-slate-100 text-blue-600">l</td>
                <td className="border-2 border-slate-400 p-2 bg-green-50 text-slate-800">Ll (Liso)</td>
                <td className="border-2 border-slate-400 p-2 bg-amber-50 text-red-650 font-extrabold">ll (Rugoso)</td>
              </tr>
            </tbody>
          </table>
          <span className="text-[9.5px] text-slate-500 mt-2 font-semibold">
            {isReview ? "Proporción general F2: 3/4 Liso (75%) vs 1/4 Rugoso (25%)" : "Proporción general F2: (¿?)"}
          </span>
        </div>
      );
    }

    if (questionId === 2) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto select-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Escala de Acidez y Alcalinidad pH</span>
          <svg className="w-56 h-12 text-slate-700" viewBox="0 0 160 30">
            {/* Gradient from red (acidic) to green (neutral) to blue (basic) */}
            <defs>
              <linearGradient id="phGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" /> {/* Strong Acid */}
                <stop offset="50%" stopColor="#22c55e" /> {/* Neutral */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Strong Base */}
              </linearGradient>
            </defs>
            <rect x="5" y="10" width="150" height="10" rx="3" fill="url(#phGradient)" />
            {/* Substancia pointers */}
            <circle cx="28" cy="15" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" /> {/* Limón 2.2 */}
            <text x="21" y="8" className="text-[6.5px] font-extrabold fill-rose-600">{isReview ? "Limón (2.2)" : "Limón (¿?)"}</text>
            <circle cx="75" cy="15" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" /> {/* Leche 6.5 */}
            <text x="68" y="8" className="text-[6.5px] fill-slate-500 font-bold">{isReview ? "Leche (6.5)" : "Leche (¿?)"}</text>
            <circle cx="107" cy="15" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" /> {/* Jabón 9.5 */}
            <text x="101" y="27" className="text-[6.5px] fill-blue-700 font-bold">{isReview ? "Jabón (9.5)" : "Jabón (¿?)"}</text>
          </svg>
          <span className="text-[9.5px] text-slate-400 mt-1 font-sans">El número menor indica mayor concentración ácida [H3O+]</span>
        </div>
      );
    }

    if (questionId === 3) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <svg className="w-28 h-28 text-slate-700" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="10" fill="#f1f5f9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="2.5" fill="currentColor" />
            {/* Vectors */}
            <line x1="50" y1="60" x2="50" y2="85" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="50,85 47,80 53,80" fill="currentColor" />
            <text x="56" y="80" className="text-[8px] font-bold font-mono">Peso (W = m·g)</text>
            <line x1="50" y1="40" x2="50" y2="15" stroke="#2563eb" strokeWidth="2.5" />
            <polygon points="50,15 47,20 53,20" fill="#2563eb" />
            <text x="56" y="22" className="text-[8px] font-bold font-mono fill-blue-600">F_arrastre (F_drag)</text>
          </svg>
          <span className="text-[9.5px] text-slate-400 mt-1 font-sans">Diagrama de Cuerpo Libre: Caída Terminal (F_neta = 0)</span>
        </div>
      );
    }

    if (questionId === 4) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Lámina de Oro de Rutherford</span>
          <svg className="w-52 h-26 text-slate-700 bg-slate-50 border rounded-lg" viewBox="0 0 140 70">
            {/* Alpha Gun */}
            <rect x="5" y="27" width="20" height="15" rx="3" fill="#cbd5e1" />
            <text x="7" y="38" className="text-[6.5px] fill-slate-500 font-mono">Alfa Gun</text>
            {/* Alpha Particles streams */}
            <line x1="25" y1="35" x2="70" y2="35" stroke="#e11d48" strokeWidth="1.5" />
            <text x="32" y="30" className="text-[6.5px] fill-rose-600 font-mono font-bold">He2+ (α)</text>
            {/* Gold foil representation */}
            <line x1="72" y1="15" x2="72" y2="55" stroke="#eab308" strokeWidth="3" />
            <text x="74" y="12" className="text-[6.5px] fill-amber-705 font-bold uppercase">Oro</text>
            {/* Scattered lines */}
            <path d="M 72 35 L 120 35" stroke="#e11d48" strokeWidth="0.8" />
            <path d="M 72 35 L 110 50" stroke="#e11d48" strokeWidth="0.8" />
            <path d="M 72 35 L 45 15" stroke="#e11d48" strokeWidth="0.8" strokeDasharray="2,2" /> {/* Rebound */}
          </svg>
          <span className="text-[9px] text-slate-405 mt-1 text-center font-sans">Demuestra que la masa y cargas positivas están concentradas</span>
        </div>
      );
    }

    if (questionId === 5) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs font-sans">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Pirámide de Energía Trófica</span>
          <div className="w-full space-y-1 text-center font-bold text-[9px] leading-none text-slate-700">
            <div className="bg-red-50 p-1 rounded-sm border border-red-200 w-1/4 mx-auto">Predadores Terminales</div>
            <div className="bg-amber-50 p-1 rounded-sm border border-amber-200 w-1/2 mx-auto">Herbívoros (10% Energía)</div>
            <div className="bg-emerald-50 p-1 rounded-sm border border-emerald-200 w-3/4 mx-auto">Productores (Plantas) (100%)</div>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 w-full font-sans font-bold text-blue-700 mt-1">
              Descomponedores: Reciclan nutrientes de regreso a los Productores
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 6) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Leyes de los Gases gaseosos (Boyle PV = K)</span>
          <div className="flex gap-4 font-mono font-bold text-[9.5px]">
            <div className="border border-slate-200 p-2 rounded-lg bg-slate-50 text-center">
              <span className="font-sans block text-[8px] text-slate-400 uppercase leading-none">Estado Normal</span>
              P₁ V₁
              <span className="block text-[8px] font-normal leading-tight mt-1">1 atm, 3 Litros</span>
            </div>
            <div className="flex items-center text-slate-400">➡️</div>
            <div className="border border-blue-200 p-2 bg-blue-50 text-blue-800 rounded-lg text-center">
              <span className="font-sans block text-[8px] text-blue-400 uppercase leading-none">Presión Triplicada</span>
              (3 P₁) × (V₁ / 3)
              <span className="block text-[8px] font-normal text-blue-600 leading-tight mt-1">3 atm, 1 Litro</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 7) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Estructura del Carbono en Metano (CH₄)</span>
          <svg className="w-28 h-28 text-slate-700" viewBox="0 0 100 100">
            {/* Center Carbon */}
            <circle cx="50" cy="50" r="13" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
            <text x="46" y="54" className="text-[11px] font-bold fill-white font-sans">C</text>
            {/* 4 single bonds */}
            <line x1="50" y1="37" x2="50" y2="18" stroke="#475569" strokeWidth="2.5" />
            <line x1="50" y1="63" x2="50" y2="82" stroke="#475569" strokeWidth="2.5" />
            <line x1="37" y1="50" x2="18" y2="50" stroke="#475569" strokeWidth="2.5" />
            <line x1="63" y1="50" x2="82" y2="50" stroke="#475569" strokeWidth="2.5" />
            {/* Hydrogens */}
            <circle cx="50" cy="18" r="8" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="47" y="21" className="text-[8px] fill-slate-700 font-bold">H</text>
            <circle cx="50" cy="82" r="8" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="47" y="85" className="text-[8px] fill-slate-700 font-bold">H</text>
            <circle cx="18" cy="50" r="8" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="15" y="53" className="text-[8px] fill-slate-700 font-bold">H</text>
            <circle cx="82" cy="50" r="8" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="79" y="53" className="text-[8px] fill-slate-700 font-bold">H</text>
          </svg>
          <span className="text-[9.5px] text-slate-400 font-mono">Tetravalencia: 4 Enlaces Covalentes</span>
        </div>
      );
    }

    if (questionId === 8) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2">Escalera trans de ADN (Doble Hélice)</span>
          <svg className="w-48 h-28" viewBox="0 0 120 70">
            {/* Helical wave bonds */}
            <path d="M 10 15 Q 35 60 70 15 T 115 45" fill="none" stroke="#2563eb" strokeWidth="2" />
            <path d="M 10 45 Q 35 0 70 45 T 115 15" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="3,3" />
            {/* Pairs labeled */}
            <line x1="30" y1="21" x2="30" y2="40" stroke="#10b981" strokeWidth="2" />
            <text x="21" y="33.5" className="text-[7.5px] fill-emerald-600 font-bold">C ≡ G</text>
            <line x1="70" y1="15" x2="70" y2="45" stroke="#f59e0b" strokeWidth="2" />
            <text x="73" y="32.5" className="text-[7.5px] fill-amber-600 font-bold">A = T</text>
          </svg>
          <span className="text-[9.5px] text-slate-400 font-sans">Emparejamientos complementarios clásicos</span>
        </div>
      );
    }

    if (questionId === 9) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Circuito de la Ley de Ohm</span>
          <svg className="w-48 h-28 text-slate-700" viewBox="0 0 120 70">
            {/* Wire Loop */}
            <rect x="20" y="15" width="80" height="40" fill="none" stroke="currentColor" strokeWidth="2" rx="4" />
            {/* Battery V=12V bottom */}
            <rect x="50" y="52" width="20" height="6" fill="#1e293b" />
            <line x1="57" y1="50" x2="57" y2="60" stroke="#ffffff" strokeWidth="1.5" />
            <text x="49" y="47" className="text-[7px] font-bold fill-slate-600 font-mono">V = 12 V</text>
            {/* Resistor R=5 Ohms top */}
            <path d="M 45 15 L 49 11 L 53 19 L 57 11 L 61 19 L 65 15" fill="none" stroke="#2563eb" strokeWidth="2" />
            <text x="47" y="8" className="text-[7px] font-extrabold fill-blue-670 font-mono">R = 5 Ω</text>
            {/* Current Arrow stream */}
            <line x1="25" y1="20" x2="25" y2="40" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="25,40 22,35 28,35" fill="#10b981" />
            <text x="11" y="32" className="text-[7.5px] fill-emerald-600 font-bold font-mono">{isReview ? "I = 2.4 A" : "I = ¿? A"}</text>
          </svg>
        </div>
      );
    }

    if (questionId === 10) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 text-center">Atrapamiento Térmico Invernadero</span>
          <svg className="w-48 h-24 text-slate-755 border rounded-lg bg-orange-100/10" viewBox="0 0 120 50">
            {/* Earth soil */}
            <rect x="5" y="40" width="110" height="8" rx="2" fill="#15803d" />
            {/* Sun rays coming */}
            <line x1="15" y1="2" x2="35" y2="38" stroke="#eaa300" strokeWidth="1.5" />
            <text x="5" y="10" className="text-[7px] fill-yellow-600 font-bold">Rayo Solar</text>
            {/* Reflecting longwave radiation trapped */}
            <path d="M 35 38 L 55 18 Q 75 10 90 38" fill="none" stroke="#e11d48" strokeWidth="1.8" />
            <polygon points="90,38 85,34 88,31" fill="#e11d48" />
            {/* Greenhouse gas layer CO2 CH4 cloud */}
            <rect x="40" y="8" width="60" height="12" rx="4" fill="#cbd5e1" opacity="0.8" />
            <text x="43" y="17" className="text-[6.5px] font-extrabold fill-slate-700 font-sans">Capa Gases: CO₂ / CH₄</text>
            <text x="68" y="32" className="text-[6.5px] fill-rose-650 font-bold rotate-[45deg]">Calor Atrapado</text>
          </svg>
          <span className="text-[9px] text-slate-405 mt-1 font-sans">Retiene radiación térmica de onda larga</span>
        </div>
      );
    }

    if (questionId === 11) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Funcionamiento de Válvulas Cardíacas</span>
          <svg className="w-48 h-24 text-slate-700" viewBox="0 0 120 60">
            <rect x="5" y="15" width="30" height="30" rx="3" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
            <text x="10" y="32" className="text-[8px] fill-blue-700 font-bold font-sans">Aurícula</text>
            <line x1="45" y1="12" x2="45" y2="48" stroke="#ef4444" strokeWidth="2.5" />
            <path d="M 37 30 L 78 30" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <polygon points="81,30 75,27 75,33" fill="#2563eb" />
            <rect x="85" y="15" width="30" height="30" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
            <text x="87" y="32" className="text-[7.5px] fill-red-700 font-bold font-sans">Ventrículo</text>
            <text x="43" y="10" className="text-[6.5px] fill-rose-600 font-bold font-sans">Válvula Bicúspide</text>
            <text x="40" y="55" className="text-[6.5px] fill-emerald-600 font-semibold font-sans">Flujo UNIDIRECCIONAL</text>
          </svg>
        </div>
      );
    }

    if (questionId === 12) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estructura del Grupo Carboxilo (-COOH)</span>
          <svg className="w-48 h-28 text-slate-700" viewBox="0 0 100 60">
            <line x1="47" y1="30" x2="47" y2="12" stroke="#475569" strokeWidth="2" />
            <line x1="53" y1="30" x2="53" y2="12" stroke="#475569" strokeWidth="2" />
            <text x="46" y="10" className="text-[9px] font-bold fill-zinc-800">O</text>
            <text x="35" y="24" className="text-[6.5px] fill-slate-400 font-sans">Enlace doble</text>
            <line x1="56" y1="34" x2="72" y2="44" stroke="#475569" strokeWidth="2" />
            <text x="73" y="50" className="text-[9px] font-bold fill-rose-600">OH</text>
            <line x1="44" y1="34" x2="28" y2="44" stroke="#475569" strokeWidth="2" />
            <text x="18" y="49" className="text-[9px] font-bold fill-indigo-600">R</text>
            <circle cx="50" cy="32" r="6" fill="#1e293b" />
            <text x="47" y="35" className="text-[9px] font-bold fill-white">C</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-mono mt-1">Carácter altamente ácido del protón de -OH</span>
        </div>
      );
    }

    if (questionId === 13) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Ley de Coulomb: Duplicación de Cargas</span>
          <svg className="w-56 h-24 text-slate-700" viewBox="0 0 160 60">
            <circle cx="35" cy="30" r="10" fill="#3b82f6" />
            <text x="29" y="33" className="text-[8px] font-extrabold fill-white">2 q₁</text>
            <line x1="21" y1="30" x2="2" y2="30" stroke="#f43f5e" strokeWidth="2" />
            <polygon points="0,30 6,27 6,33" fill="#f43f5e" />
            <text x="6" y="22" className="text-[7.5px] fill-rose-600 font-black font-sans">F' = 4 × F</text>
            <line x1="45" y1="30" x2="115" y2="30" stroke="#94a3b8" strokeDasharray="3,3" />
            <text x="76" y="25" className="text-[7px] fill-slate-500 font-mono">r</text>
            <circle cx="125" cy="30" r="10" fill="#3b82f6" />
            <text x="119" y="33" className="text-[8px] font-extrabold fill-white">2 q₂</text>
            <line x1="139" y1="30" x2="158" y2="30" stroke="#f43f5e" strokeWidth="2" />
            <polygon points="160,30 154,27 154,33" fill="#f43f5e" />
            <text x="127" y="22" className="text-[7.5px] fill-rose-600 font-black font-sans">F' = 4 × F</text>
          </svg>
          <span className="text-[8.5px] text-slate-400 font-mono">F' es proporcional al producto de cargas: (2)×(2) = 4</span>
        </div>
      );
    }

    if (questionId === 14) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Fijación Biológica de Nitrógeno (FBN)</span>
          <svg className="w-52 h-24 text-slate-700" viewBox="0 0 140 60">
            <text x="5" y="28" className="text-[10.5px] font-black fill-slate-500 font-mono">N₂ (Gas)</text>
            <path d="M 45 25 L 85 25" fill="none" stroke="#10b981" strokeWidth="2" />
            <polygon points="88,25 82,21 82,29" fill="#10b981" />
            <text x="44" y="16" className="text-[6px] fill-emerald-600 font-extrabold font-sans">Enzima Nitrogenasa</text>
            <rect x="92" y="13" width="42" height="24" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="96" y="28" className="text-[9.5px] font-extrabold fill-emerald-800 font-mono">NH₃ / NH₄⁺</text>
            <text x="94" y="48" className="text-[6.5px] fill-slate-450 font-semibold font-sans italic">Amonio soluble</text>
          </svg>
        </div>
      );
    }

    if (questionId === 15) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Límite Transformante Septentrional (RD)</span>
          <svg className="w-52 h-26 text-slate-700 font-sans font-bold" viewBox="0 0 130 65">
            <rect x="5" y="5" width="120" height="22" rx="3" fill="#f1f5f9" stroke="#94a3b8" />
            <text x="28" y="18" className="text-[7.5px] fill-slate-600 font-sans">Placa de Norteamérica</text>
            <path d="M 115 15 L 90 15" fill="none" stroke="#64748b" strokeWidth="1.8" />
            <polygon points="88,15 94,12 94,18" fill="#64748b" />
            <line x1="5" y1="31" x2="125" y2="31" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3,1" />
            <rect x="5" y="37" width="120" height="22" rx="3" fill="#e0f2fe" stroke="#0284c7" />
            <text x="36" y="50" className="text-[7.5px] fill-sky-800 font-sans">Placa del Caribe</text>
            <path d="M 15 48 L 40 48" fill="none" stroke="#0284c7" strokeWidth="1.8" />
            <polygon points="42,48 36,45 36,51" fill="#0284c7" />
            <text x="45" y="34" className="text-[6.5px] fill-rose-600 bg-white px-1">Falla Septentrional</text>
          </svg>
        </div>
      );
    }

    if (questionId === 16) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Diagrama de Fuerzas en Curva Peraltada ("El Número")</span>
          <svg className="w-52 h-34 text-slate-700" viewBox="0 0 140 90">
            {/* Horizontal Line */}
            <line x1="15" y1="75" x2="125" y2="75" stroke="#94a3b8" strokeWidth="1" />
            
            {/* Banked road profile (peralte) */}
            <line x1="15" y1="75" x2="115" y2="35" stroke="#1e293b" strokeWidth="2.5" />
            
            {/* Angle notation θ */}
            <path d="M 35 75 A 20 20 0 0 0 32 68" fill="none" stroke="#ef4444" strokeWidth="1" />
            <text x="38" y="71" className="text-[7px] fill-rose-600 font-bold font-serif">θ (Peralte)</text>

            {/* Vehicle represented as a box on inclined road at center (65, 55) */}
            <g transform="rotate(-21.8, 65, 55)">
              <rect x="52" y="47" width="26" height="15" fill="#3b82f6" rx="2" stroke="#1d4ed8" strokeWidth="1" />
              {/* Wheels */}
              <circle cx="58" cy="63" r="3.5" fill="#000000" />
              <circle cx="72" cy="63" r="3.5" fill="#000000" />
            </g>

            {/* Vector Normal N (perpendicular to road, pointing up-left) */}
            <path d="M 65,51 L 52,18" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <polygon points="52,18 50,24 55,22" fill="#e11d48" />
            <text x="44" y="14" className="text-[7.5px] fill-rose-650 font-extrabold font-mono">Fuerza Normal (N)</text>

            {/* Vector Gravity Weight W = mg (straight down) */}
            <path d="M 65,51 L 65,85" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="65,85 62,80 68,80" fill="#10b981" />
            <text x="70" y="83" className="text-[7.5px] fill-emerald-600 font-extrabold font-mono">Peso (W = mg)</text>

            {/* Centripetal force F_c vector (horizontally to the left, toward center of curve) */}
            <path d="M 65,51 L 25,51" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,1" />
            <polygon points="25,51 31,48 31,54" fill="#2563eb" />
            <text x="21" y="46" className="text-[7px] fill-blue-600 font-bold font-sans">F_centrípeta</text>
          </svg>
        </div>
      );
    }

    if (questionId === 17) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Mecanismo Químico de Acidificación Coralina</span>
          <svg className="w-56 h-32 text-slate-650" viewBox="0 0 170 95">
            {/* Atm / Ocean division line */}
            <line x1="5" y1="25" x2="165" y2="25" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,2" />
            <text x="8" y="18" className="text-[7px] fill-slate-400 font-bold uppercase">Atmósfera: Aire</text>
            <text x="8" y="34" className="text-[7px] fill-sky-500 font-bold uppercase">Océano: Bayahíbe</text>

            {/* CO2 gas travel */}
            <text x="65" y="15" className="text-[8px] font-black fill-slate-700">Abundante CO₂ Gaseoso</text>
            <path d="M 115 15 Q 125 25, 120 40" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,1" />
            <polygon points="120,40 117,35 123,36" fill="#ef4444" />

            {/* Acid Reaction */}
            <rect x="15" y="42" width="95" height="42" rx="4" fill="#fff5f5" stroke="#fecaca" strokeWidth="1.2" />
            <text x="21" y="52" className="text-[6.5px] fill-red-800 font-bold">CO₂ + H₂O ➔ H₂CO₃ (Ácido Carbónico)</text>
            <text x="21" y="65" className="text-[6px] fill-red-650 font-semibold">Libera protones H⁺ que capturan CO₃²⁻</text>
            <text x="21" y="78" className="text-[6.5px] fill-red-900 font-black">☹ Baja calcificación del CaCO₃</text>

            {/* Bleached coral drawing */}
            <path d="M 135,90 L 140,65 L 132,55 L 142,48 L 152,58 L 148,90 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="127" y="93" className="text-[6px] fill-slate-400 font-bold">Coral Blanqueado</text>
          </svg>
        </div>
      );
    }

    if (questionId === 18) {
      return (
        <div className="flex flex-col items-center justify-center p-3.5 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Efecto Térmico en Silicio Fotovoltaico</span>
          <div className="space-y-2 w-full text-center">
            <div className="bg-amber-500/10 border border-amber-300 rounded-xl p-2.5">
              <span className="text-[8.5px] font-bold text-amber-800 uppercase block">Temperatura Elevada a Mediodía</span>
              <p className="text-[13.5px] my-1">🌡 +45 °C de Calentamiento</p>
              <span className="text-[7.5px] text-slate-500 block font-normal leading-relaxed">Provoca que los núcleos de Silicio vibren intensamente dispersando portadores de carga libre</span>
            </div>

            <div className="flex justify-between items-center text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100">
              <span className="font-semibold text-red-600">⚡ Resistividad: Sube</span>
              <span className="font-bold text-slate-300">|</span>
              <span className="font-semibold text-rose-500">📉 Voltaje total: Disminuye</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 19) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Cuadrícula de Punnett Cruzamiento F2 (Rosa de Bayahíbe)</span>
          <div className="flex flex-col items-center">
            {/* Grid display */}
            <div className="grid grid-cols-3 gap-1 w-44 text-center font-mono font-bold text-[9.5px]">
              {/* Row 1 */}
              <div className="bg-slate-50 p-1.5 rounded text-slate-400">F2</div>
              <div className="bg-rose-100 p-1.5 rounded text-rose-700">Cʳ</div>
              <div className="bg-slate-100 p-1.5 rounded text-slate-700">Cʷ</div>
              
              {/* Row 2 */}
              <div className="bg-rose-100 p-1.5 rounded text-rose-700 flex items-center justify-center">Cʳ</div>
              <div className="bg-rose-500 text-white p-1.5 rounded">CʳCʳ<span className="block text-[6.5px] font-sans font-normal">Rosa Intenso</span></div>
              <div className="bg-rose-300 text-pink-900 p-1.5 rounded">CʳCʷ<span className="block text-[6.5px] font-sans font-normal">Rosa Pálido</span></div>
              
              {/* Row 3 */}
              <div className="bg-slate-100 p-1.5 rounded text-slate-700 flex items-center justify-center">Cʷ</div>
              <div className="bg-rose-300 text-pink-900 p-1.5 rounded">CʳCʷ<span className="block text-[6.5px] font-sans font-normal">Rosa Pálido</span></div>
              <div className="bg-white border text-slate-705 p-1.5 rounded">CʷCʷ<span className="block text-[6.5px] font-sans font-normal">Blanco Puro</span></div>
            </div>
            
            <div className="mt-2.5 text-center text-[8px] text-slate-500 font-sans">
              Proporción Fenotípica: <span className="font-bold text-rose-600">25% Rosa Intenso (CʳCʳ)</span>, 50% Rosa Pálido, 25% Blanco.
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 20) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Principio de Faraday: Inducción en Larimar Barahona</span>
          <svg className="w-56 h-30 text-slate-700" viewBox="0 0 160 85">
            {/* Windmill lines */}
            <line x1="25" y1="80" x2="25" y2="35" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="25" cy="35" r="4.5" fill="#64748b" />
            {/* 3 blades */}
            <path d="M 25,35 L 20,5 L 25,5 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
            <path d="M 25,35 L 45,50 L 48,45 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
            <path d="M 25,35 L 3,50 L 5,45 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />

            {/* Rotational connection to magnetic loop */}
            <path d="M 25,35 Q 50,35, 60,35" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,2" />
            
            {/* Magnetic coil block */}
            <rect x="65" y="24" width="22" height="22" fill="#ef4444" rx="2" />
            <text x="71" y="38" className="text-[8px] fill-white font-black font-serif">N</text>
            <rect x="87" y="24" width="22" height="22" fill="#3b82f6" rx="2" />
            <text x="93" y="38" className="text-[8px] fill-white font-black font-serif">S</text>
            
            {/* Copper wire windings */}
            <path d="M 120,45 C 110,45, 110,25, 120,25" fill="none" stroke="#b45309" strokeWidth="2" />
            <path d="M 125,45 C 115,45, 115,25, 125,25" fill="none" stroke="#b45309" strokeWidth="2" />
            <path d="M 130,45 C 120,45, 120,25, 130,25" fill="none" stroke="#b45309" strokeWidth="2" />
            <path d="M 135,45 C 125,45, 125,25, 135,25" fill="none" stroke="#b45309" strokeWidth="2" />

            <text x="58" y="15" className="text-[6.5px] fill-slate-500 font-bold">Imán del Rotor</text>
            <text x="111" y="15" className="text-[6.5px] fill-amber-800 font-bold">Bobina dΦ_B/dt</text>
            
            <text x="70" y="60" className="text-[7px] fill-emerald-600 font-black text-center animate-pulse">Induced electric f.e.m. V = -dΦ/dt</text>
          </svg>
        </div>
      );
    }

    if (questionId === 21) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Replicación Complementaria del ADN</span>
          <div className="space-y-1.5 font-mono text-[10px] text-center w-full">
            <div className="bg-sky-50 border border-sky-200 p-1.5 rounded-lg text-sky-800">
              <span className="block text-[7px] text-sky-500 font-sans uppercase">Molde original (5' a 3')</span>
              5' - A - T - G - C - C - G - 3'
            </div>
            <div className="text-slate-400 animate-pulse text-xs">⬇ Complementación (A-T, C-G) ⬇</div>
            <div className="bg-emerald-50 border border-emerald-200 p-1.5 rounded-lg text-emerald-800 font-black">
              <span className="block text-[7px] text-emerald-500 font-sans uppercase">Hebra Nueva antiparalela (3' a 5')</span>
              3' - T - A - C - G - G - C - 5'
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 22) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Fuerzas en Plano Inclinado: Bloque de Larimar (2 kg)</span>
          <svg className="w-52 h-28 border rounded-lg bg-slate-50" viewBox="0 0 140 80">
            <line x1="10" y1="70" x2="130" y2="70" stroke="#94a3b8" />
            <line x1="10" y1="70" x2="110" y2="25" stroke="#1e293b" strokeWidth="2" />
            <path d="M 30 70 A 20 20 0 0 0 28 62" fill="none" stroke="#2563eb" />
            <text x="32" y="66" className="text-[7px] fill-blue-600 font-bold font-serif">30°</text>
            <g transform="rotate(-24.2, 70, 52)">
              <rect x="58" y="44" width="20" height="12" fill="#38bdf8" stroke="#0284c7" />
              <text x="68" y="52" textAnchor="middle" className="text-[6.5px] font-black fill-cyan-950">Larimar</text>
            </g>
            <path d="M 60,38 L 40,47" fill="none" stroke="#dc2626" strokeWidth="1.5" />
            <polygon points="40,47 46,43 44,49" fill="#dc2626" />
            <text x="22" y="32" className="text-[7.5px] fill-red-600 font-bold font-mono">F_p = m*g*sen(30°) = 10 N</text>
          </svg>
        </div>
      );
    }

    if (questionId === 23) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Estructura del Alcano: Propano C₃H₈</span>
          <svg className="w-52 h-34 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 140 90">
            <circle cx="35" cy="45" r="8" fill="#1e293b" />
            <text x="35" y="48" textAnchor="middle" className="text-[9px] fill-white font-extrabold font-mono">C</text>
            <circle cx="70" cy="45" r="8" fill="#1e293b" />
            <text x="70" y="48" textAnchor="middle" className="text-[9px] fill-white font-extrabold font-mono">C</text>
            <circle cx="105" cy="45" r="8" fill="#1e293b" />
            <text x="105" y="48" textAnchor="middle" className="text-[9px] fill-white font-extrabold font-mono">C</text>
            <line x1="43" y1="45" x2="62" y2="45" stroke="#475569" strokeWidth="2.5" />
            <line x1="78" y1="45" x2="97" y2="45" stroke="#475569" strokeWidth="2.5" />
            <text x="70" y="16" textAnchor="middle" className="text-[8px] font-extrabold text-blue-700">Gas Licuado (3 Carbonos Saturados)</text>
            <text x="70" y="80" textAnchor="middle" className="text-[8.5px] font-mono font-black text-rose-600">Alcano: C₃H₈</text>
          </svg>
        </div>
      );
    }

    if (questionId === 24) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Flujo del Diezmo Ecológico (10%)</span>
          <div className="space-y-1.5 w-full text-[9px]">
            <div className="flex justify-between items-center bg-slate-50 p-1.5 border rounded-lg">
              <span className="font-semibold text-slate-600">Productores (Bosque Constanza)</span>
              <span className="font-black text-emerald-600">10,000 kJ (100%)</span>
            </div>
            <div className="text-center text-xs text-slate-400 font-extrabold">↓ -90% Disipación de Calor</div>
            <div className="flex justify-between items-center bg-sky-50 p-1.5 border border-sky-100 rounded-lg">
              <span className="font-semibold text-sky-700">Consumidor Primario (Uatís)</span>
              <span className="font-black text-sky-800">1,000 kJ (10%)</span>
            </div>
            <div className="text-center text-xs text-slate-400 font-extrabold">↓ -90% Disipación de Calor</div>
            <div className="flex justify-between items-center bg-rose-50 p-1.5 border border-rose-100 rounded-lg">
              <span className="font-semibold text-rose-700">Consumidor Secundario (Halcón)</span>
              <span className="font-black text-rose-800">100 kJ (1%)</span>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 25) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Configuración Orbital: Mareas Vivas</span>
          <svg className="w-52 h-20 border rounded-lg bg-indigo-950" viewBox="0 0 140 50">
            <circle cx="15" cy="25" r="8" fill="#f59e0b" />
            <text x="15" y="28" textAnchor="middle" className="text-[7px] font-black fill-white font-sans">Sol</text>
            <line x1="28" y1="25" x2="112" y2="25" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2,2" />
            <circle cx="70" cy="25" r="5" fill="#3b82f6" />
            <text x="70" y="15" textAnchor="middle" className="text-[6.5px] fill-blue-300 font-bold font-sans">Tierra</text>
            <circle cx="115" cy="25" r="3" fill="#94a3b8" />
            <text x="115" y="15" textAnchor="middle" className="text-[6.5px] fill-slate-300 font-bold font-sans">Luna</text>
            <ellipse cx="70" cy="25" rx="10" ry="6" fill="#38bdf8" opacity="0.3" stroke="#0284c7" strokeWidth="0.5" />
          </svg>
          <span className="text-[8px] text-slate-400 mt-1">Alineación perfecta suma los vectores de atracción de mareas</span>
        </div>
      );
    }

    if (questionId === 26) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Acidez Extrema de Solución Clásica</span>
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl w-full text-center">
            <span className="text-[8.5px] font-bold text-red-700 uppercase">Zumo de Limón de Baní</span>
            <p className="text-xl font-black font-mono text-red-600 my-1">pH = 2.0</p>
            <span className="bg-red-600 text-white rounded-full px-2.5 py-0.5 text-[8.5px] font-extrabold inline-block">ÁCIDO FUERTE</span>
            <div className="text-[7.5px] text-slate-500 mt-1.5 font-mono">Alta concentración de protones hidronio [H⁺] = 10⁻² M</div>
          </div>
        </div>
      );
    }

    if (questionId === 27) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-sm mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Fenómeno Físico: Dispersión Cromática</span>
          <svg className="w-52 h-28 border rounded-lg bg-slate-50" viewBox="0 0 140 80">
            <line x1="15" y1="40" x2="60" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="20" y="32" className="text-[7.5px] font-sans text-slate-500 font-bold">Luz Blanca</text>
            <circle cx="75" cy="40" r="16" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
            <text x="75" y="43" textAnchor="middle" className="text-[7.5px] fill-sky-800 font-bold">Gota</text>
            <path d="M 91,40 L 130,16" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M 91,40 L 130,64" stroke="#a855f7" strokeWidth="1.5" />
            <text x="110" y="12" className="text-[7.5px] text-red-600 font-bold">Rojo (Refractado)</text>
            <text x="110" y="73" className="text-[7.5px] text-purple-600 font-bold">Violeta</text>
          </svg>
        </div>
      );
    }

    if (questionId === 28) {
      return (
        <div className="border border-slate-200 bg-white rounded-xl p-3 max-w-sm mx-auto shadow-xs text-xs font-sans text-center">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Fisiología Humana: Circulación Sistémica</div>
          <div className="grid grid-cols-2 gap-2 text-[9px] font-bold">
            <div className="bg-red-50 border border-red-200 p-1.5 rounded-lg text-red-900">
              <span className="block uppercase text-red-700">Arterias</span>
              <p className="text-[8px] font-normal mt-1 leading-tight text-slate-650">Llevan O₂ & nutrientes desde el corazón</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-lg text-blue-900">
              <span className="block uppercase text-blue-700">Venas</span>
              <p className="text-[8px] font-normal mt-1 leading-tight text-slate-650">Retornan CO₂ & desechos metabólicos</p>
            </div>
          </div>
        </div>
      );
    }

    if (questionId === 29) {
      return (
        <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-2xl bg-white shadow-xs max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Proceso de Subducción Convergente</span>
          <svg className="w-52 h-28 border border-slate-100 bg-slate-50 rounded-lg" viewBox="0 0 130 80">
            <path d="M 90 20 L 50 65 L 10 65 L 10 20 Z" fill="#dbeafe" stroke="#2563eb" />
            <text x="44" y="32" className="text-[6.5px] fill-blue-800 font-bold">Placa Norteamericana</text>
            <path d="M 90 20 L 125 20 L 125 65 L 90 65 Z" fill="#fee2e2" stroke="#ef4444" />
            <text x="105" y="42" className="text-[6.5px] fill-red-800 font-bold">Placa Caribe</text>
            <circle cx="88" cy="22" r="3.5" fill="#ea580c" />
            <text x="106" y="12" textAnchor="middle" className="text-[6.5px] font-black fill-orange-700 font-mono">Fosa de Milwaukee</text>
          </svg>
        </div>
      );
    }

    if (questionId === 30) {
      return (
        <div className="border border-slate-200 bg-slate-50 rounded-xl p-3.5 max-w-sm mx-auto shadow-xs text-center text-xs font-sans space-y-1">
          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest text-center">Convección: Circulación Térmica de Fluidos</div>
          <div className="flex justify-around items-center bg-white p-2 border rounded-xl shadow-3xs">
            <div className="text-center">
              <span className="text-lg">🔥</span>
              <strong className="block text-[8px] uppercase text-red-600 font-bold">Aire Caliente</strong>
              <p className="text-[6.5px] text-slate-400 mt-0.5 font-semibold">Sube (Menos Denso)</p>
            </div>
            <span className="text-xl text-slate-300 font-bold animate-pulse">🔄</span>
            <div className="text-center">
              <span className="text-lg">❄️</span>
              <strong className="block text-[8px] uppercase text-sky-600 font-bold">Brisa Fría</strong>
              <p className="text-[6.5px] text-slate-400 mt-0.5 font-semibold">Baja (Más Denso)</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  return null;
  };

  const diagram = renderDiagram();
  if (!diagram) return null;

  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden py-2 px-1 flex justify-start sm:justify-center scrollbar-thin select-none">
      <div className="min-w-0 transition-all duration-200 hover:scale-[1.01] shrink-0 sm:shrink">
        {diagram}
      </div>
    </div>
  );
}
