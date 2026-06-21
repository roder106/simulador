/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HelperResource {
  name: string;
  type: 'video' | 'web' | 'playlist';
  url: string;
  description: string;
}

export interface StudyTopic {
  id: string;
  subjectId: string;
  category: string;
  title: string;
  importance: 'Alta' | 'Media' | 'Crítica';
  concept: string;
  formulasOrRules: string[];
  stepByStepExample: string;
  avoidCommonMistakes: string;
  resources: HelperResource[];
}

export const REINFORCEMENT_TOPICS: StudyTopic[] = [
  // ==========================================
  // MATEMÁTICA (8 temas fundamentales)
  // ==========================================
  {
    id: 'mat_algebra_ecuaciones',
    subjectId: 'matematica',
    category: 'Álgebra y Ecuaciones',
    title: 'Ecuaciones Exponenciales y Ecuaciones Lineales',
    importance: 'Crítica',
    concept: 'Para resolver ecuaciones que tienen la incógnita en el exponente (ej. `4^(x - 2) = 32`), la estrategia fundamental consiste en igualar las bases de ambos lados expresándolas como potencias de una base común (usando factores primos). Una vez igualadas las bases `b^x = b^y`, por la propiedad inyectiva, podemos deducir que los exponentes son iguales `x = y`. Esto convierte el problema en una ecuación lineal común de primer grado.',
    formulasOrRules: [
      'Propiedad inyectiva fundamental: Si `b^u = b^v => u = v` (para `b > 0` y `b != 1`)',
      'Propiedad de potencia de potencia: `(b^n)^m = b^(n * m)`',
      'Regla del despeje lineal de primer grado: Si `ax - b = c => ax = c + b => x = (c + b) / a`'
    ],
    stepByStepExample: 'Ecuación original: `9^(x - 1) = 27` ... Paso 1: Convertimos ambas bases a base prime 3: `9 = 3^2` y `27 = 3^3` ... Paso 2: Sustituimos en la ecuación: `(3^2)^(x - 1) = 3^3` ... Paso 3: Aplicamos la propiedad de potencia de potencia multiplicando los exponentes: `3^(2*(x - 1)) = 3^3 => 3^(2x - 2) = 3^3` ... Paso 4: Al estar igualadas las bases, igualamos los exponentes: `2x - 2 = 3` ... Paso 5: Resolvemos el despeje sumando 2 a ambos lados: `2x = 3 + 2 => 2x = 5` y dividiendo por 2: `x = 5/2` (o forma decimal `x = 2.5`).',
    avoidCommonMistakes: '¡Error de signo en la transposición! Al resolver `2x - 4 = 5`, el `-4` pasa sumando, no restando. O sea: `2x = 9` (no `2x = 1`). Tampoco multipliques la base por el exponente (ej. `3^2` es `9`, nunca `6`).',
    resources: [
      {
        name: 'JulioProfe - Ecuaciones Exponenciales Básicas',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=H7Zg0fOk86M',
        description: 'Tutorial detallado paso a paso sobre cómo cambiar de base y despejar la variable en el exponente.'
      },
      {
        name: 'Buscar Tutoriales de Ecuaciones Exponenciales en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=julioprofe+ecuaciones+exponenciales',
        description: 'Búsqueda de seguridad con decenas de lecciones explicativas del canal JulioProfe.'
      }
    ]
  },
  {
    id: 'mat_algebra_matrices',
    subjectId: 'matematica',
    category: 'Álgebra Lineal y Matrices',
    title: 'Operaciones con Matrices y Determinantes',
    importance: 'Alta',
    concept: 'Una matriz es un arreglo bidimensional de números ordenados por filas y columnas. Las operaciones fundamentales incluyen la suma (que se realiza elemento a elemento entre matrices de iguales dimensiones) y el cálculo del determinante, que en el caso de matrices cuadradas `2 * 2` indica si el sistema de ecuaciones asociado posee una solución única.',
    formulasOrRules: [
      'Suma de matrices: `A + B = [a_(ij) + b_(ij)]`',
      'Determinante de una matriz `2 * 2` `A = [[a, b], [c, d]] => det(A) = a*d - b*c`',
      'Multiplicación por escalar: `k * A = [k * a_(ij)]`'
    ],
    stepByStepExample: 'Calcular el determinante de la matriz `A = [[5, 3], [2, 4]]` ... Paso 1: Identificamos los elementos: `a = 5`, `b = 3`, `c = 2`, `d = 4` ... Paso 2: Calculamos el producto de la diagonal principal: `a * d = 5 * 4 = 20` ... Paso 3: Calculamos el producto de la diagonal secundaria: `b * c = 3 * 2 = 6` ... Paso 4: Restamos ambos productos: `det(A) = 20 - 6 = 14`.',
    avoidCommonMistakes: 'Olvidarse del signo menos de la fórmula del determinante, especialmente cuando los elementos secundarios son negativos. Si multiplicas `b * c` y da `-6`, la resta se convierte en suma: `20 - (-6) = 20 + 6 = 26`.',
    resources: [
      {
        name: 'Profe Alex - Determinante de una matriz 2x2',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=83SgUv7SIdA',
        description: 'Video práctico y directo sobre cómo hallar el determinante de forma rápida.'
      },
      {
        name: 'Buscar Operaciones con Matrices en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=profe+alex+determinante+de+una+matriz',
        description: 'Lecciones alternativas sobre suma, resta, multiplicación y determinantes matriciales.'
      }
    ]
  },
  {
    id: 'mat_geometria_punto_medio',
    subjectId: 'matematica',
    category: 'Cuestiones de Medidas y Geometría',
    title: 'Punto Medio y Distancia en Geometría Analítica',
    importance: 'Crítica',
    concept: 'La geometría analítica conecta la álgebra con la geometría mediante un plano cartesiano. El punto medio es la coordenada exacta correspondiente al centro geométrico que divide un segmento rectilíneo en dos partes iguales. La distancia entre dos puntos mide la longitud del segmento que los une, basada en el Teorema de Pitágoras.',
    formulasOrRules: [
      'Fórmula del Punto Medio: `M(x_m, y_m) = ((x_1 + x_2)/2, (y_1 + y_2)/2)`',
      'Distancia entre dos puntos: `d = sqrt((x_2 - x_1)^2 + (y_2 - y_1)^2)`',
      'Teorema de Pitágoras: `c^2 = a^2 + b^2`'
    ],
    stepByStepExample: 'Hallar el punto de válvula medio entre `A(2, 3)` y `B(8, 11)` ... Paso 1: Extraemos coordenadas: `x_1=2, y_1=3` y `x_2=8, y_2=11` ... Paso 2: Promediamos las x: `x_m = (2 + 8)/2 = 10 / 2 = 5` ... Paso 3: Promediamos las y: `y_m = (3 + 11)/2 = 14 / 2 = 7` ... Paso 4: Unimos los resultados para formar el punto: `M(5, 7)`.',
    avoidCommonMistakes: '¡Confundir suma con resta! En el Punto Medio se SUMAN las coordenadas `(x_1 + x_2)/2`, mientras que para calcular la distancia o la pendiente se RESTAN `(x_2 - x_1)`.',
    resources: [
      {
        name: 'Profe Alex - Punto Medio de un Segmento',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=5VcoVgu2S68',
        description: 'Explicación gráfica excelente de geometría analítica enfocada sobre plano cartesiano.'
      },
      {
        name: 'Buscar Punto Medio y Distancia en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=profe+alex+punto+medio+segmento',
        description: 'Ejercicios sugeridos de distancias, gráficos cartesianos de parcelas y puntos medios.'
      }
    ]
  },
  {
    id: 'mat_trigonometria',
    subjectId: 'matematica',
    category: 'Trigonometría',
    title: 'Conversión Angular (Radianes) y Razones Trigonométricas',
    importance: 'Alta',
    concept: 'Un ángulo mide de forma matemática una rotación. Se expresa en Grados (de `0°` a `360°`) o en Radianes (de `0` a `2*pi`). Dado que un círculo completo equivale a `360°` o `2*pi` radianes, la mitad de una rotación se representa como `180° = pi` radianes. Las razones trigonométricas relacionan los lados de un triángulo rectángulo en relación a sus ángulos agudos.',
    formulasOrRules: [
      'Conversión de grados a radianes: `Radianes = Grados * (pi / 180°)`',
      'Conversión de radianes a grados: `Grados = Radianes * (180° / pi)`',
      'Seno del ángulo: `sen(theta) = Opuesto / Hipotenusa` y Coseno: `cos(theta) = Adyacente / Hipotenusa`'
    ],
    stepByStepExample: 'Convertir `150°` a radianes: ... Paso 1: Planteamos la multiplicación: `150 * (pi / 180)` ... Paso 2: Expresamos la relación como una sola fracción: `(150*pi)/180` ... Paso 3: Simplificamos dividiendo por el Máximo Común Divisor (que es 30): `150 / 30 = 5` y `180 / 30 = 6` ... Paso 4: Redactamos la forma final: `5/6 * pi` (o `(5*pi)/6` radianes).',
    avoidCommonMistakes: 'No simplificar completamente la fracción común. Por ejemplo, dejar `150/180 * pi` en vez de su mínima expresión reducible `5/6*pi`. Las pruebas nacionales siempre exigen la opción más simplificada.',
    resources: [
      {
        name: 'Susi Profe - Convertir Grados a Radianes',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=VAsUfE2H3gM',
        description: 'Explicación súper clara y estructurada para dominar conversiones de ángulos y radianes de examen.'
      },
      {
        name: 'Buscar Grados a Radianes en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=susi+profe+grados+a+radianes',
        description: 'Explicaciones alternativas sobre razones trigonométricas, conversiones de pi radianes y geometría.'
      }
    ]
  },
  {
    id: 'mat_calculo_limites',
    subjectId: 'matematica',
    category: 'Cálculo y Funciones',
    title: 'Límites de Funciones Racionales e Indeterminaciones',
    importance: 'Alta',
    concept: 'Un límite calcula el comportamiento de una función a medida que se aproxima a un determinado valor independiente. Si al evaluar de forma directa una función racional obtenemos la indeterminación `0/0`, es necesario factorizar los polinomios (como aplicar diferencias de cuadrados) para simplificar la expresión y determinar la recta o el valor límite.',
    formulasOrRules: [
      'Límite directo: Si `f(x)` es continua en `a => lim_(x -> a) f(x) = f(a)`',
      'Diferencia de cuadrados perfectos: `x^2 - a^2 = (x - a)(x + a)`',
      'Indeterminación común: `0 / 0` (requiere simplificación por factorización)'
    ],
    stepByStepExample: 'Calcular el límite: `lim_(x -> 2) (x - 2) / (x^2 - 4)` ... Paso 1: Evaluación directa inicial: `(2 - 2)/(2^2 - 4) = 0/0` (Indeterminado) ... Paso 2: Factorizamos el denominador usando la diferencia de cuadrados: `x^2 - 4 = (x - 2)(x + 2)` ... Paso 3: Sustituimos y simplificamos en la ecuación cancelando el factor común `(x - 2)`: `(x - 2) / ((x - 2)(x + 2)) = 1 / (x + 2)` ... Paso 4: Volvemos a evaluar el límite con `x = 2`: `1 / (2 + 2) = 1/4` (o decimal `0.25`).',
    avoidCommonMistakes: 'Declarar erradamente que el límite "no existe de ninguna forma" solo por haber obtenido inicialmente `0/0`. Esto indica una discontinuidad evitable, y el límite real casi siempre existe tras factorizar.',
    resources: [
      {
        name: 'Profe Alex - Límites por Factorización',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=hz_q2fS79P0',
        description: 'Lección didáctica de límites explicando cómo resolver discontinuidades factorizando paso a paso.'
      },
      {
        name: 'Buscar Límites por Factorización en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=profe+alex+limites+por+factorizacion',
        description: 'Videos adicionales sobre límites algebraicos, funciones reales, rectas tangentes y continuidades.'
      }
    ]
  },
  {
    id: 'mat_estadistica_pastel',
    subjectId: 'matematica',
    category: 'Estadística y Análisis de Datos',
    title: 'Estadística descriptiva: La Mediana y Gráficos Circulares',
    importance: 'Crítica',
    concept: 'Las medidas de tendencia central organizan los registros analizados. La mediana representa el dato exacto ubicado en la posición central de un conjunto de datos ordenados. Los gráficos circulares o de pastel ilustran proporciones porcentuales que se decodifican multiplicando el porcentaje por el total.',
    formulasOrRules: [
      'Paso obligatorio N.º 1: Ordenar los datos de menor a mayor',
      'Si `N` es impar: La posición de la Mediana es: `(N + 1) / 2`',
      'Si `N` es par: La mediana es el promedio simple de las dos posiciones centrales: `(x_(N/2) + x_((N/2)+1)) / 2`',
      'Decodificación del sector en pastel: `Cantidad = Total * (Porcentaje / 100)`'
    ],
    stepByStepExample: 'Encontrar la mediana de: `[92, 85, 95, 88]` y el valor del pastel del `45%` de `12,000` sacos ... Paso 1: Ordenar ascendentemente los datos: `[85, 88, 92, 95]` ... Paso 2: Como `N=4` (par), tomamos los dos centrales `88` y `92` ... Paso 3: Calculamos la media de ambos: `(88 + 92)/2 = 90`. Mediana = `90` ... Paso 4: Calculamos el sector de pastel: `12,000 * 0.45 = 5,400` sacos.',
    avoidCommonMistakes: '¡Encontrar variables centrales sin ordenar los datos acumulados! Si buscas directamente el centro en `[92, 85, 95, 88]`, calcularás el promedio de `85` y `95` dando `90` por suerte, pero usualmente fallarás drásticamente.',
    resources: [
      {
        name: 'JulioProfe - Mediana de Datos No Agrupados',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=0XzAd8n9fEk',
        description: 'Guía práctica para entender cómo encontrar el valor exacto del medio en listas de datos ordenadas.'
      },
      {
        name: 'Buscar Media Mediana Moda en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=julioprofe+media+mediana+moda',
        description: 'Tutoriales del canal oficial JulioProfe sobre estadísticas de rendimiento, gráficos de barras y sectores.'
      }
    ]
  },
  {
    id: 'mat_probabilidad',
    subjectId: 'matematica',
    category: 'Probabilidad',
    title: 'Probabilidad Clásica y Eventos Compatibles',
    importance: 'Crítica',
    concept: 'La probabilidad mide la certeza de ocurrencia de un evento aleatorio. La regla clásica de Laplace establece que la probabilidad es el cociente de los casos favorables entre los posibles en un experimento con oportunidades idénticas.',
    formulasOrRules: [
      'Regla de Laplace: `P(A) = (Casos Favorables) / (Casos Posibles)`',
      'Probabilidad de la Unión de Eventos: `P(A U B) = P(A) + P(B) - P(A n B)`',
      'Rango probabilístico: `0 <= P(A) <= 1` (expresado entre `0%` y `100%`)'
    ],
    stepByStepExample: 'Calcular la probabilidad de obtener un número par al lanzar un dado regular de 6 caras: ... Paso 1: Casos posibles del dado: `{1, 2, 3, 4, 5, 6}` (Total = `6`) ... Paso 2: Casos favorables pares: `{2, 4, 6}` (Total = `3`) ... Paso 3: Aplicamos fórmula de Laplace: `P(Par) = 3 / 6` ... Paso 4: Simplificamos la fracción: `P(Par) = 1 / 2` (o decimal `0.5`, que equivale al `50%`).',
    avoidCommonMistakes: 'Asignar un número de casos favorables mayor al que realmente corresponde, u olvidarse de restar la intersección `P(A n B)` cuando los dos eventos de estudio pueden ocurrir simultáneamente.',
    resources: [
      {
        name: 'Profe Alex - Introducción a la Probabilidad',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=WeeEE8Id_z4',
        description: 'Video ameno que aclara el uso de la regla clásica de Laplace con ejemplos prácticos cotidianos.'
      },
      {
        name: 'Buscar Probabilidad en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=profe+alex+probabilidad+laplace',
        description: 'Lecciones complementarias explicadas de probabilidad condicionada, diagramas de árbol y conjuntos.'
      }
    ]
  },
  {
    id: 'mat_logica_matematica',
    subjectId: 'matematica',
    category: 'Lógica Matemática',
    title: 'Lógica Proposicional y Tablas de Verdad',
    importance: 'Media',
    concept: 'La lógica matemática evalúa la validez formal del razonamiento humano mediante variables llamadas proposiciones (que pueden ser verdaderas o falsas). Los conectores lógicos analizan combinaciones complejas de estas proposiciones mediante tablas de verdad estrictas.',
    formulasOrRules: [
      'Conjunción (`p ^ q`): Verdadera SOLO si ambas proposiciones lógicas son verdaderas',
      'Disyunción (`p v q`): Falsa SOLO si ambas proposiciones lógicas son falsas y nulas',
      'Implicación Condicional (`p -> q`): Falsa únicamente si el antecedente `p` es Verdadero y el consecuente `q` es Falso'
    ],
    stepByStepExample: 'Evaluar el valor de verdad del condicional `p -> q` cuando `p` es Falso y `q` es Verdadero ... Paso 1: Ubicamos la regla del condicional en nuestra mente: "Falso solo si Verdadero implica Falso" ... Paso 2: Verificamos el estado: El antecedente es Falso, por lo tanto, no se cumple la condición de falla ... Paso 3: Concluimos que el valor de verdad resultante de la implicación completa es Verdadero.',
    avoidCommonMistakes: 'Creer que si el antecedente de un condicional `p -> q` es falso, la oración resultante tiene que ser falsa. Recuerda que si el antecedente es falso, el condicional se asume lógicamente siempre como Verdadero.',
    resources: [
      {
        name: 'Profe Alex - Tablas de verdad desde cero',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=FcsXfN8_QZg',
        description: 'Aprende los conectores lógicos, tablas de verdad de tautología y contradicción.'
      },
      {
        name: 'Buscar Lógica Matemática en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=profe+alex+tablas+de+verdad',
        description: 'Ejercicios de tablas de lógica computacional, proposiciones lógicas e inferencias escolares.'
      }
    ]
  },

  // ==========================================
  // LENGUA ESPAÑOLA (7 temas fundamentales)
  // ==========================================
  {
    id: 'esp_comprension_inferencial',
    subjectId: 'espanol',
    category: 'Comprensión Lectora - Inferencial',
    title: 'Comprensión de Lectura e Interpretación Inferencial',
    importance: 'Crítica',
    concept: 'La lectura inferencial requiere deducir y descifrar la intención, los símbolos o sentimientos ocultos de un autor que no se expresan explícitamente en el texto. En las Pruebas Nacionales se evalúa la comprensión profunda de fábulas o fragmentos costumbristas dominicanos, deduciendo el contexto sociohistórico o la moraleja subyacente.',
    formulasOrRules: [
      'Pistas en el texto: Asociar adjetivos y ambientes descritos con emociones reales implícitas.',
      'Ignorar lo literal falaz: Las distractores suelen citar oraciones del texto pero fuera de contexto.',
      'Contexto de época: En autores históricos dominicanos (como Juan Bosch), el lodo, la caña, el calor o el dolor reflejan de modo alegórico la desprotección del campesinado.'
    ],
    stepByStepExample: 'Lees el cuento "Luis Pie" de Juan Bosch, donde se describe el dolor físico, el frío bajo la lluvia del obrero, y el odio injusto de la turba. Pregunta: ¿Qué representa la golpiza a Luis Pie? ... Paso 1: Analizar la situación literal (un obrero herido golpeado accidentalmente) ... Paso 2: Deducir la crítica inferencial del autor: Bosch denuncia mediante esta alegoría histórica la xenofobia irracional, el prejuicio destructivo y la exclusión de los sectores más vulnerables de la economía azucarera.',
    avoidCommonMistakes: 'Confundir una idea complementaria menor que sí está escrita explícitamente con la respuesta de comprensión inferencial principal de todo el ensayo o poema.',
    resources: [
      {
        name: 'Lectura Crítica - Técnicas y Métodos fáciles',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=zE6N9_5C4t8',
        description: 'Técnicas muy prácticas y rápidas para extraer ideas principales en textos literarios.'
      },
      {
        name: 'Buscar Comprensión Lectora Pruebas Nacionales en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=lectura+critica+pruebas+nacionales+dominicanas',
        description: 'Videos adicionales sobre cómo interpretar textos literarios dominicanos y responder el examen.'
      }
    ]
  },
  {
    id: 'esp_cohesion_conectores',
    subjectId: 'espanol',
    category: 'Coherencia y Cohesión',
    title: 'Conectores Lógicos y Cohesión Gramatical',
    importance: 'Alta',
    concept: 'Los conectores lógicos de oraciones regulan la cohesión textual unificando enunciados o párrafos independientes de forma coherente. Permiten dictaminar si una oración expresa adición, causa, consecuencia, concesión o un rotundo contraste de lógica discursiva.',
    formulasOrRules: [
      'Adversativos (Indican oposición absoluta): "sin embargo", "no obstante", "pero", "empero"',
      'Consecutivos (Consecuencia lógica directa): "por lo tanto", "por consiguiente", "así que", "por ende"',
      'Causales (Explican el origen o justificación de un hecho): "porque", "puesto que", "ya que"'
    ],
    stepByStepExample: 'Completar el espacio en la oración: "Los ríos del país presentan una escasez de agua alarmante; __________ los ciudadanos siguen desperdiciando el recurso en sus casas". ... Paso 1: Analiza la primera idea (ríos secos) y la segunda (gente desperdicia agua) ... Paso 2: Identifica la relación entre ambas (es de contraste u oposición flagrante) ... Paso 3: Probamos el conector de contraste ideal: "sin embargo" o "no obstante". La oración adquiere cohesión literaria perfecta.',
    avoidCommonMistakes: 'Invertir la lógica causal y la consecutiva. Recordar: "porque" introduce la causa ("Estudió porque quería aprobar"), mientras "por lo tanto" introduce el resultado directo ("Estudió, por lo tanto aprobó").',
    resources: [
      {
        name: 'Los Conectores Lógicos - Concepto y Tipos con Ejemplos',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=p4vW7gUe_00',
        description: 'Aprende los tipos de conectores con ejemplos sencillos para redactar con excelente claridad.'
      },
      {
        name: 'Buscar Conectores Lógicos en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=conectores+logicos+cohesion+sintaxis',
        description: 'Lecciones educativas interactivas de cohesión gramatical y coherencia de redacción.'
      }
    ]
  },
  {
    id: 'esp_sintaxis_compuesta',
    subjectId: 'espanol',
    category: 'Sintaxis y Oración',
    title: 'Sintaxis: Oraciones Simples y Compuestas',
    importance: 'Alta',
    concept: 'La sintaxis estudia cómo se agrupan y ordenan las palabras para comunicar ideas claras. Las oraciones compuestas se distinguen por tener más de un verbo conjugado, y se clasifican según su nexo en: Coordinadas (unidas por nexos que mantienen la independencia sintáctica), Subordinadas (una depende semánticamente de la otra) o Yuxtapuestas (unidas por signos de puntuación).',
    formulasOrRules: [
      'Oración Simple: Posee un único núcleo del predicado (un solo verbo conjugado)',
      'Oración Compuesta Coordinada Copulativa: Expresa suma mediante nexos como "y", "e", "ni"',
      'Oración Compuesta Coordinada Disyuntiva: Expresa alternativa con "o", "u"'
    ],
    stepByStepExample: 'Clasificar la frase: "María redactó el artículo de opinión ayer, pero su editor no lo aprobó hoy." ... Paso 1: Localizamos los verbos conjugados: "redactó" y "aprobó". Al haber dos verbos, es una oración compuesta ... Paso 2: Identificamos el nexo de unión: "pero" ... Paso 3: Reconocemos que "pero" es un nexo adversativo coordinado ... Paso 4: Concluimos: Es una Oración Compuesta Coordinada Adversativa.',
    avoidCommonMistakes: 'Clasificar como oración compuesta aquella que contiene un solo verbo conjugado acompañado por un infinitivo o gerundio de apoyo (ej: "Juan va a cantar en el coro"), que funciona como perífrasis verbal única.',
    resources: [
      {
        name: 'La Oración Compuesta - Tipos y Análisis Práctico',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=bO4pXasYQ58',
        description: 'Aprende de forma intuitiva a identificar oraciones coordinadas, subordinadas y yuxtapuestas.'
      },
      {
        name: 'Buscar Oraciones Compuestas en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=analisis+oracion+compuesta+sintaxis',
        description: 'Videos adicionales sobre análisis sintáctico de oraciones coordinadas y proposiciones simples.'
      }
    ]
  },
  {
    id: 'esp_reglas_acentuacion',
    subjectId: 'espanol',
    category: 'Reglas de Acentuación',
    title: 'Reglas de Acentuación, Diptongos e Hiatos',
    importance: 'Crítica',
    concept: 'La ortografía asegura la correcta lectura silábica. Todas las palabras tienen una sílaba tónica (acentuación), pero solo algunas llevan tilde gráfica (acento escrito) de acuerdo a las normas de terminación consonántica tradicionales.',
    formulasOrRules: [
      'Agudas: Acentuadas en la última sílaba. Llevan tilde si terminan en vocal, "N" o "S" (ej. "canción").',
      'Graves/Llanas: Acentuadas en la penúltima sílaba. Llevan tilde si NO terminan en vocal, "N" o "S" (ej. "árbol").',
      'Esdrújulas: Acentuadas en la antepenúltima sílaba. Se tildan absolutamente SIEMPRE sin excepción (ej. "química").',
      'Hiato acentual: Rompe diptongos tildando de manera directa la vocal débil tónica (ej. "dí-a", "ba-úl").'
    ],
    stepByStepExample: 'Justificar la tilde de las palabras "Rincón" y "Rápido" ... Paso 1: Dividimos en sílabas "Rincón": "Rin-cón". La mayor fuerza de voz está en la última sílaba (aguda) ... Paso 2: Como termina en la consonante "n", aplica la regla y requiere tilde: "Rincón" ... Paso 3: Dividimos en sílabas "Rápido": "Rá-pi-do". Se acentúa en la antepenúltima sílaba (esdrújula) ... Paso 4: Por regla, todas las esdrújulas se tildan, sin importar su letra final: "Rápido".',
    avoidCommonMistakes: '¡Olvidarse de tildar las palabras esdrújulas! Un distractor típico en el examen es omitir la tilde en términos científicos (como "líquido", "área") e inducir a error al estudiante por simple distracción visual.',
    resources: [
      {
        name: 'Palabras Agudas, Llanas y Esdrújulas con Tilde',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=hG9Vsz_Zozs',
        description: 'Repaso dinámico e ilustrativo de las normativas ortográficas de la Real Academia Española.'
      },
      {
        name: 'Buscar Reglas de Acentuación en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=ortografia+acentuacion+diptongo+hiato',
        description: 'Ejemplos de hiatos, diptongos, monosílabos diacríticos y acentuaciones complejas.'
      }
    ]
  },
  {
    id: 'esp_metrica_poesia',
    subjectId: 'espanol',
    category: 'Métrica y Poesía',
    title: 'Métrica de Poemas Dominicanos y Figuras Literarias',
    importance: 'Media',
    concept: 'El análisis literario valora la belleza artística y sonoridad del verso lírico. La métrica es la medición matemática del número de sílabas poéticas de un verso. Para medir de forma precisa, se emplean reglas como la sinalefa y licencias poéticas tradicionales.',
    formulasOrRules: [
      'Sinalefa (Regla fundamental): Unión fonética obligatoria de la vocal final de una palabra con la inicial de la siguiente en una sola sílaba poética (ej: "que_al" se cuenta como 1 sílaba).',
      'Ley del acento final: Si la última palabra del verso es aguda, se SUMA 1 sílaba. Si es esdrújula, se RESTA 1 sílaba.'
    ],
    stepByStepExample: 'Medir el verso: "Un son de amor en la tarde" ... Paso 1: Conteo gramatical básico inicial: Un (1) son (2) de (3) a (4) mor (5) en (6) la (7) tar (8) de (9) ... Paso 2: Buscamos sinalefas: "de_amor" se une (ahorra una sílaba). El conteo poético baja a 8 ... Paso 3: Evaluamos la palabra final: "tarde" es llana, por lo que el conteo se mantiene igual ... Paso 4: Resultado lírico real: Es un verso octosílabo (8 sílabas poéticas).',
    avoidCommonMistakes: 'No juntar de forma vocal las palabras con la letra "h" en sinalefas (ej. "que_honra" sí forma sinalefa porque la "h" es muda). También hay que recordar sumar una sílaba extra siempre que la palabra de cierre sea aguda (ej: "amor", "corazón").',
    resources: [
      {
        name: 'Cómo contar las sílabas métricas de un poema',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=M5xO9z5rBVs',
        description: 'Explicación ilustrativa de sinalefas, licencias poéticas y cómputo métrico lírico.'
      },
      {
        name: 'Buscar Métrica Poética en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=analisis+metrico+sinalefa+figuras+literarias',
        description: 'Estudios de sonetos coloniales, rimas asonantes, metáforas y figuras literarias escolares.'
      }
    ]
  },
  {
    id: 'esp_tipologia_textual',
    subjectId: 'espanol',
    category: 'Tipos de Textos',
    title: 'Tipología Textual: Expositivos, Críticos y Argumentativos',
    importance: 'Alta',
    concept: 'Cada texto persigue un propósito de comunicación con el lector. Conocer la estructura formal de un texto argumentativo (caracterizado por tesis, argumentos científicos de contraste y conclusión) o de un texto instructivo (caracterizado por imperativos directos y secuencias ordenadas) es crucial para las pruebas nacionales.',
    formulasOrRules: [
      'Texto Argumentativo: Propósito fundamental de convencer al lector planteando una tesis subjetiva con bases científicas sólidas.',
      'Texto Expositivo/Informativo: Propósito de mostrar o explicar datos objetivos sin emitir juicios de valor o emitir opiniones dialécticas.',
      'Texto Instructivo: Estructura imperativa basada en verbos infinitivos de acción secuencial o pasos ordenados.'
    ],
    stepByStepExample: 'Determinar la tipología de un fragmento que dice: "Debe prohibirse de inmediato el uso irracional de bolsas plásticas. Hay estudios de la ONU que confirman que destruyen la fauna de la costa o del litoral, por ende, es nuestro deber cívico legislar." ... Paso 1: Analizar la intención del autor (está emitiendo una postura defensiva fuerte) ... Paso 2: Identificar elementos clave (usa razones sólidas como "estudios de la ONU" y la palabra clave "debe") ... Paso 3: Concluir tipología: Es de carácter argumentativo.',
    avoidCommonMistakes: 'Confundir un texto de opinión en un diario (argumentativo) con una columna de noticias del día (expositivo). La noticia carece por completo de la valoración personal o de peticiones morales directas del periodista.',
    resources: [
      {
        name: 'Los Tipos de Textos - Clasificación y Estructuras',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=A_vS775iSks',
        description: 'Breve explicación que repasa la tipología textual útil para resumir o argumentar escritos.'
      },
      {
        name: 'Buscar Tipología Textual en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=tipos+de+textos+argumentativo+expositivo',
        description: 'Tutoriales adicionales sobre editoriales de opinión, ensayos escolares y textos instructivos.'
      }
    ]
  },
  {
    id: 'esp_sociolinguistica',
    subjectId: 'espanol',
    category: 'Sociolingüística de los Dialectos',
    title: 'Sociolingüística y el Español Dominicano',
    importance: 'Alta',
    concept: 'La lengua es un fenómeno social dinámico. El español dominicano cuenta con variantes dialectales regionales (como la sustitución de la "r" por "l" en el Sur, "i" en el Norte/Cibao y geminación en el Este/Capital) denominados fenómenos socio-lingüísticos naturales de nuestra rica identidad insular.',
    formulasOrRules: [
      'Vocalización del Cibao: Sustitución de las consonantes líquidas "L" y "R" por la vocal de apoyo "I" (ej: "comer" se dice "comei").',
      'Rotacismo del Sur: Sustitución de la consonante "L" por la consonante fuerte "R" (ej: "el niño" se dice "er niño").',
      'Lambdacismo de la Capital: Sustitución de la consonante "R" por la consonante líquida "L" (ej: "porque" se dice "polque").'
    ],
    stepByStepExample: 'Identificar la procedencia geográfica dominicana del hablante según el fragmento: "Vamo_a comprai un chin de pan ai colmado." ... Paso 1: Analiza la alteración fonética: "comprai" por comprar y "ai" por al ... Paso 2: Identifica la regla vocalizadora: Se sustituye la "L" u "R" por la vocal "I" ... Paso 3: Reconoce la región asociada: Región Norte o Cibao ... Paso 4: Redacta la respuesta sociolingüística: Pertenece a la variante cibaeña.',
    avoidCommonMistakes: 'Etiquetar erradamente estos fenómenos socio-culturales regionales como "errores tontos de analfabetismo". Son considerados variantes ricas de la dialectología lingüística en todo el Caribe hispano.',
    resources: [
      {
        name: 'El Español Dominicano - Características y Riqueza Dialectal',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=FjI5H67u0E8',
        description: 'Video académico sobre el origen y las divisiones fonéticas de nuestro hablar autóctono nacional.'
      },
      {
        name: 'Buscar Dialectos Dominicanos en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=espanol+dominicano+sociolinguistica',
        description: 'Breves documentales lingüísticos sobre la herencia taino-africana en el habla dominicana.'
      }
    ]
  },

  // ==========================================
  // CIENCIAS SOCIALES (8 temas fundamentales)
  // ==========================================
  {
    id: 'soc_independencia_dominicana',
    subjectId: 'sociales',
    category: 'Independencia Dominicana',
    title: 'Independencia Nacional (1844) y Campaña Militar del Sur',
    importance: 'Crítica',
    concept: 'La Independencia Dominicana del 27 de febrero de 1844 puso fin a una ocupación haitiana militarizada de 22 años. La proclamación cívica de la Puerta de la Misericordia fue respaldada por batallas heroicas en las llanuras del Sur dominicano (como las hazañas militares en Azua y Santiago) para consolidar militarmente la soberanía inicial de la naciente República.',
    formulasOrRules: [
      '16 de julio de 1838: Fundación de la sociedad secreta "La Trinitaria" liderada de forma intelectual por Juan Pablo Duarte.',
      'Trabajadores mártires en el campo: Batalla del 19 de Marzo (Azua) y Batalla del 30 de Marzo (Santiago) de 1844.',
      'Líderes destacados: Sánchez, Mella, Pedro Santana, General Antonio Duvergé.'
    ],
    stepByStepExample: '¿Cuál batalla se libró en el Sur el 19 de marzo de 1844 y cuál general la comandó? ... Paso 1: Recordar el origen de la gesta armada inicial (tras proclamar la independencia en febrero) ... Paso 2: Ubicar geográficamente el evento en Azua en marzo: Batalla del 19 de Marzo ... Paso 3: Identificar al jefe militar de la batalla: El militar terrateniente Pedro Santana ... Paso 4: Conclusión: La Batalla del 19 de Marzo en Azua, liderada por Santana, detuvo los convoyes de tropas del ejército invasor.',
    avoidCommonMistakes: 'Confundir las acciones del plan conspirativo pacífico de Duarte en el exilio con las batallas de defensa armada de Santana en la frontera dominico-haitiana.',
    resources: [
      {
        name: 'Historia Dominicana - Proclamación del 27 de Febrero',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Z5l6O8T_TqI',
        description: 'Narración resumida del descontento contra Boyer de los patriotas trinitarios en Quisqueya.'
      },
      {
        name: 'Buscar Independencia Dominicana de 1844 en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=independencia+dominicana+1844+guerra',
        description: 'Héroes del Sur de la Independencia, batallas navales del 1844 y monumentos patrios.'
      }
    ]
  },
  {
    id: 'soc_guerra_restauradora',
    subjectId: 'sociales',
    category: 'Guerra Restauradora',
    title: 'La Guerra de la Restauración Dominicana (1863)',
    importance: 'Crítica',
    concept: 'En 1861, el dictador militar Pedro Santana anexó inconstitucionalmente el país a la Corona de España. La heroica Guerra de la Restauración (iniciada el 16 de agosto de 1863 con el Grito de Capotillo) no se luchó contra Haití, sino de forma heroica contra las fuerzas imperiales españolas para reinstaurar nuestra soberanía republicana.',
    formulasOrRules: [
      'Anexión a España (1861): Pérdida de soberanía motivada por los temores de Santana.',
      'Grito de Capotillo (16 de agosto de 1863): Inicio formal de la insurrección de guerrillas restauradoras en la frontera noroeste.',
      'Héroe de Espada Fundamental: General Gregorio Luperón (apodado de forma patriótica la Primera Espada).'
    ],
    stepByStepExample: 'Pregunta recurrente de MINERD: ¿Cuál conflicto restauró la soberanía eliminando el control de un imperio europeo decimonónico? ... Paso 1: Analizar los imperios implicados: España en el siglo XIX ... Paso 2: Identificar las fechas asociadas: 1861 (Anexión) a 1863 (Revolución) ... Paso 3: Nombrar la gesta patriótica: Guerra de la Restauración ... Paso 4: Nombrar al prócer militar clave: Gregorio Luperón.',
    avoidCommonMistakes: '¡Responder "Guerra de Independencia contra Haití" en lugar de "Guerra de la Restauración contra España"! Ésta es una trampa de concepto clásico en el examen de Sociales.',
    resources: [
      {
        name: 'Gobernantes de la Restauración Dominicana de Luperón',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=pM9mZ6N_Yis',
        description: 'Un reportaje profundo del MINERD explicando el papel de las guerrillas cibaeñas rurales en las montañas.'
      },
      {
        name: 'Buscar Guerra de la Restauración en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=guerra+de+la+restauracion+dominicana+documental',
        description: 'Documentales con mapas históricos y animaciones de la gesta de restauración iniciada en Capotillo.'
      }
    ]
  },
  {
    id: 'soc_era_trujillo',
    subjectId: 'sociales',
    category: 'Historia Dominicana',
    title: 'La Era de Trujillo (1930-1961) y la Dictadura Totalitaria',
    importance: 'Crítica',
    concept: 'La "Era de Trujillo" constituyó un régimen de opresión militar totalitario durante 31 años en República Dominicana. Se distinguió por el monopolio industrial económico personal del dictador, y un culto obsesivo a su personalidad, hasta culminar de forma justa por el tiranicidio militar patriótico del 30 de mayo de 1961.',
    formulasOrRules: [
      '1930: Toma militar de poder tras el golpe de estado indirecto a Horacio Vásquez.',
      'Sucesos trágicos: Masacre del Perejil (1937) contra campesinos fronterizos, y el brutal martirio de las Hermanas Mirabal en Ojo de Agua (25 de noviembre de 1960).',
      '30 de mayo de 1961: Ajusticiamiento o tiranicidio del tirano en la autopista de Santo Domingo.'
    ],
    stepByStepExample: '¿Qué suceso acaecido a fines de 1960 conmocionó de forma definitiva la opinión internacional y aceleró el fin de Trujillo? ... Paso 1: Revisamos sucesos del final de la tiranía ... Paso 2: Identificamos el vil asesinato de Patria, Minerva y María Teresa Mirabal el 25 de noviembre de 1960 ... Paso 3: Concluimos: El martirio de las Hermanas Mirabal debilitó drásticamente el apoyo social a la dictadura militar, acelerando su derrumbe.',
    avoidCommonMistakes: 'Afirmar que Trujillo fue derrocado por una intervención de la ONU o elecciones civiles. Fue derribado por un complot de patriotas armados en una travesía automovilística nocturna.',
    resources: [
      {
        name: 'La Dictadura de Rafael Leónidas Trujillo - Línea de Tiempo',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=S0y_6D29Jg0',
        description: 'El clásico y ameno resumen documental e histórico digital sobre el auge, monopolio y fin de Trujillo.'
      },
      {
        name: 'Buscar Era de Trujillo en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=la+era+de+trujillo+historia+dominicana',
        description: 'Explicación del asesinato de las Hermanas Mirabal, de las deudas externas saldadas y la caída en 1961.'
      }
    ]
  },
  {
    id: 'soc_geografia_relieve',
    subjectId: 'sociales',
    category: 'Geografía Dominicana',
    title: 'Geografía Física: Relieve y Cordilleras de la Isla',
    importance: 'Alta',
    concept: 'La República Dominicana posee el relieve más montañosos y elevado de las Antillas Mayores. Su eje geográfico neurálgico es la Cordillera Central (donde se encuentra el Pico Duarte, elevación máxima del Caribe con `3,087` metros), un sistema que rige de manera directa los microclimas y la pluviosidad continental en Quisqueya.',
    formulasOrRules: [
      'Cordillera Central: Alberga el Pico Duarte (`3,087` m) y regula el nacimiento de aguas fluviales del país.',
      'Valle de la Vega Real: Planicie agrícola súper fértil ubicada entre la Cordillera Central y la Cordillera Septentrional.',
      'Sistemas principales de montaña: Cordillera Central, Cordillera Septentrional y Sierra de Neiba.'
    ],
    stepByStepExample: '¿Cuál es el sistema montañoso principal del país y cuál pico constituye el más elevado de las Antillas? ... Paso 1: Identificar las tres cadenas montañosas de Quisqueya ... Paso 2: Localizar la cadena central del relieve insular: Cordillera Central ... Paso 3: Ubicar la cumbre de mayor altura en el Caribe: Pico Duarte con `3,087` metros sobre el nivel del mar.',
    avoidCommonMistakes: 'Confundir las cumbres dominicanas con elevaciones de islas vecinas. También hay que recordar que el lago Enriquillo está ubicado por debajo del nivel del mar caribeño.',
    resources: [
      {
        name: 'Geografía Dominicana - Relieves, Valles y Llanuras',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=zT37yYmN5wY',
        description: 'Un didáctico paseo virtual para visualizar cordilleras dominicanas, hoyas áridas y llanuras.'
      },
      {
        name: 'Buscar Sistemas Montañosos de República Dominicana en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=geografia+dominicana+sistemas+montanosos',
        description: 'Explicaciones didácticas de climatología regional caribeña y relieve físico insular.'
      }
    ]
  },
  {
    id: 'soc_recursos_hidrograficos',
    subjectId: 'sociales',
    category: 'Recursos Hidrográficos',
    title: 'Hidrografía Dominicana: Ríos más Largos y Cuencas Hidrográficas',
    importance: 'Alta',
    concept: 'Los recursos hídricos en la isla de Santo Domingo nacen principalmente en las altas alturas de la Cordillera Central. Los ríos principales se dividen por vertientes fluviales estratégicas que abastecen de agua dulce y energía hidroeléctrica a las ciudades del llano.',
    formulasOrRules: [
      'Río Yaque del Norte: El río más largo de la República Dominicana (`296` km), fluye hacia la bahía de Montecristi.',
      'Río Yuna: El río más caudaloso de la nación, desemboca en la bahía de Samaná irrigando los extensos sembradíos de arroz.',
      'Río Yaque del Sur: Abastece las áridas llanuras agrícolas de la costera región de Barahona.'
    ],
    stepByStepExample: 'Si te preguntan cuál es el río de mayor longitud total en territorio dominicano y hacia dónde fluye... Paso 1: Listas principales: Yaque del Norte, Yuna, Yaque del Sur, Artibonito ... Paso 2: El Yaque del Norte es el de mayor longitud con `296` kilómetros ... Paso 3: Desemboca en la bahía de Montecristi en el noroeste.',
    avoidCommonMistakes: 'Creer que el río Ozama es el más largo. El Ozama es vital por cruzar Santo Domingo, pero es mucho más corto y estrecho que ríos como el Yaque del Norte o el caudaloso Yuna.',
    resources: [
      {
        name: 'Ríos de la República Dominicana y la crisis hídrica',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=kYJ-wL3i_tE',
        description: 'Explicación del nacimiento de aguas en la Cordillera Central y su importancia ambiental.'
      },
      {
        name: 'Buscar Ríos y Provincias de la Isla de Santo Domingo en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=recursos+hidrograficos+republica+dominicana',
        description: 'Videos educativos sobre cuencas de ríos dominicanos e impactos ambientales del cambio climático.'
      }
    ]
  },
  {
    id: 'soc_civica_constitucion',
    subjectId: 'sociales',
    category: 'Cívica y Constitución',
    title: 'Constitución Dominicana y la División de Poderes',
    importance: 'Crítica',
    concept: 'La democracia institucional del país florece bajo el imperio de la Constitución (la Constitución de 2010 marcó una gran reforma moderna). Establece que el Estado Dominicano se rige por un gobierno civil republicano e independiente, dividido de forma equilibrada en tres poderes del estado co-iguales de control contrapesado.',
    formulasOrRules: [
      'Poder Ejecutivo: Presidente de la República, administra y ejecuta políticas públicas.',
      'Poder Legislativo: El Congreso bicameral (Senado y Cámara de Diputados). Encargado de proponer y votar leyes.',
      'Poder Judicial: Dirigido por la Suprema Corte de Justicia, juzga conductas infractoras y arbitra conflictos.'
    ],
    stepByStepExample: 'Si un presidente promulga un decreto que anula de forma arbitraria la libertad de cultos garantizada en la Carta Magna... Paso 1: Buscamos en el marco legal constitucional de Quisqueya ... Paso 2: La Constitución en su artículo 6 decreta la Supremacía Constitucional (prioridad máxima de la Carta Magna) ... Paso 3: Concluimos: Dicho decreto presidencial representa una grave violación inconstitucional y carece de validez jurídica.',
    avoidCommonMistakes: 'Creer que el Presidente de la República posee el poder jurídico absoluto para promulgar leyes de forma independiente. Solo el Congreso Nacional puede votar leyes en las Cámaras de Debates.',
    resources: [
      {
        name: 'La Constitución Dominicana y los Tres Poderes del Estado',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Sshk08H9VlE',
        description: 'Tutorial animado sobre derechos cívicos, deberes patrios y la fiscalización del poder estatal.'
      },
      {
        name: 'Buscar Constitución Dominicana y Derechos Fundamentales en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=constitucion+dominicana+explicada+civica',
        description: 'Monografías animadas sobre el Tribunal Constitucional, democracia y derechos de la ciudadanía.'
      }
    ]
  },
  {
    id: 'soc_periodo_colonial',
    subjectId: 'sociales',
    category: 'Periodo Colonial',
    title: 'Periodo Colonial: Llegada de Colón, Devastaciones de Osorio',
    importance: 'Alta',
    concept: 'El periodo colonial en Santo Domingo comprende desde la llegada europea en 1492 hasta la Independencia en 1844. Eventos emblemáticos en el siglo XVII como las Devastaciones de Osorio (1605-1606) reconfiguraron la demografía y propiciaron la división permanente de la isla en dos colonias distintas y soberanas.',
    formulasOrRules: [
      '1492: Llegada de Cristóbal Colón a la Española y sometimiento paulatino de los aborígenes taínos.',
      'Devastaciones de Osorio (1605-1606): Despoblación forzosa del noroeste ordenada por la Corona española para frenar el contrabando, que facilitó la anexión francesa del actual Haití a finales de siglo.'
    ],
    stepByStepExample: '¿Cuál fue la causa directa de la división territorial e histórica de la isla de Santo Domingo en dos colonias distintas? ... Paso 1: Recordar la orden real del gobernador Antonio de Osorio en 1605 ... Paso 2: Osorio incendió pueblos del norte y oeste (como Montecristi y Puerto Plata) obligando a mudarse a los colonos ... Paso 3: Al quedar desiertas estas tierras, contrabandistas franceses las ocuparon fundando un asentamiento que evolucionó en la rica Saint-Domingue francesa. Consecuencia: Surgimiento de dos naciones y culturas diferentes en una sola isla.',
    avoidCommonMistakes: 'Creer que la división de la isla fue un plan amistoso firmado por los caciques taínos. Fue el desenlace geopolítico directo de las ruinas y éxodos agrícolas occidentales de Osorio.',
    resources: [
      {
        name: 'Las Devastaciones de Osorio de 1605 - Historia Colonial',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=bQat9LcsgGo',
        description: 'Excelente lección académica detallada sobre los orígenes del contrabando ganadero y la catástrofe de Osorio.'
      },
      {
        name: 'Buscar Devastaciones de Osorio en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=las+devastaciones+de+osorio+historia+dominicana',
        description: 'Resúmenes sobre la economía azucarera caribeña, piratas bucaneros, filibusteros y el Tratado de Ryswick.'
      }
    ]
  },
  {
    id: 'soc_demografia_economica',
    subjectId: 'sociales',
    category: 'Demografía Dominicana',
    title: 'Demografía, Sectores Productivos y Migraciones en Quisqueya',
    importance: 'Alta',
    concept: 'La demografía examina de forma numérica el volumen y los movimientos de población de la isla. República Dominicana cuenta con una población urbana densa, con el sector terciario (servicios, turismo y zonas francas industriales) como motor económico central de divisas cambiarias modernas.',
    formulasOrRules: [
      'Tasa de Natalidad: Frecuencia de partos por millar de habitantes.',
      'Sector Primario: Agricultura y minería. Sector secundario: Industrias de Zonas Francas. Sector terciario: Servicios (turismo, banca, comercio).'
    ],
    stepByStepExample: 'Si se consulta cuál es el sector de mayor captación laboral y aporte al Producto Interno Bruto (PIB) nacional dominicano... Paso 1: Evaluamos los sectores económicos ... Paso 2: El cultivo y ganadería (primario) y zonas francas (secundario) aportan empleo, pero los servicios hoteleros y de comercio rigen la economía nacional ... Paso 3: Concluir sector: Sector Terciario (servicios y turismo nacional).',
    avoidCommonMistakes: 'Pensar que la República Dominicana obtiene sus ingresos actuales únicamente de la caña de azúcar, café y cacao como en la década de 1880. Hoy día el sector de servicios y turismo lidera indiscutiblemente los ingresos nacionales.',
    resources: [
      {
        name: 'La Economía Dominicana actual - Características Clave',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=F5D54Fp_B_0',
        description: 'Explicación interactiva que sitúa los motores productivos locales y el flujo de remesas.'
      },
      {
        name: 'Buscar Geografía Económica Dominicana en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=economia+dominicana+sectores+productivos+demografia',
        description: 'Documentales oficiales sobre censos habitacionales de población del país.'
      }
    ]
  },

  // ==========================================
  // CIENCIAS DE LA NATURALEZA (5 temas fundamentales)
  // ==========================================
  {
    id: 'nat_biologia_genetica',
    subjectId: 'naturaleza',
    category: 'Biología y Genética',
    title: 'Genética Molecular: Replicación del ADN y Regla de Chargaff',
    importance: 'Crítica',
    concept: 'El ácido desoxirribonucleico (ADN) resguarda el instructivo genético codificado en su doble hélice espiral. Su ensamble químico respeta la complementariedad antiparalela estricta descubierta por Chargaff: El nucleótido Adenina (`A`) se asocia obligatoriamente con la Timina (`T`), y la Citosina (`C`) se empareja de modo exclusivo con la Guanina (`G`).',
    formulasOrRules: [
      'Regla de Apareamiento complementario: `A - T` y `C - G`',
      'Antiparalelismo direccional: Expresados en sentido contrario. Una cadena `5\' -> 3\'` genera una réplica complementada `3\' -> 5\'`'
    ],
    stepByStepExample: 'Completar la secuencia complementaria de un molde de ADN original: `5\' - A - T - G - C - C - G - 3\'` ... Paso 1: Complementamos las bases una por una: `A -> T`; `T -> A`; `G -> C`; `C -> G`; `C -> G`; `G -> C` ... Paso 2: Invertimos de modo antiparalelo los extremos del ADN: `5\'` se vuelve `3\'` y viceversa ... Paso 3: Redactamos la secuencia complementaria exacta resultante: `3\' - T - A - C - G - G - C - 5\'`.',
    avoidCommonMistakes: '¡Olvidarse de invertir la dirección de los extremos terminales `5\'` y `3\'`! No dejes `5\'` enfrentado con `5\'` en la respuesta de apareamiento del simulador, ya que las cadenas moleculares corren obligatoriamente en sentidos biológicos contrarios.',
    resources: [
      {
        name: 'CuriosaMente - ¿Cómo funciona el ADN?',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=i9YfTPr6m-c',
        description: 'Visualización animada fantástica sobre la hélice de ADN, nucleótidos y el genoma celular humano.'
      },
      {
        name: 'Buscar Replicación del ADN y Genética en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=curiosamente+como+funciona+el+adn',
        description: 'Videos adicionales sobre meiosis celular, transcripción de ARN, y cruces genéticos mendelianos.'
      }
    ]
  },
  {
    id: 'nat_ecologia_diezmo',
    subjectId: 'naturaleza',
    category: 'Ecosistemas y Flujos',
    title: 'Ecología: La Ley del Diezmo Ecológico (10% de Energía)',
    importance: 'Crítica',
    concept: 'En los ecosistemas dominicanos (como los de Jarabacoa), la energía viaja a través del flujo alimenticio de pirámides tróficas. Sin embargo, no toda la energía absorbida es asimilada: se gasta casi en su totalidad en metabolismo y calor residual. Según la Regla del Diezmo Ecológico, solo se transmite eficazmente un `10%` de la energía neta al eslabón superior sucesivo.',
    formulasOrRules: [
      'Productores (Base de Plantas): Retienen el `100%` de la energía captada por fotosíntesis solar.',
      'Consumidores Primarios (Herbívoros): Reciben el `10%` (`0.10`) de la energía basal.',
      'Consumidores Secundarios (Predadores chicos): Reciben el `1%` (`0.01`) de la energía original.',
      'Fórmula iterativa: `Energía Siguiente = Energía Anterior * 0.10`'
    ],
    stepByStepExample: 'Los pinos silvestres captan del sol una energía neta de `10,000` kJ. ¿Cuánta energía llega a un gran halcón (consumidor secundario) que caza ágiles lagartijas y roedores herbívoros alimentados de pinos silvestres? ... Paso 1: Productor inicial (pino) contiene `10,000` kJ ... Paso 2: El herbívoro (Consumidor Primario) asimila el `10%`: `10,000 * 0.10 = 1,000` kJ ... Paso 3: El halcón (Consumidor Secundario) asimila el `10%` del nivel del herbívoro anterior: `1,000 * 0.10 = 100` kJ ... Solución: El halcón secundario aprovecha exactamente `100` kJ de energía neta.',
    avoidCommonMistakes: 'Introducir restas arbitrarias de energía. Recuerda aplicar de forma estricta la multiplicación consecutiva por `0.10` por cada peldaño alimenticio ascendente analizado.',
    resources: [
      {
        name: 'Flujo de Energía en los Ecosistemas y Pirámides Tróficas',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=v09A8Z9r0l0',
        description: 'Aprende de forma intuitiva cómo fluye la energía calórica y por qué hay pérdidas por calor metabólico.'
      },
      {
        name: 'Buscar Diezmo Ecológico en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=diezmo+ecologico+flujo+de+energia',
        description: 'Ejemplos de ecología, redes tróficas y pirámides de biomasa en ecosistemas terrestres.'
      }
    ]
  },
  {
    id: 'nat_quimica_organica',
    subjectId: 'naturaleza',
    category: 'Química Molecular y Orgánica',
    title: 'Química Orgánica: Cadena de Carbonos e Hibridación',
    importance: 'Crítica',
    concept: 'La química orgánica se fundamenta en las moléculas de carbono debido a la propiedad del carbono de formar cuatro enlaces covalentes (tetravalencia) con otros átomos. Dependiendo del tipo de enlace químico, la molécula varía en rigidez tridimensional y geometría molecular elemental de hibridación orbital.',
    formulasOrRules: [
      'Enlace Simple (Alcanos): Hibridación orbital `sp^3` con geometría tetraédrica y ángulo de `109.5°` (ej. Metano).',
      'Enlace Doble (Alquenos): Hibridación orbital `sp^2` con geometría trigonal plana y ángulo de `120°` (ej. Etileno).',
      'Enlace Triple (Alquinos): Hibridación orbital `sp` con geometría lineal plana con ángulo de `180°` (ej. Acetileno).'
    ],
    stepByStepExample: 'Identificar la hibridación y geometría de un átomo de carbono que presenta un enlace triple en la combustión de acetileno: ... Paso 1: Analizar la estructura del acetileno (contiene un triple enlace central) ... Paso 2: Relacionar de forma directa con la regla del carbono con triple ligadura ... Paso 3: Concluir hibridación y forma: Su orbital muestra hibridación `sp` y se posiciona con geometría lineal plana.',
    avoidCommonMistakes: 'Asumir erradamente que los anillos de compuestos de carbono como el benceno forman enlaces simples móviles de hibridación `sp^3`. Los anillo aromáticos tienen enlaces dobles alternados de hibridación coplanar `sp^2`.',
    resources: [
      {
        name: 'Química Orgánica - Introducción a la Hibridación del Carbono',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=kCObVbW8wos',
        description: 'Explicación muy didáctica de orbitales moleculares y geometrías lineales y tetraédricas.'
      },
      {
        name: 'Buscar Hibridación del Carbono en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=quimica+organica+hibridacion+carbono+sp3',
        description: 'Ejemplos de síntesis de nomenclatura de alcanos, alquenos y alquinos para secundaria.'
      }
    ]
  },
  {
    id: 'nat_fisica_termodinamica',
    subjectId: 'naturaleza',
    category: 'Leyes de la Termodinámica',
    title: 'Leyes de Gases y Transferencia de Calor por Convección',
    importance: 'Alta',
    concept: 'La termodinámica analiza cómo viaja y se transforma la energía calórica de la materia escolar. La transferencia de calor ocurre por tres vías: Conducción de sólidos, Radiación electromagnética (ondas microondas) y Convección térmica (movimiento cíclico de fluidos líquidos o de gases debido a variaciones térmicas drásticas de su densidad).',
    formulasOrRules: [
      'Fluido caliente: Se dilata térmicamente => Su densidad baja y asciende con rapidez.',
      'Fluido frío: Se contrae térmicamente => Su densidad sube y desciende con velocidad.',
      'Ciclo cinético: Generan las dinámicas llamadas "Corrientes de Convección Termal".',
      'Leyes de Gases: Ley de Boyle (`P_1 * V_1 = P_2 * V_2`) y Charles (`V_1/T_1 = V_2/T_2`).'
    ],
    stepByStepExample: 'Explicar de forma física la brisa diurna en la provincia turística dominicana de Baní: ... Paso 1: La arena de la playa de Baní se calienta intensamente por el sol diurno ... Paso 2: El aire sobre la arena caliente se calienta por conducción, se dilata rápidamente bajando su densidad, y asciende ... Paso 3: Para ocupar ese vacío de baja presión, el aire denso y más frío que reposa sobre el agua marina corre hacia la playa ... Paso 4: De este modo se crea de forma cíclica la brisa costera dominicana por convección natural de aire.',
    avoidCommonMistakes: 'Intentar justificar la transferencia del calor en bloques de metales sólidos de cocina mediante convección. Los sólidos con átomos inmóviles transfieren calor únicamente por conducción directa contacto térmico.',
    resources: [
      {
        name: 'Las 3 formas de transferencia de calor con ejemplos prácticos',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=S8FmSsc-j04',
        description: 'Explicaciones visuales cortas y didácticas de conducción, convección y radiación calórica.'
      },
      {
        name: 'Buscar Conducción Convección Radiación en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=conduccion+conveccion+radiacion+ejemplos',
        description: 'Videos educativos adicionales de leyes de los gases Charles y Boyle para selectividad.'
      }
    ]
  },
  {
    id: 'nat_fisica_dinamica',
    subjectId: 'naturaleza',
    category: 'Física Clásica y Fuerzas Dinámicas',
    title: 'Física: Leyes de Newton, Circuitos y Tectónica de Placas',
    importance: 'Alta',
    concept: 'La física cuántica o clásica estudia la mecánica, las fuerzas y la energía aplicadas a los cuerpos. Comprender las tres leyes del sabio Isaac Newton o las propiedades eléctricas de los circuitos y la tectónica de placas ayuda a dilucidar los sismos en fallas caribeñas de Quisqueya.',
    formulasOrRules: [
      'Primera Ley de Newton (Inercia): Un cuerpo permanece inmóvil o en MRU a menos que actúe una fuerza externa neta.',
      'Segunda Ley (Fuerza): `F = m * a` (Fuerza es el producto del vector masa por la aceleración resultante).',
      'Tercera Ley (Acción/Reacción): A cada fuerza aplicada se opone otra de igual magnitud pero de sentido opuesto.',
      'Ley de Ohm en circuitos eléctricos: `V = I * R` (Voltaje es igual a Intensidad por Resistencia).'
    ],
    stepByStepExample: 'Calcular la fuerza necesaria para desplazar una roca de los derrumbes de Ocoa que posee una masa de `120` kg y requiere una aceleración horizontal constante de `3` `m/s^2`: ... Paso 1: Identificar datos físicos: `m = 120` kg, `a = 3` `m/s^2` ... Paso 2: Identificar fórmula a aplicar: Segunda Ley de Newton (`F = m * a`) ... Paso 3: Sustituir datos numéricos: `F = 120 * 3` ... Paso 4: Calcular producto: `F = 360` Newtons.',
    avoidCommonMistakes: '¡Ignorar la resistencia interna combinada en circuitos en serie! En pruebas de aptitud física, recuerda que la resistencia equivalente de cargas eléctricas acopladas secuencialmente es siempre la suma escalar directa de sus fuentes ohmicas.',
    resources: [
      {
        name: 'Leyes de Newton Explicadas de forma Súper Intuitiva',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=86ZNmoAdlNg',
        description: 'Grandioso y ameno corto animado sobre cómo entender la inercia, la fuerza estática y el retroceso de acción.'
      },
      {
        name: 'Buscar Las Leyes de Newton en YouTube',
        type: 'playlist',
        url: 'https://www.youtube.com/results?search_query=leyes+de+newton+ejemplos+resueltos',
        description: 'Videos adicionales sobre circuitos de electricidad básica de Ohm y tectónica de placas sísmicas.'
      }
    ]
  }
];
