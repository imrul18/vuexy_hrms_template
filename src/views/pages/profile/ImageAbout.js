// ** Reactstrap Imports
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeImage } from '@store/authentication'
import {
  Button,
  Card,
  CardBody,
  Input,
  Label
} from "reactstrap"
const imageMimeType = /image\/(png|jpg|jpeg)/i

const ImageAbout = ({ avatar_url }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState(require("@src/assets/images/avatars/avatar-blank.png"))

  useEffect(() => {
    setAvatar(avatar_url)
  }, [avatar_url])

  const onChange = async(e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      alert("Only PNG, JPG & JPEG type is Allowed")
    } else {
      const formData = new FormData()
      formData.append("avatar", file)
      setAvatar(URL.createObjectURL(file))
      const res = await axios.post("/image-profile-update", formData)
      if (res?.data?.userData) {
        dispatch(changeImage(res?.data?.userData))
      }
    }  
  }

  const handleImgReset = () => {
    setAvatar(require("@src/assets/images/avatars/avatar-blank.png").default)
  }

  return (
    <Card  className="align-items-center">
      <CardBody className="d-flex justify-content-center">
        <div className="">
          <div className="me-25">
            <img
              className="rounded me-50"
              src={avatar}
              alt="Generic placeholder image"
              height="200"
              width="200"
            />
          </div>
          <div className="mt-75">
            <div>
              <Button
                tag={Label}
                className="mb-75 me-75"
                size="sm"
                color="primary"
              >
                Upload
                <Input
                  type="file"
                  name="avatar"
                  onChange={onChange}
                  hidden
                  accept="image/*"
                />
              </Button>
              <Button
                className="mb-75"
                color="secondary"
                size="sm"
                outline
                onClick={handleImgReset}
              >
                Reset
              </Button>
              {/* <p className="mb-0 text-danger">Allowed JPG, GIF or PNG. Max size of 800kB</p> */}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default ImageAbout
