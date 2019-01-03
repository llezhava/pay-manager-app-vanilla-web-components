const template = document.createElement('template')
template.innerHTML = `
<section id="controller">
    <button type="button" id="addPayment">Add Payment</button>
    <legend>Filter by any property:</legend>
    <input type="text" id="anyFilter">
    <button id="showExtendedFilters">Extended Filters</button>
    <paym-extended-filters></paym-extended-filters>
    <paym-add-payment></paym-add-payment>
</section>
<style>
:host {
    display: flex;
}

</style>
`

import AddNewPayment from './addNewPayment'
import ExtendedFilters from './extendedFilter'

window.customElements.define('paym-add-payment', AddNewPayment)
window.customElements.define('paym-extended-filters', ExtendedFilters)



class Controller extends HTMLElement {
    constructor() {
        super();
        this.filters = {}
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }

    static get observedAttributes() {
        return ['categories'];
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'categories':
                {
                    let extendedFilters = this.root.querySelector('paym-extended-filters')
                    let addPayment = this.root.querySelector('paym-add-payment')
                    if (extendedFilters === null) break;
                    extendedFilters.setAttribute('categories', newValue)
                    addPayment.setAttribute('categories', newValue)
                    break;
                }
        }
    }


    configure(node) {
        this.configureFilters(node)
        this.configureAdd(node)
    }

    configureAdd(node) {
        const addPayment = node.querySelector('paym-add-payment')

        if (addPayment === null) return

        const addButton = node.querySelector('#addPayment')

        addPayment.setAttribute('categories', this.getAttribute('categories'))

        addPayment.addEventListener('addPayment', e => {
            let {
                detail
            } = e
            this.dispatchEvent(new CustomEvent('addPayment', {
                detail
            }))
        })


        addButton.addEventListener('click', e => {
            addPayment.style.display = 'block'
        })
    }

    configureFilters(node) {
        let anyFilter = node.querySelector('#anyFilter')

        anyFilter.addEventListener('change', e => {
            this.filters = Object.assign({}, this.filters, {
                anyFilter: e.target.value
            })
            this.dispatchEvent(new CustomEvent('newFilters', {
                detail: this.filters
            }))
        })

        let showExtendedFilters = node.querySelector('#showExtendedFilters')

        showExtendedFilters.addEventListener('click', e => {
            let currentDisplay = this.root.querySelector('paym-extended-filters').style.display

            if (currentDisplay !== 'block') {
                this.root.querySelector('paym-extended-filters').style.display = 'block'
            } else {
                this.root.querySelector('paym-extended-filters').style.display = 'none'
            }
        })

        let extendedFilter = node.querySelector('paym-extended-filters')

        extendedFilter.setAttribute('categories', this.getAttribute('categories'))

        extendedFilter.addEventListener('newFilters', e => {
            let {
                detail
            } = e

            this.filters = Object.assign({}, this.filters, detail)

            this.dispatchEvent(new CustomEvent('newFilters', {
                detail: this.filters
            }))
        })
    }


    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }

}

export default Controller