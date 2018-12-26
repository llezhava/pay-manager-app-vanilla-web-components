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
        this.filters = {}
    }

    connectedCallback() {
        this.render()
    }

    fetchCategories() {
        fetch(`${url}/categories`)
            .then(data => data.json())
            .then(categories => {
                console.log('Fetched categories: ', categories)
                let controller = this.root.querySelector('paym-controller')
                console.log(controller)
                controller.setAttribute('categories', JSON.stringify(categories))
            })
            .catch(err => {
                console.log('Could not update categories!', err)
            })
    }

    fetchPayments() {
        fetch(`${url}/payments`, {
            method: 'post',
                body: {
                    filters: JSON.stringify(this.filters)
                }
            })
            .then(data => data.json())
            .then(payments => {
                let records = this.root.querySelector('paym-records')
                records.setAttribute('payments', JSON.stringify(payments))

                console.log('Payments: ', payments)
               /// DO SOMETHING HERE
            })
            .catch(err => {
                console.log('Could not get payments!', err)
            })
    }

    configure(node) {
        let controller = node.querySelector('paym-controller')
        let records = node.querySelector('paym-records')
        let monthChart = node.querySelector('#perMonth')
        let categoryChart = node.querySelector('#perCategory')

        controller.addEventListener('newFilters', e => {
            console.log('New Filters! do something here')
        })

        controller.addEventListener('addPayment', e => {
            console.log('New Payment! do something here')
        })


        // Pass down initial test values
        controller.setAttribute('categories', JSON.stringify({useless: 'categoryname'}))
        records.setAttribute('payments', JSON.stringify([...payments, ...payments]))

    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node);

        this.fetchCategories()
        this.fetchPayments()
    }

}

export default PayManagerApp