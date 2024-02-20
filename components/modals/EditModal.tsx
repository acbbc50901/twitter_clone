import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Model from "../Model";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser} = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  } ,[currentUser])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        coverImage,
        profileImage,
      })
      mutateFetchedUser();
      toast.success('updata');
      editModal.onClose();
    } catch(error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [name, username, bio, coverImage, profileImage, editModal, mutateFetchedUser])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input placeholder="名稱" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading}/>
      <Input placeholder="帳號名稱" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading}/>
      <Input placeholder="留言板" onChange={(e) => setBio(e.target.value)} value={bio} disabled={isLoading}/>
      <ImageUpload onChange={(img) => setProfileImage(img)} value={profileImage} disabled={isLoading} label='上傳使用者照片'/>
      <ImageUpload onChange={(img) => setCoverImage(img)} value={coverImage} disabled={isLoading} label='上傳背景圖片'/>
    </div>
  ) 

  return(
    <Model disabled={isLoading} isOpen={editModal.isOpen} title="編輯你的個人資料" actionLabel="儲存" onClose={editModal.onClose} onSubmit={onSubmit}
    body={bodyContent}/>
  )
}

export default EditModal