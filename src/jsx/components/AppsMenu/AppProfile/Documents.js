import React, { useState, useEffect } from "react";
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond } from 'react-filepond';
import {
  addFile, getUserFiles, getProcessComments,
  getClientBussiness,
  uploadFiles
} from "../../../../util/APIUtils.js";
import { RotateSpinner } from "react-spinners-kit";
/// Image
import Icon from "@mui/material/Icon";
import {
  Table,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableExport from "./TableExport.jsx";
const PostDetails = () => {
  const [sendMessage, setSendMessage] = useState(false);
  const [theId, setId] = useState(null);
  const [docs, setDocs] = useState([]);
  const [isLoad, seLoad] = useState(false);
  const [isLoad2, seLoad2] = useState(false);
  const [incompId, setIncomp] = useState(0);
  const [incompObj, setIncompObje] = useState({});

  const [directorsId, setdirectorsId] = useState(0);
  const [directorsObj, setdirectorsObj] = useState({});


  const [regId, setregId] = useState(0);
  const [regObj, setregObj] = useState({});


  const [articlesId, setarticlesId] = useState(0);
  const [articlesObj, setarticlesObj] = useState({});

  const [postModal2, setPostModal2] = useState(false);
  const [comments, setComments] = useState([]);
  const [bussType, setBussType] = useState(0);

  const [invoicesId, setinvoicesId] = useState(0);
  const [invoicesbj, setinvoicesbj] = useState({});
  const [partnerobj, setpartnerobj] = useState({});
  const [byeLawobj, setbyeLawobj] = useState({});
  const [businessInfo, setBusinessInfo] = useState('')

  comments.map((data) => {
    data.type = data.type === "VERIFIED" ? <div style={{ color: "green" }}>{data.type} <i className="fa fa-check"></i></div> : (data.type === "DECLINED" ? <div style={{ color: "red" }}>{data.type} <i className="fa fa-times"></i></div> : data.type)
    data.dateAdded = new Date(data.dateAdded).toDateString()
  })

  function handleEdit(type) {
    if (type === "INCORPORATION") {
      setId(incompObj.id)
      setIncompObje({})

    }

    else if (type === "DIRECTORS") {
      setId(directorsObj.id)
      setdirectorsObj({})

    }


    else if (type === "REG_ADDRESS") {
      setId(regObj.id)
      setregObj({})

    }

    else if (type === "ARTICLES") {
      setId(articlesObj.id)
      setarticlesObj({})

    }


    else if (type === "PAID_INVOICES") {
      setId(invoicesbj.id)
      setinvoicesbj({})

    }


    else if (type === "PARTNERSHIP_DEED") {
      setId(partnerobj.id)
      setpartnerobj({})

    }


    else if (type === "BYE_LAWS_OR_CONSTITUTION") {
      setId(byeLawobj.id)
      setbyeLawobj({})

    }









  }

  function getComments(data) {
    setComments([])
    getProcessComments(data)
      .then((response) => {
        setComments(response)
        //	setPostModal(false);
        //	swal('Good job!', 'Successfully Added', "success");

      })
      .catch((error) => {
        console.log(error);
        swal('Oops', error.message, "error");
      });
  }

  function openDetails2(data, process) {
    //	setPostModal(false)
    const getme = {
      process: process,
      processId: data.id
    }
    getComments(getme)
    setPostModal2(true)
  }


  useEffect(() => {
    getClientBussiness()
      .then((response) => {
        setBusinessInfo(response.type);
        const isIn = response.type === "Individual" ? 1 : (response.type === "Sole Proprietor" ? 2 : (response.type === "Limited Liability Company" ? 3 : (response.type === "Partnership" ? 4 : (response.type === "Group / Cooperatives" ? 5 : 6))))
        setBussType(isIn)

        //	setPostModal(false);
        //	swal('Good job!', 'Successfully Added', "success");

      })
      .catch((error) => {
        console.log(error);
        //swal('Oops', error.message, "error");
      });


    getDocs()

  }, []);

  function getDocs() {
    seLoad(true)
    getUserFiles()
      .then((response) => {
        setDocs(response)
        //setIncompObje
        response.map((option, key) => {

          if (option.type === "INCORPORATION") {
            setIncompObje(option)
          }


          else if (option.type === "DIRECTORS") {

            setdirectorsObj(option)
          }


          else if (option.type === "REG_ADDRESS") {

            setregObj(option)
          }


          else if (option.type === "ARTICLES") {

            setarticlesObj(option)
          }


          else if (option.type === "PAID_INVOICES") {

            setinvoicesbj(option)
          }

          else if (option.type === "PARTNERSHIP_DEED") {

            setpartnerobj(option)
          }


          else if (option.type === "BYE_LAWS_OR_CONSTITUTION") {

            setbyeLawobj(option)
          }



        })
        //	setPostModal(false);
        //	swal('Good job!', 'Successfully Added', "success");

        seLoad(false)

      })
      .catch((error) => {
        seLoad(false)
        console.log(error);
        //swal('Oops', error.message, "error");
      });
  }


  const handleAddFormSubmit = (type, fileId) => {
    // event.preventDefault();

    const newContact = {
      id: theId,
      fileId: fileId,
      type: type
    };
    // const newContacts = [...contacts, newContact];
    //setContacts(newContacts);

    console.log(newContact)
    //	alert(JSON.stringify(addFormData))
    seLoad2(true)
    addFile(newContact)
      .then((response) => {
        seLoad2(false);
        setId(null);
        setIncomp(0);
        setdirectorsId(0)
        setarticlesId(0)
        setinvoicesId(0)
        setregId(0)
        swal('Good job!', 'Successfully Added', "success");
        getDocs()

      })
      .catch((error) => {
        seLoad2(false);
        console.log(error);
        swal('Oops', error.message, "error");
      });

    //  addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = '';         


  };



  return (
    <div>

      {isLoad2 ?
        <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && incompId !== 0} /> : null}
      <Dialog
        disableEnforceFocus
        //className="modal fade"
        //  className="fade bd-example-modal-lg"
        // fullscreen={true} 
        //dialogClassName="modal-90w"
        /// size="lg"
        fullWidth={true}
        maxWidth={"lg"}
        open={postModal2}
        onClose={setPostModal2}
      >

        <DialogTitle>
          <h4 >Approval Detail</h4>



          {/* <button type="button" className="btn-close" onClick={()=> setPostModal2(false)} data-dismiss="modal"></button> */}
        </DialogTitle>
        <DialogContent

        >
          <TableExport

            hideDataExport={true}
            rows={comments}
            //rows={this.state.colors[1]==="primary"?finished: dataTemp}
            columns={[
              { name: 'dateAdded', title: 'Date' },
              { name: 'user', title: 'User' },
              { name: 'type', title: 'Action' },

              { name: 'comment', title: 'Comment' },
              // { name: 'actions', title: 'Actions' },
            ]}
            //  exportColumns={this.state.columns2}
            defaultExpandedGroups={[]}
            grouping={[]}
            defaultHiddenColumnNames={[]}
            defaultPageSize={0}
            hideSelectionExport
            infiniteScrolling
            fileName={"Directors"}


          />

        </DialogContent>

        <DialogActions style={{ width: "100%", overflow: "hidden" }}>

          <button type="button"
            className="btn shadow btn-xs btn-primary"

            onClick={() => setPostModal2(false)}
            data-dismiss="modal">
            Close
          </button>

        </DialogActions>
      </Dialog>
      <div>
        {/* <PageTitle
          activeMenu="Post Details"
          motherMenu="Advanced"
          pageContent="Post Details"
        /> */}
        {/* row */}

        <div className="row">
          <div className="col-xl-12">
            <div className="card" style={{ padding: "30px" }}>
              <div className="row">
                <div className="col">
                  <h4>Business Documents</h4>
                  <p>Add {businessInfo}  documents</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="row">

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h5 className="text-primary">
                      {incompObj.type === undefined ? <b style={{ color: "red" }}>*</b> :
                        <Icon fontSize="medium"
                          style={{
                            color: "green",
                            marginRight: "5px",
                            marginTop: "0px",
                          }}

                        >done</Icon>}
                      {" "}Certificate of Incorporation / Registration</h5>
                  </div>
                  <b style={{ marginLeft: "15px" }}>Please save after adding the document</b>
                  <div className="card-body pt-3"	>
                    {incompObj.type === undefined ?
                      <FilePond
                        acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
                    allowMultiple={false}
                    maxFileSize={'2MB'}
//</GridItem>server=
                   labelIdle="Drag & Drop Certificate of Incorporation Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
                server={
                  {
                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

                      // fieldName is the name of the input field
                      // file is the actual file object to send
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("name", fieldName);
                      formData.append("type", 6);
                      uploadFiles(formData)
                        .then((response) => {

                          setIncomp(response.id)
                          load(response.id);
                        })
                        .catch((error) => {
                          alert(error);
                          alert(JSON.stringify(error))
                        });





                      //     formData.append(fieldName, file, file.name);

                      //     const request = new XMLHttpRequest();

                      //     // Should call the progress method to update the progress to 100% before calling load
                      //     // Setting computable to false switches the loading indicator to infinite mode
                      //     request.upload.onprogress = (e) => {
                      //         progress(e.lengthComputable, e.loaded, e.total);
                      //     };
                      // let theid =0;
                      //     // Should call the load method when done and pass the returned server file id
                      //     // this server file id is then used later on when reverting or restoring a file
                      //     // so your server knows which file to return without exposing that info to the client
                      //     request.onload = function() {
                      //         if (request.status >= 200 && request.status < 300) {
                      //             // the load method accepts either a string (id) or an object
                      //        //  alert((request.responseText))
                      //          // console.log(request.responseText)
                      //        //   alert(request.responseText)
                      //             const returnObjc=JSON.parse(request.responseText)
                      //            // load('https://www.opportunitybank.co.ug/backend/apiImages/uploads'+returnObjc.data);
                      //             //alert(returnObjc.data)
                      //            theid=returnObjc.id
                      //            setIncomp(returnObjc.id)

                      //         }
                      //         else {
                      //             // Can call the error method if something is wrong, should exit after
                      //             error('oh no');
                      //         }
                      //     }.bind(this);



                      //     request.send(formData);

                      // Should expose an abort method so the request can be cancelled
                      return {
                        abort: () => {
                          // This function is entered if the user has tapped the cancel button
                          // request.abort();

                          // Let FilePond know the request has been cancelled
                          abort();
                        }
                      };
                    },
                    revert: (uniqueFileId, load, error) => {
                      //  removeFile(this.state.fid)
                      setIncomp(0)

                      load()
                    }
                  }
                }></FilePond>:
              <>
                <p className="mb-0">Document Added</p>
                <div style={{ marginTop: "10px" }}>

                  <Button
                    onClick={() =>
                      handleEdit("INCORPORATION")
                    }

                    variant="primary btn-xxs">Replace Document</Button>
                  <a style={{ marginLeft: "10px" }}
                    target="_blank"
                    href={incompObj.path} >
                    <Button


                      variant="success btn-xxs">View Document</Button>
                  </a>


                </div>
              </>}
              {/* <div className="profile-blog ">
									<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100" />
									<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
									<p className="mb-0">
										A small river named Duden flows by their place and supplies
										it with the necessary regelialia. It is a paradisematic
										country, in which roasted parts of sentences fly into your
										mouth.
									</p>
								</div> */}
              <div style={{ marginTop: "10px", textAlign: "right" }}>
                {isLoad ?
                  <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && incompId !== 0} /> :
                  <>
                    {incompId === 0 ? null :
                      <Button
                        onClick={() =>
                          handleAddFormSubmit("INCORPORATION", incompId)
                        }

                        variant="primary btn-xxs">Save Document</Button>}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        {bussType === 3 ?
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header border-0 pb-0">
                <h5 className="text-primary">
                  {directorsObj.type === undefined ? <b style={{ color: "red" }}>*</b> :
                    <Icon fontSize="medium"
                      style={{
                        color: "green",
                        marginRight: "5px",
                        marginTop: "0px",
                      }}

                    >done</Icon>}
                  {" "}List of directors - Company form 7/20</h5>
              </div>
              <b style={{ marginLeft: "15px" }}>Please save after adding the document</b>
              <div className="card-body pt-3"	>
                {directorsObj.type === undefined ?
                  <FilePond
                    acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
                allowMultiple={false}
                maxFileSize={'2MB'}
//</GridItem>
              labelIdle="Drag &amp; Drop  List of directors - Company form 7/20 Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
            server={
              {
                process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

                  // fieldName is the name of the input field
                  // file is the actual file object to send
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("name", fieldName);
                  formData.append("type", 6);
                  uploadFiles(formData)
                    .then((response) => {



                      setdirectorsId(response.id)

                      load(response.id);
                    })
                    .catch((error) => {
                      alert(error);
                      alert(JSON.stringify(error))
                    });

                  //     const formData = new FormData();
                  //     formData.append(fieldName, file, file.name);

                  //     const request = new XMLHttpRequest();

                  //     // Should call the progress method to update the progress to 100% before calling load
                  //     // Setting computable to false switches the loading indicator to infinite mode
                  //     request.upload.onprogress = (e) => {
                  //         progress(e.lengthComputable, e.loaded, e.total);
                  //     };
                  // let theid =0;
                  //     // Should call the load method when done and pass the returned server file id
                  //     // this server file id is then used later on when reverting or restoring a file
                  //     // so your server knows which file to return without exposing that info to the client
                  //     request.onload = function() {
                  //         if (request.status >= 200 && request.status < 300) {
                  //             // the load method accepts either a string (id) or an object
                  //           // alert(JSON.stringify(request.responseText))
                  //          // console.log(request.responseText)
                  //        //   alert(request.responseText)
                  //             const returnObjc=JSON.parse(request.responseText)
                  //            // load('https://www.opportunitybank.co.ug/backend/apiImages/uploads'+returnObjc.data);
                  //             //alert(returnObjc.data)
                  //            theid=returnObjc.id
                  //            setdirectorsId(returnObjc.id)

                  //         }
                  //         else {
                  //             // Can call the error method if something is wrong, should exit after
                  //             error('oh no');
                  //         }
                  //     }.bind(this);



                  //     request.send(formData);

                  // Should expose an abort method so the request can be cancelled
                  return {
                    abort: () => {
                      // This function is entered if the user has tapped the cancel button
                      // request.abort();

                      // Let FilePond know the request has been cancelled
                      abort();
                    }
                  };
                },
                revert: (uniqueFileId, load, error) => {
                  //  removeFile(this.state.fid)
                  setdirectorsId(0)

                  load()
                }
              }
            }></FilePond> :
          <>
            <p className="mb-0">Document Added</p>
            <div style={{ marginTop: "10px" }}>

              <Button
                onClick={() =>
                  handleEdit("DIRECTORS")
                }

                variant="primary btn-xxs">Replace Document</Button>
              <a style={{ marginLeft: "10px" }}
                target="_blank"
                href={directorsObj.path} >
                <Button


                  variant="success btn-xxs">View Document</Button>
              </a>


            </div>
          </>}
        {/* <div className="profile-blog ">
									<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100" />
									<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
									<p className="mb-0">
										A small river named Duden flows by their place and supplies
										it with the necessary regelialia. It is a paradisematic
										country, in which roasted parts of sentences fly into your
										mouth.
									</p>
								</div> */}
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          {isLoad ?
            <> <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && directorsId !== 0} />
            </>
            :
            <>
              {directorsId === 0 ? null :
                <Button
                  onClick={() =>
                    handleAddFormSubmit("DIRECTORS", directorsId)
                  }

                  variant="primary btn-xxs">Save Document</Button>}
            </>
          }
        </div>
      </div>
    </div>
					</div >	
