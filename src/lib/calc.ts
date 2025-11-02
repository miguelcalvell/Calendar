import type { Animal, BirdProfileId, DietType } from '@/types'

export interface DietPhaseSpec {
  id: DietType
  proteinMin: number
  calciumRange?: [number, number]
  meKcalKg: number
  notes?: string
}

export interface SpeciesProfile {
  id: BirdProfileId
  label: string
  defaultWeightKg: number
  defaultDietPhase: DietType
  dietByPhase: Partial<Record<DietType, DietPhaseSpec>>
  forage: {
    fsMax: number
    k: number
  }
  defaults?: {
    layingRate?: number
    eggWeightGrams?: number
    activityStable?: number
    activityPasture?: number
  }
}

export interface ModelConstants {
  kMEm: number
  kEgg: number
  feedVariance: number
  waterFeedRatio21: number
  waterIncreasePerC: number
  waterMaxRatio: number
  areaSaturation: number
}

export const DEFAULT_CONSTANTS: ModelConstants = {
  kMEm: 110,
  kEgg: 2.2,
  feedVariance: 0.15,
  waterFeedRatio21: 2,
  waterIncreasePerC: 0.07,
  waterMaxRatio: 8,
  areaSaturation: 10,
}

export interface EnvironmentInput {
  temperatureC: number
  pastureHours: number
  pastureQuality: number
  areaPerBird: number
}

export const DEFAULT_ENVIRONMENT: EnvironmentInput = {
  temperatureC: 24,
  pastureHours: 0,
  pastureQuality: 0.6,
  areaPerBird: 10,
}

export interface BirdCalculationInput {
  profile: SpeciesProfile
  weightKg?: number
  dietPhase?: DietType
  layingRate?: number
  eggWeightGrams?: number
  activityFactor?: number
}

export interface BirdIntakeResult {
  feed: {
    baseGramsPerDay: number
    finalGramsPerDay: number
    reductionFraction: number
  }
  water: {
    litersPerDay: number
    ratio: number
  }
  energy: {
    maintenance: number
    egg: number
    total: number
  }
  context: {
    weightKg: number
    dietPhase: DietType
    profileId: BirdProfileId
  }
}

