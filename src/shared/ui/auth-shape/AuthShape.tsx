import "./auth-shape.css";

type AuthShapeProps = {
  side?: "left" | "right";
  className?: string;
};

export default function AuthShape({ side = "right", className }: AuthShapeProps) {
  const classes = className ?? "";

  if (side === "left") {
    return (
      <svg
        className={classes}
        viewBox="0 0 700 857"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMinYMin meet"
      >
        <path
          d="M22.0623 18.1923C22.0623 6.49696 32.4061 -2.58287 43.5912 0.666411C49.1229 2.27335 54.5856 4.1995 59.9521 6.44463L354.339 170.842C378.546 194.024 394.69 224.679 400 258.144V598.874C394.688 632.331 378.543 662.977 354.343 686.154L59.9258 850.567C54.5677 852.807 49.1139 854.729 43.5913 856.334C32.4061 859.583 22.0623 850.503 22.0623 838.807V18.1923Z"
          fill="url(#leftGrad)"
          className="shape-fade shape-fade--1"
        />

        <defs>
          <linearGradient id="leftGrad" x1="0" y1="0" x2="0" y2="857" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5260FF" />
            <stop offset="1" stopColor="#CEDEFF" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className={classes}
      viewBox="-400 0 800 857"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMin meet"
    >
      <path
        d="M374.101 837.022C374.101 849.013 363.255 858.154 351.941 854.326C343.849 851.588 335.931 848.153 328.275 844.018L308.532 833.355L262.564 806.464C237.895 792.962 222.542 766.996 222.542 738.778V118.218C222.542 89.9995 237.894 64.0341 262.564 50.5324L308.405 23.7162L328.275 12.9859C335.931 8.85068 343.85 5.41299 351.943 2.67295C363.255 -1.15735 374.101 7.98293 374.101 19.974V837.022Z"
        fill="url(#rightGrad)"
        className="shape-fade shape-fade--1"
      />
      <path
        d="M199.52 740.278C199.52 754.747 184.235 764.055 171.463 757.363L124.434 732.722C99.765 719.22 84.4125 689.401 84.4125 661.182V196.025C84.4128 167.806 99.7646 137.987 124.434 124.485L171.464 99.846C184.236 93.1545 199.52 102.462 199.52 116.932V740.278Z"
        fill="url(#rightGrad)"
        className="shape-fade shape-fade--2"
      />
      <path
        d="M65.2278 659.915C65.2278 675.499 48.3538 683.675 38.4486 671.681C15.6327 644.052 0.000112213 606.768 0 574.576V282.428C1.56878e-06 246.379 14.5523 211.074 37.5169 183.449C47.6444 171.267 65.2278 179.605 65.2278 195.476V659.915Z"
        fill="url(#rightGrad)"
        className="shape-fade shape-fade--3"
      />

      <defs>
        <linearGradient id="rightGrad" x1="400" y1="0" x2="400" y2="857" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5260FF" />
          <stop offset="1" stopColor="#CEDEFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
