export default function cookEntryFormListConfig(fields) {
    const appropriateFields = fields.filter(item => item.isDataEditable !== false);
    const layoutConfig = appropriateFields.map(item => ({
        fieldId: item.id,
        startPosition: 0,
        width: 6,
    }));

    return {
        tabs: [
            {
                name: 'Details',
                rows: [{ layoutConfig }],
            },
        ],
    };
}
