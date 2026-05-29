import type {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number | string;
}

export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;
