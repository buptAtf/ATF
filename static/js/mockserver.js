var app = new Vue({
    el: "#v-mockserver",
    data: {
        mockexce: [],
        interface:"www.baidu.com",
        creater: "刘福林",
        path: "/dizhi",
        updateTime: "2019-4-18 20:49:00",
        mockpath: "www.baidu.com"

    },
    ready: function(){

        $('.2').addClass('open');
        $('.2 .arrow').addClass('open');
        $('.2-ul').css({display: 'block'});
        $('.2-2').css({color: '#ff6c60'});
    },
    methods:{

    }
})