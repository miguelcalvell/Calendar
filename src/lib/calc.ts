import type { Animal, AnimalType, DietType, SpeciesId } from '@/types'

export interface DietPhaseSpec {
  fase: DietType
  pb_min_pct: number
  ca_min_pct?: number
  ca_max_pct?: number
  me_kcal_kg?: number
  notas?: string
}

export type SpeciesGroup = 'gallina' | 'pavo' | 'otro'
export type SpeciesSex = 'macho' | 'hembra' | 'mixto'

interface SpeciesReproductionBounds {
  tasa_min?: number
  tasa_max?: number
  peso_huevo_min?: number
  peso_huevo_max?: number
}

export interface SpeciesDefinition {
  id: SpeciesId
  nombre: string
  peso_vivo_defecto_kg: number
  fs_max: number
  k_forage: number
  dietas: DietPhaseSpec[]
  grupo: SpeciesGroup
  sexo: SpeciesSex
  k_MEm?: number
  reproduction?: SpeciesReproductionBounds
  defaults?: {
    fase?: DietType
    tasa_puesta?: number
    peso_huevo_g?: number
  }
}

export const SPECIES_CATALOG: Record<SpeciesId, SpeciesDefinition> = {
  gallina_ponedora: {
    id: 'gallina_ponedora',
    nombre: 'Gallina ponedora',
    peso_vivo_defecto_kg: 1.8,
    fs_max: 0.15,
    k_forage: 0.35,
    grupo: 'gallina',
    sexo: 'hembra',
    defaults: { fase: 'layer', tasa_puesta: 0.75, peso_huevo_g: 58 },
    dietas: [
      { fase: 'layer', pb_min_pct: 16, ca_min_pct: 3.5, ca_max_pct: 4, me_kcal_kg: 2800, notas: 'Añadir concha libre.' },
      { fase: 'allflock', pb_min_pct: 16, ca_min_pct: 1, ca_max_pct: 1.2, me_kcal_kg: 2850 },
    ],
  },
  gallo: {
    id: 'gallo',
    nombre: 'Gallo',
    peso_vivo_defecto_kg: 3,
    fs_max: 0.2,
    k_forage: 0.35,
    grupo: 'gallina',
    sexo: 'macho',
    defaults: { fase: 'allflock' },
    dietas: [
      { fase: 'allflock', pb_min_pct: 16, ca_min_pct: 0.8, ca_max_pct: 1.2, me_kcal_kg: 2900 },
      { fase: 'grower', pb_min_pct: 18, ca_min_pct: 0.8, ca_max_pct: 1.2, me_kcal_kg: 2900 },
    ],
  },
  kika: {
    id: 'kika',
    nombre: 'Gallina enana (kika)',
    peso_vivo_defecto_kg: 1,
    fs_max: 0.18,
    k_forage: 0.35,
    grupo: 'gallina',
    sexo: 'hembra',
    k_MEm: 100,
    reproduction: {
      tasa_max: 0.65,
      peso_huevo_max: 42,
    },
    defaults: { fase: 'layer', tasa_puesta: 0.65, peso_huevo_g: 42 },
    dietas: [
      { fase: 'layer', pb_min_pct: 16, ca_min_pct: 3.5, ca_max_pct: 4, me_kcal_kg: 2800 },
      { fase: 'allflock', pb_min_pct: 16, ca_min_pct: 1, ca_max_pct: 1.2, me_kcal_kg: 2850 },
    ],
  },
  kiko: {
    id: 'kiko',
    nombre: 'Gallo enano (kiko)',
    peso_vivo_defecto_kg: 1.2,
    fs_max: 0.2,
    k_forage: 0.35,
    grupo: 'gallina',
    sexo: 'macho',
    defaults: { fase: 'allflock' },
    dietas: [{ fase: 'allflock', pb_min_pct: 16, ca_min_pct: 0.8, ca_max_pct: 1.1, me_kcal_kg: 2900 }],
  },
  pavo_hembra: {
    id: 'pavo_hembra',
    nombre: 'Pavo hembra',
    peso_vivo_defecto_kg: 6,
    fs_max: 0.25,
    k_forage: 0.3,
    grupo: 'pavo',
    sexo: 'hembra',
    defaults: { fase: 'adulto' },
    dietas: [
      { fase: 'starter', pb_min_pct: 28, me_kcal_kg: 2950 },
      { fase: 'grower', pb_min_pct: 21, me_kcal_kg: 3000 },
      { fase: 'finisher', pb_min_pct: 16, me_kcal_kg: 3000 },
      { fase: 'adulto', pb_min_pct: 16, ca_min_pct: 0.9, ca_max_pct: 1.2, me_kcal_kg: 3000 },
    ],
  },
  pavo_macho: {
    id: 'pavo_macho',
    nombre: 'Pavo macho',
    peso_vivo_defecto_kg: 12,
    fs_max: 0.25,
    k_forage: 0.3,
    grupo: 'pavo',
    sexo: 'macho',
    defaults: { fase: 'adulto' },
    dietas: [
      { fase: 'starter', pb_min_pct: 28, me_kcal_kg: 2950 },
      { fase: 'grower', pb_min_pct: 21, me_kcal_kg: 3000 },
      { fase: 'finisher', pb_min_pct: 16, me_kcal_kg: 3000 },
      { fase: 'adulto', pb_min_pct: 16, ca_min_pct: 0.9, ca_max_pct: 1.2, me_kcal_kg: 3000 },
    ],
  },
  pavoreal_hembra: {
    id: 'pavoreal_hembra',
    nombre: 'Pavo real hembra',
    peso_vivo_defecto_kg: 3.5,
    fs_max: 0.25,
    k_forage: 0.3,
    grupo: 'pavo',
    sexo: 'hembra',
    defaults: { fase: 'gamebird_adulto', tasa_puesta: 0.4, peso_huevo_g: 80 },
    dietas: [
      { fase: 'starter', pb_min_pct: 28, me_kcal_kg: 2950 },
      { fase: 'grower', pb_min_pct: 20, me_kcal_kg: 3000 },
      { fase: 'gamebird_adulto', pb_min_pct: 21, ca_min_pct: 0.9, ca_max_pct: 1.2, me_kcal_kg: 3000 },
    ],
  },
  pavoreal_macho: {
    id: 'pavoreal_macho',
    nombre: 'Pavo real macho',
    peso_vivo_defecto_kg: 4.5,
    fs_max: 0.25,
    k_forage: 0.3,
    grupo: 'pavo',
    sexo: 'macho',
    defaults: { fase: 'gamebird_adulto' },
    dietas: [
      { fase: 'starter', pb_min_pct: 28, me_kcal_kg: 2950 },
      { fase: 'grower', pb_min_pct: 20, me_kcal_kg: 3000 },
      { fase: 'gamebird_adulto', pb_min_pct: 21, ca_min_pct: 0.9, ca_max_pct: 1.2, me_kcal_kg: 3000 },
    ],
  },
}

