import React, { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  t: any;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">{this.props.t('common.error_boundary_title')}</h1>
            <p className="text-neutral-500 mb-8">{this.props.t('common.error_boundary_desc')}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 px-6 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              {this.props.t('common.error_boundary_retry')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}