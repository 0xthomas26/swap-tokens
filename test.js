import { expect } from 'chai';
import { createExchangeGraphFromFile, swapTokens } from './swapTokens.js';

describe('swapTokens', function () {
    const { exchangeRates } = createExchangeGraphFromFile();

    it('should return the correct result for TokenA to TokenC', function () {
        const query = { from: 'TokenA', to: 'TokenC', amount: 10000 };
        const result = swapTokens(exchangeRates, query);
        expect(parseFloat(result.amount.toFixed(6).replace(/\.?0+$/, ''))).to.equal(36);
    });

    it('should return the correct result for TokenB to TokenA', function () {
        const query = { from: 'TokenB', to: 'TokenA', amount: 10000 };
        const result = swapTokens(exchangeRates, query);
        expect(parseFloat(result.amount.toFixed(6).replace(/\.?0+$/, ''))).to.equal(8333.333333);
    });

    it('should return the correct result for TokenD to TokenB', function () {
        const query = { from: 'TokenD', to: 'TokenB', amount: 10000 };
        const result = swapTokens(exchangeRates, query);
        expect(parseFloat(result.amount.toFixed(6).replace(/\.?0+$/, ''))).to.equal(24000000000);
    });

    it('should return the correct result for TokenC to TokenD', function () {
        const query = { from: 'TokenC', to: 'TokenD', amount: 10000 };
        const result = swapTokens(exchangeRates, query);
        expect(parseFloat(result.amount.toFixed(6).replace(/\.?0+$/, ''))).to.equal(1.388889);
    });
});