: null}





{
  bussType === 3 ?
  <div className="col-lg-4">
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="text-primary">
          {regObj.type === undefined ? <b style={{ color: "red" }}>*</b> :
            <Icon fontSize="medium"
              style={{
                color: "green",
                marginRight: "5px",
                marginTop: "0px",
              }}

            >done</Icon>}
          {" "}Registration of address - Company form 9/18</h5>
      </div>
      <b style={{ marginLeft: "15px" }}>Please save after adding the document</b>
      <div className="card-body pt-3"	>
        {regObj.type === undefined ?
          <FilePond
            acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
        allowMultiple={false}
        maxFileSize={'2MB'}
//</GridItem>server=
      labelIdle="Drag &amp; Drop  Registration of address - Company form 9/18 Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
    server={
      {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

          // fieldName is the name of the input field
          // file is the actual file object to send

          const formData = new FormData();
          formData.append("file", file);
          formData.append("name", fieldName);
          formData.append("type", 6);
          uploadFiles(formData)
            .then((response) => {


              setregId(response.id)
              load(response.id);
            })
            .catch((error) => {
              alert(error);
              alert(JSON.stringify(error))
            });

          //     const formData = new FormData();
          //     formData.append(fieldName, file, file.name);

          //     const request = new XMLHttpRequest();
          //    // request.open('POST', '
          //    request.open('POST', '
          //     // Should call the progress method to update the progress to 100% before calling load
          //     // Setting computable to false switches the loading indicator to infinite mode
          //     request.upload.onprogress = (e) => {
          //         progress(e.lengthComputable, e.loaded, e.total);
          //     };
          // let theid =0;
          //     // Should call the load method when done and pass the returned server file id
          //     // this server file id is then used later on when reverting or restoring a file
          //     // so your server knows which file to return without exposing that info to the client
          //     request.onload = function() {
          //         if (request.status >= 200 && request.status < 300) {
          //             // the load method accepts either a string (id) or an object
          //           // alert(JSON.stringify(request.responseText))
          //          // console.log(request.responseText)
          //        //   alert(request.responseText)
          //             const returnObjc=JSON.parse(request.responseText)
          //            // load('https://www.opportunitybank.co.ug/backend/apiImages/uploads'+returnObjc.data);
          //             //alert(returnObjc.data)
          //            theid=returnObjc.id
          //            setregId(returnObjc.id)

          //         }
          //         else {
          //             // Can call the error method if something is wrong, should exit after
          //             error('oh no');
          //         }
          //     }.bind(this);



          //     request.send(formData);

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              // request.abort();

              // Let FilePond know the request has been cancelled
              abort();
            }
          };
        },
        revert: (uniqueFileId, load, error) => {
          //  removeFile(this.state.fid)
          setregId(0)

          load()
        }
      }
    }></FilePond> :
  <>
    <p className="mb-0">Document Added</p>
    <div style={{ marginTop: "10px" }}>

      <Button
        onClick={() =>
          handleEdit("REG_ADDRESS")
        }

        variant="primary btn-xxs">Replace Document</Button>
      <a style={{ marginLeft: "10px" }}
        target="_blank"
        href={regObj.path} >
        <Button


          variant="success btn-xxs">View Document</Button>
      </a>


    </div>
  </>
}
{/* <div className="profile-blog ">
									<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100" />
									<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
									<p className="mb-0">
										A small river named Duden flows by their place and supplies
										it with the necessary regelialia. It is a paradisematic
										country, in which roasted parts of sentences fly into your
										mouth.
									</p>
								</div> */}
