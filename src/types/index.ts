export type AnimalType =
  | 'gallina'
  | 'gallo'
  | 'pollo'
  | 'pollito'
  | 'pavo'
  | 'kiko'
  | 'kika'
  | 'pavo_real'
  | 'otro'

export type AnimalStatus = 'activo' | 'vendido' | 'muerto'

export type DietType =
  | 'starter'
  | 'grower'
  | 'finisher'
  | 'layer'
  | 'breeder'
  | 'all_flock'
  | 'gamebird'

export type BirdProfileId =
  | 'layer_hen'
  | 'rooster'
  | 'chicken_grower'
  | 'chick_starter'
  | 'bantam_hen'
  | 'bantam_rooster'
  | 'turkey_hen'
  | 'turkey_tom'
  | 'peafowl_hen'
  | 'peafowl_cock'
  | 'generic_bird'

export interface Animal {
  id: string
  type: AnimalType
  tag?: string
  status: AnimalStatus
  createdAt: string
  updatedAt?: string
  profileId?: BirdProfileId
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
