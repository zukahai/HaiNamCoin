export class RsaProvider {
    static randomPrime(min: number, max: number) {
        let prime = Math.floor(Math.random() * (max - min) + min);
        while (!this.isPrime(prime)) {
            prime++;
        }
        return prime;
    }


    static isPrime(n: number) {
        if (n < 2)
            return false;
        for (let i = 2; i < Math.sqrt(n); i++) {
            if (n % i == 0)
                return false;
        }
        return true;
    }
}
