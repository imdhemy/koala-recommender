import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globalSetup: ['./tests/_setup/global.ts'],
        setupFiles: ['./tests/_setup/unit.ts'],
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
