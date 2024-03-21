import {FC} from 'react';
import styled from 'styled-components';

type SpinnerProps = {
    style?: any;
    size?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
};

const SpinContainerStyled = styled.div<{size: number; color: string}>`
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
    position: relative;
    background: transparent;
    width: ${({size}) => (size && size + 'px') || '100%;'};
    height: ${({size}) => (size && size + 'px') || '100%;'};
    & > div {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: ${({size}) => (size && -(size / 2) + 'px') || '-25px'};
        height: 100%;
        width: 100%;
        border-top: 5px solid ${({color}) => color};
        border-right: 5px solid transparent;
        border-radius: 50%;
        box-shadow: -3px -5px 5px -6px ${({color}) => color};
        animation: spin 1s linear infinite;
    }
`;

const Spinner: FC<SpinnerProps> = (props: SpinnerProps) => {
    const {style, size = 30, className, color = '#fff'} = props;
    return (
        <SpinContainerStyled
            style={style}
            className={className}
            size={size}
            color={color}
        >
            <div data-testid="spinner" />
        </SpinContainerStyled>
    );
};

export default Spinner