import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import uploadProjectImg from '../assets/uploadImg.png'
import SERVER_BASE_URL from '../services/serverURL';
import { editProjectContext } from '../contexts/ContextShare';
import { updateProjectAPI } from '../services/allAPI';

const Edit = ({ project }) => {

  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectContext)
  // project key in the props will hold proeject data to be displayed in edit component
  const [show, setShow] = useState(false);

  const [preview,setPreview] = useState("")
  const [uploadFileStatus,setUploadFileStatus] = useState(false)

  const [projectDetails,setProjectDetails] = useState ({
    id:project?._id, title:project?.title, languages:project?.languages, overview:project?.overview, gitHub:project?.github, website:project?.website, projectImage:""
  })
  //project image is used to hold user uploaded file instead of existing file
  // console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg"){
      setUploadFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }else{
      setUploadFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
    }
   },[projectDetails.projectImage])

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      id:project?._id, title:project?.title, languages:project?.languages, overview:project?.overview, gitHub:project?.github, website:project?.website, projectImage:""
    })
  }
  const handleShow = () => {
    setShow(true);
    setProjectDetails({
      id:project?._id, title:project?.title, languages:project?.languages, overview:project?.overview, gitHub:project?.github, website:project?.website, projectImage:""
    })
  }

  const handleUpdateProject = async () => {
    const {id,title,languages,overview,gitHub,website,projectImage} = projectDetails
    if(title && languages && overview && gitHub && website){
      const reqBody = new FormData()
      reqBody.append('title',title)
      reqBody.append('languages',languages)
      reqBody.append('overview',overview)
      reqBody.append('github',gitHub)
      reqBody.append('website',website)
      preview? reqBody.append('projectImage',projectImage) : reqBody.append('projectImage',project?.projectImage)

      const token = sessionStorage.getItem("token")
      if(token) {
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //make api call
        try{
          const result = await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("Project updated successfully!")
            handleClose()
            // share result with view using context
            setEditProjectResponse(result)
          }
        }catch(err){
          console.log(err);
        }
      }
    }else{
      alert("Please fill all the fields")
    }
  }

  return (
    <>
      <button onClick={handleShow} className="btn"><i className="fa-solid fa-edit"></i></button>

      <Modal 
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file" style={{display:'none'}}/>
                <img height={'200px'} src={preview?preview:`${SERVER_BASE_URL}/uploads/${project?.projectImage}`} alt="upload" className="img-fluid"/>
              </label>
              {
                !uploadFileStatus &&
                <div className="text-warning fw-bolder">*Upload only .jpg, .png, .jpeg</div>
              }
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectDetails.title} onChange={e => setProjectDetails({...projectDetails,title:e.target.value})} type="text" className="form-control" placeholder="Project title"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.languages} onChange={e => setProjectDetails({...projectDetails,languages:e.target.value})} type="text" className="form-control" placeholder="Project languages"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.overview} onChange={e => setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className="form-control" placeholder="Project overview"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.gitHub} onChange={e => setProjectDetails({...projectDetails,gitHub:e.target.value})} type="text" className="form-control" placeholder="Project GitHub link"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.website} onChange={e => setProjectDetails({...projectDetails,website:e.target.value})} type="text" className="form-control" placeholder="Project website link"/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Edit