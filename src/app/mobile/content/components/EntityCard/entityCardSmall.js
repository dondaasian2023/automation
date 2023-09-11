import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTORS = {
    ENTITY_CARD_SMALL_ITEM: 'core_components_entity-card-small-{title}',
};

const getItem = title =>
    element(cookTestID(SELECTORS.ENTITY_CARD_SMALL_ITEM, { title }), `Entity Card Small Title: ${title}`);

const EntityCardSmall = { getItem };
export default EntityCardSmall