export const TYPE_TO_SPECIES: Record<AnimalType, SpeciesId> = {
  gallina: 'gallina_ponedora',
  gallo: 'gallo',
  kika: 'kika',
  kiko: 'kiko',
  pavo_hembra: 'pavo_hembra',
  pavo_macho: 'pavo_macho',
  pavoreal_hembra: 'pavoreal_hembra',
  pavoreal_macho: 'pavoreal_macho',
}

export const SPECIES_TO_TYPE: Record<SpeciesId, AnimalType> = {
  gallina_ponedora: 'gallina',
  gallo: 'gallo',
  kika: 'kika',
  kiko: 'kiko',
  pavo_hembra: 'pavo_hembra',
  pavo_macho: 'pavo_macho',
  pavoreal_hembra: 'pavoreal_hembra',
  pavoreal_macho: 'pavoreal_macho',
}

export function getDefaultPhaseForSpecies(speciesId: SpeciesId): DietType {
  const species = SPECIES_CATALOG[speciesId]
  if (!species) {
    return 'layer'
  }
  return species.defaults?.fase ?? species.dietas[0]?.fase ?? 'layer'
}

const DEFAULT_ME_POR_FASE: Partial<Record<DietType, number>> = {
  layer: 2800,
  allflock: 2900,
  adulto: 3000,
  gamebird_adulto: 3000,
}

export interface ModeloConstantes {
  k_MEm: number
  k_e_huevo: number
  f_merma: number
  WFR_21: number
  WFR_incremento_porC: number
  WFR_max: number
  m2_sat: number
}

export const DEFAULT_CONSTANTES: ModeloConstantes = {
  k_MEm: 110,
  k_e_huevo: 2.2,
  f_merma: 0.15,
  WFR_21: 2,
  WFR_incremento_porC: 0.07,
  WFR_max: 8,
  m2_sat: 10,
}

