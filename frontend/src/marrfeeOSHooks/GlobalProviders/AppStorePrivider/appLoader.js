import { lazy } from "react";
import digIdAppLogo from '../../../APPS/digID/frontend/src/assets/secure.png';
import rpsAppLogo from '../../../APPS/RPS/src/assets/rps.png';
import budgetlyAppLogo from '../../../APPS/Budgetly/budgetly-frontend/src/assets/app-logo.png';

const appLoaderMap = {
    marrfeeBrowser: { Component: lazy(() => import('../../../MarrfeeBrowser').then(m => ({ default: m.MarrfeeBrowser })))},
    marrfeeAppStore: { Component: lazy(() => import('../../../MarrfeeAppStore').then(m => ({ default: m.MarrfeeAppStore })))},
    digIDApp: { Component: lazy(() => import('../../../APPS/digID/frontend').then(m => ({ default: m.DigID }))), appLogo: digIdAppLogo},
    rpsApp: { Component: lazy(() => import('../../../APPS/RPS').then(m => ({ default: m.RockPaperScissors }))), appLogo: rpsAppLogo },
    budgetlyFinanceApp: { Component: lazy(() => import('../../../APPS/Budgetly/budgetly-frontend').then(m => ({ default: m.BudgetlyApp }))), appLogo: budgetlyAppLogo},
}

export default appLoaderMap;
