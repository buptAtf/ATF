
//刘瑞 have a try----vue
var app = new Vue({
    el: '#v-home',
    data: {

    },
    created: function(){
        
    },
    ready: function(){
        $('.-1 a').css({color: '#ff6c60'});
    }
    
});


function goHere(place){
    
    sessionStorage.setItem('towhere',place);
};
