import { describe, expect, it } from 'vitest'
import { validateAnimalForm } from './validation'

describe('validateAnimalForm',()=>{
  it('acepta tipo y cantidad >=1',()=>{ expect(validateAnimalForm({type:'gallina',count:3}).valid).toBe(true) })
  it('rechaza sin tipo',()=>{ const r=validateAnimalForm({type:'',count:1}); expect(r.valid).toBe(false); expect(r.errors.type).toBeDefined() })
  it('rechaza cantidad 0',()=>{ const r=validateAnimalForm({type:'gallina',count:0}); expect(r.valid).toBe(false); expect(r.errors.count).toBeDefined() })
})
