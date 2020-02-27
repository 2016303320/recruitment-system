import Vue from 'vue'
import { Button, Form, Input, FormItem, Table, TableColumn, Icon, Dialog, Loading, Notification} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Loading)

Vue.prototype.$notify = Notification;