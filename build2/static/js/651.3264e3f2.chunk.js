"use strict";(self.webpackChunkpesasa=self.webpackChunkpesasa||[]).push([[651],{89659:(e,a,s)=>{s.r(a),s.d(a,{FilteringTable:()=>p,default:()=>f});var l=s(72791),c=s(33615),n=s(66659),o=s(71358),t=s(92396),r=s(97311),i=(s(25161),s(62062)),d=s.n(i),m=s(34978),x=s(6639),h=s(2499),u=s(70188),j=(s(43241),s(5970)),N=s(80184);const p=()=>{var e,a;const[s,i]=(0,l.useState)([]),[p,f]=(0,l.useState)([]),[v,b]=(0,l.useState)(!1),[g,y]=(0,l.useState)({id:null,name:"",sector:"",osector:"",country:"Uganda",city:"",town:"",streetaddress:"",contactPersonOne:"",phoneOne:"",designationOne:"",contactEmailOne:"",contactPersonTwo:"",phoneTwo:"",designationTwo:"",contactEmailTwo:"",clientBuyerId:null,terms:"choose",code:"+256",code2:"+256"});function w(){y({id:null,name:"",sector:"",osector:"",country:"Uganda",city:"",town:"",streetaddress:"",contactPersonOne:"",phoneOne:"",designationOne:"",contactEmailOne:"",contactPersonTwo:"",phoneTwo:"",designationTwo:"",contactEmailTwo:"",clientBuyerId:null,terms:"choose",code:"+256",code2:"+256"}),T(!0)}function C(){(0,m.L7)().then((e=>{f(e),i(e)})).catch((e=>{console.log(e),d()("Oops",e.message,"error")}))}s.map((e=>{e.add=e.city+" , "+e.country,e.actions=(0,N.jsx)("div",{className:"d-flex",children:(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs sharp me-1",onClick:()=>{return(a=e).actions="",console.log(a),void(a.isApproved||(y(a),T(!0)));var a},"data-dismiss":"modal",children:(0,N.jsx)("i",{className:"fa fa-pencil"})}),(0,N.jsx)("button",{onClick:()=>d()({title:"Are you sure?",text:"Once deleted, you will not be able to recover this information!",icon:"warning",buttons:!0,dangerMode:!0}).then((a=>{a?(0,m.rx)(e.clientBuyerId).then((()=>{d()("Poof! Buyer record has been deleted!",{icon:"success"}),C()})).catch((e=>{console.log(e),d()("Oops",e.message,"error")})):d()("Your information is safe!")})),className:"btn btn-danger shadow btn-xs sharp",children:(0,N.jsx)("i",{className:"fa fa-trash"})})]})})})),(0,l.useEffect)((()=>{C()}),[]);const O=j.n.map((e=>(0,N.jsxs)("option",{value:e.dial_code,children:[" "," "+e.name+" ("+e.dial_code+" )"]}))),P=j.n.map((e=>(0,N.jsxs)("option",{value:e.name,children:[" "," "+e.name+" "]}))),[k,T]=(0,l.useState)(!1),q=(0,l.useMemo)((()=>r.L),[]),S=(0,l.useMemo)((()=>t),[]),E=(0,o.useTable)({columns:q,data:S,initialState:{pageIndex:0}},o.useFilters,o.useGlobalFilter,o.usePagination),[A,B]=(0,l.useState)([]),D=e=>{e.preventDefault();const a=e.target.getAttribute("name"),s=e.target.value,l={...g};l[a]=s,y(l)},{state:F}=E,{globalFilter:V,pageIndex:I}=F,M=[];return p.map((e=>{M.push((0,N.jsxs)("option",{disabled:e.amOwner,value:e.id,children:[e.name," ",e.amOwner?"(Already Added)":""]}))})),(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(n.Z,{activeMenu:"Buyers",motherMenu:"Company Data"}),(0,N.jsxs)("div",{className:"card",children:[(0,N.jsx)("div",{className:"card-header",children:(0,N.jsxs)("div",{className:"row",style:{width:"100%"},children:[(0,N.jsx)("div",{className:"col-xl-3 ",children:(0,N.jsx)("h4",{className:"card-title",children:"Company Buyer"})}),(0,N.jsx)("div",{className:"col-xl-3",children:(0,N.jsx)("button",{className:"btn btn-primary font-w600 mb-2 me-auto",onClick:()=>w(),children:"Add New Buyer"})})]})}),(0,N.jsxs)("div",{className:"card-body",children:[(0,N.jsx)("div",{className:"row",style:{width:"100%"},children:(0,N.jsx)("div",{className:"col-xl-3 ",children:(0,N.jsx)("h4",{className:"card-title",children:"Added Buyers"})})}),(0,N.jsx)(x.Z,{hideDataExport:!0,rows:s,columns:[{name:"refference",title:"Buyer Reff"},{name:"name",title:"Name"},{name:"sector",title:"Sector"},{name:"add",title:"Adress"},{name:"contactPersonOne",title:"Contact Person"},{name:"designationOne",title:"Designation"},{name:"type",title:"Type"},{name:"status",title:"Status"},{name:"actions",title:"Actions"}],defaultExpandedGroups:[],grouping:[],defaultHiddenColumnNames:["designationOne"],defaultPageSize:0,hideSelectionExport:!0,infiniteScrolling:!0,fileName:"Directors"})]}),(0,N.jsx)(c.Z,{className:"fade bd-example-modal-lg",size:"lg",show:k,onHide:T,children:(0,N.jsx)("div",{className:"",role:"document",children:(0,N.jsx)("div",{className:"",children:(0,N.jsxs)("form",{children:[(0,N.jsxs)("div",{className:"modal-header",children:[(0,N.jsx)("h4",{className:"modal-title fs-20",children:"Add Buyer"}),(0,N.jsx)("button",{type:"button",className:"btn-close",onClick:()=>T(!1),"data-dismiss":"modal"})]}),(0,N.jsxs)("div",{className:"modal-body",children:[(0,N.jsx)("i",{className:"flaticon-cancel-12 close"}),(0,N.jsx)("div",{className:"add-contact-box",children:(0,N.jsxs)("div",{className:"add-contact-content",children:[(0,N.jsxs)("div",{className:"row",children:[(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsxs)("label",{className:"text-black font-w500",children:[(0,N.jsx)("b",{style:{color:"red"},children:"*"})," Name"]}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",className:"form-control",autoComplete:"off",value:g.name,name:"name",required:"required",onChange:D,placeholder:" Name"}),(0,N.jsx)("span",{className:"validation-text"})]})]})}),(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsxs)("label",{className:"text-black font-w500",children:[(0,N.jsx)("b",{style:{color:"red"},children:"*"})," Sector"]}),(0,N.jsx)("div",{className:"form-group mb-3",children:(0,N.jsxs)("select",{value:g.sector,defaultValue:"",name:"sector",onChange:D,className:"form-control",children:[(0,N.jsx)("option",{disabled:!0,value:"",children:"Select Sector"}),u.$l.map((e=>(0,N.jsx)("option",{value:e,children:e})))]})})]})})]}),(0,N.jsxs)("div",{className:"row",children:[null!==(e=g.sector)&&void 0!==e&&e.includes("Other")?(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Other Sector"}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",value:g.osector,className:"form-control",autoComplete:"off",name:"osector",required:"required",onChange:D,placeholder:"Other Sector"}),(0,N.jsx)("span",{className:"validation-text"})]})]})}):null,(0,N.jsx)("div",{className:null!==(a=g.sector)&&void 0!==a&&a.includes("Other")?"col-xl-6 col-xxl-6":"col-xl-12 col-xxl-12",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsxs)("label",{className:"text-black font-w500",children:[(0,N.jsx)("b",{style:{color:"red"},children:"*"})," Country"]}),(0,N.jsx)("div",{className:"contact-name",children:(0,N.jsx)("select",{value:g.country,name:"country",onChange:D,defaultValue:"Uganda",className:"form-control",children:P})})]})})]}),(0,N.jsxs)("div",{className:"row",children:[(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsxs)("label",{className:"text-black font-w500",children:[(0,N.jsx)("b",{style:{color:"red"},children:"*"})," City"]}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",className:"form-control",value:g.city,autoComplete:"off",name:"city",required:"required",onChange:D,placeholder:"City"}),(0,N.jsx)("span",{className:"validation-text"})]})]})}),(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Town"}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",className:"form-control",autoComplete:"off",name:"town",value:g.town,onChange:D,placeholder:"Town"}),(0,N.jsx)("span",{className:"validation-text"})]})]})})]}),(0,N.jsx)("div",{className:"row",children:(0,N.jsx)("div",{className:"col-xl-12 col-xxl-12",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Street Address / Village"}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",className:"form-control",autoComplete:"off",name:"streetaddress",value:g.streetaddress,onChange:D,placeholder:"Street Address / Village"}),(0,N.jsx)("span",{className:"validation-text"})]})]})})}),(0,N.jsxs)("div",{className:"row",children:[(0,N.jsx)("div",{className:"col-xl-12 col-xxl-12",style:{marginTop:"40px"},children:(0,N.jsx)("div",{className:"form-group mb-3",children:(0,N.jsx)("label",{className:"text-black font-w500",children:"First Contact Person"})})}),(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsxs)("label",{className:"text-black font-w500",children:[(0,N.jsx)("b",{style:{color:"red"},children:"*"})," Name Of Contact Person"]}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",value:g.contactPersonOne,className:"form-control",autoComplete:"off",name:"contactPersonOne",required:"required",onChange:D,placeholder:"Contact Person"}),(0,N.jsx)("span",{className:"validation-text"})]})]})}),(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsxs)("label",{className:"text-black font-w500",children:[(0,N.jsx)("b",{style:{color:"red"},children:"*"})," Designation"]}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",value:g.designationOne,className:"form-control",autoComplete:"off",name:"designationOne",required:"required",onChange:D,placeholder:"Designation"}),(0,N.jsx)("span",{className:"validation-text"})]})]})})]}),(0,N.jsxs)("div",{className:"row",children:[(0,N.jsx)("div",{className:"col-xl-3 col-xxl-3",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Country Code"}),(0,N.jsx)("div",{className:"form-group mb-3",children:(0,N.jsx)("select",{value:g.code,name:"code",onChange:D,defaultValue:"+256",className:"form-control",children:O})})]})}),(0,N.jsx)("div",{className:"col-xl-4 col-xxl-4",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsxs)("label",{className:"text-black font-w500",children:[(0,N.jsx)("b",{style:{color:"red"},children:"*"})," Phone Number"]}),(0,N.jsx)("div",{className:"contact-name",children:(0,N.jsx)("div",{className:"form-group mb-0",children:(0,N.jsx)("input",{type:"number",value:g.phoneOne,className:"form-control",autoComplete:"off",name:"phoneOne",required:"required",onChange:D,placeholder:"Phone No."})})})]})}),(0,N.jsx)("div",{className:"col-xl-5 col-xxl-5",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Email"}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",value:g.contactEmailOne,className:"form-control",autoComplete:"off",name:"contactEmailOne",required:"required",onChange:D,placeholder:"Email"}),(0,N.jsx)("span",{className:"validation-text"})]})]})})]}),(0,N.jsxs)("div",{className:"row",children:[(0,N.jsx)("div",{className:"col-xl-12 col-xxl-12",style:{marginTop:"40px"},children:(0,N.jsx)("div",{className:"form-group mb-3",children:(0,N.jsx)("label",{className:"text-black font-w500",children:"Second Contact Person"})})}),(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Name Of Contact Person"}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",value:g.contactPersonTwo,className:"form-control",autoComplete:"off",name:"contactPersonTwo",required:"required",onChange:D,placeholder:"Contact Person"}),(0,N.jsx)("span",{className:"validation-text"})]})]})}),(0,N.jsx)("div",{className:"col-xl-6 col-xxl-6",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Designation"}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",value:g.designationTwo,className:"form-control",autoComplete:"off",name:"designationTwo",required:"required",onChange:D,placeholder:"Designation"}),(0,N.jsx)("span",{className:"validation-text"})]})]})})]}),(0,N.jsxs)("div",{className:"row",children:[(0,N.jsx)("div",{className:"col-xl-3 col-xxl-3",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Country Code"}),(0,N.jsx)("div",{className:"form-group mb-3",children:(0,N.jsx)("select",{value:g.code2,name:"code2",onChange:D,defaultValue:"+256",className:"form-control",children:O})})]})}),(0,N.jsx)("div",{className:"col-xl-4 col-xxl-4",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:" Phone Number"}),(0,N.jsx)("div",{className:"contact-name",children:(0,N.jsx)("div",{className:"form-group mb-0",children:(0,N.jsx)("input",{type:"number",value:g.phoneTwo,className:"form-control",autoComplete:"off",name:"phoneTwo",required:"required",onChange:D,placeholder:"Phone No."})})})]})}),(0,N.jsx)("div",{className:"col-xl-5 col-xxl-5",children:(0,N.jsxs)("div",{className:"form-group mb-3",children:[(0,N.jsx)("label",{className:"text-black font-w500",children:"Email"}),(0,N.jsxs)("div",{className:"contact-name",children:[(0,N.jsx)("input",{type:"text",value:g.contactEmailTwo,className:"form-control",autoComplete:"off",name:"contactEmailTwo",required:"required",onChange:D,placeholder:"Email"}),(0,N.jsx)("span",{className:"validation-text"})]})]})})]})]})})]}),(0,N.jsxs)("div",{className:"modal-footer",children:[v?(0,N.jsx)(h.RotateSpinner,{size:30,color:"rgba(41, 106, 176,1)",loading:v}):(0,N.jsxs)("button",{type:"submit",className:"btn btn-primary",onClick:e=>{e.preventDefault();var a=!1,s="";g.actions="",""===g.name?(a=!0,s="Please fill buyer name"):""===g.sector?(a=!0,s="Please fill buyer sector."):""===g.city?(a=!0,s="Please add city"):""===g.contactPersonOne?(a=!0,s="Please add contact person name"):""===g.designationOne?(a=!0,s="Please add contact person designation"):""===g.phoneOne&&(a=!0,s="Please add contact person phone"),a?d()("Oops",s,"error"):(g.contactEmailOne=g.contactEmailOne+g.code,g.contactEmailTwo=g.contactEmailTwo+g.code2,console.log(g),b(!0),(0,m.Ap)(g).then((e=>{b(!1),T(!1),d()("Good job!","Successfully Added","success"),C()})).catch((e=>{b(!1),console.log(e),d()("Oops",e.message,"error")})))},children:[null===g.id?"Add":"Update"," Buyer"]}),(0,N.jsxs)("button",{type:"button",onClick:()=>T(!1),className:"btn btn-danger",children:[" ",(0,N.jsx)("i",{className:"flaticon-delete-1"})," Discard"]})]})]})})})})]})]})},f=p},25161:(e,a,s)=>{s(72791),s(80184)}}]);
//# sourceMappingURL=651.3264e3f2.chunk.js.map