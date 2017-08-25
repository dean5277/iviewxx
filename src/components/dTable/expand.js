export default {
    name: 'TableExpand',
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
       

        //console.log(h)
  
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };

        if (ctx.props.column) params.column = ctx.props.column;
         if(ctx.props.render(h, params) == undefined) return;
        if(ctx.props.render(h, params).childrens ){

            var cp = ctx.props.render(h, params).childrens;
            if(typeof cp == 'object'){
                var pos = []
                for(let i = 0; i < cp.length; i++ ){
                    
                    var str =h(
                        cp[i][0],
                        {
                           props:cp[i][1].hasOwnProperty('props') ? cp[i][1].props : '',
                           class:cp[i][1].hasOwnProperty('class') ? cp[i][1].class : '',
                           on:cp[i][1].hasOwnProperty('on') ? cp[i][1].on : ''
                        },
                        cp[i][2]
                    )
                    pos.push(str);
                }
                
                return pos;
            }else{

                return ctx.props.render(h, params).childrens;
            }
          // console.log(h('div',123))
          
        }else{
            return ctx.props.render(h, params);
        }
       
    }
};
