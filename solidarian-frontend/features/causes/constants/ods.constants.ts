export const ODS_NAMES: Record<number, string> = {
  1: 'Sin Pobreza',
  2: 'Hambre Cero',
  3: 'Salud y Bienestar',
  4: 'Educación de Calidad',
  5: 'Igualdad de Género',
  6: 'Agua Limpia y Saneamiento',
  7: 'Energía Asequible',
  8: 'Trabajo Decente',
  9: 'Industria e Innovación',
  10: 'Reducción de Desigualdades',
  11: 'Ciudades Sostenibles',
  12: 'Consumo Responsable',
  13: 'Acción por el Clima',
  14: 'Vida Submarina',
  15: 'Vida de Ecosistemas Terrestres',
  16: 'Paz e Instituciones',
  17: 'Alianzas para Objetivos',
};

export function getSortedOds(odsNumbers: number[]): Array<{ num: number; name: string }> {
  if (odsNumbers.length === 0) return [];

  return odsNumbers.map(num => ({ num, name: ODS_NAMES[num] || 'Desconocido' })).sort((a, b) => a.num - b.num);
}
