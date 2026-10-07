/**
 * Utility to export JavaScript arrays of objects to UTF-8 CSV (Excel Compatible)
 */

export interface CsvColumn<T> {
  header: string;
  key: keyof T | ((item: T) => string | number | null | undefined);
}

export function exportToCsv<T>(filename: string, data: T[], columns: CsvColumn<T>[]) {
  if (!data || data.length === 0) {
    throw new Error('Tidak ada data yang dapat diekspor.');
  }

  // Header row
  const headers = columns.map((col) => `"${escapeCsv(col.header)}"`);

  // Data rows
  const rows = data.map((item) =>
    columns.map((col) => {
      let val: any;
      if (typeof col.key === 'function') {
        val = col.key(item);
      } else {
        val = item[col.key];
      }

      if (val === null || val === undefined) {
        val = '';
      }

      return `"${escapeCsv(String(val))}"`;
    }).join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\r\n');

  // Add UTF-8 BOM so Excel opens special Indonesian characters and accents properly
  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${formatDateForFilename(new Date())}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsv(str: string): string {
  return str.replace(/"/g, '""');
}

function formatDateForFilename(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}
