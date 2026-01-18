import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Tab from '../Tabs/Tab';
import UrlSearchBox from '../UrlSearchBox/UrlSearchBox';
import DefaultBrowserPage from '../../pages/DefaultBrowserPage/DefaultBrowserPage';

// Hooks / Context
import { useBrowserContext } from '../../../../marrfeeOSHooks/hooks/contexts';

// Assets & styles
import appLogo from '../../assets/marrfee-logo.png';
import plusIcon from '../../assets/plus.png';
import minimizeIcon from '../../assets/minimize.png';
import minusIcon from '../../assets/minus-sign.png';
import closeIcon from '../../assets/close.png';
import './tabsFrame.css';
import BrowserTabRenderer from '../BrowserTabRenderer/BrowserTabRenderer';
import Error404Page from '../../pages/ErrorPage/Error404Page';



const DEFAULT_TAB = {
  id: Date.now(),
  title: 'New Tab',
  icon: appLogo,
  pageUrl: null,
  inputUrl: '',
};

const TabsFrame = () => {
    // Local component state
    const [tabs, setTabs] = useState([{ ...DEFAULT_TAB }]);
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();
    const { visitWebpage } = useBrowserContext();

    const handleTabSwitch = index => {
        if (index !== activeIndex) setActiveIndex(index);
    };

    const addNewTab = () => {
        setTabs(prev => {
            const newTabs = [...prev, { ...DEFAULT_TAB }];
            setActiveIndex(newTabs.length - 1);
            return newTabs;
        });
    };

    const handleDeleteTab = index => {
        if (tabs.length === 1) {
            navigate('/homeScreen');
            return;
        }

        setTabs(prevTabs => {
            const newTabs = prevTabs.filter((_, i) => i !== index);

            setActiveIndex(prevActive => {
                if (index < prevActive) return prevActive - 1;
                if (index === prevActive) {
                    // If there's a tab to the right, keep same index; otherwise move to last
                    return prevActive < newTabs.length ? prevActive : newTabs.length - 1;
                }
                return prevActive;
            });

            return newTabs;
        });
    };

    const handleChange = (name, value) => {
        // Only handle the top url searchbox here
        if (name === 'url') {
            setTabs(prev => {
                const newTabs = [...prev];
                const idx = activeIndex >= 0 && activeIndex < newTabs.length ? activeIndex : 0;
                newTabs[idx] = { ...newTabs[idx], inputUrl: value };
                return newTabs;
            });
        }
    };

    const handleSearch = () => {
        const currentUrl = (tabs[activeIndex] && tabs[activeIndex].inputUrl) || '';
        const webpage = visitWebpage(currentUrl);

        if (!webpage) {
            setTabs(prevTabs => {
                const newTabs = [...prevTabs];

                newTabs[activeIndex] = {
                    ...newTabs,
                    Page: Error404Page,
                    pageUrl: currentUrl,
                    title: "404 error",
                };
                return newTabs
            })
        } else{

            setTabs(prevTabs => {
                const newTabs = [...prevTabs];

                newTabs[activeIndex] = {
                    ...newTabs[activeIndex],
                    pageUrl: currentUrl,
                    title: webpage.title,
                    icon: webpage.icon,
                };

                return newTabs;
            });
        }

    };


    const handleSearchFromDefault = (url) => {
        const webpage = visitWebpage(url);

        if (!webpage) {
            setTabs(prevTabs => {
                const newTabs = [...prevTabs];

                newTabs[activeIndex] = {
                    ...newTabs[activeIndex],
                    Page: Error404Page,
                    pageUrl: url,
                    title: "404 error",
                };
                return newTabs
            })
        } else {
            setTabs(prevTabs => {
                const newTabs = [...prevTabs];

                newTabs[activeIndex] = {
                    ...newTabs[activeIndex],
                    pageUrl: url,
                    title: webpage.title,
                    icon: webpage.icon,
                };

                return newTabs;
            });
        }
    };

    const exit404Page = () => {
        setTabs(prevTabs => {
            const newTabs = [...prevTabs];

            newTabs[activeIndex] = {
                ...newTabs,
                Page: DefaultBrowserPage,
                pageUrl: "",
                title: "New Tab",
                icon: appLogo
            };
            return newTabs
        })
    }

    // Derived helpers
    const activeTab = tabs[activeIndex] || { pageUrl: null };
    
    return (
        <div className="MBr-tabs-frame-contr">
            <div className="top-section">
                <div className="MBr-tabs-container">
                    {tabs.map((tab, index) => (
                        <Tab
                            {...tab}
                            key={index}
                            id={index}
                            className={`${index === activeIndex ? 'active' : ''}`}
                            removeTab={() => handleDeleteTab(index)}
                            onClick={() => handleTabSwitch(index)}
                        />
                    ))}

                    <button className="new-tab-btn" onClick={addNewTab}>
                        <img src={plusIcon} alt="add tab" />
                    </button>
                </div>

                <div className="exit-action-container">
                    <button className="exit-action-btn">
                        <img src={minusIcon} alt="drop" />
                    </button>
                    <button className="exit-action-btn">
                        <img src={minimizeIcon} alt="minimize" />
                    </button>
                    <button className="exit-action-btn exit-btn" onClick={() => navigate('/homeScreen')} >
                        <img src={closeIcon} alt="exit"/>
                    </button>
                </div>
            </div>
                    
            <UrlSearchBox onChange={handleChange} value={(tabs[activeIndex] && tabs[activeIndex].inputUrl) || ''} onSearch={handleSearch} />

            <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`MBr-page-content-container`}
            >
                {activeTab.title === "404 error" ? (<Error404Page onExit={exit404Page} />) : activeTab.pageUrl ? (
                    <BrowserTabRenderer pageUrl={activeTab.pageUrl} />
                ) : (
                    <DefaultBrowserPage onSearchFromDefault={handleSearchFromDefault} />
                )}
            </motion.div>
        </div>
    );
};

export default TabsFrame;