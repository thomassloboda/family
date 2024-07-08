export const AUTH = {
  SIGN_IN: {
    EMAIL_MISSING: '26bf6141-2ef0-40ab-ab20-35528beb7aff',
    TOKEN_ALREADY_EXISTS: 'defe41a7-23a5-4333-a666-c765f0ce989c',
  },
  VERIFY: {
    TOKEN_MISSING: 'e9aabea3-27a8-4fbb-8557-3e964bb5157e',
    TOKEN_NOT_FOUND: '217efb74-0f9b-44db-a181-012452db5428',
  },
};

export const ADMIN = {
  COMMON: {
    TOKEN_MISSING: '7e8a8d14-0da7-48d4-b632-30d888379630',
    USER_NOT_FOUND: 'b50c50b8-ca5c-433d-8f5b-85a13cb0ffd4',
    UNAUTHORIZED: '288ecf4e-76fe-4606-b2d5-84ae8cf1fc3f',
  },
};

export const TOKEN_KIND = {
  SIGN_IN: 'SIGN_IN',
  ACCESS: 'ACCESS',
};

export type USER_ROLES = 'ADMIN';
