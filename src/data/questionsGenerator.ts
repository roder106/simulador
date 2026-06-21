/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number; // 1 to 100
  originalId?: number; // static original ID to preserve visualization mapping
  code: string; // e.g. MAT-001
  category: string; // e.g. "Álgebra", "Geometría"
  statement: string;
  context?: string;
  svgType?: 'graph' | 'triangle' | 'table' | 'circuits' | 'dna' | 'map' | 'chart' | 'matrix';
  svgData?: any;
  options: string[];
  correctIndex: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
  standard?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  timeLimitMinutes: number;
}

export const SUBJECTS: Subject[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    icon: 'Calculator',
    description: 'Álgebra, Geometría, Trigonometría, Cálculo, Estadística y Probabilidad.',
    timeLimitMinutes: 110, // 1h 50m
  },
  {
    id: 'espanol',
    name: 'Lengua Española',
    icon: 'BookOpen',
    description: 'Comprensión lectora de textos narrativos, expositivos, argumentativos e instructivos.',
    timeLimitMinutes: 105, // 1h 45m
  },
  {
    id: 'sociales',
    name: 'Ciencias Sociales',
    icon: 'Globe',
    description: 'Historia Dominicana y del Caribe, Geografía, Cívica, Constitución e Historia Universal.',
    timeLimitMinutes: 105, // 1h 45m
  },
  {
    id: 'naturaleza',
    name: 'Ciencias de la Naturaleza',
    icon: 'Atom',
    description: 'Biología, Ecología, Evolución, Química de la Materia y del Carbono, y Física Clásica/Moderna.',
    timeLimitMinutes: 105, // 1h 45m
  }
];

