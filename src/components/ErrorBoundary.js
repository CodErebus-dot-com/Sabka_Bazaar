import React, { Component } from 'react';
import ErrorFallbackUI from '../pages/ErrorFallbackUI';

class ErrorBoundary extends Component {
  state = { error: false, errorMessage: "" };

  static getDerivedStateFromError(error) {
    return { error: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    const { error, errorMessage } = this.state;
    const { children } = this.props;

    return error ? <ErrorFallbackUI {...{ error, errorMessage }} /> : children;
  }
}

export default ErrorBoundary;