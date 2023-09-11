import getListFields from 'src/app/web/modules/Lists/api/services/getListFields';

export const getFieldsIds = fields => fields.map(field => field.id);
export const getFieldsNames = fields => fields.map(field => field.name);

export const useListFields = async (restClient, listId) => {
    const listFields = await getListFields(restClient, listId);
    const fieldsIds = getFieldsIds(listFields);
    const fieldsNames = getFieldsNames(listFields);
    return { listFields, fieldsIds, fieldsNames };
};
