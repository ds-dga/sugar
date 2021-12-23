import { useSession } from "next-auth/react"
import React, { createRef, useState } from "react"
import styled from "styled-components"
import { MediaURL } from "../lib/media"
import Loading from "./loading"

export default function BetterDropZone() {
  const [status, setStatus] = useState("Drop here")
  const [percentage, setPercentage] = useState(0)
  const { data: session, sessStatus } = useSession()
  const loading = sessStatus === "loading"
  let xhr = createRef()
  const onDrop = (event) => {
    const { type } = event.dataTransfer.files[0]
    // Begin Reading File
    const reader = new FileReader()
    // reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(event.dataTransfer.files[0]) // Create Form Data
    const payload = new FormData()
    payload.append("photo", event.dataTransfer.files[0]) // XHR - New XHR request

    xhr = new XMLHttpRequest() // XHR - Upload Progress

    xhr.upload.onprogress = (e) => {
      const done = e.position || e.loaded
      const total = e.totalSize || e.total
      const perc = Math.floor((done / total) * 1000) / 10
      if (perc >= 100) {
        setStatus("Done")
      } else {
        setStatus(`${perc} %`)
      }
      setPercentage(perc)
    }

    let socialApp = session.social.provider
    if (socialApp === "credentials") socialApp = "spice"

    xhr.open("POST", MediaURL)

    xhr.setRequestHeader("x-everyday-app", "sugar")
    xhr.setRequestHeader("x-everyday-client", "next")
    xhr.setRequestHeader("x-everyday-social-app", socialApp)
    xhr.setRequestHeader("x-everyday-uid", session.social.id)

    xhr.send(payload)

    event.preventDefault()
  }

  const onDragEnter = (event) => {
    setStatus("File Detected")
    event.preventDefault()
    event.stopPropagation()
  }
  const onDragLeave = (event) => {
    setStatus("Drop Here")
    event.preventDefault()
  }
  const doNothing = (event) => event.preventDefault()

  return (
    <section className="section">
      <DropArea
        className={`${status === "Drop" ? "Over" : ""}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={doNothing}
        onDrop={onDrop}
      >
        <ImageProgress>
          <div className="ImageProgressImage"></div>
          <div
            className="ImageProgressUploaded"
            style={{ background: "yellowgreen", clipPath: `inset(${100 - Number(percentage)}% 0 0 0)` }}
          ></div>
        </ImageProgress>
        <DropStatus>
          <Loading loading={status.indexOf("%") > -1} color={"red"} />
          {status}
        </DropStatus>
      </DropArea>
    </section>
  )
}

const DropArea = styled.div`
  flex: 1;
  background: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(80vh - 80px);
  border: solid 40px transparent;
  transition: all 250ms ease-in-out 0s;
  position: relative;

  .Over {
    border: solid 40px rgba(0, 0, 0, 0.2);
  }
`

const DropStatus = styled.div`
  background: transparent;
  display: block;
  font-family: "Helvetica", Arial, sans-serif;
  color: black;
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  line-height: calc(80vh - 80px);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 250ms ease-in-out 0s;
  // background: rgba(0, 0, 0, 0.3);
  // color: white;
`
const ImageProgress = styled.div`
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  overflow: hidden;

  .ImageProgressImage {
    opacity: 0.3;
    position: absolute;
    background-position: center center;
    background-size: cover;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .ImageProgressUploaded {
    position: absolute;
    background-position: center center;
    background-size: cover;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    clip-path: inset(0% 0 0 0);
    transition: all 250ms ease-in-out 0ms;
  }
`
