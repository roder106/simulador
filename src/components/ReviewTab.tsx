/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, AlertTriangle, BookOpen, Clock, RefreshCw, ChevronDown, ChevronUp, Search, Sparkles, BrainCircuit, UserCheck } from 'lucide-react';
import { Question } from '../data/questionsGenerator';
import { Student } from './StudentPortal';
import MathText from './MathText';
import Visualizer from './Visualizer';

interface ReviewTabProps {
  student: Student;
  subjectName: string;
  subjectId: string;
  questions: Question[];
  answers: { [qId: number]: number };
  starredQuestions: { [qId: number]: boolean };
  onRestart: () => void;
  timeSpentSeconds: number;
}

interface ReinforcementCard {
  title: string;
  category: string;
  definition: string;
  bestPractice: string;
  exampleProblem: string;
}

// Helper to parse double asterisks and inline code backticks into rich elements
function parseInlineStyles(text: string): React.ReactNode[] {
  // Regex to match bold (**text**), code (`text`), or normal text
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-[#93c5fd]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-slate-800 text-[#fde047] font-mono text-[10.5px] px-1.5 py-0.5 rounded border border-slate-705/60 mx-0.5 font-semibold">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Custom Markdown block-level renderer to handle headers, lists, and paragraphs
function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  
  // Split the text into lines
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'bullet' | 'numeric' | null = null;

  const flushList = (key: number) => {
    if (listItems.length === 0) return;
    if (listType === 'bullet') {
      elements.push(
        <ul key={`list-${key}`} className="list-none pl-1 space-y-1.5 my-2.5">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start text-[11.5px] text-slate-300 gap-2 leading-relaxed">
              <span className="text-blue-400 mt-1 select-none font-bold shrink-0 text-xs text-blue-300 leading-none">•</span>
              <span className="flex-1 text-slate-200">{parseInlineStyles(item)}</span>
            </li>
          ))}
        </ul>
      );
    } else if (listType === 'numeric') {
      elements.push(
        <ol key={`list-${key}`} className="list-none pl-1 space-y-1.5 my-2.5">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start text-[11.5px] text-slate-300 gap-2 leading-relaxed">
              <span className="text-yellow-300 font-mono font-bold shrink-0 text-[10.5px] leading-tight select-none">{i + 1}.</span>
              <span className="flex-1 text-slate-200">{parseInlineStyles(item)}</span>
            </li>
          ))}
        </ol>
      );
    }
    listItems = [];
    listType = null;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('###')) {
      flushList(index);
      const title = trimmed.replace(/^###\s*/, '');
      elements.push(
        <h4 key={index} className="text-[11.5px] font-black text-blue-400 uppercase tracking-wider mt-4 mb-1.5 font-bold">
          {parseInlineStyles(title)}
        </h4>
      );
    } else if (trimmed.startsWith('##')) {
      flushList(index);
      const title = trimmed.replace(/^##\s*/, '');
      elements.push(
        <h3 key={index} className="text-[12.5px] font-black text-white tracking-tight mt-5 mb-2 pb-1 border-b border-slate-800 font-bold">
          {parseInlineStyles(title)}
        </h3>
      );
    } else if (trimmed.startsWith('#')) {
      flushList(index);
      const title = trimmed.replace(/^#\s*/, '');
      elements.push(
        <h2 key={index} className="text-sm font-black text-white tracking-tight mt-6 mb-2.5 font-extrabold text-blue-200">
          {parseInlineStyles(title)}
        </h2>
      );
    }
    // Bullet list items
    else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      if (listType !== 'bullet') {
        flushList(index);
        listType = 'bullet';
      }
      const content = trimmed.replace(/^[-*]\s*/, '');
      listItems.push(content);
    }
    // Numbered list items
    else if (/^\d+\.\s+/.test(trimmed)) {
      if (listType !== 'numeric') {
        flushList(index);
        listType = 'numeric';
      }
      const content = trimmed.replace(/^\d+\.\s*/, '');
      listItems.push(content);
    }
    // Empty line or space
    else if (trimmed === '') {
      flushList(index);
    }
    // Normal paragraph line
    else {
      flushList(index);
      elements.push(
        <p key={index} className="text-[11.5px] text-slate-300 leading-relaxed mb-2.5">
          {parseInlineStyles(line)}
        </p>
      );
    }
  });

  // Flush any final list items
  flushList(lines.length);

  return <div className="space-y-0.5">{elements}</div>;
}

