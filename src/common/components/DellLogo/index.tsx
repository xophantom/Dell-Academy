import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
};

export const DellLogo: React.FC<Props> = ({
  width = "auto",
  height = "auto",
}) => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 700 700"
      id="svg4"
      style={{ margin: "auto", width, height }}
      data-testid="dell-logo"
    >
      <defs id="defs8" />
      <path
        d="m 350,124.08833 c -123.7478,0 -225.91167,102.16388 -225.91167,225.91168 0,123.74778 100.72495,225.91167 225.91167,225.91167 125.18673,0 225.91167,-100.72495 225.91167,-225.91167 C 575.91167,224.81328 473.74779,124.08833 350,124.08833 Z m 0,428.8005 c -112.23637,0 -202.88883,-90.65246 -202.88883,-202.88883 0,-112.23638 90.65246,-202.88884 202.88883,-202.88884 112.23637,0 202.88883,90.65246 202.88883,202.88884 0,112.23637 -90.65246,202.88883 -202.88883,202.88883 z M 525.54921,380.21749 v 20.145 h -63.31284 v -99.28603 h 23.02286 v 79.14103 z m -294.98022,18.70607 c 23.02284,0 43.16783,-15.82821 47.48461,-37.41213 l 56.11819,43.16783 56.11819,-43.16783 v 37.41213 h 63.31282 v -20.145 h -41.72889 v -79.14102 h -23.02286 v 37.41212 L 335.61072,380.21749 324.09929,370.145 350,350.00001 377.33962,328.41609 361.51141,315.46574 308.27109,357.19465 296.75968,347.12215 350,306.83217 334.17179,293.88182 278.0536,337.04966 c -5.7557,-21.58392 -24.46177,-37.41212 -47.48461,-37.41212 h -40.28998 v 99.28602 c 0,0 40.28999,0 40.28998,0 z m -18.70606,-18.70607 v -60.43497 h 17.26713 c 14.38929,0 27.33963,12.95035 27.33963,30.21749 0,15.8282 -11.51142,30.21748 -27.33962,30.21748 0,0 -17.26714,0 -17.26714,0 z"
        id="path2"
        style={{ fill: "#007db8", fillOpacity: 1, strokeWidth: 14.38927937 }}
      />
    </svg>
  );
};