<div style={{ marginTop: "10px", textAlign: "right" }}>
  {isLoad ?
    <> <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && regId !== 0} />
    </>
    :
    <>
      {regId === 0 ? null :
        <Button
          onClick={() =>
            handleAddFormSubmit("REG_ADDRESS", regId)
          }

          variant="primary btn-xxs">Save Document</Button>}
    </>
  }
</div>	
							</div >	
						</div >
					</div >	: null}







{
  bussType === 3 ?
  <div className="col-lg-4">
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="text-primary">
          {articlesObj.type === undefined ? <b style={{ color: "red" }}>*</b> :
            <Icon fontSize="medium"
              style={{
                color: "green",
                marginRight: "5px",
                marginTop: "0px",
              }}

            >done</Icon>}
          {" "}Memorandum and articles of association</h5>
      </div>
      <b style={{ marginLeft: "15px" }}>Please save after adding the document</b>
      <div className="card-body pt-3"	>
        {articlesObj.type === undefined ?
          <FilePond
            acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
        allowMultiple={false}
        maxFileSize={'2MB'}
//</GridItem>server=
      labelIdle="Drag &amp; Drop  Memorandum and articles of association Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
    server={
      {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

          // fieldName is the name of the input field
          // file is the actual file object to send

          const formData = new FormData();
          formData.append("file", file);
          formData.append("name", fieldName);
          formData.append("type", 6);
          uploadFiles(formData)
            .then((response) => {



              setarticlesId(response.id)
              load(response.id);
            })
            .catch((error) => {
              alert(error);
              alert(JSON.stringify(error))
            });

          //     const formData = new FormData();
          //     formData.append(fieldName, file, file.name);

          //     const request = new XMLHttpRequest();

          //     // Should call the progress method to update the progress to 100% before calling load
          //     // Setting computable to false switches the loading indicator to infinite mode
          //     request.upload.onprogress = (e) => {
          //         progress(e.lengthComputable, e.loaded, e.total);
          //     };
          // let theid =0;
          //     // Should call the load method when done and pass the returned server file id
          //     // this server file id is then used later on when reverting or restoring a file
          //     // so your server knows which file to return without exposing that info to the client
          //     request.onload = function() {
          //         if (request.status >= 200 && request.status < 300) {
          //             // the load method accepts either a string (id) or an object
          //           // alert(JSON.stringify(request.responseText))
          //          // console.log(request.responseText)
          //        //   alert(request.responseText)
          //             const returnObjc=JSON.parse(request.responseText)
          //            // load('https://www.opportunitybank.co.ug/backend/apiImages/uploads'+returnObjc.data);
          //             //alert(returnObjc.data)
          //            theid=returnObjc.id
          //            setarticlesId(returnObjc.id)

          //         }
          //         else {
          //             // Can call the error method if something is wrong, should exit after
          //             error('oh no');
          //         }
          //     }.bind(this);



          //     request.send(formData);

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              //  request.abort();

              // Let FilePond know the request has been cancelled
              abort();
            }
          };
        },
        revert: (uniqueFileId, load, error) => {
          //  removeFile(this.state.fid)
          setarticlesId(0)

          load()
        }
      }
    }></FilePond> :
  <>
    <p className="mb-0">Document Added</p>
    <div style={{ marginTop: "10px" }}>

      <Button
        onClick={() =>
          handleEdit("ARTICLES")
        }

        variant="primary btn-xxs">Replace Document</Button>
      <a style={{ marginLeft: "10px" }}
        target="_blank"
        href={articlesObj.path} >
        <Button


          variant="success btn-xxs">View Document</Button>
      </a>


    </div>
  </>
}
{/* <div className="profile-blog ">
									<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100" />
									<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
									<p className="mb-0">
										A small river named Duden flows by their place and supplies
										it with the necessary regelialia. It is a paradisematic
										country, in which roasted parts of sentences fly into your
										mouth.
									</p>
								</div> */}
