diff --git a/src/features/animals/components/AnimalIcons.tsx b/src/features/animals/components/AnimalIcons.tsx
index 9ba9d8d55c006556ac61824f756c4df073300cbe..6056e385af2e2758976235fecbe146382229650d 100644
--- a/src/features/animals/components/AnimalIcons.tsx
+++ b/src/features/animals/components/AnimalIcons.tsx
@@ -1,120 +1,286 @@
 import type { SVGProps } from 'react'
 
+type IconProps = SVGProps<SVGSVGElement>
+
 const baseProps = {
   role: 'img' as const,
   width: 48,
   height: 48,
   viewBox: '0 0 64 64',
-  fill: 'none',
-  strokeLinecap: 'round' as const,
-  strokeLinejoin: 'round' as const,
-  strokeWidth: 2,
 }
 
-type IconProps = SVGProps<SVGSVGElement>
+interface ChickenIconProps extends IconProps {
+  variant: 'hen' | 'rooster'
+  bodyFill: string
+  wingFill: string
+  headFill: string
+  strokeColor: string
+  crestColor: string
+  beakFill: string
+}
+
+function ChickenIconBase({
+  variant,
+  bodyFill,
+  wingFill,
+  headFill,
+  strokeColor,
+  crestColor,
+  beakFill,
+  ...props
+}: ChickenIconProps) {
+  const combPath =
+    variant === 'rooster'
+      ? 'M43 22c2.6-4.8 6-8.7 10-11.3l3.6 3.6-1.8 4.8 3.8 1.6-3.4 6.4'
+      : 'M44 24c1.9-3.6 4.4-6.4 7.4-8.2l2.4 2.8-1.5 3.6 2.8 1.1-2.3 4.6'
+  const tailPath =
+    variant === 'rooster'
+      ? 'M30 30c-5.2 6.6-10.6 13.7-13.4 21.4'
+      : 'M31 32c-4.1 5.6-8.4 10.9-10.4 17.3'
 
-export function GallinaIcon(props: IconProps) {
   return (
     <svg {...baseProps} {...props}>
-      <path d="M20 34c0-8 6-14 14-14h6" stroke="#f97316" />
-      <path d="M40 20s2-6 6-6" stroke="#f97316" />
-      <path d="M46 18c0 4-3 7-7 7" stroke="#f97316" />
-      <path d="M18 38c0 8 6 16 16 16s16-8 16-16-6-14-16-14-16 6-16 14Z" fill="#fb923c" stroke="#f97316" />
-      <circle cx={24} cy={32} r={2} fill="#1f2937" />
-      <path d="M44 44l6 6" stroke="#f97316" />
-      <path d="M38 48l4 8" stroke="#f97316" />
+      <path
+        d="M20 48c0-13 11-24 23-24 9.6 0 17.4 5.4 21 12l-5.8 3.4c-3 1.8-4.8 5.4-4.8 8.8 0 8.4-8.6 14.2-20.8 14.2S12.8 56.8 12.8 50c0-4.1 2.5-7.3 8.1-9.6Z"
+        fill={bodyFill}
+        stroke={strokeColor}
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <path
+        d="M30.5 52.5c3.8-8 14.3-11.8 21.5-7.8 3 1.7 4 4.9 2.6 7.9-2.8 6.3-10.2 10.3-18.2 10.3-6.6 0-10.5-3.1-10.5-7.3 0-1.8 0.9-3.4 4.6-3.1Z"
+        fill={wingFill}
+        stroke={strokeColor}
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <circle cx={46} cy={30} r={6} fill={headFill} stroke={strokeColor} strokeWidth={2} />
+      <polygon points="52,30 60,33 52,36" fill={beakFill} stroke={strokeColor} strokeWidth={1.5} strokeLinejoin="round" />
+      <path d="M50 33c1.6 2.3 1.6 4.7 0 7" stroke={strokeColor} strokeWidth={1.6} strokeLinecap="round" />
+      <path d={combPath} fill="none" stroke={crestColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
+      <path d={tailPath} fill="none" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
+      <path d="M36 56l-2 8" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
+      <path d="M28 56l-1.6 8" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
+      <circle cx={44.5} cy={29} r={1.8} fill="#1f2937" />
     </svg>
   )
 }
 
+export function GallinaIcon(props: IconProps) {
+  return (
+    <ChickenIconBase
+      variant="hen"
+      bodyFill="#fb923c"
+      wingFill="#fdba74"
+      headFill="#fed7aa"
+      strokeColor="#c2410c"
+      crestColor="#f97316"
+      beakFill="#fde68a"
+      {...props}
+    />
+  )
+}
+
 export function GalloIcon(props: IconProps) {
   return (
-    <svg {...baseProps} {...props}>
-      <path d="M22 36c0-6 5-12 14-12" stroke="#c026d3" />
-      <path d="M42 24c2-6 6-10 10-10" stroke="#dc2626" />
-      <path d="M46 18c0 5-4 9-9 9" stroke="#dc2626" />
-      <path d="M20 40c0 10 7 18 18 18s18-8 18-18-7-16-18-16-18 6-18 16Z" fill="#f87171" stroke="#dc2626" />
-      <circle cx={28} cy={36} r={2} fill="#1f2937" />
-      <path d="M48 48l8 4" stroke="#dc2626" />
-      <path d="M38 52l4 8" stroke="#dc2626" />
-    </svg>
+    <ChickenIconBase
+      variant="rooster"
+      bodyFill="#f87171"
+      wingFill="#fecaca"
+      headFill="#fca5a5"
+      strokeColor="#dc2626"
+      crestColor="#ef4444"
+      beakFill="#fee2e2"
+      {...props}
+    />
   )
 }
 
 export function PolloIcon(props: IconProps) {
   return (
     <svg {...baseProps} {...props}>
-      <path d="M36 24c6 0 12 6 12 12" stroke="#facc15" />
-      <path d="M22 34c0-6 6-12 14-12" stroke="#facc15" />
-      <path d="M18 38c0 8 6 16 16 16s16-8 16-16-6-14-16-14-16 6-16 14Z" fill="#fde047" stroke="#facc15" />
-      <circle cx={28} cy={36} r={2} fill="#1f2937" />
-      <path d="M44 46l6 6" stroke="#facc15" />
-      <path d="M38 48l4 8" stroke="#facc15" />
+      <path
+        d="M22 50c0-11.4 10-21 21-21 8.8 0 16 4.7 19.4 11.4l-5.2 2.8c-3 1.6-4.7 4.8-4.7 7.8 0 7-7.3 12-18 12S15 58.6 15 53.2c0-3.4 2-6 7-7.6Z"
+        fill="#fde68a"
+        stroke="#b45309"
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <path
+        d="M30.5 54.5c3.5-6.9 12.2-10.5 18.5-7.1 2.6 1.4 3.5 4.2 2.3 6.6-2.4 5.5-8.8 9-15.4 9-5.6 0-8.6-2.6-8.6-6.1 0-1.6 0.8-3 3.2-2.4Z"
+        fill="#fcd34d"
+        stroke="#b45309"
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <circle cx={44} cy={32} r={5.5} fill="#fef3c7" stroke="#b45309" strokeWidth={2} />
+      <polygon points="50,32 58,35 50,38" fill="#f97316" stroke="#b45309" strokeWidth={1.4} strokeLinejoin="round" />
+      <path d="M48 36c1.2 1.8 1.2 3.8 0 5.6" stroke="#b45309" strokeWidth={1.4} strokeLinecap="round" />
+      <path d="M40 24c1.3-2.6 3-4.6 4.6-6l1.8 2.4-1 2.8 2.4 0.8-1.8 3.2" fill="none" stroke="#facc15" strokeWidth={1.8} strokeLinecap="round" />
+      <path d="M32 34c-3.6 4.6-6.8 9.2-8.2 14.6" stroke="#b45309" strokeWidth={2} strokeLinecap="round" />
+      <path d="M34 56l-1.8 7" stroke="#b45309" strokeWidth={2} strokeLinecap="round" />
+      <path d="M26.5 56l-1.4 7" stroke="#b45309" strokeWidth={2} strokeLinecap="round" />
+      <circle cx={43} cy={31} r={1.6} fill="#1f2937" />
     </svg>
   )
 }
 
 export function PollitoIcon(props: IconProps) {
   return (
     <svg {...baseProps} {...props}>
-      <path d="M32 24c-8 0-14 6-14 12" stroke="#fbbf24" />
-      <path d="M18 38c0 7 5 14 14 14s14-7 14-14-5-12-14-12-14 5-14 12Z" fill="#fcd34d" stroke="#fbbf24" />
-      <circle cx={28} cy={36} r={2} fill="#1f2937" />
-      <path d="M40 44l6 6" stroke="#fbbf24" />
-      <path d="M34 46l2 8" stroke="#fbbf24" />
+      <ellipse cx={30} cy={46} rx={14} ry={11.5} fill="#fde047" stroke="#ca8a04" strokeWidth={2} />
+      <circle cx={42} cy={32} r={6} fill="#fef3c7" stroke="#ca8a04" strokeWidth={2} />
+      <path d="M34 44c2.4-3.6 6.4-5.6 10.2-4.2 1.4 0.5 2.4 2.1 1.6 3.8-1.8 4.4-7 7.4-12.6 7.4-4.4 0-6.8-2.1-6.8-5 0-1.6 0.8-3 2.4-2.6Z" fill="#facc15" stroke="#ca8a04" strokeWidth={1.8} />
+      <polygon points="47.5,32 53.5,34.5 47.5,37" fill="#fb923c" stroke="#ca8a04" strokeWidth={1.2} strokeLinejoin="round" />
+      <path d="M38 26c0.9-2 2.2-3.6 3.4-4.6l1.5 1.8-0.7 2.2 1.8 0.6-1.4 2.4" fill="none" stroke="#facc15" strokeWidth={1.6} strokeLinecap="round" />
+      <path d="M24 50l-1 6" stroke="#ca8a04" strokeWidth={1.8} strokeLinecap="round" />
+      <path d="M30 50l-1.2 6" stroke="#ca8a04" strokeWidth={1.8} strokeLinecap="round" />
+      <circle cx={41.5} cy={31.5} r={1.4} fill="#1f2937" />
     </svg>
   )
 }
 
 export function PavoIcon(props: IconProps) {
   return (
     <svg {...baseProps} {...props}>
-      <path d="M32 18c12 0 22 10 22 22" stroke="#0f172a" />
-      <path d="M10 40c0-12 10-22 22-22" stroke="#0f172a" />
-      <path d="M14 42c0 10 8 18 18 18s18-8 18-18-8-16-18-16-18 6-18 16Z" fill="#38bdf8" stroke="#0ea5e9" />
-      <path d="M18 34c0-6 5-10 14-10" stroke="#0ea5e9" />
-      <circle cx={30} cy={36} r={2} fill="#1f2937" />
-      <path d="M46 48l8 6" stroke="#0ea5e9" />
-      <path d="M36 50l4 8" stroke="#0ea5e9" />
+      <path
+        d="M6 48A26 26 0 1 1 58 48Z"
+        fill="#f8fafc"
+        stroke="#94a3b8"
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <path
+        d="M12 48A20 20 0 1 1 52 48Z"
+        fill="#e2e8f0"
+        stroke="#94a3b8"
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <ellipse cx={32} cy={50} rx={15.5} ry={11} fill="#f1f5f9" stroke="#94a3b8" strokeWidth={2} />
+      <path d="M26 50c3.2-5.4 9.4-8.6 15-6.4 2.8 1 3.6 3.8 2 6.6-2.6 5-8.4 8.2-14.6 8.2-4.8 0-7.4-2.4-7.4-5.4 0-1.6 0.7-3 5-3Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth={2} />
+      <path d="M42 46c2-6 2-12 0-18" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
+      <path d="M38 24c0-4 3-8 6-10" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M38 24c3.6 4.4 5.2 10.2 4.6 16.4" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M41 28c5-2 8-4.8 9-8.6" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M40 44c3.4 1.8 5 4.2 5 7.8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M36 50V32" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M36 32c2.2-4.4 6.6-7.8 12-9.6" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M36 32c-2.6-5-7.2-8.6-12.8-10" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M36 32c-1.6-4.2-4-6.8-8.6-8.8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 36c-4.2 1.6-7.4 4.6-9.6 8.8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M34 50l-2 9" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M28 50l-1.5 9" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M44 48l1.5 9" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M48 44l2.4 8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <circle cx={47} cy={32} r={5.4} fill="#e2e8f0" stroke="#64748b" strokeWidth={2} />
+      <polygon points="51,32 58,34.5 51,37" fill="#f97316" stroke="#64748b" strokeWidth={1.5} strokeLinejoin="round" />
+      <path d="M50 34c1.8 2.6 1.8 5.2 0 7.8" stroke="#b91c1c" strokeWidth={1.6} strokeLinecap="round" />
+      <circle cx={46.5} cy={30.5} r={1.8} fill="#1f2937" />
+    </svg>
+  )
+}
+
+export function PavoRealIcon(props: IconProps) {
+  const eyeAngles = [-0.9, -0.45, 0, 0.45, 0.9] as const
+  const eyeRadius = 24
+  return (
+    <svg {...baseProps} {...props}>
+      <path
+        d="M2 52A30 30 0 1 1 62 52Z"
+        fill="#34d399"
+        stroke="#047857"
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <path
+        d="M8 52A24 24 0 1 1 56 52Z"
+        fill="#059669"
+        stroke="#047857"
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      <path
+        d="M14 52A18 18 0 1 1 50 52Z"
+        fill="#10b981"
+        stroke="#047857"
+        strokeWidth={2}
+        strokeLinejoin="round"
+      />
+      {eyeAngles.map((angle) => {
+        const cx = 32 + Math.sin(angle) * eyeRadius
+        const cy = 52 - Math.cos(angle) * eyeRadius
+        return (
+          <g key={angle}>
+            <circle cx={cx} cy={cy} r={4.4} fill="#22d3ee" stroke="#0f766e" strokeWidth={2} />
+            <circle cx={cx} cy={cy} r={2} fill="#0f172a" />
+          </g>
+        )
+      })}
+      <ellipse cx={32} cy={52} rx={14.5} ry={10.5} fill="#4ade80" stroke="#047857" strokeWidth={2} />
+      <path d="M32 32c3.2-6 9.6-10 16.4-11.4" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 32c-3.6-6-10.2-9.8-17-11" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 32c-2.6-4.8-6.4-7.8-11.2-9.4" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 32c2.4-4.4 6-7.4 10.6-9" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
+      <path d="M28 52l-1.6 9" stroke="#065f46" strokeWidth={2} strokeLinecap="round" />
+      <path d="M36 52l2 9" stroke="#065f46" strokeWidth={2} strokeLinecap="round" />
+      <path d="M24 50c-2.4-6.4-2.4-13 0-19.2" stroke="#047857" strokeWidth={2} strokeLinecap="round" />
+      <path d="M40 50c2.6-6 2.6-12.6 0-18.8" stroke="#047857" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 18c-1.8-4.2-4.6-6.8-8.6-8" stroke="#047857" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 18c3.4-4 7.8-6.4 12.8-7" stroke="#047857" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 18c-4 2.8-6.4 6.4-6.8 10.8" stroke="#047857" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 18c3.6 2.4 6 6.2 6.4 10.6" stroke="#047857" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 18l-4-6" stroke="#10b981" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 18l4-6" stroke="#10b981" strokeWidth={2} strokeLinecap="round" />
+      <circle cx={44} cy={32} r={5.6} fill="#bbf7d0" stroke="#047857" strokeWidth={2} />
+      <polygon points="48,32 56,34.5 48,37" fill="#fcd34d" stroke="#047857" strokeWidth={1.4} strokeLinejoin="round" />
+      <path d="M47 34c1.6 2.4 1.6 5 0 7.4" stroke="#0f172a" strokeWidth={1.4} strokeLinecap="round" />
+      <path d="M44 24l2-6 2 6" stroke="#0ea5e9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
+      <circle cx={43.5} cy={30.5} r={1.8} fill="#1f2937" />
     </svg>
   )
 }
 
 export function KikoIcon(props: IconProps) {
   return (
     <svg {...baseProps} {...props}>
-      <path d="M22 32c0-8 8-14 16-14" stroke="#7c3aed" />
-      <path d="M40 22c2-4 6-6 10-6" stroke="#22d3ee" />
-      <path d="M18 38c0 9 7 18 18 18s18-9 18-18-7-15-18-15-18 6-18 15Z" fill="#a855f7" stroke="#7c3aed" />
-      <circle cx={28} cy={34} r={2} fill="#1f2937" />
-      <path d="M44 46l8 6" stroke="#7c3aed" />
-      <path d="M36 48l4 8" stroke="#7c3aed" />
+      <ellipse cx={30} cy={46} rx={13.5} ry={10.5} fill="#e5e7eb" stroke="#475569" strokeWidth={2} />
+      <circle cx={42} cy={34} r={5.4} fill="#f8fafc" stroke="#475569" strokeWidth={2} />
+      <polygon points="47,34 54,36.5 47,39" fill="#cbd5f5" stroke="#475569" strokeWidth={1.3} strokeLinejoin="round" />
+      <path d="M36 30c-4 4.8-7.4 9.2-8.8 15" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M32 56l-1.8 8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M25 55l-1.4 8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M40 26c1.1-2.4 2.6-4.3 4.2-5.6l1.6 2.2-0.9 3 2.4 0.8-1.6 3" fill="none" stroke="#94a3b8" strokeWidth={1.8} strokeLinecap="round" />
+      <circle cx={41.5} cy={33.5} r={1.4} fill="#1f2937" />
     </svg>
   )
 }
 
-export function PavoRealIcon(props: IconProps) {
+export function KikaIcon(props: IconProps) {
   return (
     <svg {...baseProps} {...props}>
-      <path d="M12 40c0-14 10-24 22-24s22 10 22 24" stroke="#0ea5e9" />
-      <path d="M18 42c0 10 8 18 18 18s18-8 18-18-8-16-18-16-18 6-18 16Z" fill="#34d399" stroke="#059669" />
-      <path d="M22 30c0-4 5-8 14-8s14 4 14 8" stroke="#22d3ee" />
-      <circle cx={32} cy={34} r={2} fill="#1f2937" />
-      <path d="M44 46l10 6" stroke="#14b8a6" />
-      <path d="M36 48l4 8" stroke="#14b8a6" />
-      <circle cx={32} cy={22} r={3} fill="#0ea5e9" stroke="#14b8a6" />
+      <ellipse cx={30} cy={46} rx={14} ry={10.8} fill="#f5d0e6" stroke="#b45468" strokeWidth={2} />
+      <circle cx={42} cy={34} r={5.2} fill="#f9e2ef" stroke="#b45468" strokeWidth={2} />
+      <polygon points="47,34 54,36 47,38" fill="#f1c4d8" stroke="#b45468" strokeWidth={1.3} strokeLinejoin="round" />
+      <path d="M34 30c-3.6 4.6-6.8 9.4-8 15" stroke="#b45468" strokeWidth={2} strokeLinecap="round" />
+      <path d="M30 56l-1.6 8" stroke="#b45468" strokeWidth={2} strokeLinecap="round" />
+      <path d="M23 55l-1.2 8" stroke="#b45468" strokeWidth={2} strokeLinecap="round" />
+      <path d="M40 26c1-2 2.2-3.6 3.4-4.6l1.4 1.8-0.7 2.6 2 0.7-1.4 2.6" fill="none" stroke="#d7839b" strokeWidth={1.6} strokeLinecap="round" />
+      <circle cx={41.2} cy={33.2} r={1.3} fill="#1f2937" />
     </svg>
   )
 }
 
 export function GenericBirdIcon(props: IconProps) {
   return (
     <svg {...baseProps} {...props}>
-      <path d="M22 34c0-8 6-14 14-14" stroke="#94a3b8" />
-      <path d="M18 38c0 8 6 16 16 16s16-8 16-16-6-14-16-14-16 6-16 14Z" fill="#cbd5f5" stroke="#94a3b8" />
-      <circle cx={28} cy={36} r={2} fill="#1f2937" />
-      <path d="M40 46l6 6" stroke="#94a3b8" />
-      <path d="M34 48l4 8" stroke="#94a3b8" />
+      <ellipse cx={30} cy={46} rx={15} ry={11.2} fill="#e2e8f0" stroke="#475569" strokeWidth={2} />
+      <circle cx={43} cy={34} r={5.5} fill="#f8fafc" stroke="#475569" strokeWidth={2} />
+      <polygon points="48,34 56,37 48,40" fill="#cbd5f5" stroke="#475569" strokeWidth={1.4} strokeLinejoin="round" />
+      <path d="M36 30c-4.2 5-8 10.2-10 16.2" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M34 56l-1.8 8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <path d="M26 55l-1.4 8" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
+      <circle cx={42} cy={33} r={1.5} fill="#1f2937" />
     </svg>
   )
 }
