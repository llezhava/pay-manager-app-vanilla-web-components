const template = document.createElement('template')
template.innerHTML = `
<div id="bar">
    <div id="value"></div>
    <div id="fill"></div>
    <div id="name"></div>
</div>

<style>

:host {
    width: 3em;
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

    configure(node) {
        const name = this.getAttribute('name')
        const value = this.getAttribute('value')
        const max = this.getAttribute('max')
        const fill = node.querySelector('#fill')

        let shortName = ('' + name).length > 3 ? (('' + name).slice(0, 3) + '...') : name

        const maxPixels = 250
        let currentPercent = Math.min(Math.ceil(value / max * 100), 100)
        let currentPixels = maxPixels * currentPercent / 100

        fill.style.height = `${currentPixels}px`


        node.querySelector('#value').innerText = value
        node.querySelector('#name').innerText = shortName

        let isHovered = false
        this.addEventListener('mouseenter', (e => {
            if (!isHovered) {
                isHovered = true
                this.dispatchEvent(new CustomEvent('mouseenter', {
                    detail: name
                }))
            }
                
        }))

        this.addEventListener('mouseleave', (e => {
            if (isHovered) {
                isHovered = false
                this.dispatchEvent(new CustomEvent('mouseleave', {
                    detail: name
                }))
            } else {

            }
        }))
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}

export default Bar