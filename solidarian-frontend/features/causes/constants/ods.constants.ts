export type OdsId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17;

export interface OdsOption {
  id: OdsId;
  label: string;
}

export const ODS_LABELS: Record<OdsId, string> = {
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

const ODS_ENUM_NAME_TO_ID: Record<string, OdsId> = {
  NoPoverty: 1,
  ZeroHunger: 2,
  GoodHealthAndWellBeing: 3,
  QualityEducation: 4,
  GenderEquality: 5,
  CleanWaterAndSanitation: 6,
  AffordableAndCleanEnergy: 7,
  DecentWorkAndEconomicGrowth: 8,
  IndustryInnovationAndInfrastructure: 9,
  ReducedInequalities: 10,
  SustainableCitiesAndCommunities: 11,
  ResponsibleConsumptionAndProduction: 12,
  ClimateAction: 13,
  LifeBelowWater: 14,
  LifeOnLand: 15,
  PeaceJusticeAndStrongInstitutions: 16,
  PartnershipsForTheGoals: 17,
};

export const ODS_OPTIONS: ReadonlyArray<OdsOption> = (Object.keys(ODS_LABELS) as Array<`${OdsId}`>).map(key => {
  const id = Number(key) as OdsId;
  return { id, label: `${ODS_LABELS[id]}` };
});

export function toOdsId(value: number | string): OdsId | null {
  if (typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 17) {
    return value as OdsId;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 17) {
      return parsed as OdsId;
    }

    return ODS_ENUM_NAME_TO_ID[value] ?? null;
  }

  return null;
}

export function getSortedOds(odsValues: ReadonlyArray<number | string>) {
  return [...odsValues]
    .map(toOdsId)
    .filter((ods): ods is OdsId => ods !== null)
    .map(num => ({ num, name: ODS_LABELS[num] }))
    .sort((a, b) => a.num - b.num);
}
