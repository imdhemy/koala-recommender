import { beforeEach, describe, test } from 'vitest';
import { ITestAgent, testAgent } from '@koala-ts/framework';
import { appConfig } from '../src/config/app';

describe('Home Page', function () {
    let agent: ITestAgent;
    
    beforeEach(function () {
        agent = testAgent(appConfig);
    });

    test('it should return welcome message', function () {
        return agent.get('/').expect(200, 'KoalaTS: Effortlessly elegant, relentlessly efficient. 🎩🐨');
    });
});
