import { useState } from "react";

const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0ede8'/%3E%3Ctext x='50%25' y='50%25' font-family='system-ui' font-size='14' fill='%23a09080' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

type SafeImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fallback?: string;
};

export function SafeImg({ src, alt, fallback = FALLBACK, ...rest }: SafeImgProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <img
      {...rest}
      src={failed ? fallback : imgSrc}
      alt={alt}
      onError={() => {
        if (!failed) {
          setFailed(true);
          setImgSrc(fallback);
        }
      }}
    />
  );
}