<div style={{ marginTop: "10px", textAlign: "right" }}>
  {isLoad ?
    <> <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && articlesId !== 0} />
    </>
    :
    <>
      {articlesId === 0 ? null :
        <Button
          onClick={() =>
            handleAddFormSubmit("ARTICLES", articlesId)
          }

          variant="primary btn-xxs">Save Document</Button>}
    </>
  }
</div>	
							</div >	
						</div >
					</div >	

: null}





{
  bussType === 4 ?
  <div className="col-lg-4">
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="text-primary">
          {partnerobj.type === undefined ? <b style={{ color: "red" }}>*</b> :
            <Icon fontSize="medium"
              style={{
                color: "green",
                marginRight: "5px",
                marginTop: "0px",
              }}

            >done</Icon>}
          {" "}Partnership Deed</h5>
      </div>
      <b style={{ marginLeft: "15px" }}>Please save after adding the document</b>
      <div className="card-body pt-3"	>
        {partnerobj.type === undefined ?
          <FilePond
            acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
        allowMultiple={false}
        maxFileSize={'2MB'}
//</GridItem>server=
      labelIdle="Drag &amp; Drop Partnership Deed Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
    server={
      {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

          // fieldName is the name of the input field
          // file is the actual file object to send

          const formData = new FormData();
          formData.append("file", file);
          formData.append("name", fieldName);
          formData.append("type", 6);
          uploadFiles(formData)
            .then((response) => {



              setarticlesId(response.id)
              load(response.id);
            })
            .catch((error) => {
              alert(error);
              alert(JSON.stringify(error))
            });


          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              //  request.abort();

              // Let FilePond know the request has been cancelled
              abort();
            }
          };
        },
        revert: (uniqueFileId, load, error) => {
          //  removeFile(this.state.fid)
          setarticlesId(0)

          load()
        }
      }
    }></FilePond> :
  <>
    <p className="mb-0">Document Added</p>
    <div style={{ marginTop: "10px" }}>

      <Button
        onClick={() =>
          handleEdit("PARTNERSHIP_DEED")
        }

        variant="primary btn-xxs">Replace Document</Button>
      <a style={{ marginLeft: "10px" }}
        target="_blank"
        href={partnerobj.path} >
        <Button


          variant="success btn-xxs">View Document</Button>
      </a>


    </div>
  </>
}
{/* <div className="profile-blog ">
									<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100" />
									<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
									<p className="mb-0">
										A small river named Duden flows by their place and supplies
										it with the necessary regelialia. It is a paradisematic
										country, in which roasted parts of sentences fly into your
										mouth.
									</p>
								</div> */}
