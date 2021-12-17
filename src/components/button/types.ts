export interface ButtonProps {
    children: any;
    variant: 'primary' | 'secondary';
    onClick: () => void;
    className?: any;
  }