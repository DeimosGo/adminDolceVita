import { createApp } from 'vue'
import './index.css';
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue';
import router from './router';
import VueHtmlToPaper from './plugins/VueHtmlToPaper';

const options = {
    name: '',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    timeout: 1000, // default timeout before the print window appears
    autoClose: true, // if false, the window will not close after printing
    windowTitle: window.document.title, // override the window title
}
let app = createApp(App);

app.use(VueApexCharts);
app.use(VueHtmlToPaper, options);
app.use(router);
app.mount("#app");
