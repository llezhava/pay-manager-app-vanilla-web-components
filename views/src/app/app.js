import {
    categories,
    payments
} from './../mockData.js'

const template = document.createElement('template')
template.innerHTML = `
<div>
<section id="header"> TEST COMPONENT!</section>
<paym-controller> </paym-controller>
<paym-records></paym-records>
<section id="charts">
<paym-chart id="perMonth" for="month">
</paym-chart>
<paym-chart id="perCategory" for="category">
</paym-chart>
</section>
</div>
`

const url = `http://localhost:3000`

class PayManagerApp extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({
            'mode': 'open'
        });
        this.categories = { ...categories
        }
        this.payments = [...payments]
        this.filters = {}
        this.filteredPayments = [...payments]
        this.testFetch()
    }

    connectedCallback() {
        this.render()
    }

    testFetch() {
        let testData = fetch(`${url}/testData`)
            .then(data => {
                return data.json()
            }).then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log('We errored!')
            })
    }

    setNewFilters() {

    }


    getInitialState() {
    }

    fetchCategories() {
        fetch(`${url}/categories`)
            .then(data => data.json())
            .then(categories => {
                this.querySelector('paym-controller')
                    .setAttribute('categories', JSON.stringify(categories))
            })
            .catch(err => {
                console.log('Could not update categories!')
            })
    }

    fetchPayments() {
        fetch(`${url}/payments`, {
                body: {
                    filters: JSON.stringify(this.filters)
                }
            })
            .then(data => data.json())
            .then(payments => {
                this.querySelector('paym-records')
                    .setAttribute('payments', JSON.stringify(payments))
            })
            .catch(err => {
                console.log('Could not update categories!')
            })
    }

    configure(node) {

    }

    render() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        // Select elements
        let node = template.content.cloneNode(true)

        this.fetchCategories()

        this.root.appendChild(node);

        // this.fetchPayments()
        // this.fetchCategories()

    }

    addTestData(node) {
        let controller = node.querySelector('paym-controller')
        let records = node.querySelector('paym-records')
        let monthChart = node.querySelector('#perMonth')
        let categoryChart = node.querySelector('#perCategory')


        // Pass down values
        controller.setAttribute('categories', JSON.stringify(this.categories))
        records.setAttribute('payments', JSON.stringify(this.filteredPayments))
    }


}

export default PayManagerApp