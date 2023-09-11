import env from 'src/services/environment';
import theme from 'src/services/theme';

const DEFAULT_CONFIG = env.default;
const USER_PROPERTIES = {
    CLIENT_IDS: 'CLIENT_IDS',
};

const {
    USERS: [USER],
} = env.default;

function getUserClients({ CLIENT_ID, CLIENT_IDS = null }, config = DEFAULT_CONFIG) {
    const clients = config?.CLIENTS;

    if (!CLIENT_IDS) {
        return findClientById(clients, CLIENT_ID) ?? [];
    }

    return CLIENT_IDS.reduce((acc, id) => {
        const existentClient = findClientById(clients, id);
        if (existentClient) {
            acc.push(existentClient);
        }
        return acc;
    }, []);
}

const getUsersWithMultipleClients = (config = DEFAULT_CONFIG) => {
    if (theme.isOP) {
        throw Error('Multiple clients functionality is not supported by OP theme');
    }
    return config.USERS?.filter(user => user.hasOwnProperty(USER_PROPERTIES.CLIENT_IDS));
};

const getNoMobileAccessUser = (config = DEFAULT_CONFIG) => {
    if (theme.isDC) {
        const user = config.USERS.find(user => user.USER_GROUP.includes('MobileOff'));
        const clientName = user[USER_PROPERTIES.CLIENT_IDS]
            ? getUserClients(user).find(client => client.USER_GROUP === 'MobileOff')?.TEXT
            : null;
        return [user, clientName];
    } else {
        const user = config.USERS.find(user => user.USER_GROUP === 'MobileOff');
        return [user];
    }
};

const findClientById = (clients, clientId) => clients?.find(({ VALUE }) => VALUE === clientId);

function getCurrentUserFullName() {
    return `${USER.FIRST_NAME} ${USER.LAST_NAME}`;
}

export function getUserFullName({ FIRST_NAME, LAST_NAME }) {
    return `${FIRST_NAME} ${LAST_NAME}`;
}

const userService = {
    getUserClients,
    getUsersWithMultipleClients,
    getCurrentUserFullName,
    getNoMobileAccessUser,
};

export default userService;
