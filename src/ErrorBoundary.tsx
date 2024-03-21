import React, {Component, ErrorInfo} from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught in ErrorBoundary: ', {
            error,
            errorInfo
        });
    }

    render() {
        return <>{this.props.children}</>;
    }
}
