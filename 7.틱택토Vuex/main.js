import Vue from 'vue';
import TicTacToc from './TicTacToc';

new Vue({
    render: createElement => createElement(TicTacToc)
}).$mount('#root');