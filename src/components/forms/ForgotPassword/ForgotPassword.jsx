import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { setEmail } from "../../../store/auth-slice";
import { forgotPassword } from "../../../http";

const ForgotPassword = ({onNext}) =>
{
    const dispatch = useDispatch();
    const storeEmail = useSelector((state)=>state.authSlice.email);
    const [emailAddress,setEmailAddress] = useState(storeEmail);
    const onSubmit = async (e) =>
    {
        e.preventDefault();
        if(!emailAddress) return;
        const {data} = await forgotPassword({email:emailAddress});
        if(!data.success) return;
        dispatch(setEmail(emailAddress))
        onNext();
    }
    return(
        <div id="app">
            <section className="section">
            <div className="container mt-5">
                <div className="row">
                <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div className="login-brand">
                    <img src="https://avatars.githubusercontent.com/u/50810214?v=4" alt="logo" width="100" className="shadow-light rounded-circle"/>
                    </div>

                    <div className="card card-primary">
                    <div className="card-header"><h4>Forgot Password</h4></div>

                    <div className="card-body">
                        <p className="text-muted">We will send an OTP to reset your password</p>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" onChange={(e)=>setEmailAddress(e.target.value)} value={emailAddress} type="email" className="form-control" name="email" tabIndex="1" required autoFocus/>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                                Forgot Password
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                    <div className="simple-footer">
                    Copyright &copy; Social Codia
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default ForgotPassword;