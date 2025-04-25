import Image from "next/image";

export default function ComponentImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded border">
      <Image
        src={src || "/placeholder-component.png"}
        alt={alt}
        width={48}
        height={48}
        className="object-contain"
      />
    </div>
  );
}
