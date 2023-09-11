import env from 'src/services/environment';
import theme from 'src/services/theme';
import { pageIds } from 'src/app/web/modules/Dashboard/api/constants/pageIds';

export const getEnvDashboardPageId = () => {
    switch (env.name) {
        case 'QA':
            return theme.isOP ? pageIds.OP_QA : pageIds.DC_QA;
        case 'QA2':
            return theme.isOP ? pageIds.OP_QA2 : pageIds.DC_QA2;
    }
};
