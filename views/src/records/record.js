import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const template = document.createElement('template');
template.innerHTML = `
<section id="record" class="">
    <div id="title" class="title">Title</div>
    <paym-tag id="category"></paym-tag>
    <div id="paidOn" class="grey-font">Current Date</div>
    <div id="amount-section">
        <div id="amount"></div>
        <div id="currency">GEL</div>
    </div>
    <div id="comment-section">
         <div class="title">Comment</div>
         <span id="comment" class="grey-font">Comment</span>
    </div>
</section>
<style>

#record {
    color: #45617e;
    border-bottom: 1px solid #a1c4ff;
    padding: 1em;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
    grid-template-areas: 
    "title date"
    "category amount"
    "comment comment"
}

#title {
    font-size: 1.3em;
    grid-area: title;
    justify-self: start;
    align-self: end;
}

#paidOn {
    color: #aaaaaa;
    grid-area: date;
    justify-self: end;
    align-self: end;
}

#category {
    grid-area: category;
    justify-self: start;
    align-self: center;
}

#amount-section {
    color: #f85776;
    font-weight: bold;
    grid-area: amount;
    justify-self: end;
    align-self: center;
    text-align: right;
}

#amount {
    font-size: 2em;
}

.extended {
    background-color: #f3f4f8;
}

.extended #comment-section {
    display: block;
}

#comment-section {
    display: none;
    font-size: 1em;
    grid-area: comment;
    margin-top: 1.3em;
}

#comment {
    color: #aaaaaa;
}

.title {
    font-weight: bold;
}


</style>
`


// TODO: Add expanded state here.
class Record extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }

    static get observedAttributes() {
        return ['isextended'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'isextended': {
                let record = this.root.querySelector('#record')
                console.log('Changed Attribute!', record)
                if(record === null) break;
                if(newValue === 'true') record.setAttribute('class', 'extended')
                else record.setAttribute('class', '')
                break;
            }
        }
    }


    connectedCallback() {
        this.render()
    }

    render() {
        let node = template.content.cloneNode(true)

        const title = this.getAttribute('title')
        const amount = this.getAttribute('amount')
        const category = this.getAttribute('category')
        const date = this.getAttribute('date')
        const comment = this.getAttribute('comment')

        node.querySelector('#title').innerText = title
        node.querySelector('#amount').innerText = `-${amount}`
        node.querySelector('#category').setAttribute('text', category)
        node.querySelector('#paidOn').innerText = format(date, '[on] dddd, DD MMMM YYYY')
        node.querySelector('#comment').innerText = comment

        this.root.appendChild(node)
    }
}

export default Record