// Helper to generate a deterministic list of 100 questions per subject
export function generateQuestionsForSubject(subjectId: string): Question[] {
  const list: Question[] = [];
  
  if (subjectId === 'matematica') {
    // 180 Questions for Mathematics
    for (let i = 1; i <= 180; i++) {
      const qNum = i;
      let q: Question;
      
      if (qNum === 1) {
        q = {
          id: 1,
          code: 'MAT-001',
          category: 'Álgebra y Ecuaciones',
          statement: 'Un estudiante recibe la tarea de resolver la ecuación exponencial `4^(x - 2) = 32`. Al desarrollar el procedimiento en su libreta, realiza los pasos mostrados en el visualizador gráfico.\n\n¿En cuál de los pasos cometió el error y cuál es la justificación matemática de dicho fallo?',
          options: [
            'En el Paso 1, porque 32 no puede representarse lógicamente en base 2.',
            'En el Paso 2, porque no es correcto igualar los exponentes si las bases ya fueron igualadas.',
            'En el Paso 3, porque al sumar `4` en ambos lados se debió obtener `2x = 9` y no `2x = 7`.',
            'En el Paso 4, porque el despeje correcto requería dividir `7` entre `4` para despejar `x`.'
          ],
          correctIndex: 2,
          explanation: 'En el Paso 3, resolver la ecuación lineal `2x - 4 = 5` requiere sumar `4` a ambos miembros de la relación, resultando en `2x = 5 + 4 = 9`. Por lo tanto, el valor correcto de despeje debe ser `x = 9/2`.',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 2) {
        q = {
          id: 2,
          code: 'MAT-002',
          category: 'Estadística y Análisis de Datos',
          statement: 'El gráfico estadístico circular (gráfico de pastel) mostrado en la pantalla representa la distribución absoluta de la producción agrícola mensual en un municipio de la llanura de San Juan.\n\nSi el volumen total cosechado asciende a exactamente `12,000` sacos de alimentos colectados, ¿qué cantidad exacta corresponde al cultivo de plátanos y qué porcentaje del total representa según el diagrama?',
          options: [
            '3,600 sacos (equivalente al 30% de la producción total)',
            '5,400 sacos (equivalente al 45% de la producción total)',
            '1,800 sacos (equivalente al 15% de la producción total)',
            '1,200 sacos (equivalente al 10% de la producción total)'
          ],
          correctIndex: 1,
          explanation: 'De acuerdo con el gráfico de pastel analizado en el visualizador, el sector de los plátanos representa exactamente un `45%` de la distribución. Realizando el cálculo porcentual correspondiente: `12,000 * 0.45 = 5,400` sacos.',
          standard: 'COMPETENCIA: Comunicación, modelación y representación'
        };
      } else if (qNum === 3) {
        q = {
          id: 3,
          code: 'MAT-003',
          category: 'Cuestiones de Medidas y Geometría',
          statement: 'Observe la gráfica en el visualizador, donde la recta representa la trayectoria planificada para un nuevo acueducto rural en Ocoa. La recta pasa por los puntos `A(2, 3)` y `B(8, 11)` en el sistema de coordenadas.\n\nSi se desea colocar una válvula de seguridad justamente en el punto medio de dicho segmento rectilíneo, ¿cuáles serán las coordenadas exactas `M(x_m, y_m)` de la válvula?',
          options: [
            'M(5, 7)',
            'M(6, 8)',
            'M(5, 8)',
            'M(4, 7)'
          ],
          correctIndex: 0,
          explanation: 'La fórmula para las coordenadas del punto medio de un segmento es `M = ((x_1 + x_2) / 2, (y_1 + y_2) / 2)`. Sustituyendo las coordenadas rectilíneas de los puntos dados: `x_m = (2 + 8) / 2 = 5` y `y_m = (3 + 11) / 2 = 7`. Consecuentemente, las coordenadas son `M(5, 7)`.',
          standard: 'COMPETENCIA: Razonamiento y argumentación'
        };
      } else if (qNum === 4) {
        q = {
          id: 4,
          code: 'MAT-004',
          category: 'Cálculo y Funciones',
          statement: 'Dada la función racional de disolución química `f(x) = (x - 2) / (x^2 - 4)`. Determine analíticamente el comportamiento límite de esta disolución cuando el factor `x` se aproxima críticamente al valor `2` por el extremo derecho, es decir `x -> 2^+`.',
          options: [
            'El límite diverge indefinidamente hacia el infinito positivo.',
            'El límite se estabiliza exactamente en el valor de 0.',
            'El límite converge exactamente hacia la fracción de `1/4` (0.25).',
            'El límite no existe de ninguna forma porque da una división por cero indefinible.'
          ],
          correctIndex: 2,
          explanation: 'La función puede simplificarse factorizando la diferencia de cuadrados en el denominador: `(x - 2) / ((x - 2)(x + 2)) = 1 / (x + 2)`. Al evaluar el límite conforme `x -> 2^+`, obtenemos `1 / (2 + 2) = 1/4` (0.25).',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 5) {
        q = {
          id: 5,
          code: 'MAT-005',
          category: 'Trigonometría',
          statement: 'Considere la aguja de un pluviómetro oscilatorio en Barahona que gira formando un ángulo de abertura de exactamente `150°` sobre el dial curvo. ¿A cuánto equivale esta medida angular expresada en el sistema de radianes?',
          options: [
            '`5/9 * pi` radianes',
            '`5/6 * pi` radianes',
            '`6/5 * pi` radianes',
            '`1/30 * pi` radianes'
          ],
          correctIndex: 1,
          explanation: 'Para convertir una medida angular de grados sexagesimales a radianes se multiplica por el factor de relación de escala `pi / 180°`. Por tanto: `150 * (pi / 180) = 150/180 * pi = 5/6 * pi` radianes.',
          standard: 'COMPETENCIA: Comunicación, modelación y representación'
        };
      } else if (qNum === 6) {
        q = {
          id: 6,
          code: 'MAT-006',
          category: 'Álgebra y Funciones',
          statement: 'El arco de soporte para un túnel ecológico en la Cordillera Central sigue el modelo cuadrático parábolico `2x^2 - 4x + 1 = 0`. Calcule el valor del discriminante `D` de esta función cuadrática e indique qué tipo de soluciones matemáticas tiene.',
          options: [
            '`D = 8`; posee dos soluciones reales e irracionales diferentes.',
            '`D = -8`; no cuenta con soluciones reales, cruzando solo en el plano imaginario.',
            '`D = 16`; posee una solución real y repetida.',
            '`D = 24`; carece por completo de intersecciones horizontales.'
          ],
          correctIndex: 0,
          explanation: 'El discriminante es `D = b^2 - 4ac`. En la ecuación cuadrática propuesta, `a = 2`, `b = -4`, `c = 1`. Evaluando: `D = (-4)^2 - 4(2)(1) = 16 - 8 = 8`. Al ser `D > 0` y no ser un cuadrado perfecto, existen dos raíces reales e irracionales distintas.',
          standard: 'COMPETENCIA: Razonamiento y argumentación'
        };
      } else if (qNum === 7) {
        q = {
          id: 7,
          code: 'MAT-007',
          category: 'Cuestiones de Medidas y Geometría',
          statement: 'Un agrónomo en República Dominicana selecciona una muestra aleatoria de 4 caobas criollas y registra los diámetros de sus troncos en decímetros: `1`, `3`, `3`, `4`. Calcule el valor de la mediana muestral de estos diámetros.',
          options: [
            '`3` decímetros',
            '`2.5` decímetros',
            '`2` decímetros',
            '`3.5` decímetros'
          ],
          correctIndex: 0,
          explanation: 'La mediana de un conjunto de datos ordenados de tamaño par se obtiene mediante el promedio aritmético simple de sus dos observaciones centrales. Al estar ordenados de forma ascendente `1, 3, 3, 4`, los datos centrales son `3` y `3`. Así, la promedio es `(3 + 3) / 2 = 3` decímetros.',
          standard: 'COMPETENCIA: Comunicación, modelación y representación'
        };
      } else if (qNum === 8) {
        q = {
          id: 8,
          code: 'MAT-008',
          category: 'Álgebra Lineal y Matrices',
          statement: 'Dadas las dos matrices de transformación lineal presentadas en el visualizador, donde `M` representa esfuerzos de torsión y `N` representa balances de resistencia física en vigas de hormigón. ¿Cuál es el producto de matrices resultante `M * N`?',
          options: [
            '`[18, 6] / [-10, -2]`',
            '`[18, 26] / [-10, -2]`',
            '`[18, 6] / [-10, 6]`',
            '`[18, 26] / [-10, -10]`'
          ],
          correctIndex: 1,
          explanation: 'Multiplicando las filas de `M` por las correspondientes columnas de `N`: \n- Fila 1 × Columna 1: `2*4 + (-5)*(-2) = 8 + 10 = 18` \n- Fila 1 × Columna 2: `2*8 + (-5)*2 = 16 - 10 = 6` \n- Fila 2 × Columna 1: `(-1)*4 + 3*(-2) = -4 - 6 = -10` \n- Fila 2 × Columna 2: `(-1)*8 + 3*2 = -8 + 6 = -2`. \nLa matriz resultante es `M*N = [18, 6] / [-10, -2]`.',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 9) {
        q = {
          id: 9,
          code: 'MAT-009',
          category: 'Cálculo y Derivadas',
          statement: 'Determine la primera derivada respecto a la variable física `x` para la función de velocidad de fluidos dada por la ecuación polinómica `f(x) = 2x^3 + 5x`.',
          options: [
            '`f\'(x) = 6x^2 + 5`',
            '`f\'(x) = 12x + 5`',
            '`f\'(x) = 6x + 5`',
            '`f\'(x) = 6x^2`'
          ],
          correctIndex: 0,
          explanation: 'Usando de manera rigurosa la ley general de potencias para la diferenciación: la derivada del primer término `2x^3` es `2 * 3 * x^(3-1) = 6x^2` y la derivada del término lineal `5x` es simplemente `5`. La suma de ambos determina la primera derivada: `f\'(x) = 6x^2 + 5`.',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 10) {
        q = {
          id: 10,
          code: 'MAT-010',
          category: 'Probabilidad',
          statement: 'Al lanzar un dado convencional equilibrado de seis caras dos veces consecutivas, definimos el éxito en el juego únicamente si el número de la segunda tirada es exactamente el doble del registrado en la primera tirada. ¿Qué probabilidad matemática tiene el participante de obtener el éxito?',
          options: [
            '`1/12` (aproximadamente 8.33%)',
            '`1/36` (aproximadamente 2.77%)',
            '`1/18` (aproximadamente 5.55%)',
            '`1/6` (aproximadamente 16.66%)'
          ],
          correctIndex: 0,
          explanation: 'El espacio muestral del experimento contiene `36` casos posibles (`6 * 6 = 36`). Las parejas de tiradas de éxito son únicamente: `(1, 2)`, `(2, 4)` y `(3, 6)` ya que el doble de 4 excede el valor mayor del dado. Al haber exactamente `3` combinaciones ganadoras, la probabilidad de éxito es `3 / 36 = 1/12`.',
          standard: 'COMPETENCIA: Razonamiento y argumentación'
        };
      } else if (qNum === 11) {
        q = {
          id: 11,
          code: 'MAT-011',
          category: 'Cuestiones de Medidas y Geometría',
          statement: 'Se desea construir un silo cilíndrico de almacenamiento de agua subterránea en Santiago. Si el radio de su base mide `3 metros` y su altura total es `10 metros`, calcule el volumen total en metros cúbicos que puede almacenar el silo (considere `pi ≈ 3.14`).',
          options: [
            '`282.6 m³`',
            '`94.2 m³`',
            '`188.4 m³`',
            '`565.2 m³`'
          ],
          correctIndex: 0,
          explanation: 'La fórmula para calcular el volumen de un cilindro es V = pi * r² * h. Sustituyendo los valores provistos: V ≈ 3.14 * (3)² * 10 = 3.14 * 9 * 10 = 282.6 metros cúbicos.',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 12) {
        q = {
          id: 12,
          code: 'MAT-012',
          category: 'Geometría y Trigonometría',
          statement: 'Un agrimensor mide la distancia entre dos hitos de un terreno separados por un lago en Constanza. Considere el triángulo oblicuángulo del gráfico: si conocemos los límites `a = 50 m`, `b = 80 m` y el ángulo comprendido entre ellos `C = 60°`, ¿cuál es la distancia de separación exacta `c` aplicando la ley del coseno?',
          options: [
            '`70 metros`',
            '`65 metros`',
            '`75 metros`',
            '`85 metros`'
          ],
          correctIndex: 0,
          explanation: 'Por la ley del coseno: c² = a² + b² - 2ab * cos(C). Sustituyendo: c² = 50² + 80² - 2(50)(80) * cos(60°) = 2500 + 6400 - 8000 * 0.5 = 8900 - 4000 = 4900. Por lo tanto, c = sqrt(4900) = 70 metros.',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 13) {
        q = {
          id: 13,
          code: 'MAT-013',
          category: 'Estadística y Análisis de Datos',
          statement: 'El visualizador gráfico exhibe un histograma compacto que detalla las calificaciones de un grupo de cálculo. Se identifican tres intervalos de clases: [10, 20) con frecuencia 3, [20, 30) con frecuencia 5, y [30, 40) con frecuencia 2. Calcule la media aritmética ponderada aproximada de este conjunto de calificaciones utilizando las marcas de clase.',
          options: [
            '`24.0`',
            '`22.5`',
            '`25.5`',
            '`27.0`'
          ],
          correctIndex: 0,
          explanation: 'Las marcas de clase para cada intervalo son: X1 = 15, X2 = 25, X3 = 35. Las frecuencias respectivas son f1 = 3, f2 = 5, f3 = 2. Total de datos N = 10. La media ponderada es: (15*3 + 25*5 + 35*2) / 10 = (45 + 125 + 70) / 10 = 240 / 10 = 24.0.',
          standard: 'COMPETENCIA: Razonamiento y argumentación'
        };
      } else if (qNum === 14) {
        q = {
          id: 14,
          code: 'MAT-014',
          category: 'Álgebra y Ecuaciones',
          statement: 'Un agricultor en el Cibao vende sacos de café (x) y de cacao (y). Grafique el sistema de ecuaciones lineales del visualizador representativo de su venta diaria: `x + y = 30` (sacos totales) y `100x + 200y = 4000` (ingreso total en pesos). Determine cuál es la cantidad exacta de sacos de cacao `y` que vendió el agricultor.',
          options: [
            '`10 sacos`',
            '`20 sacos`',
            '`15 sacos`',
            '`5 sacos`'
          ],
          correctIndex: 0,
          explanation: 'De la primera ecuación, x = 30 - y. Sustituyendo en la segunda: 100(30 - y) + 200y = 4000 -> 3000 - 100y + 200y = 4000 -> 100y = 1000 -> y = 10 sacos de cacao.',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 15) {
        q = {
          id: 15,
          code: 'MAT-015',
          category: 'Círculos y Cónicas',
          statement: 'El epicentro de un temblor menor en la península de Samaná se representa matemáticamente mediante el modelo de la circunferencia `(x - 4)^2 + (y + 3)^2 = 25`. Determine analíticamente las coordenadas del centro `C(h, k)` y de su radio de cobertura `r`.',
          options: [
            'Centro C(4, -3) y Radio r = 5',
            'Centro C(-4, 3) y Radio r = 25',
            'Centro C(4, 3) y Radio r = 5',
            'Centro C(-4, -3) y Radio r = 5'
          ],
          correctIndex: 0,
          explanation: 'La forma canónica de la ecuación de una circunferencia es (x - h)² + (y - k)² = r². Por inspección directa con (x - 4)² + (y + 3)² = 25, tenemos h = 4, k = -3, y r² = 25, lo cual implica un radio r = 5.',
          standard: 'COMPETENCIA: Comunicación, modelación y representación'
        };
      } else if (qNum === 16) {
        q = {
          id: 16,
          code: 'MAT-016',
          category: 'Cálculo y Modelos Parabólicos',
          statement: 'Se planifica un puente de arco parabólico sobre el río Chavón en La Romana. El arco sigue la trayectoria descrita por la función cuadrática f(x) = -0.1(x - 20)^2 + 40, donde f(x) representa la altura en metros y x es la distancia horizontal desde el pilar inicial. Analizando el gráfico mostrado en el visualizador, ¿cuál es la altura máxima que alcanza el puente y a qué distancia horizontal se localiza su vértice del arco?',
          options: [
            'La altura máxima es de 40 metros y se alcanza a una distancia horizontal de 20 metros.',
            'La altura máxima es de 20 metros y se alcanza a una distancia horizontal de 40 metros.',
            'La altura máxima es de 10 metros y se alcanza a una distancia horizontal de 20 metros.',
            'La altura máxima es de 40 metros y se alcanza a una distancia horizontal de 0 metros.'
          ],
          correctIndex: 0,
          explanation: 'La función f(x) = -0.1(x - 20)^2 + 40 está expresada en la forma canónica de una parábola y(x) = a(x - h)^2 + k, donde el vértice es (h, k). Puesto que h = 20 y k = 40, el punto más alto (vértice) se halla en (20, 40). Es decir, la altura máxima es k = 40 metros, alcanzada a una distancia horizontal h = 20 metros.',
          standard: 'COMPETENCIA: Resolución de problemas de ingeniería'
        };
      } else if (qNum === 17) {
        q = {
          id: 17,
          code: 'MAT-017',
          category: 'Estadística y Canasta Básica',
          statement: 'El Instituto Nacional de Protección de los Derechos del Consumidor (ProConsumidor) analiza los precios promedio de la canasta alimentaria para cuatro macro-regiones de la República Dominicana: Metropolitana, Cibao Norte, Región Sur y Región Este, tal como se muestra en el gráfico de barras. Si la canasta en la de mayor costo asciende a exactamente 40,000 pesos y la de menor costo es un 20% más barata, ¿cuál es el precio de la canasta de menor costo y a qué región corresponde según los datos analizados?',
          options: [
            'Corresponde a la Región Sur, con un precio de 32,000 pesos.',
            'Corresponde al Cibao Norte, con un precio de 36,000 pesos.',
            'Corresponde a la Región Este, con un precio de 30,000 pesos.',
            'Corresponde a la Región Metropolitana, con un precio de 32,000 pesos.'
          ],
          correctIndex: 0,
          explanation: 'Si la de máxima coste es de 40,000 pesos (Metropolitana) y la de menor coste es un 20% más barata, calculamos: Co = 40,000 - (40,005 * 0.20) = 40,000 - 8,000 = 32,000 pesos. De acuerdo con el visualizador de barra regional, el Sur ostenta la canasta alimentaria de menor costo promedio relativo.',
          standard: 'COMPETENCIA: Comunicación, modelación y representación'
        };
      } else if (qNum === 18) {
        q = {
          id: 18,
          code: 'MAT-018',
          category: 'Trigonometría e Ingeniería Marítima',
          statement: 'Desde la corona del Faro de Punta Torrecilla en Santo Domingo, a una altura vertical exacta de 40 metros sobre el nivel del mar, el operador observa una barcaza que se aproxima con un ángulo de depresión de exactamente 30°. Calcule la distancia horizontal exacta "d" desde la base del faro hasta la embarcación.',
          options: [
            'd = 40 * √3 metros (aproximadamente 69.28 metros)',
            'd = 40 metros',
            'd = 40 / √3 metros (aproximadamente 23.09 metros)',
            'd = 80 * √3 metros (aproximadamente 138.56 metros)'
          ],
          correctIndex: 0,
          explanation: 'Por trigonometría de los triángulos rectángulos: tan(30°) = altura / d => d = altura / tan(30°). Como tan(30°) = 1 / √3, sustituimos d = 40 / (1 / √3) = 40 * √3 metros. Esto resulta en aproximadamente 69.28 metros de distancia horizontal.',
          standard: 'COMPETENCIA: Resolución de problemas de física'
        };
      } else if (qNum === 19) {
        q = {
          id: 19,
          code: 'MAT-019',
          category: 'Matemática Financiera y Cooperativas',
          statement: 'Un productor de cebollas de Vallejuelo solicita un microcrédito de 100,000 pesos en la cooperativa local. Se le ofrecen dos esquemas opcionales de financiamiento para saldar a los 2 años: Esquema A (Interés Simple del 10% anual) y Esquema B (Interés Compuesto del 10% anual capitalizable anualmente). Calcule analíticamente la devaluación diferencial o diferencia de interés acumulado que el productor deberá pagar entre ambos tipos de crédito.',
          options: [
            'El interés compuesto (Esquema B) cuesta exactamente 1,000 pesos más que el esquema simple.',
            'El interés compuesto (Esquema B) cuesta exactamente 2,000 pesos más que el esquema simple.',
            'Ambos esquemas acumulan exactamente el mismo interés de 20,000 pesos.',
            'El esquema de interés simple cuesta exactamente 500 pesos más que el esquema compuesto.'
          ],
          correctIndex: 0,
          explanation: 'Para el Interés Simple (Esquema A): I_s = P * i * t = 100,000 * 0.10 * 2 = 20,000 pesos. Para el Interés Compuesto (Esquema B): Monto_c = P*(1 + i)^t = 100,000 * (1.10)^2 = 121,000 pesos, lo que implica un interés de I_c = 21,000 pesos. La diferencia cobrada es de: 21,000 - 20,000 = 1,000 pesos adicionales en el Esquema B.',
          standard: 'COMPETENCIA: Razonamiento y argumentación'
        };
      } else if (qNum === 20) {
        q = {
          id: 20,
          code: 'MAT-020',
          category: 'Geometría Plana y Parcelas',
          statement: 'Una cooperativa agrícola de Constanza delimita un terreno trapezoidal plano para producción de zanahorias. El trapecio tiene bases paralelas de 120 metros y 180 metros respectivamente, y una distancia perpendicular (altura) entre las bases de 80 metros. ¿Cuál es el área de cultivo total en metros cuadrados del predio agrícola?',
          options: [
            '12,000 metros cuadrados',
            '24,000 metros cuadrados',
            '9,600 metros cuadrados',
            '15,000 metros cuadrados'
          ],
          correctIndex: 0,
          explanation: 'La fórmula para el cálculo del área de un trapecio es A = ((Base_Mayor + Base_Menor) * altura) / 2. Sustituyendo los valores dados: A = ((180 + 120) * 80) / 2 = (300 * 80) / 2 = 24,000 / 2 = 12,000 metros cuadrados.',
          standard: 'COMPETENCIA: Resolución de problemas de medidas'
        };
      } else if (qNum === 20) {
        q = {
          id: 20,
          code: 'MAT-020',
          category: 'Geometría Plana y Parcelas',
          statement: 'Una cooperativa agrícola de Constanza delimita un terreno trapezoidal plano para producción de zanahorias. El trapecio tiene bases paralelas de 120 metros y 180 metros respectivamente, y una distancia perpendicular (altura) entre las bases de 80 metros. ¿Cuál es el área de cultivo total en metros cuadrados del predio agrícola?',
          options: [
            '12,000 metros cuadrados',
            '24,000 metros cuadrados',
            '9,600 metros cuadrados',
            '15,000 metros cuadrados'
          ],
          correctIndex: 0,
          explanation: 'La fórmula para el cálculo del área de un trapecio es A = ((Base_Mayor + Base_Menor) * altura) / 2. Sustituyendo los valores dados: A = ((180 + 120) * 80) / 2 = (300 * 80) / 2 = 24,000 / 2 = 12,000 metros cuadrados.',
          standard: 'COMPETENCIA: Resolución de problemas de medidas'
        };
      } else if (qNum === 21) {
        q = {
          id: 21,
          code: 'MAT-021',
          category: 'Álgebra y Matrices',
          statement: 'Calcule analíticamente el determinante de la matriz de segundo orden `[ [4, 6], [2, 8] ]` representada en la pizarra digital, la cual modela la ganancia relativa de dos fincas en Constanza.',
          options: [
            '20',
            '32',
            '12',
            '44'
          ],
          correctIndex: 0,
          explanation: 'El determinante de una matriz [[a, b], [c, d]] se calcula como (a*d - b*c). Para la matriz dada: Det = (4 * 8) - (6 * 2) = 32 - 12 = 20.',
          standard: 'COMPETENCIA: Resolución de problemas'
        };
      } else if (qNum === 22) {
        q = {
          id: 22,
          code: 'MAT-022',
          category: 'Trigonometría',
          statement: 'Un técnico del INDOTEL debe calcular la altura de una torre de señal en el Cerro del Santo Cerro. Desde un punto libre en el suelo a 30 metros de la base, mide un ángulo de elevación de exactamente 30°. ¿Cuál es la altura estimada de la torre?',
          options: [
            '17.32 metros (30 * tan(30°))',
            '15 metros',
            '25.98 metros',
            '30 metros'
          ],
          correctIndex: 0,
          explanation: 'La relación trigonométrica es tan(30°) = Altura / Distancia. Despejando: Altura = 30 * tan(30°) = 30 * sqrt(3)/3 = 10 * sqrt(3) ≈ 17.32 metros.',
          standard: 'COMPETENCIA: Modelación matemática'
        };
      } else if (qNum === 23) {
        q = {
          id: 23,
          code: 'MAT-023',
          category: 'Estadística y Análisis de Datos',
          statement: 'A partir del histograma de frecuencias de las calificaciones de 50 alumnos de una sección de 6to de Secundaria que aparece en el visor gráfico, determine la cantidad acumulada de estudiantes que obtuvieron notas aprobatorias (entre 70 y 89 puntos).',
          options: [
            '30 estudiantes',
            '12 estudiantes',
            '40 estudiantes',
            '18 estudiantes'
          ],
          correctIndex: 0,
          explanation: 'Analizando las barras del histograma correspondientes al intervalo 70-79 (18 alumnos) y 80-89 (12 alumnos), sumamos ambas frecuencias absolutas: 18 + 12 = 30 estudiantes aprobados.',
          standard: 'COMPETENCIA: Probabilidad y estadística'
        };
      } else if (qNum === 24) {
        q = {
          id: 24,
          code: 'MAT-024',
          category: 'Geometría y Segmentación',
          statement: 'Un horticultor en Jarabacoa diseña un estanque circular rústico de radio 6 metros. Decide separar un sector circular con un ángulo central de 60° para criar peces específicos. ¿Cuál es el área exacta de este sector circular segregado?',
          options: [
            '6π metros cuadrados',
            '12π metros cuadrados',
            '3π metros cuadrados',
            '36π metros cuadrados'
          ],
          correctIndex: 0,
          explanation: 'El área de un sector circular es A = (π * r^2 * θ) / 360. Para r = 6 y θ = 60°: A = (π * 36 * 60) / 360 = (π * 2160) / 360 = 6π metros cuadrados.',
          standard: 'COMPETENCIA: Resolución de problemas geométricos'
        };
      } else if (qNum === 25) {
        q = {
          id: 25,
          code: 'MAT-025',
          category: 'Probabilidad y Conjuntos',
          statement: 'En un centro educativo de Santiago, el 60% de los estudiantes prefiere el Béisbol (B) y el 50% prefiere el Voleibol (V). Si el 30% prefiere ambos de forma simultánea según representa el diagrama de Venn, calcule la probabilidad de elegir un estudiante al azar que NO prefiera ninguno de estos dos deportes.',
          options: [
            '20%',
            '30%',
            '10%',
            '40%'
          ],
          correctIndex: 0,
          explanation: 'La probabilidad de la unión es P(B U V) = P(B) + P(V) - P(B ∩ V) = 60% + 50% - 30% = 80%. Por tanto, el complemento (los que no practican ninguno) es 100% - 80% = 20%.',
          standard: 'COMPETENCIA: Pensamiento probabilístico'
        };
      } else if (qNum === 26) {
        q = {
          id: 26,
          code: 'MAT-026',
          category: 'Cálculo Funcional y Optimización',
          statement: 'Dada la curva de productividad f(x) = -x^2 + 8x, halle analíticamente la pendiente de la recta tangente en el punto crítico x = 3 representada por la recta discontinua en el visualizador.',
          options: [
            '2',
            '4',
            '8',
            '1'
          ],
          correctIndex: 0,
          explanation: 'La derivada es f\'(x) = -2x + 8. Evaluando en x = 3: f\'(3) = -2(3) + 8 = -6 + 8 = 2.',
          standard: 'COMPETENCIA: Resolución de problemas de cambio'
        };
      } else if (qNum === 27) {
        q = {
          id: 27,
          code: 'MAT-027',
          category: 'Trigonometría Avanzada',
          statement: 'Dos embarcaciones turísticas zarpan simultáneamente de las playas de Samaná con trayectorias separadas por un ángulo de 60°. Si la primera embarcación avanza 4 km y la segunda 5 km, ¿cuál es la distancia de separación directa lineal entre ambas embarcaciones?',
          options: [
            '4.58 km (√21)',
            '6.00 km',
            '9.00 km',
            '5.50 km'
          ],
          correctIndex: 0,
          explanation: 'Por la Ley de Cosenos: d^2 = a^2 + b^2 - 2ab*cos(θ) = 4^2 + 5^2 - 2(4)(5)*cos(60°) = 16 + 25 - 40*(0.5) = 41 - 20 = 21. Luego, d = √21 ≈ 4.58 km.',
          standard: 'COMPETENCIA: Modelación matemática espacial'
        };
      } else if (qNum === 28) {
        q = {
          id: 28,
          code: 'MAT-028',
          category: 'Geometría Analítica',
          statement: 'Determine la longitud lineal exacta de la fibra óptica rectilínea que interconecta dos estaciones telefónicas situadas en los puntos cartesianos A(1, 2) y B(7, 10) que aparecen graficados en el cuadrante cartesiano.',
          options: [
            '10 km',
            '14 km',
            '8 km',
            '12 km'
          ],
          correctIndex: 0,
          explanation: 'La distancia d = sqrt((x2 - x1)^2 + (y2 - y1)^2) = sqrt((7 - 1)^2 + (10 - 2)^2) = sqrt(6^2 + 8^2) = sqrt(36 + 64) = sqrt(100) = 10 km.',
          standard: 'COMPETENCIA: Razonamiento espacial'
        };
      } else if (qNum === 29) {
        q = {
          id: 29,
          code: 'MAT-029',
          category: 'Aritmética Financiera',
          statement: 'Un productor de arroz de Nagua solicita un microcrédito preferencial de 200,000 pesos a una tasa del 12% anual de interés simple. Desea conocer mediante la tabla del plan financiero cuál es el monto final acumulado que deberá cancelar transcurrido un plazo de 18 meses.',
          options: [
            '236,000 pesos',
            '224,000 pesos',
            '212,000 pesos',
            '248,000 pesos'
          ],
          correctIndex: 0,
          explanation: 'El interés simple se calcula como I = P * r * t. Aquí P = 200,000, r = 0.12, y t = 1.5 años (18 meses). I = 200,000 * 0.12 * 1.5 = 36,000. El monto acumulado total es P + I = 236,000 pesos.',
          standard: 'COMPETENCIA: Resolución de problemas de contexto financiero'
        };
      } else if (qNum === 30) {
        q = {
          id: 30,
          code: 'MAT-030',
          category: 'Lógica Matemática',
          statement: 'De acuerdo con la tabla de verdad de la implicación condicional `p -> q` representada en la libreta digital, indique el valor lógico de salida si el antecedente `p` (Elegible para beca) es FALSO y el consecuente `q` (Apoya excelencia) es VERDADERO.',
          options: [
            'Verdadero (V)',
            'Falso (F)',
            'Indeterminado (I)',
            'Incoherente'
          ],
          correctIndex: 0,
          explanation: 'Por definición operatoria de la tabla de verdad condicional (p -> q), cuando el antecedente es Falso y el consecuente es Verdadero (F -> V), la salida lógica resultante es formalmente Verdadera (V).',
          standard: 'COMPETENCIA: Razonamiento lógico'
        };
      } else {
        // Programmatic mathematical variations from questions 31 to 180
        const index = qNum;
        const categories = ['Álgebra y Ecuaciones', 'Geometría y Trigonometría', 'Estadística y Análisis de Datos', 'Probabilidad', 'Cálculo Funcional'];
        const chosenCategory = categories[index % categories.length];
        
        if (chosenCategory === 'Álgebra y Ecuaciones') {
          const valA = (index * 3) % 15 + 2;
          const valB = (index * 5) % 10 + 1;
          const sol = valA + valB;
          q = {
            id: qNum,
            code: `MAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Dada la ecuación lineal \`${valA}x - ${valB} = ${valA * 3 - valB}\`, ¿cuál es el valor de la incógnita \`x\`?`,
            options: [
              '`3`',
              '`2`',
              '`4`',
              '`5`'
            ],
            correctIndex: 0,
            explanation: `Despejando la incógnita de la relación lineal: \`${valA}x = ${valA * 3} → x = 3\`.`,
            standard: 'COMPETENCIA: Resolución de problemas'
          };
        } else if (chosenCategory === 'Geometría y Trigonometría') {
          const cateto1 = ((index * 2) % 4 + 1) * 3;
          const cateto2 = ((index * 2) % 4 + 1) * 4;
          const hipo = ((index * 2) % 4 + 1) * 5;
          q = {
            id: qNum,
            code: `MAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Un triángulo rectángulo de drenaje de aguas tiene catetos que miden exactamente \`${cateto1} cm\` y \`${cateto2} cm\` respectivamente. ¿Cuál es el perímetro total de dicho triángulo?`,
            options: [
              `\`${cateto1 + cateto2 + hipo} cm\``,
              `\`${cateto1 + cateto2 + hipo + 2} cm\``,
              `\`${(cateto1 * cateto2) / 2} cm\``,
              `\`${hipo} cm\``
            ],
            correctIndex: 0,
            explanation: `Por el Teorema de Pitágoras, la longitud de la hipotenusa es \`d = sqrt(${cateto1}^2 + ${cateto2}^2) = ${hipo} cm\`. El perímetro total del polígono es la suma de sus tres límites: \`${cateto1} + ${cateto2} + ${hipo} = ${cateto1 + cateto2 + hipo} cm\`.`,
            standard: 'COMPETENCIA: Resolución de problemas'
          };
        } else if (chosenCategory === 'Estadística y Análisis de Datos') {
          const n = 10 + (index % 5);
          q = {
            id: qNum,
            code: `MAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `En un sondeo demográfico con una muestra de \`${n}\` estudiantes de bachillerato, se calcula que la suma de sus respectivas edades es \`${n * 16}\`. Si ingresa un nuevo alumno de \`28\` años, ¿cuál será el promedio aritmético exacto de edad para el nuevo grupo consolidado?`,
            options: [
              `\`${((n * 16 + 28) / (n + 1)).toFixed(2)} años\``,
              '`16.00 años`',
              '`17.50 años`',
              '`18.20 años`'
            ],
            correctIndex: 0,
            explanation: `La suma original es \`${n * 16}\` años. La nueva suma integrada es \`${n * 16} + 28 = ${n * 16 + 28}\`. Dividiendo por la nueva muestra total de estudiantes (\`${n + 1}\`), el promedio nuevo resulta en \`${((n * 16 + 28) / (n + 1)).toFixed(2)} años\`.`,
            standard: 'COMPETENCIA: Razonamiento y argumentación'
          };
        } else if (chosenCategory === 'Probabilidad') {
          const rojas = (index % 5) + 3;
          const azules = (index % 4) + 4;
          const verdes = 5;
          const total = rojas + azules + verdes;
          q = {
            id: qNum,
            code: `MAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Una urna encuestadora contiene exactamente \`${rojas}\` boletas rojas, \`${azules}\` boletas azules y \`${verdes}\` boletas verdes. Si se extrae una boleta completamente al azar, ¿cuál es la probabilidad exacta de obtener una boleta de color azul?`,
            options: [
              `\`${azules}/${total}\``,
              `\`${rojas}/${total}\``,
              `\`${verdes}/${total}\``,
              `\`1/${total}\``
            ],
            correctIndex: 0,
            explanation: `Mediante la ley clásica de Laplace, la probabilidad de éxito es el cociente de casos favorables entre el tamaño total: \`P(Azul) = ${azules} / ${total}\`.`,
            standard: 'COMPETENCIA: Comunicación, modelación y representación'
          };
        } else {
          // Cálculo Funcional
          const mult = (index % 3) + 2;
          q = {
            id: qNum,
            code: `MAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Dada la función cuadrática polinómica \`f(x) = ${mult}x^2 - 3x + 1\`. ¿Cuál es el valor real obtenido tras evaluar analíticamente la función en el punto \`f(2)\`?`,
            options: [
              `\`${mult * 4 - 5}\``,
              `\`${mult * 2 - 5}\``,
              `\`${mult * 4 + 7}\``,
              `\`${mult * 3}\``
            ],
            correctIndex: 0,
            explanation: `Evaluando el punto \`x = 2\` en la expresión brindada: \`f(2) = ${mult}*(2)^2 - 3*(2) + 1 = ${mult * 4} - 6 + 1 = ${mult * 4 - 5}\`.`,
            standard: 'COMPETENCIA: Resolución de problemas'
          };
        }
      }
      list.push(q);
    }
  } else if (subjectId === 'espanol') {
    // 100 Questions for Spanish Language
    const texts = [
      {
        title: '"La familia: lugar de esperanza para la sociedad" (Lorena Bolzon)',
        body: 'La familia constituye el hogar, verdadero centro de la existencia humana. Desde la afectividad, forjamos nuestras actitudes, motivaciones y hábitos. Históricamente, los estudios revelan una realidad innegable: cuando sus funciones estratégicas fallan o se debilitan los vínculos familiares, aparecen situaciones de gran impacto social como el aumento de la criminalidad, problemas de comportamiento o la disminución del rendimiento académico.'
      },
      {
        title: '"Luis Pie" (Fragmento del cuento de Juan Bosch)',
        body: 'A eso de las siete la fiebre aturdía al haitiano Luis Pie. Además de que sentía la pierna endurecida, golpes internos le sacudían la ingle. Medio ciego por el dolor de cabeza y la debilidad, Luis Pie se sentó en el suelo, sobre las secas hojas de la caña, rayó un fósforo y trató de ver la herida. Se había cortado el dedo la tarde del día anterior, al pisar un pedazo de hierro viejo mientras tumbaba caña en la colonia Josefitas.'
      },
      {
        title: '"¿Qué es el Storytelling?" (Infografía Expositiva)',
        body: 'El storytelling es el arte de contar una historia para comunicar. Es una estrategia con la que contamos una historia para conseguir un determinado objetivo: informar, dar a conocer o vender. Sus fases son: introducción, nudo y desenlace. Es muy importante afinar más la historia conociendo exactamente qué objetivo tienes y quién es tu público.'
      }
    ];

    for (let i = 1; i <= 180; i++) {
      const qNum = i;
      let q: Question;

      if (qNum === 1) {
        q = {
          id: 1,
          code: 'ESP-001',
          category: 'Comprensión Lectora - Literal',
          context: texts[0].body,
          statement: 'Según el texto sobre la familia, ¿cuál de las siguientes opciones describe una consecuencia que sucede cuando NO se cumplen las funciones familiares en la sociedad?',
          options: [
            'Se debilita el espíritu competitivo de los jóvenes.',
            'Disminuyen las oportunidades de empleo técnico profesional.',
            'Se incrementa el crimen, el bajo rendimiento académico y los problemas de comportamiento.',
            'Los vínculos afectivos se fortalecen por la presión externa.'
          ],
          correctIndex: 2,
          explanation: 'La respuesta es literal del texto: "...aparecen situaciones de gran impacto social como, por ejemplo, el aumento de la criminalidad... y la disminución del rendimiento académico."',
          standard: 'COMPETENCIA: Comprensión escrita'
        };
      } else if (qNum === 2) {
        q = {
          id: 2,
          code: 'ESP-002',
          category: 'Afinidad Semántica y Vocabulario',
          context: texts[0].body,
          statement: '¿Cuál de las siguientes opciones expresa un antónimo (lo contrario) para la palabra "forjamos" utilizada por el autor en el primer párrafo?',
          options: [
            'Construimos',
            'Destruimos',
            'Modelamos',
            'Fortalecemos'
          ],
          correctIndex: 1,
          explanation: '"Forjar" significa dar forma, construir o modelar. Por tanto, el antónimo directo es "destruir".',
          standard: 'COMPETENCIA: Comprensión escrita'
        };
      } else if (qNum === 3) {
        q = {
          id: 3,
          code: 'ESP-003',
          category: 'Comprensión Lectora - Inferencial',
          context: texts[1].body,
          statement: 'A partir del fragmento del cuento "Luis Pie", ¿en qué día de la semana contrajo el haitiano la infección o herida en su pierna?',
          options: [
            'El sábado en la noche.',
            'El viernes por la tarde.',
            'El domingo de madrugada.',
            'El jueves en la mañana.'
          ],
          correctIndex: 1,
          explanation: 'El texto indica que "ocurrió el sábado, al iniciarse la noche..." y previamente menciona que "se había cortado el dedo la tarde del día anterior". El día anterior al sábado es el viernes.',
          standard: 'COMPETENCIA: Comprensión escrita (Inferencia temporal)'
        };
      } else if (qNum === 4) {
        q = {
          id: 4,
          code: 'ESP-004',
          category: 'Análisis Pragmático',
          context: texts[2].body,
          statement: 'En la expresión de la infografía "afinar más", ¿a qué se refiere el autor con el término de perfeccionamiento?',
          options: [
            'A utilizar melodías o tonos rítmicos para la lectura de la historia.',
            'A estrechar la relación de la historia con los objetivos del cliente y su público objetivo para hacerla más eficaz.',
            'A acortar significativamente los párrafos introductorios.',
            'A cambiar el idioma de la redacción por términos enteramente dramáticos.'
          ],
          correctIndex: 1,
          explanation: 'Afinar la historia en el contexto del Storytelling se refiere a adaptarla de manera precisa y perfecta al público objetivo y a las metas que se persiguen.',
          standard: 'COMPETENCIA: Comprensión escrita'
        };
      } else if (qNum === 5) {
        q = {
          id: 5,
          code: 'ESP-005',
          category: 'Tipos de Textos',
          statement: 'Considere la siguiente noticia publicada en Santo Domingo: "El Ministerio de Medio Ambiente inicia campaña masiva de reforestación en la cuenca del Río Yaque del Norte." ¿Cuál es el principal tipo de secuencia textual que predomina en este género periodístico?',
          options: [
            'Narrativa e de instrucción procesal.',
            'Expositiva e informativa del suceso.',
            'Descriptiva lírica y poética.',
            'De diálogo dramático teatral.'
          ],
          correctIndex: 1,
          explanation: 'Las noticias periodísticas tienen un propósito primario expositivo-informativo, transmitiendo hechos reales de interés colectivo de manera objetiva.',
          standard: 'COMPETENCIA: Clasificación textual'
        };
      } else if (qNum === 6) {
        q = {
          id: 6,
          code: 'ESP-006',
          category: 'Recursos Retóricos',
          statement: 'Analice el fragmento literal de la poetisa dominicana Salomé Ureña: "¡Patria querida, tu soberana cumbre desafía la aurora con destellos de gloria!". ¿Qué recurso retórico predomina en esta exclamación?',
          options: [
            'Una personificación y metáfora lírica.',
            'Una hipérbole absurda sin conexión lírica.',
            'Una onomatopeya sonora regional.',
            'Un pleonasmo redundante de enlace.'
          ],
          correctIndex: 0,
          explanation: 'Atribuir a la cumbre de la patria la capacidad de "desafiar la aurora" es una personificación de un elemento inanimado, enriquecido con la metáfora del "destello de gloria".',
          standard: 'COMPETENCIA: Análisis literario'
        };
      } else if (qNum === 7) {
        q = {
          id: 7,
          code: 'ESP-007',
          category: 'Sintaxis y Oración',
          statement: 'En la oración: "La soberanía nacional florece con el firme civismo de las nuevas generaciones.", ¿cuál es el núcleo del sujeto?',
          options: [
            'generaciones',
            'florece',
            'soberanía',
            'civismo'
          ],
          correctIndex: 2,
          explanation: 'El sujeto es "La soberanía nacional". El sustantivo principal que actúa como núcleo es "soberanía".',
          standard: 'COMPETENCIA: Análisis sintáctico'
        };
      } else if (qNum === 8) {
        q = {
          id: 8,
          code: 'ESP-008',
          category: 'Pragmática y Comunicación',
          statement: 'Un folleto informativo de salud escolar distribuye la consigna: "¡Vacúnate por tu país! Evitemos el contagio de epidemias estacionales." ¿Qué función primordial del lenguaje predomina en dicha frase?',
          options: [
            'Función metalingüística.',
            'Función fática de contacto continuado.',
            'Función apelativa o conativa.',
            'Función poética de evasión estética.'
          ],
          correctIndex: 2,
          explanation: 'La función apelativa o conativa busca influir en la conducta del receptor a través de exhortaciones, consejos o mandatos.',
          standard: 'COMPETENCIA: Funciones del lenguaje'
        };
      } else if (qNum === 9) {
        q = {
          id: 9,
          code: 'ESP-009',
          category: 'Reglas de Acentuación',
          statement: 'De acuerdo con las reglas formales de acentuación de la Real Academia Española (RAE), clasifique secuencialmente las palabras "prístino", "corazón", "fácil" y "así" según la ubicación de su sílaba tónica:',
          options: [
            'Esdrújula, Aguda, Llana, Aguda.',
            'Aguda, Esdrújula, Sobreesdrújula, Llana.',
            'Llana, Llana, Aguda, Esdrújula.',
            'Esdrújula, Llana, Aguda, Aguda.'
          ],
          correctIndex: 0,
          explanation: '"Prístino" es esdrújula (antepenúltima sílaba), "corazón" es aguda (última), "fácil" es llana (penúltima) y "así" es aguda (última sílaba).',
          standard: 'COMPETENCIA: Uso de la lengua'
        };
      } else if (qNum === 10) {
        q = {
          id: 10,
          code: 'ESP-010',
          category: 'Coherencia y Cohesión',
          statement: 'Complete el enunciado con los conectores lógicos de cohesión adecuados: "Estudió con tesón para las pruebas nacionales; ____________, no descansó ____________ obtuvo los resultados sobresalientes pactados con su docente."',
          options: [
            'pero / de manera que',
            'asimismo / por lo tanto',
            'por consiguiente / hasta que',
            'aunque / ya que'
          ],
          correctIndex: 2,
          explanation: '"Por consiguiente" introduce una relación de causa-consecuencia y "hasta que" establece un límite temporal adecuado para completar la relación lógicogramatical.',
          standard: 'COMPETENCIA: Cohesión textual'
        };
      } else if (qNum === 11) {
        q = {
          id: 11,
          code: 'ESP-011',
          category: 'Análisis Textual',
          statement: '¿Qué característica formal diferencia de manera fundamental al ensayo argumentativo de la poesía lírica con rima clásica?',
          options: [
            'El ensayo está escrito formalmente en prosa y apela a la reflexión argumentativa mediante ideas lógicas, mientras que la poesía clásica utiliza el verso y apela a la emoción estética.',
            'El ensayo carece de coherencia lingüística y solo posee personajes fantásticos infantiles.',
            'La poesía se limita exclusivamente a dar instrucciones de orden procesal técnico.',
            'El ensayo requiere de rima asonante obligatoria al final de cada uno de sus párrafos.'
          ],
          correctIndex: 0,
          explanation: 'El ensayo es un género escrito en prosa donde el autor expone, analiza y defiende un punto de vista (argumentativo), apelando principalmente a la lógica y la reflexión del lector, marcando una distinción con la estructura métrica y lírica de la poesía clásica.',
          standard: 'COMPETENCIA: Clasificación textual'
        };
      } else if (qNum === 12) {
        q = {
          id: 12,
          code: 'ESP-012',
          category: 'Análisis Literario',
          statement: 'Analice el fragmento de la novela socio-realista "Over" de Ramón Marrero Aristy: "La caña de azúcar subía como una muralla verde frente a nosotros. Sabíamos que nuestra libertad y nuestro sudor se quedarían enterrados en el batey...". ¿En qué persona gramatical se encuentra estructurada la perspectiva del narrador?',
          options: [
            'Primera persona del plural (Narrador testigo activo/protagonista colectivo)',
            'Tercera persona del singular (Narrador omnisciente clásico)',
            'Segunda persona del singular (Narrador apelativo o en segunda persona)',
            'Tercera persona del plural (Narrador observador externo pasivo)'
          ],
          correctIndex: 0,
          explanation: 'El fragmento utiliza indicadores verbales y pronominales de primera persona del plural ("nosotros", "sabíamos", "nuestra", "nuestro"), lo que ubica la voz del relato en primera persona pluri-personal colectiva.',
          standard: 'COMPETENCIA: Análisis literario'
        };
      } else if (qNum === 13) {
        q = {
          id: 13,
          code: 'ESP-013',
          category: 'Recursos Retóricos',
          statement: 'Analice el verso poético: "El tierno silbo de los vientos suaves suspira...". ¿Qué figura literaria de efectos fonológicos y acústicos evoca la reiteración constante del sonido de la letra /s/?',
          options: [
            'Aliteración (reiteración intencionada de sonidos semejantes para crear un efecto auditivo imitando la naturaleza)',
            'Hipérbole (exageración desmedida de las formas estructurales reales)',
            'Oxímoron (aproximación contradictoria de dos términos opuestos)',
            'Anáfora (repetición idéntica de una palabra al inicio de múltiples oraciones)'
          ],
          correctIndex: 0,
          explanation: 'La aliteración consiste en la repetición de sonidos equivalentes para imitar fenómenos rítmicos o sonoros (en este caso, el sonido /s/ recrea físicamente el susurro o silbido del viento suave).',
          standard: 'COMPETENCIA: Análisis poético'
        };
      } else if (qNum === 14) {
        q = {
          id: 14,
          code: 'ESP-014',
          category: 'Comprensión Escrita',
          statement: 'En un panel de discusión formal acerca del cuidado del medio ambiente escolar, ¿cuál de los siguientes conectores de transición retórica es el idóneo para refutar de manera directa y elegante un contraargumento?',
          options: [
            'Por el contrario / Sin embargo, es menester puntualizar que...',
            'Además / Asimismo cabe agregar que...',
            'En primer lugar / Para iniciar el desarrollo formal...',
            'Por consiguiente / Dadas las circunstancias descritas...'
          ],
          correctIndex: 0,
          explanation: 'Los conectores adversativos y de contraposición como "por el contrario" y "sin embargo" son idóneos para rebatir objeciones de forma respetuosa, coordinada y con rigor discursivo.',
          standard: 'COMPETENCIA: Pragmática y argumentación'
        };
      } else if (qNum === 15) {
        q = {
          id: 15,
          code: 'ESP-015',
          category: 'Semántica y Registro',
          statement: 'Considere la expresión común: "Ese docente tiene un corazón de oro por su entrega infinita". ¿De qué tipo es el registro de sentido asignado a la palabra "oro" en esta oración?',
          options: [
            'Sentido connotativo, denotando valores abstractos de nobleza extrema, bondad y desinterés.',
            'Sentido denotativo, indicando clínicamente que el miocardio del maestro está hecho físicamente de metal áureo.',
            'Sentido científico descriptivo, definiendo una patología anatómica metalúrgica.',
            'Sentido de ironía sarcástica, buscando despreciar las labores docentes escolares.'
          ],
          correctIndex: 0,
          explanation: 'La connotación otorga sentidos figurados a las palabras de acuerdo con el contexto cultural de comunicación. Decir "corazón de oro" destaca metafóricamente cualidades de incalculable valor moral de bondad extrema.',
          standard: 'COMPETENCIA: Análisis semántico'
        };
      } else if (qNum === 16) {
        q = {
          id: 16,
          code: 'ESP-016',
          category: 'Comprensión Lectora e Inferencia Poética',
          statement: 'Analice la estrofa célebre de Pedro Mir en "Hay un país en el mundo":\n\n`Hay un país en el mundo colocado en el mismo trayecto del sol.`\n`Errante y campesino. Cantarín y penoso.`\n`Y no es más que un soplo de libertad...`\n\n¿Cuál es la figura literaria predominante en el primer verso y a qué característica geográfica y social dominicana alude principalmente?',
          options: [
            'Hipérbole y metáfora espacial, aludiendo a la ubicación tropical de la isla bajo el sol ardiente combinada con la difícil realidad de su humilde población agrícola.',
            'Aliteración fónica pura, describiendo el ciclo solar nocturno del Caribe.',
            'Símil directo, comparando explícitamente a toda la población del país con la física solar térmica.',
            'Personificación marina, atribuyendo sentimientos de codicia al mar atlántico.'
          ],
          correctIndex: 0,
          explanation: 'La frase "en el mismo trayecto del sol" es una metáfora espacial unida a la hipérbole poética que resalta la condición insular-tropical de la República Dominicana, pero que contrasta de inmediato con los adjetivos "penoso" y "errante" de su población.',
          standard: 'COMPETENCIA: Comprensión y valoración crítica'
        };
      } else if (qNum === 17) {
        q = {
          id: 17,
          code: 'ESP-017',
          category: 'Comprensión de Editoriales de Opinión',
          statement: 'Lea el siguiente fragmento editorial:\n\n"El progresivo ahogamiento de la cuenca media del Río Ozama debido al vertido de plásticos urbanos e industriales no es ya un simple reto de ornato de la ciudad; representa un colapso ecológico que amenaza de raíz la salud colectiva de miles de familias circunvecinas..."\n\n¿Qué tipo de tipología textual prevalece en dicho párrafo y cuál es la tesis principal del autor?',
          options: [
            'Texto argumentativo, cuya tesis central es que la contaminación del Río Ozama no es decorativa sino un colapso ecológico letal para la salud de las familias.',
            'Texto narrativo literario, cuya tesis describe fábulas biológicas de especies fluviales.',
            'Texto instructivo-administrativo corporativo, que detalla un manual técnico de reciclaje.',
            'Texto descriptivo forense, enfocado en catalogar polímeros comerciales.'
          ],
          correctIndex: 0,
          explanation: 'La editorial de opinión pertenece sustancialmente al género argumentativo en el periodismo. El autor presenta una postura crítica (tesis) sobre la gravedad de la contaminación ecológica del río Ozama como un problema ético de las familias, buscando persuadir para generar conciencia.',
          standard: 'COMPETENCIA: Pragmática y argumentación editorial'
        };
      } else if (qNum === 18) {
        q = {
          id: 18,
          code: 'ESP-018',
          category: 'Sociolingüística de los Dialectos',
          statement: 'En la lingüística dominicana, es común registrar variaciones fonéticas regionales muy auténticas, tales como la rotación de líquidas: la "i" en el Cibao ("bueino"), la "l" en el Sur ("comel"), y la geminación de la "r" en el Este ("carr-co" o "par-rty"). ¿Qué nombre científico recibe este fenómeno dialectal dominicano y qué actitud sociocultural debe promoverse?',
          options: [
            'Geolecto y variante dialectal del vernáculo dominicano; se debe promover el respeto a la riqueza multicultural de la herencia regional sin discriminar.',
            'Defectos mecánicos de articulación que requieren terapia biológica de lenguaje.',
            'Extranjerismos modernos introducidos por las corrientes de comercio náutico.',
            'Alteraciones graves de traducción escrita con fines humorísticos de entretenimiento.'
          ],
          correctIndex: 0,
          explanation: 'La rotación y sustitución de consonantes líquidas representa un fenómeno geolectal estudiado por la sociolingüística caribeña. Refleja la riqueza histórica de la lengua sin catalogarse como error anatómico ni degeneración gramatical.',
          standard: 'COMPETENCIA: Variación sociocultural y geolectal'
        };
      } else if (qNum === 19) {
        q = {
          id: 19,
          code: 'ESP-019',
          category: 'Tipologías del Texto Instructivo',
          statement: 'Un volante informativo de salud pública reza:\n\n"Para prevenir el brote de dengue: 1) Tape herméticamente los tanques de agua limpia. 2) Vacíe los recipientes donde se acumule lluvia. 3) Coloque cloro untado en las paredes del tanque".\n\n¿Qué característica lingüística formal distingue y sostiene estructuralmente a esta tipología de redacción?',
          options: [
            'El uso de verbos en modo imperativo o infinitivo para ordenar pautas precisas, directas y organizadas secuencialmente.',
            'El predominio de metáforas estéticas complejas y oraciones subordinadas cargadas de retórica lírica.',
            'El registro coloquial cargado de refranes tradicionales y humor regional.',
            'La estructura del diálogo interactivo de libre improvisación dramática.'
          ],
          correctIndex: 0,
          explanation: 'Los textos de carácter instructivo demandan una comunicación técnica, concisa y secuencial para guiar al receptor. El uso de imperativos ("Tape", "Vacíe", "Coloque") representa la marca morfosintáctica por excelencia para la redacción de instrucciones reguladas.',
          standard: 'COMPETENCIA: Comprensión y redacción procedimental'
        };
      } else if (qNum === 20) {
        q = {
          id: 20,
          code: 'ESP-020',
          category: 'Análisis Crítico Literario',
          statement: 'En sus poemas cívicos, Salomé Ureña de Henríquez recurre constantemente a conceptos como "gloria", "luz de la escuela", "patria reconciliada de hermanos" y "ciencia redentora". ¿Bajo cuál corriente ideológica y poética del siglo XIX se inscribe este idealismo educativo de su pluma?',
          options: [
            'El positivismo pedagógico y romanticismo cívico de influencia hostosiana, que propugnaba por el orden civil, la ciencia, el laicismo y el florecimiento nacional escolar.',
            'El barroco de influencia imperial absolutista española.',
            'El surrealismo de vanguardia con tintes de nihilismo filosófico.',
            'La literatura con deidades del Monte Olimpo.'
          ],
          correctIndex: 0,
          explanation: 'La obra cívica de Salomé Ureña se nutrió enormemente de su colaboración con la escuela normalista de Eugenio María de Hostos, abogando por una patria secular fundada sobre las bases del conocimiento científico y moral.',
          standard: 'COMPETENCIA: Contextualización del patrimonio poético'
        };
      } else if (qNum === 21) {
        q = {
          id: 21,
          code: 'ESP-021',
          category: 'Tipología Textual',
          statement: 'Al analizar el organigrama discursivo del visualizador sobre Tipos de Textos, ¿cuál es la función primordial del Texto Argumentativo en comparación con el Texto Expositivo?',
          options: [
            'Convencer o persuadir al receptor mediante razones o argumentos sobre una postura o tesis.',
            'Informar de manera objetiva sobre un tema de interés general o científico sin emitir opiniones.',
            'Relatar de forma cronológica acontecimientos reales o ficticios sucedidos a unos personajes.',
            'Instruir al receptor mediante una serie de pasos rígidos y ordenados para realizar una tarea.'
          ],
          correctIndex: 0,
          explanation: 'El texto argumentativo se define por su fin persuasivo, buscando adherir al receptor a una tesis u opinión mediante premisas lógicas y recursos argumentativos, a diferencia del expositivo que busca meramente informar de modo neutral.',
          standard: 'COMPETENCIA: Comprensión y producción escrita'
        };
      } else if (qNum === 22) {
        q = {
          id: 22,
          code: 'ESP-022',
          category: 'Sintaxis y Estructura',
          statement: 'Considere la oración gramatical expuesta en el analizador sintáctico: "Los valientes patricios fundaron una sociedad secreta". ¿Cuál es el núcleo del sujeto y el objeto directo del predicado respectivamente?',
          options: [
            'Patricios (Núcleo) / una sociedad secreta (Objeto Directo)',
            'Valientes (Núcleo) / fundaron (Objeto Directo)',
            'Patricios (Núcleo) / fundaron (Objeto Directo)',
            'Sociedad (Núcleo) / valientes (Objeto Directo)'
          ],
          correctIndex: 0,
          explanation: 'El sujeto es "Los valientes patricios", donde "patricios" es el sustantivo núcleo. El predicado es "fundaron una sociedad secreta", donde el verbo núcleo es "fundaron" y lo fundado responde a la pregunta ¿qué?: "una sociedad secreta" (Objeto Directo).',
          standard: 'COMPETENCIA: Análisis gramatical del discurso'
        };
      } else if (qNum === 23) {
        q = {
          id: 23,
          code: 'ESP-023',
          category: 'Ortografía y Acentuación',
          statement: 'Observe la clasificación del panel ortográfico digital. Según las reglas generales de acentuación del español, ¿por qué la palabra "Duarte" es llana y no lleva tilde, mientras que "Sánchez" es llana y sí lleva tilde?',
          options: [
            '"Duarte" termina en vocal, por lo que no lleva tilde; mientras que "Sánchez" termina en consonante distinta de N o S, por lo que sí se tilda.',
            '"Duarte" es esdrújula y "Sánchez" es aguda.',
            'Todas las palabras que terminen en vocal deben llevar tilde obligatoriamente en español.',
            '"Sánchez" lleva tilde porque contiene un hiato acentual en la penúltima sílaba.'
          ],
          correctIndex: 0,
          explanation: 'Las palabras llanas o graves se acentúan prosódicamente en la penúltima sílaba. Llevan tilde gráfica (ortográfica) solo cuando terminan en consonante distinta de -n, -s o en vocal. "Duarte" termina en vocal (no lleva), y "Sánchez" termina en "z" (sí lleva).',
          standard: 'COMPETENCIA: Ortografía y redacción'
        };
      } else if (qNum === 24) {
        q = {
          id: 24,
          code: 'ESP-024',
          category: 'Métrica y Poesía',
          statement: 'Al analizar el poema de Pedro Mir "Hay un país en el mundo", nos encontramos con los versos graficados en el visualizador métrico. Si un verso proclama: "Hay / un / pa/ís / en / el / mun/do", ¿qué fenómeno silábico permite unir la vocal final de una palabra con la vocal inicial de la siguiente para formar una sola sílaba métrica?',
          options: [
            'La Sinalefa',
            'La Sinéresis',
            'La Diéresis',
            'El Hiato métrico'
          ],
          correctIndex: 0,
          explanation: 'La sinalefa es la unión métrica de la vocal final de una palabra con la vocal inicial de la palabra siguiente (ej. "en_el"), contándose como una sola sílaba métrica, recurso que dota de ritmo y musicalidad al verso.',
          standard: 'COMPETENCIA: Comprensión del texto lírico'
        };
      } else if (qNum === 25) {
        q = {
          id: 25,
          code: 'ESP-025',
          category: 'Figuras Literarias',
          statement: 'En la obra poética de Franklin Mieses Burgos se lee: "Tu voz es como un río de cristales rotos". ¿Qué figura literaria de comparación o belleza analógica se está utilizando en esta elegante expresión?',
          options: [
            'Símil o Comparación directa (indicado por el nexo de igualdad "como").',
            'Metáfora pura (sin nexo de enlace).',
            'Hipérbole o exageración lírica desproporcionada.',
            'Personificación o atribución de rasgos humanos.'
          ],
          correctIndex: 0,
          explanation: 'La presencia de una relación analógica explícita mediante un nexo comparativo directo ("como", "cual", "semejante a") tipifica formalmente la figura literaria del símil, diferenciándolo de la metáfora que asocia los términos de forma tácita.',
          standard: 'COMPETENCIA: Apreciación estética literaria'
        };
      } else if (qNum === 26) {
        q = {
          id: 26,
          code: 'ESP-026',
          category: 'Comprensión Escrita',
          statement: 'De acuerdo con el esquema estructural de un Ensayo Argumentativo representado en la gráfica secuencial, ¿cuál es el componente que sustenta la validez de la Tesis u opinión planteada por el autor?',
          options: [
            'El cuerpo de Argumentos, evidencias y citas de autoridad.',
            'La descripción anecdótica libre de sensaciones del autor.',
            'El índice legislativo o bibliográfico terminal.',
            'La introducción lírica o epígrafe poético del autor.'
          ],
          correctIndex: 0,
          explanation: 'La validez o nivel persuasivo de una tesis en el ensayo argumentativo descansa directamente sobre los argumentos estructurados, datos demostrables, razonamientos lógicos y testimonios de autoridad expuestos en el cuerpo del escrito.',
          standard: 'COMPETENCIA: Producción textual escrita'
        };
      } else if (qNum === 27) {
        q = {
          id: 27,
          code: 'ESP-027',
          category: 'Sintaxis y Oración Compuesta',
          statement: 'Analice el conector destacado en el visualizador sintáctico para la oración compuesta: "Estudió con gran empeño, por consiguiente, superó con honores las pruebas nacionales". ¿Qué tipo de relación de coordinación u oración compuesta se establece?',
          options: [
            'Relación consecutiva o ilativa (marca consecuencia lógica).',
            'Relación copulativa de adición simple.',
            'Relación disyuntiva de exclusión mutua de ideas.',
            'Relación adversativa de contradicción liminar.'
          ],
          correctIndex: 0,
          explanation: 'La locución adverbial o conector discursivo "por consiguiente" enlaza dos proposiciones donde la segunda es la consecuencia natural de la primera, constituyendo formalmente una subordinación o enlace coordinado de tipo consecutivo (ilativo).',
          standard: 'COMPETENCIA: Cohesión y coherencia discursiva'
        };
      } else if (qNum === 28) {
        q = {
          id: 28,
          code: 'ESP-028',
          category: 'Medios de Comunicación Escrita',
          statement: 'En el diseño estructural de la portada de un Periódico, como se ilustra en el bosquejo digital de prensa, ¿cuál es la función de la "Entrada", "Copete" o "Lead" ubicado inmediatamente debajo del gran titular principal?',
          options: [
            'Sintetizar en un párrafo breve los datos esenciales de la noticia respondiendo a las preguntas básicas (quién, qué, dónde, cuándo y por qué).',
            'Mostrar informaciones publicitarias secundarias sin enlace directo con la noticia principal.',
            'Hacer una dedicatoria personal firmada por el director del consejo de prensa.',
            'Servir de pie de foto aclaratorio exclusivamente.'
          ],
          correctIndex: 0,
          explanation: 'En el periodismo formal, el "Lead" o entradilla es el primer párrafo de la noticia que concentra los datos nucleares del acontecimiento fáctico (las 5 Ws: Who, What, Where, When, Why), enganchando al lector y estructurando el discurso de pirámide invertida.',
          standard: 'COMPETENCIA: Comprensión de textos periodísticos'
        };
      } else if (qNum === 29) {
        q = {
          id: 29,
          code: 'ESP-029',
          category: 'Sociolingüística Dominicana',
          statement: 'Si analizamos sociolingüísticamente las viñetas del diálogo escolar en el simulador, un estudiante se expresa usando palabras como: "¡Qué chulo!", "¡Qué vacilón!" o "un chin". ¿En cuál nivel de habla o registro de la lengua se inscriben estas representaciones populares?',
          options: [
            'Registro coloquial o informal propio de la comunicación espontánea.',
            'Registro culto o formal especializado.',
            'Nivel científico-técnico estructurado de alta investigación.',
            'Jerga médica forense caribeña.'
          ],
          correctIndex: 0,
          explanation: 'Expresiones coloquiales y dominicanismos populares como "un chin", "chulo" o "vacilón" forman parte de la variedad lingüística dominicana en su registro coloquial, caracterizado por su carácter informal, afectivo, espontáneo e inmediato.',
          standard: 'COMPETENCIA: Variabilidad de la lengua'
        };
      } else if (qNum === 30) {
        q = {
          id: 30,
          code: 'ESP-030',
          category: 'Evolución Lingüística',
          statement: 'La llegada acelerada de las tecnologías web y móviles al Caribe ha importado vocablos como "cliquear", "chatear" o "escanear". ¿Cómo se denominan técnicamente estas palabras importadas o adaptadas al sistema fonético y morfológico del español dominicano?',
          options: [
            'Neologismos adoptados (o anglicismos adaptados).',
            'Arcaísmos lingüísticos extintos de origen medieval.',
            'Metáforas cultas de origen grecolatino puro.',
            'Eufemismos discursivos de reserva diplomática.'
          ],
          correctIndex: 0,
          explanation: 'Los términos incorporados a nuestro léxico para nombrar nuevas realidades tecnológicas ("cliquear", "chatear") constituyen neologismos (y específicamente anglicismos adaptados), que enriquecen y actualizan el uso dinámico del lenguaje.',
          standard: 'COMPETENCIA: Evolución léxica de la lengua'
        };
      } else {
        // Programmatic mathematical variations from questions 31 to 180
        const index = qNum;
        const genres = ['Literal', 'Inferencial', 'Crítica', 'Gramática y Sintaxis'];
        const chosenGenre = genres[index % genres.length];
        const textObj = texts[index % texts.length];

        if (chosenGenre === 'Literal') {
          q = {
            id: qNum,
            code: `ESP-${String(qNum).padStart(3, '0')}`,
            category: chosenGenre,
            context: textObj.body,
            statement: `En el texto titulado "${textObj.title}", identifique cuál de las siguientes opciones describe el tema o hecho directo mencionado.`,
            options: [
              'La necesidad del desarrollo integral y la armonía según el contexto planteado.',
              'Un debate exclusivamente científico sobre métodos de aprendizaje memorístico.',
              'La descripción de procesos agrícolas del siglo XIX.',
              'Una campaña publicitaria para productos farmacéuticos extranjeros.'
            ],
            correctIndex: 0,
            explanation: 'La opción A engloba de manera general y literal los planteamientos integrales descritos en los pasajes.',
            standard: 'COMPETENCIA: Comprensión escrita'
          };
        } else if (chosenGenre === 'Inferencial') {
          q = {
            id: qNum,
            code: `ESP-${String(qNum).padStart(3, '0')}`,
            category: chosenGenre,
            context: textObj.body,
            statement: `A partir de la lectura de "${textObj.title}", ¿qué se puede deducir críticamente sobre la actitud de los personajes o la intención implícita del autor?`,
            options: [
              'Que busca promover la reflexión profunda y la concienciación social.',
              'Que busca rechazar toda forma de comunicación moderna.',
              'Que la situación descrita carece de relevancia en la actualidad.',
              'Que pretende forzar un cambio metodológico en las matemáticas.'
            ],
            correctIndex: 0,
            explanation: 'El propósito implícito de los autores en estas lecturas formales suele ser concientizar, inspirar o generar un cambio de perspectiva crítico-constructivo.',
            standard: 'COMPETENCIA: Comprensión escrita'
          };
        } else if (chosenGenre === 'Crítica') {
          q = {
            id: qNum,
            code: `ESP-${String(qNum).padStart(3, '0')}`,
            category: chosenGenre,
            context: textObj.body,
            statement: `Evaluando el tono del fragmento "${textObj.title}", ¿cómo se calificaría la postura discursiva utilizada?`,
            options: [
              'Objetiva y analítica, con alta carga de apelación o argumentación.',
              'Subjetiva y desinteresada, sin evidencias fácticas.',
              'Puramente satírica e informal, buscando el entretenimiento trivial.',
              'Poética y surrealista, ajena a los problemas nacionales.'
            ],
            correctIndex: 0,
            explanation: 'Los textos evaluados por el MINERD son predominantemente expositivo-argumentativos, manteniendo un tono formal, objetivo y con base reflexiva.',
            standard: 'COMPETENCIA: Comprensión escrita'
          };
        } else {
          // Gramática y Sintaxis
          q = {
            id: qNum,
            code: `ESP-${String(qNum).padStart(3, '0')}`,
            category: chosenGenre,
            context: textObj.body,
            statement: '¿Cuál es la función sintáctica del conector discursivo subrayado o implícito en las oraciones para enlazar los argumentos lógicos en el texto?',
            options: [
              'Establecer una relación de causa y efecto entre las premisas.',
              'Introducir una contradicción u oposición sin sentido lógico.',
              'Subrayar una frase meramente exclamativa.',
              'Eliminar la cohesión de los párrafos.'
            ],
            correctIndex: 0,
            explanation: 'Los conectores discursivos en los textos analíticos tienen como fin prioritario cohesionar y establecer relaciones de causalidad, adición o restricción lógica.',
            standard: 'COMPETENCIA: Sintaxis y Pragmática'
          };
        }
      }
      list.push(q);
    }
  } else if (subjectId === 'sociales') {
    // 180 Questions for Social Sciences
    for (let i = 1; i <= 180; i++) {
      const qNum = i;
      let q: Question;

      if (qNum === 1) {
        q = {
          id: 1,
          code: 'SOC-001',
          category: 'Historia Dominicana',
          statement: 'Ordene cronológicamente los siguientes eventos cruciales en la historia política de la República Dominicana del siglo XX: 1. La Era o Dictadura de Rafael Leónidas Trujillo. 2. La Revolución de Abril de 1965. 3. El período de los "Doce Años" de Joaquín Balaguer. ¿Cuál es la opción que presenta el orden correcto de inicio?',
          options: [
            '1, 2, 3',
            '2, 1, 3',
            '1, 3, 2',
            '3, 1, 2'
          ],
          correctIndex: 0,
          explanation: 'La dictadura de Trujillo inició en 1930 y terminó con su ajusticiamiento en 1961. La Revolución de Abril tuvo lugar en 1965. Los "Doce Años" de Balaguer comenzaron en 1966 y culminaron en 1978. Por tanto, el orden correcto es 1, 2, 3.',
          standard: 'COMPETENCIA: Comprensión social'
        };
      } else if (qNum === 2) {
        q = {
          id: 2,
          code: 'SOC-002',
          category: 'Cívica y Constitución',
          statement: 'De acuerdo con la Constitución de la República Dominicana, ante un caso de descontento nacional respecto al establecimiento de un impuesto general, un grupo de empresarios propone legislar de forma autónoma. ¿Por qué esta propuesta carece de viabilidad jurídica federal?',
          options: [
            'Porque la facultad exclusiva de crear, modificar o suprimir impuestos nacionales recae únicamente en el Congreso Nacional.',
            'Porque corresponde exclusivamente al Poder Judicial determinar los tributos arancelarios.',
            'Porque solo el Ayuntamiento del Distrito Nacional puede registrar impuestos al comercio formal.',
            'Porque las leyes de impuestos deben ser aprobadas directamente mediante referéndum por el 100% de los votantes de forma unánime.'
          ],
          correctIndex: 0,
          explanation: 'El artículo 93 de la Constitución dominicana deposita en el Congreso Nacional la atribución legislativa exclusiva en materia de impuestos, tributos y aranceles nacionales.',
          standard: 'COMPETENCIA: Dimensión Ciudadana'
        };
      } else if (qNum === 3) {
        q = {
          id: 3,
          code: 'SOC-003',
          category: 'Geografía Dominicana',
          statement: 'A finales del siglo XIX, la ciudad de San Pedro de Macorís experimentó un vertiginoso auge económico y demográfico atraído por la pujante industria azucarera. ¿Cuáles elementos geográficos estratégicos facilitaron este desarrollo exponencial?',
          options: [
            'La presencia del río Cumayasa y la cercanía al Pico Duarte.',
            'Su condición de puerto natural internacional navegable, la cercanía de ríos caudalosos como el Higuamo y el Soco, y sus fértiles llanuras aptas para el cultivo de la caña.',
            'La altitud de la Cordillera Central y el clima templado húmedo.',
            'El aislamiento geográfico montañoso que la protegía de tormentas tropicales recurrentes.'
          ],
          correctIndex: 1,
          explanation: 'Fueron clave las condiciones naturales de su litorales: bahías que sirvieron de puertos, los ríos Higuamo y Soco para transporte, y el excelente suelo de la Llanura Costera del Caribe para el cultivo extensivo de caña de azúcar.',
          standard: 'COMPETENCIA: Comprensión social (Dimensión Espacial)'
        };
      } else if (qNum === 4) {
        q = {
          id: 4,
          code: 'SOC-004',
          category: 'Historia Universal y Geopolítica',
          statement: 'La Guerra Fría (1947-1989) generó una fuerte polarización mundial en bloques ideológicos y militares opuestos. ¿Qué impacto o reflejo directo tuvo esta tensión bipolar en la historia contemporánea de Centroamérica durante las décadas de 1970 y 1980?',
          options: [
            'La instauración de regímenes totalitarios de corte socialista apoyados por potencias rivales, con conflictos armados severos en Nicaragua, El Salvador y Guatemala.',
            'El establecimiento de un mercado regional unificado totalmente ajeno al capitalismo occidental.',
            'El desarme absoluto de todos los ejércitos centroamericanos.',
            'La unificación política del Caribe bajo el control exclusivo de la Unión Europea.'
          ],
          correctIndex: 0,
          explanation: 'La polarización de la Guerra Fría alimentó guerras civiles y golpes militares en países centroamericanos como El Salvador, Guatemala y Nicaragua, con apoyo financiado por EE.UU. o la URSS.',
          standard: 'COMPETENCIA: Análisis de perspectivas'
        };
      } else if (qNum === 5) {
        q = {
          id: 5,
          code: 'SOC-005',
          category: 'Independencia Dominicana',
          statement: 'La sociedad secreta "La Trinitaria", fundada por Juan Pablo Duarte el 16 de julio de 1838, fue el motor político de la independencia dominicana. ¿Cuál era el lema trino y las palabras claves de su juramento sacramental?',
          options: [
            '"Libertad, Igualdad y Fraternidad".',
            '"Dios, Patria y Libertad".',
            '"Unión y Progreso Soberano".',
            '"Paz, Orden y Democracia".'
          ],
          correctIndex: 1,
          explanation: 'El juramento trinitario consagra bajo el lema sagrado "Dios, Patria y Libertad" el compromiso indestructible de fundar una República libre, independiente y soberana.',
          standard: 'COMPETENCIA: Historia de la Patria'
        };
      } else if (qNum === 6) {
        q = {
          id: 6,
          code: 'SOC-006',
          category: 'Sistemas Montañosos',
          statement: 'El relieve dominicano destaca por altas elevaciones y picos montañosos singulares. ¿En cuál de las siguientes formaciones montañosas se localiza el "Pico Duarte", el cual representa el punto más alto de las Antillas con exactamente 3,087 metros sobre el nivel del mar?',
          options: [
            'En la Sierra de Bahoruco.',
            'En la Cordillera Septentrional.',
            'En la Cordillera Central.',
            'En la Sierra de Samaná.'
          ],
          correctIndex: 2,
          explanation: 'El Pico Duarte forma parte de la Cordillera Central, eje orográfico principal del relieve de la isla Española.',
          standard: 'COMPETENCIA: Dimensión Espacial de RD'
        };
      } else if (qNum === 7) {
        q = {
          id: 7,
          code: 'SOC-007',
          category: 'Guerra Restauradora',
          statement: 'El 16 de agosto de 1863, un grupo de patriotas dominicanos izó el pabellón tricolor en el cerro de Capotillo, dando inicio a la Guerra de la Restauración. ¿Contra qué potencia monárquica internacional batallaron ferozmente los restauradores para recuperar la República Dominicana?',
          options: [
            'Contra la corona de Francia.',
            'Contra el Reino Unido de Gran Bretaña.',
            'Contra España, debido a la anexión de Pedro Santana en 1861.',
            'Contra el Imperio de los Países Bajos.'
          ],
          correctIndex: 2,
          explanation: 'La Guerra de la Restauración fue un conflicto armado patriótico contra España entre 1863 y 1865 para recuperar nuestro autogobierno.',
          standard: 'COMPETENCIA: Soberanía nacional'
        };
      } else if (qNum === 8) {
        q = {
          id: 8,
          code: 'SOC-008',
          category: 'Derechos Ciudadanos',
          statement: 'De acuerdo con la declaración internacional de Derechos Humanos, los derechos de "Segunda Generación" comprenden principios socioeconómicos y culturales colectivos. ¿Cuál de las siguientes propuestas ilustra plenamente esta categoría constitucional?',
          options: [
            'El derecho a la libre expresión individual y el voto.',
            'El derecho a la integridad física personal.',
            'El derecho a la educación gratuita, salud pública y trabajo digno.',
            'El derecho a habitar en paz interestatal de tercera generación.'
          ],
          correctIndex: 2,
          explanation: 'Los derechos de segunda generación garantizan acceso equitativo a servicios como educación, salud y empleo regulado por el estado de bienestar.',
          standard: 'COMPETENCIA: Educación Cívica'
        };
      } else if (qNum === 9) {
        q = {
          id: 9,
          code: 'SOC-009',
          category: 'Periodo Colonial',
          statement: 'Las llamadas "Devastaciones de Osorio" (1605-1606) ordenadas por la Corona Española despoblaron voluntariamente las bandas norte y oeste de la isla de Santo Domingo. ¿Cuál fue la principal consecuencia geopolítica a largo plazo de esta drástica medida económica civil?',
          options: [
            'El abandono total de la isla por todos los habitantes españoles.',
            'La penetración progresiva de aventureros franceses en la parte despoblada, originando la colonia de Saint-Domingue (actual Haití).',
            'La erradicación definitiva del contrabando en todo el mar Caribe.',
            'La unificación agraria de toda la llanura bajo control inglés.'
          ],
          correctIndex: 1,
          explanation: 'La salida forzada dejó despoblado el oeste de la isla, facilitando el asentamiento de bucaneros y filibusteros franceses que terminaron fundando Saint-Domingue.',
          standard: 'COMPETENCIA: Geopolítica colonial'
        };
      } else if (qNum === 10) {
        q = {
          id: 10,
          code: 'SOC-010',
          category: 'Demografía Dominicana',
          statement: 'El análisis de los censos nacionales de población y vivienda revela asimetrías demográficas significativas. ¿A qué factor socioeconómico primordial se atribuye que más de un 35% de la población resida concentrada en el Gran Santo Domingo?',
          options: [
            'A que el Gran Santo Domingo es el único polo agrícola fértil del país.',
            'A la migración interna masiva atraída por la oferta de universidades, puestos industriales, servicios especializados y oportunidades comerciales y administrativas.',
            'A regulaciones federales del suelo de primera clase.',
            'Al clima alpino característico de la costa norte.'
          ],
          correctIndex: 1,
          explanation: 'La aglomeración urbana del Gran Santo Domingo responde a la centralización histórica de recursos de infraestructura, empleo formal y servicios principales del país.',
          standard: 'COMPETENCIA: Población y Demografía'
        };
      } else if (qNum === 11) {
        q = {
          id: 11,
          code: 'SOC-011',
          category: 'Geografía Dominicana',
          statement: 'La Cordillera Central es la columna vertebral de nuestro relieve. ¿Qué municipio dominicano asentado en este sistema montañoso se caracteriza por su clima templado de montaña y producción hortícola a más de 1,200 metros de altitud?',
          options: [
            'Constanza (La Vega)',
            'Las Terrenas (Samaná)',
            'Pedernales (Provincia Pedernales)',
            'Higüey (La Altagracia)'
          ],
          correctIndex: 0,
          explanation: 'Constanza, ubicado en un valle de la Cordillera Central a unos 1,250 metros sobre el nivel del mar, posee un clima frío y es el polo clave en frutales de clima templado y vegetales.',
          standard: 'COMPETENCIA: Relieve e Hidrografía'
        };
      } else if (qNum === 12) {
        q = {
          id: 12,
          code: 'SOC-012',
          category: 'Historia Dominicana',
          statement: '¿Quién fue el caudillo militar de la primera república que proclamó formalmente la entrega de la soberanía nacional al reino español mediante el acto de la Anexión de 1861?',
          options: [
            'Pedro Santana',
            'Gregorio Luperón',
            'Juan Pablo Duarte',
            'Buenaventura Báez'
          ],
          correctIndex: 0,
          explanation: 'El presidente Pedro Santana proclamó oficialmente la Anexión a España el 18 de marzo de 1861 en Santo Domingo, desencadenando la Guerra Restauradora posterior.',
          standard: 'COMPETENCIA: Historia Dominicana'
        };
      } else if (qNum === 13) {
        q = {
          id: 13,
          code: 'SOC-013',
          category: 'Economía Colonial y Moderna',
          statement: 'Durante finales del siglo XIX, la economía dominicana se transformó con la implantación de los ingenios de vapor. ¿Cuál fue el factor geopolítico caribeño que desencadenó esta llegada de empresarios extranjeros?',
          options: [
            'La Guerra de los Diez Años en Cuba, que provocó la huida de hacendados azucareros cubanos e inversionistas azucareros hacia República Dominicana.',
            'La firma del tratado de libre comercio de Basilea.',
            'El estallido de la Revolución Francesa de 1789.',
            'La ocupación militar estadounidense de Haití de 1915.'
          ],
          correctIndex: 0,
          explanation: 'La Guerra de los Diez Años (1868-1878) devastó Cuba, impulsando a muchos productores azucareros a trasladar su saber técnico e inversiones a San Pedro de Macorís y Santo Domingo.',
          standard: 'COMPETENCIA: Historia Económica'
        };
      } else if (qNum === 14) {
        q = {
          id: 14,
          code: 'SOC-014',
          category: 'Educación Cívica',
          statement: 'La Constitución dominicana reconoce la división tripartita del Estado. ¿Qué alta corte exclusiva ejerce la atribución de juzgar y declarar sentencias vinculantes de inconstitucionalidad contra dictámenes de leyes ordinarias?',
          options: [
            'El Tribunal Constitucional',
            'La Suprema Corte de Justicia',
            'El Tribunal Superior Electoral',
            'Colegio Dominicano de Notarios'
          ],
          correctIndex: 0,
          explanation: 'El Tribunal Constitucional, instituido por la revisión constitucional de 2010, posee la jerarquía exclusiva e inapelable de velar por la supremacía de la Carta Magna dominicana.',
          standard: 'COMPETENCIA: Cívica y Legalidad'
        };
      } else if (qNum === 15) {
        q = {
          id: 15,
          code: 'SOC-015',
          category: 'Geografía y Demografía',
          statement: 'El saldo migratorio interno dominicano ha sido muy activo. ¿Hacia qué provincia del extremo Este dominicano se ha registrado la mayor atracción receptiva demográfica a fines del siglo XX?',
          options: [
            'La Altagracia (impulsado por las cadenas de hoteles de Bávaro y Punta Cana)',
            'Samaná (por la pesca artesanal de camarones)',
            'Dajabón (debido al comercio bilateral informal fronterizo)',
            'Bahoruco (por la cosecha masiva de uvas viníferas)'
          ],
          correctIndex: 0,
          explanation: 'La Altagracia ha experimentado un crecimiento demográfico extraordinario debido a la gran cantidad de empleos creados por la industria hotelera e inversión turística en el Este.',
          standard: 'COMPETENCIA: Demografía Nacional'
        };
      } else if (qNum === 16) {
        q = {
          id: 16,
          code: 'SOC-016',
          category: 'Geografía e Hidrografía Nacional',
          statement: 'El río Yaque del Norte representa la cuenca hidrográfica más extensa de la República Dominicana, naciendo a unos 2,580 metros en el Pico del Yaque y recorriendo 296 kilómetros hasta desembocar en la bahía de Montecristi. ¿De qué manera crítica afecta la creciente deforestación de la ladera montañosa alta a las actividades agrícolas en la llanura del Cibao Occidental?',
          options: [
            'Provoca una erosión severa de suelos, con inundaciones violentas de lodo en épocas lluviosas debido a la pérdida de cobertura vegetal de retención (efecto esponja), seguidas por sequías extremas por reducción de escorrentías reguladas.',
            'Genera un aumento exponencial de sales de fosfato agrícola.',
            'Anula por completo la fuerza de gravedad del agua superficial impidiendo el flujo.',
            'Desplaza todas las capas de placas continentales provocando sismos en Santiago.'
          ],
          correctIndex: 0,
          explanation: 'La pérdida de masa forestal en las cabeceras fluviales anula la capacidad reguladora de la biomasa forestal (efecto esponja). El agua corre libremente erosionando los nutrientes y provocando inundaciones inusitadas durante el temporal de lluvias, dejando los acuíferos vacíos de inmediato.',
          standard: 'COMPETENCIA: Geografía física e impacto humano'
        };
      } else if (qNum === 17) {
        q = {
          id: 17,
          code: 'SOC-017',
          category: 'Cuestiones de Historia Económica',
          statement: 'La dictadura del militar Ulises Heureaux "Lilís" (1882-1899) sumió al país en un fuerte endeudamiento externo que erosionó la soberanía nacional. El hito clave fue el contrato de empréstitos masivos con la compañía neerlandesa Westendorp de 1888, y el subsecuente traspaso de derechos de aduanas a la compañía estadounidense Santo Domingo Improvement Co. ¿Cuáles fueron las catastróficas consecuencias políticas e inflacionarias a la muerte del tirano en 1899?',
          options: [
            'La bancarrota del erario, una crisis inflacionaria extrema por sobreemisión de papel monetario sin respaldo ("papeletas de Lilís"), y el allanamiento del camino hacia la inminente intervención gubernamental de aduanas por EE.UU. en la Convención del 1907.',
            'La anexión total voluntaria de la península de Samaná al Reino Unido.',
            'El auge industrial tecnológico más próspero de toda América Central.',
            'La pacificación definitiva de las pugnas con abolición del caudillismo local.'
          ],
          correctIndex: 0,
          explanation: 'La desastrosa gestión económica de Lilís, con sus "papeletas" sin sustento y la entrega de la recaudación de aduanas a corporaciones extranjeras (Improvement), sumieron al país en default crónico. Tras su ajusticiamiento en Moca, el caos financiero propició la Receptoría de Aduanas de 1905 y el Tratado de 1907.',
          standard: 'COMPETENCIA: Pensamiento histórico crítico'
        };
      } else if (qNum === 18) {
        q = {
          id: 18,
          code: 'SOC-018',
          category: 'Institucionalidad Democrática',
          statement: 'Tras el fin de la dictadura de 31 años de Rafael Leónidas Trujillo, se celebraron las primeras elecciones democráticas libres de la era contemporánea el 20 de diciembre de 1962. ¿Qué emblemático intelectual e historiador dominicano resultó electo presidente bajo la bandera del Partido Revolucionario Dominicano (PRD) y cuál fue el hito constitucional del periodo?',
          options: [
            'El Profesor Juan Bosch; su gestión se caracterizó por redactar una Constitución progresista en 1963 que consagraba derechos de los trabajadores, reforma agraria y libertades civiles extremas, pero que duró solo 7 meses debido a un golpe militar derechista.',
            'El Dr. Joaquín Balaguer; caracterizado por el control de sindicatos armados.',
            'Gregorio Luperón; dedicado al fomento de la caficultura cibaeña.',
            'Monseñor Nouel; cuya presidencia temporal buscaba el arbitrio entre caudillos.'
          ],
          correctIndex: 0,
          explanation: 'El Profesor Juan Bosch asumió en febrero de 1963 e impulsó una de las constituciones de corte democrático, social e histórico más avanzadas del Caribe, despertando recelos de los sectores tradicionales conservadores de la época, lo que motivó el golpe de Estado de septiembre de 1963.',
          standard: 'COMPETENCIA: Institucionalidad democrática dominicana'
        };
      } else if (qNum === 19) {
        q = {
          id: 19,
          code: 'SOC-019',
          category: 'Geografía Económica de Servicios',
          statement: 'A partir de la década de 1970, el modelo económico dominicano experimentó una transición desde una economía eminentemente agroexportadora basada en azúcar, café, tabaco y cacao, hacia el dinamismo de los servicios y manufacturas. ¿Cuáles son los tres pilares de este modelo de inserción globalizada terciaria de finales del siglo XX?',
          options: [
            'El auge extraordinario del turismo receptivo internacional, el desarrollo de las Zonas Francas Industriales de ensamblaje textil, y la captación de remesas enviadas por la diáspora en el exterior.',
            'La producción pesada del sector de la siderurgia, la refinación petroquímica profunda y el cultivo de trigo.',
            'La producción agraria nacional de remolacha y arándanos polares.',
            'La exportación de ganado vacuno industrial a Oriente Medio.'
          ],
          correctIndex: 0,
          explanation: 'Hacia finales del siglo XX, la economía nacional diversificó su estructura. El turismo internacional, las zonas francas fabriles y las remesas de la diáspora sustituyeron la histórica dependencia de los commodities agrícolas tradicionales.',
          standard: 'COMPETENCIA: Análisis socioeconómico nacional'
        };
      } else if (qNum === 20) {
        q = {
          id: 20,
          code: 'SOC-020',
          category: 'Evolución Democrática Constitucional',
          statement: 'La Constitución de Moca, firmada el 19 de febrero de 1858 en la histórica Villa de Moca, es considerada por científicos políticos e historiadores dominicanos como la más liberal y representativa del siglo XIX. ¿Cuál de las siguientes propuestas ilustra la esencia democrática progresista consagrada por los constituyentes mocanos de la época?',
          options: [
            'Estableció el sufragio universal directo, descentralizó las atribuciones de las provincias, abolió la pena de muerte por motivaciones cívicas e ideológicas y limitó rigurosamente las facultades del Presidente.',
            'Declaró la monarquía vitalicia católica obligatoria regulada por un Emperador militar.',
            'Anexó perpetuamente todo el territorio insular caribeño a los Estados Unidos.',
            'Facultó al Presidente de turno para gobernar indefinidamente sin necesidad de un Congreso.'
          ],
          correctIndex: 0,
          explanation: 'La Constitución de Moca de 1858 representó un gran avance democrático. Consagraba libertades individuales completas y descentralizaba el poder presidencial autócrata encarnado por Pedro Santana.',
          standard: 'COMPETENCIA: Pensamiento de historia ciudadana'
        };
      } else if (qNum === 21) {
        q = {
          id: 21,
          code: 'SOC-021',
          category: 'Límites Territoriales',
          statement: 'De acuerdo con el mapa de Convenios Náuticos y Coronas Marinas que define los límites acuáticos en el Mar Caribe, ¿cuál es el país soberano con el cual la República Dominicana comparte su límite fronterizo terrestre directo?',
          options: [
            'Haití (compartiendo una línea divisoria terrestre de aproximadamente 376 km).',
            'Puerto Rico (mediante el canal de la Mona).',
            'Cuba (compartiendo el canal del Viento).',
            'Jamaica (mediante el convenio pesquero austral).'
          ],
          correctIndex: 0,
          explanation: 'La República Dominicana posee posesiones insulares en el Caribe y su única frontera marítimo-terrestre física directa es el vecino país de la República de Haití en el extremo occidental.',
          standard: 'COMPETENCIA: Organización espacial de la geografía'
        };
      } else if (qNum === 22) {
        q = {
          id: 22,
          code: 'SOC-022',
          category: 'Geografía Física y Relieve',
          statement: 'Al observar el perfil topográfico altitudinal en el visualizador, se aprecian los tres sistemas de cordilleras principales de la isla. ¿Cuál de ellos alberga la cima más alta de las Antillas (el Pico Duarte, a unos 3,087 metros)?',
          options: [
            'La Cordillera Central',
            'La Cordillera Septentrional',
            'La Sierra de Neiba',
            'La Sierra de Bahoruco'
          ],
          correctIndex: 0,
          explanation: 'La Cordillera Central es el eje montañoso más imponente del Caribe, albergando las mayores cotas altitudinales como el Pico Duarte (3,087 m) y Valle Nuevo (La Vega).',
          standard: 'COMPETENCIA: Geografía de recursos y relieve'
        };
      } else if (qNum === 23) {
        q = {
          id: 23,
          code: 'SOC-023',
          category: 'Recursos Hidrográficos',
          statement: 'Observe el mapa fluvial dominicano. De los siguientes ríos con gran caudal, ¿cuál es el río más largo del Caribe y el Cibao que desemboca en la Bahía de Montecristi?',
          options: [
            'El río Yaque del Norte',
            'El río Yuna',
            'El río Yaque del Sur',
            'El río Ozama'
          ],
          correctIndex: 0,
          explanation: 'El río Yaque del Norte es el curso fluvial más largo del país y del área de las Antillas, fluyendo a lo largo de 296 kilómetros por el fecundo valle del Cibao hasta desembocar de modo terminal en Montecristi.',
          standard: 'COMPETENCIA: Conservación de recursos de cuencas'
        };
      } else if (qNum === 24) {
        q = {
          id: 24,
          code: 'SOC-024',
          category: 'Educación Cívica y Legal',
          statement: 'En la gráfica de la Pirámide de Kelsen que modela la jerarquía del sistema legislativo dominicano, ¿en qué peldaño supremo y soberano se sitúa la Constitución de la República Dominicana?',
          options: [
            'En el vértice superior de orden absoluto (Bloque de Constitucionalidad).',
            'Debajo de los acuerdos gubernamentales municipales ordinarios.',
            'Alineada en igualdad jurídica con decretos ministeriales simples.',
            'Como reglamento accesorio de las leyes ordinarias del Congreso.'
          ],
          correctIndex: 0,
          explanation: 'La Constitución de la República representa la ley suprema del ordenamiento socio-jurídico nacional. Ninguna ley material, sentencia judicial o disposición presidencial posee validez si contraviene el Bloque de Constitucionalidad.',
          standard: 'COMPETENCIA: Conciencia ciudadana y legal'
        };
      } else if (qNum === 25) {
        q = {
          id: 25,
          code: 'SOC-025',
          category: 'Historia Colonial',
          statement: 'Analice el mapa histórico del Tratado de Ryswick firmado en 1697. ¿Cuál fue el principal resultado de este acuerdo internacional entre España y Francia de cara al territorio dominicano?',
          options: [
            'El reconocimiento y legalización pacífica por parte de la Corona Española de la presencia de colonos franceses en la parte occidental de la isla Española.',
            'La unificación total de la isla bajo el mandato absoluto de la corona de Holanda.',
            'La anexión de la isla al imperio marítimo inglés de ultramar.',
            'El cese inmediato del cultivo comercial del tabaco y la caña de azúcar.'
          ],
          correctIndex: 0,
          explanation: 'El Tratado de Ryswick de 1697 puso fin temporal a la contienda europea de los Nueve Años, marcando el inicio formal de la partición territorial de la isla al reconocer España la ocupación de facto de Francia en el oeste.',
          standard: 'COMPETENCIA: Geopolítica histórica caribeña'
        };
      } else if (qNum === 26) {
        q = {
          id: 26,
          code: 'SOC-026',
          category: 'Cuestiones Demográficas',
          statement: 'Si se analizan los gráficos demográficos del simulador cívico, ¿qué tendencia ilustra el lento pero constante descenso de la tasa bruta de natalidad nacional registrado en las últimas dos décadas del siglo XXI?',
          options: [
            'La transición demográfica nacional con urbanización acelerada, mayor acceso a educación femenina y planificación familiar.',
            'La migración total en masa de toda la población fértil hacia los Andes.',
            'El aumento imprevisto e incontrolable de mortalidad infantil nacional.',
            'Una invasión forzada sin base científica formal.'
          ],
          correctIndex: 0,
          explanation: 'El descenso gradual de natalidad responde a la teoría clásica de transición demográfica, que se asienta en la incorporación activa de la mujer en la producción, el urbanismo masivo y el acceso a bienestar.',
          standard: 'COMPETENCIA: Demografía y tendencias de población'
        };
      } else if (qNum === 27) {
        q = {
          id: 27,
          code: 'SOC-027',
          category: 'Historia General y Descubrimientos',
          statement: 'De acuerdo con el croquis de los viajes atlánticos del almirante italiano Cristóbal Colón de 1492, ¿en qué punto norteño costero de la isla Española se erigió el Fuerte de la Navidad utilizando maderas de la encallada carabela Santa María?',
          options: [
            'Frente a la costa noroccidental de Haití (cerca de la bahía de Caracol).',
            'En las dunas desérticas de Baní.',
            'En la península rocosa de Pedernales.',
            'En el cabo de Samaná.'
          ],
          correctIndex: 0,
          explanation: 'La pérdida de la carabela Santa María el 25 de diciembre de 1492 motivó a Colón a levantar con los maderos la rudimentaria fortificación de la Navidad en el litoral norte de La Española.',
          standard: 'COMPETENCIA: Historia colombina antillana'
        };
      } else if (qNum === 28) {
        q = {
          id: 28,
          code: 'SOC-028',
          category: 'Organizaciones Internacionales',
          statement: 'La diplomacia nacional ha integrado la República Dominicana en múltiples foros globales. ¿De cuál organismo internacional pionero fue nuestro país un Estado fundador originario en la histórica Conferencia de San Francisco de 1945?',
          options: [
            'Organización de las Naciones Unidas (ONU)',
            'Organización de Países Exportadores de Petróleo (OPEP)',
            'Mercado Común del Sur (MERCOSUR)',
            'Organización del Tratado del Atlántico Norte (OTAN)'
          ],
          correctIndex: 0,
          explanation: 'La delegación de la República Dominicana estampó su rúbrica al nacer formalmente la Organización de las Naciones Unidas (ONU) en San Francisco, constituyéndose en uno de los 51 países fundadores históricos.',
          standard: 'COMPETENCIA: Relaciones internacionales y derecho soberano'
        };
      } else if (qNum === 29) {
        q = {
          id: 29,
          code: 'SOC-029',
          category: 'Organización Municipal y Descentralización',
          statement: 'De acuerdo con la Ley de Municipios de la Constitución dominicana resumida en el gráfico del Cabildo, ¿cuál es el órgano fiscalizador responsable de dictaminar las resoluciones y normativas locales del Ayuntamiento municipal?',
          options: [
            'El Concejo de Regidores o Ayuntamiento Municipal.',
            'El despacho del Gobernador Civil de la Provincia.',
            'La Suprema Corte de Justicia en sesión única.',
            'La Policía Nacional Metropolitana local.'
          ],
          correctIndex: 0,
          explanation: 'Los gobiernos locales son colegiados: el Alcalde representa el órgano ejecutivo autónomo, mientras que el Concejo de Regidores ejerce la fiscalización legislativa y reglamentaria en el ayuntamiento.',
          standard: 'COMPETENCIA: Descentralización del poder local'
        };
      } else if (qNum === 30) {
        q = {
          id: 30,
          code: 'SOC-030',
          category: 'Heráldica y Símbolos de Identidad',
          statement: 'El Escudo Nacional de la República Dominicana es rico en heráldica patriótica representada en las banderas y billetes. ¿Qué pasaje o escritura canónica se muestra abiertamente inscrita en el libro del Evangelio de Juan (capítulo 8, verso 32) esculpido en su centro?',
          options: [
            '"Y conoceréis la verdad, y la verdad os hará libres".',
            '"La patria reconciliada por la fuerza creadora".',
            '"Dios, Patria y Libertad absoluto".',
            '"La fe salvará al pueblo dominicano".'
          ],
          correctIndex: 0,
          explanation: 'La Constitución y los estatutos heráldicos determinan que el escudo dominicano posee en el centro una Biblia abierta en el Libro de Juan (8:32) con el célebre verso de iluminación ética y patriótica: "Y conoceréis la verdad, y la verdad os hará libres".',
          standard: 'COMPETENCIA: Identidad nacional e historia ciudadana'
        };
      } else {
        const index = qNum;
        const categories = ['Historia Dominicana', 'Geografía Nacional', 'Educación Cívica', 'Historia de América Latina', 'Geografía y Demografía'];
        const chosenCategory = categories[index % categories.length];

        if (chosenCategory === 'Historia Dominicana') {
          q = {
            id: qNum,
            code: `SOC-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `¿Qué hito militar y patriótico consolidó de forma decisiva el restablecimiento de la soberanía nacional frente a la anexión a España en el siglo XIX dominicano?`,
            options: [
              'La Guerra de la Restauración (1863-1865) liderada por Gregorio Luperón y otros héroes nacionales.',
              'La Batalla del 19 de Marzo en Azua.',
              'La firma del Tratado de Basilea.',
              'La ocupación liderada por Jean-Pierre Boyer.'
            ],
            correctIndex: 0,
            explanation: 'La Guerra de la Restauración, iniciada con el grito de Capotillo en 1863, derrotó a las fuerzas realistas españolas y restauró de forma definitiva la independencia nacional.',
            standard: 'COMPETENCIA: Comprensión social'
          };
        } else if (chosenCategory === 'Geografía Nacional') {
          q = {
            id: qNum,
            code: `SOC-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `La Cordillera Central es el sistema montañoso más imponente de las Antillas. ¿Cuál es su principal impacto climático y fluvial en la geografía de la isla de La Española?`,
            options: [
              'Funciona como divisoria de aguas, originando grandes ríos como el Yaque del Norte y el Yuna, e influye en las lluvias orográficas del Cibao.',
              'Bloquea por completo el paso de masas de viento desde el Atlántico, volviendo desértica la costa norte.',
              'Provoca terremotos de forma volcánica activa mensualmente.',
              'Aísla políticamente de forma absoluta al norte y al sur del país.'
            ],
            correctIndex: 0,
            explanation: 'La Cordillera Central condensa la humedad del viento alisio provocando copiosas lluvias que alimentan las principales cuencas hidrográficas del país (Yaque, Yuna, etc.).',
            standard: 'COMPETENCIA: Geo-Ecología'
          };
        } else if (chosenCategory === 'Educación Cívica') {
          q = {
            id: qNum,
            code: `SOC-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `El sufragio en la República Dominicana se define como un derecho y un deber del ciudadano. Según las leyes electorales, ¿qué características posee constitucionalmente el voto?`,
            options: [
              'Es personal, libre, directo y secreto.',
              'Es obligatorio y público con registro civil obligatorio.',
              'Es negociable y delegado por el jefe de familia.',
              'Es restringido únicamente para propietarios de tierras arables.'
            ],
            correctIndex: 0,
            explanation: 'Constitucionalmente, el voto del ciudadano dominicano es directo, libre de coacción, secreto e individual.',
            standard: 'COMPETENCIA: Dimensión Ciudadana'
          };
        } else if (chosenCategory === 'Historia de América Latina') {
          q = {
            id: qNum,
            code: `SOC-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `¿Qué proceso histórico revolucionario colonial en el Caribe influyó decisivamente en la abolición de la esclavitud y sirvió de inspiración libertaria en toda América Latina a principios del siglo XIX?`,
            options: [
              'La Revolución Haitiana (1791-1804).',
              'El Manifiesto de Santo Domingo.',
              'La Guerra de los Diez Años en Cuba.',
              'El Grito de Lares en Puerto Rico.'
            ],
            correctIndex: 0,
            explanation: 'La Revolución Haitiana culminó en 1804 resultando en la primera república negra independiente del mundo y aboliendo de forma pionera la esclavitud.',
            standard: 'COMPETENCIA: Análisis de perspectivas'
          };
        } else {
          // Geografía y Demografía
          q = {
            id: qNum,
            code: `SOC-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Señale el polo o zona demográfica de mayor densidad de población de la República Dominicana, causada por el éxodo rural en las últimas décadas.`,
            options: [
              'La provincia de Santo Domingo y el Distrito Nacional.',
              'La Línea Noroeste meridional.',
              'El Valle de San Juan de la Maguana.',
              'El Parque Nacional Los Haitises.'
            ],
            correctIndex: 0,
            explanation: 'La Gran Capital (Santo Domingo y Distrito Nacional) posee más de la tercera parte de la población nacional debido a los servicios, industrias y migración interna constante.',
            standard: 'COMPETENCIA: Población y territorio'
          };
        }
      }
      list.push(q);
    }
  } else if (subjectId === 'naturaleza') {
    // 180 Questions for Natural Sciences
    for (let i = 1; i <= 180; i++) {
      const qNum = i;
      let q: Question;

      if (qNum === 1) {
        q = {
          id: 1,
          code: 'NAT-001',
          category: 'Biología y Genética',
          statement: 'Mendel descubrió los principios fundamentales de la herencia genética cruzando plantas de guisantes lisos dominantes (LL) con plantas de guisantes rugosos recesivos (ll). ¿Qué proporción fenotípica de plantas con semillas rugosas se obtendrá en la SEGUNDA generación filial (F2)?',
          options: [
            '100% de plantas rugosas.',
            'Ninguna, todas serán lisas por dominancia completa.',
            'Aproximadamente el 25% (proporción 3:1 de lisas a rugosas).',
            'El 75% serán rugosas y el 25% lisas.'
          ],
          correctIndex: 2,
          explanation: 'En la F1 todos los descendientes son heterocigotos (Ll) y fenotípicamente lisos. Al cruzar Ll x Ll en la F2, el genotipo rugoso homocigoto recesivo (ll) aparece en una proporción del 25% (1/4), cumpliendo la proporción clásica mendeliana de 3 partes dominantes a 1 parte recesiva.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 2) {
        q = {
          id: 2,
          code: 'NAT-002',
          category: 'Química Molecular y Orgánica',
          statement: 'El pH mide el grado de acidez o basicidad de una solución acuosa en una escala de 0 a 14. Dadas las siguientes sustancias medidas en laboratorio: - Leche: pH = 6.5 - Jugo de limón: pH = 2.2 - Jabón de manos: pH = 9.5 - Jugo de manzana: pH = 3.0. ¿Cuál de ellas se clasifica como la sustancia con mayor acidez y por qué?',
          options: [
            'El jabón de manos, porque tiene el pH numéricamente más alto.',
            'La leche, por estar más cerca del pH neutro (7.0).',
            'El jugo de limón, ya que un pH menor a 7 indica acidez, y mientras más bajo o cercano a 0 sea el valor, mayor concentración de iones de hidrógeno posee.',
            'El jugo de manzana, debido a que las frutas procesadas aumentan su basicidad.'
          ],
          correctIndex: 2,
          explanation: 'La acidez es inversamente proporcional al valor de pH en el rango de 0 a 7. El jugo de limón tiene el valor de pH más bajo de todos (2.2), lo que indica que posee la mayor concentración de iones hidronio [H3O+], es decir, es la sustancia más ácida.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 3) {
        q = {
          id: 3,
          code: 'NAT-003',
          category: 'Física y Mecánica',
          statement: 'Un paracaidista se lanza desde un avión en de la Fuerza Aérea. Durante los primeros segundos acelera bajo la acción de la gravedad, pero luego de un corto período de tiempo alcanza una velocidad terminal constante de caída con aceleración cero. ¿A qué se debe físicamente este fenómeno?',
          options: [
            'A que la masa de la persona disminuye debido al rozamiento con las moléculas del aire.',
            'A que la fuerza de gravedad se extingue por completo cuando se abre el paracaídas.',
            'A que la fuerza neta o resultante se vuelve cero debido a que la fricción del viento hacia arriba iguala exactamente la fuerza del peso del paracaidista hacia abajo.',
            'A que se anulan los campos magnéticos locales.'
          ],
          correctIndex: 2,
          explanation: 'La resistencia del aire (fricción o arrastre aerodinámico) aumenta proporcionalmente al cuadrado de la velocidad de caída. Cuando la fuerza de fricción hacia arriba es igual en magnitud al peso hacia abajo, la fuerza resultante es cero, resultando en velocidad terminal constante sin aceleración por equilibrio dinámico.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 4) {
        q = {
          id: 4,
          code: 'NAT-004',
          category: 'Química Atómica',
          statement: 'Al comparar los modelos atómicos históricos, ¿cuál fue la principal contribución experimental del físico Ernest Rutherford utilizando láminas de oro bombardeadas con partículas Alfa?',
          options: [
            'Postuló que el átomo era una esfera sólida uniforme de carga positiva con electrones incrustados (pudín de pasas).',
            'Demostró que el átomo está mayormente vacío y que posee un núcleo central diminuto de carga fuertemente positiva que concentra casi toda la masa, con los electrones girando a su alrededor.',
            'Descubrió el principio de incertidumbre de la mecánica cuántica moderna.',
            'Definió la existencia de subniveles energéticos spdf.'
          ],
          correctIndex: 1,
          explanation: 'El experimento de la lámina de oro de Rutherford evidenció que la mayoría de partículas alfa cruzaban sin desviarse (átomo vacío), pero unas pocas rebotaban con grandes ángulos, probando la existencia de un núcleo positivo denso que repelía las cargas positivas colidentes.',
          standard: 'COMPETENCIA: Aplica procedimientos científicos'
        };
      } else if (qNum === 5) {
        q = {
          id: 5,
          code: 'NAT-005',
          category: 'Ecosistemas y Flujos',
          statement: 'In las cadenas alimenticias terrestres de parques nacionales dominicanos como Jaragua o Los Haitises, el flujo de energía disminuye un 90% de un nivel trófico al siguiente. ¿Cuál es el papel crucial de los organismos descomponedores (bacterias, hongos) en este ciclo biogeoquímico?',
          options: [
            'Generar energía luminosa a partir de oxígeno molecular.',
            'Reciclar la materia orgánica muerta transformándola en nutrientes inorgánicos simples asimilables por los productores (plantas), cerrando el ciclo material de la biosfera.',
            'Actuar como consumidores primarios herbívoros inmediatos.',
            'Eliminar el carbono orgánico sin aportar fertilidad natural.'
          ],
          correctIndex: 1,
          explanation: 'Los descomponedores degradan los restos orgánicos de productores y consumidores de regreso a sales minerales e inertes asimilables por las raíces de los productores primarios, clausurando el ciclo material del ecosistema.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 6) {
        q = {
          id: 6,
          code: 'NAT-006',
          category: 'Leyes de los Gases',
          statement: 'Considere la ley general de los gases ideales modelada por la relación PV = nRT. Bajo un proceso térmico de temperatura constante (isotérmico), si multiplicamos la presión P de un balón por tres, ¿cómo se transformará de forma analítica el volumen V ocupado por la masa gaseosa?',
          options: [
            'El volumen se triplicará exactamente en proporción directa.',
            'El volumen permanecerá exactamente inmutable.',
            'El volumen se reducirá a la tercera parte de su valor original (V / 3), puesto que presión y volumen son inversamente proporcionales por la Ley de Boyle.',
            'El volumen tenderá a infinito por dispersión molecular.'
          ],
          correctIndex: 2,
          explanation: 'De acuerdo con la ley de Boyle para procesos isotérmicos, el producto P * V es constante. Si la presión externa se triplica, el volumen correspondiente debe dividirse por tres para mantener constante el producto.',
          standard: 'COMPETENCIA: Ofrecer explicaciones de leyes'
        };
      } else if (qNum === 7) {
        q = {
          id: 7,
          code: 'NAT-007',
          category: 'Química Orgánica',
          statement: 'El átomo de carbono es la base química estructural de todos los organismos vivos terrestres. ¿A qué propiedad atómica se atribuye que el carbono pueda formar una diversidad infinita de moléculas complejas, cadenas lineales y anillos químicos estables?',
          options: [
            'A su carácter metálico del grupo alcalinotérreo.',
            'A su capacidad de formar enlaces iónicos con el gas helio.',
            'A su tetravalencia, que le permite formar hasta cuatro enlaces covalentes muy estables compartiendo electrones con otros átomos o consigo mismo.',
            'A poseer un pH alcalino altamente reactivo.'
          ],
          correctIndex: 2,
          explanation: 'La tetravalencia estructural del carbono (cuatro electrones libres de valencia) le permite enlazar de forma covalente con hidrógeno, oxígeno, nitrógeno y otros carbonos, dando origen a una inmensa gama de biomoléculas lineales, cíclicas y ramificadas.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 8) {
        q = {
          id: 8,
          code: 'NAT-008',
          category: 'ADN y Herencia',
          statement: 'La molécula helicoidal del Ácido Desoxirribonucleico (ADN) resguarda el código genético completo de las especies. ¿Cuáles son las uniones o parejas complementarias específicas que constituyen los peldaños químicos de la doble hélice de nucleótidos de ADN?',
          options: [
            'Adenina con Uracilo, y Citocina con Guanina.',
            'Adenina con Timina, y Citocina con Guanina.',
            'Guanina con Timina, y Uracilo con Adenina.',
            'Ribosa con Desoxirribosa de forma transversal tridimensional.'
          ],
          correctIndex: 1,
          explanation: 'En la molécula bicatenaria de ADN, de acuerdo a las reglas moleculares de Chargaff, la base púrica Adenina (A) se acopla exclusivamente con la base pirimídica Timina (T) mediante dos puentes de hidrógeno, mientras que la Citocina (C) aparea de forma exclusiva con la Guanina (G) mediante tres puentes de hidrógeno.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 9) {
        q = {
          id: 9,
          code: 'NAT-009',
          category: 'Circuitos Eléctricos',
          statement: 'En el circuito eléctrico de un equipo de medición ambiental en Valle Nuevo, se alimenta una resistencia constante de 5 ohmios aplicando una diferencia de potencial de 12 voltios. ¿Cuál es el valor correspondiente de la intensidad de corriente I que recorre el circuito según la Ley de Ohm?',
          options: [
            'Si aplicamos I = V / R, se obtiene exactamente 2.4 amperios (A).',
            'Se obtiene exactamente 60 amperios (A) por multiplicación de coeficientes.',
            'Se registra 17 amperios (A) de corriente pasiva.',
            'La intensidad es de cero amperios porque se anula la carga de electrones.'
          ],
          correctIndex: 0,
          explanation: 'Por la Ley de Ohm: I = V / R. Sustituyendo las variables dadas: I = 12 V / 5 ohmios = 2.4 Amperios.',
          standard: 'COMPETENCIA: Resolución de problemas de física'
        };
      } else if (qNum === 10) {
        q = {
          id: 10,
          code: 'NAT-010',
          category: 'Efecto Invernadero',
          statement: 'El calentamiento global está impulsado por el aumento de gases de efecto invernadero (como el CO2 y el CH4). ¿Cuál es la descripción física precisa de cómo opera este fenómeno natural de calentamiento en la atmósfera de la Tierra?',
          options: [
            'Lluvias de gases altamente calientes que desciende de forma regular sobre la superficie.',
            'Los gases invernaderos absorben la radiación infrarroja de onda larga (calor) emitida por la superficie terrestre calentada por el Sol, impidiendo que retorne directamente al espacio y reemitiéndola en todas direcciones hacia la superficie.',
            'Destrucción de la capa física de oxígeno respirable.',
            'Atracción gravitatoria de vientos solares cálidos espaciales.'
          ],
          correctIndex: 1,
          explanation: 'La radiación solar de onda corta entra libremente y calienta la Tierra. Al reflejarse al espacio en forma de radiación infrarroja de calor, los gases de efecto invernadero absorben y atrapan parte importante de esta energía del espectro térmico, promoviendo el calentamiento de la tropósfera.',
          standard: 'COMPETENCIA: Ofrecer explicaciones del entorno'
        };
      } else if (qNum === 11) {
        q = {
          id: 11,
          code: 'NAT-011',
          category: 'Fisiología Humana',
          statement: '¿Cuál es la función primaria de las válvulas bicúspide (mitral) y tricúspide ubicadas en el corazón de los mamíferos?',
          options: [
            'Garantizar el flujo unidireccional de la sangre e impedir su reflujo retrógrado desde los ventrículos cardíacos hacia las aurículas.',
            'Producir glóbulos rojos maduros en el flujo de manera constante.',
            'Filtrar sustancias nitrogenadas tóxicas de la sangre en tránsito.',
            'Secretar hormonas glucorreguladoras como el glucagón directamente en la arteria aorta.'
          ],
          correctIndex: 0,
          explanation: 'Estas válvulas auriculoventriculares se cierran firmemente durante la sístole ventricular para evitar la regurgitación o reflujo de la sangre de regreso a las aurículas del corazón.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 12) {
        q = {
          id: 12,
          code: 'NAT-012',
          category: 'Química Orgánica',
          statement: 'El ácido acético es el principal componente del vinagre comercial usado en preparación alimentaria. ¿Cuáles son la estructura atómica y el grupo funcional característicos que definen al conjunto de los ácidos carboxílicos?',
          options: [
            'El grupo carboxilo (-COOH), constituido por un átomo de carbono unido por enlace doble a un oxígeno y por enlace sencillo a un grupo hidroxilo.',
            'El grupo carbonilo simple (-CO-), enlazado de forma puramente lateral.',
            'El grupo amino primario (-NH2), con base nitrogenada alcalina.',
            'El radical alquilo haluro de azufre activo con enlace simple.'
          ],
          correctIndex: 0,
          explanation: 'El grupo funcional ácido carboxílico es el carboxilo -COOH, combinando grupo carbonilo y un grupo hidroxilo sobre el mismo átomo de carbono extremo.',
          standard: 'COMPETENCIA: Aplica procedimientos científicos'
        };
      } else if (qNum === 13) {
        q = {
          id: 13,
          code: 'NAT-013',
          category: 'Física y Electricidad',
          statement: 'De acuerdo con la Ley de Coulomb del electromagnetismo clásico, si duplicamos simultáneamente las magnitudes de dos cargas eléctricas puntuales y mantenemos fija la distancia radial "r" que las separa en el vacío, ¿con qué factor de escala se modifica la fuerza electrostática neta?',
          options: [
            'La fuerza neta se cuadriplica (cambia por un factor de 4).',
            'La fuerza neta se duplica (cambia por un factor de 2).',
            'La fuerza neta disminuye a la mitad (se divide por 2).',
            'La fuerza neta se mantiene inalterada debido a la compensación electrostática.'
          ],
          correctIndex: 0,
          explanation: 'La ley establece que F = k * (q1 * q2) / r². Por lo tanto, duplicando ambas cargas simultáneamente, la constante se multiplica por 2 * 2 = 4 veces de fuerza electrostática.',
          standard: 'COMPETENCIA: Resolución de problemas de física'
        };
      } else if (qNum === 14) {
        q = {
          id: 14,
          code: 'NAT-014',
          category: 'Ecología y Ciclos',
          statement: 'Las bacterias del género Rhizobium fijadoras de nitrógeno que actúan en simbiosis en las raíces de las leguminosas son cruciales. ¿En qué compuesto químico asimilable por los suelos agrícolas transforman primero el nitrógeno gaseoso atmosférico (N₂)?',
          options: [
            'Amoníaco / Amonio (NH₃ / NH₄⁺)',
            'Ozono libre inestable (O₃)',
            'Sulfato de potasio altamente ionizado',
            'Carbonato de calcio sedimentario pesado'
          ],
          correctIndex: 0,
          explanation: 'La enzima nitrogenasa bacteriana reduce el inerte N2 atmosférico a amoníaco / amonio (NH3/NH4+), una forma molecular soluble que las leguminosas y el suelo asimilan de manera ideal.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 15) {
        q = {
          id: 15,
          code: 'NAT-015',
          category: 'Geología y Placas',
          statement: 'El norte dominicano presenta una sismicidad activa debido al contacto de la placa del Caribe con la de Norteamérica. ¿Qué tipo de límite o falla tectónica lateral predomina en la interacción soplada por la falla Septentrional?',
          options: [
            'Límite transformante (desplazamiento lateral horizontal tangencial por cizallamiento entre placas)',
            'Límite divergente por expansión oceánica profunda',
            'Límite de subducción volcánica activa total',
            'Punto caliente magmático de origen volcánico intraplaca'
          ],
          correctIndex: 0,
          explanation: 'La falla Septentrional es una gran falla activa de desgarre horizontal o transformante que libera tensiones de fricción lateral entre las placas del Caribe y de Norteamérica.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 16) {
        q = {
          id: 16,
          code: 'NAT-016',
          category: 'Física Clásica y Fuerzas Dinámicas',
          statement: 'Un automóvil recorre el empinado declive de la carretera montañosa "El Número" entre Baní y Azua, ingresando a una curva horizontal cerrada peraltada. De acuerdo con las Leyes de Newton y el diagrama que visualiza los vectores de fuerza dinámicos, ¿qué condiciones de fricción y fuerza equilibrante son necesarias para impedir el deslizamiento o volcadura del vehículo?',
          options: [
            'La fuerza centrípeta requerida para la rotación lateral es proporcionada por la resultante de la fricción estática entre neumáticos y pavimento, sumada al componente horizontal del soporte normal de inclinación de la calzada.',
            'El deslizamiento ocurre inevitablemente al aumentar la fuerza normal vertical porque el asfalto mojado extingue la fuerza de inercia gravitatoria.',
            'El coeficiente cinético anula las fuerzas centrípetas por efecto de gravedad aceleradora.',
            'La única fuerza interviniente es el rozamiento aerodinámico generado por las hélices interiores del auto.'
          ],
          correctIndex: 0,
          explanation: 'Al transitar por una curva, el guiado del vehículo depende de la fuerza centrípeta dirigida al centro del arco de giro. En una calzada peraltada (con ángulo de inclinación), esta fuerza es suministrada de manera conjunta e ideal por: 1) la componente horizontal de la fuerza normal ejercida por el suelo, y 2) la componente horizontal de la fricción estática lateral de las gomas con el pavimento, asegurando estabilidad dinámica.',
          standard: 'COMPETENCIA: Resolución de problemas de física'
        };
      } else if (qNum === 17) {
        q = {
          id: 17,
          code: 'NAT-017',
          category: 'Ecología Marina y Química de Soluciones',
          statement: 'El fenómeno del blanqueamiento de los arrecifes de coral en el Parque Nacional Cotubanamá en Bayahíbe es provocado por el aumento de temperatura de las aguas y la acidificación oceánica. El incremento del dióxido de carbono CO2 atmosférico absorbido por el mar debilita el esqueleto calcáreo del coral mediante la alteración del equilibrio químico del carbonato soluble de calcio Ca2+ + 2HCO3- <-> CaCO3 + CO2 + H2O. ¿Cuál es el mecanismo químico primario letal que desencadena este blanqueamiento celular de los corales?',
          options: [
            'El CO2 en exceso disminuye el pH del océano (acidificación), reduciendo drásticamente la disponibilidad del ion carbonato CO3^2- necesario para la calcificación e induciendo la expulsión biológica del alga unicelular simbiótica (zooxantela).',
            'La fotosíntesis celular de los pólipos marinos incrementa el contenido de sales salinas líquidas.',
            'Las bacterias anaeróbicas marinas digieren por completo el esqueleto calcáreo en pocas horas.',
            'El aumento del pH oceánico genera un lodo alcalino pesado de hidróxido de calcio que sofoca la piel.'
          ],
          correctIndex: 0,
          explanation: 'La disolución masiva de CO2 ambiental en el mar produce ácido carbónico (H2CO3) que se disocia liberando protones de hidrógeno H+. Estos protones reaccionan vorazmente con los escasos iones carbonato CO3^2-, impidiendo químicamente que los corales sinteticen su duro caparazón protector de carbonato de calcio (CaCO3). Al verse en situación de estrés térmico, el coral estresa y expulsa sus algas simbióticas zooxantelas (que fotosintetizan para nutrirlo), tornándose blanquecino y muriendo en mediano plazo.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 18) {
        q = {
          id: 18,
          code: 'NAT-018',
          category: 'Técnicas de Termodinámica y Energía Solar',
          statement: 'La Planta Solar Fotovoltaica de Monte Plata capta radiación directa para transformarla en energía eléctrica comercial. No obstante, se reporta que durante las horas de mediodía caluroso de verano dominicano, cuando la celda recibe la mayor irradiancia, su eficiencia porcentual energética de conversión decae ligeramente. Al analizar las variables termodinámicas involucradas y el visualizador del circuito fototérmico, ¿cuál es el motivo científico de este desfase físico?',
          options: [
            'Al incrementarse severamente la temperatura calorífica del semiconductor, aumenta la vibración atómica del silicio, incrementando la resistencia del paso de la corriente y disminuyendo el voltaje de salida del circuito.',
            'A que los rayos de sol a mediodía pierden fuerza por un aumento masivo de la fuerza de gravedad local.',
            'A que la luz ultravioleta se transforma espontáneamente en combustible diésel líquido dentro de las placas.',
            'A que la evaporación de aire alrededor del panel corta la escorrentía magnética ambiental.'
          ],
          correctIndex: 0,
          explanation: 'Las celdas solares fotovoltaicas son semiconductores que experimentan el decaimiento de eficiencia térmica conocido como coeficiente de temperatura negativo. Al calentarse las uniones cristalinas de silicio del panel por disipación de calor, se incrementa exponencialmente la recombinación intrínseca de portadores de carga y la resistencia física al paso regular de corriente, lo que deprime los niveles de diferencia de potencial (voltaje) resultantes.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 19) {
        q = {
          id: 19,
          code: 'NAT-019',
          category: 'Genética y Biodiversidad Dominicana',
          statement: 'La Flor Nacional de la República Dominicana es la Rosa de Bayahíbe (Leuenbergeria quisqueyana), un cacto de hojas endémico en peligro crítico de extinción. En un centro experimental de botánica, se cruza un ejemplar homocigoto para flores de color rosa intenso (CrCr) con un ejemplar homocigoto de flores color blanco (CwCw), produciendo una herencia de flores de color rosa pálido intermedio en la generación F1 debido a codominancia o dominancia incompleta. Si cruzamos dos plantas de la generación F1 (CrCw x CrCw), ¿qué porcentaje de fenotipo rosa intenso de colección botánica se obtendrá en la F2?',
          options: [
            'Exactamente el 25% exhibirá el fenotipo original rosa intenso (CrCr).',
            'El 100% será rosa pálido infalible por estabilidad biológica permanente.',
            'Exactamente el 50% exhibirá el color puro blanco botánico.',
            'Un 75% nacerá con flores de color rosa intenso y solo un 25% blanco.'
          ],
          correctIndex: 0,
          explanation: 'Se trata de un clásico caso de dominancia incompleta o codominancia donde el heterocigoto CrCw expresa un fenotipo intermedio (rosa pálido). Al cruzar en la generación F2: CrCw x CrCw, la distribución de la segregación mendeliana resulta en: 25% CrCr (rosa intenso puro), 50% CrCw (rosa pálido intermedio) y 25% CwCw (blanco puro). Por consiguiente, el porcentaje de rosa intenso es del 25%.',
          standard: 'COMPETENCIA: Aplica conocimientos científicos'
        };
      } else if (qNum === 20) {
        q = {
          id: 20,
          code: 'NAT-020',
          category: 'Física Electromagnética e Inducción',
          statement: 'El Parque Eólico Larimar de Enriquillo, Barahona, genera electricidad aprovechando la energía cinética del viento para mover las hélices de las turbinas. Cada turbina mueve un eje interno acoplado a un generador donde se inducen corrientes eléctricas por rotación de imanes y bobinas metálicas cerradas. Indique bajo qué principio físico se fundamenta este valioso proceso ecológico.',
          options: [
            'La Ley de Inducción Electromagnética de Faraday-Lenz, que establece que un flujo magnético variable en el tiempo a través de un circuito conductor induce una fuerza electromotriz (f.e.m.) neta en dicho circuito.',
            'La Ley de Gravitación Universal de Isaac Newton, que mide la fuerza de atracción planetaria de masas.',
            'El Principio de Incertidumbre de Werner Heisenberg, que mide las probabilidades cuánticas en átomos.',
            'La ley de conservación de masas gaseosas de Antoine Lavoisier en fluidos cerrados.'
          ],
          correctIndex: 0,
          explanation: 'La inducción electromagnética es la base técnica de los alternadores de los aerogeneradores. Al rotar las potentes espiras de conductor metálico sometidas a las líneas de flujo de un fuerte imán, la variación periódica del campo magnético inductor induce un campo eléctrico de corriente de gran utilidad industrial.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 20) {
        q = {
          id: 20,
          code: 'NAT-020',
          category: 'Física Electromagnética e Inducción',
          statement: 'El Parque Eólico Larimar de Enriquillo, Barahona, genera electricidad aprovechando la energía cinética del viento para mover las hélices de las turbinas. Cada turbina mueve un eje interno acoplado a un generador donde se inducen corrientes eléctricas por rotación de imanes y bobinas metálicas cerradas. Indique bajo qué principio físico se fundamenta este valioso proceso ecológico.',
          options: [
            'La Ley de Inducción Electromagnética de Faraday-Lenz, que establece que un flujo magnético variable en el tiempo a través de un circuito conductor induce una fuerza electromotriz (f.e.m.) neta en dicho circuito.',
            'La Ley de Gravitación Universal de Isaac Newton, que mide la fuerza de atracción planetaria de masas.',
            'El Principio de Incertidumbre de Werner Heisenberg, que mide las probabilidades cuánticas en átomos.',
            'La ley de conservación de masas gaseosas de Antoine Lavoisier en fluidos cerrados.'
          ],
          correctIndex: 0,
          explanation: 'La inducción electromagnética es la base técnica de los alternadores de los aerogeneradores. Al rotar las potentes espiras de conductor metálico sometidas a las líneas de flujo de un fuerte imán, la variación periódica del campo magnético inductor induce un campo eléctrico de corriente de gran utilidad industrial.',
          standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
        };
      } else if (qNum === 21) {
        q = {
          id: 21,
          code: 'NAT-021',
          category: 'Genómica y ADN',
          statement: 'Al observar el segmento de doble hélice de ADN en proceso de replicación en el visualizador molecular, una hebra de molde posee la secuencia de bases nitrogenadas `5\'-A-T-G-C-C-G-3\'`. ¿Cuál es la secuencia complementaria de bases nitrogenadas que se debe ensamblar siguiendo la complementariedad clásica?',
          options: [
            '`3\'-T-A-C-G-G-C-5\'`',
            '`5\'-U-A-C-G-G-C-3\'`',
            '`3\'-A-T-G-C-C-G-5\'`',
            '`3\'-C-G-T-A-A-T-5\'`'
          ],
          correctIndex: 0,
          explanation: 'La complementariedad del ADN (según los estudios de Watson y Crick) empareja la Adenina con la Timina (A-T) y la Citocina con la Guanina (C-G), manteniendo la antiparalelidad de las cadenas (5\' a 3\' complementa de 3\' a 5\').',
          standard: 'COMPETENCIA: Ofrece explicaciones científicas'
        };
      } else if (qNum === 22) {
        q = {
          id: 22,
          code: 'NAT-022',
          category: 'Dinámica y Movimientos',
          statement: 'En el laboratorio de física, se analiza un bloque de Larimar de masa 2 kg deslizándose por una mesa plana hacia un plano inclinado con un ángulo de 30° respecto a la horizontal. ¿Cuál es el valor del componente de la fuerza de gravedad que tira del bloque de manera paralela a la superficie inclinada (g = 10 m/s^2)?',
          options: [
            '10 N (m * g * sen(30°))',
            '20 N',
            '17.32 N',
            '5 N'
          ],
          correctIndex: 0,
          explanation: 'La fuerza de arrastre paralela al plano inclinado se calcula con F = m * g * sen(θ). Sustituyendo los valores dados: F = 2 kg * 10 m/s^2 * sen(30°) = 20 * 0.5 = 10 Newtons.',
          standard: 'COMPETENCIA: Resolución de problemas de física'
        };
      } else if (qNum === 23) {
        q = {
          id: 23,
          code: 'NAT-023',
          category: 'Química Orgánica',
          statement: 'De acuerdo con la fórmula estructural tridimensional del gas licuado doméstico, identifique cuál de los siguientes hidrocarburos saturados corresponde al gas propano compuesto por tres átomos de carbono.',
          options: [
            'Propano (C3H8)',
            'Metano (CH4)',
            'Etano (C2H6)',
            'Butano (C4H10)'
          ],
          correctIndex: 0,
          explanation: 'El propano es un alcano saturado de fórmula general CnH2n+2. Para n = 3, contiene exactamente tres carbonos y ocho hidrógenos (C3H8).',
          standard: 'COMPETENCIA: Aplica procedimientos científicos'
        };
      } else if (qNum === 24) {
        q = {
          id: 24,
          code: 'NAT-024',
          category: 'Ecología y Biosfera',
          statement: 'Observe la Pirámide Trófica de un bosque nublado de Constanza. Si los productores primarios acumulan 10,000 kJ de energía a partir del sol, ¿cuánta energía asimilan aproximadamente los consumidores secundarios (carnívoros) siguiendo la Ley del Diezmo Ecológico del 10%?',
          options: [
            '100 kJ',
            '1,000 kJ',
            '10 kJ',
            '5,000 kJ'
          ],
          correctIndex: 0,
          explanation: 'Siguiendo la regla del diezmo ecológico o el paso energético del 10% de transferencia trófica: los productores acumulan 10,000 kJ, los consumidores primarios (herbívoros) asimilan el 10% (1,000 kJ), y los consumidores secundarios obtienen el 10% de ese valor, o sea, 100 kJ.',
          standard: 'COMPETENCIA: Ofrece explicaciones científicas'
        };
      } else if (qNum === 25) {
        q = {
          id: 25,
          code: 'NAT-025',
          category: 'Ciencias de la Tierra y el Espacio',
          statement: 'En la costa de la Bahía de Samaná, se suscitan amplios movimientos de mareas diarias. ¿Qué configuración orbital del sistema Sol-Tierra-Luna causa las llamadas "Mareas Vivas" o combinadas, donde se producen las amplitudes de marea más elevadas?',
          options: [
            'Configuración de Alineación (Conjunción u Oposición: Luna Llena o Luna Nueva), sumando los vectores atractivos gravitacionales del Sol y la Luna.',
            'Configuración de Cuadratura (Ángulo recto de 90°: Cuarto Creciente o Cuarto Menguante).',
            'Cuando la Luna se sitúa en su apogeo de órbita elíptica más lejano.',
            'Cuando el Sol eclipsa totalmente el brillo de Venus diurno.'
          ],
          correctIndex: 0,
          explanation: 'Las mareas vivas ocurren cuando el Sol, la Tierra y la Luna se encuentran alineados en línea recta (Luna Nueva/Llena). Las fuerzas de atracción gravitatoria conjunta de ambos astros sobre los océanos se suman algebraicamente, maximizando la amplitud de las mareas.',
          standard: 'COMPETENCIA: Ofrece explicaciones del entorno'
        };
      } else if (qNum === 26) {
        q = {
          id: 26,
          code: 'NAT-026',
          category: 'Química Inorgánica',
          statement: 'Al examinar la escala de pH colorimétrica en el panel de soluciones, se analiza una muestra de jugo de limón de Baní con un pH igual a 2.0. ¿Cómo se clasifica químicamente de forma estricta esta solución y qué concentración de iones hidrógeno posee?',
          options: [
            'Ácido fuerte (alta concentración de iones H+, pH < 7.0).',
            'Básico o alcalino fuerte (baja concentración de iones H+, pH > 7.0).',
            'Neutro de equilibrio químico con nula reactividad de electrones.',
            'Ámbar gaseoso inestable sin base iónica.'
          ],
          correctIndex: 0,
          explanation: 'Las soluciones en la escala de pH de 0 a 14 se dividen en ácidas (pH < 7) y básicas (pH > 7). Un pH de 2 indica una concentración elevada de protones de hidrógeno [H+] = 10^-2 M, catalogándose como una solución ácida fuerte.',
          standard: 'COMPETENCIA: Aplica procedimientos científicos'
        };
      } else if (qNum === 27) {
        q = {
          id: 27,
          code: 'NAT-027',
          category: 'Física y Óptica',
          statement: 'Un rayo de sol penetra sobre una gota de lluvia en el Parque Nacional Valle Nuevo de Constanza. ¿Qué propiedad ondulatoria electromagnética o dispersiva de la luz da origen al arcoíris al refractar en diferentes ángulos según la longitud de onda?',
          options: [
            'Dispersión y refracción cromática de la luz blanca en sus diferentes componentes.',
            'Reflexión especular perfecta en un ángulo plano de 180°.',
            'Absorción fotoeléctrica absoluta de todas las líneas espectrales.',
            'Polarización rectilínea por interferencia del aire montañoso.'
          ],
          correctIndex: 0,
          explanation: 'La luz blanca está compuesta por múltiples longitudes de onda (colores). Al entrar a la gota de agua, cada haz de color se refracta (desvía) con un ángulo propio debido a que el índice de refracción del agua varía con la frecuencia del color, dispersándose espacialmente en el hermoso espectro cromático visible del arcoíris.',
          standard: 'COMPETENCIA: Ofrece explicaciones de leyes'
        };
      } else if (qNum === 28) {
        q = {
          id: 28,
          code: 'NAT-028',
          category: 'Anatomía y Fisiología',
          statement: 'En la red de circulación sanguínea de los seres humanos ilustrada en el diagrama de flujo circulatorio, ¿cuál es la diferencia nuclear operativa en el intercambio gaseoso que distingue a las arterias de las venas?',
          options: [
            'Las arterias transportan sangre rica en oxígeno alejándose del corazón (salvo las arterias pulmonares), mientras que las venas conducen sangre cargada con dióxido de carbono de regreso al órgano cardíaco.',
            'Las arterias carecen por completo de paredes musculares y funcionan por gravedad simple.',
            'Las venas bombean sangre a alta presión y contienen válvulas de presión de gas argón.',
            'Ninguna, ambas transportan de forma exclusiva plasma con nutrientes inorgánicos inactivos.'
          ],
          correctIndex: 0,
          explanation: 'En el sistema cardiovascular cerrado, el flujo arterial sale del corazón a gran presión llevando gases y O2 a los tejidos (circulación sistémica). Los capilares ceden el O2 y absorben CO2 residual, retornando la sangre de regreso a baja presión a través de las venas.',
          standard: 'COMPETENCIA: Ofrece explicaciones científicas'
        };
      } else if (qNum === 29) {
        q = {
          id: 29,
          code: 'NAT-029',
          category: 'Ciencias de la Tierra y Placas',
          statement: 'En el mar de las Antillas, la fosa de Milwaukee representa la fosa marina más profunda del Atlántico Norte. ¿Qué tipo de acción tectónica o choque entre placas continental y oceánica generó esta profunda hondonada abisal?',
          options: [
            'Subducción tectónica (la placa oceánica de Norteamérica se dobla y hunde bajo la placa del Caribe).',
            'Expansión divergente de fondo marino con liberación activa de magma liso.',
            'Falla de cizalladura lateral con levantamiento de picos volcánicos inertes.',
            'Erosión cárstica profunda producida exclusivamente por corrientes de agua termal.'
          ],
          correctIndex: 0,
          explanation: 'La fosa de Milwaukee se ubica en el límite convergente donde reside la fosa de Puerto Rico. El fenómeno de subducción causa que la densa corteza oceánica de la Placa Norteamericana se sumerja bajo la Placa del Caribe, hundiendo el relieve y constituyendo la abismal fosa oceánica.',
          standard: 'COMPETENCIA: Ofrece explicaciones científicas'
        };
      } else if (qNum === 30) {
        q = {
          id: 30,
          code: 'NAT-030',
          category: 'Leyes de la Termodinámica',
          statement: 'El calor solar eleva la temperatura superficial de las playas de Las Terrenas. La atmósfera circundante asciende formando columnas de aire cálido que son luego suplidas por ráfagas frías provenientes de las brisas de alta mar. ¿Qué mecanismo dinámico de transferencia de calor se está describiendo en este comportamiento térmico?',
          options: [
            'Convección térmica (transferencia de calor por movimiento masivo de masas de un fluido).',
            'Conducción molecular directa por contacto físico sólido de materiales.',
            'Radiación electromagnética infrarroja sin necesidad de medio material conductor.',
            'Efecto Joule por calentamiento resistivo de conductores de silicio.'
          ],
          correctIndex: 0,
          explanation: 'La convección es el proceso por el cual el calor se propaga e intercambia en medios móviles líquidos y gaseosos (fluidos), causado por las diferencias de densidad asociadas al gradiente de temperatura local (el fluido caliente sube y el frío baja).',
          standard: 'COMPETENCIA: Ofrece explicaciones del entorno'
        };
      } else {
        const index = qNum;
        const categories = ['Biología Celular', 'Química Inorgánica', 'Dinámica y Movimientos', 'Ecología y Biosfera', 'Evolución de Especies'];
        const chosenCategory = categories[index % categories.length];

        if (chosenCategory === 'Biología Celular') {
          q = {
            id: qNum,
            code: `NAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Los lisosomas se consideran organelos digestivos intracelulares esenciales en células animales. ¿Qué sucedería si por un agente químico se rompieran súbitamente todas las membranas de los lisosomas de una célula sana?`,
            options: [
              'Las enzimas hidrolíticas romperían y degradarían de forma incontrolada las proteínas y organelos en su interior (autólisis).',
              'La célula duplicaría instantáneamente su cantidad de mitocondrias.',
              'Dejaría de entrar agua al citoplasma por osmosis.',
              'El núcleo de la célula se cargaría positivamente.'
            ],
            correctIndex: 0,
            explanation: 'Los lisosomas contienen enzimas digestivas ácidas que requieren mantenerse aisladas de la célula. Al liberarse en el citosol celular, provocan la digestión patológica de la propia célula, llevándola a la muerte celular por autólisis.',
            standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
          };
        } else if (chosenCategory === 'Química Inorgánica') {
          q = {
            id: qNum,
            code: `NAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `¿Qué tipo de enlace químico se forma predominantemente entre átomos de alta electronegatividad (como el oxígeno o cloro) y átomos de baja electronegatividad (como los metales alcalinos del primer grupo)?`,
            options: [
              'Enlace iónico, caracterizado por la transferencia de electrones y atracción electrostática.',
              'Enlace covalente apolar por compartición perfecta.',
              'Enlace metálico flotante.',
              'Fuerzas de dispersión débiles.'
            ],
            correctIndex: 0,
            explanation: 'La gran diferencia de electronegatividad (mayor a 1.7 de Pauling) entre no metales de arriba a la derecha y metales del extremo izquierdo causa una transferencia neta de electrones, formando cationes y aniones que se enlazan iónicamente.',
            standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
          };
        } else if (chosenCategory === 'Dinámica y Movimientos') {
          q = {
            id: qNum,
            code: `NAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Un estudiante aplica una fuerza mecánica constante desconocida sobre un bloque de madera y este se desplaza 8 metros rectilíneos, realizando un trabajo mecánico neto de 200 Julios. ¿Cuál es el valor exacto de la magnitud de la fuerza aplicada si se realiza en dirección paralela al movimiento?`,
            options: [
              '25 Newton',
              '1600 Newton',
              '0.04 Newton',
              '50 Newton'
            ],
            correctIndex: 0,
            explanation: 'La fórmula del trabajo mecánico en dirección al movimiento es T = F * d. Despejando la fuerza: F = T / d = 200 J / 8 m = 25 Newton.',
            standard: 'COMPETENCIA: Aplica procedimientos científicos'
          };
        } else if (chosenCategory === 'Ecología y Biosfera') {
          q = {
            id: qNum,
            code: `NAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Se define como población al conjunto de individuos de una misma especie que habitan un área determinada en un tiempo dado. ¿Cuál es el término correcto para describir la interacción ecológica simbiótica donde ambas especies se benefician mutuamente?`,
            options: [
              'Mutualismo',
              'Parasitismo',
              'Comensalismo',
              'Competencia'
            ],
            correctIndex: 0,
            explanation: 'El mutualismo es la asociación biológica obligatoria o facultativa donde ambas especies involucradas incrementan su adecuación biológica o beneficio mutuo.',
            standard: 'COMPETENCIA: Ofrecer explicaciones científicas'
          };
        } else {
          // Evolución
          q = {
            id: qNum,
            code: `MAT-${String(qNum).padStart(3, '0')}`,
            category: chosenCategory,
            statement: `Un grupo de científicos localiza un estrato rocoso con registros fósiles del periodo Precámbrico. Para determinar la edad exacta de estos fósiles de forma rigurosa, ¿cuál de las siguientes estrategias de datación es preferida?`,
            options: [
              'Rendimiento estructural del carbono-14.',
              'Método de decaimiento radioactivo de isótopos de larga vida como el Uranio-Plomo, ya que el carbono-14 tiene una vida media muy corta para fósiles de millones de años.',
              'La estimación directa de la salinidad de los mares adyacentes.',
              'El conteo simple del número de sedimentos sueltos sobre la corteza.'
            ],
            correctIndex: 2,
            explanation: 'El método del Carbono-14 es válido solo hasta aproximadamente 50,000 años debido a su periodo de semidesintegración de 5,730 años. Para eras geológicas de millones de años se requiere isótopos de vida media larga como Uranio-Plomo o Potasio-Argón.',
            standard: 'COMPETENCIA: Aplica procedimientos científicos'
          };
        }
      }
      list.push(q);
    }
  }

  return list;
}
