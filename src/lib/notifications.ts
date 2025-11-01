import { toast } from 'sonner'
export const notify={success:(m:string)=>toast.success(m),info:(m:string)=>toast(m),error:(m:string)=>toast.error(m)}
