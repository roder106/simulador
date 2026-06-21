/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student } from '../components/StudentPortal';

export interface DatabaseBackup {
  version: number;
  backupDate: string;
  students: Student[];
  histories: {
    [rne: string]: any[];
  };
}

/**
 * Robust Client DB Helper with Backup and Restore Capabilities
 * designed perfectly for serverless / stateless environments like GitHub Pages.
 */
export const ClientDatabase = {
  /**
   * Generates a complete backup of the local database schema and records.
   */
  exportDatabase(): DatabaseBackup {
    const backup: DatabaseBackup = {
      version: 1,
      backupDate: new Date().toISOString(),
      students: [],
      histories: {},
    };

    try {
      // 1. Get List of students
      const storedStudents = localStorage.getItem('pruebas_nac_students');
      if (storedStudents) {
        backup.students = JSON.parse(storedStudents);
      }

      // 2. Fetch specific attempt histories for all students
      backup.students.forEach((student) => {
        if (student.rne) {
          const studentHistory = localStorage.getItem(`pruebas_nac_history_${student.rne}`);
          if (studentHistory) {
            try {
              backup.histories[student.rne] = JSON.parse(studentHistory);
            } catch (err) {
              console.error(`Error parsing history for ${student.rne}:`, err);
            }
          }
        }
      });
    } catch (error) {
      console.error('Error exporting client database:', error);
    }

    return backup;
  },

  /**
   * Imports and merges database backup records into the current localStorage context
   */
  importDatabase(backup: any): { success: boolean; studentsAdded: number; message: string } {
    try {
      if (!backup || typeof backup !== 'object') {
        return { success: false, studentsAdded: 0, message: 'El formato de archivo es inválido.' };
      }

      // Basic structure validation
      const backupStudents = Array.isArray(backup.students) ? backup.students : [];
      const backupHistories = backup.histories && typeof backup.histories === 'object' ? backup.histories : {};

      if (backupStudents.length === 0) {
        return { success: false, studentsAdded: 0, message: 'No se encontraron registros de estudiantes en el respaldo.' };
      }

      // Retrieve existing students to prevent duplicates
      let existingStudents: Student[] = [];
      const storedStudents = localStorage.getItem('pruebas_nac_students');
      if (storedStudents) {
        try {
          existingStudents = JSON.parse(storedStudents);
        } catch (e) {
          existingStudents = [];
        }
      }

      let addedCount = 0;
      const mergedStudents = [...existingStudents];

      backupStudents.forEach((newStudent: any) => {
        if (!newStudent.rne) return;

        const isDuplicate = mergedStudents.some(
          (s) => s.rne.toUpperCase() === newStudent.rne.toUpperCase()
        );

        if (!isDuplicate) {
          mergedStudents.push(newStudent);
          addedCount++;
        }

        // Write history for this student
        const historyData = backupHistories[newStudent.rne];
        if (Array.isArray(historyData)) {
          localStorage.setItem(`pruebas_nac_history_${newStudent.rne}`, JSON.stringify(historyData));
        }
      });

      // Save updated student library
      localStorage.setItem('pruebas_nac_students', JSON.stringify(mergedStudents));

      return {
        success: true,
        studentsAdded: addedCount,
        message: `Importación completa. Se agregaron ${addedCount} estudiantes nuevos con su respectivo historial.`,
      };
    } catch (error: any) {
      console.error('Error importing backup:', error);
      return { success: false, studentsAdded: 0, message: `Error al procesar el respaldo: ${error.message}` };
    }
  },

  /**
   * Instantly triggers a native browser download for the JSON backup
   */
  downloadBackup() {
    try {
      const data = this.exportDatabase();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `minerd-simulador-backup-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  },

  /**
   * Resets local storage for active state cleanups
   */
  clearAllDatabase() {
    localStorage.removeItem('pruebas_nac_students');
    localStorage.removeItem('pruebas_nac_active_student');
    // Clear wildcard histories
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('pruebas_nac_history_')) {
        localStorage.removeItem(key);
      }
    }
  }
};
