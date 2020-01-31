
    $(()=>{
	
		
		let type="default"
		
		$.ajax({
			type:"get",
			url:"http://127.0.0.1/demo/server/getPage.php",
			dataType:"json",
			success:function(response){
				//console.log(response);
				//renderUI(response)
				let count=response.count;
				let html="";
				for(let i=0;i<count;i++){
					html += `<div class="a">${i+1}</div>`;
				}
				$("#page").html(html);
				
			    getDataWithPage(1,type);
			}
		});
		
		// 页面点击事件
		$("#page").on("click","div",function(){
			let index=$(this).index();
			//console.log(index);
			getDataWithPage(index+1,type);
		});
		
		// 排序
		$(".btn").on("click","button",function(){
			// console.log($(this).data("type"));
		   type=$(this).data("type");
		   getDataWithPage(1,type);
		
		})
		
		
		
		
		function getDataWithPage(index,type){
			
			$.ajax({
				type:"get",
				url:"http://127.0.0.1/demo/server/server.php",
				data:`page=${index}&type=${type}`,
				dataType:"json",
				success:function(response){
					//console.log(response);
				renderUI(response,index);
				}
			});
		}
	
			
		function renderUI(_data,index){
	let html = _data.map((item)=>{
			 return `
			  <div class="main_content">
			 	<div class="img"><img src=${item.img}></div>
			 	
			 <div class="main_button">
				<div class="price">￥${item.price}</apan></div>
			 	<div class="title">${item.goods_name}</div>
			 	<div class="text">${item.orange_color}</div>
			 	<div class="ti">
			 		<span class="a">${item.pro_coupon}</span>
			 		<span class="b"><i class="iconfont">&#xe600;</i>${item.number}</span>
			 	</div>
			  </div>
			 </div>`
		 }).join("");
		 $(".main_goods").html(html);
		 
		 /* 处理页码的选中状态*/
		 $("#page").children("div").eq(index-1).addClass("b").siblings().removeClass("b");
		}
	})