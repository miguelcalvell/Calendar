import React from 'react'

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(err: any) {
    return { hasError: true, message: String(err?.message || err) }
  }
  componentDidCatch(error: any, info: any) {
    console.error('Gallinero runtime error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 max-w-xl mx-auto">
          <h1 className="text-xl font-semibold mb-2">Ha ocurrido un error</h1>
          <p className="text-sm text-gray-300 mb-4">
            Recarga la página. Si persiste, borra la caché del sitio (github.io).
          </p>
          <pre className="text-xs whitespace-pre-wrap bg-white/10 p-3 rounded">
            {this.state.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}