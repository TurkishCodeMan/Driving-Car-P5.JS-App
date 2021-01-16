import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter);

const Game=resolve=>{
    require.ensure(["../components/Canvas.vue"],()=>{
        resolve(require("../components/Canvas.vue"))
    })
};

const ReDraw=resolve=>{
    require.ensure(["../components/ReDrawCanvas.vue"],()=>{
        resolve(require("../components/ReDrawCanvas.vue"))
    })
};

const routes=[
    {path:"/redraw",component:ReDraw,name:"redraw"},
    {path:"/game",component:Game,name:"game"}
]

export const router=new VueRouter({
    routes
})