import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const SFIDOLogo = (props: SvgProps) => (
  <Svg width={76} height={100} fill="none" {...props}>
    <G filter="url(#a)">
      <Path
        fill="#F8F1F3"
        d="M38.764.126c.045-1.359-9.446 8.596-14.612 15.779-.836 1.162-3.565 6.496-3.565 6.496-5.306 2.8-9.684 11.634-8.982 11.197.49-.305 4.206-2.03 3.343-1.313C-.968 45.508 6.176 60.478 6.233 60.482c.425.035-.106-3.714 2.53-4.528 1.101-.34-6.475 9.481 5.006 26.298 0 0-3.167-5.779 2.176-7.901 1.559-.62.672 10.366 15.065 16.582.278.119-3.814-4.518-2.38-3.457 10.658 7.895 21.831 3.07 21.846 3.008.006-.025-4.153-.421-3.565-1.23.804-1.106 3.812-.398 9.42-2.76 3.73-1.57 6.385-3.534 5.961-3.458-1.184.214-5.165 4.122-14.116 2.636-1.205-.2 4.073-1.276 7.385-2.84 4.39-2.07 8.616-4.785 7.35-4.537-7.854 1.54-13.299-1.292-13.36-1.916-.067-.684 3.682-1.156 2.904-1.215-5.555-.421-8.81-1.593-10.295-6.864-.957-3.394-1.698-8.596 4.724-9.694 5.915-1.01 7.8 3.538 15.337 1.731 5.629-1.348 7.664-7.205 8.845-8.666.335-.416-6.191-4.422-10.72-9.588-2.869-3.273-1.168-6.828-1.699-8.526-1.577-5.05-5.383-8.021-8.234-10.64-.433-.398.053-4.232.08-7.642.032-4.194.147-9.854 1.008-11.49 1.167-2.216-10.7 8.726-11.168 8.953-1.71.83-1.674-9.403-1.568-12.613Z"
      />
    </G>
    <G filter="url(#b)">
      <Path
        fill="url(#c)"
        d="M24.728 86.037c-.027 2.024-4.368-8.512-7.642-18.467-3.051-9.281-1.201-22.01 7.961-32.956 8.553-10.218 21.212-3.601 22.29-2.946-1.601-.975-2.268-1.885-7.53-4.69-2.696-.919-6.764-1.89-6.96-1.492 2.828-5.782 2.997-10.384 3.381-13.578.584-4.85.981-9.269 2.271-10.986.76-1.012-.027 10.558 1.493 11.832.529.443 9.386-8.577 11.59-9.195-1.062.297-1.037 8.046-1.037 8.454 0 8.208-.672 10.153-.264 10.551 1.712 1.665 7.906 7.351 8.295 10.995-.823 3.099-16.364 3.237-19.786 4.557-11.771 4.54-14.514 13.54-17.326 19.377-.47.973 3.658-5.227 10.11-3.35.535.156 8.835-3.947 16.955 2.448-7.324 3.37-7.089 5.726-6.563 10.526.3 2.741 1.826 6.974 10.438 8.102.125.016-3.044.894-2.875 1.106 2.131 2.662 11.429 2.546 13.387 2.022.769-.206-5.02 4.425-10.91 4.348-11.596-.153-14.174-4.332-16.346-7.588-4.591-6.882-1.624-10.092-1.838-10.206-1.035-.551-3.317 2.2-4.106 5.164-2.149 8.073 1.507 12.969 1.645 13.532.823 3.35-5.435-10.095-6.951-9.606-1.53.495.334 10.867.318 12.046Z"
        shapeRendering="crispEdges"
      />
    </G>
    <G filter="url(#d)">
      <Path
        fill="#0B526E"
        d="M39.135 34.939c1.864-.209 5.313-.304 8.757 1.539 4.39 2.348 7.124 6.959 6.475 7.695-.616.696-4.644-1.648-6.952-3.343-1.616-1.186-2.247-1.95-4.457-3.503a41.554 41.554 0 0 0-3.822-2.388Z"
      />
    </G>
    <G filter="url(#e)">
      <Path
        fill="#FF2E63"
        d="M32.662 25.439c-1.051-.128-3.034-6.571-.726-12.276C34.9 5.84 37.876 1.502 38.414.987c.82-.785-.948 2.806-1.975 9.613-.56 3.718-.313 6.186-1.602 10.383-.409 1.329-1.398 4.553-2.176 4.457v-.001Z"
      />
    </G>
    <G filter="url(#f)">
      <Path
        fill="#FF2E63"
        d="M44.947 18.615c-.146.463 1.513 1.251 2.52 1.888 1.11.702.92-3.608 1.91-9.34.9-5.206 1.937-7.102 1.3-6.642-.758.547-5.508 13.112-5.73 14.094Z"
      />
    </G>
    <G filter="url(#g)">
      <Path
        fill="#FF2E63"
        d="M71.066 51.673c-.596-.597-3.953.612-4.016 2.636-.025.797.457 1.83 1.124 1.918 1.41.185 3.585-3.857 2.891-4.554Z"
      />
    </G>
    <G filter="url(#h)">
      <Path
        fill="#08D9D6"
        d="M14.95 32.285c1.388-1.056 4.186-2.963 4.497-2.6.498.578-6.912 5.12-10.667 13.453-3.988 8.85-1.557 14.461-2.547 17.344-.21.61-2.206-5.326-1.478-11.071.677-5.342 3.085-9.035 4.258-10.791a26.288 26.288 0 0 1 5.937-6.334v-.001Z"
      />
    </G>
    <G filter="url(#i)">
      <Path
        fill="#08D9D6"
        d="M20.418 42.342c4.277-2.324 10.864-4.411 13.278-4.379.764.01-13.56 3.025-20.936 19.025-4.772 10.349-3.157 16.34-3.962 16.394-.643.044-2.206-5.326-1.478-11.07.677-5.343 1.115-8.056 3.849-12.488 2.54-4.12 4.245-4.763 9.25-7.482h-.001Z"
      />
    </G>
    <G filter="url(#j)">
      <Path
        fill="#08D9D6"
        d="M54.988 60.13c.696.118-2.675-2.773-5.849-3.62-.808-.214-2.377-.616-4.405-.339-.284.039-3.406.474-4.989 2.091-6.5 6.642 1.107 14.547 1.036 14.567-.046.014-2.415-4.295-.797-8.756.273-.75 1-2.427 2.548-3.742 2.282-1.937 4.298-1.583 12.455-.2h.001Z"
      />
    </G>
    <G filter="url(#k)">
      <Path
        fill="#08D9D6"
        d="M29.397 80.153c-.403.111-2.642-3.865-2.627-8.677.014-4.702 2.174-8.073 2.865-9.075a16.494 16.494 0 0 1 5.732-5.094c4.122-2.21 7.92-1.95 8.677-1.831.57.09-5.858.83-10.348 5.492-4.236 4.398-4.834 10.322-4.936 11.622-.343 4.406.985 7.466.637 7.563Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="c"
        x1={30.1}
        x2={62.993}
        y1={47.494}
        y2={47.494}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#0A516D" />
        <Stop offset={0.465} stopColor="#018790" stopOpacity={0.26} />
        <Stop offset={1} stopColor="#F77754" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);