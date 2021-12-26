export const MediaPublicURL = "https://ds.10z.dev/m"
export const MediaURL = process.env.SPICE_UPLOAD_URL || "https://ds.10z.dev/upload"
export const BaseMediaURL = process.env.BASE_SPICE_URL || "http://web:3300"


let userResp
export async function MediaUpload({ photo, objectID, objectType, userID, socialApp }) {
  const headers = {
    "x-everyday-app": "sugar",
    "x-everyday-client": "next",
    "x-everyday-social-app": socialApp,
    "x-everyday-uid": userID,
  }

  const form = new FormData()
  form.append("photo", photo)
  try {
    resp = await fetch(MediaURL, {
      body: form,
      method: "POST",
      headers: {
        ...headers,
      },
    })
    // console.log('::::::::: end of MediaUpload:::::')
    return await resp.json()
  } catch (e) {
    /* console.log(' media upload :', e.message)
    console.log(' media upload :', e)
    console.log('::::::::: end of MediaUpload:::::') */
    return {
      message: e.message,
    }
  }
}