<div style={{ marginTop: "10px", textAlign: "right" }}>
  {isLoad ?
    <> <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && articlesId !== 0} />
    </>
    :
    <>
      {articlesId === 0 ? null :
        <Button
          onClick={() =>
            handleAddFormSubmit("PARTNERSHIP_DEED", articlesId)
          }

          variant="primary btn-xxs">Save Document</Button>}
    </>
  }
</div>	
							</div >	
						</div >
					</div >	

: null}




{
  bussType === 5 ?
  <div className="col-lg-4">
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="text-primary">
          {byeLawobj.type === undefined ? <b style={{ color: "red" }}>*</b> :
            <Icon fontSize="medium"
              style={{
                color: "green",
                marginRight: "5px",
                marginTop: "0px",
              }}

            >done</Icon>}
          {" "}Bye Laws or Constitution</h5>
      </div>
      <b style={{ marginLeft: "15px" }}>Please save after adding the document</b>
      <div className="card-body pt-3"	>
        {byeLawobj.type === undefined ?
          <FilePond
            acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
        allowMultiple={false}
        maxFileSize={'2MB'}
//</GridItem>server=
      labelIdle="Drag &amp; Drop Bye Laws or Constitution Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
    server={
      {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

          // fieldName is the name of the input field
          // file is the actual file object to send

          const formData = new FormData();
          formData.append("file", file);
          formData.append("name", fieldName);
          formData.append("type", 6);
          uploadFiles(formData)
            .then((response) => {



              setarticlesId(response.id)
              load(response.id);
            })
            .catch((error) => {
              alert(error);
              alert(JSON.stringify(error))
            });


          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              //  request.abort();

              // Let FilePond know the request has been cancelled
              abort();
            }
          };
        },
        revert: (uniqueFileId, load, error) => {
          //  removeFile(this.state.fid)
          setarticlesId(0)

          load()
        }
      }
    }></FilePond> :
  <>
    <p className="mb-0">Document Added</p>
    <div style={{ marginTop: "10px" }}>

      <Button
        onClick={() =>
          handleEdit("BYE_LAWS_OR_CONSTITUTION")
        }

        variant="primary btn-xxs">Replace Document</Button>
      <a style={{ marginLeft: "10px" }}
        target="_blank"
        href={partnerobj.path} >
        <Button


          variant="success btn-xxs">View Document</Button>
      </a>


    </div>
  </>
}
{/* <div className="profile-blog ">
									<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100" />
									<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
									<p className="mb-0">
										A small river named Duden flows by their place and supplies
										it with the necessary regelialia. It is a paradisematic
										country, in which roasted parts of sentences fly into your
										mouth.
									</p>
								</div> */}
