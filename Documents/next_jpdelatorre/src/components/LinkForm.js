import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const LinkForm = (props) => {


    const initialStateValues = {
        url: "",
        name: "",
        description:""
    }
    const [values, setValues] = useState(initialStateValues)
    
    const handleChange = (e ) => {
       setValues({
           ...values,
           [e.target.name]: e.target.value
       })
    }
    
    const handleSubmit = ( e )=>{
        e.preventDefault();
        props.addOrEditLink(values)
        setValues({...initialStateValues})
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        console.log(doc.data())
        setValues({...doc.data()})
    }

    useEffect(() => {
        if(props.currentId === ''){
            setValues({...initialStateValues})
        }else{
            console.log('editing ...')
           getLinkById(props.currentId)
        }
    }, [props.currentId])

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://Someurl.com"
          name="url"
          onChange={handleChange}
          value={values.url}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="website name"
          onChange={handleChange}
          value={values.name}
        />
      </div>

      <div className="form-group">
        <textarea
          name="description"
          rows="3"
          className="form-control"
          placeholder="Write a description"
          onChange={handleChange}
          value={values.description}
        ></textarea>
      </div>

     <button className="btn btn-primary"> {props.currentId === "" ? 'Save' : 'Update'} </button>
    </form>
  );
};

export default LinkForm;
