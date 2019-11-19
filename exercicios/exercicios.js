// 1) Dado um vetor de números, como poderia ser realizada a soma de todos os valores utilizando reduce.

const arr = [1, 2, 3, 4]

// const soma = (acc, currentValue) => acc + currentValue
// const somatorio = arr.reduce(soma, 0) 

const somatorio = arr.reduce((acc, currentValue) => acc + currentValue, 0)

console.log(somatorio)

// 2) Dado um vetor de números, como poderia ser realizada a soma de todos os valores pares utilizando reduce e filter.

const pares = arr.filter(item => item % 2 === 0).reduce((acc, currentValue) => acc + currentValue, 0)

console.log(pares)

// 3) Dado um vetor de números, como poderia ser realizada a soma de todos os valores ímpares utilizando reduce e filter.

const impares = arr.filter(item => item % 2 !== 0).reduce((acc, currentValue) => acc + currentValue, 0)

console.log(impares)

// 4) Dado um vetor de valores, retorne um objeto com quantas vezes cada valor está presente no vetor (dica: utilize reduce)

const nomes = [`rafael`, `eli`, `rafael`, `mel`, `anita`]

// const countedNames = nomes.reduce((allNames, name) => {
//     name in allNames ? allNames[name] += 1 : allNames[name] = 1
//     console.log(allNames)
//     return allNames
// }, {})

const vetor = [1, 2, 3, 4, 2, 1, 3, 2, 1, 9, 'rafael', 'rafael']

const times = vetor.reduce((agg, val) => {
    if (!agg[val]) {
        agg[val] = 0
    }
    agg[val] = agg[val] + 1
    return agg
}, {})

console.log(times)

// 5) Dado um vetor de valores, retorne um vetor com somente os valores únicos do vetor (aqueles que ocorrem apenas 1 vez dentro do vetor) (Dica 1: utilize reduce, filter e keys, Dica 2: escreva console.log(objeto.keys()) e veja como ele poderá te ajudar neste exercício)

// const result = nomes.sort().reduce((init, current) => {
//     if (init.length === 0 || init[init.length - 1] !== current) {
//         init.push(current)
//     }
//     return init
// }, [])
// console.log(result)

// console.log(nomes.filter((value, index) => nomes.indexOf(value) === index).sort())


const contagem = vetor.reduce((agg, val) => {
    if (!agg[val]) {
        agg[val] = {
            value: val,
            occur: 0
        }
    }
    agg[val].occur = agg[val].occur + 1
    return agg
}, {})

const keys = Object.keys(contagem)
const unique = keys.filter(key => contagem[key].occur === 1)

const uniqueValue = unique.map(val => contagem[val].value)

console.log('=========>', uniqueValue)

// 7) Dado um vetor com números, retorne somente os números ímpares;
console.log(arr.filter((item => item % 2 !== 0)))

// 8) Uma função é chamada da seguinte forma:

// calculadora(10, '+', 20)

// crie o corpo da função de forma que ela realize as 4 operações aritméticas
const soma = (a, b) => a + b
const subt = (a, b) => a - b
const mult = (a, b) => a * b
const div = (a, b) => a / b

console.log(soma(2, 4))
console.log(subt(2, 4))
console.log(mult(2, 4))
console.log(div(2, 4))

// 9) Modifique a calculadora do exercício anterior para que ela receba 2 números e uma função, e realize o cálculo. Exemplo:

const calculadora = (num1, op, num2) => {
    const ops = {
        '+': (num1, num2) => num1 + num2,
        '-': (num1, num2) => num1 - num2,
        '*': (num1, num2) => num1 * num2,
        '/': (num1, num2) => num1 / num2
    }
    return ops[op](num1, num2)

//     if (op === '+') {
//         return num1 + num2
//     }
//     if (op === '-') {
//         return num1 - num2
//     }
//     if(op === '*'){
//         return num1 * num2
//     }
//     if (op === '/'){
//         return num1 / num2
//     } else
//     return 'digite uma operação valida'
}

console.log(calculadora(10, '-', 20))

//---------------------------

const calculadoraFn = (num1, op, num2) => console.log(op(num1, num2))

calculadoraFn(10, mult, 20)