export default function ReviewTab({
  student,
  subjectName,
  subjectId,
  questions,
  answers,
  starredQuestions,
  onRestart,
  timeSpentSeconds
}: ReviewTabProps) {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'starred'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // AI Tutor state
  const [aiMessage, setAiMessage] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Grade Calculations
  let correctCount = 0;
  let incorrectCount = 0;
  let unexpressedCount = 0;

  questions.forEach(q => {
    const answered = answers[q.id];
    if (answered === undefined) {
      unexpressedCount++;
    } else if (answered === q.correctIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const finalScore = Math.round((correctCount / questions.length) * 100);
  const isApproved = finalScore >= 70; // High-school MINERD threshold is 70+

  // Filtered Questions
  const filteredQuestions = questions.filter(q => {
    const answered = answers[q.id];
    const isCorrect = answered === q.correctIndex;
    const isStarred = starredQuestions[q.id];

    if (filter === 'correct' && !isCorrect) return false;
    if (filter === 'incorrect' && (answered === undefined || isCorrect)) return false;
    if (filter === 'starred' && !isStarred) return false;

    if (searchTerm.trim() !== '') {
      const matchText = `${q.statement} ${q.category} ${q.explanation}`.toLowerCase();
      if (!matchText.includes(searchTerm.toLowerCase())) return false;
    }

    return true;
  });

  // Calculate failed categories dynamically
  const failedCategoriesMap: { [cat: string]: number } = {};
  questions.forEach(q => {
    const answered = answers[q.id];
    if (answered !== undefined && answered !== q.correctIndex) {
      failedCategoriesMap[q.category] = (failedCategoriesMap[q.category] || 0) + 1;
    }
  });

  const failedCategories = Object.keys(failedCategoriesMap).sort(
    (a, b) => failedCategoriesMap[b] - failedCategoriesMap[a]
  );

  // Curated Textbook Reinforcement Planner Data mapped directly to subjectId
  const getStudyGuides = (): ReinforcementCard[] => {
    if (subjectId === 'matematica') {
        return [
          {
            title: "Leyes de Exponentes y Ecuaciones Exponenciales",
            category: "Álgebra y Ecuaciones",
            definition: "Para resolver ecuaciones exponenciales como A^x = B, es primordial expresar ambos miembros de la igualdad con una base numérica idéntica. Al lograr bases iguales (ej. N^P = N^Q), podemos igualar directamente los exponentes resultantes P = Q para despejar la incógnita de forma lineal o cuadrática sencilla.",
            bestPractice: "En el Paso 2x - 4 = 10, recuerde que el -4 pasa a sumar al lado derecho dando 2x = 14 (No reste ni olvide cambiar de signo). Verifique siempre sustituyendo el valor numérico en la base original.",
            exampleProblem: "Resolver: 9^(x - 1) = 27. -> (3²)^(x - 1) = 3³ -> 3^(2x - 2) = 3³ -> 2x - 2 = 3 -> 2x = 5 -> x = 5/2."
          },
          {
            title: "Conversión de Grados a Radianes e Identidades de Trigonometría",
            category: "Trigonometría",
            definition: "La conversión de medidas angulares es un tema recurrente del MINERD. Un círculo de 360 grados equivale exactamente a 2pi radianes (o 180° = pi rad). Por tanto, la fórmula general de conversión directa es: Radianes = Grados * (pi / 180).",
            bestPractice: "Simplifique las fracciones resultantes dividiendo entre el máximo común divisor. Ej: 150/180 dividiendo entre 30 da exactamente 5/6.",
            exampleProblem: "Convertir 135° a radianes: 135 * (pi / 180) = (135/180) * pi. Dividiendo entre 45 obtenemos 3/4 pi radianes."
          },
          {
            title: "Medidas de Tendencia Central para Datos Pares",
            category: "Estadística y Análisis de Datos",
            definition: "La mediana representa el valor ubicado en la posición central de un conjunto de datos previamente ordenados de menor a mayor. Si los datos son impares, se selecciona el central. Si los datos totales son de cantidad par, la mediana obligatoriamente es el promedio simple de las dos cifras centrales.",
            bestPractice: "Nunca tome el dato del centro directamente de una lista desordenada. En su hoja de lápiz #2 ordene minuciosamente los números de forma ascendente antes de realizar la bísqueda.",
            exampleProblem: "Lista desordenada: [14, 10, 19, 12]. Ordenada: [10, 12, 14, 19]. Cifras centrales: 12 y 14. Mediana = (12 + 14)/2 = 13."
          },
          {
            title: "Probabilidades por la Regla de Laplace",
            category: "Probabilidad",
            definition: "La regla de Laplace establece que en un experimento aleatorio donde todos los resultados son equiprobables (misma posibilidad), la probabilidad de un evento A de éxito es: P(A) = (Casos Favorables) / (Total de Casos Posibles). Siempre se representa como una fracción simple irreductible, un decimal entre 0 y 1, o un porcentaje.",
            bestPractice: "Sume correctamente todas las cantidades para determinar el divisor total de la fracción.",
            exampleProblem: "Bolsa con 5 canicas rojas, 3 azules y 2 verdes. Probabilidad de que NO sea verde = canicas rojas + azules = 5 + 3 = 8. Total = 10. Probabilidad = 8/10 = 4/5 = 80%."
          }
        ];
    } else if (subjectId === 'espanol') {
        return [
          {
            title: "Análisis Inferencial de Lecturas",
            category: "Comprensión Lectora - Inferencial",
            definition: 'Deducir información no explícita en el párrafo (leer de forma inferencial) requiere conectar las pistas literales dadas por el autor con conclusiones generales lógicas. Debe distinguir entre "Opiniones", "Hechos Directos" e "Inferencias".',
            bestPractice: "Vuelva a leer el contexto completo si se le pregunta por una fecha de paso. Si dice que ocurrió al día siguiente o anterior, busque la referencia base del día en la lectura principal.",
            exampleProblem: 'En el cuento "Luis Pie", el autor utiliza la fiebre y las heridas del cañero para representar de forma alegórica el sufrimiento humilde del obrero agrícola.'
          },
          {
            title: "Sintaxis, Cohesión y Conectores Discursivos",
            category: "Gramática y Sintaxis",
            definition: "Los conectores discursivos (ej. 'por lo tanto', 'sin embargo', 'dado que') dotan de coherencia al texto. Permiten estructurar oraciones estableciendo nexos de causa, oposición, adición o consecuencia lógica según la intención comunicativa del escritor.",
            bestPractice: "Pruebe sustituir el conector por uno similar para ver si el sentido de la oración cambia. Ej: 'sin embargo' expresa oposición, igual que 'obstante'.",
            exampleProblem: '"La población dominicana sigue creciendo; ___ las tasas de natalidad se han estabilizado". El conector adecuado para expresar oposición es "sin embargo" o "no obstante".'
          }
        ];
    } else if (subjectId === 'sociales') {
        return [
          {
            title: "Líneas de Tiempo de la Patria Dominicana",
            category: "Historia Dominicana",
            definition: "Un dominio riguroso de la cronología patria del siglo XIX y XX dominicano es calve en la Prueba Nacional del MINERD. Hitos fundacionales: Independencia Nacional (27 de Febrero de 1844), Guerra Restauradora (16 de Agosto de 1863) y el derrocamiento o fin de la Dictadura Trujillista (30 de Mayo de 1961).",
            bestPractice: "Establezca relaciones de causa y efecto. La anexión a España iniciada por Pedro Santana en 1861 fue la causa que detonó de forma violenta el estallido revolucionario de la Restauración de la República de 1863.",
            exampleProblem: "¿Fecha de fin de la era de dictadura de Rafael Leónidas Trujillo? 1961."
          },
          {
            title: "Poderes del Estado y Derechos Fundamentales",
            category: "Cívica y Constitución",
            definition: "La Constitución proclamada en base a reformas (como la del 2015) establece tres poderes estatales autónomos independientes:\n1. Poder Ejecutivo (Presidencia de la República: ejecuta leyes),\n2. Poder Legislativo (Senado y Cámara de Diputados: legisla o crea leyes e impuestos),\n3. Poder Judicial (Suprema Corte de Justicia y tribunales: administra la justicia).",
            bestPractice: "Recuerde que ninguna cámara corporativa o grupo civil puede crear aranceles e impuestos de forma privada. Legislar impuestos es facultad soberana y exclusiva del Congreso Nacional dominicano.",
            exampleProblem: "Si un grupo municipal desea redactar una reforma arancelaria de carácter general, debe canalizarla a través de sus diputados o la iniciativa legislativa popular según el art. 97 constitucional."
          }
        ];
    } else {
        return [
          {
            title: "Genética Mendeliana y Cuadros de Punnett",
            category: "Biología y Genética",
            definition: "El cruce de caracteres se determina por la asignación alélica. Homocigoto dominante (LL), Heterocigoto (Ll) y Homocigoto recesivo (ll). Al realizar un cruce heterocigoto híbrido (Ll x Ll) obtenemos una proporción universal y constante de 3 descendientes fenotípicamente dominantes por cada 1 de genotipo recesivo (75% vs 25%).",
            bestPractice: "Al hacer cruces en el simulacro, dibuje siempre la cuadrícula de 2x2. Ordene los alelos maternos en filas y los paternos en columnas para evitar errores visuales rápidos.",
            exampleProblem: "Semillas Lisas (L) y Rugosas (l). Si cruzamos un progenitor Ll con uno ll, la descendencia será 50% Ll (Lisas) y 50% ll (Rugosas)."
          },
          {
            title: "Determinación Cuantitativa del pH y la Acidez",
            category: "Química Molecular y Orgánica",
            definition: "La concentración de iones de hidrógeno [H+] determina la escala de pH logarítmica que va del 0 al 14. Soluciones ácidas tienen un pH de 0 a 6.9, donde los valores más cercanos a 0 son altamente ácidos. La solución neutra por excelencia es el agua pura (pH = 7.0). Las bases varían de 7.1 a 14.",
            bestPractice: "No asocie un pH de cifra alta con la mayor acidez. Es a la inversa: mientras más pequeña sea la cifra de pH, más concentrado es el ácido.",
            exampleProblem: "Sustancia A con pH=2 y sustancia B con pH=5. La sustancia A es notablemente más ácida que la B."
          }
        ];
    }
  };

  // Ask AI Tutor for step-by-step guidance utilizing process.env injected Gemini SDK
  const handleQueryAi = async (topic: string) => {
    setSelectedTopic(topic);
    setAiLoading(true);
    setAiMessage('');
    
    // Attempt real server API first
    let fetchedSuccessfully = false;
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Eres un tutor experto preparador para las Pruebas Nacionales del Ministerio de Educación de la República Dominicana (MINERD). Explica de manera simple, amigable, pedagógica y paso a paso el tema "${topic}" en relación a la materia de ${subjectName} para el estudiante dominicano ${student.name}. Brinda tips rápidos y un ejemplo corto similar a los del examen real.`
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          setAiMessage(data.text);
          fetchedSuccessfully = true;
        }
      }
    } catch (e) {
      console.log('Gemini API endpoint unavailable or offline (expected on static hostings like GitHub Pages).');
    }

    // Try client-side Gemini API call if server endpoint is unavailable
    if (!fetchedSuccessfully) {
      try {
        const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "AIzaSyCGabAHbn1XyEyB4Xq3GhNnT02ArRweqFQ";
        if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
          const { GoogleGenAI } = await import('@google/genai');
          const ai = new GoogleGenAI({ apiKey });
          
          const prompt = `Eres un tutor experto preparador para las Pruebas Nacionales del Ministerio de Educación de la República Dominicana (MINERD). Explica de manera simple, amigable, pedagógica y paso a paso el tema "${topic}" en relación a la materia de ${subjectName} para el estudiante dominicano ${student.name}. Brinda tips rápidos y un ejemplo corto similar a los del examen real. Escribe usando Markdown, con subtítulos, negritas y listas.`;
          
          const answer = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              systemInstruction: "Eres un tutor experto preparador para las Pruebas Nacionales del Ministerio de Educación de la República Dominicana (MINERD). Explica de manera simple, amigable, pedagógica y paso a paso para el estudiante dominicano.",
              temperature: 0.7
            }
          });
          
          if (answer.text) {
            setAiMessage(answer.text);
            fetchedSuccessfully = true;
          }
        }
      } catch (clientErr) {
        console.error('Error in client-side Gemini API call:', clientErr);
      }
    }

    // High quality offline fallback resolver
    if (!fetchedSuccessfully) {
      const guides = getStudyGuides();
      const matchedGuide = guides.find(g => 
        g.title.toLowerCase().includes(topic.toLowerCase()) || 
        topic.toLowerCase().includes(g.title.toLowerCase()) ||
        g.category.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(g.category.toLowerCase())
      );

      if (matchedGuide) {
        setAiMessage(`¡Hola **${student.name}**! Como tu tutor virtual asignado para la materia de **${subjectName}**, te he preparado una guía detallada para dominar este tema clave:

### 📖 Concepto Esencial
${matchedGuide.definition}

### 💡 Ejemplo Práctico Explicado
${matchedGuide.exampleProblem}

### 🎯 Tip de Oro para la Prueba Nacional
${matchedGuide.bestPractice}

### 🚶 Método de Resolución Paso a Paso
1. **Analiza el enunciado cuidadosamente**: Identifica los datos provistos y lo que se te pide encontrar (nunca asumas una respuesta a la ligera).
2. **Dibuja o esquematiza**: Utiliza el Gabarito o un papel de borrador para estructurar la ecuación, los vectores de fuerza o las ideas del texto.
3. **Elimina distractores**: Las Pruebas Nacionales siempre incluyen al menos una opción absurda. ¡Búscala y táchala de inmediato!
4. **Verifica signos y unidades**: El 60% de los errores de los estudiantes de secundaria dominicana ocurren por cambiar un signo o confundir metros con centímetros.

*¡Sigue adelante, ${student.name}! Estás a pocos pasos de asegurar tu certificación de bachiller escolar de la República Dominicana con un puntaje sobresaliente (70+ de aprobación).*`);
      } else {
        // Dynamic topic content depending on search keywords or subject
        let customContent = '';
        let customExample = '';
        let customTip = '';

        if (subjectId === 'matematica') {
          customContent = `El tema de **"${topic}"** requiere gran agilidad en tus procedimientos numéricos. En la prueba oficial de matemáticas del MINERD, se evalúa tu capacidad para plantear esquemas analíticos y resolverlos con confianza aritmética.`;
          customExample = `Para resolver ecuaciones o proporciones ligadas a este tema:
1. Agrupa las variables de un sólo lado del signo igual.
2. Si tienes fracciones, multiplica en cruz para eliminarlas rápidamente.
3. Valida tu respuesta final sustituyendo de vuelta en el problema original para confirmar el resultado.`;
          customTip = `¡Cuidado al trasponer términos! Recuerda que lo que pasa sumando, pasa al otro lado restando, y viceversa. Un error del signo es la principal trampa del examen de matemáticas.`;
        } else if (subjectId === 'espanol') {
          customContent = `El tema de **"${topic}"** es vital en Lengua Española para las Pruebas Nacionales. Generalmente se presentan textos literarios de autores dominicanos o prensa nacional donde debes deducir intenciones comunicativas o estructuras sintácticas.`;
          customExample = `Al analizar un fragmento complejo:
1. Identifica el tipo de texto (argumentativo, expositivo, narrativo).
2. Localiza el núcleo del sujeto (sustantivo) y el núcleo del predicado (verbo conjugado).
3. Reconoce los conectores utilizados para unir las oraciones (ej. "ya que", "pero", "además").`;
          customTip = `Muchos textos contienen ideas implícitas. No te quedes únicamente con lo literal. Pregúntate siempre: "¿Qué quiere que aprenda el lector con este párrafo?"`;
        } else if (subjectId === 'sociales') {
          customContent = `El tema de **"${topic}"** forma parte integral del programa de Sociales de 6to de Secundaria. En las Pruebas Nacionales dominicanas se prioriza entender las causas y consecuencias de los grandes procesos políticos, históricos y cívicos del país.`;
          customExample = `Para dominar este apartado histórico o geográfico:
1. Relaciona las biografías de los personajes clave (ej. Juan Pablo Duarte, Gregorio Luperón, Francisco Alberto Caamaño) con sus respectivas gestas libertadoras.
2. Reconoce el territorio de la isla de Santo Domingo y sus recursos naturales predominantes.
3. Conoce tus derechos constitucionales y los órganos del Estado dominicano.`;
          customTip = `La historia no es meramente memorizar fechas. En el examen del MINERD, siempre asocia la Guerra de la Restauración (1863) con el fervor nacionalista por recuperar la soberanía perdida en la Anexión a España (1861).`;
        } else {
          // Ciencias Naturales
          customContent = `El tema de **"${topic}"** abarca ramas fundamentales de la Química, Física y Biología de Pruebas Nacionales. Se enfoca en que comprendas las leyes que gobiernan la naturaleza, la composición atómica o los procesos ecosistémicos de nuestra isla.`;
          customExample = `Pasos lógicos para este tipo de preguntas de ciencias:
1. En **Física**: Identifica si se trata de fuerzas equilibradas (Fnet = 0) o en aceleración (F = m·a).
2. En **Química**: Distingue enlaces iónicos, covalentes y de hidrógeno, o la escala de pH.
3. En **Biología**: Recuerda que el ADN almacena el código genético mediante bases nitrogenadas (A, T, C, G).`;
          customTip = `En Biología y Genética, cuando veas un cruce entre dos heterocigotos dominantes (Ll x Ll), la respuesta del porcentaje siempre suele ser 75% dominante y 25% recesivo. ¡Un atajo que te ahorrará tiempo valioso!`;
        }

        setAiMessage(`¡Hola **${student.name}**! Como tu tutor virtual para **${subjectName}**, te explico el tema de **"${topic}"** diseñado de manera óptima para ti:

### 📖 Concepto General
${customContent}

### 💡 Ejemplo Práctico Recomendado
${customExample}

### 🎯 Tip de Oro para la Prueba Real
${customTip}

### 🚶 Estrategia de Éxito
- **Paso 1**: Lee la pregunta dos veces para separar la información relevante de la de relleno.
- **Paso 2**: Utiliza las técnicas de descarte para desechar opciones inservibles.
- **Paso 3**: Responde todas las preguntas de tu Gabarito. ¡No dejes ninguna en blanco, ya que las respuestas incorrectas no restan puntos!

*¡Tú puedes lograrlo! Todo el bachillerato dominicano confía en tu preparación. Con esta disciplina alcanzarás una puntuación estelar.*`);
      }
    }
    setAiLoading(false);
  };

  // Helper to get time text
  const formatTimeSpent = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins} min y ${remainingSecs} seg`;
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="review-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* EXAM REPORT HEADER */}
      <div className={`p-8 rounded-3xl border text-white mb-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 transition ${
        isApproved 
          ? 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 border-emerald-500' 
          : 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 border-amber-500'
      }`}>
        <div>
          <div className="text-[10px] tracking-widest uppercase opacity-85 font-semibold">Reporte oficial del simulacro</div>
          <span className="text-2xs bg-white/20 text-white font-mono px-2 py-0.5 rounded uppercase font-bold tracking-tight">MINERD 6to SEC.</span>
          <h1 className="text-3xl font-black mt-2">Detalles del Resultado</h1>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm opacity-95 mt-4">
            <p className="flex items-center gap-1.5"><UserCheck className="h-4 w-4" /> <strong>Estudiante:</strong> {student.name} {student.lastName1}</p>
            <p><strong>RNE:</strong> <span className="font-mono text-yellow-300 font-bold">{student.rne}</span></p>
            <p className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> <strong>Duración:</strong> {formatTimeSpent(timeSpentSeconds)}</p>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white/10 backdrop-blur-xs py-4 px-6 rounded-2xl border border-white/15 text-center min-w-[160px]">
          <span className="text-[10px] uppercase font-bold text-white/80 select-none">Calificación</span>
          <div className="text-5xl font-black tracking-tight">{finalScore} / 100</div>
          
          <div className="mt-2.5">
            {isApproved ? (
              <span className="inline-flex items-center gap-1 bg-white text-emerald-700 text-xs font-black px-3 py-1 rounded-full shadow-xs uppercase tracking-wide">
                <Award className="h-3.5 w-3.5" /> APROBADO (70+)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-white text-amber-800 text-xs font-black px-3 py-1 rounded-full shadow-xs uppercase tracking-wide">
                <AlertTriangle className="h-3.5 w-3.5" /> REPROBADO (Convocatoria)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* THREE BENTO GRID LAYOUT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
        
        {/* LEFT & CENTER: DETAILED QUESTION REVIEW */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" /> Revisión del Cuadernillo
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Analice cada una de las respuestas correctas e incorrectas.</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilter('all')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                    filter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  Todas ({questions.length})
                </button>
                <button
                  onClick={() => setFilter('correct')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                    filter === 'correct' ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  Correctas ({correctCount})
                </button>
                <button
                  onClick={() => setFilter('incorrect')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                    filter === 'incorrect' ? 'bg-rose-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  Incorrectas ({incorrectCount})
                </button>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Buscar temas, palabras clave o detalles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Questions Lists */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No se encontraron preguntas con el filtro o búsqueda especificada.
                </div>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const answeredIdx = answers[q.id];
                  const isCorrect = answeredIdx === q.correctIndex;
                  const isExpanded = expandedId === q.id;

                  return (
                    <div
                      key={q.id}
                      className={`border rounded-2xl overflow-hidden transition ${
                        isExpanded ? 'border-slate-350 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Summary Banner Toggle Clickable */}
                      <div
                        onClick={() => toggleExpand(q.id)}
                        className={`p-4 flex items-center justify-between gap-4 cursor-pointer select-none transition ${
                          isCorrect ? 'bg-emerald-50/20' : answeredIdx === undefined ? 'bg-slate-50' : 'bg-rose-50/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-6 w-6 font-mono text-xs font-bold rounded-lg flex items-center justify-center shrink-0 ${
                            isCorrect 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : answeredIdx === undefined 
                                ? 'bg-slate-200 text-slate-600' 
                                : 'bg-rose-100 text-rose-800'
                          }`}>
                            {q.id}
                          </span>
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">{q.category}</span>
                            <MathText text={q.statement} className="text-sm font-semibold text-slate-700 line-clamp-1 pr-6 leading-tight mt-0.5" isParagraph={false} />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {isCorrect ? (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-md">Correcta</span>
                          ) : answeredIdx === undefined ? (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Vacía</span>
                          ) : (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-md">Incorrecta</span>
                          )}
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                        </div>
                      </div>

                      {/* Expanded Question Info */}
                      {isExpanded && (
                        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
                          <MathText text={q.statement} className="text-sm font-bold text-slate-800 leading-relaxed whitespace-pre-wrap" />
                          
                          {/* Rich schematic diagrams */}
                          <Visualizer
                            questionId={q.originalId || q.id}
                            category={q.category}
                            subjectId={subjectId}
                            isReview={true}
                          />

                          {/* Options grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                            {q.options.map((opt, oIdx) => {
                              const isOptionCorrect = oIdx === q.correctIndex;
                              const isOptionSelected = oIdx === answeredIdx;

                              return (
                                <div
                                  key={oIdx}
                                  className={`p-3.5 rounded-xl border text-xs leading-normal flex items-start gap-2.5 transition ${
                                    isOptionCorrect
                                      ? 'bg-emerald-150/40 border-emerald-300 text-emerald-950 font-bold'
                                      : isOptionSelected
                                        ? 'bg-rose-150/40 border-rose-350 text-rose-950 font-bold'
                                        : 'bg-white border-slate-200 text-slate-600'
                                  }`}
                                >
                                  <span className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border uppercase ${
                                    isOptionCorrect
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : isOptionSelected
                                        ? 'bg-rose-600 border-rose-600 text-white'
                                        : 'bg-slate-100 border-slate-300 text-slate-500'
                                  }`}>
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                  <MathText text={opt} className="pt-0.5 text-xs text-slate-750" isParagraph={false} />
                                </div>
                              );
                            })}
                          </div>

                          {/* Answers detail explanations */}
                          <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-4 mt-3 text-xs text-slate-600 leading-relaxed">
                            <h5 className="font-bold text-blue-800 uppercase text-[10px] tracking-wide mb-1 flex items-center gap-1.5"><BrainCircuit className="h-4 w-4" /> Justificación Educativa:</h5>
                            <MathText text={q.explanation} className="text-slate-650" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REINFORCEMENT STUDY CARD PLATFORM */}
        <div className="space-y-8">
          
          {/* CURATED LOCAL TEXTBOOK FLASHCARDS BOARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h2 className="text-md font-extrabold text-slate-800 flex items-center gap-2 pb-3.5 border-b border-slate-100 mb-5">
              <BookOpen className="h-5 w-5 text-blue-600" /> Plan de Reforzamiento
            </h2>
            <p className="text-xs text-slate-500 leading-normal mb-4">
              Basado en los resultados de su cuadernillo de {subjectName}, se le sugiere estudiar con prioridad las siguientes materias:
            </p>

            <div className="space-y-4">
              {getStudyGuides().map((guide, idx) => {
                const wasFailed = failedCategories.includes(guide.category);
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition duration-200 ${
                      wasFailed 
                        ? 'border-rose-250 bg-rose-50/10 shadow-3xs' 
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                      <span className="text-[9px] font-bold font-mono text-blue-600 uppercase bg-blue-100/60 px-2 py-0.5 rounded">
                        {guide.category}
                      </span>
                      {wasFailed && (
                        <span className="text-[8.5px] font-black text-rose-600 uppercase bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">Requerido</span>
                      )}
                    </div>
                    <h3 className="text-xs font-black text-slate-700 leading-snug">{guide.title}</h3>
                    <MathText text={guide.definition} className="text-[11px] text-slate-500 leading-normal mt-1" />
                    
                    <div className="mt-3.5 pt-3 border-t border-slate-200/50 space-y-2">
                      <div className="text-[10px] text-slate-600 leading-relaxed">
                        <strong className="text-slate-800 uppercase text-[8px] tracking-wide block">Tip Práctico:</strong>
                        <MathText text={guide.bestPractice} className="text-slate-550 inline" isParagraph={false} />
                      </div>
                      <div className="text-[10px] font-mono text-blue-800 bg-blue-50/40 p-2 rounded-lg border border-blue-100/40">
                        <strong className="text-[8.5px] text-blue-900 not-italic uppercase block tracking-wider">Caso Práctico:</strong>
                        <MathText text={guide.exampleProblem} className="inline text-[10px]" isParagraph={false} />
                      </div>
                    </div>

                    {/* Gemini AI Trigger for this specific card */}
                    <button
                      onClick={() => handleQueryAi(guide.title)}
                      className="mt-4 w-full bg-blue-600/10 hover:bg-blue-600 text-blue-650 hover:text-white font-bold text-[10.5px] py-1.5 px-3 rounded-lg border border-blue-500/20 hover:border-transparent transition flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Consultar con Tutor IA
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC INTEGRATED AI TUTOR MODAL PANEL */}
          {selectedTopic && (
            <div id="ai-tutor-box" className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden transition animate-slide-up duration-300">
              {/* background decorative blur circle */}
              <span className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-blue-600/30 blur-xl"></span>
              
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-xs">Tutor de Preparación AI del MINERD</h3>
                  <p className="text-[9.5px] text-slate-400 font-mono tracking-wide mt-0.5">Analizando: {selectedTopic.substring(0, 32)}...</p>
                </div>
              </div>

              {aiLoading ? (
                <div className="text-center py-8 space-y-3.5">
                  <RefreshCw className="h-6 w-6 text-blue-400 mx-auto animate-spin" />
                  <p className="text-[11px] text-slate-400 font-medium">Generando explicaciones con el Modelo de Inteligiencia Artificial de Google...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-[11.5px] leading-relaxed text-slate-300 pr-1 max-h-80 overflow-y-auto font-sans">
                    {renderMarkdown(aiMessage)}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTopic(null);
                      setAiMessage('');
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs py-2 rounded-xl transition"
                  >
                    Cerrar Tutor
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RETAKE THE EXAM BUTTON BOARD */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-2xs">
            <h3 className="font-bold text-slate-800 text-sm">¿Listo para mejorar su puntuación?</h3>
            <p className="text-xs text-slate-500 leading-normal mt-1 mb-4">
              Puede reiniciar esta prueba de {subjectName} con el mismo generador dinámico de 100 reactivos para evaluar su mejora.
            </p>
            <button
              onClick={onRestart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition inline-flex items-center justify-center gap-2 active:scale-95"
            >
              <RefreshCw className="h-4 w-4" /> Tomar el simulacro de nuevo
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
