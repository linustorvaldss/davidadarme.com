
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import type { FC } from "react";

const RESOURCE_URL = process.env.NEXT_PUBLIC_CF_R2_BUCKET_URL ?? "";

const CustomImage: FC<{ src: string; alt?: string }> = ({
  src,
  alt = "",
}) => {
  const imageUrl = `${RESOURCE_URL}${src}`;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={800}
      height={600}
      sizes="(max-width: 800px) 100vw, 800px"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

const MDXcomponents = {
  img: CustomImage,
};

export const MDXProvider = ({ source }: { source: any }) => {
  return (
    <MDXRemote
      {...source}
      components={MDXcomponents}
    />
  );
};

export default MDXcomponents;