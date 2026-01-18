export const isValidWebsite = (siteData) => {
  if (!siteData) return false;

  const { pages, title, icon } = siteData;

  // Must have pages object with at least one entry
  if (!pages || typeof pages !== "object" || Object.keys(pages).length === 0) {
    console.error("Website must have at least one page in 'pages'");
    return false;
  }

  // Each page must be a function (React component)
  for (const [viewName, Page] of Object.entries(pages)) {
    if (typeof Page !== "function") {
      console.error(`Page '${viewName}' must be a React component`);
      return false;
    }
  }

  // Title must exist
  if (!title || typeof title !== "string") {
    console.error("Website must have a valid 'title'");
    return false;
  }

  // Icon must exist
  if (!icon) {
    console.error("Website must have an 'icon'");
    return false;
  }

  return true;
};
