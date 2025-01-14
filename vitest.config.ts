import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                '**/config/**',
                'src/index.ts',
                '**/tests/**',
                '**/types.ts',
            ],
        },
    },
});
