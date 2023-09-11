const isIOS = driver.isIOS;
const select = ({ ios, android }) => (isIOS ? ios : android);

export const Platform = { select, isIOS };
