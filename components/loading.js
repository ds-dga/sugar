import Icon from "./icon"
import Spinner from "./icon/spinner"

export default function Loading(props) {
  const { loading } = props
  if (loading) {
    let p = { ...props }
    delete p.loading
    return (
      <div className="flex items-center">
        <Icon
          style={{ animation: "rotate 2s linear infinite" }}
          color="gray"
          size={32}
          icon={Spinner}
          {...p}
        />
      </div>
    )
  }

  return <></>
}
