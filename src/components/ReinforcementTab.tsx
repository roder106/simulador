/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Youtube, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle, 
  Calculator, 
  Globe, 
  Atom, 
  Sparkles, 
  GraduationCap, 
  FileText,
  BadgeAlert
} from 'lucide-react';
import { REINFORCEMENT_TOPICS, StudyTopic, HelperResource } from '../data/reinforcementData';
import MathText from './MathText';

interface ReinforcementTabProps {
  attempts: any[]; // History of attempts
  onStartSubject?: (subjectId: string) => void;
}

export default function ReinforcementTab({ attempts, onStartSubject }: ReinforcementTabProps) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  // 1. Identify which categories the student has failed in their PAST ATTEMPTS
  const failedCategoriesMap: { [cat: string]: boolean } = {};
  
  attempts.forEach(attempt => {
    if (attempt.questions && attempt.answers) {
      attempt.questions.forEach((q: any) => {
        const studentAnswer = attempt.answers[q.id];
        const isIncorrect = studentAnswer !== undefined && studentAnswer !== q.correctIndex;
        if (isIncorrect) {
          failedCategoriesMap[q.category] = true;
        }
      });
    }
  });

  // Separate topics failed by the student using intelligent fuzzy/prefix matching to catch every quiz topic
  const priorityTopics = REINFORCEMENT_TOPICS.filter(topic => {
    return Object.keys(failedCategoriesMap).some(failedCat => {
      const fc = failedCat.toLowerCase().trim();
      const tc = topic.category.toLowerCase().trim();
      const tt = topic.title.toLowerCase().trim();
      
      // Direct match or partial subsegment match
      if (fc === tc || fc.includes(tc) || tc.includes(fc)) {
        return true;
      }
      
      // Compare individual long words to find matches like "Trigonometría Avanzada" matching "Trigonometría"
      const fcWords = fc.split(/[\s-—–e]+/);
      return fcWords.some(word => word.length > 4 && (tc.includes(word) || tt.includes(word)));
    });
  });

  // 2. Filter topics based on subject selection & search query
  const filteredTopics = REINFORCEMENT_TOPICS.filter(topic => {
    // Subject filter
    if (selectedSubjectFilter !== 'all' && topic.subjectId !== selectedSubjectFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const match = 
        topic.title.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query) ||
        topic.concept.toLowerCase().includes(query);
      if (!match) return false;
    }
    return true;
  });

  const getSubjectColor = (subId: string) => {
    switch (subId) {
      case 'matematica': return { bg: 'bg-blue-50 border-blue-200 text-blue-700', icon: 'Calculator' };
      case 'espanol': return { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: 'BookOpen' };
      case 'sociales': return { bg: 'bg-amber-50 border-amber-200 text-amber-700', icon: 'Globe' };
      case 'naturaleza': return { bg: 'bg-indigo-50 border-indigo-200 text-indigo-700', icon: 'Atom' };
      default: return { bg: 'bg-slate-50 border-slate-200 text-slate-700', icon: 'FileText' };
    }
  };

  const renderIcon = (subId: string, className = "h-4 w-4") => {
    switch (subId) {
      case 'matematica': return <Calculator className={className} />;
      case 'espanol': return <BookOpen className={className} />;
      case 'sociales': return <Globe className={className} />;
      case 'naturaleza': return <Atom className={className} />;
      default: return <FileText className={className} />;
    }
  };

  return (
    <div id="reinforcement-portal-container" className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-850 rounded-3xl p-6.5 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-8 translate-x-8">
          <GraduationCap className="w-96 h-96" />
        </div>
        <div className="relative z-10 space-y-2 max-w-4xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold leading-none backdrop-blur-3xs">
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" /> 100% Desconectado / Sin Internet
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Pestaña Oficial de Reforzamiento Pedagógico</h1>
          <p className="text-sm text-indigo-100 leading-relaxed font-normal">
            Hemos preparado explicaciones paso a paso completas de los temas del currículo MINERD dominicano para las Pruebas Nacionales. Este material vive en tu navegador y es compatible con dispositivos sin conexión, permitiendo estudiar, recordar leyes y consultar recursos digitales de forma estable y clara.
          </p>
        </div>
      </div>

      {/* DYNAMIC ANALYSIS ALERTS BASED ON ERRORS */}
      {priorityTopics.length > 0 && (
        <div className="bg-amber-50/65 border border-amber-200 rounded-3xl p-6 shadow-3xs">
          <div className="flex items-start gap-3">
            <BadgeAlert className="h-6 w-6 text-amber-600 mt-0.5 shrink-0" />
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">⚠️ Temas Prioritarios Identificados de tus Errores</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Basado en los simulacros realizados en este dispositivo, se registraron fallos en las preguntas de estos temas. Te sugerimos revisar urgentemente el material didáctico escrito para estos módulos específicos antes de reintentar:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1.5">
                {priorityTopics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedSubjectFilter('all');
                      setActiveTopicId(topic.id);
                      document.getElementById(`topic-card-${topic.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 py-2 px-3.5 rounded-xl transition duration-150 shadow-3xs"
                  >
                    <span>{renderIcon(topic.subjectId, "h-3.5 w-3.5 text-amber-700")}</span>
                    <span>{topic.category}: <strong>{topic.title}</strong></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND SUBJECTS SELECT BAR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search Input Filter */}
        <div className="relative md:col-span-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar tema, palabra clave o fórmula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl pl-10 pr-4 py-3 text-xs outline-none transition font-medium"
          />
        </div>

        {/* Subjects Tab Buttons */}
        <div className="md:col-span-7 flex flex-wrap gap-2 justify-start md:justify-end">
          <button
            onClick={() => setSelectedSubjectFilter('all')}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              selectedSubjectFilter === 'all' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            Todos ({REINFORCEMENT_TOPICS.length})
          </button>
          <button
            onClick={() => setSelectedSubjectFilter('matematica')}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedSubjectFilter === 'matematica' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <Calculator className="h-3.5 w-3.5" /> Matemática
          </button>
          <button
            onClick={() => setSelectedSubjectFilter('espanol')}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedSubjectFilter === 'espanol' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" /> Español
          </button>
          <button
            onClick={() => setSelectedSubjectFilter('sociales')}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedSubjectFilter === 'sociales' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <Globe className="h-3.5 w-3.5" /> Sociales
          </button>
          <button
            onClick={() => setSelectedSubjectFilter('naturaleza')}
            className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedSubjectFilter === 'naturaleza' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <Atom className={ "h-3.5 w-3.5" } /> Naturaleza
          </button>
        </div>
      </div>

      {/* TOPICS CARD CONTAINER */}
      {filteredTopics.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 space-y-2">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto animate-bounce" />
          <h3 className="font-bold text-slate-700 text-sm">No se encontraron temas</h3>
          <p className="text-xs leading-relaxed max-w-md mx-auto">Pruebe utilizando otros filtros de asignatura o borre el criterio escrito en la caja de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTopics.map(topic => {
            const hasClassInfo = getSubjectColor(topic.subjectId);
            const isFailingTopic = priorityTopics.some(pt => pt.id === topic.id);
            const isExpanded = activeTopicId === topic.id;

            return (
              <div
                key={topic.id}
                id={`topic-card-${topic.id}`}
                className={`border bg-white rounded-3xl overflow-hidden transition duration-200 hover:shadow-sm ${
                  isFailingTopic 
                    ? 'border-amber-300 ring-2 ring-amber-500/10' 
                    : isExpanded 
                      ? 'border-indigo-400 ring-2 ring-indigo-500/5' 
                      : 'border-slate-200'
                }`}
              >
                {/* Topic Header segment */}
                <div 
                  className="p-5.5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-slate-50/40 hover:bg-slate-50"
                  onClick={() => setActiveTopicId(isExpanded ? null : topic.id)}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider border font-bold ${hasClassInfo.bg}`}>
                        {renderIcon(topic.subjectId, "h-3 w-3 inline mr-1")} {topic.category}
                      </span>
                      {isFailingTopic && (
                        <span className="bg-amber-500/10 text-amber-700 border border-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-lg inline-flex items-center gap-1">
                          ⚠️ Prioritario
                        </span>
                      )}
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg ${
                        topic.importance === 'Crítica' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                        topic.importance === 'Alta' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        Importancia: {topic.importance}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight leading-snug">
                      {topic.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      className={`text-xs font-bold py-2 px-4 rounded-xl transition ${
                        isExpanded 
                          ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-3xs'
                      }`}
                    >
                      {isExpanded ? 'Ocultar Explicación' : 'Estudiar Tema Paso a Paso'}
                    </button>
                  </div>
                </div>

                {/* Topic Content Body (Visible on toggle expand) */}
                {isExpanded && (
                  <div className="p-6.5 sm:p-8 bg-white border-t border-slate-150 space-y-6 text-xs sm:text-sm animate-fade-in">
                    
                    {/* Concept block */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-[9.5px] text-blue-600">📖 Explicación Curricular</h4>
                      <MathText text={topic.concept} className="font-normal leading-relaxed text-slate-700 text-xs sm:text-sm" />
                    </div>

                    {/* Rules and mathematical formulas */}
                    <div className="space-y-3 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-3xs">
                      <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-[9.5px] text-slate-500 flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-slate-600" /> Fórmulas y Reglas Fundamentales (Formato Legible)
                      </h4>
                      <ul className="space-y-2 pl-2">
                        {topic.formulasOrRules.map((formula, idx) => (
                          <li key={idx} className="flex gap-2 items-start text-xs font-mono font-medium text-slate-805 leading-relaxed bg-white border border-slate-100 px-3 py-1.5 rounded-xl">
                            <span className="text-blue-600 select-none">✦</span>
                            <MathText text={formula} isParagraph={false} className="text-xs sm:text-sm text-slate-800 leading-relaxed" />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step-by-step complete example */}
                    <div className="space-y-2.5">
                      <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-[9.5px] text-emerald-600">🎯 Ejercicio Resuelto Paso a Paso</h4>
                      <div className="bg-emerald-50/40 border border-emerald-200/60 rounded-2xl p-5 space-y-3">
                        {topic.stepByStepExample.split(' ... ').map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs">
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-lg text-[9.5px] leading-none select-none mt-0.5 shrink-0 antialiased">
                              Paso {idx + 1}
                            </span>
                            <MathText text={step} className="text-slate-700 leading-relaxed font-normal text-xs sm:text-sm flex-1" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Traps and avoid common mistakes */}
                    <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4.5 flex gap-3 text-red-950">
                      <AlertTriangle className="h-5.5 w-5.5 text-red-600 shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <h4 className="font-black text-[9.5px] uppercase tracking-widest text-red-800">⚠️ Errores Típicos en la Prueba Nacional</h4>
                        <MathText text={topic.avoidCommonMistakes} className="text-xs leading-relaxed font-semibold text-slate-800" />
                      </div>
                    </div>

                    {/* Youtube channels links and official support websites */}
                    <div className="pt-2 border-t border-slate-150 space-y-3">
                      <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-[9.5px] text-indigo-600 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-indigo-600" /> Portales Oficiales y Recursos de Aprendizaje Recomendados
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* 1. Youtube Search Alternative Card */}
                        {(() => {
                          const alternativeRes = topic.resources.find(res => res.url.includes('search_query') || res.type === 'playlist') || topic.resources[1] || topic.resources[0];
                          const searchUrl = alternativeRes?.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(`Aprender ${topic.title} ${topic.category}`)}`;
                          const searchTitle = alternativeRes?.name || `Buscar Tutoriales en YouTube`;
                          const searchDesc = `Búsqueda automatizada con decenas de lecciones explicativas paso a paso de los educadores más de confianza (como JulioProfe o Profe Alex) para dominar este tema sin enlaces defectuosos.`;

                          return (
                            <div className="flex flex-col justify-between p-5 bg-rose-50/20 hover:bg-rose-50/45 border border-rose-100 rounded-2xl transition shadow-3xs">
                              <div className="space-y-1.5 flex-1 pb-3">
                                <span className="inline-block text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-100 leading-none">
                                  Vídeo Explicativo de Seguridad (YouTube)
                                </span>
                                <strong className="block text-xs font-black text-slate-800 tracking-tight">
                                  {searchTitle}
                                </strong>
                                <p className="text-[10.5px] text-slate-500 leading-normal font-medium">
                                  {searchDesc}
                                </p>
                              </div>
                              
                              <div className="pt-3 border-t border-rose-100/50">
                                <a
                                  href={searchUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-1.5 w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] py-2 px-3.5 rounded-xl transition duration-150 shadow-3xs"
                                >
                                  <Youtube className="h-4 w-4 fill-current text-white" />
                                  <span>Buscar Explicaciones en YouTube</span>
                                </a>
                              </div>
                            </div>
                          );
                        })()}

                        {/* 2. Official study websites for explanations and easy concepts */}
                        {(() => {
                          let portalName = '';
                          let portalDesc = '';
                          let portalUrl = '';
                          let portalBadge = '';

                          if (topic.subjectId === 'matematica') {
                            portalName = 'Khan Academy en Español (Matemáticas)';
                            portalDesc = 'Teoría visual interactiva, ejemplos sencillos y lecciones didácticas libres de estrés creadas para comprender conceptos matemáticos desde la raíz.';
                            portalUrl = `https://es.khanacademy.org/search?page_search_query=${encodeURIComponent(topic.category || topic.title)}`;
                            portalBadge = 'Teoría Didáctica Gratis';
                          } else if (topic.subjectId === 'naturales') {
                            portalName = 'Khan Academy (Ciencias Naturales y Física)';
                            portalDesc = 'Lecciones con esquemas gráficos y lenguaje amigable sobre biología, química, física cuántica o ecología para afianzar conceptos abstractos.';
                            portalUrl = `https://es.khanacademy.org/search?page_search_query=${encodeURIComponent(topic.category || topic.title)}`;
                            portalBadge = 'Explicaciones Sencillas';
                          } else if (topic.subjectId === 'espanol') {
                            portalName = 'Portal Educativo Dominicano (Educando)';
                            portalDesc = 'Recursos conceptuales, guías curriculares del MINERD, lecturas guiadas y explicaciones ortográficas oficiales de la República Dominicana.';
                            portalUrl = `http://www.educando.edu.do/?s=${encodeURIComponent(topic.category)}`;
                            portalBadge = 'MINERD / Guías Escolares';
                          } else {
                            portalName = 'Portal Educando - Historia de la República Dominicana';
                            portalDesc = 'Colección didáctica de de documentos históricos nacionales, geografía patria, cívica y Constitución de forma detallada y fácil de asimilar.';
                            portalUrl = `http://www.educando.edu.do/?s=${encodeURIComponent(topic.category)}`;
                            portalBadge = 'MINERD / Historia Nacional';
                          }

                          return (
                            <div className="flex flex-col justify-between p-5 bg-blue-50/20 hover:bg-blue-50/45 border border-blue-100 rounded-2xl transition shadow-3xs">
                              <div className="space-y-1.5 flex-1 pb-3">
                                <span className="inline-block text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 leading-none">
                                  {portalBadge}
                                </span>
                                <strong className="block text-xs font-black text-slate-800 tracking-tight">
                                  {portalName}
                                </strong>
                                <p className="text-[10.5px] text-slate-500 leading-normal font-medium">
                                  {portalDesc}
                                </p>
                              </div>
                              
                              <div className="pt-3 border-t border-blue-100/50 flex flex-col gap-2">
                                <a
                                  href={portalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-1.5 w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] py-2 px-3.5 rounded-xl transition duration-150 shadow-3xs"
                                >
                                  <BookOpen className="h-3.5 w-3.5 text-white" />
                                  <span>Ver Explicaciones y Conceptos</span>
                                </a>

                                <a
                                  href="https://iq.edu.do/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-[10.5px] py-1.5 px-3 rounded-xl transition duration-150 shadow-3xs"
                                  title="Utiliza IQ.edu.do para realizar exámenes oficiales simulados del Ministerio de Educación de la República Dominicana."
                                >
                                  <GraduationCap className="h-3.5 w-3.5 text-indigo-700" />
                                  <span>Entrenar con la Plataforma IQ (MINERD)</span>
                                </a>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* REINFORCEMENT INSPIRATION NOTES */}
      <div className="bg-slate-100/70 border rounded-3xl p-6 text-center text-slate-500 text-xs leading-relaxed space-y-1">
        <GraduationCap className="h-8 w-8 text-slate-400 mx-auto" />
        <h4 className="font-bold text-slate-700">Recomendación Académica del Simulador</h4>
        <p className="max-w-2xl mx-auto font-medium">
          Las Pruebas Nacionales valoran la comprensión conceptual sobre la memorización veloz. Te invitamos a leer la guía de estudio un par de veces, tomar notas manuscritas en tu cuaderno, y luego volver a realizar los simulacros completando el Gabarito. ¡El estudio persistente garantiza el éxito!
        </p>
      </div>

    </div>
  );
}
