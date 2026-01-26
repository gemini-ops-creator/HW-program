import type {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";

type TypographyVariant = string;

type TextProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  variant?: TypographyVariant;
  size?: string;
  weight?: string;
  color?: string;
  className?: string;
  as?: ElementType;
};

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
  level?: HeadingLevel;
  size?: string;
  weight?: string;
  color?: string;
  className?: string;
  variant?: TypographyVariant;
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  size?: string;
  weight?: string;
  color?: string;
  className?: string;
  variant?: TypographyVariant;
  disabled?: boolean;
};

const getTypographyClasses = (
  variant?: TypographyVariant,
  size?: string,
  weight?: string,
  color?: string,
  className?: string
) => {
  const classes = [];

  if (variant) classes.push(variant);
  if (size) classes.push(`text-${size}`);
  if (weight) classes.push(`font-${weight}`);
  if (color) classes.push(`text-${color}`);
  if (className) classes.push(className);

  return classes.join(" ");
};

export function Text({
  children,
  variant,
  size = "base",
  weight = "normal",
  color = "secondary",
  className = "",
  as = "p",
  ...props
}: TextProps) {
  const Component = as;
  const classes = getTypographyClasses(variant, size, weight, color, className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export function Heading({
  children,
  level = 4,
  size,
  weight = "normal",
  color = "primary",
  className = "",
  variant,
  ...props
}: HeadingProps) {
  const Component = `h${level}` as ElementType;
  const classes = getTypographyClasses(variant, size, weight, color, className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export function Link({
  children,
  href = "#",
  size = "sm",
  weight = "normal",
  color = "secondary",
  className = "",
  variant,
  disabled = false,
  ...props
}: LinkProps) {
  const classes = getTypographyClasses(variant, size, weight, color, className);

  if (disabled) {
    const { onClick: _onClick, ...rest } = props;
    return (
      <span className={classes} style={{ cursor: "default" }} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

export function FooterText({ children, className = "", ...props }: TextProps) {
  return (
    <Text variant="footer-text" className={className} {...props}>
      {children}
    </Text>
  );
}

export function FooterLinkTitle({
  children,
  className = "",
  ...props
}: HeadingProps) {
  return (
    <Heading
      level={4}
      variant="footer-link-title"
      className={className}
      {...props}
    >
      {children}
    </Heading>
  );
}

export function FooterLink({
  children,
  disabled = false,
  className = "",
  ...props
}: LinkProps) {
  return (
    <Link
      variant="footer-link"
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}

export function FooterCredits({
  children,
  className = "",
  ...props
}: TextProps) {
  return (
    <Text variant="footer-credits" className={className} as="div" {...props}>
      {children}
    </Text>
  );
}
