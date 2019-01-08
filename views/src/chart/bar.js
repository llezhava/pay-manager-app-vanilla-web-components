const template = document.createElement('template')
template.innerHTML = `
<div id="bar">
    <div id="value"></div>
    <div id="fill"></div>
    <div id="name"></div>
</div>

<style>

:host {
    width: 100%;
}

#bar {
    font-size: 1em;
    text-align: center;
    color: #45617e;
    margin: 0.1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#fill {
    background-color: #a1c4ff;
}

#value {
    display: none;
}

#bar:hover #value{ 
    display: block;
}

#bar:hover #fill{ 
    background-color: #779cdb;
}

</style>
`

class Bar extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }


    connectedCallback() {
        this.render()
    }

    // TODO: Improve sizing
    configure(node) {
        const name = this.getAttribute('name')
        const value = this.getAttribute('value')
        const max = this.getAttribute('max')
        const fill = node.querySelector('#fill')


        const maxPixels = 250
        let currentPercent = Math.min(Math.ceil(value / max * 100), 100)
        let currentPixels = maxPixels * currentPercent / 100

        fill.style.height = `${currentPixels}px`


        node.querySelector('#value').innerText = value
        node.querySelector('#name').innerText = name
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}

export default Bar