const nameLabel = 'Name';

export default function getEntryNameByEntryConfig(entryConfig) {
    return entryConfig.find(field => field.name === nameLabel).value;
}
