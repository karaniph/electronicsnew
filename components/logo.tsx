import Link from "next/link"

interface LogoProps {
  variant?: "default" | "white"
  size?: "small" | "medium" | "large"
  showText?: boolean
}

export function Logo({ variant = "default", size = "medium", showText = true }: LogoProps) {
  const color = variant === "white" ? "#FFFFFF" : "#000000"

  const sizeClasses = {
    small: "h-8",
    medium: "h-10",
    large: "h-12",
  }

  return (
    <Link href="/" className="flex items-center">
      <div className={`${sizeClasses[size]} flex items-center`}>
        <svg
          width={size === "small" ? 40 : size === "medium" ? 48 : 56}
          height={size === "small" ? 32 : size === "medium" ? 40 : 48}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 15.163 32.837 8 24 8ZM24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C30.627 12 36 17.373 36 24C36 30.627 30.627 36 24 36Z"
            fill={color}
          />
          <path
            d="M24 16C19.582 16 16 19.582 16 24C16 28.418 19.582 32 24 32C28.418 32 32 28.418 32 24C32 19.582 28.418 16 24 16ZM24 28C21.791 28 20 26.209 20 24C20 21.791 21.791 20 24 20C26.209 20 28 21.791 28 24C28 26.209 26.209 28 24 28Z"
            fill={color}
          />
          <path
            d="M24 4C13.059 4 4 13.059 4 24C4 34.941 13.059 44 24 44C34.941 44 44 34.941 44 24C44 13.059 34.941 4 24 4ZM24 40C15.163 40 8 32.837 8 24C8 15.163 15.163 8 24 8C32.837 8 40 15.163 40 24C40 32.837 32.837 40 24 40Z"
            fill={color}
          />
        </svg>
        {showText && (
          <span
            className={`font-bold text-${variant === "white" ? "white" : "black"} ${size === "small" ? "text-lg" : size === "medium" ? "text-xl" : "text-2xl"}`}
          >
            ElectronicsParts
          </span>
        )}
      </div>
    </Link>
  )
}
