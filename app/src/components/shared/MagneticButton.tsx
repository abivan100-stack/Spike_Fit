import type { ButtonHTMLAttributes } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function MagneticButton({ className = '', ...rest }: Props) {
  const ref = useMagnetic<HTMLButtonElement>();
  return <button ref={ref} className={className} {...rest} />;
}
