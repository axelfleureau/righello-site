/** `$env/dynamic/public` nei test: nessuna variabile pubblica (i test non devono dipendere dall'ambiente di chi li lancia). */
export const env: Record<string, string | undefined> = {};
