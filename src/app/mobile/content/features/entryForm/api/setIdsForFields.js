export default function setIdsForFields(fieldsToCreateData, fieldsFromApi) {
    const result = [];
    for (let field of fieldsToCreateData) {
        const foundedField = fieldsFromApi.find(({ name }) => name === field.name);
        if (foundedField) {
            result.push({ value: field.value, id: foundedField.id });
        } else {
            const availableFields = fieldsFromApi.map(({ name }) => name);
            throw Error(
                `Cannot find field with name '${field.name}'.\nAvailable options: ${availableFields}`
            );
        }
    }
    return result;
}
