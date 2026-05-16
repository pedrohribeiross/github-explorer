import { useParams } from 'react-router-dom'

export const UserProfilePage = () => {
  const { username } = useParams<'username'>()

  return (
    <section aria-labelledby="user-profile-title">
      <h2 id="user-profile-title" className="h4">
        {username}
      </h2>
    </section>
  )
}
