const categories = {
    food: 'food',
    gasoline: 'gasoline',
    entertainment: 'entertainment',
    mobileServices: 'mobileServices'
}

const payment = {
    title: "Payment Name",
    amount: 95,
    category: categories.food,
    date: Date.now(),
    comment: 'comment text'
}

const filters = {
    anyFilter: '',
    category: '',
    startDate: '',
    endDate: '',
    fromAmount: '',
    toAmount: ''
}

function getPaymentRecords() {
    
}



function testData(req, res) {
    res.send({hello: 'world!'})
}

module.exports = {testData}