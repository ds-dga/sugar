import { useMutation } from "@apollo/client"

export default function DelButton({ mutation, ID, handleSuccess }) {
  // const user = UserProvider()
  const [delThis] = useMutation(mutation)
  let hasPermission = true
  // if (user.id && user.groups.length > 0) hasPermission = true
  if (!mutation || !ID) {
    return <></>
  }
  return (
    <>
      {hasPermission && (
        <button
          className={`button is-light is-small is-danger`}
          onClick={async () => {
            if (!window.confirm("Are you sure you wish to delete this item?")) return
            const res = await delThis({ variables: { ID } })
            console.log("res: ", res.data.result.id)
            const returningID = res.data.result.id
            if (!returningID) {
              alert("Something is wrong.")
              return
            }
            if (handleSuccess) handleSuccess(returningID)
          }}
        >
          Delete
        </button>
      )}
    </>
  )
}
