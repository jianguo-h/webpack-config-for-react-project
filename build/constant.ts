import path from 'path';

export const DEV_PORT = process.env.PORT ?? 8080;

export const LIBS_PATH = path.resolve(__dirname, '../src/libs');
