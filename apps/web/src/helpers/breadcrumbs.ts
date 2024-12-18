// helpers/breadcrumbs.ts
export interface Breadcrumb {
  label: string;
  href: string;
}

export const generateBreadcrumbs = (path: string): Breadcrumb[] => {
  // Remove any query parameters
  const pathWithoutQuery = path.split("?")[0];

  // Split the path into segments
  const pathSegments = pathWithoutQuery.split("/").filter((segment) => segment);

  // Generate breadcrumbs
  const breadcrumbs: Breadcrumb[] = [];
  let currentPath = "";

  // Always add home as the first breadcrumb
  breadcrumbs.push({
    label: "Home",
    href: "/",
  });

  // Generate remaining breadcrumbs
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;

    // Convert path segment to readable label
    const label = segment
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
};
