export default function applyCommonOptionsToFields(fields) {
    return fields.map((item, index) => ({
        ...item,
        id: -(index + 1),
        order: index + 1,
    }));
}