export const SPECIES_PROFILES: Record<BirdProfileId, SpeciesProfile> = {
  layer_hen: {
    id: 'layer_hen',
    label: 'Gallina ponedora',
    defaultWeightKg: 1.8,
    defaultDietPhase: 'layer',
    dietByPhase: {
      layer: { id: 'layer', proteinMin: 16, calciumRange: [3.5, 4], meKcalKg: 2800, notes: 'Añadir concha libre.' },
      all_flock: { id: 'all_flock', proteinMin: 16, calciumRange: [1, 1.2], meKcalKg: 2850 },
      grower: { id: 'grower', proteinMin: 18, calciumRange: [1, 1.2], meKcalKg: 2900 },
    },
    forage: { fsMax: 0.15, k: 0.35 },
    defaults: { layingRate: 0.75, eggWeightGrams: 58, activityStable: 1, activityPasture: 1.1 },
  },
  rooster: {
    id: 'rooster',
    label: 'Gallo',
    defaultWeightKg: 3,
    defaultDietPhase: 'all_flock',
    dietByPhase: {
      all_flock: { id: 'all_flock', proteinMin: 16, calciumRange: [0.8, 1.2], meKcalKg: 2900 },
      grower: { id: 'grower', proteinMin: 18, calciumRange: [0.8, 1.2], meKcalKg: 2900 },
    },
    forage: { fsMax: 0.2, k: 0.35 },
    defaults: { activityStable: 1, activityPasture: 1.1 },
  },
  chicken_grower: {
    id: 'chicken_grower',
    label: 'Pollo en crecimiento',
    defaultWeightKg: 2,
    defaultDietPhase: 'grower',
    dietByPhase: {
      starter: { id: 'starter', proteinMin: 20, meKcalKg: 2950 },
      grower: { id: 'grower', proteinMin: 18, meKcalKg: 2850 },
      finisher: { id: 'finisher', proteinMin: 16, meKcalKg: 2800 },
    },
    forage: { fsMax: 0.18, k: 0.32 },
    defaults: { activityStable: 1, activityPasture: 1.08 },
  },
  chick_starter: {
    id: 'chick_starter',
    label: 'Pollito',
    defaultWeightKg: 0.35,
    defaultDietPhase: 'starter',
    dietByPhase: {
      starter: { id: 'starter', proteinMin: 20, meKcalKg: 2950 },
    },
    forage: { fsMax: 0.1, k: 0.3 },
    defaults: { activityStable: 1 },
  },
  bantam_hen: {
    id: 'bantam_hen',
    label: 'Gallina enana',
    defaultWeightKg: 1,
    defaultDietPhase: 'layer',
    dietByPhase: {
      layer: { id: 'layer', proteinMin: 16, calciumRange: [3.5, 4], meKcalKg: 2800 },
      all_flock: { id: 'all_flock', proteinMin: 16, calciumRange: [1, 1.2], meKcalKg: 2850 },
    },
    forage: { fsMax: 0.18, k: 0.35 },
    defaults: { layingRate: 0.65, eggWeightGrams: 42, activityStable: 1, activityPasture: 1.08 },
  },
  bantam_rooster: {
    id: 'bantam_rooster',
    label: 'Gallo enano',
    defaultWeightKg: 1.2,
    defaultDietPhase: 'all_flock',
    dietByPhase: {
      all_flock: { id: 'all_flock', proteinMin: 16, calciumRange: [0.8, 1.1], meKcalKg: 2900 },
    },
    forage: { fsMax: 0.2, k: 0.35 },
    defaults: { activityStable: 1, activityPasture: 1.08 },
  },
  turkey_hen: {
    id: 'turkey_hen',
    label: 'Pavo hembra',
    defaultWeightKg: 6,
    defaultDietPhase: 'finisher',
    dietByPhase: {
      starter: { id: 'starter', proteinMin: 28, meKcalKg: 2950 },
      grower: { id: 'grower', proteinMin: 21, meKcalKg: 3000 },
      finisher: { id: 'finisher', proteinMin: 16, meKcalKg: 3000 },
    },
    forage: { fsMax: 0.25, k: 0.3 },
    defaults: { activityStable: 1, activityPasture: 1.1 },
  },
  turkey_tom: {
    id: 'turkey_tom',
    label: 'Pavo macho',
    defaultWeightKg: 12,
    defaultDietPhase: 'finisher',
    dietByPhase: {
      starter: { id: 'starter', proteinMin: 28, meKcalKg: 2950 },
      grower: { id: 'grower', proteinMin: 21, meKcalKg: 3000 },
      finisher: { id: 'finisher', proteinMin: 16, meKcalKg: 3000 },
    },
    forage: { fsMax: 0.25, k: 0.3 },
    defaults: { activityStable: 1, activityPasture: 1.1 },
  },
  peafowl_hen: {
    id: 'peafowl_hen',
    label: 'Pavo real hembra',
    defaultWeightKg: 3.5,
    defaultDietPhase: 'gamebird',
    dietByPhase: {
      starter: { id: 'starter', proteinMin: 28, meKcalKg: 2950 },
      grower: { id: 'grower', proteinMin: 20, meKcalKg: 3000 },
      gamebird: { id: 'gamebird', proteinMin: 21, calciumRange: [0.9, 1.2], meKcalKg: 3000 },
    },
    forage: { fsMax: 0.25, k: 0.3 },
    defaults: { layingRate: 0.4, eggWeightGrams: 80, activityStable: 1, activityPasture: 1.1 },
  },
  peafowl_cock: {
    id: 'peafowl_cock',
    label: 'Pavo real macho',
    defaultWeightKg: 4.5,
    defaultDietPhase: 'gamebird',
    dietByPhase: {
      starter: { id: 'starter', proteinMin: 28, meKcalKg: 2950 },
      grower: { id: 'grower', proteinMin: 20, meKcalKg: 3000 },
      gamebird: { id: 'gamebird', proteinMin: 21, calciumRange: [0.9, 1.2], meKcalKg: 3000 },
    },
    forage: { fsMax: 0.25, k: 0.3 },
    defaults: { activityStable: 1, activityPasture: 1.1 },
  },
  generic_bird: {
    id: 'generic_bird',
    label: 'Ave genérica',
    defaultWeightKg: 2.5,
    defaultDietPhase: 'all_flock',
    dietByPhase: {
      all_flock: { id: 'all_flock', proteinMin: 16, calciumRange: [1, 1.2], meKcalKg: 2850 },
    },
    forage: { fsMax: 0.18, k: 0.32 },
    defaults: { activityStable: 1, activityPasture: 1.08 },
  },
}

