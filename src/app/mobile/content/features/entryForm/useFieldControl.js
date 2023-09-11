import FIELDS_CONTROLS_MAP from 'src/app/mobile/content/features/entryForm/fieldsControlMap';

export const useFieldControl = formFieldType => FIELDS_CONTROLS_MAP[formFieldType] || null;
