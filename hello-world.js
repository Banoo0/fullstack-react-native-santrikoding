// const = ga bisa diubah nilainya punya sistem block scope
 text = 'Learn JavaScript with OpenAI!';
console.log(text);

// let = bisa diubah nilainya tapi punya sistem block scope
let name = 'Subang';
if (true) {
    let name = 'jony';
    console.log(name); // Output: jony
}
console.log(name); // Output: Subang

// var = bisa diubah nilainya punya sistem function scope
var nama = 'Kocak';
if (true) {
    var nama = 'jony';
    console.log(nama); // Output: jony
} 
console.log(nama); // Output: jony

// function punya parameter yang bersifat optional
// jika ga dikasih nilai, kita bakal dapet nilai default
function hello(message) {
    message = message || 'Hello World!';
    console.log(message);
}

hello();

hello('Belajar euy');