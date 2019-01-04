import PayManagerApp from './app/app.js'
import Controller from './controller/controller.js'
import RecordsContainer from './records/records.js'
import PaymentRecord from './records/record.js'
import Chart from './chart/chart.js'
import Bar from './chart/bar.js'
import Separator from './common/separator.js'
import Tag from './common/tag.js'



if (module.hot) {
    module.hot.accept();
}
window.customElements.define('paym-separator', Separator)
window.customElements.define('paym-tag', Tag)
window.customElements.define('paym-app', PayManagerApp)
window.customElements.define('paym-controller', Controller)
window.customElements.define('paym-records', RecordsContainer)
window.customElements.define('paym-record', PaymentRecord)
window.customElements.define('paym-chart', Chart)
window.customElements.define('paym-bar', Bar)


