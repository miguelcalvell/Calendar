export type AnimalForm={type:string;count:number}
export function validateAnimalForm(i:AnimalForm){const e:Partial<Record<keyof AnimalForm,string>>={}; if(!i.type) e.type='El tipo es obligatorio'; if(!Number.isFinite(i.count)||i.count<1) e.count='Cantidad mínima 1'; return {valid:Object.keys(e).length===0, errors:e}}
