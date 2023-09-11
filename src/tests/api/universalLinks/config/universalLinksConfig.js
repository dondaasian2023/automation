const PROTOCOL = 'https://';

export const APP_NAME = {
    INTAPP_CRM: 'intapp.crm',
    DEALCLOUD: 'dealcloud.',
};

export const SUPPORTED_RESOURCES = [
    { DOMAIN: 'dealcloud.com', APP_NAME: APP_NAME.DEALCLOUD },
    { DOMAIN: 'intapp.com', APP_NAME: APP_NAME.INTAPP_CRM },
];

export const cookAppUrl = domain => `${PROTOCOL}${domain}`;
