import Image from "next/image";
import { SVGProps } from "react";

export function ETH(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <div
      style={{ width: props.width, height: props.height, position: "relative" }}
    >
      <Image
        unoptimized
        src={require("@content/prices/images/eth.png")}
        fill
        style={{ objectFit: "contain", objectPosition: "left" }}
        alt="ETH Logo"
      />
    </div>
  );
}
