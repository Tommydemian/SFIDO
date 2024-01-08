import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
export const CollageSvg = (props: SvgProps) => (
  <Svg width={33} height={33} fill="none" {...props}>
    <Path fill="url(#a)" d="M0 0h33v33H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.01111)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVR4nO3cTU4DMRAF4V4R7gBHJHBLflYJR0Fh/5ClQYqQspupMXZ9F4hdaXl2XSVJkiRJkqRKcp/kJclHku9srG7Y+neXu70neU5yQP/6JI9JPgOq/UJfO7e7k5OMRu4o9G/s7Sd7eS4ycejmSIRub/Lsod+I0Jc9blZ9hb4QoXdR/+Q8hl6ZoSGGhhgaYmiIoSGGhhgaYmiIoSGGhhgaYmiIoSHThR6WoSGGhhgaYmiIoScNnc7OY+iVGRpiaIihIYaGGBpiaIihIYaGGBpi6FFC9yY7qdnE0IYeSpxoQw8lo050bxdLZ+cx9MoMDTE0xNAQQ0MMDTE0xNAQQ0MMDTE0xNAQQ0MMPVBo17ElX0RoFwyGWTDYts7i6vZ59vBEhD4si1BnDX1Kcrd56Ku1xucJQ5+SPCCR/0z2sb1XxAey9gvd7vbangtskiVJkiRJkqpvP5JFx7/Rv+M0AAAAAElFTkSuQmCC"
        id="b"
        width={90}
        height={90}
      />
    </Defs>
  </Svg>
);
