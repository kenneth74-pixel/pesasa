"use strict";(self.webpackChunkpesasa=self.webpackChunkpesasa||[]).push([[287],{86014:(e,s,a)=>{a.d(s,{Z:()=>r});var t=a(72791),l=a(5970),i=a(34978),n=a(2499),c=a(62062),d=a.n(c),o=a(80184);const r=e=>{const[s,a]=(0,t.useState)(!1),[c,r]=(0,t.useState)(!1),[m,h]=(0,t.useState)(!1),[x,u]=(0,t.useState)(!1),[j,b]=(l.n.map((e=>(0,o.jsxs)("option",{value:e.name,children:[" "," "+e.name+" "]}))),l.n.map((e=>(0,o.jsxs)("option",{value:e.dial_code,children:[" "," "+e.name+" ("+e.dial_code+" )"]}))),(0,t.useState)({id:null,currency:"",invoices:"",credit:"",limit:"",hasLoan:"",hasLien:""}));(0,t.useEffect)((()=>{h(!0),b(e.data)}),[]);!function(e,s){const a=[];for(var t=e;t<s;t++)a.push(t);a.push(s)}(2021,(new Date).getFullYear());const v=e=>{e.preventDefault();const s=e.target.getAttribute("name"),a=e.target.value.split(",").join("");if(!isNaN(a)){const e={...j};e[s]=a,b(e)}};return(0,o.jsxs)("section",{style:{marginTop:"10px"},children:[(0,o.jsx)("div",{className:"card",style:{padding:"30px"},children:(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col",children:(0,o.jsx)("h4",{children:"Bank Account"})})})}),(0,o.jsx)("div",{className:"card",style:{padding:"30px"},children:(0,o.jsxs)("div",{className:"row",style:{marginTop:"20px"},children:[(0,o.jsxs)("div",{className:"col-md-6 mb-2",children:[(0,o.jsx)("label",{className:"text-black font-w500",children:" Account Name"}),(0,o.jsxs)("div",{className:"contact-name",children:[(0,o.jsx)("input",{disabled:m,type:"text",className:"form-control",autoComplete:"off",name:"invoices",required:"required",onChange:v,placeholder:"Account Name"}),(0,o.jsx)("span",{className:"validation-text"})]})]}),(0,o.jsx)("div",{className:"col-md-6 mb-2",children:(0,o.jsxs)("div",{className:"form-group mb-3",children:[(0,o.jsx)("label",{className:"text-black font-w500",children:"Account Number"}),(0,o.jsx)("div",{className:"contact-name",children:(0,o.jsx)("div",{className:"form-group mb-0",children:(0,o.jsx)("input",{disabled:m,type:"text",className:"form-control",autoComplete:"off",name:"limit",required:"required",onChange:v,placeholder:"Account Number"})})})]})}),(0,o.jsx)("div",{className:"col-md-6 mb-2",children:(0,o.jsxs)("div",{className:"form-group mb-3",children:[(0,o.jsx)("label",{className:"text-black font-w500",children:"Name of Bank"}),(0,o.jsx)("div",{className:"contact-name",children:(0,o.jsx)("div",{className:"form-group mb-0",children:(0,o.jsx)("input",{disabled:m,type:"text",className:"form-control",autoComplete:"off",name:"limit",required:"required",onChange:v,placeholder:"Name of Bank"})})})]})}),(0,o.jsx)("div",{className:"col-md-6 mb-2",children:(0,o.jsxs)("div",{className:"form-group mb-3",children:[(0,o.jsx)("label",{className:"text-black font-w500",children:"Branch"}),(0,o.jsx)("div",{className:"contact-name",children:(0,o.jsx)("div",{className:"form-group mb-0",children:(0,o.jsx)("input",{disabled:m,type:"text",className:"form-control",autoComplete:"off",name:"limit",required:"required",onChange:v,placeholder:"Branch"})})})]})}),(0,o.jsx)("div",{className:"col-lg-12 mb-12",style:{textAlign:"left",marginTop:"30px"},children:c?(0,o.jsx)(n.RotateSpinner,{size:30,color:"rgba(41, 106, 176,1)",loading:c}):(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("button",{disabled:!0,style:{width:"auto"},className:"btn btn-success",onClick:e=>(e=>{e.preventDefault();var s=!1,t="";j.limit=j.limit.split(",").join(""),j.invoices=j.invoices.split(",").join(""),""===j.currency?(s=!0,t="Please choose credit limit currency"):""===j.invoices?(s=!0,t="Please add average of total value of invoices issued per month"):""===j.credit?(s=!0,t="Please add average credit period of invoices"):""===j.limit?(s=!0,t="Please add limit Requested (Minimum Ugshs 5,000,000 )"):j.limit<5e6?(s=!0,t="Limit requested is below the 5,000,000 minimum"):""===j.hasLoan?(s=!0,t="Please select if you have a loan"):""===j.hasLien&&(s=!0,t="Please indicate if there is a lien over your receivables or debenture over floating assets/debtors/receivables"),s?d()("Oops",t,"error"):(console.log(j),(0,i.Hc)(j).then((e=>{a(!1),d()("Good job!","Successfully saved data","success"),r(!1)})).catch((e=>{console.log(e),d()("Oops",e.message,"error")})))})(e),children:"Verify Info"})})})]})})]})}},9775:(e,s,a)=>{a.r(s),a.d(s,{FilteringTable:()=>S,default:()=>A});var t=a(72791),l=a(61146),i=a.n(l),n=a(66659),c=a(71358),d=a(92396),o=a(97311),r=(a(25161),a(62062)),m=a.n(r),h=a(34978),x=a(6639),u=a(42542),j=(a(86014),a(2499),a(13496)),b=a(5803),v=a(22389),p=a(82945),N=(a(59513),a(80184));(new Date).getFullYear();const g=[],f=(new Date).getFullYear();for(var w=2021;w<f;w++)g.push((0,N.jsx)("option",{value:w,children:w}));g.push((0,N.jsx)("option",{value:f,children:f}));!function(e,s){const a=[];for(var t=e;t<s;t++)a.push(t);a.push(s)}(2021,(new Date).getFullYear());const y=(0,b.ZP)((()=>(0,v.Z)(a.e(136).then(a.bind(a,78675)),1e3))),C=()=>(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)(p.Z,{className:"dropdown custom-dropdown mb-0",children:[(0,N.jsx)(p.Z.Toggle,{variant:"",as:"div",className:"btn sharp tp-btn dark-btn i-false",children:(0,N.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,N.jsx)("path",{d:"M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z",stroke:"#342E59","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),(0,N.jsx)("path",{d:"M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z",stroke:"#342E59","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),(0,N.jsx)("path",{d:"M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z",stroke:"#342E59","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})]})}),(0,N.jsxs)(p.Z.Menu,{className:"dropdown-menu dropdown-menu-right",children:[(0,N.jsx)(p.Z.Item,{children:"Details "}),(0,N.jsx)(p.Z.Item,{className:"text-danger",children:"Cancel "})]})]})}),k=e=>{var s,a,l,i,n;let{hideDetail:c,setRange:d,setAddFormDataTwo:o,getBuyersInfo:r}=e;const[m,x]=(0,t.useState)("Medan, IDN"),[u,b]=(0,t.useState)({}),[v,p]=(0,t.useState)({}),[g,f]=(0,t.useState)([]),w={chart:{height:250,type:"donut",toolbar:{show:!1}},dataLabels:{enabled:!0},stroke:{width:0},colors:["#096","#374C98"],labels:["Female","Male"],legend:{position:"bottom",show:!1},responsive:[{breakpoint:768,options:{chart:{height:200}}}]},[k,D]=(0,t.useState)({startDate:new Date,endDate:new Date,days:"",name:"days",year:(new Date).getFullYear(),month:-1});function S(){(0,h.E_)().then((e=>{p(e)})).catch((e=>{alert(JSON.stringify(e)),console.log(e)}))}return(0,t.useEffect)((()=>{S()}),[]),(0,N.jsxs)(N.Fragment,{children:[null,(0,N.jsxs)("div",{className:"row",children:[null,(0,N.jsx)("div",{className:"col-xl-12 col-xxl-12",children:(0,N.jsxs)("div",{className:"card",children:[(0,N.jsxs)("div",{className:"card-header border-0 pb-0",children:[(0,N.jsx)("h4",{className:"mb-0 fs-20 text-black",children:"Client Report"}),(0,N.jsx)(C,{})]}),(0,N.jsxs)("div",{className:"card-body",children:[(0,N.jsxs)("div",{className:"bg-gradient-1 coin-holding flex-wrap",children:[(0,N.jsx)("div",{className:"mb-2 coin-bx",children:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{}),(0,N.jsxs)("div",{className:"ms-3",children:[(0,N.jsx)("h4",{className:"coin-font font-w600 mb-0",children:"All Clients"}),(0,N.jsxs)("b",{className:"mb-0 op-6",style:{color:"#000"},children:["Total: ",v.total]})]})]})}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"Male Clients:"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.male})})]}),(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"Female Clients:"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.female})})]})]}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsx)("b",{className:"text-black",children:"Ratio Of Male to Female Clients (Chart)"}),void 0!==v.female?(0,N.jsx)(j.Z,{options:w,series:[v.female,v.male],type:"donut",height:200}):null]})]}),(0,N.jsxs)("div",{className:"bg-gradient-2 coin-holding mt-4 flex-wrap",children:[(0,N.jsx)("div",{className:"mb-2 coin-bx",children:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h4",{className:"coin-font font-w600 mb-0",children:"Categories"})})]})}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"Bussiness:"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.bussiness})})]}),(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"text-black",children:"Individuals:"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.individuals})})]})]}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsx)("b",{className:"text-black",children:"Ratio Of Bussiness to Individuals (Chart)"}),void 0!==v.bussiness?(0,N.jsx)(j.Z,{options:{chart:{height:250,type:"donut",toolbar:{show:!1}},dataLabels:{enabled:!0},stroke:{width:0},colors:["#FF782C","#FFAB2D"],labels:["Bussiness","Individuals"],legend:{position:"bottom",show:!1},responsive:[{breakpoint:768,options:{chart:{height:200}}}]},series:[v.bussiness,v.individuals],type:"donut",height:200}):null]})]}),(0,N.jsxs)("div",{className:"bg-gradient-2 coin-holding mt-4 flex-wrap",children:[(0,N.jsx)("div",{className:"mb-2 coin-bx",children:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{}),(0,N.jsxs)("div",{className:"ms-3",children:[(0,N.jsx)("h4",{className:"coin-font font-w600 mb-0",children:"Youth Clients"}),(0,N.jsxs)("b",{className:"mb-0 op-6",style:{color:"#000"},children:["Total: ",v.youth]})]})]})}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"Male Youth Clients:"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.maleYouth})})]}),(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"Female Youth Clients:"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.femaleYouth})})]})]}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsx)("b",{className:"text-black",children:"Ratio Of Male to Female Youth Clients"}),void 0!==v.femaleYouth?(0,N.jsx)(j.Z,{options:w,series:[v.femaleYouth,v.maleYouth],type:"donut",height:200}):null]})]}),(0,N.jsxs)("div",{className:"bg-gradient-2 coin-holding mt-4 flex-wrap",children:[(0,N.jsx)("div",{className:"mb-2 coin-bx",children:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h4",{className:"coin-font font-w600 mb-0",children:"Age Groups"})})]})}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"18 to 24 :"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.upto24})})]}),(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"25 to 30 :"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.upto30})})]}),(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"31 to 40"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.upto40})})]}),(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"41 to 50"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.upto50})})]}),(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{className:"coin-bx-one text-black",children:"Above 50"}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:v.above50})})]})]}),(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsx)("b",{className:"text-black",children:"Pie Chart Of Client Age Range Groups"}),void 0!==v.upto24?(0,N.jsx)(j.Z,{options:{chart:{height:250,type:"donut",toolbar:{show:!1}},dataLabels:{enabled:!0},stroke:{width:0},colors:["#374C98","#FFAB2D","#FF782C","#00ADA3","#096"],labels:["18 to 24","25 to 30","31 to 40","41 to 50","Above 50"],legend:{position:"bottom",show:!1},responsive:[{breakpoint:768,options:{chart:{height:200}}}]},series:[v.upto24,v.upto30,v.upto40,v.upto50,v.above50],type:"donut",height:200}):null]})]}),(0,N.jsxs)("div",{className:"bg-gradient-2 coin-holding mt-4 flex-wrap",children:[(0,N.jsx)("div",{className:"mb-2 coin-bx",children:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)("div",{}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h4",{className:"coin-font font-w600 mb-0",children:"Regions"})})]})}),(0,N.jsx)("div",{className:"mb-2",children:null===v||void 0===v||null===(s=v.regionStats)||void 0===s?void 0:s.map(((e,s)=>4!==s?(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsxs)("div",{className:"text-black",children:[e.name," :"]}),(0,N.jsx)("div",{className:"ms-3",children:(0,N.jsx)("h2",{className:"mb-0 text-primary coin-font-1",children:e.clientsAvailable})})]}):null))}),void 0!==v.regionStats?(0,N.jsxs)("div",{className:"mb-2",children:[(0,N.jsx)("b",{className:"text-black",children:"Pie Chart Of Client Groping By Regions"}),(0,N.jsx)(j.Z,{options:{chart:{height:250,type:"donut",toolbar:{show:!1}},dataLabels:{enabled:!0},stroke:{width:0},colors:["#374C98","#FFAB2D","#FF782C","#00ADA3"],labels:["Nothern Region","Eastern Region","Western Region","Central Region"],legend:{position:"bottom",show:!1},responsive:[{breakpoint:768,options:{chart:{height:200}}}]},series:[null===v||void 0===v||null===(a=v.regionStats[0])||void 0===a?void 0:a.clientsAvailable,null===v||void 0===v||null===(l=v.regionStats[1])||void 0===l?void 0:l.clientsAvailable,null===v||void 0===v||null===(i=v.regionStats[2])||void 0===i?void 0:i.clientsAvailable,null===v||void 0===v||null===(n=v.regionStats[3])||void 0===n?void 0:n.clientsAvailable],type:"donut",height:200})]}):null]})]})]})})]}),(0,N.jsx)("div",{className:"row",children:(0,N.jsxs)("div",{className:"col-xl-4",children:[(0,N.jsx)("div",{className:"row"}),(0,N.jsx)("div",{className:"row",children:u.length>0?(0,N.jsx)("div",{className:"col-xl-12 col-xxl-12 col-md-12",children:(0,N.jsxs)("div",{className:"card",children:[(0,N.jsxs)("div",{className:"card-header pb-0 border-0",children:[(0,N.jsx)("h4",{className:"mb-0 fs-20 text-black",children:"Current Graph"}),(0,N.jsx)(C,{})]}),(0,N.jsxs)("div",{className:"card-body py-2 text-center",children:[(0,N.jsx)("div",{id:"pieChart",className:"d-inline-block",children:(0,N.jsx)(y,{theData:u},u.approvedNumber)}),(0,N.jsx)("div",{className:"chart-items",children:(0,N.jsx)("div",{className:" col-xl-12 col-sm-12",children:(0,N.jsxs)("div",{className:"row text-black text-start fs-13 mt-4",children:[(0,N.jsxs)("span",{className:"mb-3 col-6",children:[(0,N.jsx)("svg",{className:"me-2",width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,N.jsx)("rect",{width:"19",height:"19",rx:"9.5",fill:"#096"})}),"Paid"]}),(0,N.jsxs)("span",{className:"mb-3 col-6",children:[(0,N.jsx)("svg",{className:"me-2",width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,N.jsx)("rect",{width:"19",height:"19",rx:"9.5",fill:"#F7A62C"})}),"Pending Payment"]})]})})})]})]})}):null})]})})]})};a(43241);var D=a(5970);const S=()=>{const[e,s]=(0,t.useState)([]),[a,l]=(0,t.useState)([]),[r,j]=(0,t.useState)("currentMonth"),[b,v]=(0,t.useState)(!1),[p,g]=(0,t.useState)("aboutMe"),[f,w]=(0,t.useState)({}),[y,C]=(0,t.useState)({buyers:[],docs:[],directors:[],creditlimit:{}}),[S,A]=(0,t.useState)(!1),[F,E]=(0,t.useState)(!1),[R,I]=(0,t.useState)({}),[P,B]=(0,t.useState)(""),[M,Z]=(0,t.useState)([]),[T,O]=(0,t.useState)(!1),Y=t.useRef(null),[L,q]=(0,t.useState)(!1);let[G,_]=(0,t.useState)({startDate:new Date,endDate:new Date,days:"",name:"days",year:(new Date).getFullYear(),month:-1});const[V,J]=(0,t.useState)({id:null,name:"",sector:"",osector:"",country:"Uganda",city:"",town:"",streetaddress:"",contactPersonOne:"",phoneOne:"",designationOne:"",contactEmailOne:"",contactPersonTwo:"",phoneTwo:"",designationTwo:"",contactEmailTwo:"",clientBuyerId:null,terms:"choose",code:"+256",code2:"+256"});function U(e,s){!function(e){Z([]),(0,h.C1)(e).then((e=>{Z(e),v(!1)})).catch((e=>{v(!1),console.log(e),m()("Oops",e.message,"error")}))}({process:s,processId:e.id}),E(!0),I({process:s,obj:e})}M.map((e=>{e.type="VERIFIED"===e.type?(0,N.jsxs)("div",{style:{color:"green"},children:[e.type," ",(0,N.jsx)("i",{className:"fa fa-check"})]}):"DECLINED"===e.type?(0,N.jsxs)("div",{style:{color:"red"},children:[e.type," ",(0,N.jsx)("i",{className:"fa fa-times"})]}):e.type,e.dateAdded=new Date(e.dateAdded).toDateString()})),e.map((e=>{e.add=e.city+" , "+e.country,e.actions=(0,N.jsx)("div",{className:"d-flex",children:"CLIENT_ADDED"===e.type?null:(0,N.jsx)(N.Fragment,{children:(0,N.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>function(e){w(e),K(!0)}(e),"data-dismiss":"modal",children:"DISBURSED"===e.progress?"Collect":"Details"})})})})),(0,t.useEffect)((()=>{}),[]);const z=t.useCallback((()=>{O(!1)}),[]),H=t.useCallback((()=>Y.current),[Y.current]);D.n.map((e=>(0,N.jsxs)("option",{value:e.dial_code,children:[" "," "+e.name+" ("+e.dial_code+" )"]}))),D.n.map((e=>(0,N.jsxs)("option",{value:e.name,children:[" "," "+e.name+" "]})));const[W,K]=(0,t.useState)(!1),Q=(0,t.useMemo)((()=>o.L),[]),X=(0,t.useMemo)((()=>d),[]),$=(0,c.useTable)({columns:Q,data:X,initialState:{pageIndex:0}},c.useFilters,c.useGlobalFilter,c.usePagination),[ee,se]=(0,t.useState)([]),{state:ae}=$,{globalFilter:te,pageIndex:le}=ae,ie=[];return a.map((e=>{ie.push((0,N.jsxs)("option",{disabled:e.amOwner,value:e.id,children:[e.name," ",e.amOwner?"(Already Added)":""]}))})),y.directors.map((e=>{e.status="VERIFIED"===e.status?(0,N.jsxs)("div",{style:{color:"green"},children:[e.status," ",(0,N.jsx)("i",{className:"fa fa-check"})]}):"REJECTED"===e.status?(0,N.jsxs)("div",{style:{color:"red"},children:[e.status," ",(0,N.jsx)("i",{className:"fa fa-times"})]}):e.status,e.actions=(0,N.jsx)("div",{className:"d-flex",children:(0,N.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>U(e,"directors"),"data-dismiss":"modal",children:"view details"})})})),y.buyers.map((e=>{e.status="VERIFIED"===e.status?(0,N.jsxs)("div",{style:{color:"green"},children:[e.status," ",(0,N.jsx)("i",{className:"fa fa-check"})]}):"REJECTED"===e.status?(0,N.jsxs)("div",{style:{color:"red"},children:[e.status," ",(0,N.jsx)("i",{className:"fa fa-times"})]}):e.status,e.actions=(0,N.jsx)("div",{className:"d-flex",children:(0,N.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>U(e,"buyers"),"data-dismiss":"modal",children:"view details"})})})),y.docs.map((e=>{e.status="VERIFIED"===e.status?(0,N.jsxs)("div",{style:{color:"green"},children:[e.status," ",(0,N.jsx)("i",{className:"fa fa-check"})]}):"REJECTED"===e.status?(0,N.jsxs)("div",{style:{color:"red"},children:[e.status," ",(0,N.jsx)("i",{className:"fa fa-times"})]}):e.status,e.view=(0,N.jsx)("div",{className:"d-flex",children:(0,N.jsx)("a",{target:"_blank",href:e.path,children:(0,N.jsx)("button",{type:"button",className:"btn btn-success shadow btn-xs ","data-dismiss":"modal",children:"view documnet"})})}),e.actions=(0,N.jsx)("div",{className:"d-flex",children:(0,N.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>U(e,"docs"),"data-dismiss":"modal",children:"view details"})})})),(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(n.Z,{activeMenu:"Clients",motherMenu:"Reports",buttonComponent:L?null:(0,N.jsx)("div",{children:T?(0,N.jsx)(i(),{onAfterPrint:z,simple:!0,round:!0,trigger:()=>(0,N.jsx)("p",{style:{textAlign:"center"},children:(0,N.jsx)("button",{to:"#",className:"btn btn-success shadow btn-xs ",children:"Print"})}),content:H}):(0,N.jsx)("div",{style:{textAlign:"center"},children:(0,N.jsx)(i(),{onAfterPrint:z,simple:!0,round:!0,trigger:()=>(0,N.jsx)("p",{style:{textAlign:"center"},children:(0,N.jsx)("button",{to:"#",className:"btn btn-primary shadow btn-xs ",children:" Export Portfolio"})}),content:H})})})}),L?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)("div",{className:"mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head",children:[(0,N.jsx)("h2",{className:"font-w600 mb-2 me-auto",children:"Collections Details"})," ",(0,N.jsx)("button",{to:"#",className:"btn btn-primary mb-2 rounded",onClick:()=>q(!1),children:"Show Summary"})]}),W?(0,N.jsx)(u.Z,{reloadMe:function(e){(0,h.E0)().then((a=>{a.map((s=>{var a;s.dateAdded=new Date(s.dateAdded).toDateString(),s.amount=null!==(a=s.amount)&&void 0!==a?a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):0,e===s.id&&w(s)})),s(a)})).catch((e=>{console.log(e),m()("Oops",e.message,"error")}))},setPostModal:K,obj:f},f.status):(0,N.jsxs)("div",{className:"card",children:[(0,N.jsx)("div",{className:"card-header",children:(0,N.jsx)("div",{className:"row",style:{width:"100%"},children:(0,N.jsx)("div",{className:"col-xl-5 ",children:(0,N.jsx)("h4",{className:"card-title",children:"Collections"})})})}),(0,N.jsxs)("div",{className:"card-body",children:[(0,N.jsx)("div",{className:"row",style:{width:"100%"}}),(0,N.jsx)(x.Z,{hideDataExport:!0,rows:e,columns:[{name:"dateAdded",title:"Date"},{name:"client",title:"Client"},{name:"buyername",title:"Buyer"},{name:"amount",title:"Amount"},{name:"currency",title:"Currency"},{name:"status",title:"Status"},{name:"progress",title:"Progress"},{name:"actions",title:"Actions"}],defaultExpandedGroups:[],grouping:[],defaultHiddenColumnNames:[],defaultPageSize:0,hideSelectionExport:!0,infiniteScrolling:!0,fileName:"Directors"})]})]})]}):(0,N.jsx)("div",{ref:Y,children:(0,N.jsx)(k,{setAddFormDataTwo:_,setRange:j,hideMenu:T,hideDetail:q},T)})]})},A=S},25161:(e,s,a)=>{a(72791),a(80184)}}]);
//# sourceMappingURL=287.dcbb070e.chunk.js.map