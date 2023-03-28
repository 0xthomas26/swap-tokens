import fs from 'fs';

export const createExchangeGraphFromFile = () => {
    const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');
    const n = parseFloat(input[0]);
    const tokenPairs = [];

    for (let i = 1; i <= n; i++) {
        const [from, to, rate] = input[i].split(', ');
        tokenPairs.push({ from, to, rate: parseFloat(rate) });
    }

    const q = parseFloat(input[n + 1]);
    const queries = [];
    for (let i = n + 2; i <= n + q + 1; i++) {
        const [from, to, amount] = input[i].split(', ');
        queries.push({ from, to, amount: parseFloat(amount) });
    }

    const exchangeRates = {};

    // Build exchange rate graph
    for (const { from, to, rate } of tokenPairs) {
        if (!exchangeRates[from]) {
            exchangeRates[from] = {};
        }
        exchangeRates[from][to] = rate;

        if (!exchangeRates[to]) {
            exchangeRates[to] = {};
        }
        exchangeRates[to][from] = 1 / rate;
    }

    return { exchangeRates, queries };
};

export const swapTokens = (exchangeRates, query) => {
    // Perform breadth-first search to find the maximum number of tokens received
    const { from, to, amount } = query;

    const visited = new Set();
    const queue = [[from, amount, [from]]];
    visited.add(from);

    let maxAmount = 0;
    let optimalPath = [];

    while (queue.length > 0) {
        const [currentToken, currentAmount, path] = queue.shift();

        if (currentToken === to && currentAmount > maxAmount) {
            maxAmount = currentAmount;
            optimalPath = path;
        }

        const rates = exchangeRates[currentToken];

        for (const nextToken in rates) {
            const rate = rates[nextToken];

            if (!visited.has(nextToken)) {
                visited.add(nextToken);
                const nextPath = [...path, nextToken];
                queue.push([nextToken, currentAmount * rate, nextPath]);
            }
        }
    }

    return { amount: maxAmount, path: optimalPath };
};
