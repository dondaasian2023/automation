import { executeMobile } from 'src/services/driver/driverActions';
import { BIOMETRIC_TYPES } from 'src/services/driver/biometricTypes';

const sendBiometricMatch = async ({ type = BIOMETRIC_TYPES.FACE_ID, match = true }) =>
    executeMobile('sendBiometricMatch', { type, match });

const enrollBiometric = async ({ isEnabled = true }) =>
    executeMobile('enrollBiometric', { isEnabled });

export { sendBiometricMatch, enrollBiometric };
