import { getSystemFields } from 'src/app/web/modules/ListManagment/api/config/fieldConfigs/systemFields';

export function cookFullEntryConfig(entryConfig, { createdBy, modifiedBy }) {
    return [...entryConfig, ...getSystemFields({ createdBy, modifiedBy })];
}
