import React, { Component } from 'react';
import Fallback from '../pages/Fallback';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        error: false,
      }
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Logging', error, errorInfo);
    }

    render() {
        return this.state.error ? <Fallback /> : this.props.children;
    }
}

export default ErrorBoundary;