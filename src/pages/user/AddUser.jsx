import { useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import Navigation from "../../components/Navigation";
import SideBar from "../../components/Sidebar";
import { addUser } from "../../http";

const AddUser = () =>
{
    const [imagePreview, setImagePreview] = useState('http://localhost:5500/storage/images/profile/profile-1636215026196-734067891umair.jpg');
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        mobile:'',
        password:'',
        type:'Employee',
        address:'',
        profile:''
    });

    const inputEvent = (e) =>
    {
        const {name,value} = e.target;
        setFormData((old)=>
        {
            return{
                ...old,
                [name]:value
            }

        })
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault();

        const {name,email,mobile,password,type,address,profile} = formData;
        if(!name || !email || !mobile || !password || !type || !address || !profile) return;

        const fd = new FormData();
        Object.keys(formData).map((key)=>
        {
            return fd.append(key,formData[key]);
        })
        console.log(fd);
        const res = await addUser(fd);
        console.log(res);
    }

    const captureImage = (e) =>
    {
        const file = e.target.files[0];
        setFormData((old)=>
        {
            return{
                ...old,
                profile:file
            }

        })
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>
        {
            setImagePreview(reader.result);
        }
    }

    return(
        <>
        <Navigation/>
        <SideBar/>
        <div className="main-content">
        <section className="section">
            <HeaderSection title='Add User'/>
                <div className="card">
                  <div className="card-body pr-5 pl-5 m-1">
                    <form className='row' onSubmit={onSubmit}>
                        <div className="form-group col-md-12 text-center">
                            <div className="input-group justify-content-center">
                                <input type="file" id='profile' name='profile' className="form-control d-none" onChange={captureImage} accept="image/*" />
                                <label htmlFor='profile'> <img className='rounded' src={imagePreview} width='120' alt="" /> </label>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label>Enter Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.name} type="text" id='name' name='name' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label>Enter Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.email} type="email" id='email' name='email' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Enter Mobile Number</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-phone"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.mobile} type="tel" id='mobile' name='mobile' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Enter Password</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.password} type="password" id='password' name='password' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>User Type</label>
                            <select name='type' onChange={inputEvent} className="form-control select2">
                                <option>Employee</option>
                                <option>Leader</option>
                                <option>Admin</option>
                            </select>
                        </div>

                        <div className="form-group col-md-12 ">
                            <label>Enter Address</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.address} type="text" id='address' name='address' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group text-center col-md-12">
                            <button className='btn btn-primary btn-lg' type='submit' style={{width:'30vh'}}>Add {formData.type}</button>
                        </div>

                    </form>
                  </div>
                </div>
        </section>
      </div>
      </>
    )
}

export default AddUser;