import React from "react";

const getTypographyClasses = (variant, size, weight, color, className) => {
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
}) {
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
}) {
  const Component = `h${level}`;
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
}) {
  const classes = getTypographyClasses(variant, size, weight, color, className);

  if (disabled) {
    return (
      <span className={classes} style={{ cursor: "default" }} {...props}>
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

export function FooterText({ children, className = "", ...props }) {
  return (
    <Text variant="footer-text" className={className} {...props}>
      {children}
    </Text>
  );
}

export function FooterLinkTitle({ children, className = "", ...props }) {
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
}) {
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

export function FooterCredits({ children, className = "", ...props }) {
  return (
    <Text variant="footer-credits" className={className} as="div" {...props}>
      {children}
    </Text>
  );
}
