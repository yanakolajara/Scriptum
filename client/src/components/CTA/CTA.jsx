import './CTA.scss';

export const CTA = ({
  children,
  variant = 'base',
  size = 'medium',
  disabled = false,
  href,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  radius = 'default',
  borderStyle = 'solid',
}) => {
  const baseClass = 'cta';
  const classes = `
    cta
    cta--variant-${variant} 
    cta--size-${size} 
    cta--radius-${radius}
    cta--border-${borderStyle}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className='cta__icon'>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className='cta__icon'>{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
