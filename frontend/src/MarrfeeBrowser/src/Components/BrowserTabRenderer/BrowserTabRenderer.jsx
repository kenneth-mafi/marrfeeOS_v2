import { useState } from 'react';
import DefaultBrowserPage from '../../pages/DefaultBrowserPage/DefaultBrowserPage';
import { useBrowserContext } from '../../../../marrfeeOSHooks/hooks/contexts';

const BrowserTabRenderer = ({ pageUrl }) => {
    const { visitWebpage } = useBrowserContext();

    if (!pageUrl) return <DefaultBrowserPage />;
    
    const site = visitWebpage(pageUrl);
    if (!site) return <DefaultBrowserPage />;

    const [view, setView] = useState('welcome');

    // Prefer a single `Page` if provided, otherwise fall back to the pages map.
    const PageComponent = site.Page || site.pages?.[view];

    if (!PageComponent) return <DefaultBrowserPage />;

    return <PageComponent navigateTo={setView} />;
};

export default BrowserTabRenderer;
