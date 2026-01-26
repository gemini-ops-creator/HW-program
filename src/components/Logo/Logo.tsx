import type { ImgHTMLAttributes } from "react";
import logoSvg from "../../assets/icons/logo.svg";

type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

function Logo({
  className,
  alt = "Logo",
  loading = "lazy",
  ...rest
}: LogoProps) {
  return (
    <img
      src={logoSvg}
      alt={alt}
      className={className}
      loading={loading}
      {...rest}
    />
  );
}

export default Logo;
