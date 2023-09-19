const ApiService = () => {
    const loginApi = async (params, navigate, setLoading) => {
        await fetch("https://auth-server-fmp.vercel.app/auth/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(params)
        }).then((res) => {
            return res.json();
        }).then((res) => {

            if (res.success) {
                alert(res?.message);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('email');
                sessionStorage.setItem('email', res?.data?.email)
                sessionStorage.setItem('token', res?.data?.token);
                navigate('/home')
            } else {
                throw new Error(res?.message)
            }
        }).catch((err) => {
            alert('Login Failed due to :' + err.message);
        }).finally(res =>{
            setLoading(false)
        });
    }

    const registerApi = async (params, navigate, setLoading) => {
        await fetch("https://auth-server-fmp.vercel.app/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then((res) => {
                console.log('res', res)
                alert(res?.message)
                navigate('/login');
            }).catch((err) => {
                alert('Failed :' + err?.message);
            }).finally(res =>{
                setLoading(false)
            });
    }

    const logoutApi = async (params, navigate, setLoading) => {
        let bearerToken = `Bearer ${params}`
        await fetch("https://auth-server-fmp.vercel.app/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken,
            }
        })
            .then(res => res.json())
            .then((res) => {
                if (res?.success) {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('email')
                    navigate('/login')
                }
            }).finally(res =>{
                setLoading(false)
            })
    }
    const refreshTokenApi = async (navigate,setLoading) => {   
        return await fetch("https://auth-server-fmp.vercel.app/auth/refresh-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then((res) => {
                if (res.success) {            
                    sessionStorage.removeItem('token');    
                    sessionStorage.setItem('token', res?.data?.token);
                    let clientToken = sessionStorage.getItem('token')
                    console.log('clientToken', clientToken)
                    console.log(setLoading)
                    callApiTest(clientToken, navigate,setLoading)
                }
                else {
                    console.log(res?.data?.token)
                    alert('Failed :' + res?.message);
                    navigate('/login')
                }
            })
    }

    const callApiTest = async (params, navigate, setLoading) => {
        let bearerToken = `Bearer ${params}`
        await fetch("https://auth-server-fmp.vercel.app/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken,
            }
        })
            .then(res => res.json())
            .then((res) => {
                if (res?.success){
                    const divThongBao = document.getElementById("testTB")
                    console.log(divThongBao.textContent)
                    divThongBao.textContent = res?.message
                }
                else {
                    refreshTokenApi(navigate,setLoading)
                }
            }).finally(res =>{
                setLoading(false)
            })
    }

    return {
        loginApi,
        registerApi,
        callApiTest,
        logoutApi
    }
}

export default ApiService