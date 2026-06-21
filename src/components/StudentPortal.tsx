/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { User, UserPlus, BookOpen, AlertCircle, ArrowRight, Trash2, Database, Download, Upload, Settings, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { ClientDatabase } from '../utils/db';

export interface Student {
  id: string; // Will act as RNE
  name: string;
  lastName1: string;
  lastName2: string;
  birthDate: string;
  schoolName: string;
  grade: string;
  section: string;
  rne: string;
}

interface StudentPortalProps {
  onSelectStudent: (student: Student) => void;
  activeStudent: Student | null;
  onLogout: () => void;
}

export default function StudentPortal({ onSelectStudent, activeStudent, onLogout }: StudentPortalProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Database backup/import state
  const [isDbToolsOpen, setIsDbToolsOpen] = useState(false);
  const [dbImportSuccessMessage, setDbImportSuccessMessage] = useState('');
  const [dbImportErrorMessage, setDbImportErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Registration form state
  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [schoolName, setSchoolName] = useState('Liceo Secundario República Dominicana');
  const [grade, setGrade] = useState('6to de Secundaria');
  const [section, setSection] = useState('A');
  const [errorCode, setError] = useState('');

  // Login form state
  const [loginRne, setLoginRne] = useState('');
  const [loginError, setLoginError] = useState('');
  const [copiedRne, setCopiedRne] = useState(false);

  const handleCopyRne = (rne: string) => {
    navigator.clipboard.writeText(rne);
    setCopiedRne(true);
    setTimeout(() => setCopiedRne(false), 2000);
  };

  // Delete profile state
  const [rneToDelete, setRneToDelete] = useState<string | null>(null);

  // Load students from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pruebas_nac_students');
      if (stored) {
        setStudents(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveStudents = (list: Student[]) => {
    setStudents(list);
    localStorage.setItem('pruebas_nac_students', JSON.stringify(list));
  };

  // Helper to generate the official Dominican RNE format
  const generateRNE = (n: string, l1: string, l2: string, bDate: string): string => {
    const cleanStr = (str: string) => {
      return (str || '').trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    };

    const cName = cleanStr(n);
    const cL1 = cleanStr(l1);
    const cL2 = cleanStr(l2);

    const fN = cName[0] || 'X';
    const fL1 = cL1[0] || 'X';
    const fL2 = cL2[0] || 'X';

    // Birthdate format: YYYY-MM-DD
    const dateParts = bDate.split('-');
    let yy = '00';
    let mm = '01';
    let dd = '01';

    if (dateParts.length === 3) {
      yy = dateParts[0].slice(-2); // last two digits of year
      mm = dateParts[1];
      dd = dateParts[2];
    }

    // Add four digits of count/random
    const randCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Standard RNE: e.g., JZR0606201004 (J + Z + R + YY + MM + DD + RAND)
    return `${fN}${fL1}${fL2}${yy}${mm}${dd}${randCode}`;
  };

  const handleExportDB = () => {
    ClientDatabase.downloadBackup();
  };

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDbImportSuccessMessage('');
    setDbImportErrorMessage('');
    
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const result = ClientDatabase.importDatabase(parsed);
        if (result.success) {
          setDbImportSuccessMessage(result.message);
          const stored = localStorage.getItem('pruebas_nac_students');
          if (stored) {
            setStudents(JSON.parse(stored));
          }
        } else {
          setDbImportErrorMessage(result.message);
        }
      } catch (err) {
        setDbImportErrorMessage('El archivo no tiene un formato de respaldo JSON válido.');
      }
    };
    reader.readAsText(file);
    
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !lastName1.trim() || !lastName2.trim() || !birthDate) {
      setError('Por favor complete todos los datos requeridos.');
      return;
    }

    const rne = generateRNE(name, lastName1, lastName2, birthDate);

    const newStudent: Student = {
      id: rne, // ID is the unique RNE
      name: name.trim(),
      lastName1: lastName1.trim(),
      lastName2: lastName2.trim(),
      birthDate,
      schoolName: schoolName.trim(),
      grade,
      section,
      rne,
    };

    // Prevent duplicates if by chance it exists
    if (students.find(s => s.rne === rne)) {
      setError('Este estudiante ya está registrado.');
      return;
    }

    const updated = [newStudent, ...students];
    saveStudents(updated);
    
    // Auto select the new student
    onSelectStudent(newStudent);

    // Reset Form
    setName('');
    setLastName1('');
    setLastName2('');
    setBirthDate('');
    setIsRegistering(false);
  };

  const handleLoginByRNE = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const cleanRne = loginRne.trim().toUpperCase();
    if (cleanRne.length < 4) {
      setLoginError('Por favor ingrese un RNE válido (mínimo 4 caracteres).');
      return;
    }
    const found = students.find(s => s.rne.toUpperCase() === cleanRne);
    if (found) {
      onSelectStudent(found);
      setLoginRne('');
    } else {
      // Auto-register student if not found in local storage
      const newStudent: Student = {
        id: cleanRne,
        name: 'Estudiante',
        lastName1: 'RNE',
        lastName2: cleanRne.slice(0, Math.min(3, cleanRne.length)),
        birthDate: new Date().toISOString().split('T')[0],
        schoolName: 'Liceo Secundario República Dominicana',
        grade: '6to de Secundaria',
        section: 'A',
        rne: cleanRne,
      };
      const updated = [newStudent, ...students];
      saveStudents(updated);
      onSelectStudent(newStudent);
      setLoginRne('');
    }
  };

  const handleDeleteStudent = (rne: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid selecting
    setRneToDelete(rne);
  };

  if (activeStudent) {
    return (
      <div id="student-active-card" className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
              {activeStudent.name[0]}{activeStudent.lastName1[0]}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-slate-800 text-lg break-words">
                {activeStudent.name} {activeStudent.lastName1} {activeStudent.lastName2}
              </h3>
              <p className="text-sm font-mono text-blue-600 flex items-center gap-1.5 mt-0.5">
                <span className="font-sans text-slate-400 uppercase text-[10px] font-bold tracking-wider">RNE:</span> {activeStudent.rne}
                <button
                  onClick={() => handleCopyRne(activeStudent.rne)}
                  className="ml-2 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-650 px-2 py-0.5 rounded font-sans font-bold cursor-pointer transition shrink-0"
                  title="Copiar RNE"
                >
                  {copiedRne ? '✅ ¡Copiado!' : '📋 Copiar'}
                </button>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-500">
                <span className="break-words"><strong>Centro:</strong> {activeStudent.schoolName}</span>
                <span className="hidden sm:inline">•</span>
                <span className="break-words"><strong>Clase/Sección:</strong> {activeStudent.grade} ({activeStudent.section})</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0 border-t pt-3 md:border-t-0 md:pt-0">
            <button
              id="btn-logout"
              onClick={onLogout}
              className="text-xs font-bold px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              🚪 Cerrar Sesión
            </button>
            <button
              id="bg-delete-profile-immediate"
              onClick={(e) => handleDeleteStudent(activeStudent.rne, e)}
              className="text-xs font-bold px-3.5 py-2 border border-rose-200 hover:bg-rose-50 hover:border-rose-350 text-rose-600 rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" /> Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="portal-container" className="w-full max-w-xl mx-auto my-4 sm:my-12 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* MINERD Public Banner Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 p-5 sm:p-8 text-white relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-wider uppercase opacity-85 font-semibold">República Dominicana</div>
            <div id="portal-minerd-badge" className="text-xs uppercase font-bold text-yellow-300 mt-0.5">Ministerio de Educación (MINERD)</div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1.5">Simulador de Pruebas Nacionales</h1>
            <p className="text-xs opacity-90 mt-1 max-w-sm">Evaluación basada en competencias para el último año de Secundaria.</p>
          </div>
          {/* Virtual stamp */}
          <div className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-white/20 rounded-full flex items-center justify-center rotate-12 opacity-80 select-none shrink-0 self-start sm:self-auto">
            <span className="text-[7.5px] sm:text-[8px] text-center font-bold tracking-tight uppercase leading-tight text-white/90">MINERD<br/>6to Sec.</span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8">
        {!isRegistering ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-5.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" /> Ingresar al Simulador
              </h2>
              <button
                id="btn-register-mode"
                onClick={() => setIsRegistering(true)}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition cursor-pointer self-start sm:self-auto"
              >
                <UserPlus className="h-4 w-4" /> Crear Perfil Estudiante
              </button>
            </div>

            {/* Traditional RNE Login Input Form */}
            <form onSubmit={handleLoginByRNE} className="space-y-4 mb-6 bg-slate-50 border border-slate-200/80 p-5 rounded-2xl">
              <div>
                <label className="block text-xs font-extrabold text-slate-600 mb-1.5 uppercase tracking-wide">Código de Estudiante (RNE)</label>
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Ej: JZR0606207754"
                    value={loginRne}
                    onChange={(e) => setLoginRne(e.target.value.toUpperCase())}
                    className="flex-1 text-sm font-mono px-3.5 py-2.5 border border-slate-205 rounded-xl focus:border-blue-500 focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition duration-150 hover:scale-101 active:scale-95 cursor-pointer shrink-0"
                  >
                    Ingresar
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  * Si es tu primera vez ingresando con este RNE, el sistema creará automáticamente tu perfil local.
                </p>
              </div>
              {loginError && (
                <div className="p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 font-bold" />
                  <span>{loginError}</span>
                </div>
              )}
            </form>

            {students.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl bg-white">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium text-sm">No hay perfiles de RNE guardados.</p>
                <p className="text-xs text-slate-400 mt-1 mb-5">Cree su perfil gratis para registrar cuadernillos y planes de refuerzo.</p>
                <button
                  onClick={() => setIsRegistering(true)}
                  className="bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" /> Registrar mi primer estudiante
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">O accede con un perfil guardado en este equipo:</p>
                <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                  {students.map(student => (
                    <div
                      key={student.rne}
                      id={`student-profile-${student.rne}`}
                      onClick={() => onSelectStudent(student)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 rounded-2xl cursor-pointer group transition duration-200 gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="h-10 w-10 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-full flex items-center justify-center font-bold text-sm select-none shrink-0">
                          {student.name[0]}{student.lastName1[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-700 text-sm group-hover:text-slate-900 transition truncate">
                            {student.name} {student.lastName1} {student.lastName2}
                          </div>
                          <div className="text-xs font-mono text-blue-500 group-hover:text-blue-650 tracking-tight font-extrabold mt-0.5">{student.rne}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 truncate" title={student.schoolName}>
                            {student.schoolName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-start border-t pt-2.5 sm:border-t-0 sm:pt-0 sm:gap-3">
                        <span className="text-[9.5px] font-bold text-slate-400 sm:hidden uppercase tracking-wider">Acceder a este perfil</span>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition duration-200" />
                          <button
                            title="Eliminar Perfil"
                            onClick={(e) => handleDeleteStudent(student.rne, e)}
                            className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
              <UserPlus className="h-5 w-5 text-blue-600" /> Nuevo Registro de Estudiante
            </h2>

            {errorCode && (
              <div className="p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorCode}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre(s) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Andrés"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Primer Apellido *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Zorrrilla"
                  value={lastName1}
                  onChange={(e) => setLastName1(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Segundo Apellido *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Reyes"
                  value={lastName2}
                  onChange={(e) => setLastName2(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Fecha de Nacimiento *</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Liceo / Colegio de Procedencia *</label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Año Escolar</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-600"
                >
                  <option value="6to de Secundaria">6to de Secundaria</option>
                  <option value="Pre-Universitario (MINERD)">Pre-Universitario (MINERD)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sección *</label>
                <input
                  type="text"
                  required
                  maxLength={3}
                  value={section}
                  onChange={(e) => setSection(e.target.value.toUpperCase())}
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="w-1/2 text-xs font-bold px-4 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-sm transition duration-200 focus:ring-2 focus:ring-blue-500/20 active:scale-95"
              >
                Crear y Entrar RNE
              </button>
            </div>
            
            <p className="mt-4 text-[10px] leading-relaxed text-slate-400 text-center">
              * El RNE (Registro Nacional de Estudiante) es un código oficial calculado de acuerdo a las siglas de sus nombres y su fecha de nacimiento, utilizado para gestionar los registros académicos en el Ministerio de Educación (MINERD).
            </p>
          </form>
        )
      }

      {/* Base de Datos & GitHub Pages Config Section */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setIsDbToolsOpen(!isDbToolsOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-500 hover:text-slate-700 tracking-wider uppercase py-2 select-none cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Database className="h-4 w-4 text-blue-500" />
            Base de Datos y Respaldos (GitHub Pages)
          </span>
          {isDbToolsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isDbToolsOpen && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-4 animate-fade-in">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong>¿Cómo funciona?</strong> Dado que GitHub Pages aloja sitios estáticos sin servidor de base de datos tradicional, este simulador implementa una base de datos local en el navegador (LocalStorage) de alta persistencia. Para asegurar tu información al cambiar de dispositivo, borrar caché o migrar, puedes usar estos controles de respaldo:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Export Action */}
              <button
                type="button"
                onClick={handleExportDB}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-705 hover:text-slate-900 font-bold text-xs px-4 py-3 rounded-xl transition cursor-pointer shadow-2xs"
              >
                <Download className="h-4 w-4 text-emerald-500" />
                Exportar Base de Datos (JSON)
              </button>

              {/* Import Action */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-705 hover:text-slate-900 font-bold text-xs px-4 py-3 rounded-xl transition cursor-pointer shadow-2xs"
              >
                <Upload className="h-4 w-4 text-blue-500" />
                Importar Respaldo (JSON)
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFileChange}
              accept=".json"
              className="hidden"
            />

            {/* Import feedback messages */}
            {dbImportSuccessMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{dbImportSuccessMessage}</span>
              </div>
            )}

            {dbImportErrorMessage && (
              <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{dbImportErrorMessage}</span>
              </div>
            )}

            {/* Guide for GH Pages Migration */}
            <div className="bg-slate-100 rounded-lg p-3.5 border border-slate-200 text-[10.5px] text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <Settings className="h-3.5 w-3.5 text-blue-600" />
                Guía de Preparación para Publicar en GitHub Pages:
              </div>
              <ol className="list-decimal pl-4.5 space-y-1">
                <li><strong>Base-Path Configurado:</strong> La plataforma tiene el base-path configurado a <code className="bg-white px-1 py-0.5 rounded font-mono border text-slate-800">./</code>, lo cual permite que tus recursos carguen correctamente bajo cualquier nombre de repositorio de GitHub sin romperse.</li>
                <li><strong>Despliegue Estático:</strong> No necesitas un servidor caro. Sube el código a tu cuenta de GitHub, activa la función de <strong>GitHub Pages</strong> y selecciona la carpeta de compilación estática.</li>
                <li><strong>Cero Pérdida de Datos:</strong> Los estudiantes guardan sus estadísticas y nombres de forma instantánea. Si necesitan cambiar de ordenador, descargan su respaldo JSON y lo importan con un clic.</li>
              </ol>
            </div>
          </div>
        )}
      </div>


      {rneToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-800">¿Eliminar perfil de estudiante?</h3>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Esta acción eliminará de forma irreversible el perfil del estudiante con RNE <strong>{rneToDelete}</strong> de este dispositivo. Se perderán el historial y las estadísticas locales de simulacros.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setRneToDelete(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = students.filter(s => s.rne !== rneToDelete);
                  saveStudents(updated);
                  if (activeStudent && (activeStudent as any).rne === rneToDelete) {
                    onLogout();
                  }
                  setRneToDelete(null);
                }}
                className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer"
              >
                Eliminar definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
