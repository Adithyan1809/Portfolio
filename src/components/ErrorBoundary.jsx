import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '12rem 2rem 6rem', textAlign: 'center', minHeight: '60vh' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
            Something went wrong loading this page
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <a href="/blog" className="btn btn-secondary mono-text" style={{ marginRight: '1rem' }}>
            Back to Blog
          </a>
          <a href="/" className="btn btn-primary mono-text">
            Go Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