export interface EntornoEjecucion {
  T_ambiente_C: number
  horas_pastoreo_dia: number
  area_finca_m2: number
  n_aves_total: number
  calidad_pradera_Q: number
  f_actividad: number
}

export const DEFAULT_ENVIRONMENT: EntornoEjecucion = {
  T_ambiente_C: 24,
  horas_pastoreo_dia: 0,
  area_finca_m2: 300,
  n_aves_total: 30,
  calidad_pradera_Q: 0.6,
  f_actividad: 1,
}

export interface AveInput {
  especie_id: SpeciesId
  peso_vivo_kg?: number | null
  fase?: DietType
  tasa_puesta?: number | null
  peso_huevo_g?: number | null
  actividad_factor?: number | null
}

export interface LoteInput {
  id: string
  aves: AveInput[]
  area_finca_m2_override?: number
  n_aves_override?: number
}

export interface AveResultado {
  especie_id: SpeciesId
  fase: DietType
  peso_vivo_kg: number
  tasa_puesta: number
  peso_huevo_g: number
  consumo_base_g: number
  fs_aplicada: number
  consumo_final_g: number
  agua_L_d: number
  alertas: string[]
}

export interface LoteResultado {
  id: string
  resumen_pienso_base_g_dia: number
  resumen_pienso_g_dia: number
  resumen_agua_L_dia: number
  reduccion_pastoreo_pct: number
  detalle_aves: AveResultado[]
  alertas_globales: string[]
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min
  return Math.min(Math.max(value, min), max)
}

function roundGrams(value: number) {
  return Math.round(value)
}

function roundLiters(value: number) {
  return Math.round(value * 100) / 100
}

function normalizeDietPhase(phase?: DietType | string | null): DietType | undefined {
  if (!phase) return undefined
  switch (phase) {
    case 'starter':
    case 'grower':
    case 'finisher':
    case 'layer':
    case 'breeder':
    case 'allflock':
    case 'adulto':
    case 'gamebird_adulto':
      return phase
    case 'all_flock':
      return 'allflock'
    case 'gamebird':
      return 'gamebird_adulto'
    default:
      return undefined
  }
}

function resolveDietSpec(species: SpeciesDefinition, fase: DietType): DietPhaseSpec {
  const found = species.dietas.find((item) => item.fase === fase)
  if (found) return found
  const fallbackPhase = species.defaults?.fase ?? species.dietas[0]?.fase
  if (!fallbackPhase) {
    throw new Error(`No hay especificación de dieta para la especie ${species.nombre}`)
  }
  const fallback = species.dietas.find((item) => item.fase === fallbackPhase)
  if (fallback) return fallback
  throw new Error(`No hay especificación de dieta para la especie ${species.nombre}`)
}

function resolveME(species: SpeciesDefinition, diet: DietPhaseSpec): number {
  if (diet.me_kcal_kg && diet.me_kcal_kg > 0) return diet.me_kcal_kg
  const fallback = DEFAULT_ME_POR_FASE[diet.fase]
  if (fallback && fallback > 0) return fallback
  throw new Error(`ME_dieta no configurada para ${species.nombre} en fase ${diet.fase}`)
}

interface AveCalculoDetalle {
  resultado: AveResultado
  baseCruda: number
  finalCruda: number
  aguaCruda: number
}

