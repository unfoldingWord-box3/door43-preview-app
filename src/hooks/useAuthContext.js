import { useRouter } from 'next/router'
import { AuthContext } from '@context/AuthContext'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useContext } from 'react'

const useAuthContext = () => {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  useDeepCompareEffect(() => {
    const {
      state: { authentication, isLoadingLocal },
    } = authContext
    if (!authentication && !isLoadingLocal) {
      router.push('/login')
    }
  }, [authContext])
  return authContext
}

export default useAuthContext
