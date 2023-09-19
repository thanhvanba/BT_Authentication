/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ApiService from './ApiService'

const Signup = () => {
    const { registerApi } = ApiService()
    const [email, useEmail] = useState('')
    const [fullName, useFullName] = useState('')
    const [password, usePassword] = useState('')
    const [cfpassword, useCfPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let regobj = { email, fullName, password };
        if (IsValidate()) {
            setLoading(true)
            registerApi(regobj, navigate, setLoading)
        }
    }

    
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (fullName=== null || fullName=== '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }


        if(!isproceed){
            alert(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                alert('Please enter the valid email')
            }
        }
        return isproceed;
    }

    return (
        <div>
            <div className=" bg-slate-300 rounded-lg border p-8 relative">
                <h1 className="text-4xl text-center mb-6"> Sign Up</h1>
                <form onSubmit={handleSubmit} action="">
                    <div className="relative my-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input value={email} onChange={e => useEmail(e.target.value)} autoComplete="on" type="email" name="email" id="email" className="border outline-none text-gray-900 rounded-lg block w-full p-2.5" placeholder="example@gmail.com" required="" />
                    </div>
                    <div className="relative my-4">
                        <label htmlFor="fullName" className="block mb-2">Full Name</label>
                        <input value={fullName} onChange={e => useFullName(e.target.value)} autoComplete="on" name="fullName" id="fullName" placeholder="Nguyễn Văn A" className="border outline-none text-gray-900 rounded-lg block w-full p-2.5" required="" />
                    </div>
                    <div className="relative my-4">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input value={password} onChange={e => usePassword(e.target.value)} autoComplete="on" type="password" name="password" id="password" className="border outline-none text-gray-900 rounded-lg block w-full p-2.5" placeholder="••••••••" required="" />
                    </div>
                    <div className="relative my-4">
                        <label htmlFor="cfpassword" className="block mb-2">Confirm Password</label>
                        <input type="password" value={cfpassword} onChange={e => useCfPassword(e.target.value)} name="cfpassword" id="cfpassword" autoComplete="on" placeholder="••••••••" className="border outline-none text-gray-900 rounded-lg block w-full p-2.5" required="" />
                    </div>
                    <button disabled={loading} className="w-full mb-4 text-[18px] mt-6 rounded-full bg-blue-600 text-white  hover:bg-blue-800 py-2" type='submit'>
                        SignUp
                    </button>
                </form>
                <div>
                    <span className="m-4">
                        Already Create an Account?
                        <Link className="text-blue-500" to='/login'> Login</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Signup;
