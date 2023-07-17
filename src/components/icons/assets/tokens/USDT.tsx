import Image from "next/image";
import { SVGProps } from "react";

export function USDT(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <div
      style={{ width: props.width, height: props.height, position: "relative" }}
    >
      <Image
        unoptimized
        src={require("@content/prices/images/usdt.png")}
        fill
        style={{ objectFit: "contain", objectPosition: "left" }}
        alt="USDT Logo"
      />
    </div>
  );
}
