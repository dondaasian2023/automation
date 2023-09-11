import getUserGroups from 'src/app/web/modules/UserManagment/api/services/getUserGroups';

export const useUserGroupsIds = async client => {
    const userGroups = await getUserGroups(client);
    return userGroups.map(({ id }) => id);
};
