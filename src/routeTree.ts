import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root";
import { HomePage } from "./routes/index";
import { SearchPage } from "./routes/search";
import { ListingDetailPage } from "./routes/listing.$id";
import { HostPage } from "./routes/host";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const listingIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listing/$id",
  component: ListingDetailPage,
});

const hostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/host",
  component: HostPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  listingIdRoute,
  hostRoute,
]);
