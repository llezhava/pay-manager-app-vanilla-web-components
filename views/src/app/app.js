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
   width: 1200px;
}

#recordsTitle {
    font-size: 1.5em;
    font-weight: bold;
    color: #45617e;
}

#data {
    margin-top: 2em;
    display: grid;
    grid-template-columns: 1fr 1fr 30em;
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

@media only screen and (max-width: 950px) {
    #app {
        width: 100%;
    }
    #data {
        margin-top: 2em;
        display: grid;
        grid-template-columns: 100%;
        grid-column-gap: 2%;
        justify-content: stretch;
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
        grid-column-end: 1;

        margin-bottom: 2em;
    }
    
    .item-3 {
        grid-row-start: 3;
        grid-row-end: 3;
        grid-column-start: 1;
        grid-column-end: 1;
    }

  }
</style>
`

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
        return fetch(`./get/categories`)
            .then(data => data.json())
            .catch(err => {
                console.log('Could not update categories!', err)
                return []
            })
    }

    getRecords(filters) {
        return fetch(`./get/records`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters)
            })
            .then(data => data.json())
            .then(records => {
                this.setNewRecords(this.root, records)
            })
            .catch(err => {
                console.log('Could not get payments!', err)
                return []
            })
    }

    getChartPerMonth(filters) {
        return fetch(`./get/chart/bymonth`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters)
            })
            .then(data => data.json())
            .then(records => {
                this.setMonthChart(this.root, records)
            })
            .catch(err => {
                console.log('Could not get payments!', err)
                return []
            })
    }

    getChartPerCategory(filters) {
        return fetch(`./get/chart/bycategory`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters)
            })
            .then(data => data.json())
            .then(records => {
                this.setCategoryChart(this.root, records)
            })
            .catch(err => {
                console.log('Could not get payments!', err)
                return []
            })
    }


    addRecord(data) {
        return fetch(`./add/record`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(data => data.json())
            .catch(err => {
                console.log('Could not Add record!', err)
                return []
            })
    }

    getInitialData() {
       this.getRecords(this.filters)
       this.getChartPerMonth(this.filters)
       this.getChartPerCategory(this.filters)

        let categories = this.getCategories()

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

    setMonthChart(node, data) {
        let _node = node.querySelector('#perMonth')
        _node.setAttribute('data', JSON.stringify(data))
    }

    setCategoryChart(node, data) {
        let _node = node.querySelector('#perCategory')
        _node.setAttribute('data', JSON.stringify(data))
    }

    configure(node) {
        let controller = node.querySelector('paym-controller')

        controller.addEventListener('newFilters', e => {
            this.filters = e.detail
            this.getRecords(this.filters)
            this.getChartPerMonth(this.filters)
            this.getChartPerCategory(this.filters)
        })

        controller.addEventListener('addPayment', e => {
            let data = e.detail
            this.addRecord(data)
                .then((status) => {
                    if (status.success) {
                        this.getRecords(this.filters)
                        this.getChartPerMonth(this.filters)
                        this.getChartPerCategory(this.filters)
                    } 
                    else console.log('Why?')
                })
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