function calcularAve(
  ave: AveInput,
  species: SpeciesDefinition,
  entorno: EntornoEjecucion,
  constantes: ModeloConstantes,
  m2_por_ave: number,
): AveCalculoDetalle {
  const peso = ave.peso_vivo_kg ?? species.peso_vivo_defecto_kg
  if (!Number.isFinite(peso) || peso <= 0) {
    throw new Error(`Peso vivo inválido para ${species.nombre}`)
  }

  const fase = normalizeDietPhase(ave.fase) ?? species.defaults?.fase ?? species.dietas[0]?.fase
  if (!fase) {
    throw new Error(`No se pudo determinar la fase para ${species.nombre}`)
  }
  const diet = resolveDietSpec(species, fase)
  const meDieta = resolveME(species, diet)

  let tasaPuesta = clamp(ave.tasa_puesta ?? species.defaults?.tasa_puesta ?? 0, 0, 1)
  let pesoHuevo = Math.max(0, ave.peso_huevo_g ?? species.defaults?.peso_huevo_g ?? 0)
  if (species.reproduction) {
    const { tasa_min, tasa_max, peso_huevo_min, peso_huevo_max } = species.reproduction
    if (typeof tasa_min === 'number') {
      tasaPuesta = Math.max(tasa_min, tasaPuesta)
    }
    if (typeof tasa_max === 'number') {
      tasaPuesta = Math.min(tasa_max, tasaPuesta)
    }
    if (typeof peso_huevo_min === 'number') {
      pesoHuevo = Math.max(peso_huevo_min, pesoHuevo)
    }
    if (typeof peso_huevo_max === 'number') {
      pesoHuevo = Math.min(peso_huevo_max, pesoHuevo)
    }
  }
  const actividad = ave.actividad_factor ?? entorno.f_actividad

  const mantenimiento = (species.k_MEm ?? constantes.k_MEm) * Math.pow(peso, 0.75)
  const energiaHuevo = constantes.k_e_huevo * tasaPuesta * pesoHuevo
  const energiaTotal = mantenimiento * actividad + energiaHuevo

  const consumoBase = (energiaTotal / meDieta) * 1000 * (1 + constantes.f_merma)

  const horas = Math.max(0, entorno.horas_pastoreo_dia)
  const calidad = clamp(entorno.calidad_pradera_Q, 0, 1)
  const factorEspacial = m2_por_ave > 0 ? clamp(m2_por_ave / constantes.m2_sat, 0, 1) : 0
  const fs = clamp(
    species.fs_max * (1 - Math.exp(-species.k_forage * horas)) * calidad * factorEspacial,
    0,
    species.fs_max,
  )

  const consumoFinal = consumoBase * (1 - fs)

  const relacionAgua = Math.min(
    constantes.WFR_max,
    constantes.WFR_21 * (1 + constantes.WFR_incremento_porC * Math.max(0, entorno.T_ambiente_C - 21)),
  )
  const agua = (consumoFinal / 1000) * relacionAgua

  const alertas: string[] = []
  if (species.sexo === 'macho' && fase === 'layer') {
    alertas.push("Dieta 'layer' inapropiada (Ca alto). Usar all-flock y calcio libre aparte para hembras.")
  }
  if (entorno.T_ambiente_C >= 32) {
    alertas.push('Calor: incrementar agua (+30–50%), sombreo y ventilación.')
  }
  const umbralFs = species.grupo === 'pavo' ? 0.25 : species.grupo === 'gallina' ? 0.2 : 1
  if (fs > umbralFs + 1e-6) {
    alertas.push('FS alta: riesgo de déficit energético si baja la postura.')
  }

  const resultado: AveResultado = {
    especie_id: species.id,
    fase,
    peso_vivo_kg: Number(peso.toFixed(3)),
    tasa_puesta: Number(tasaPuesta.toFixed(3)),
    peso_huevo_g: Number(pesoHuevo.toFixed(1)),
    consumo_base_g: roundGrams(consumoBase),
    fs_aplicada: Number(fs.toFixed(4)),
    consumo_final_g: roundGrams(consumoFinal),
    agua_L_d: roundLiters(agua),
    alertas: Array.from(new Set(alertas)),
  }

  return { resultado, baseCruda: consumoBase, finalCruda: consumoFinal, aguaCruda: agua }
}

export function calcularLote(
  lote: LoteInput,
  entorno: EntornoEjecucion,
  constantesParciales: Partial<ModeloConstantes> = {},
  catalogo: Record<SpeciesId, SpeciesDefinition> = SPECIES_CATALOG,
): LoteResultado {
  const constantes: ModeloConstantes = { ...DEFAULT_CONSTANTES, ...constantesParciales }
  const aves = lote.aves ?? []
  if (aves.length === 0) {
    const alertasGlobales = entorno.T_ambiente_C >= 32 ? ['Calor: incrementar agua (+30–50%), sombreo y ventilación.'] : []
    return {
      id: lote.id,
      resumen_pienso_base_g_dia: 0,
      resumen_pienso_g_dia: 0,
      resumen_agua_L_dia: 0,
      reduccion_pastoreo_pct: 0,
      detalle_aves: [],
      alertas_globales: alertasGlobales,
    }
  }

  const nAvesReferencia =
    lote.n_aves_override ??
    (entorno.n_aves_total > 0 ? entorno.n_aves_total : undefined) ??
    aves.length

  const areaTotal = lote.area_finca_m2_override ?? entorno.area_finca_m2
  const m2_por_ave = nAvesReferencia > 0 && areaTotal > 0 ? areaTotal / nAvesReferencia : 0

  const alertasGlobales = new Set<string>()
  const resultados: AveResultado[] = []
  let totalBase = 0
  let totalFinal = 0
  let totalAgua = 0

  for (const ave of aves) {
    const species = catalogo[ave.especie_id]
    if (!species) {
      throw new Error(`Especie no registrada: ${ave.especie_id}`)
    }
    const { resultado, baseCruda, finalCruda, aguaCruda } = calcularAve(ave, species, entorno, constantes, m2_por_ave)
    resultado.alertas.forEach((alerta) => alertasGlobales.add(alerta))
    resultados.push(resultado)
    totalBase += baseCruda
    totalFinal += finalCruda
    totalAgua += aguaCruda
  }

  if (entorno.T_ambiente_C >= 32) {
    alertasGlobales.add('Calor: incrementar agua (+30–50%), sombreo y ventilación.')
  }

  const reduccion = totalBase > 0 ? (1 - totalFinal / totalBase) * 100 : 0

  return {
    id: lote.id,
    resumen_pienso_base_g_dia: roundGrams(totalBase),
    resumen_pienso_g_dia: roundGrams(totalFinal),
    resumen_agua_L_dia: roundLiters(totalAgua),
    reduccion_pastoreo_pct: Number(reduccion.toFixed(1)),
    detalle_aves: resultados,
    alertas_globales: Array.from(alertasGlobales),
  }
}

