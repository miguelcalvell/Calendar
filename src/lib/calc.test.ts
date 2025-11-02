import { describe, it, expect } from 'vitest'
import {
  DEFAULT_ENVIRONMENT,
  DEFAULT_CONSTANTES,
  calcularLote,
  calculateFarmIntake,
  gramsToKg,
  mlToL,
} from './calc'

const HEAT_ALERT = 'Calor: incrementar agua (+30–50%), sombreo y ventilación.'
const LAYER_ALERT = "Dieta 'layer' inapropiada (Ca alto). Usar all-flock y calcio libre aparte para hembras."

const BASE_ENTORNO = {
  ...DEFAULT_ENVIRONMENT,
  T_ambiente_C: 24,
  horas_pastoreo_dia: 6,
  calidad_pradera_Q: 0.8,
  area_finca_m2: 10,
  n_aves_total: 1,
  f_actividad: 1,
}

describe('motor nutricional determinista', () => {
  it('calcula la ingesta base de una gallina ponedora sin pastoreo', () => {
    const entorno = { ...BASE_ENTORNO, horas_pastoreo_dia: 0 }
    const lote = {
      id: 'hen-base',
      aves: [
        {
          especie_id: 'gallina_ponedora',
          peso_vivo_kg: 1.8,
          fase: 'layer',
          tasa_puesta: 0.75,
          peso_huevo_g: 58,
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.consumo_base_g).toBeCloseTo(110, 0)
    expect(ave.consumo_final_g).toBeCloseTo(110, 0)
    expect(ave.fs_aplicada).toBeCloseTo(0, 4)
  })

  it('aplica la reducción por pastoreo a la gallina ponedora', () => {
    const entorno = { ...BASE_ENTORNO }
    const lote = {
      id: 'hen-pasture',
      aves: [
        {
          especie_id: 'gallina_ponedora',
          peso_vivo_kg: 1.8,
          fase: 'layer',
          tasa_puesta: 0.75,
          peso_huevo_g: 58,
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.consumo_base_g).toBeCloseTo(110, 0)
    expect(ave.consumo_final_g).toBeCloseTo(98, 0)
    expect(ave.fs_aplicada * 100).toBeCloseTo(10.5, 1)
    expect(ave.agua_L_d).toBeCloseTo(0.24, 2)
  })

  it('calcula consumos esperados para un gallo adulto', () => {
    const entorno = { ...BASE_ENTORNO }
    const lote = {
      id: 'rooster',
      aves: [
        {
          especie_id: 'gallo',
          peso_vivo_kg: 3,
          fase: 'allflock',
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.consumo_base_g).toBeCloseTo(99, 0)
    expect(ave.consumo_final_g).toBeCloseTo(85, 0)
    expect(ave.agua_L_d).toBeCloseTo(0.21, 2)
  })

  it('estima el consumo de una kika en postura', () => {
    const entorno = { ...BASE_ENTORNO }
    const lote = {
      id: 'kika',
      aves: [
        {
          especie_id: 'kika',
          peso_vivo_kg: 1,
          fase: 'layer',
          tasa_puesta: 0.75,
          peso_huevo_g: 58,
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.consumo_base_g).toBeCloseTo(66, 0)
    expect(ave.consumo_final_g).toBeCloseTo(57, 0)
    expect(ave.agua_L_d).toBeCloseTo(0.14, 2)
  })

  it('estima el consumo de una pava adulta', () => {
    const entorno = { ...BASE_ENTORNO }
    const lote = {
      id: 'turkey',
      aves: [
        {
          especie_id: 'pavo_hembra',
          peso_vivo_kg: 6,
          fase: 'adulto',
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.consumo_base_g).toBeCloseTo(162, 0)
    expect(ave.consumo_final_g).toBeCloseTo(135, 0)
    expect(ave.agua_L_d).toBeCloseTo(0.33, 2)
  })

  it('estima el consumo de un pavo real macho', () => {
    const entorno = { ...BASE_ENTORNO }
    const lote = {
      id: 'peacock',
      aves: [
        {
          especie_id: 'pavoreal_macho',
          peso_vivo_kg: 4.5,
          fase: 'gamebird_adulto',
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.consumo_base_g).toBeCloseTo(130, 0)
    expect(ave.consumo_final_g).toBeCloseTo(109, 0)
    expect(ave.agua_L_d).toBeCloseTo(0.26, 2)
  })

  it('incrementa el agua y emite alerta en condiciones de calor', () => {
    const entorno = { ...BASE_ENTORNO, T_ambiente_C: 32 }
    const lote = {
      id: 'heat',
      aves: [
        {
          especie_id: 'gallina_ponedora',
          peso_vivo_kg: 1.8,
          fase: 'layer',
          tasa_puesta: 0.75,
          peso_huevo_g: 58,
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.agua_L_d).toBeGreaterThan(0.33)
    expect(resultado.alertas_globales).toContain(HEAT_ALERT)
    expect(ave.alertas).toContain(HEAT_ALERT)
  })

  it('advierte cuando un macho recibe dieta layer', () => {
    const entorno = { ...BASE_ENTORNO }
    const lote = {
      id: 'layer-rooster',
      aves: [
        {
          especie_id: 'gallo',
          peso_vivo_kg: 3,
          fase: 'layer',
        },
      ],
    }

    const resultado = calcularLote(lote, entorno, DEFAULT_CONSTANTES)
    const ave = resultado.detalle_aves[0]

    expect(ave.alertas).toContain(LAYER_ALERT)
  })

  it('agrega un lote mixto con calculateFarmIntake', () => {
    const entorno = {
      ...BASE_ENTORNO,
      area_finca_m2: 30,
      n_aves_total: 3,
    }
    const animales = [
      {
        id: 'hen-1',
        type: 'gallina' as const,
        status: 'activo' as const,
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'rooster-1',
        type: 'gallo' as const,
        status: 'activo' as const,
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'turkey-1',
        type: 'pavo_hembra' as const,
        status: 'activo' as const,
        createdAt: '2024-01-01T00:00:00Z',
      },
    ]

    const resultado = calculateFarmIntake(animales, { entorno })

    expect(resultado.totals.feed.finalGramsPerDay).toBeGreaterThan(0)
    expect(resultado.totals.water.litersPerDay).toBeGreaterThan(0)
    expect(resultado.perAnimal).toHaveLength(3)
  })
})

describe('conversiones', () => {
  it('convierte gramos a kilos', () => {
    expect(gramsToKg(360)).toBe(0.36)
  })

  it('convierte ml a litros', () => {
    expect(mlToL(750)).toBe(0.75)
  })
})
