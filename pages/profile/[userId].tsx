import { useRouter } from 'next/router'
import React from 'react'

const Profile = () => {
  const router = useRouter()
  const { userId } = router.query
  return <div>{userId}</div>
}

export default Profile
