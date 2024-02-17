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
                  <h4>Incomplete Steps</h4>
                  <p>You have to first complete the previous steps before you can access this page. Please navigate on the menu for the previous steps or go to the dashboard to get quick links</p>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>
    </div>
  );
};

export default PostDetails;
