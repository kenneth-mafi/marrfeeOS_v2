import { useEffect, useState } from 'react';
import { BrowserContext } from '../contexts/contexts';


const BrowserProvider = ({ children }) => {
    const [webPages, setWebPages] = useState({});

    useEffect(() => {
        console.log('Browser registry:', webPages);
    }, [webPages]);

    
    const isValidWebsite = site => {
        if (!site) return false;
        // Accept if a single Page component is provided or a pages map with at least one entry
        const hasPage = !!site.Page;
        const hasPagesMap = !!site.pages && Object.keys(site.pages).length > 0;
        return !!site.title && (hasPage || hasPagesMap);
    };

    // deployToWeb accepts either raw siteData or an object like { siteData }
    const deployToWeb = (site) => {
        
        const siteData = site?.siteData ?? site;
        if (!siteData) {
            console.error('No siteData provided');
            return;
        }

        if (!isValidWebsite(siteData)) {
            console.error('Invalid website, deployment aborted');
            return;
        }

        const urlKey = siteData.url || `site-${Date.now()}`;

        setWebPages(prev => ({
            ...prev,
            [urlKey]: siteData,
        }));

        console.log(`Website '${siteData.title}' deployed successfully!`);
        return;
    };

    // visitWebpage returns a normalized object with a `Page` field (a single component),
    // along with title and icon to match what consumers expect.
    const visitWebpage = (url) => {
        if (!url) {
            console.log('No URL');
            return undefined;
        }
        
        const site = webPages[url];
        
        if (!site) return undefined;

        // If a single Page is present use it, otherwise pick the first page from `pages` map
        const Page = site.Page || site.pages?.[Object.keys(site.pages || {})[0]];

        return {
            Page,
            title: site.title,
            icon: site.icon,
            pages: site.pages,
        };
    };

    return (
        <BrowserContext.Provider value={{ visitWebpage, deployToWeb }}>
            {children}
        </BrowserContext.Provider>
    );
};

export default BrowserProvider;