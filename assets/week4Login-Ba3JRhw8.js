import{u as V,b as I,r as l,c,a as o,w as a,v as n,d as q,t as L,e as w,o as d}from"./index-CFJcvoKQ.js";const P={class:"conatiner loginPage"},B=o("div",{class:"side"},[o("img",{class:"logoImg",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png",alt:""}),o("img",{class:"d-m-n",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png",alt:"workImg"})],-1),D={key:0},E={class:"formControls",action:"index.html"},N=o("h2",{class:"formControls_txt"},"最實用的線上代辦事項服務",-1),T=o("label",{class:"formControls_label",for:"email"},"Email",-1),$={key:0},j=o("label",{class:"formControls_label",for:"pwd"},"密碼",-1),M={key:1},z={class:"formControls",action:"index.html"},A=o("h2",{class:"formControls_txt"},"註冊帳號",-1),F=o("label",{class:"formControls_label",for:"email"},"Email",-1),G=o("label",{class:"formControls_label",for:"name"},"您的暱稱",-1),H=o("label",{class:"formControls_label",for:"pwd"},"密碼",-1),J=o("label",{class:"formControls_label",for:"pwd"},"再次輸入密碼",-1),Q={__name:"week4Login",setup(K){const p=V(),k=I(),h=p.Url,i=l(!0),_=l("smart@gmail.com"),u=l("smartsmart"),v=l("smartsmart"),r=l(""),f=l("smart"),C=l(""),b=()=>{i.value=!i.value},y=()=>{u.value!=v.value?r.value="密碼輸入不一致":r.value=""},x=async()=>{if(r.value=="")try{const s=await w.post(`${h}/users/sign_up`,{email:_.value,password:u.value,nickname:f.value});C.value="註冊成功. UID: "+s.data.uid,U(C)}catch(s){r.value=s.response.data.message}},U=s=>{alert("註冊成功",s.value),i.value=!0},m=l("smart@gmail.com"),g=l("smartsmart"),S=async()=>{try{const s=await w.post(`${h}/users/sign_in`,{email:m.value,password:g.value});p.setToken(s.data.token),p.setName(s.data.nickname),k.todoList()}catch(s){alert(s.response.data.message)}};return(s,e)=>(d(),c("div",P,[B,i.value?(d(),c("div",D,[o("form",E,[N,T,a(o("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>m.value=t),class:"formControls_input",type:"text",id:"email",placeholder:"請輸入 email",required:""},null,512),[[n,m.value]]),m.value?q("",!0):(d(),c("span",$,"此欄位不可留空")),j,a(o("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>g.value=t),class:"formControls_input",type:"password",id:"pwd",placeholder:"請輸入密碼",required:""},null,512),[[n,g.value]]),o("button",{onClick:S,class:"formControls_btnSubmit",type:"button"},"登入"),o("a",{onClick:b,class:"formControls_btnLink",href:"#"},"註冊帳號")])])):(d(),c("div",M,[o("form",z,[A,F,a(o("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>_.value=t),class:"formControls_input",type:"text",id:"email",name:"email",placeholder:"請輸入 email",required:""},null,512),[[n,_.value]]),G,a(o("input",{"onUpdate:modelValue":e[3]||(e[3]=t=>f.value=t),class:"formControls_input",type:"text",name:"name",id:"name",placeholder:"請輸入您的暱稱"},null,512),[[n,f.value]]),H,a(o("input",{"onUpdate:modelValue":e[4]||(e[4]=t=>u.value=t),class:"formControls_input",type:"password",id:"pwd",placeholder:"請輸入密碼",required:""},null,512),[[n,u.value]]),J,a(o("input",{onChange:y,"onUpdate:modelValue":e[5]||(e[5]=t=>v.value=t),class:"formControls_input",type:"password",id:"pwd2",placeholder:"請再次輸入密碼",required:""},null,544),[[n,v.value]]),o("span",null,L(r.value),1),o("input",{onClick:x,class:"formControls_btnSubmit",type:"button",onclick:"javascript:location.href='#todoListPage'",value:"註冊帳號"}),o("a",{onClick:b,class:"formControls_btnLink",href:"#"},"登入")])]))]))}};export{Q as default};