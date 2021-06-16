console.log('Chapter 10. Excercises');

//#region Chapter 10.2 Модуль Roads
// Основываясь на примере из главы 7, напишите модуль CommonJS, который
// содержит массив дорог и экспортирует структуру данных графа, 
// представленную как roadGraph. Модуль должен зависеть от модуля 
// ./graph, экспортирующего функцию buildGraph, которая используется 
// для построения графа.
// Эта функция ожидает массива, состоящего из двухэлементных массивов
// (начальная и конечная точки для каждой дороги). 
console.log('=== Chapter 10.2 Модуль Roads');
// const {buildGraph} = require("./graph");
import { buildGraph } from "./graph";
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
export const roadGraph = buildGraph(roads.map(r => r.split("-")));
//#endregion