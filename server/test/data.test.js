import FNS from '../src/utils/functions.mjs';
import { assert } from 'chai';
import { describe, it } from 'mocha';

describe('tests data function', () => {
    it('test load function', async () => {
        const data = await FNS.loadLocalData();
        assert.isArray(data);
        assert.strictEqual(data.length, 10000);
    });
});