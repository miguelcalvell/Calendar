import { useEffect } from 'react'
import { registerSW } from 'virtual:pwa-register'
export function useRegisterSW(){ useEffect(()=>{ const u=registerSW({}); return ()=>{u&&u()} },[]) }