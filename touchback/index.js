var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); 
let findPrimes = function (n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [], upperLimit = Math.sqrt(n), output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
        array.push(true);
    }

    // Remove multiples of primes
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var i = 2; i < n; i++) {
        if (array[i]) {
            output.push(i);
        }
    }

    return output;
};

// Finding median from sorted array of primes less than input
let findMedian = function(numbers) {
    var medians = [];
    const middle = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
        medians.push(numbers[middle - 1]);
        medians.push(numbers[middle]);
        return medians;
    }
    medians.push(numbers[middle]);
    return medians;
}

//Endpoint to return median for primes less than input
app.get('/api/:n', function (req, res) {
    let inputParam = req.params.n;
    if (inputParam == 1) {
        res.json({ message: 'No primes below 1!'});
        return;
    }
    if(isNaN(inputParam)) {
        res.status(400).json({ message: 'Not a number!'});
        return;
    }
    let primesLessThanInput = findPrimes(inputParam);
    console.log('primesLessThanInput' + primesLessThanInput);
    let medianPrime = findMedian(primesLessThanInput);
    console.log('medianPrime' + medianPrime);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ message: medianPrime});
});

const server = app.listen(3001, function () {
    console.log('TouchBistro app listening on port 3001!');
});

module.exports = server;