import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import Spinner from '../components/Spinner'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [loading, setLoading] = useState(null);
  const navigate = useNavigate()
  let user;

  useEffect(() => {
    user = localStorage.getItem('user'||null);
  }, [user])


  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
        toast.error('Passwords do not match');
    } else {
        try {
            setLoading(true);
            
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
            const { uid } = userCredential.user;
            
            // Store user data in Firestore
            await setDoc(doc(db, 'users', uid), {
                name: name,
                email: email
            });

            localStorage.setItem('user', JSON.stringify({ uid, email, name }));

            setLoading(false);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error('Error during registration:', error.message);
            setLoading(false);
            toast.error('Registration failed. Please try again.');
        }
    }
};

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="register">
      
      <section className='heading'>
        <h1>
           Register
        </h1>
      </section>
    <section className='form' style={{padding: 0,  minHeight: '380px',  padding: '20px'}}>
      <form onSubmit={onSubmit}  >
         <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Your Email'
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder='Confirm password'
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

export default Register
