import Image, {ImageProps} from "next/image";
import React from "react";

type SmartHubLogoProps = Omit<ImageProps, 'src' | 'alt'>;

export default function SmartHubLogo(props: SmartHubLogoProps) {
  return (
    <Image
      src="/logo/SmartHub-logo.png"
      className={`w-1/4 h-auto ml-2 ${props.className ?? ""}`}
      alt="SmartHub Logo"
      width="0"
      height="0"
      sizes="100vw"
      priority={true}
      {...props}
    />
  );
}