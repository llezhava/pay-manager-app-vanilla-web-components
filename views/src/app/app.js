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

    chartMonthData(payments) {
        return payments.map(payment => {

        })
    }

    chartCategoryData(payments) {
        return payments.map(payment => {

        })
    }

    render() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        // Select elements
        let node = template.content.cloneNode(true)
        let controller = node.querySelector('paym-controller')
        let records = node.querySelector('paym-records')
        let monthChart = node.querySelector('#perMonth')
        let categoryChart = node.querySelector('#perCategory')


        console.log(records)

        // Pass down values
        controller.setAttribute('categories', JSON.stringify(this.categories))
        records.setAttribute('payments', JSON.stringify(this.filteredPayments))

        this.root.appendChild(node);

    }


}

export default PayManagerApp