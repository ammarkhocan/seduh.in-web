import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/layout-main.tsx", [
    index("routes/home.tsx"),
    // route /produts/:slug
  ]),
] satisfies RouteConfig;
