import { lazy } from "react";
import Simple from "./Simple";

export default {
  Simple,
  HelloReactSurface: lazy(() => import("./HelloReactSurface")),
};
