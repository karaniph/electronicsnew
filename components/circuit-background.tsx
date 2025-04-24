export function CircuitBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M0 50 H30 M70 50 H100 M50 0 V30 M50 70 V100"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.2"
              fill="none"
            />
            <circle cx="50" cy="50" r="3" fill="currentColor" fillOpacity="0.2" />
          </pattern>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="currentColor" fillOpacity="0.1" />
          </pattern>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <rect width="100%" height="100%" fill="url(#circuit)" />
        <rect width="100%" height="100%" fill="url(#fadeGradient)" />

        {/* Circuit paths */}
        <path
          d="M200,200 L400,200 L400,400 L600,400 L600,600 L800,600"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
          fill="none"
        />
        <path
          d="M300,100 L300,300 L500,300 L500,500 L700,500 L700,700"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
          fill="none"
        />
        <path
          d="M150,350 L250,350 L250,450 L450,450 L450,550 L650,550 L650,750"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
          fill="none"
        />

        {/* Component nodes */}
        <circle cx="400" cy="200" r="5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="600" cy="400" r="5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="300" cy="300" r="5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="500" cy="500" r="5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="250" cy="450" r="5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="650" cy="550" r="5" fill="currentColor" fillOpacity="0.3" />
      </svg>
    </div>
  )
}
