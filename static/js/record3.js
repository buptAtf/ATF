var app = new Vue({
    el: '#v-record',
    data: {

    },

    ready: function(){

        $('.4').addClass('open');       //侧边展开，高亮显示当前页面Mock API
        $('.4 .arrow').addClass('open');
        $('.4-ul').css({display: 'block'});
        $('.4-3').css({color: '#ff6c60'});
    },

    methods: {

    }
}) 
