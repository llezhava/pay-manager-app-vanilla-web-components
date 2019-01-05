const template = document.createElement('template');
template.innerHTML = `
<section id="container">
    <head>
        <div id="title"></div>
    </head>
    <section id="chart"></section>
</section>

 <style>
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

let mockData = [
    {name: 'Jan', value: 300, max: 395},
    {name: 'Feb', value: 225, max: 395},
    {name: 'Mar', value: 95, max: 395},
    {name: 'Apr', value: 192, max: 395},
    {name: 'May', value: 220, max: 395},
    {name: 'Jun', value: 150, max: 395},
    {name: 'Jul', value: 15, max: 395},
    {name: 'Aug', value: 195, max: 395},
    {name: 'Sep', value: 395, max: 395},
    {name: 'Oct', value: 450, max: 395},
    {name: 'Nov', value: 295, max: 395},
    {name: 'Dec', value: 345, max: 395}
]

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
        bar.setAttribute('name', item.name)
        bar.setAttribute('value', item.value)
        bar.setAttribute('max', item.max)
        return bar
    }

    configure(node) {
        let header = node.querySelector('#title')
        let name = this.getAttribute('for')
        header.textContent = `Payments per ${name}`

        let chart = node.querySelector('#chart')

        let data = mockData

        // let data = JSON.parse(this.getAttribute('data'))
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