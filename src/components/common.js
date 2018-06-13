const CONFIG = {
    contractAddress: '0x348c1eddaf55e4145e4c879a6e26ee58708f6b0f',
    httpProvider: 'http://127.0.0.1:7545',
    formatPrice(price) {
        return price / 1000000000000000000;
    }
};

export default CONFIG;
