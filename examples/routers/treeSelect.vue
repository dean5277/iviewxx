<template>
	<div>
		<Row>
	        <Col span="12" style="padding-right:10px">
				<treeSelect :treeData="treeData" v-model="data" filterable @on-change="getTreeData" showCheckbox></treeSelect>
			</Col>
		</Row>
	</div>
</template>
<script>
	export default {
		data (){
			return {
				data:[],
				treeData: [
					{
						title:"parent 0",
						expand:true,
						children:[]
					}
				]
			}
		},
		methods:{
			getTreeData (value){
				console.log("getTreeValue:",value)
			}
		},
		created (){
			let v = this,
				Arr = [];
			function makeTree (){
				for (let i = 1; i < 20; i++){
					Arr.push({
						title: 'parent 0-' + i,
						expand : true,
						children:[
							{
                 title: 'leaf 0-' + i + "-1"
              },
              {
                title: 'leaf 0-' + i + "-2",
                expand:true,
                children:[
                	{
                		title:"66"
                	}
                ]
              }
						]
					})
				}
				return true;
			}
			async function addTree (){
				const a = await makeTree();
				if(a){
					v.$set(v.treeData[0],'children',Arr);
				
				}
				
				
			}
			addTree();


		}

	}
</script>
