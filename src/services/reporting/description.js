import env from 'src/services/environment';

const applyEnv = description => `${env.toString} - ${description}`;
const description = {
    applyEnv,
};

export default description;
