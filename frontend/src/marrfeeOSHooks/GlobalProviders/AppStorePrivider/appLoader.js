import { lazy } from "react";

const appLoaderMap = {
    marrfeeBrowser: { Component: lazy(() => import('../../../MarrfeeBrowser').then(m => ({ default: m.MarrfeeBrowser })))},
    marrfeeAppStore: { Component: lazy(() => import('../../../MarrfeeAppStore').then(m => ({ default: m.MarrfeeAppStore })))}
}

export default appLoaderMap;
