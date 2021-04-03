export default {
    HOSTNAME: process.env.HOSTNAME ?? 'localhost',
    PORT: Number(process.env.PORT) ?? 3000,
};
