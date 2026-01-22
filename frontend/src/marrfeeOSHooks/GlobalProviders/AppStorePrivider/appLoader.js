import { lazy } from "react";
import digIdAppLogo from '../../../APPS/digID/frontend/src/assets/secure.png';
import rpsAppLogo from '../../../APPS/RPS/src/assets/rps.png';
const appLoaderMap = {
    marrfeeBrowser: { Component: lazy(() => import('../../../MarrfeeBrowser').then(m => ({ default: m.MarrfeeBrowser })))},
    marrfeeAppStore: { Component: lazy(() => import('../../../MarrfeeAppStore').then(m => ({ default: m.MarrfeeAppStore })))},
    digIDApp: { Component: lazy(() => import('../../../APPS/digID/frontend').then(m => ({ default: m.DigID }))), appLogo: digIdAppLogo},
    rpsApp: { Component: lazy(() => import('../../../APPS/RPS').then(m => ({ default: m.RockPaperScissors }))), appLogo: rpsAppLogo }
}

export default appLoaderMap;
