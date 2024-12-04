import React, {useEffect, useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import uploadProjectImg from '../assets/uploadImg.png'

const Add = () => {

  const [preview, setPreview] = useState("")
  const [uploadFileStatus, setUploadFileStatus] = useState(false)

  const [projectDetails, setProjectDetails] = useState({
    title : "", languages : "", overview : "", github : "", website : "", projectImage : ""
  })
  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg"){
      setUploadFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }else{
      // invalid image file
      setUploadFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
    }
  },[projectDetails.projectImage])
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setPreview("")
    setUploadFileStatus(false)
    setProjectDetails({title : "", languages : "", overview : "", github : "", website : "", projectImage : ""})
  }

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary">+ New Project</button>

      <Modal 
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file" style={{display:'none'}}/>
                <img height={'200px'} src={preview?preview:uploadProjectImg} alt="upload" className="img-fluid"/>
              </label>
              {
                !uploadFileStatus &&
                <div className="text-warning fw-bolder">*Upload only .jpg, .png, .jpeg</div>
              }
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" className="form-control" placeholder="Project title"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} type="text" className="form-control" placeholder="Project languages"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className="form-control" placeholder="Project overview"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" className="form-control" placeholder="Project GitHub link"/>
              </div>
              <div className="mb-2">
                <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" className="form-control" placeholder="Project website link"/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Add