export interface FarmCalculationOptions {
  constantes?: Partial<ModeloConstantes>
  entorno?: Partial<EntornoEjecucion> & { areaPorAve?: number }
}

export interface FarmIntakeTotals {
  feed: {
    baseGramsPerDay: number
    finalGramsPerDay: number
    reductionPercent: number
  }
  water: {
    litersPerDay: number
  }
}

export interface FarmIntakeResult {
  lote: LoteResultado
  totals: FarmIntakeTotals
  perAnimal: Array<AveResultado & { id: string }>
}

function mapAnimalToAve(animal: Animal): AveInput {
  const speciesId = animal.speciesId ?? TYPE_TO_SPECIES[animal.type] ?? 'gallina_ponedora'
  const species = SPECIES_CATALOG[speciesId]
  const fase = normalizeDietPhase(animal.dietPhase) ?? species?.defaults?.fase
  return {
    especie_id: speciesId,
    peso_vivo_kg: animal.weightKg ?? null,
    fase,
    tasa_puesta: animal.layingRate ?? species?.defaults?.tasa_puesta ?? 0,
    peso_huevo_g: animal.eggWeightGrams ?? species?.defaults?.peso_huevo_g ?? 0,
    actividad_factor: animal.activityFactor ?? null,
  }
}

export function calculateFarmIntake(animals: Animal[], options: FarmCalculationOptions = {}): FarmIntakeResult {
  const { constantes: constantesOverride, entorno: entornoOverride = {} } = options
  const conteo = animals.length
  const entornoBase: EntornoEjecucion = { ...DEFAULT_ENVIRONMENT, ...entornoOverride }
  const nAves = entornoOverride.n_aves_total ?? (conteo > 0 ? conteo : entornoBase.n_aves_total)
  const area =
    entornoOverride.area_finca_m2 ??
    (entornoOverride.areaPorAve !== undefined ? entornoOverride.areaPorAve * Math.max(nAves, 1) : entornoBase.area_finca_m2)

  const entorno: EntornoEjecucion = {
    ...entornoBase,
    n_aves_total: nAves,
    area_finca_m2: area,
  }

  const aveInputs = animals.map(mapAnimalToAve)
  const loteResultado = calcularLote(
    {
      id: 'lote_unico',
      aves: aveInputs,
    },
    entorno,
    constantesOverride,
  )

  const perAnimal = loteResultado.detalle_aves.map((detalle, index) => ({
    ...detalle,
    id: animals[index]?.id ?? `ave-${index}`,
  }))

  const totals: FarmIntakeTotals = {
    feed: {
      baseGramsPerDay: loteResultado.resumen_pienso_base_g_dia,
      finalGramsPerDay: loteResultado.resumen_pienso_g_dia,
      reductionPercent: loteResultado.reduccion_pastoreo_pct,
    },
    water: {
      litersPerDay: loteResultado.resumen_agua_L_dia,
    },
  }

  return { lote: loteResultado, totals, perAnimal }
}

export function gramsToKg(g: number) {
  return Math.round((g / 1000) * 100) / 100
}

export function mlToL(ml: number) {
  return Math.round((ml / 1000) * 100) / 100
}
