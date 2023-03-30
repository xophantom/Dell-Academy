export const makeError = (error: string) => ({ message: error });

export type APIError = ReturnType<typeof makeError>;
