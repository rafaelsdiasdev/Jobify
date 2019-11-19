const soma = (a, b) => a + b
const mult = (a, b) => a * b

const calculadora = (op, a, b) => op(a, b)

console.log(mult(2,4))

// --------

const arr  = [1,2,3,4,5,6]
// const dobrado = arr.map((item) => { 
//     return { original: item, 
//              dobrado: item * 2 } 
//             })

// console.log(arr, dobrado)

const dobrar = item => item * 2
const pares = item => item % 2 === 0

const somentePares = arr.filter(pares)
const dobrado = arr.filter(pares).map(dobrar)

console.log({ original: somentePares, dobrado: dobrado })

const somar = (acc, currentValue) => acc + currentValue
const somatorio = dobrado.reduce(somar, 0)

console.log(`A soma com reduce eh ${somatorio}`)
