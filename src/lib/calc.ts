export const FEED_PER_HEN_GRAM = 120
export const WATER_PER_HEN_ML = 250
export function dailyFeedGrams(hens: number){ return !Number.isFinite(hens)||hens<0?0:Math.ceil(hens*FEED_PER_HEN_GRAM) }
export function dailyWaterMl(hens: number){ return !Number.isFinite(hens)||hens<0?0:Math.ceil(hens*WATER_PER_HEN_ML) }
export function gramsToKg(g: number){ return Math.round((g/1000)*100)/100 }
export function mlToL(ml: number){ return Math.round((ml/1000)*100)/100 }
