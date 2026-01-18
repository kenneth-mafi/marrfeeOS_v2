import appLogo from '../../../MarrfeeBrowser/src/assets/marrfee-logo.png';

const getDefaultApps = () => {
    return [
            {
                id: 'marrfeeBrowser',
                appName: 'Marrfee Browser',
                path: '/marrfeeBrowser',
                appLogo: appLogo,
                color: "whitesmoke",
                allowedDevices: ["desktop", "laptop", "mobile"],
                isInstalled: true,
                description: "",
                appStoreName: "",
                category: "",
                type: "",
                size: "",
            },
        ];
}

export default getDefaultApps;