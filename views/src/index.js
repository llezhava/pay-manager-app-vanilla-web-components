import PayManagerApp from './app/app.js'
import Controller from './controller/controller.js'
import RecordsContainer from './records/records.js'
import PaymentRecord from './records/record.js'
import Chart from './chart/chart.js'
import Bar from './chart/bar.js'


window.customElements.define('paym-app', PayManagerApp)
window.customElements.define('paym-controller', Controller)
window.customElements.define('paym-records', RecordsContainer)
window.customElements.define('paym-record', PaymentRecord)
window.customElements.define('paym-chart', Chart)
window.customElements.define('paym-bar', Bar)