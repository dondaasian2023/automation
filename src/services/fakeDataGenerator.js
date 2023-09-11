import  { faker } from '@faker-js/faker';
import { nowDate } from 'src/utils/dateUtils';
import { getNextId } from 'src/utils/idGenerator';

export const AUTO_TEST_PREFIX = 'AutoTest';
export const randomNumber = () => faker.datatype.number();
export const randomArrayElement = array => faker.helpers.arrayElement(array);
export const url = () => faker.internet.url();
export const sentence = () => faker.lorem.sentence();
export const phoneNumber = () => faker.phone.number();
export const paragraph = () => faker.lorem.paragraph();
export const email = () => faker.internet.email();
export const password = () => faker.internet.password();
export const uniqueName = (prefix = AUTO_TEST_PREFIX) => `${prefix}${nowDate()}${getNextId()}`;
export const addIndex = (label = 'Field') => `${label}${getNextId()}`;
