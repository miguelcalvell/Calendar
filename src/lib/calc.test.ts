import { describe, it, expect } from 'vitest'
import {
  SPECIES_PROFILES,
  DEFAULT_ENVIRONMENT,
  DEFAULT_CONSTANTS,
  calculateBirdIntake,
  calculateFarmIntake,
  gramsToKg,
  mlToL,
} from './calc'
import type { Animal } from '@/types'

const BASE_ENVIRONMENT = { ...DEFAULT_ENVIRONMENT, temperatureC: 24, pastureQuality: 0.8, areaPerBird: 10 }

describe('nutritional model', () => {
  it('estimates layer hen baseline intake close to published guides', () => {
    const layerProfile = SPECIES_PROFILES.layer_hen
    const result = calculateBirdIntake(
      {
        profile: layerProfile,
        weightKg: 1.8,
        dietPhase: 'layer',
        layingRate: 0.75,
        eggWeightGrams: 58,
        activityFactor: 1,
      },
      { ...BASE_ENVIRONMENT, pastureHours: 0 },
      DEFAULT_CONSTANTS
    )

    expect(result.feed.baseGramsPerDay).toBeCloseTo(110, 0)
    expect(result.feed.finalGramsPerDay).toBeCloseTo(110, 0)
    expect(result.water.litersPerDay).toBeCloseTo(0.27, 2)
  })

  it('applies forage substitution with moderate pasture access', () => {
    const layerProfile = SPECIES_PROFILES.layer_hen
    const result = calculateBirdIntake(
      {
        profile: layerProfile,
        weightKg: 1.8,
        dietPhase: 'layer',
        layingRate: 0.75,
        eggWeightGrams: 58,
        activityFactor: 1,
      },
      { ...BASE_ENVIRONMENT, pastureHours: 6 },
      DEFAULT_CONSTANTS
    )

    expect(result.feed.finalGramsPerDay).toBeCloseTo(98, 0)
    expect(result.feed.reductionFraction * 100).toBeCloseTo(10.5, 1)
  })

  it('aggregates flock totals correctly', () => {
    const animals: Animal[] = [
      {
        id: 'hen-1',
        type: 'gallina',
        status: 'activo',
        createdAt: '2024-01-01T00:00:00Z',
        layingRate: 0.75,
        eggWeightGrams: 58,
        activityFactor: 1,
      },
      {
        id: 'hen-2',
        type: 'gallina',
        status: 'activo',
        createdAt: '2024-01-01T00:00:00Z',
        layingRate: 0.75,
        eggWeightGrams: 58,
        activityFactor: 1,
      },
    ]

    const { totals } = calculateFarmIntake(animals, {
      environment: { ...BASE_ENVIRONMENT, pastureHours: 6 },
    })

    expect(totals.feed.finalGramsPerDay).toBeCloseTo(196, 0)
    expect(totals.feed.reductionPercent).toBeGreaterThan(9)
    expect(totals.water.litersPerDay).toBeCloseTo(0.47, 2)
  })
})

describe('unit conversions', () => {
  it('grams to kg', () => {
    expect(gramsToKg(360)).toBe(0.36)
  })

  it('ml to L', () => {
    expect(mlToL(750)).toBe(0.75)
  })
})
