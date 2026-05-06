import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a0533 0%, #2c1e7d 50%, #4D04A0 100%)',
            color: '#fff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: 'clamp(12px, 4vw, 20px)',
            textAlign: 'center',
            maxWidth: '90%',
            boxSizing: 'border-box',
            wordBreak: 'break-word',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '24px', opacity: 0.85 }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '16px',
                borderRadius: '8px',
                maxWidth: 'min(600px, 100%)',
                overflow: 'auto',
                fontSize: '0.85rem',
                marginBottom: '24px',
                textAlign: 'left',
              }}
            >
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#fff',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.25)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.15)'; }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
