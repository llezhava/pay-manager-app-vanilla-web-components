const template = document.createElement('template');
template.innerHTML = `
<div id="records">
    <section id="recordsList"></section>
    <section id="aggregator">
        <span>Total: </span>
        <span id="sumValue"></span>
    </section>
</div>
<style>

:host {

}

#records {
    background-color: white;
}

#recordsList {
    height: 650px;
    overflow: scroll;
    background-color: white;
}
#aggregator {
    background-color: #a1c4ff;
    height: 3em;
}

</style>
`
class RecordsContainer extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }

    static get observedAttributes() {
        return ['payments'];
    }

    connectedCallback() {
        this.getInitialState()
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'payments': {
                let newPayments = JSON.parse(newValue)

                // Check if it is mounted to the dom
                if(this.root.querySelector('#recordsList') === null) break;

                this.configure(this.root, {payments: newPayments})
                break;
            }
        }
        // console.log(`Changed ${name}`, {oldValue, newValue})
    }

    createRecord(payment) {
        let record = document.createElement('paym-record')
        record.setAttribute('title', payment.title)
        record.setAttribute('amount', payment.amount)
        record.setAttribute('category', payment.category)
        record.setAttribute('date', payment.date)
        record.setAttribute('comment', payment.comment)
        return record
    }

    getInitialState() {
        const payments = JSON.parse(this.getAttribute('payments'))

        return {
            payments
        }
    }

    configure(node, state) {
        let records = node.querySelector('#recordsList')
        let sum = node.querySelector('#sumValue')
        // console.log('Appending', state)

        // Remove current records
        while(records.firstChild) {
            records.removeChild(records.firstChild)
        }

        // Add payment nodes
        if (Array.isArray(state.payments)) {
            state.payments.forEach(payment => {
                let pmNode = this.createRecord(payment)
                // console.log('Appending', payment)
                records.appendChild(pmNode)
            })

            // Add sum value
            let sumValue = state.payments.reduce((acc, curr) => {
                return acc + curr.amount
            }, 0)

            sum.textContent = sumValue

        } else {
            sum.textContent = '0'
        }

        // console.log({root: this.root, recordsFound, records, sum})

    }

    render() {
        let node = template.content.cloneNode(true)
        let state = this.getInitialState()
        this.configure(node, state)
        this.root.appendChild(node)

    }

}

export default RecordsContainer