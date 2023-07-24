import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo)
    this.setState({ hasError: true })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return <h1>Something went wrong. Please try later.</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
