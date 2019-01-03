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

    getCategories() {
        return fetch(`${url}/categories`)
            .then(data => data.json())
            .catch(err => {
                console.log('Could not update categories!', err)
                return []
            })
    }

    getPayments() {
        return fetch(`${url}/payments`, {
            method: 'post',
                body: {
                    filters: JSON.stringify(this.filters)
                }
            })
            .then(data => data.json())
            .catch(err => {
                console.log('Could not get payments!', err)
                return []
            })
    }

    getInitialData() {
        let payments = this.getPayments()
        let categories = this.getCategories()
        let recordsNode = this.root.querySelector('paym-records')
        let controllerNode = this.root.querySelector('paym-controller')

        payments.then(data => {
            this.setNewRecords(recordsNode, data)
        })

        categories.then(data => {
            this.setNewCategories(controllerNode, data)
        })
    }

    setNewRecords(node, payments) {
        node.setAttribute('payments', JSON.stringify(payments))
    }

    setNewCategories(node, categories) {
        node.setAttribute('categories', JSON.stringify(categories))

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
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node);
        this.getInitialData()
    }

}

export default PayManagerApp