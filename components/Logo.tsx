import Link from "next/link";
import LogoImage from "@/images/logo/logo.svg"
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

const Logo=() => {
    return (
      <Link href="/" prefetch={false} className="overflow-hidden">
        <div className="flex item-center w-72 h-24">
          <AspectRatio
          ratio={16/9}
          className="flex item-center justify-center">
            <Image
            priority
            src={LogoImage}
            alt="logo"
            className="dark:filter dark:invert"
            />

          </AspectRatio>

        </div>

      </Link>
    )
  }
  
  export default Logo;