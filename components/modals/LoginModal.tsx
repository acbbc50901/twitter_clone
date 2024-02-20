import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import React, { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import Input from '../Input';
import Model from '../Model';
const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await signIn('credentials', {
        email,
        password,
      })

      loginModal.onClose();
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password])
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal])

  const bodyContent = (
    <div className=' flex flex-col gap-4'>
      <Input placeholder='信箱' value={email} disabled={isLoading} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder='密碼' type='password' value={password} disabled={isLoading} onChange={(e) => setPassword(e.target.value)}/>
    </div>
  )
  const footerContent = (
    <div className=' text-neutral-400 text-center mt-4'>
      <p>第一次使用嗎？
        <span onClick={onToggle} className=' text-white cursor-pointer hover:underline'>創建一個帳號</span>
      </p>
    </div>
  )
  return (
    <Model disabled={isLoading} isOpen={loginModal.isOpen} title='登入' actionLabel='登入' onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent}
    footer={footerContent}/>
  )
}

export default LoginModal