import React from "react";
import logoSvg from "../../assets/icons/logo.svg";

function Logo({ className, alt = "Logo", loading = "lazy", ...rest }) {
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
