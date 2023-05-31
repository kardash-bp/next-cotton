import Reset from '../components/Reset'

const ResetPage = ({ query }: { query: { token: string } }) => {
  if (!query?.token) {
    return (
      <div>
        <h3>Sorry, invalid request. Token missing.</h3>
      </div>
    )
  }
  const token = query.token
  return (
    <>
      <div>Reset Password</div>
      <Reset token={token} />
    </>
  )
}

export default ResetPage