<div style={{ marginTop: "10px", textAlign: "right" }}>
  {isLoad ?
    <> <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && articlesId !== 0} />
    </>
    :
    <>
      {articlesId === 0 ? null :
        <Button
          onClick={() =>
            handleAddFormSubmit("BYE_LAWS_OR_CONSTITUTION", articlesId)
          }

          variant="primary btn-xxs">Save Document</Button>}
    </>
  }
</div>	
							</div >	
						</div >
					</div >	

: null}




<div className="col-lg-4">
  <div className="card">
    <div className="card-header border-0 pb-0">
      <h5 className="text-primary">
        {invoicesbj.type === undefined ? <b style={{ color: "red" }}>*</b> :
          <Icon fontSize="medium"
            style={{
              color: "green",
              marginRight: "5px",
              marginTop: "0px",
            }}

          >done</Icon>}
        {" "}3 copies of recently paid invoices (in one pdf file)</h5>
    </div>
    <b style={{ marginLeft: "15px" }}>Please save after adding the document</b>
    <div className="card-body pt-3"	>
      {invoicesbj.type === undefined ?
        <FilePond
          acceptedFileTypes={['application/pdf' , '.pdf']}
// 'application/doc': '.doc',
// 'application/pdf' : '.pdf',
// 'application/rtf',
// 'application/txt',
// 'application/odf',
// '.docx'

// success={this.state.dynamicFileUploadState === "success"}
// error={this.state.dynamicFileUploadState === "error"}
      allowMultiple={false}
      maxFileSize={'2MB'}
      labelIdle="Drag &amp; Drop  3 copies of recently paid invoices Here or <span class=&quot;filepond--label-action&quot;>Browse</span>."
    server={
      {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

          // fieldName is the name of the input field
          // file is the actual file object to send

          const formData = new FormData();
          formData.append("file", file);
          formData.append("name", fieldName);
          formData.append("type", 6);
          uploadFiles(formData)
            .then((response) => {

              setinvoicesId(response.id)
              load(response.id);
            })
            .catch((error) => {
              alert(error);
              alert(JSON.stringify(error))
            });


          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              // request.abort();

              // Let FilePond know the request has been cancelled
              abort();
            }
          };
        },
        revert: (uniqueFileId, load, error) => {
          //  removeFile(this.state.fid)
          setinvoicesId(0)

          load()
        }
      }
    }></FilePond>:
  <>
    <p className="mb-0">Document Added</p>
    <div style={{ marginTop: "10px" }}>

      <Button
        onClick={() =>
          handleEdit("PAID_INVOICES")
        }

        variant="primary btn-xxs">Replace Document</Button>
      <a style={{ marginLeft: "10px" }}
        target="_blank"
        href={invoicesbj.path} >
        <Button


          variant="success btn-xxs">View Document</Button>
      </a>


    </div>
  </>}
  <div style={{ marginTop: "10px", textAlign: "right" }}>
    {isLoad ?
      <> <RotateSpinner size={30} color="rgba(41, 106, 176,1)" loading={isLoad && invoicesId !== 0} />
      </>
      :
      <>
        {invoicesId === 0 ? null :
          <Button
            onClick={() =>
              handleAddFormSubmit("PAID_INVOICES", invoicesId)
            }

            variant="primary btn-xxs">Save Document</Button>}
      </>
    }
  </div>
</div>	
						</div >
					</div >	











          




				</div >	
            </div >
  <div className="col-xl-12">
    <div className="card">
      <div className="card-body">
        <h3 className="mb-2 text-black">
          Uploaded Documents
        </h3>
        <Table responsive className="primary-table-bordered">
          <thead className="thead-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((option, key) => (
              <tr>
                <th>{key + 1}</th>
                <td>{option.type}</td>
                <td>{option.status === "VERIFIED" ? <div style={{ color: "green" }}>{option.status} <i className="fa fa-check"></i></div> : (option.status === "REJECTED" ? <div style={{ color: "red" }}>{option.status} <i className="fa fa-times"></i></div> : option.status)}</td>
                <td>
                  <a
                    target="_blank"
                    href={option.path} >
                    <Button


                      variant="primary btn-xxs">View Document</Button></a>
                  <Button
                    onClick={() => openDetails2(option, "docs")}

                    style={{ marginLeft: "10px" }}
                    variant="success btn-xxs">View Approval Detail</Button>

                </td>
              </tr>))}

          </tbody>
        </Table>

      </div>
    </div>
  </div>
        </div >
      </div >
    </div >
  );
};

export default PostDetails;
