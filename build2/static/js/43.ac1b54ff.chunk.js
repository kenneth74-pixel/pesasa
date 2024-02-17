"use strict";(self.webpackChunkpesasa=self.webpackChunkpesasa||[]).push([[43],{25161:(e,a,s)=>{s(72791),s(80184)},54532:(e,a,s)=>{s.r(a),s.d(a,{FilteringTable:()=>j,default:()=>N});var l=s(72791),t=s(33615),n=s(66659),o=s(71358),c=s(92396),d=s(97311),i=(s(25161),s(62062)),r=s.n(i),m=s(34978),x=s(6639),u=s(2499),h=(s(43241),s(5970)),p=s(80184);const j=()=>{const[e,a]=(0,l.useState)([]),[s,i]=(0,l.useState)([]),[j,N]=(0,l.useState)(!1),[b,f]=(0,l.useState)({id:null,name:"",rate:"",days:""});function v(){f({id:null,name:"",rate:"",days:""}),w(!0)}function g(){(0,m.EI)().then((e=>{i(e),a(e)})).catch((e=>{console.log(e),r()("Oops",e.message,"error")}))}e.map((e=>{e.ratev=e.rate+"%",e.actions=(0,p.jsx)("div",{className:"d-flex",children:"CLIENT_ADDED"===e.type?null:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs sharp me-1",onClick:()=>{return(a=e).actions="",a.name=a.period,console.log(a),void(a.isApproved||(f(a),w(!0)));var a},"data-dismiss":"modal",children:(0,p.jsx)("i",{className:"fa fa-pencil"})}),(0,p.jsx)("button",{onClick:()=>r()({title:"Are you sure?",text:"Once deleted, you will not be able to recover this information!",icon:"warning",buttons:!0,dangerMode:!0}).then((a=>{a?(0,m.wc)(e.id).then((()=>{r()("Poof!  record has been deleted!",{icon:"success"}),g()})).catch((e=>{console.log(e),r()("Oops",e.message,"error")})):r()("Your information is safe!")})),className:"btn btn-danger shadow btn-xs sharp",children:(0,p.jsx)("i",{className:"fa fa-trash"})})]})})})),(0,l.useEffect)((()=>{g()}),[]);h.n.map((e=>(0,p.jsxs)("option",{value:e.dial_code,children:[" "," "+e.name+" ("+e.dial_code+" )"]}))),h.n.map((e=>(0,p.jsxs)("option",{value:e.name,children:[" "," "+e.name+" "]})));const[y,w]=(0,l.useState)(!1),C=(0,l.useMemo)((()=>d.L),[]),k=(0,l.useMemo)((()=>c),[]),A=(0,o.useTable)({columns:C,data:k,initialState:{pageIndex:0}},o.useFilters,o.useGlobalFilter,o.usePagination),[S,D]=(0,l.useState)([]),R=e=>{e.preventDefault();const a=e.target.getAttribute("name"),s=e.target.value,l={...b};l[a]=s,f(l)},{state:P}=A,{globalFilter:O,pageIndex:q}=P,E=[];return s.map((e=>{E.push((0,p.jsxs)("option",{disabled:e.amOwner,value:e.id,children:[e.name," ",e.amOwner?"(Already Added)":""]}))})),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(n.Z,{activeMenu:"Rates",motherMenu:"Company Data"}),(0,p.jsxs)("div",{className:"card",children:[(0,p.jsx)("div",{className:"card-header",children:(0,p.jsxs)("div",{className:"row",style:{width:"100%"},children:[(0,p.jsx)("div",{className:"col-xl-3 ",children:(0,p.jsx)("h4",{className:"card-title",children:"Period Rates"})}),(0,p.jsx)("div",{className:"col-xl-3",children:(0,p.jsx)("button",{className:"btn btn-primary font-w600 mb-2 me-auto",onClick:()=>v(),children:"Add New Rates"})})]})}),(0,p.jsxs)("div",{className:"card-body",children:[(0,p.jsx)("div",{className:"row",style:{width:"100%"},children:(0,p.jsx)("div",{className:"col-xl-3 ",children:(0,p.jsx)("h4",{className:"card-title",children:"Added Rates"})})}),(0,p.jsx)(x.Z,{hideDataExport:!0,rows:e,columns:[{name:"period",title:"Period"},{name:"ratev",title:"Rate"},{name:"days",title:"Days"},{name:"actions",title:"Actions"}],defaultExpandedGroups:[],grouping:[],defaultHiddenColumnNames:[],defaultPageSize:0,hideSelectionExport:!0,infiniteScrolling:!0,fileName:"Ratess"})]}),(0,p.jsx)(t.Z,{className:"fade bd-example-modal-lg",size:"lg",show:y,onHide:w,children:(0,p.jsx)("div",{className:"",role:"document",children:(0,p.jsx)("div",{className:"",children:(0,p.jsxs)("form",{children:[(0,p.jsxs)("div",{className:"modal-header",children:[(0,p.jsx)("h4",{className:"modal-title fs-20",children:"Add Rates"}),(0,p.jsx)("button",{type:"button",className:"btn-close",onClick:()=>w(!1),"data-dismiss":"modal"})]}),(0,p.jsxs)("div",{className:"modal-body",children:[(0,p.jsx)("i",{className:"flaticon-cancel-12 close"}),(0,p.jsx)("div",{className:"add-contact-box",children:(0,p.jsx)("div",{className:"add-contact-content",children:(0,p.jsxs)("div",{className:"row",children:[(0,p.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,p.jsxs)("div",{className:"form-group mb-3",children:[(0,p.jsxs)("label",{className:"text-black font-w500",children:[(0,p.jsx)("b",{style:{color:"red"},children:"*"})," Period Name"]}),(0,p.jsxs)("div",{className:"contact-name",children:[(0,p.jsx)("input",{type:"text",className:"form-control",autoComplete:"off",value:b.name,name:"name",required:"required",onChange:R,placeholder:" Period Name"}),(0,p.jsx)("span",{className:"validation-text"})]})]})}),(0,p.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,p.jsxs)("div",{className:"form-group mb-3",children:[(0,p.jsxs)("label",{className:"text-black font-w500",children:[(0,p.jsx)("b",{style:{color:"red"},children:"*"})," Rate"]}),(0,p.jsxs)("div",{className:"contact-name",children:[(0,p.jsx)("input",{type:"number",className:"form-control",autoComplete:"off",value:b.rate,name:"rate",required:"required",onChange:R,placeholder:" Rate"}),(0,p.jsx)("span",{className:"validation-text"})]})]})}),(0,p.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,p.jsxs)("div",{className:"form-group mb-3",children:[(0,p.jsxs)("label",{className:"text-black font-w500",children:[(0,p.jsx)("b",{style:{color:"red"},children:"*"})," No. Of Days"]}),(0,p.jsxs)("div",{className:"contact-name",children:[(0,p.jsx)("input",{type:"number",className:"form-control",autoComplete:"off",value:b.days,name:"days",required:"required",onChange:R,placeholder:"No. Of Days"}),(0,p.jsx)("span",{className:"validation-text"})]})]})})]})})})]}),(0,p.jsxs)("div",{className:"modal-footer",children:[j?(0,p.jsx)(u.RotateSpinner,{size:30,color:"rgba(41, 106, 176,1)",loading:j}):(0,p.jsxs)("button",{type:"submit",className:"btn btn-primary",onClick:e=>{e.preventDefault();var a=!1,s="";b.actions="",""===b.name?(a=!0,s="Please fill period name"):""===b.rate?(a=!0,s="Please fill in rate"):""===b.days&&(a=!0,s="Please fill in days"),a?r()("Oops",s,"error"):(console.log(b),b.period=b.name,N(!0),(0,m.q8)(b).then((e=>{N(!1),w(!1),r()("Good job!","Successfully Added","success"),g()})).catch((e=>{N(!1),console.log(e),r()("Oops",e.message,"error")})))},children:[null===b.id?"Add":"Update"," Rates"]}),(0,p.jsxs)("button",{type:"button",onClick:()=>w(!1),className:"btn btn-danger",children:[" ",(0,p.jsx)("i",{className:"flaticon-delete-1"})," Discard"]})]})]})})})})]})]})},N=j}}]);
//# sourceMappingURL=43.ac1b54ff.chunk.js.map