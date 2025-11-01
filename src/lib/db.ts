import Dexie, { Table } from 'dexie'
import type {
  Animal,
  MaintenanceTask,
  Supply,           // ⬅ Supply comes from '@/types'
  HealthRecord,
  HistoryEvent,
  Setting,
} from '@/types'

export class GallineroDB extends Dexie {
  animals!: Table<Animal, string>
  maintenance!: Table<MaintenanceTask, string>
  supplies!: Table<Supply, string>
  health!: Table<HealthRecord, string>
  history!: Table<HistoryEvent, string>
  settings!: Table<Setting, string>

  constructor() {
    super('gallineroDB')
    this.version(1).stores({
      animals: 'id, tag, type, status, createdAt, [type+status]',
      maintenance: 'id, type, status, scheduledFor, completedAt',
      supplies: 'id, name, category, updatedAt',
      health: 'id, animalId, date, type',
      history: 'id, date, type, refId',
      settings: 'id',
    })
  }
}

export const db = new GallineroDB()