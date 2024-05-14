import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [errMsg, setErrorMsg] = useState("");
  const navigate = useNavigate()
  let user = localStorage.getItem('user' || null);

  useEffect(() => {
  }, [user])



  const onSubmit = async (e) => {
    e.preventDefault()

    const auth = getAuth();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid, name } = userCredential.user;
      localStorage.setItem('user', JSON.stringify({ uid, email, name }));

      toast.success("Success");
      setLoading(false)
      navigate('/');
      window.location.reload();
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/network-request-failed":
          setErrorMsg("Network Error, please connect to a stable internet");
          break;
        case "auth/invalid-credential":
          setErrorMsg("Invalid redentials, please register or confirm email or password to proceed");
          break;
        default:
          setErrorMsg("An error occurred while trying to log in ");
      }
    }


  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="register">


      <section className='heading' >

        <h1>
          Login
        </h1>
      </section>
      <section className='form' style={{ padding: 0, minHeight: '380px', padding: '20px' }}>
        <form onSubmit={onSubmit}>
        <div className='form-group'>
          <p style={{color: 'red', textAlign: 'center'}}>{errMsg}</p>
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      </section>
    </div>

  )
}

export default Login
