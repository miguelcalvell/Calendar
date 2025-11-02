export type AnimalType =
  | 'gallina'
  | 'gallo'
  | 'kika'
  | 'kiko'
  | 'pollo'
  | 'pollito'
  | 'pavo_hembra'
  | 'pavo_macho'
  | 'pavoreal_hembra'
  | 'pavoreal_macho'
  | 'otro'

export type AnimalStatus = 'activo' | 'vendido' | 'muerto'

export type DietType =
  | 'starter'
  | 'grower'
  | 'finisher'
  | 'layer'
  | 'breeder'
  | 'allflock'
  | 'adulto'
  | 'gamebird_adulto'

export type SpeciesId =
  | 'gallina_ponedora'
  | 'gallo'
  | 'kika'
  | 'kiko'
  | 'pavo_hembra'
  | 'pavo_macho'
  | 'pavoreal_hembra'
  | 'pavoreal_macho'

export type ExtendedSpeciesId = SpeciesId | 'generica'

export interface Animal {
  id: string
  type: AnimalType
  speciesId?: SpeciesId
  tag?: string
  status: AnimalStatus
  createdAt: string
  updatedAt?: string
  weightKg?: number
  dietPhase?: DietType
  layingRate?: number
  eggWeightGrams?: number
  activityFactor?: number
}

export interface MaintenanceTask {
  id: string
  type: 'limpieza' | 'agua' | 'alimento' | 'desinfeccion' | 'reparacion'
  scheduledFor?: string
  completedAt?: string
  status: 'pendiente' | 'hecho'
  notes?: string
}

export interface HealthRecord {
  id: string
  animalId?: string
  date: string
  type: 'vacuna' | 'revision' | 'tratamiento'
  product?: string
  dose?: string
  notes?: string
}

export interface HistoryEvent {
  id: string
  date: string
  type: 'add_animal' | 'maintenance' | 'health' | 'update_supply'
  refId?: string
  summary: string
}

export interface Setting {
  id: 'app'
  language: 'es' | 'en'
  theme: 'dark' | 'light' | 'system'
  farmName?: string
  createdAt: string
  updatedAt?: string
}

export interface Supply {
  id: string
  name: string
  category: 'alimento' | 'medicina' | 'bedding' | 'otro'
  quantity: number
  unit: 'kg' | 'L' | 'uds'
  minStock?: number
  updatedAt: string
}