const PROFILE_BY_ANIMAL_TYPE: Record<Animal['type'], BirdProfileId> = {
  gallina: 'layer_hen',
  gallo: 'rooster',
  pollo: 'chicken_grower',
  pollito: 'chick_starter',
  pavo: 'turkey_hen',
  kiko: 'bantam_rooster',
  kika: 'bantam_hen',
  pavo_real: 'peafowl_hen',
  otro: 'generic_bird',
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function resolveDietSpec(profile: SpeciesProfile, phase: DietType): DietPhaseSpec {
  const spec = profile.dietByPhase[phase]
  if (spec) return spec
  const fallback = profile.dietByPhase[profile.defaultDietPhase]
  if (fallback) return fallback
  const [, firstSpec] = Object.entries(profile.dietByPhase)[0] ?? []
  if (firstSpec) return firstSpec
  throw new Error(`No hay especificación de dieta para la fase ${phase} en ${profile.label}`)
}

export function resolveProfileForAnimal(animal: Animal): SpeciesProfile {
  const profileId = animal.profileId ?? PROFILE_BY_ANIMAL_TYPE[animal.type] ?? 'generic_bird'
  return SPECIES_PROFILES[profileId] ?? SPECIES_PROFILES.generic_bird
}

export function calculateBirdIntake(
  input: BirdCalculationInput,
  environment: EnvironmentInput,
  overrides: Partial<ModelConstants> = {}
): BirdIntakeResult {
  const constants = { ...DEFAULT_CONSTANTS, ...overrides }
  const profile = input.profile
  const weight = input.weightKg ?? profile.defaultWeightKg
  const dietPhase = input.dietPhase ?? profile.defaultDietPhase
  const diet = resolveDietSpec(profile, dietPhase)
  const stableActivity = profile.defaults?.activityStable ?? 1
  const pastureActivity = profile.defaults?.activityPasture ?? 1.1
  const layingRate = clamp(input.layingRate ?? profile.defaults?.layingRate ?? 0, 0, 1)
  const eggWeight = Math.max(0, input.eggWeightGrams ?? profile.defaults?.eggWeightGrams ?? 0)

  let activity = input.activityFactor
  if (activity === undefined) {
    activity = environment.pastureHours > 0 ? pastureActivity : stableActivity
  }

  const maintenanceEnergy = constants.kMEm * Math.pow(weight, 0.75)
  const eggEnergy = constants.kEgg * layingRate * eggWeight
  const totalEnergy = maintenanceEnergy * activity + eggEnergy
  const baseConsumption = (totalEnergy / diet.meKcalKg) * 1000 * (1 + constants.feedVariance)

  const areaFactor = clamp(environment.areaPerBird / constants.areaSaturation, 0, 1)
  const pastureQuality = clamp(environment.pastureQuality, 0, 1)
  const forageShare = clamp(
    profile.forage.fsMax * (1 - Math.exp(-profile.forage.k * Math.max(0, environment.pastureHours))) * pastureQuality * areaFactor,
    0,
    profile.forage.fsMax
  )
  const finalConsumption = baseConsumption * (1 - forageShare)

  const waterRatio = Math.min(
    constants.waterMaxRatio,
    constants.waterFeedRatio21 * (1 + constants.waterIncreasePerC * Math.max(0, environment.temperatureC - 21))
  )
  const waterLiters = (finalConsumption / 1000) * waterRatio

  return {
    feed: {
      baseGramsPerDay: Math.max(0, baseConsumption),
      finalGramsPerDay: Math.max(0, finalConsumption),
      reductionFraction: forageShare,
    },
    water: {
      litersPerDay: Math.max(0, waterLiters),
      ratio: waterRatio,
    },
    energy: {
      maintenance: maintenanceEnergy,
      egg: eggEnergy,
      total: totalEnergy,
    },
    context: {
      weightKg: weight,
      dietPhase,
      profileId: profile.id,
    },
  }
}

export interface FarmCalculationOptions {
  constants?: Partial<ModelConstants>
  environment?: Partial<EnvironmentInput> & { areaM2?: number }
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
  totals: FarmIntakeTotals
  perAnimal: Array<BirdIntakeResult & { id: string }>
}

export function calculateFarmIntake(
  animals: Animal[],
  options: FarmCalculationOptions = {}
): FarmIntakeResult {
  const { constants: overrideConstants, environment: envOverrides = {} } = options
  const constants = { ...DEFAULT_CONSTANTS, ...overrideConstants }
  const count = animals.length
  const resolvedAreaPerBird = envOverrides.areaPerBird ?? (() => {
    if (envOverrides.areaM2 && count > 0) {
      return envOverrides.areaM2 / count
    }
    return DEFAULT_ENVIRONMENT.areaPerBird
  })()

  const environment: EnvironmentInput = {
    temperatureC: envOverrides.temperatureC ?? DEFAULT_ENVIRONMENT.temperatureC,
    pastureHours: envOverrides.pastureHours ?? DEFAULT_ENVIRONMENT.pastureHours,
    pastureQuality: envOverrides.pastureQuality ?? DEFAULT_ENVIRONMENT.pastureQuality,
    areaPerBird: resolvedAreaPerBird,
  }

  const perAnimal = animals.map((animal) => {
    const profile = resolveProfileForAnimal(animal)
    const result = calculateBirdIntake(
      {
        profile,
        weightKg: animal.weightKg,
        dietPhase: animal.dietPhase,
        layingRate: animal.layingRate,
        eggWeightGrams: animal.eggWeightGrams,
        activityFactor: animal.activityFactor,
      },
      environment,
      constants
    )
    return { ...result, id: animal.id }
  })

  const feedBase = perAnimal.reduce((acc, item) => acc + item.feed.baseGramsPerDay, 0)
  const feedFinal = perAnimal.reduce((acc, item) => acc + item.feed.finalGramsPerDay, 0)
  const waterTotal = perAnimal.reduce((acc, item) => acc + item.water.litersPerDay, 0)
  const reductionPercent = feedBase > 0 ? (1 - feedFinal / feedBase) * 100 : 0

  return {
    totals: {
      feed: {
        baseGramsPerDay: feedBase,
        finalGramsPerDay: feedFinal,
        reductionPercent,
      },
      water: {
        litersPerDay: waterTotal,
      },
    },
    perAnimal,
  }
}

export function gramsToKg(g: number) {
  return Math.round((g / 1000) * 100) / 100
}

export function mlToL(ml: number) {
  return Math.round((ml / 1000) * 100) / 100
}
