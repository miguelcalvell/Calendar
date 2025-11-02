import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { DietType, SpeciesId } from '@/types'

export interface ResultadoFila {
  key: string
  speciesId: SpeciesId
  speciesName: string
  phase: DietType
  dietLabel: string
  quantity: number
  feedPerAve: number
  feedTotal: number
  waterPerAve: number
  waterTotal: number
  fsPercent: number
  alerts: string[]
}

export interface ResultadosResumen {
  feedBase: number
  feedFinal: number
  water: number
  reductionPercent: number
  savings: number
  feedKgWeek: number
  globalAlerts: string[]
}

interface ResultadosCardProps {
  filas: ResultadoFila[]
  resumen: ResultadosResumen | null
}

function formatNumber(value: number, fractionDigits = 0) {
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}

export function ResultadosCard({ filas, resumen }: ResultadosCardProps) {
  const hasResults = resumen && filas.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasResults ? (
          <p className="text-sm text-gray-400">Pulsa “Calcular” para ver los resultados del lote.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-gray-400">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Especie/Fase</th>
                    <th className="px-3 py-2 font-semibold">Tipo de dieta</th>
                    <th className="px-3 py-2 font-semibold">Pienso g/día (ave)</th>
                    <th className="px-3 py-2 font-semibold">Agua L/día (ave)</th>
                    <th className="px-3 py-2 font-semibold">FS %</th>
                    <th className="px-3 py-2 font-semibold">Alertas</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((fila) => (
                    <tr key={fila.key} className="border-t border-white/10">
                      <td className="px-3 py-2">
                        <div className="flex flex-col">
                          <span className="font-medium">{fila.speciesName}</span>
                          <span className="text-xs text-gray-400">Cantidad: {fila.quantity}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2">{fila.dietLabel}</td>
                      <td className="px-3 py-2">{formatNumber(fila.feedPerAve)}</td>
                      <td className="px-3 py-2">{formatNumber(fila.waterPerAve, 2)}</td>
                      <td className="px-3 py-2">{formatNumber(fila.fsPercent, 1)}%</td>
                      <td className="px-3 py-2">
                        {fila.alerts.length === 0 ? (
                          <span className="text-xs text-gray-500">—</span>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {fila.alerts.map((alerta) => (
                              <Badge key={alerta} className="border-red-400/50 bg-red-900/40 text-red-200">
                                {alerta}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2 rounded-lg border border-white/10 p-4">
                <h3 className="text-lg font-semibold">Totales del lote</h3>
                <div className="grid gap-3">
                  <div>
                    <div className="text-sm text-gray-400">Pienso total</div>
                    <div className="text-2xl font-bold">{formatNumber(resumen.feedFinal)} g/día</div>
                    <div className="text-sm text-gray-500">{formatNumber(resumen.feedKgWeek, 2)} kg/semana</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Agua total</div>
                    <div className="text-2xl font-bold">{formatNumber(resumen.water, 2)} L/día</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Ahorro por pastoreo</div>
                    <div className="text-2xl font-bold">{formatNumber(resumen.savings)} g</div>
                    <div className="text-sm text-emerald-300">-{formatNumber(resumen.reductionPercent, 1)}%</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 rounded-lg border border-white/10 p-4">
                <h3 className="text-lg font-semibold">Alertas de negocio</h3>
                {resumen.globalAlerts.length === 0 ? (
                  <p className="text-sm text-gray-400">Sin alertas por ahora.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {resumen.globalAlerts.map((alerta) => (
                      <Badge key={alerta} className="border-red-400/50 bg-red-900/40 text-red-200">
                        {alerta}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
