const template = document.createElement('template')
template.innerHTML = `
<section id="app">
    <paym-controller></paym-controller>
    <section id="data">
        <div id="recordsTitle" class="item-1">
            <span id="recordsFound"></span> records found
        </div>
        <paym-records class="item-2"></paym-records>
        <section id="charts" class="item-3">
            <paym-chart id="perMonth" for="month">
            </paym-chart>
            <paym-chart id="perCategory" for="category">
            </paym-chart>
        </section>
    </section>
</section>
<style>

#app {
   display: flex;
   flex-direction: column;
   justify-content: center;
   max-width: 1200px;
   min-width: 950px;
   border: 1px solid black;
}

#recordsTitle {
    font-size: 1.5em;
    font-weight: bold;
    color: #45617e;
}

#data {
    margin-top: 2em;
    display: grid;
    grid-template-columns: auto auto 30em;
    grid-column-gap: 2%;
}

.item-1 {
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 1;
    grid-column-end: 1;
    margin-bottom: 0.3em;
}

.item-2 {
    grid-row-start: 2;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
}

.item-3 {
    grid-row-start: 2;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 3;
}
</style>
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

        payments.then(data => {
            this.setNewRecords(this.root, data)
        })

        categories.then(data => {
            this.setNewCategories(this.root, data)
        })
    }

    setNewRecords(node, payments) {
        let recordsFound = node.querySelector('#recordsFound')
        let records = node.querySelector('paym-records')
        
        recordsFound.textContent = payments.length
        records.setAttribute('payments', JSON.stringify(payments))
    }

    setNewCategories(node, categories) {
        let controllerNode = node.querySelector('paym-controller')
        controllerNode.setAttribute('categories', JSON.stringify(categories))
    }

    configure(node) {
        let controller = node.querySelector('paym-controller')
        let records = node.querySelector('paym-records')
        let monthChart = node.querySelector('#perMonth')
        let categoryChart = node.querySelector('#perCategory')

        controller.addEventListener('newFilters', e => {
            console.log('New Filters! do something here', e.detail)
        })

        controller.addEventListener('addPayment', e => {
            console.log('New Payment! do something here', e.detail)
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