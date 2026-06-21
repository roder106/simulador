/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  BookOpen, 
  Globe, 
  Atom, 
  CheckCircle2, 
  Play, 
  ArrowLeft, 
  Trophy, 
  Sparkles, 
  Home, 
  TrendingUp, 
  Clock, 
  User, 
  AlertCircle,
  HelpCircle,
  Bookmark,
  CheckSquare
} from 'lucide-react';
import StudentPortal, { Student } from './components/StudentPortal';
import Header from './components/Header';
import Gabarito from './components/Gabarito';
import Visualizer from './components/Visualizer';
import ReviewTab from './components/ReviewTab';
import MathText from './components/MathText';
import ReinforcementTab from './components/ReinforcementTab';
import { generateQuestionsForSubject, SUBJECTS, Question, Subject } from './data/questionsGenerator';

// Fisher-Yates Shuffle Algorithm to randomize question presentation order
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface ExamAttempt {
  subjectId: string;
  subjectName: string;
  score: number;
  timeSpentSeconds: number;
  date: string;
  answers?: { [qId: number]: number };
  questions?: Question[];
  starredQuestions?: { [qId: number]: boolean };
}

export default function App() {
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [qId: number]: number }>({});
  const [starredQuestions, setStarredQuestions] = useState<{ [qId: number]: boolean }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Timer State
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isExamActive, setIsExamActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Simulation Flow States
  const [hasStartedIntro, setHasStartedIntro] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  
  // Historical scores local database state
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);

  // Optional: active historical review attempt State (to load detailed past results)
  const [viewingPastAttempt, setViewingPastAttempt] = useState<ExamAttempt | null>(null);

  // Presentation Grade calculator state for Dominican Republic criteria
  const [presentationGrade, setPresentationGrade] = useState<number>(85); // Default high-school average

  // Lobby Tab selection state
  const [lobbyTab, setLobbyTab] = useState<'simulacros' | 'reforzamiento'>('simulacros');

  // Beautiful interactive Custom Dialogue overlay state (solves sandbox iframe blocking window.confirm/alert)
  const [appDialog, setAppDialog] = useState<{
    title: string;
    message: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void;
    isDestructive?: boolean;
    isAlert?: boolean;
  } | null>(null);
  
  // Load previous logins & historical scores
  useEffect(() => {
    try {
      const storedStudent = localStorage.getItem('pruebas_nac_active_student');
      if (storedStudent) {
        setActiveStudent(JSON.parse(storedStudent));
      }
      
      const storedHistory = localStorage.getItem('pruebas_nac_history');
      if (storedHistory) {
        setAttempts(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync historical attempts when student transforms
  useEffect(() => {
    if (activeStudent) {
      try {
        const storedHistory = localStorage.getItem(`pruebas_nac_history_${activeStudent.rne}`);
        if (storedHistory) {
          setAttempts(JSON.parse(storedHistory));
        } else {
          setAttempts([]);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setAttempts([]);
    }
  }, [activeStudent]);

  // Handle active clock ticks
  useEffect(() => {
    let interval: any;
    if (isExamActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleCompleteExam(true); // Auto submit on expiration
            return 0;
          }
          return prev - 1;
        });
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExamActive, timeRemaining]);

  const handleSelectStudent = (student: Student) => {
    setActiveStudent(student);
    localStorage.setItem('pruebas_nac_active_student', JSON.stringify(student));
  };

  const handleLogout = () => {
    setActiveStudent(null);
    setActiveSubject(null);
    setIsExamActive(false);
    setIsExamCompleted(false);
    setAnswers({});
    setStarredQuestions({});
    localStorage.removeItem('pruebas_nac_active_student');
  };

  const handleStartExamSetup = (subject: Subject) => {
     setActiveSubject(subject);
     
     // Load standard 100 questions of the subject
     const baseQuestions = generateQuestionsForSubject(subject.id);
     
     // Shuffle the options of each question to distribute correct answers across A, B, C, D
     const mappedQuestions = baseQuestions.map(q => {
       const correctText = q.options[q.correctIndex];
       const shuffledOpts = shuffleArray(q.options);
       const newCorrectIndex = shuffledOpts.indexOf(correctText);
       return {
         ...q,
         options: shuffledOpts,
         correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : q.correctIndex,
         originalId: q.originalId || q.id
       };
     });
     
     // Shuffle the questions list for this session/attempt
     const shuffledQuestions = shuffleArray(mappedQuestions).slice(0, 100);
     
     setQuestions(shuffledQuestions);
     setAnswers({});
     setStarredQuestions({});
     setCurrentQuestionIndex(0);
     setTimeRemaining(subject.timeLimitMinutes * 60);
     setElapsedSeconds(0);
     setHasStartedIntro(true);
     setIsExamCompleted(false);
  };

  const handleBeginTimerPlay = () => {
    setIsExamActive(true);
  };

  const handleCompleteExam = (autoSubmit = false) => {
    if (autoSubmit) {
      executeCompleteExam();
      return;
    }

    const unansweredCount = questions.length - Object.keys(answers).length;
    if (unansweredCount > 0) {
      setAppDialog({
        title: '¿Entregar examen con preguntas en blanco?',
        message: `Tienes ${unansweredCount} preguntas en blanco en tu hoja de respuestas (Gabarito). ¿Estás seguro de que deseas enviar tu examen para calificación?`,
        confirmText: 'Sí, entregar de todos modos',
        cancelText: 'Volver a revisar',
        onConfirm: () => {
          executeCompleteExam();
          setAppDialog(null);
        },
        isDestructive: true
      });
    } else {
      setAppDialog({
        title: '¿Confirmas la entrega de tu examen?',
        message: '¿Estás seguro de que has completado el llenado de tu Gabarito y deseas entregar el examen para obtener tu calificación y plan de refuerzo?',
        confirmText: 'Sí, finalizar y entregar',
        cancelText: 'Volver a revisar',
        onConfirm: () => {
          executeCompleteExam();
          setAppDialog(null);
        }
      });
    }
  };

  const executeCompleteExam = () => {
    setIsExamActive(false);
    setIsExamCompleted(true);

    // Grade computation
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);

    const newAttempt: ExamAttempt = {
      subjectId: activeSubject!.id,
      subjectName: activeSubject!.name,
      score: finalScore,
      timeSpentSeconds: elapsedSeconds,
      date: new Date().toLocaleDateString('es-DO', { day: 'numeric', month: 'short', year: 'numeric' }),
      answers: { ...answers },
      questions: [ ...questions ],
      starredQuestions: { ...starredQuestions }
    };

    const updatedHistory = [newAttempt, ...attempts];
    setAttempts(updatedHistory);

    if (activeStudent) {
      localStorage.setItem(`pruebas_nac_history_${activeStudent.rne}`, JSON.stringify(updatedHistory));
    }
  };

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const toggleStarQuestion = (qId: number) => {
    setStarredQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Helper to render lucide dynamic icon
  const renderSubjectIcon = (iconName: string) => {
    const props = { className: "h-6 w-6 shrink-0" };
    switch (iconName) {
      case 'Calculator': return <Calculator {...props} className={`${props.className} text-blue-600`} />;
      case 'BookOpen': return <BookOpen {...props} className={`${props.className} text-emerald-600`} />;
      case 'Globe': return <Globe {...props} className={`${props.className} text-sky-600`} />;
      case 'Atom': return <Atom {...props} className={`${props.className} text-indigo-600`} />;
      default: return <BookOpen {...props} />;
    }
  };

  // Calculation parameters for final MINERD grade: Presentation average (70%) + simulation (30%)
  const calculateCombinedNationalGrade = (simulationScore: number): number => {
    return Math.round((presentationGrade * 0.70) + (simulationScore * 0.30));
  };

  const handleGoToStart = () => {
    if (isExamActive) {
      setAppDialog({
        title: '¿Salir del simulacro?',
        message: '¿Está seguro de que desea salir del simulacro en curso? Su progreso en este intento se perderá.',
        confirmText: 'Sí, salir',
        cancelText: 'Permanecer en el examen',
        onConfirm: () => {
          setActiveSubject(null);
          setIsExamActive(false);
          setIsExamCompleted(false);
          setViewingPastAttempt(null);
          setAppDialog(null);
        },
        isDestructive: true
      });
    } else if (isExamCompleted || viewingPastAttempt || activeSubject) {
      setAppDialog({
        title: '¿Regresar al inicio?',
        message: '¿Desea regresar al panel de materias e inicio?',
        confirmText: 'Sí, regresar',
        cancelText: 'Cancelar',
        onConfirm: () => {
          setActiveSubject(null);
          setIsExamActive(false);
          setIsExamCompleted(false);
          setViewingPastAttempt(null);
          setAppDialog(null);
        }
      });
    } else {
      setActiveSubject(null);
      setIsExamActive(false);
      setIsExamCompleted(false);
      setViewingPastAttempt(null);
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* HEADER COMPONENT */}
      <Header
        activeStudent={activeStudent}
        subjectName={activeSubject ? activeSubject.name : ''}
        timeRemainingSeconds={timeRemaining}
        onTimerExpire={() => handleCompleteExam(true)}
        isExamActive={isExamActive && !isExamCompleted}
        totalQuestions={questions.length}
        answeredCount={Object.keys(answers).length}
        onGoToStart={handleGoToStart}
      />

      <main className="flex-1 flex flex-col">
        {!activeStudent ? (
          /* 1. STUDENT REGISTRATION AND RNE SELECTION */
          <div className="py-12 px-4">
            <StudentPortal 
              onSelectStudent={handleSelectStudent}
              activeStudent={activeStudent}
              onLogout={handleLogout}
            />
          </div>
        ) : viewingPastAttempt ? (
          /* PAST ATTEMPT DETAILED REVIEW */
          <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b pb-4 border-slate-200">
              <button
                id="btn-close-past-review"
                onClick={() => setViewingPastAttempt(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl transition cursor-pointer shadow-3xs"
              >
                <ArrowLeft className="h-4 w-4" /> Volver al Tablero Principal
              </button>
              <div className="text-xs text-slate-500 font-medium">
                Visualizando Reporte de Simulacro Guardado de <strong className="text-slate-700">{activeStudent.name}</strong>
              </div>
            </div>

            <ReviewTab
              student={activeStudent}
              subjectName={viewingPastAttempt.subjectName}
              subjectId={viewingPastAttempt.subjectId}
              questions={viewingPastAttempt.questions || []}
              answers={viewingPastAttempt.answers || {}}
              starredQuestions={viewingPastAttempt.starredQuestions || {}}
              onRestart={() => {
                const sub = SUBJECTS.find(s => s.id === viewingPastAttempt.subjectId);
                setViewingPastAttempt(null);
                if (sub) {
                  handleStartExamSetup(sub);
                }
              }}
              timeSpentSeconds={viewingPastAttempt.timeSpentSeconds}
            />
          </div>
        ) : !activeSubject ? (
          /* 2. MAIN LOGGED-IN SUBJECTS PORTAL BOARD */
          <div id="dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in w-full">
            
            {/* Student card info and RNE credential stamp */}
            <StudentPortal 
              onSelectStudent={handleSelectStudent}
              activeStudent={activeStudent}
              onLogout={handleLogout}
            />

            {/* Elegant lobby navigation tabs */}
            <div className="flex border-b border-slate-200 mb-6 gap-6">
              <button
                onClick={() => setLobbyTab('simulacros')}
                className={`cursor-pointer pb-3 px-1 hover:text-slate-900 border-b-2 font-bold text-xs select-none transition flex items-center gap-2 ${
                  lobbyTab === 'simulacros' 
                    ? 'border-blue-600 text-blue-700' 
                    : 'border-transparent text-slate-500 hover:border-slate-300'
                }`}
              >
                📝 Simulacros de Pruebas Nacionales
              </button>
              <button
                onClick={() => setLobbyTab('reforzamiento')}
                className={`cursor-pointer pb-3 px-1 hover:text-slate-900 border-b-2 font-bold text-xs select-none transition flex items-center gap-2 relative ${
                  lobbyTab === 'reforzamiento' 
                    ? 'border-blue-600 text-blue-700' 
                    : 'border-transparent text-slate-500 hover:border-slate-300'
                }`}
              >
                🎯 Plan de Reforzamiento Especializado
                {attempts.length > 0 && (
                  <span className="bg-amber-500 text-white rounded-full text-[8.5px] px-1.5 py-0.5 font-bold font-sans animate-pulse">
                    Activo
                  </span>
                )}
              </button>
            </div>

            {lobbyTab === 'simulacros' ? (
              /* MINERD formulas and criteria setup */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Column: subjects selection */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6.5 shadow-xs">
                  <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" /> Selección de Cuadernillo
                  </h2>
                  <p className="text-sm text-slate-500 mb-6 font-medium">Cada cuadernillo oficial contiene preguntas cronometradas alineadas con las competencias curriculares del MINERD.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SUBJECTS.map(sub => {
                      const lastAttempt = attempts.find(a => a.subjectId === sub.id);
                      return (
                        <div
                          key={sub.id}
                          className="border border-slate-200 hover:border-blue-400 p-5 rounded-2xl bg-white hover:bg-blue-50/10 cursor-pointer group transition duration-200 flex flex-col justify-between"
                          onClick={() => handleStartExamSetup(sub)}
                          id={`subject-card-${sub.id}`}
                        >
                          <div>
                            <div className="flex items-center gap-3.5 mb-3">
                              <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition">
                                {renderSubjectIcon(sub.icon)}
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-800 group-hover:text-blue-900 transition">{sub.name}</h3>
                                <span className="text-[10px] text-slate-400 font-mono tracking-tight">{sub.timeLimitMinutes} minutos de cronómetro</span>
                              </div>
                            </div>
                            <p className="text-[11.5px] leading-relaxed text-slate-500 mb-5">{sub.description}</p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                            {lastAttempt ? (
                              <div className="text-[11px]">
                                <span className="text-slate-400">Última Nota:</span>{' '}
                                <strong className={`font-bold ${lastAttempt.score >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>{lastAttempt.score}/100</strong>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-medium">No realizado aún</span>
                            )}
                            <button
                              className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-xl shadow-xs transition group-hover:scale-102 flex items-center gap-1 shrink-0"
                            >
                              <Play className="h-3.5 w-3.5 fill-current" /> Comenzar
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Statistics & MINERD parameters calculator */}
              <div className="space-y-6">
                
                {/* Score weights calculator */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100 mb-4">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Cálculo de Promoción MINERD</h3>
                  </div>

                  <p className="text-[11.5px] text-slate-500 leading-normal mb-4">
                    En RD, la calificación para certificar tu bachillerato se compone del <strong>70% de tu Nota de Presentación</strong> (promedio de 4to a 6to de secundaria) y el <strong>30% de la Prueba Nacional</strong>. Debes lograr <strong>70 puntos o más</strong>.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Nota de Presentación (70%):</span>
                        <span className="text-indigo-600">{presentationGrade} puntos</span>
                      </div>
                      <input 
                        type="range" 
                        min="70" 
                        max="100" 
                        value={presentationGrade}
                        onChange={(e) => setPresentationGrade(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>

                    <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 mt-2 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Metas requeridas</span>
                      <p className="text-[11px] text-slate-600">
                        Si obtienes un <strong>70</strong> en el simulacro, tu nota final combinada oficial de promoción sería de <strong>{calculateCombinedNationalGrade(70)}</strong>.
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Si obtienes un <strong>100</strong>, tu nota final combinada sería de <strong>{calculateCombinedNationalGrade(100)}</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attempt histories lists */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100 mb-4">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Historial Local ({attempts.length})</h3>
                  </div>

                  {attempts.length === 0 ? (
                    <p className="text-[11.5px] text-slate-400 text-center py-6 leading-relaxed">No se han registrado simulacros completados bajo este perfil de RNE en este dispositivo.</p>
                  ) : (
                    <div className="space-y-3 font-sans max-h-60 overflow-y-auto pr-1">
                      {attempts.map((att, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => {
                            if (att.questions && att.answers) {
                              setViewingPastAttempt(att);
                            } else {
                              setAppDialog({
                                title: 'Reporte Simplificado',
                                message: 'Este reporte histórico no contiene el desglose de preguntas archivadas. Los nuevos simulacros completados guardarán el cuadernillo completo permitiendo la consulta retroactiva de sus respuestas.',
                                confirmText: 'Entendido',
                                onConfirm: () => setAppDialog(null),
                                isAlert: true
                              });
                            }
                          }}
                          className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/45 hover:border-blue-200 border border-slate-100 rounded-xl text-xs cursor-pointer group transition duration-150"
                        >
                          <div>
                            <div className="font-bold text-slate-700 group-hover:text-blue-950 transition">{att.subjectName}</div>
                            <div className="text-[9.5px] text-slate-400 mt-0.5">{att.date} • Duración: {Math.round(att.timeSpentSeconds / 60)} min</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className={`font-mono text-sm font-bold ${att.score >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {att.score}/100
                              </span>
                              <div className="text-[8.5px] uppercase font-bold text-slate-400 mt-0.5">
                                {att.score >= 70 ? 'Aprobado' : 'Fallo'}
                              </div>
                            </div>
                            <span className="text-[10px] bg-slate-150 text-slate-600 group-hover:bg-blue-600 group-hover:text-white font-bold px-2.5 py-1 rounded transition select-none">Ver Reporte</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Zona de Estudio Oficial MINERD */}
                <div id="study-zone-card" className="bg-gradient-to-br from-indigo-50/60 to-blue-50/20 border border-indigo-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 pb-3.5 border-b border-indigo-100 mb-4">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-extrabold text-indigo-950 text-sm uppercase tracking-wide">📚 Zona de Estudio</h3>
                  </div>
                  <p className="text-[11.5px] text-indigo-950 leading-relaxed mb-4">
                    Refuerza tus conocimientos con recursos gratuitos desarrollados bajo el diseño curricular oficial para las Pruebas Nacionales dominicanas:
                  </p>

                  <div className="space-y-3 font-sans">
                    <a 
                      href="https://iq.edu.do" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 bg-white border border-indigo-100 hover:border-indigo-400 rounded-xl hover:shadow-2xs transition duration-150 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-indigo-900 font-extrabold">IQ.EDU.DO (Auspicio INICIA)</strong>
                        <span className="text-[9px] bg-indigo-150 text-indigo-800 font-bold px-1.5 py-0.5 rounded uppercase">Entrar ↗</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">Portal de entrenamiento interactivo líder de Pruebas Nacionales.</p>
                    </a>

                    <a 
                      href="https://www.educando.edu.do" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 bg-white border border-indigo-100 hover:border-indigo-400 rounded-xl hover:shadow-2xs transition duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-indigo-900 font-extrabold">Educando Portal Oficial</strong>
                        <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">Sitio oficial</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">Cuadernillos pedagógicos históricos de familiarización del MINERD.</p>
                    </a>

                    <a 
                      href="https://es.khanacademy.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 bg-white border border-indigo-100 hover:border-indigo-400 rounded-xl hover:shadow-2xs transition duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-indigo-900 font-extrabold">Khan Academy en Español</strong>
                        <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">Matemáticas</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">Prácticas y lecciones guiadas de Álgebra, Geometría y Ciencias.</p>
                    </a>
                  </div>
                </div>

              </div>

            </div>
            ) : (
              <ReinforcementTab 
                attempts={attempts} 
                onStartSubject={(subId) => {
                  const sub = SUBJECTS.find(s => s.id === subId);
                  if (sub) {
                    setLobbyTab('simulacros');
                    handleStartExamSetup(sub);
                  }
                }} 
              />
            )}

          </div>
        ) : !isExamActive && !isExamCompleted ? (
          /* 3. EXAM INTRODUCTION SCREEN */
          <div id="exam-instructions-portal" className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 animate-fade-in">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 mb-6">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded tracking-wide font-sans">CUADERNILLO LISTO</span>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-1">Convocatoria Simulada: {activeSubject.name}</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-8">
              <p>Has seleccionado dar el simulacro de **{activeSubject.name}**. Por favor lea detalladamente las instrucciones oficiales para responder:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li>El cuadernillo contiene **exactamente {questions.length} ítems o preguntas** cerradas de opción múltiple (A, B, C, D). Sólo una opción es la verdadera.</li>
                <li>Tienes un tiempo regulado de **{activeSubject.timeLimitMinutes} minutos** para responder.</li>
                <li>Rellena los círculos con lápiz en el panel **Gabarito de Respuestas** a la derecha de la pantalla.</li>
                <li>Puedes marcar preguntas con el botón de estrella **(Marcar para Revisar)** para localizarlas velozmente después en el Gabarito.</li>
                <li>Al finalizar, presione **Entregar Examen** para calificar y armar las propuestas de su Plan de Reforzamiento personalizado.</li>
              </ul>

              <div className="p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-100 text-xs flex gap-2.5 mt-2">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <span>**Recordatorio**: Está prohibido el uso de calculadoras programáticas, teléfonos celulares o la consulta externa. Este simulacro refleja con precisión la dificultad real del MINERD. ¡Esfuérzate al máximo!</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                id="btn-back-home"
                onClick={() => setActiveSubject(null)}
                className="w-1/3 text-xs font-bold py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition duration-200"
              >
                Volver
              </button>
              <button
                id="btn-start-exam"
                onClick={handleBeginTimerPlay}
                className="w-2/3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition duration-200 hover:scale-102 flex items-center justify-center gap-1.5"
              >
                <Play className="h-4 w-4 fill-current" /> Entrar al Examen
              </button>
            </div>
          </div>
        ) : !isExamCompleted ? (
          /* 4. ACTIVE EXAM PLATFORM (SPLIT LAYOUT: BOOK ON LEFT, BUBBLE-SHEET ON RIGHT) */
          <div id="active-test-hall" className="flex-1 flex flex-col lg:flex-row h-full">
            
            {/* Left Column: Cuadernillo questions context & statements */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:overflow-y-auto lg:max-h-[calc(100vh-80px)] border-b lg:border-b-0 lg:border-r border-slate-200 max-w-4xl mx-auto w-full">
              {questions.length > 0 && (
                <div key={currentQuestionIndex} className="space-y-6 animate-fade-in">
                  
                  {/* Category, star bookmark button */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60">
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-mono tracking-tight font-black uppercase px-2 py-1 rounded">
                      {questions[currentQuestionIndex].category}
                    </span>
                    <button
                      id="btn-flag-question"
                      onClick={() => toggleStarQuestion(questions[currentQuestionIndex].id)}
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border transition duration-150 flex items-center gap-1.5 ${
                        starredQuestions[questions[currentQuestionIndex].id]
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${starredQuestions[questions[currentQuestionIndex].id] ? 'fill-current' : ''}`} />
                      <span>{starredQuestions[questions[currentQuestionIndex].id] ? 'Marcada' : 'Marcar para Revisar'}</span>
                    </button>
                  </div>

                  {/* Context passage if present */}
                  {questions[currentQuestionIndex].context && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 italic text-sm text-slate-600 leading-relaxed relative overflow-hidden">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block not-italic mb-2 font-black border-b pb-1">Texto de Lectura Asociado</span>
                      <MathText text={questions[currentQuestionIndex].context} className="whitespace-pre-wrap text-sm text-slate-755 leading-relaxed" />
                    </div>
                  )}

                  {/* Question Statement */}
                  <div className="space-y-3">
                    <span className="text-slate-400 font-mono text-xs font-black uppercase">Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
                    <MathText 
                      text={questions[currentQuestionIndex].statement} 
                      className="text-base md:text-lg font-bold text-slate-800 leading-normal" 
                      isParagraph={true}
                    />
                  </div>

                  {/* Diagrams visualizer inline */}
                  <Visualizer
                    questionId={questions[currentQuestionIndex].originalId || questions[currentQuestionIndex].id}
                    category={questions[currentQuestionIndex].category}
                    subjectId={activeSubject!.id}
                  />

                  {/* Options select grid */}
                  <div className="space-y-3.5 pt-4">
                    {questions[currentQuestionIndex].options.map((option, idx) => {
                      const isOptionChecked = answers[questions[currentQuestionIndex].id] === idx;
                      return (
                        <div
                          key={idx}
                          id={`option-card-${questions[currentQuestionIndex].id}-${idx}`}
                          onClick={() => handleSelectAnswer(questions[currentQuestionIndex].id, idx)}
                          className={`p-4 border rounded-2xl cursor-pointer flex items-start gap-3 transition select-none ${
                            isOptionChecked
                              ? 'bg-blue-600/5 border-blue-600 text-blue-900 shadow-3xs'
                              : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className={`h-6 w-6 rounded-full border transition flex items-center justify-center font-bold text-xs uppercase shrink-0 ${
                            isOptionChecked
                              ? 'bg-slate-800 border-slate-800 text-white font-black'
                              : 'bg-slate-100 border-slate-300 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <MathText text={option} className={`${isOptionChecked ? 'font-bold' : 'font-medium'} text-xs md:text-sm pt-0.5 leading-normal`} isParagraph={false} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Nav Controls Footer */}
                  <div className="flex gap-4 pt-6 border-t border-slate-200">
                    <button
                      id="btn-prev-question"
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="w-1/2 justify-center py-3 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl transition duration-150 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      id="btn-next-question"
                      onClick={() => {
                        if (currentQuestionIndex < questions.length - 1) {
                          setCurrentQuestionIndex(prev => prev + 1);
                        } else {
                          // Submit triggering
                          handleCompleteExam(false);
                        }
                      }}
                      className="w-1/2 justify-center py-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition duration-150 flex items-center gap-1.5 cursor-pointer"
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Finalizar y Entregar' : 'Siguiente'}
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* Right Column: Virtual bubble sheet Gabarito */}
            <div className="w-full lg:w-[340px] bg-slate-100 border-t lg:border-t-0 p-4 sm:p-6 flex flex-col justify-between lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto lg:sticky lg:top-[80px]">
              <div>
                <Gabarito
                  questions={questions}
                  answers={answers}
                  currentQuestionIndex={currentQuestionIndex}
                  onSelectQuestion={(index) => setCurrentQuestionIndex(index)}
                  onSelectAnswer={handleSelectAnswer}
                  starredQuestions={starredQuestions}
                />

                <div className="p-3 bg-white/60 border border-slate-200 rounded-xl mt-4 text-[10px] text-slate-500 leading-normal flex gap-1.5">
                  <CheckSquare className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Rellene todos los círculos de la plantilla. Cada número representa el renglón correspondiente en la hoja física del MINERD.</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 space-y-3">
                <button
                  id="btn-submit-exam"
                  onClick={() => handleCompleteExam(false)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
                >
                  Entregar Examen Virtual
                </button>
                <button
                  id="btn-cancel-exam"
                  onClick={() => {
                    setAppDialog({
                      title: '¿Salir del simulacro?',
                      message: '¿Está seguro de que desea salir de este simulacro en curso? Su progreso actual del examen y tiempo restante se perderán por completo.',
                      confirmText: 'Sí, salir sin guardar',
                      cancelText: 'Continuar examen',
                      onConfirm: () => {
                        setActiveSubject(null);
                        setIsExamActive(false);
                        setIsExamCompleted(false);
                        setAppDialog(null);
                      },
                      isDestructive: true
                    });
                  }}
                  className="w-full bg-white hover:bg-rose-50 border border-slate-200 text-rose-600 font-bold text-xs py-2 rounded-xl transition cursor-pointer"
                >
                  Regresar al Portal
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* 5. SIMULATION SUMMARY & STUDY PLANBOARD */
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b pb-4">
              <div className="flex flex-wrap gap-2">
                <button
                  id="btn-nav-return-lobby"
                  onClick={() => {
                    setActiveSubject(null);
                    setIsExamCompleted(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl transition shadow-3xs"
                >
                  <ArrowLeft className="h-4 w-4" /> Volver al Menú Principal
                </button>
                <button
                  id="btn-nav-logout-completely"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 py-2 px-4 rounded-xl transition shadow-3xs"
                >
                  🚪 Cerrar Sesión
                </button>
              </div>
              <div className="text-xs text-slate-400">
                Simulador del MINERD • <span className="font-semibold text-slate-600">RNE: {activeStudent.rne}</span>
              </div>
            </div>

            <ReviewTab
              student={activeStudent}
              subjectName={activeSubject.name}
              subjectId={activeSubject.id}
              questions={questions}
              answers={answers}
              starredQuestions={starredQuestions}
              onRestart={() => handleStartExamSetup(activeSubject)}
              timeSpentSeconds={elapsedSeconds}
            />
          </div>
        )}
      </main>

      {/* Beautiful fully responsive non-blocking custom modal dialog overlay (preserves iframe compatibility) */}
      {appDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className={`flex items-center gap-3 ${appDialog.isDestructive ? 'text-rose-600' : 'text-blue-600'}`}>
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-800">{appDialog.title}</h3>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              {appDialog.message}
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              {!appDialog.isAlert && (
                <button
                  type="button"
                  onClick={() => setAppDialog(null)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  {appDialog.cancelText || 'Cancelar'}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  appDialog.onConfirm();
                }}
                className={`px-4 py-2.5 text-xs font-bold text-white rounded-xl transition cursor-pointer ${
                  appDialog.isDestructive 
                    ? 'bg-rose-600 hover:bg-rose-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {appDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
