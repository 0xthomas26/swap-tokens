import fs from 'fs';
import { PriorityQueue } from '@datastructures-js/priority-queue';

// Create a directed weighted graph
class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addEdge(source, dest, weight) {
        if (!this.adjList.has(source)) {
            this.adjList.set(source, []);
        }
        this.adjList.get(source).push({ node: dest, weight: weight });

        if (!this.adjList.has(dest)) {
            this.adjList.set(dest, []);
        }
        this.adjList.get(dest).push({ node: source, weight: 1 / weight });
    }
}

// Dijkstra's algorithm to find the maximum number of tokens that can be received
function dijkstra(graph, source, dest, amount) {
    const pq = new PriorityQueue((a, b) => a.priority - b.priority);
    const dist = new Map();

    for (const node of graph.adjList.keys()) {
        dist.set(node, Number.NEGATIVE_INFINITY);
    }
    dist.set(source, 1.0);
    pq.enqueue({ value: source, priority: 1.0 });

    while (!pq.isEmpty()) {
        const { value: currNode, priority: currDist } = pq.dequeue();

        if (currNode === dest) {
            break;
        }

        const neighbors = graph.adjList.get(currNode);
        for (const neighbor of neighbors) {
            const { node: neighborNode, weight: edgeWeight } = neighbor;
            const neighborDist = currDist * edgeWeight;
            if (neighborDist > dist.get(neighborNode)) {
                dist.set(neighborNode, neighborDist);
                pq.enqueue({ value: neighborNode, priority: neighborDist });
            }
        }
    }

    return dist.get(dest) * amount;
}

// Parse the input and build the graph
function main() {
    const lines = fs.readFileSync('input.txt', 'utf8').split('\n');
    let n = parseInt(lines[0]);
    let q = parseInt(lines[n + 1]);
    let graph = new Graph();

    for (let i = 1; i <= n; i++) {
        const [source, dest, rate] = lines[i].split(', ');
        graph.addEdge(source, dest, parseFloat(rate));
    }

    for (let i = n + 2; i <= n + q + 1; i++) {
        const [source, dest, amount] = lines[i].split(', ');
        const maxTokens = dijkstra(graph, source, dest, parseFloat(amount));
        console.log(maxTokens.toFixed(6));
    }
}

main();
