const template = document.createElement('template');
template.innerHTML = `
<section id="container">
    <head>
        <div id="head"><div id="title"></div><div id="longName"></div></div>
    </head>
    <section id="chart"></section>
</section>

 <style>

 #head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

 #container {
     background-color: white;
     padding: 1em;
 }

 #title {
    font-size: 1em;
    font-weight: bold;
    color: #45617e
}

#chart {
    display: flex;
    align-items: flex-end;
    justify-content: stretch;
    height: 300px;
}
 </style>
`

// TODO for categories chart:
// When hovered bar, it will show full title of category somewhere
// i.e into the top right place

class Chart extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }

    static get observedAttributes() {
        return ['data'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data') {
            let data = JSON.parse(newValue)
            console.log('Changed data!', data)
            this.appendNewChart(this.root, data)
        }
    }


    connectedCallback() {
        this.render()
    }

    createBar(name, value, max) {
        let bar = document.createElement('paym-bar')
        let longName = this.root.querySelector('#longName')
        bar.setAttribute('name', name)
        bar.setAttribute('value', value)
        bar.setAttribute('max', max)

        bar.addEventListener('mouseenter', (e => {
            let name = e.detail
            console.log('MouseOver: ', name)
            longName.textContent = name
        }))

        bar.addEventListener('mouseleave', (e => {
            longName.textContent = ''
        }))
        return bar
    }

    appendNewChart(node, data) {
        let chart = node.querySelector('#chart')

        if(chart === null) return

        // Remove all children
        while (chart.firstChild) {
            chart.removeChild(chart.firstChild)
        }

        this.createChart(chart, data)
    }


    createChart(chart, data) {
        let max = data.max

        data.dataset.forEach(set => {
            let bar = this.createBar(set.name, set.value, max)
            chart.appendChild(bar)
        })
    }

    getInitialState() {
        let title = this.getAttribute('for')
        let data = this.getAttribute('data') || {max: 0, dataset: []}

        return {title, data}
    }

    configure(node, state) {
        let header = node.querySelector('#title')
        let chart = node.querySelector('#chart')

        header.textContent = `Payments per ${state.title}`

        this.appendNewChart(chart, state.dataset)
    }

    render() {
        let node = template.content.cloneNode(true)
        let initialState = this.getInitialState(node)

        this.configure(node, initialState)

        this.root.appendChild(node)

    }

}

export default Chart