"use strict";(self.webpackChunkpesasa=self.webpackChunkpesasa||[]).push([[995],{46498:(e,s,a)=>{a.r(s),a.d(s,{FilteringTable:()=>x,default:()=>f});var t=a(72791),c=a(66659),l=a(71358),n=a(92396),i=a(97311),o=(a(25161),a(62062)),d=a.n(o),r=a(34978),u=(a(6639),a(51100),a(86014),a(75268),a(2499)),m=a(91951),p=(a(43241),a(5970)),h=a(80184);const x=()=>{const[e,s]=(0,t.useState)([]),[a,o]=(0,t.useState)([]),[x,f]=(0,t.useState)(!1),[j,b]=(0,t.useState)("aboutMe"),[v,N]=(0,t.useState)({}),[y,g]=(0,t.useState)({buyers:[],docs:[],directors:[],creditlimit:{}}),[w,S]=(0,t.useState)(!1),[D,C]=(0,t.useState)(!1),[E,k]=(0,t.useState)({}),[F,I]=(0,t.useState)(""),[R,U]=(0,t.useState)([]),[M,T]=(0,t.useState)(0),[H,O]=(0,t.useState)({id:null,name:"",sector:"",osector:"",country:"Uganda",city:"",town:"",streetaddress:"",contactPersonOne:"",phoneOne:"",designationOne:"",contactEmailOne:"",contactPersonTwo:"",phoneTwo:"",designationTwo:"",contactEmailTwo:"",clientBuyerId:null,terms:"choose",code:"+256",code2:"+256"});function A(e,s){!function(e){U([]),(0,r.C1)(e).then((e=>{U(e),f(!1)})).catch((e=>{f(!1),console.log(e),d()("Oops",e.message,"error")}))}({process:s,processId:e.id}),C(!0),k({process:s,obj:e})}function B(e){(0,r._7)(e).then((e=>{g(e)})).catch((e=>{console.log(e),d()("Oops",e.message,"error")}))}function _(){(0,r.Ac)().then((e=>{o(e);const a=[];e.map((e=>{e.onBoardDate=(0,m.default)(new Date(e.onBoardDate),"dd-MMM-yyyy"),a.push(e)})),s(a)})).catch((e=>{console.log(e),d()("Oops",e.message,"error")}))}R.map((e=>{e.type="VERIFIED"===e.type?(0,h.jsxs)("div",{style:{color:"green"},children:[e.type," ",(0,h.jsx)("i",{className:"fa fa-check"})]}):"DECLINED"===e.type?(0,h.jsxs)("div",{style:{color:"red"},children:[e.type," ",(0,h.jsx)("i",{className:"fa fa-times"})]}):e.type,e.dateAdded=new Date(e.dateAdded).toDateString()})),e.map((e=>{e.add=e.city+" , "+e.country,e.actions=(0,h.jsx)("div",{className:"d-flex",children:"CLIENT_ADDED"===e.type?null:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>function(e){B(e.id),N(e),L(!0),f(!0)}(e),"data-dismiss":"modal",children:"view"})})})})),(0,t.useEffect)((()=>{_()}),[]);p.n.map((e=>(0,h.jsxs)("option",{value:e.dial_code,children:[" "," "+e.name+" ("+e.dial_code+" )"]}))),p.n.map((e=>(0,h.jsxs)("option",{value:e.name,children:[" "," "+e.name+" "]})));const[J,L]=(0,t.useState)(!1),V=(0,t.useMemo)((()=>i.L),[]),P=(0,t.useMemo)((()=>n),[]),z=(0,l.useTable)({columns:V,data:P,initialState:{pageIndex:0}},l.useFilters,l.useGlobalFilter,l.usePagination),[G,W]=(0,t.useState)([]),{state:X}=z,{globalFilter:Y,pageIndex:Z}=X,q=[];return a.map((e=>{q.push((0,h.jsxs)("option",{disabled:e.amOwner,value:e.id,children:[e.name," ",e.amOwner?"(Already Added)":""]}))})),y.directors.map((e=>{e.status="VERIFIED"===e.status?(0,h.jsxs)("div",{style:{color:"green"},children:[e.status," ",(0,h.jsx)("i",{className:"fa fa-check"})]}):"REJECTED"===e.status?(0,h.jsxs)("div",{style:{color:"red"},children:[e.status," ",(0,h.jsx)("i",{className:"fa fa-times"})]}):e.status,e.actions=(0,h.jsx)("div",{className:"d-flex",children:(0,h.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>A(e,"directors"),"data-dismiss":"modal",children:"view details"})})})),y.buyers.map((e=>{e.status="VERIFIED"===e.status?(0,h.jsxs)("div",{style:{color:"green"},children:[e.status," ",(0,h.jsx)("i",{className:"fa fa-check"})]}):"REJECTED"===e.status?(0,h.jsxs)("div",{style:{color:"red"},children:[e.status," ",(0,h.jsx)("i",{className:"fa fa-times"})]}):e.status,e.actions=(0,h.jsx)("div",{className:"d-flex",children:(0,h.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>A(e,"buyers"),"data-dismiss":"modal",children:"view details"})})})),y.docs.map((e=>{e.status="VERIFIED"===e.status?(0,h.jsxs)("div",{style:{color:"green"},children:[e.status," ",(0,h.jsx)("i",{className:"fa fa-check"})]}):"REJECTED"===e.status?(0,h.jsxs)("div",{style:{color:"red"},children:[e.status," ",(0,h.jsx)("i",{className:"fa fa-times"})]}):e.status,e.view=(0,h.jsx)("div",{className:"d-flex",children:(0,h.jsx)("a",{target:"_blank",href:e.path,children:(0,h.jsx)("button",{type:"button",className:"btn btn-success shadow btn-xs ","data-dismiss":"modal",children:"view documnet"})})}),e.actions=(0,h.jsx)("div",{className:"d-flex",children:(0,h.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>A(e,"docs"),"data-dismiss":"modal",children:"view details"})})})),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.Z,{activeMenu:"Management",motherMenu:"Data Uploads"}),(0,h.jsxs)("div",{className:"card",children:[(0,h.jsx)("div",{className:"card-header",children:(0,h.jsx)("div",{className:"row",style:{width:"100%"},children:(0,h.jsx)("div",{className:"col-xl-3 ",children:(0,h.jsx)("h4",{className:"card-title",children:"Upload Data"})})})}),(0,h.jsxs)("div",{className:"card-body",children:[(0,h.jsx)("div",{className:"row",style:{width:"100%"},children:x?(0,h.jsx)(u.RotateSpinner,{size:30,color:"rgba(41, 106, 176,1)",loading:x}):null}),(0,h.jsxs)("div",{className:"row",style:{width:"100%"},children:[(0,h.jsx)("div",{className:"col-xl-4 ",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"},children:"Step 1 : "}),"Upload Client Bio-data Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;!function(e){f(!0);var s=new FormData,a=e.files[0];s.append("file",a),(0,r.Ju)(s).then((e=>{d()("Success","Successfully uploaded client data","success"),f(!1),_()})).catch((e=>{f(!1)}))}(s)}})})]})}),(0,h.jsx)("div",{className:"col-xl-4 ",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"},children:"Step 2 : "}),"Upload Client Bussiness Information Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;!function(e){f(!0);var s=new FormData,a=e.files[0];s.append("file",a),(0,r.wD)(s).then((e=>{d()("Success","Successfully uploaded bussiness data","success"),f(!1),_()})).catch((e=>{f(!1)}))}(s)}})})]})}),(0,h.jsx)("div",{className:"col-xl-4 ",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"},children:"Step 3 : "}),"Upload Buyers Information Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;!function(e){f(!0);var s=new FormData,a=e.files[0];s.append("file",a),(0,r.eL)(s).then((e=>{d()("Success","Successfully uploaded client data","success"),f(!1),_()})).catch((e=>{f(!1)}))}(s)}})})]})})]}),(0,h.jsxs)("div",{className:"row mt-4",style:{width:"100%"},children:[(0,h.jsx)("div",{className:"col-xl-4 ",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"},children:"Step 4 : "}),"Upload Client Invoice Discount Applications Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;f(!0);var a=new FormData,t=s.files[0];a.append("file",t),(0,r.gY)(a).then((e=>{d()("Success","Successfully uploaded client applications","success"),f(!1),_()})).catch((e=>{f(!1)}))}})})]})}),(0,h.jsx)("div",{className:"col-xl-4 ",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"},children:"Step 5 : "}),"Upload Client Disbursements Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;f(!0);var a=new FormData,t=s.files[0];a.append("file",t),(0,r.CX)(a).then((e=>{d()("Success","Successfully uploaded disbursements","success"),f(!1),_()})).catch((e=>{f(!1)}))}})})]})}),(0,h.jsx)("div",{className:"col-xl-4 ",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"},children:"Step 6 : "}),"Upload Client Collections Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;f(!0);var a=new FormData,t=s.files[0];a.append("file",t),(0,r.TR)(a).then((e=>{d()("Success","Successfully uploaded collections","success"),f(!1),_()})).catch((e=>{f(!1)}))}})})]})}),(0,h.jsx)("div",{className:"col-xl-3 mt-4 pt-4",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"}}),"Upload Nothern Region Districts Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;f(!0);var a=new FormData,t=s.files[0];a.append("file",t),(0,r.RE)(a).then((e=>{d()("Success","Successfully uploaded districts","success"),f(!1),_()})).catch((e=>{f(!1)}))}})})]})}),(0,h.jsx)("div",{className:"col-xl-3 mt-4 pt-4",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"}}),"Upload Eastern Region Districts Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;f(!0);var a=new FormData,t=s.files[0];a.append("file",t),(0,r.eM)(a).then((e=>{d()("Success","Successfully uploaded districts","success"),f(!1),_()})).catch((e=>{f(!1)}))}})})]})}),(0,h.jsx)("div",{className:"col-xl-3 mt-4 pt-4",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"}}),"Upload Western Region Districts Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;f(!0);var a=new FormData,t=s.files[0];a.append("file",t),(0,r.wM)(a).then((e=>{d()("Success","Successfully uploaded districts","success"),f(!1),_()})).catch((e=>{f(!1)}))}})})]})}),(0,h.jsx)("div",{className:"col-xl-3 mt-4 pt-4",children:(0,h.jsxs)("div",{className:"form-group ",children:[(0,h.jsxs)("label",{className:"text-black font-w500",children:[(0,h.jsx)("b",{style:{color:"#096"}}),"Upload Central Region Districts Here"]}),(0,h.jsx)("div",{className:"form-group ",children:(0,h.jsx)("input",{accept:".csv",className:"mb-4",id:"contained-button-file",type:"file",onChange:function(e){let{target:s}=e;f(!0);var a=new FormData,t=s.files[0];a.append("file",t),(0,r.pl)(a).then((e=>{d()("Success","Successfully uploaded districts","success"),f(!1),_()})).catch((e=>{f(!1)}))}})})]})}),(0,h.jsx)("div",{className:"col-xl-4 mt-4 pt-4",children:x?(0,h.jsx)(u.RotateSpinner,{size:30,color:"rgba(41, 106, 176,1)",loading:x}):(0,h.jsx)("button",{type:"button",className:"btn btn-primary shadow btn-xs ",onClick:()=>(f(!0),void(0,r.jv)().then((e=>{d()("Success","Successfully updated client buyers","success"),f(!1)})).catch((e=>{f(!1)}))),"data-dismiss":"modal",children:"Update Client Buyers"})})]})]})]})]})},f=x}}]);
//# sourceMappingURL=995.f3cbd73d.chunk.js.map