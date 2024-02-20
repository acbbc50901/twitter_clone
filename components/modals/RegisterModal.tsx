import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal';
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Model from '../Model';
import axios from 'axios';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await axios.post('/api/register', {
        email,
        password,
        username,
        name
      })
      toast.success('Account created')

      signIn('credentials', {
        email,
        password,
      })


      registerModal.onClose();
    } catch(error) {
      console.log(error);
      toast.error('Something error')
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name])

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal])

  const bodyContent = (
    <div className=' flex flex-col gap-4'>
      <Input placeholder='信箱' value={email} disabled={isLoading} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder='名稱' value={name} disabled={isLoading} onChange={(e) => setName(e.target.value)}/>
      <Input placeholder='使用者名稱' value={username} disabled={isLoading} onChange={(e) => setUsername(e.target.value)}/>
      <Input placeholder='密碼' type='password' value={password} disabled={isLoading} onChange={(e) => setPassword(e.target.value)}/>
    </div>
  )
  const footerContent = (
    <div className=' text-neutral-400 text-center mt-4'>
      <p>已有創立帳號？
        <span onClick={onToggle} className=' text-white cursor-pointer hover:underline'>登入</span>
      </p>
    </div>
  )
  return (
    <Model disabled={isLoading} isOpen={registerModal.isOpen} title='創立一個帳號' actionLabel='創立' onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent}
      footer={footerContent}/>
  )
}

export default RegisterModal