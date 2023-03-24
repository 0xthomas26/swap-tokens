import { createExchangeGraphFromFile, swapTokens } from './swapTokens.js';

const main = () => {
    const { exchangeRates, queries } = createExchangeGraphFromFile();
    console.log('exchange rates=', exchangeRates);
    console.log('queries=', queries);

    for (const query of queries) {
        const { amount, path } = swapTokens(exchangeRates, query);
        const result = amount.toFixed(6).replace(/\.?0+$/, '');
        console.log(`${result} (${path.join(' -> ')})`);
    }
};

main();
