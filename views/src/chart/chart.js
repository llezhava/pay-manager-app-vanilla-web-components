const template = document.createElement('template');
template.innerHTML = `
<head>
<h2></h2></head>
 <section id="chart"></section>
`
class Chart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }

    connectedCallback() {
        this.render()
    }

    createBar(item) {
        let bar = document.createElement('paym-bar')
        bar.setAttribute('title', item.title)
        bar.setAttribute('amount', item.amount)
        bar.setAttribute('category', item.category)
        return bar
    }

    configure(node) {
        let header = node.querySelector('h2')
        let name = this.getAttribute('for')
        header.textContent = `Payments per ${name}`

        let chart = node.querySelector('#chart')

        let data = JSON.parse(this.getAttribute('data'))
        if (data !== null) {
            data.forEach(i => {
                let bar = this.createBar(i)
                chart.appendChild(bar)
            })
        }
    }

    render() {
        let node = template.content.cloneNode(true)

        this.configure(node)

        this.root.appendChild(node)

    }

}

export default Chart