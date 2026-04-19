export const SUSTAINABLE_DEVELOPMENT_GOAL: Record<string, string> = {
  NoPoverty: 'Sin Pobreza',
  ZeroHunger: 'Hambre Cero',
  GoodHealthAndWellBeing: 'Salud y Bienestar',
  QualityEducation: 'Educación de Calidad',
  GenderEquality: 'Igualdad de Género',
  CleanWaterAndSanitation: 'Agua Limpia y Saneamiento',
  AffordableAndCleanEnergy: 'Energía Asequible',
  DecentWorkAndEconomicGrowth: 'Trabajo Decente',
  IndustryInnovationAndInfrastructure: 'Industria e Innovación',
  ReducedInequalities: 'Reducción de Desigualdades',
  SustainableCitiesAndCommunities: 'Ciudades Sostenibles',
  ResponsibleConsumptionAndProduction: 'Consumo Responsable',
  ClimateAction: 'Acción por el Clima',
  LifeBelowWater: 'Vida Submarina',
  LifeOnLand: 'Vida de Ecosistemas Terrestres',
  PeaceJusticeAndStrongInstitutions: 'Paz e Instituciones',
  PartnershipsForTheGoals: 'Alianzas para Objetivos',
};

export function getSortedOds(odsValues: readonly string[]) {
  return [...odsValues]
    .map(ods => {
      const num = Object.keys(SUSTAINABLE_DEVELOPMENT_GOAL).indexOf(ods) + 1;
      return num > 0 ? { num, name: SUSTAINABLE_DEVELOPMENT_GOAL[ods] } : null;
    })
    .filter((ods): ods is { num: number; name: string } => ods !== null)
    .sort((a, b) => a.num - b.num);
}
