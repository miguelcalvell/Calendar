import { describe, it, expect } from 'vitest'
import { dailyFeedGrams, dailyWaterMl, gramsToKg, mlToL } from './calc'

describe('calc utilities',()=>{
  it('feed is 120g per hen',()=>{ expect(dailyFeedGrams(3)).toBe(360) })
  it('water is 250ml per hen',()=>{ expect(dailyWaterMl(2)).toBe(500) })
  it('grams to kg',()=>{ expect(gramsToKg(360)).toBe(0.36) })
  it('ml to L',()=>{ expect(mlToL(750)).toBe(0.75) })
})
